import { randomUUID } from 'crypto';
import { Agent, RequestOptions } from 'https';
import { Readable } from 'stream';

import { IBalanceResponse } from '@interfaces/balance';
import { ICompletionRequest, ICompletionResponse } from '@interfaces/completion';
import { GigaChatConfig } from '@interfaces/config';
import { IEmbeddingResponse } from '@interfaces/embedding';
import { IExtractImage } from '@interfaces/extract';
import { IFile, IFileDeleteResponse } from '@interfaces/file';
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
  }: GigaChatConfig) {
    this.clientSecretKey = clientSecretKey;
    this.isIgnoreTSL = isIgnoreTSL;
    this.isPersonal = isPersonal;
    this.autoRefreshToken = autoRefreshToken;
    this.imgOn = imgOn;

    this.httpClient = new HTTPClient(this.url, undefined, this.isIgnoreTSL);
  }

  /**
   * Извлекает URL изображения из ответа модели.
   * @param {string} completionContent Содержимое ответа.
   * @returns {IExtractImage | null} Результат извлечения изображения.
   */
  private extractImageSource(completionContent: string): IExtractImage | null {
    const imgTagRegex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/;
    const match = completionContent.match(imgTagRegex);
    if (match) {
      return {
        imageId: match[1],
        text: completionContent.replace(imgTagRegex, ''),
      };
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
    if (error)
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
        if (/^HTTP Error: \d{3} .+$/.test(err.message)) {
          const match = err.message.match(/^HTTP Error: (\d{3}) (.+)$/);

          if (match) {
            const errorData = {
              statusCode: Number(match[1]),
              statusMessage: match[2],
            };

            if (errorData.statusCode === 401) {
              if (this.autoRefreshToken) {
                await this.createToken();
                return currentFunction();
              }
              throw new GigaChatError('Authorization token expired', 'AUTH_EXPIRED');
            }

            if (errorData.statusCode === 400) {
              throw new GigaChatError(
                `Validation error: ${errorData?.statusMessage}`,
                'VALIDATION_ERROR',
              );
            }

            if (errorData.statusCode >= 500) {
              throw new GigaChatError('Internal server error', 'SERVER_ERROR');
            }
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

      for (let index = 0; index < response.choices.length; index++) {
        const completionContent = response.choices[index].message.content;
        if (this.imgOn) {
          const extractedResult = this.extractImageSource(completionContent);
          if (extractedResult) {
            response.choices[index].message.image = extractedResult.imageId;
            response.choices[index].message.content = extractedResult.text;
          }
        }
      }

      return response;
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

  /**
   * Получение списка доступных файлов.
   * @returns {Promise<IFile[]>} Массив объектов с информацией о доступных файлах.
   */
  public async getAllFiles(): Promise<IFile[]> {
    const path = '/files';
    try {
      const response = await this.httpClient.get(path);
      return response;
    } catch (error) {
      return await this.handlingError<IFile[]>(error, async () => {
        return await this.httpClient.get(path);
      });
    }
  }

  /**
   * Получение информации о файле по идентификатору.
   * @param {string} fileId - Идентификатор файла.
   * @returns {Promise<IFile>} Объект с информацией о файле.
   */
  public async getFileInfo(fileId: string): Promise<IFile> {
    const path = `/files/${fileId}`;
    try {
      const response = await this.httpClient.get(path);
      return response;
    } catch (error) {
      return await this.handlingError<IFile>(error, async () => {
        return await this.httpClient.get(path);
      });
    }
  }

  /**
   * Удаление файла по идентификатору.
   * @param {string} fileId - Идентификатор файла.
   * @returns {Promise<IFileDeleteResponse>} Ответ сервера.
   */
  public async deleteFile(fileId: string): Promise<IFileDeleteResponse> {
    const path = `/files/${fileId}/delete`;
    try {
      const response = await this.httpClient.post(path, {});
      return response;
    } catch (error) {
      return await this.handlingError<IFileDeleteResponse>(error, async () => {
        return await this.httpClient.post(path, {});
      });
    }
  }

  /**
   * Получение баланса токенов по всем моделям.
   * @returns {Promise<IBalanceResponse>} Ответ сервера с информацией о балансе.
   */
  public async getBalance(): Promise<IBalanceResponse> {
    const path = '/balance';
    try {
      const response = await this.httpClient.get(path);
      return response;
    } catch (error) {
      return await this.handlingError<IBalanceResponse>(error, async () => {
        return await this.httpClient.get(path);
      });
    }
  }

  public async downloadFile(fileId: string): Promise<any> {
    const path = `/files/${fileId}/content`;
    try {
      const response = await this.httpClient.get(path, true);
      return response;
    } catch (error) {
      return await this.handlingError<any>(error, async () => {
        return await this.httpClient.get(path);
      });
    }
  }
}

export { GigaChat, GigaChatError };
