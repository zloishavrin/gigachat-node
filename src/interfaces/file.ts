/**
 * Интерфейс, представляющий загруженный файл.
 */
export interface IFile {
  /**
   * Размер файла в байтах.
   */
  bytes: number;

  /**
   * Временная метка создания файла (в формате Unix Timestamp).
   */
  created_at: number;

  /**
   * Имя файла.
   */
  filename: string;

  /**
   * Уникальный идентификатор файла.
   */
  id: string;

  /**
   * Тип объекта (например, "file").
   */
  object: string;

  /**
   * Назначение файла (например, "general" или другое).
   */
  purpose: string;

  /**
   * Политика доступа к файлу: `private` (по умолчанию) или `public`.
   * Опциональный параметр.
   */
  access_policy?: 'private' | 'public';
}

/**
 * Ответ на запрос на удаление файла.
 */
export interface IFileDeleteResponse {
  /**
   * Уникальный идентификатор файла.
   */
  id: string;

  /**
   * Признак удаления файла.
   */
  deleted: boolean;
}
