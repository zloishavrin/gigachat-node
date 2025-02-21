import { randomBytes } from 'crypto';

import { FormDataFile } from './FormDataFile';

/**
 * Класс для построения multipart/form-data запросов
 * @class
 * @property {string} boundary Уникальный разделитель частей формы
 * @property {Buffer[]} parts Буферы данных частей формы
 */
export class FormDataBuilder {
  /** Уникальный разделитель частей формы */
  private readonly boundary: string;

  /** Буферы данных частей формы */
  private readonly parts: Buffer[] = [];

  /** Разделитель строк согласно стандарту */
  private readonly lineEnding = '\r\n';

  /**
   * Создает экземпляр FormDataBuilder
   * @constructor
   * @description Генерирует уникальный boundary для разделения частей формы
   */
  constructor() {
    this.boundary = `----${randomBytes(16).toString('hex')}`;
  }

  /**
   * Добавляет текстовое поле в форму
   * @param {string} name Название поля
   * @param {string} value Значение поля
   * @example
   * builder.appendField('username', 'JohnDoe');
   */
  public appendField(name: string, value: string): void {
    this.parts.push(
      Buffer.from(
        `--${this.boundary}${this.lineEnding}` +
          `Content-Disposition: form-data; name="${name}"${this.lineEnding}${this.lineEnding}` +
          `${value}${this.lineEnding}`,
      ),
    );
  }

  /**
   * Добавляет файл в форму
   * @param {string} name Название поля для файла
   * @param {FormDataFile} file Экземпляр файла
   * @example
   * const file = new FormDataFile('photo.jpg');
   * builder.appendFile('avatar', file);
   */
  public appendFile(name: string, file: FormDataFile): void {
    const fileHeader =
      `--${this.boundary}${this.lineEnding}` +
      `Content-Disposition: form-data; name="${name}"; filename="${file.name}"${this.lineEnding}` +
      `Content-Type: ${file.mimeType}${this.lineEnding}${this.lineEnding}`;

    this.parts.push(Buffer.from(fileHeader), file.readFile(), Buffer.from(this.lineEnding));
  }

  /**
   * Возвращает заголовки для HTTP-запроса
   * @returns {Object} Объект с заголовками
   * @property {string} Content-Type MIME-тип с boundary
   * @property {string} [Content-Length] Размер тела запроса
   */
  public getHeaders(): { 'Content-Type': string; 'Content-Length'?: string } {
    return {
      'Content-Type': `multipart/form-data; boundary=${this.boundary}`,
      'Content-Length': this.getTotalLength().toString(),
    };
  }

  /**
   * Собирает итоговое тело запроса
   * @returns {Buffer} Буфер с данными формы
   * @description Объединяет все части и добавляет финальный boundary
   */
  public getBody(): Buffer {
    const finalBoundary = Buffer.from(`${this.lineEnding}--${this.boundary}--${this.lineEnding}`);
    return Buffer.concat([...this.parts, finalBoundary]);
  }

  /**
   * Вычисляет общий размер тела запроса
   * @private
   * @returns {number} Общий размер в байтах
   */
  private getTotalLength(): number {
    return (
      this.parts.reduce((acc, part) => acc + part.length, 0) +
      Buffer.from(`${this.lineEnding}--${this.boundary}--${this.lineEnding}`).length
    );
  }
}
