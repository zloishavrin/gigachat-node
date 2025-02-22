import { randomUUID } from 'crypto';
import { createWriteStream } from 'fs';
import { Agent, RequestOptions } from 'https';
import { Readable } from 'stream';

import { ICompletionRequest, ICompletionResponse } from '@interfaces/completion';
import { GigaChatConfig } from '@interfaces/config';
import { IEmbeddingResponse } from '@interfaces/embedding';
import { IFile } from '@interfaces/file';
import { IAllModelResponse } from '@interfaces/model';
import { ISummarizeResponse } from '@interfaces/summarize';
import { ITokenResponse } from '@interfaces/token';

import { GigaChatError } from './utils/GigaChatError';
import { HTTPClient } from './utils/HTTPClient';

/**
 * Класс для взаимодействия с API GigaChat.
 * Позволяет выполнять авторизацию, отправлять запросы к модели, загружать файлы и работать с потоками данных.
 */
class GigaChat {
  /**
   * HTTP-Клиент для обработки запросов.
   */
  private httpClient: HTTPClient;

  /**
   * Токен авторизации для API.
   */
  public authorization: string | undefined;

  /**
   * Секретный ключ клиента.
   */
  private clientSecretKey: string;

  /**
   * Флаг, определяющий, следует ли игнорировать ошибки TLS.
   */
  private isIgnoreTSL: boolean;

  /**
   * Флаг, определяющий, является ли клиент личным пользователем (Personal) или корпоративным (Corporation).
   */
  private isPersonal: boolean;

  /**
   * Флаг, разрешающий автоматическое обновление токена при истечении срока его действия.
   */
  private autoRefreshToken: boolean;

  /**
   * Включена ли обработка изображений в ответах модели.
   */
  private imgOn: boolean;

  /**
   * Путь для сохранения загруженных изображений.
   */
  private imgPath: string;

  /**
   * Основной URL API GigaChat.
   */
  private url: string = 'https://gigachat.devices.sberbank.ru/api/v1';

  /**
   * URL для авторизации и получения токена.
   */
  private urlAuth: string = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';

  /**
   * Область действия (scope) API для личных пользователей.
   */
  private scopeForPersonal: string = 'GIGACHAT_API_PERS';

  /**
   * Область действия (scope) API для корпоративных пользователей.
   */
  private scopeForCorporation: string = 'GIGACHAT_API_CORP';

  /**
   * Создает новый экземпляр GigaChat.
   * @param {GigaChatConfig} config Конфигурация клиента.
   */
  constructor({
    clientSecretKey,
    isIgnoreTSL = true,
    isPersonal = true,
    autoRefreshToken = true,
    imgOn = true,
    imgPath = '.',
  }: GigaChatConfig) {
    this.clientSecretKey = clientSecretKey;
    this.isIgnoreTSL = isIgnoreTSL;
    this.isPersonal = isPersonal;
    this.autoRefreshToken = autoRefreshToken;
    (this.imgOn = imgOn), (this.imgPath = imgPath);

    this.httpClient = new HTTPClient(this.url, undefined, this.isIgnoreTSL);
  }

