---
editUrl: false
next: false
prev: false
title: "ITokenResponse"
---

Defined in: [interfaces/token.ts:4](https://github.com/zloishavrin/gigachat-node/blob/ab8b775e72c82ff0f01d5047b5aa86d922ba4ef0/src/interfaces/token.ts#L4)

Интерфейс, представляющий ответ с токеном доступа.

## Properties

### access\_token

> **access\_token**: `string`

Defined in: [interfaces/token.ts:8](https://github.com/zloishavrin/gigachat-node/blob/ab8b775e72c82ff0f01d5047b5aa86d922ba4ef0/src/interfaces/token.ts#L8)

Строка токена доступа, используемого для аутентификации API-запросов.

***

### expires\_at

> **expires\_at**: `number`

Defined in: [interfaces/token.ts:13](https://github.com/zloishavrin/gigachat-node/blob/ab8b775e72c82ff0f01d5047b5aa86d922ba4ef0/src/interfaces/token.ts#L13)

Временная метка (timestamp) истечения срока действия токена (в секундах с начала эпохи Unix).
