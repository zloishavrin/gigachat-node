import { randomUUID } from 'crypto';
import { createWriteStream } from 'fs';
import { Agent } from 'https';
import { Readable } from 'stream';

import axios, { AxiosResponse, isAxiosError } from 'axios';

import { ICompletionRequest, ICompletionResponse } from '@interfaces/completion';
import { GigaChatConfig } from '@interfaces/config';
import { IEmbeddingResponse } from '@interfaces/embedding';
import { IFile } from '@interfaces/file';
import { IAllModelResponse, IModelResponse } from '@interfaces/model';
import { ISummarizeResponse } from '@interfaces/summarize';
import { ITokenResponse } from '@interfaces/token';

import { FormDataBuilder } from './utils/FormDataBuilder';
import { FormDataFile } from './utils/FormDataFile';
import { GigaChatError } from './utils/GigaChatError';

/**
 * Класс для взаимодействия с API GigaChat.
 * Позволяет выполнять авторизацию, отправлять запросы к модели, загружать файлы и работать с потоками данных.
 */
class GigaChat {
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
  }

  /**
   * Выполняет GET-запрос к API.
   * @param {string} path Путь запроса.
   * @returns {Promise<AxiosResponse<any>>} Ответ API.
   */
  private async get(path: string): Promise<AxiosResponse<any>> {
    const responce = await axios.get(`${this.url}${path}`, {
      headers: {
        Authorization: `Bearer ${this.authorization}`,
      },
      httpsAgent: new Agent({
        rejectUnauthorized: !this.isIgnoreTSL,
      }),
    });
    return responce;
  }

  /**
   * Выполняет POST-запрос к API.
   * @param {string} path Путь запроса.
   * @param {object} data Данные запроса.
   * @param {boolean} [stream=false] Флаг для потокового ответа.
   * @returns {Promise<AxiosResponse<any>>} Ответ API.
   */
  private async post(
    path: string,
    data: object,
    stream: boolean = false,
  ): Promise<AxiosResponse<any>> {
    const response = await axios.post(`${this.url}${path}`, data, {
      headers: {
        Authorization: `Bearer ${this.authorization}`,
      },
      httpsAgent: new Agent({
        rejectUnauthorized: !this.isIgnoreTSL,
      }),
      responseType: stream ? 'stream' : 'json',
    });
    return response;
  }

  /**
   * Получает изображение по его ID.
   * @param {string} imageId Идентификатор изображения.
   * @returns {Promise<AxiosResponse<any>>} Ответ API с изображением.
   */
  private async getImage(imageId: string): Promise<AxiosResponse<any>> {
    const responce = await axios.get(`${this.url}/files/${imageId}/content`, {
      headers: {
        Authorization: `Bearer ${this.authorization}`,
        Accept: 'application/jpg',
      },
      httpsAgent: new Agent({
        rejectUnauthorized: !this.isIgnoreTSL,
      }),
      responseType: 'stream',
    });
    return responce;
  }

  /**
   * Загружает файл на сервер
   * @param {string} pathToFile Путь до файла.
   * @param {string} purpose Признак использования.
   * @returns {Promise<AxiosResponse<IFile>>} Ответ API.
   */
  private async postFiles(pathToFile: string, purpose: string): Promise<AxiosResponse<IFile>> {
    const file = new FormDataFile(pathToFile);
    const formData = new FormDataBuilder();

    formData.appendField('purpose', purpose);
    formData.appendFile('file', file);

    const response = await axios.post(`${this.url}/files`, formData.getBody(), {
      headers: {
        Authorization: `Bearer ${this.authorization}`,
        Accept: 'application/json',
        ...formData.getHeaders(),
      },
      httpsAgent: new Agent({
        rejectUnauthorized: !this.isIgnoreTSL,
      }),
      responseType: 'json',
    });
    return response;
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
   * @param {() => Promise<AxiosResponse<T>>} currentFunction Функция, которую надо выполнить, если проблема была в токенах и она решилась.
   * @returns {Promise<T>} Результат выполнения currentFunction().
   * @throws {GigaChatError} Специфичная ошибка API
   */
  private async handlingError<T>(
    error: unknown,
    currentFunction: () => Promise<AxiosResponse<T>>,
  ): Promise<any> {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      const errorData = error.response?.data;

      if (status === 401) {
        if (this.autoRefreshToken) {
          await this.createToken();
          return currentFunction();
        }
        throw new GigaChatError('Authorization token expired', 'AUTH_EXPIRED');
      }

      if (status === 400) {
        throw new GigaChatError(`Validation error: ${errorData?.message}`, 'VALIDATION_ERROR');
      }

      if (typeof status === 'number' && status >= 500) {
        throw new GigaChatError('Internal server error', 'SERVER_ERROR');
      }
    }

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

      const responce = await axios.post(this.urlAuth, data, {
        headers: {
          Authorization: `Bearer ${this.clientSecretKey}`,
          RqUID: requestUID,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        httpsAgent: new Agent({
          rejectUnauthorized: !this.isIgnoreTSL,
        }),
        maxRedirects: 5,
      });
      this.authorization = responce.data.access_token;
      return responce.data;
    } catch (error) {
      if (isAxiosError(error)) {
        throw new GigaChatError(`Unknown error (create token): ${error.message}`, 'UNKNOWN_ERROR');
      }
      throw new Error(`Unknown error (create token): ${error}`);
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
      const response = await this.post(path, data);
      const completionContent = response.data.choices[0].message.content;
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
              imageResponse.data.on('data', (chunk: any) => transformStream.push(chunk));
              imageResponse.data.on('end', () => {
                transformStream.push(null);
                transformStream.pipe(imageStream);
                transformStream.on('end', () => {
                  imageStream.end();
                  imageStream.on('finish', () => {
                    response.data.choices[0].message['image'] = imagePath;
                    resolve();
                  });
                });
              });
              imageResponse.data.on('error', reject);
            });

            return response.data;
          } catch (error) {
            throw new Error(`Ошибка при сохранении файла: ${error}`);
          }
        } else {
          return response.data;
        }
      } else {
        return response.data;
      }
    } catch (error) {
      return await this.handlingError<ICompletionResponse>(error, async () => {
        return await this.post(path, data);
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
      const response = await this.post(path, streamData, true);
      return response.data;
    } catch (error) {
      return await this.handlingError<Readable>(error, async () => {
        return await this.post(path, streamData, true);
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
      const responce = await this.get(path);
      return responce.data;
    } catch (error) {
      return await this.handlingError<IAllModelResponse>(error, async () => {
        return await this.get(path);
      });
    }
  }

  /**
   * Получает информацию о конкретной модели.
   * @param {string} modelName - Название модели.
   * @returns {Promise<IModelResponse>} Ответ сервера с данными модели.
   */
  public async model(modelName: string): Promise<IModelResponse> {
    const path = `/models/${modelName}`;
    try {
      const responce = await this.get(path);
      return responce.data;
    } catch (error) {
      return await this.handlingError<IModelResponse>(error, async () => {
        return await this.get(path);
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
      const responce = await this.post(path, { model: 'Embeddings', input: input });
      return responce.data;
    } catch (error) {
      return await this.handlingError<IEmbeddingResponse>(error, async () => {
        return await this.post(path, { input: input });
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
      const responce = await this.post(path, { model, input });
      return responce.data;
    } catch (error) {
      return await this.handlingError<ISummarizeResponse[]>(error, async () => {
        return await this.post(path, { model, input });
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
      const response = await this.postFiles(pathToFile, purpose);
      return response.data;
    } catch (error) {
      return await this.handlingError<IFile>(error, async () => {
        return await this.postFiles(pathToFile, purpose);
      });
    }
  }
}

export { GigaChat, GigaChatError };
