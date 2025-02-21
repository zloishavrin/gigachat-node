/**
 * Класс ошибки API GigaChat с дополнительной информацией
 * @class
 * @extends Error
 * @property {string} code - Уникальный код ошибки для идентификации типа проблемы
 * @property {string} name - Название ошибки (всегда 'GigaChatError')
 *
 * @example
 * try {
 *   await gigachat.completion(...);
 * } catch (error) {
 *   if (error instanceof GigaChatError) {
 *     console.error(`Код ошибки: ${error.code}`, error.message);
 *   }
 * }
 */
export class GigaChatError extends Error {
  /**
   * Уникальный код ошибки для программной обработки
   * @type {string}
   */
  public readonly code: string;

  /**
   * Создает экземпляр ошибки GigaChat
   * @constructor
   * @param {string} message Человекочитаемое описание ошибки
   * @param {string} code Уникальный идентификатор типа ошибки
   */
  constructor(message: string, code: string) {
    super(message);
    /**
     * Код ошибки для логирования и обработки
     * @type {string}
     */
    this.code = code;

    /**
     * Название класса ошибки
     * @type {string}
     */
    this.name = 'GigaChatError';
  }
}
