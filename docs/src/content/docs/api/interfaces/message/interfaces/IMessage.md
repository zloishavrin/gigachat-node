---
editUrl: false
next: false
prev: false
title: "IMessage"
---

Defined in: [src/interfaces/message.ts:4](https://github.com/zloishavrin/gigachat-node/blob/7491b5f2c8bdeb790f9ee24140ed373709f8275c/src/interfaces/message.ts#L4)

Интерфейс, представляющий сообщение в чате.

## Properties

### attachments?

> `optional` **attachments**: \[`string`\]

Defined in: [src/interfaces/message.ts:37](https://github.com/zloishavrin/gigachat-node/blob/7491b5f2c8bdeb790f9ee24140ed373709f8275c/src/interfaces/message.ts#L37)

Массив с уникальными идентификаторами файлов

***

### content

> **content**: `string`

Defined in: [src/interfaces/message.ts:17](https://github.com/zloishavrin/gigachat-node/blob/7491b5f2c8bdeb790f9ee24140ed373709f8275c/src/interfaces/message.ts#L17)

Текстовое содержимое сообщения.

***

### created?

> `optional` **created**: `number`

Defined in: [src/interfaces/message.ts:25](https://github.com/zloishavrin/gigachat-node/blob/7491b5f2c8bdeb790f9ee24140ed373709f8275c/src/interfaces/message.ts#L25)

Временная метка создания ответа (в формате Unix timestamp).

***

### function\_call?

> `optional` **function\_call**: `any`

Defined in: [src/interfaces/message.ts:34](https://github.com/zloishavrin/gigachat-node/blob/7491b5f2c8bdeb790f9ee24140ed373709f8275c/src/interfaces/message.ts#L34)

Объект вызванной функции.

***

### functions\_state\_id?

> `optional` **functions\_state\_id**: `string`

Defined in: [src/interfaces/message.ts:31](https://github.com/zloishavrin/gigachat-node/blob/7491b5f2c8bdeb790f9ee24140ed373709f8275c/src/interfaces/message.ts#L31)

Идентификатор, который объединяет массив функций, переданных в запросе.

***

### image?

> `optional` **image**: `string`

Defined in: [src/interfaces/message.ts:22](https://github.com/zloishavrin/gigachat-node/blob/7491b5f2c8bdeb790f9ee24140ed373709f8275c/src/interfaces/message.ts#L22)

Уникальный идентификатор изображения, если сообщение его содержит.

***

### name?

> `optional` **name**: `string`

Defined in: [src/interfaces/message.ts:28](https://github.com/zloishavrin/gigachat-node/blob/7491b5f2c8bdeb790f9ee24140ed373709f8275c/src/interfaces/message.ts#L28)

Название вызванной встроенной функции.

***

### role

> **role**: `"user"` \| `"assistant"` \| `"system"` \| `"search_result"`

Defined in: [src/interfaces/message.ts:12](https://github.com/zloishavrin/gigachat-node/blob/7491b5f2c8bdeb790f9ee24140ed373709f8275c/src/interfaces/message.ts#L12)

Роль отправителя сообщения.
- `user` — сообщение от пользователя.
- `assistant` — сообщение от ассистента (ИИ).
- `system` — системное сообщение.
- `search_result` — результат поиска.
