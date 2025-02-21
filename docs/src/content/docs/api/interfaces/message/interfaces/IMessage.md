---
editUrl: false
next: false
prev: false
title: "IMessage"
---

Defined in: [interfaces/message.ts:4](https://github.com/zloishavrin/gigachat-node/blob/caa3650af4fe67dae9b8b26de5173c6609712947/src/interfaces/message.ts#L4)

Интерфейс, представляющий сообщение в чате.

## Properties

### content

> **content**: `string`

Defined in: [interfaces/message.ts:17](https://github.com/zloishavrin/gigachat-node/blob/caa3650af4fe67dae9b8b26de5173c6609712947/src/interfaces/message.ts#L17)

Текстовое содержимое сообщения.

***

### image?

> `optional` **image**: `string`

Defined in: [interfaces/message.ts:22](https://github.com/zloishavrin/gigachat-node/blob/caa3650af4fe67dae9b8b26de5173c6609712947/src/interfaces/message.ts#L22)

Опциональный параметр — ссылка на изображение, прикреплённое к сообщению.

***

### role

> **role**: `"user"` \| `"assistant"` \| `"system"` \| `"search_result"`

Defined in: [interfaces/message.ts:12](https://github.com/zloishavrin/gigachat-node/blob/caa3650af4fe67dae9b8b26de5173c6609712947/src/interfaces/message.ts#L12)

Роль отправителя сообщения.
- `user` — сообщение от пользователя.
- `assistant` — сообщение от ассистента (ИИ).
- `system` — системное сообщение.
- `search_result` — результат поиска.
