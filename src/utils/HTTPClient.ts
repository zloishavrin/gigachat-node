import { Agent, RequestOptions, request as httpsRequest } from 'https';
import { Readable } from 'stream';

import { FormDataBuilder } from './FormDataBuilder';
import { FormDataFile } from './FormDataFile';
import { GigaChatError } from './GigaChatError';

export class HTTPClient {
  private baseUrl: string;
  private authorization: string | undefined;
  private isIgnoreTSL: boolean;

  constructor(baseUrl: string, authorization: string | undefined, isIgnoreTSL: boolean) {
    this.baseUrl = baseUrl;
    this.authorization = authorization;
    this.isIgnoreTSL = isIgnoreTSL;
  }

  public async setAuthorization(authorization: string) {
    this.authorization = authorization;
  }

  public async makeRequest(
    options: RequestOptions,
    data: string | Buffer,
    redirectCount: number = 0,
    stream: boolean = false,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = httpsRequest(options, (result) => {
        if (
          result.statusCode &&
          result.statusCode >= 300 &&
          result.statusCode < 400 &&
          result.headers.location
        ) {
          if (redirectCount < 5) {
            reject(new Error('Too many redirects'));
            return;
          }

          const redirectUrl = new URL(
            result.headers.location,
            `https://${options.hostname}${options.path}`,
          );
          const newOptions = { ...options };

          newOptions.hostname = redirectUrl.hostname;
          newOptions.path = redirectUrl.pathname + redirectUrl.search;
          newOptions.port = redirectUrl.port || 443;

          if (result.statusCode === 307 || result.statusCode === 308) {
            newOptions.method = options.method;
          } else {
            newOptions.method = 'GET';
            data = '';
          }

          if (newOptions.method === 'GET') {
            delete newOptions.headers!['Content-Length'];
            delete newOptions.headers!['Content-Type'];
          }

          this.makeRequest(newOptions, data, redirectCount + 1)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (result.statusCode && (result.statusCode < 200 || result.statusCode >= 300)) {
          reject(new Error(`HTTP Error: ${result.statusCode} ${result.statusMessage}`));
          return;
        }

        if (options.headers && options.headers.Accept === 'application/jpg') {
          const chunks: Buffer[] = [];
          result.on('data', (chunk) => chunks.push(chunk));
          result.on('end', () => {
            const buffer = Buffer.concat(chunks);
            resolve(buffer);
          });
          return;
        } else if (stream) {
          const transformStream = new Readable({
            read() {},
          });

          result.on('data', (chunk) => {
            const decodedChunk = chunk.toString('utf-8');
            if (decodedChunk.startsWith('data: [DONE]')) {
              transformStream.push(null);
              return;
            } else if (decodedChunk.startsWith('data: ')) {
              transformStream.push(chunk);
            }
          });

          resolve(transformStream);
        } else {
          let rawData = '';

          result.on('data', (chunk) => {
            rawData += chunk;
          });
          result.on('end', () => {
            try {
              const parseData = JSON.parse(rawData);
              resolve(parseData);
            } catch (error) {
              resolve(rawData);
            }
          });
        }
      });

      request.on('error', reject);

      if (options.method === 'POST') {
        request.write(data);
      }

      request.end();
    });
  }

  /**
   * Выполняет GET-запрос к API.
   * @param {string} path Путь запроса.
   * @param {boolean} isImage Флаг для получения изображения.
   * @returns {Promise<any>} Ответ API.
   */
  public async get(path: string, isImage: boolean = false): Promise<any> {
    const url = new URL(`${this.baseUrl}${path}`);
    const options: RequestOptions = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      port: url.port || 443,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.authorization}`,
        Accept: isImage ? 'application/jpg' : 'application/json',
      },
      agent: new Agent({
        rejectUnauthorized: !this.isIgnoreTSL,
      }),
    };

    const response = await this.makeRequest(options, '');
    return response;
  }

  /**
   * Выполняет POST-запрос к API.
   * @param {string} path Путь запроса.
   * @param {object} data Данные запроса.
   * @param {boolean} [stream=false] Флаг для потокового ответа.
   * @returns {Promise<any>} Ответ API.
   */
  public async post(path: string, data: object, stream: boolean = false): Promise<any> {
    const url = new URL(`${this.baseUrl}${path}`);
    const dataString = JSON.stringify(data);

    const options: RequestOptions = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      port: url.port || 443,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.authorization}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataString),
      },
      agent: new Agent({
        rejectUnauthorized: !this.isIgnoreTSL,
      }),
    };

    const response = await this.makeRequest(options, dataString, 0, stream);
    return response;
  }

  /**
   * Загружает файл на сервер
   * @param {string} pathToFile Путь до файла.
   * @param {string} purpose Признак использования.
   * @returns {Promise<IFile>} Ответ API.
   */
  public async postFiles(pathToFile: string, purpose: string): Promise<any> {
    const file = new FormDataFile(pathToFile);
    const formData = new FormDataBuilder();

    formData.appendField('purpose', purpose);
    formData.appendFile('file', file);

    const url = new URL(`${this.baseUrl}/files`);
    const options: RequestOptions = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      port: url.port || 443,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.authorization}`,
        Accept: 'application/json',
        ...formData.getHeaders(),
      },
      agent: new Agent({
        rejectUnauthorized: !this.isIgnoreTSL,
      }),
    };

    try {
      const response = await this.makeRequest(options, formData.getBody());
      return response;
    } catch (error) {
      throw new GigaChatError(`File upload failed: ${error}`, 'FILE_UPLOAD_ERROR');
    }
  }
}
