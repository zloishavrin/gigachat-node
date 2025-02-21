---
editUrl: false
next: false
prev: false
title: "IFile"
---

Defined in: [src/interfaces/file.ts:4](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/file.ts#L4)

Интерфейс, представляющий загруженный файл.

## Properties

### access\_policy?

> `optional` **access\_policy**: `"private"` \| `"public"`

Defined in: [src/interfaces/file.ts:39](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/file.ts#L39)

Политика доступа к файлу: `private` (по умолчанию) или `public`.
Опциональный параметр.

***

### bytes

> **bytes**: `number`

Defined in: [src/interfaces/file.ts:8](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/file.ts#L8)

Размер файла в байтах.

***

### created\_at

> **created\_at**: `number`

Defined in: [src/interfaces/file.ts:13](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/file.ts#L13)

Временная метка создания файла (в формате Unix Timestamp).

***

### filename

> **filename**: `string`

Defined in: [src/interfaces/file.ts:18](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/file.ts#L18)

Имя файла.

***

### id

> **id**: `string`

Defined in: [src/interfaces/file.ts:23](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/file.ts#L23)

Уникальный идентификатор файла.

***

### object

> **object**: `string`

Defined in: [src/interfaces/file.ts:28](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/file.ts#L28)

Тип объекта (например, "file").

***

### purpose

> **purpose**: `string`

Defined in: [src/interfaces/file.ts:33](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/file.ts#L33)

Назначение файла (например, "general" или другое).
