---
editUrl: false
next: false
prev: false
title: "IMessage"
---

Defined in: [interfaces/message.ts:4](https://github.com/zloishavrin/gigachat-node/blob/2c7b7714bc6108bfc9bed7a10efa55e8942f5ece/src/interfaces/message.ts#L4)

Интерфейс, представляющий сообщение в чате.

## Properties

### content

> **content**: `string`

Defined in: [interfaces/message.ts:17](https://github.com/zloishavrin/gigachat-node/blob/2c7b7714bc6108bfc9bed7a10efa55e8942f5ece/src/interfaces/message.ts#L17)

Текстовое содержимое сообщения.

***

### image?

> `optional` **image**: `string`

Defined in: [interfaces/message.ts:22](https://github.com/zloishavrin/gigachat-node/blob/2c7b7714bc6108bfc9bed7a10efa55e8942f5ece/src/interfaces/message.ts#L22)

Опциональный параметр — ссылка на изображение, прикреплённое к сообщению.

***

### role

> **role**: `"user"` \| `"assistant"` \| `"system"` \| `"search_result"`

Defined in: [interfaces/message.ts:12](https://github.com/zloishavrin/gigachat-node/blob/2c7b7714bc6108bfc9bed7a10efa55e8942f5ece/src/interfaces/message.ts#L12)

Роль отправителя сообщения.
- `user` — сообщение от пользователя.
- `assistant` — сообщение от ассистента (ИИ).
- `system` — системное сообщение.
- `search_result` — результат поиска.
