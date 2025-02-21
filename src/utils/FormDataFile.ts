import { statSync, readFileSync } from 'fs';
import { basename, extname } from 'path';

/**
 * Класс для работы с файлами при загрузке через форму. Автоматически определяет MIME-тип и размер файла.
 *
 * @class
 * @property {string} name - Имя файла (например: "изображение.png")
 * @property {string} mimeType - Определенный MIME-тип на основе расширения файла
 * @property {number} size - Размер файла в байтах
 */
export class FormDataFile {
  /** Базовое имя файла, извлеченное из пути */
  public readonly name: string;

  /** Автоматически определенный MIME-тип */
  public readonly mimeType: string;

  /** Размер файла в байтах */
  public readonly size: number;

  /** Полный путь к файлу */
  private readonly filePath: string;

  /**
   * Создает экземпляр FormDataFile
   * @constructor
   * @param {string} pathToFile - Абсолютный или относительный путь к файлу
   * @throws {Error} Если файл недоступен
   */
  constructor(pathToFile: string) {
    this.filePath = pathToFile;
    this.name = basename(pathToFile);
    this.mimeType = this.detectMimeType();
    this.size = this.getFileSize();
  }

  /**
   * Определяет MIME-тип по расширению файла
   * @private
   * @returns {string} MIME-тип из предустановленных значений или 'application/octet-stream'
   */
  private detectMimeType(): string {
    const ext = extname(this.filePath).toLowerCase().slice(1);
    const mimeMap: Record<string, string> = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      txt: 'text/plain',
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    return mimeMap[ext] || 'application/octet-stream';
  }

  /**
   * Получает размер файла с помощью синхронного метода stat
   * @private
   * @returns {number} Размер файла в байтах
   * @throws {Error} Если файл недоступен
   */
  private getFileSize(): number {
    const stats = statSync(this.filePath);
    return stats.size;
  }

  /**
   * Читает содержимое файла в буфер
   * @public
   * @returns {Buffer} Содержимое файла в бинарном виде
   * @throws {Error} Если не удалось прочитать файл
   * @example
   * const file = new FormDataFile('документ.pdf');
   * const buffer = file.readFile();
   */
  public readFile(): Buffer {
    return readFileSync(this.filePath);
  }
}
