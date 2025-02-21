/**
 * Интерфейс, представляющий информацию о модели.
 */
export interface IModelResponse {
  /**
   * Уникальный идентификатор модели.
   */
  id: string;

  /**
   * Тип объекта (например, "model").
   */
  object: string;

  /**
   * Владелец модели.
   */
  owned_by: string;
}

/**
 * Интерфейс, представляющий ответ, содержащий список доступных моделей.
 */
export interface IAllModelResponse {
  /**
   * Тип объекта (например, "list").
   */
  object: string;

  /**
   * Список моделей.
   */
  data: IModelResponse[];
}
