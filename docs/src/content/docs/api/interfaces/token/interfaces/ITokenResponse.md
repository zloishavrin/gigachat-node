---
editUrl: false
next: false
prev: false
title: "ITokenResponse"
---

Defined in: [src/interfaces/token.ts:4](https://github.com/zloishavrin/gigachat-node/blob/4d407d5ec44fd7231be5e6791fef0440e51d136d/src/interfaces/token.ts#L4)

Интерфейс, представляющий ответ с токеном доступа.

## Properties

### access\_token

> **access\_token**: `string`

Defined in: [src/interfaces/token.ts:8](https://github.com/zloishavrin/gigachat-node/blob/4d407d5ec44fd7231be5e6791fef0440e51d136d/src/interfaces/token.ts#L8)

Строка токена доступа, используемого для аутентификации API-запросов.

***

### expires\_at

> **expires\_at**: `number`

Defined in: [src/interfaces/token.ts:13](https://github.com/zloishavrin/gigachat-node/blob/4d407d5ec44fd7231be5e6791fef0440e51d136d/src/interfaces/token.ts#L13)

Временная метка (timestamp) истечения срока действия токена (в секундах с начала эпохи Unix).
