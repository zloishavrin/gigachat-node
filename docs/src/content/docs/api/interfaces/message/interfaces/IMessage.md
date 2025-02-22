---
editUrl: false
next: false
prev: false
title: "IMessage"
---

Defined in: [src/interfaces/message.ts:4](https://github.com/zloishavrin/gigachat-node/blob/137e08cbe11dfa1982a72b2703bae1a7241cf4ea/src/interfaces/message.ts#L4)

Интерфейс, представляющий сообщение в чате.

## Properties

### content

> **content**: `string`

Defined in: [src/interfaces/message.ts:17](https://github.com/zloishavrin/gigachat-node/blob/137e08cbe11dfa1982a72b2703bae1a7241cf4ea/src/interfaces/message.ts#L17)

Текстовое содержимое сообщения.

***

### image?

> `optional` **image**: `string`

Defined in: [src/interfaces/message.ts:22](https://github.com/zloishavrin/gigachat-node/blob/137e08cbe11dfa1982a72b2703bae1a7241cf4ea/src/interfaces/message.ts#L22)

Опциональный параметр — ссылка на изображение, прикреплённое к сообщению.

***

### role

> **role**: `"user"` \| `"assistant"` \| `"system"` \| `"search_result"`

Defined in: [src/interfaces/message.ts:12](https://github.com/zloishavrin/gigachat-node/blob/137e08cbe11dfa1982a72b2703bae1a7241cf4ea/src/interfaces/message.ts#L12)

Роль отправителя сообщения.
- `user` — сообщение от пользователя.
- `assistant` — сообщение от ассистента (ИИ).
- `system` — системное сообщение.
- `search_result` — результат поиска.
