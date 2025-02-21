---
editUrl: false
next: false
prev: false
title: "IEmbeddingResponse"
---

Defined in: [interfaces/embedding.ts:24](https://github.com/zloishavrin/gigachat-node/blob/47c78eac26545b84775109a9c57c188ab4eaef6c/src/interfaces/embedding.ts#L24)

Интерфейс ответа на запрос эмбеддингов.

## Properties

### data

> **data**: [`IEmbedding`](/api/interfaces/embedding/interfaces/iembedding/)[]

Defined in: [interfaces/embedding.ts:38](https://github.com/zloishavrin/gigachat-node/blob/47c78eac26545b84775109a9c57c188ab4eaef6c/src/interfaces/embedding.ts#L38)

Массив эмбеддингов, полученных в ответе.

***

### model

> **model**: `string`

Defined in: [interfaces/embedding.ts:33](https://github.com/zloishavrin/gigachat-node/blob/47c78eac26545b84775109a9c57c188ab4eaef6c/src/interfaces/embedding.ts#L33)

Название модели, использованной для генерации эмбеддингов.

***

### object

> **object**: `string`

Defined in: [interfaces/embedding.ts:28](https://github.com/zloishavrin/gigachat-node/blob/47c78eac26545b84775109a9c57c188ab4eaef6c/src/interfaces/embedding.ts#L28)

Тип объекта (например, "embedding").
