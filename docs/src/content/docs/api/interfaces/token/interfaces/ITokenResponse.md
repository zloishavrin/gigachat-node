---
editUrl: false
next: false
prev: false
title: "ITokenResponse"
---

Defined in: [interfaces/token.ts:4](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/interfaces/token.ts#L4)

Интерфейс, представляющий ответ с токеном доступа.

## Properties

### access\_token

> **access\_token**: `string`

Defined in: [interfaces/token.ts:8](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/interfaces/token.ts#L8)

Строка токена доступа, используемого для аутентификации API-запросов.

***

### expires\_at

> **expires\_at**: `number`

Defined in: [interfaces/token.ts:13](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/interfaces/token.ts#L13)

Временная метка (timestamp) истечения срока действия токена (в секундах с начала эпохи Unix).
