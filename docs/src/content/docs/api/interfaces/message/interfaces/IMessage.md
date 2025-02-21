---
editUrl: false
next: false
prev: false
title: "IMessage"
---

Defined in: [interfaces/message.ts:4](https://github.com/zloishavrin/gigachat-node/blob/270933ae05273d48ca8af76e918911b717056515/src/interfaces/message.ts#L4)

Интерфейс, представляющий сообщение в чате.

## Properties

### content

> **content**: `string`

Defined in: [interfaces/message.ts:17](https://github.com/zloishavrin/gigachat-node/blob/270933ae05273d48ca8af76e918911b717056515/src/interfaces/message.ts#L17)

Текстовое содержимое сообщения.

***

### image?

> `optional` **image**: `string`

Defined in: [interfaces/message.ts:22](https://github.com/zloishavrin/gigachat-node/blob/270933ae05273d48ca8af76e918911b717056515/src/interfaces/message.ts#L22)

Опциональный параметр — ссылка на изображение, прикреплённое к сообщению.

***

### role

> **role**: `"user"` \| `"assistant"` \| `"system"` \| `"search_result"`

Defined in: [interfaces/message.ts:12](https://github.com/zloishavrin/gigachat-node/blob/270933ae05273d48ca8af76e918911b717056515/src/interfaces/message.ts#L12)

Роль отправителя сообщения.
- `user` — сообщение от пользователя.
- `assistant` — сообщение от ассистента (ИИ).
- `system` — системное сообщение.
- `search_result` — результат поиска.