  /**
   * Получает изображение по его ID.
   * @param {string} imageId Идентификатор изображения.
   * @returns {Promise<Readable>} Ответ API с изображением.
   */
  private async getImage(imageId: string): Promise<Readable> {
    const url = new URL(`${this.url}/files/${imageId}/content`);
    const options: RequestOptions = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      port: url.port || 443,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.authorization}`,
        Accept: 'application/jpg',
      },
      agent: new Agent({
        rejectUnauthorized: !this.isIgnoreTSL,
      }),
    };

    try {
      const response = await this.httpClient.makeRequest(options, '', 0, true);
      return response;
    } catch (error) {
      throw new GigaChatError(`Failed to fetch image: ${error}`, 'IMAGE_FETCH_ERROR');
    }
  }

  /**
   * Извлекает URL изображения из ответа модели.
   * @param {string} completionContent Содержимое ответа.
   * @returns {string | null} URL изображения.
   */
  private extractImageSource(completionContent: string): string | null {
    const imgTagRegex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/;
    const match = completionContent.match(imgTagRegex);
    if (match) {
      return match[1];
    } else {
      return null;
    }
  }

  /**
   * Обработка ошибки
   * @param {unknown} error Ошибка.
   * @param {() => Promise<T>} currentFunction Функция, которую надо выполнить, если проблема была в токенах и она решилась.
   * @returns {Promise<T>} Результат выполнения currentFunction().
   * @throws {GigaChatError} Специфичная ошибка API
   */
  private async handlingError<T>(error: unknown, currentFunction: () => Promise<T>): Promise<T> {
    if (error instanceof Error) {
      const err = error as NodeJS.ErrnoException;

      // TLS/SSL
      if (err.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' || err.code === 'CERT_HAS_EXPIRED') {
        throw new GigaChatError(`SSL/TLS error: ${err.message}`, 'SSL_ERROR');
      }

      // Network
      if (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT' || err.code === 'EPROTO') {
        throw new GigaChatError(`Network error: ${err.message}`, 'NETWORK_ERROR');
      }

      // HTTP
      if ('statusCode' in err) {
        const statusCode = (err as any).statusCode;
        const errorData = (err as any).response;

        if (statusCode === 401) {
          if (this.autoRefreshToken) {
            await this.createToken();
            return currentFunction();
          }
          throw new GigaChatError('Authorization token expired', 'AUTH_EXPIRED');
        }

        if (statusCode === 400) {
          throw new GigaChatError(`Validation error: ${errorData?.message}`, 'VALIDATION_ERROR');
        }

        if (statusCode >= 500) {
          throw new GigaChatError('Internal server error', 'SERVER_ERROR');
        }
      }
    }

    // Обработка неизвестных ошибок
    throw new GigaChatError(`Unknown error: ${error}`, 'UNKNOWN_ERROR');
  }

  /**
   * Создает новый токен доступа.
   * @returns {Promise<ITokenResponse>} Данные токена.
   */
  public async createToken(): Promise<ITokenResponse> {
    try {
      const requestUID = randomUUID();
      const data = new URLSearchParams();

      if (this.isPersonal) {
        data.append('scope', this.scopeForPersonal);
      } else {
        data.append('scope', this.scopeForCorporation);
      }

      const url = new URL(this.urlAuth);
      const options: RequestOptions = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        port: url.port || 443,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.clientSecretKey}`,
          RqUID: requestUID,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(data.toString()),
        },
        agent: new Agent({
          rejectUnauthorized: !this.isIgnoreTSL,
        }),
      };
      const response = await this.httpClient.makeRequest(options, data.toString());
      this.authorization = response.access_token;
      this.httpClient.setAuthorization(response.access_token);
      return response;
    } catch (error) {
      const err = error as NodeJS.ErrnoException;

      if (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT' || err.code === 'EPROTO') {
        throw new GigaChatError(`HTTPS error (create token): ${err.message}`, 'HTTPS_ERROR');
      }

      if (err.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE' || err.code === 'CERT_HAS_EXPIRED') {
        throw new GigaChatError(`SSL/TLS error (create token): ${err.message}`, 'SSL_ERROR');
      }

      throw new GigaChatError(`Unknown error (create token): ${err.message}`, 'UNKNOWN_ERROR');
    }
  }

  /**
   * Отправляет запрос на завершение чата.
   * @param {ICompletionRequest} data - Данные запроса.
   * @returns {Promise<ICompletionResponse>} Ответ сервера.
   */
  public async completion(data: ICompletionRequest): Promise<ICompletionResponse> {
    const path = '/chat/completions';
    try {
      const response = await this.httpClient.post(path, data);
      const completionContent = response.choices[0].message.content;
      if (this.imgOn) {
        const imageId = this.extractImageSource(completionContent);
        if (imageId) {
          try {
            const imagePath = `${this.imgPath}/${randomUUID()}.jpg`;
            const imageStream = createWriteStream(imagePath);
            const transformStream = new Readable();
            transformStream._read = () => {};

            const imageResponse = await this.getImage(imageId);

            await new Promise<void>((resolve, reject) => {
              imageResponse.on('data', (chunk: any) => transformStream.push(chunk));
              imageResponse.on('end', () => {
                transformStream.push(null);
                transformStream.pipe(imageStream);
                transformStream.on('end', () => {
                  imageStream.end();
                  imageStream.on('finish', () => {
                    response.choices[0].message['image'] = imagePath;
                    resolve();
                  });
                });
              });
              imageResponse.on('error', reject);
            });

            return response;
          } catch (error) {
            throw new Error(`Ошибка при сохранении файла: ${error}`);
          }
        } else {
          return response;
        }
      } else {
        return response;
      }
    } catch (error) {
      return await this.handlingError<ICompletionResponse>(error, async () => {
        return await this.httpClient.post(path, data);
      });
    }
  }

  /**
   * Отправляет потоковый запрос на завершение чата.
   * @param {ICompletionRequest} data - Данные запроса.
   * @returns {Promise<Readable>} Потоковый ответ сервера.
   */
  public async completionStream(data: ICompletionRequest): Promise<Readable> {
    const path = '/chat/completions';
    const streamData = { ...data, stream: true };
    try {
      const response = await this.httpClient.post(path, streamData, true);
      return response;
    } catch (error) {
      return await this.handlingError<Readable>(error, async () => {
        return await this.httpClient.post(path, streamData, true);
      });
    }
  }

  /**
   * Получает список всех моделей.
   * @returns {Promise<IAllModelResponse>} Ответ сервера с моделями.
   */
  public async allModels(): Promise<IAllModelResponse> {
    const path = '/models';
    try {
      const responce = await this.httpClient.get(path);
      return responce.data;
    } catch (error) {
      return await this.handlingError<IAllModelResponse>(error, async () => {
        return await this.httpClient.get(path);
      });
    }
  }

  /**
   * Выполняет embedding запроса.
   * @param {string[]} input - Входные данные.
   * @returns {Promise<IEmbeddingResponse>} Ответ сервера с embedding.
   */
  public async embedding(input: string[]): Promise<IEmbeddingResponse> {
    const path = '/embeddings';
    try {
      const responce = await this.httpClient.post(path, { model: 'Embeddings', input: input });
      return responce.data;
    } catch (error) {
      return await this.handlingError<IEmbeddingResponse>(error, async () => {
        return await this.httpClient.post(path, { input: input });
      });
    }
  }

  /**
   * Подсчитывает количество токенов в тексте.
   * @param {string} model - Модель.
   * @param {string[]} input - Входные данные.
   * @returns {Promise<ISummarizeResponse[]>} Ответ с количеством токенов.
   */
  public async summarize(model: string, input: string[]): Promise<ISummarizeResponse[]> {
    const path = '/tokens/count';
    try {
      const responce = await this.httpClient.post(path, { model, input });
      return responce;
    } catch (error) {
      return await this.handlingError<ISummarizeResponse[]>(error, async () => {
        return await this.httpClient.post(path, { model, input });
      });
    }
  }

  /**
   * Загружает файл в сервис.
   * @param {string} pathToFile - Путь к файлу.
   * @param {string} [purpose='general'] - Назначение файла.
   * @returns {Promise<IFile>} Ответ сервера с данными файла.
   */
  public async uploadFile(pathToFile: string, purpose: string = 'general'): Promise<IFile> {
    try {
      const response = await this.httpClient.postFiles(pathToFile, purpose);
      return response;
    } catch (error) {
      return await this.handlingError<IFile>(error, async () => {
        return await this.httpClient.postFiles(pathToFile, purpose);
      });
    }
  }
}

export { GigaChat, GigaChatError };
