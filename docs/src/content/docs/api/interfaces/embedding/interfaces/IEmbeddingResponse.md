---
editUrl: false
next: false
prev: false
title: "IEmbeddingResponse"
---

Defined in: [interfaces/embedding.ts:24](https://github.com/zloishavrin/gigachat-node/blob/97b2ade0b7f31c93519f3b9ad8ca6ad9972792e9/src/interfaces/embedding.ts#L24)

Интерфейс ответа на запрос эмбеддингов.

## Properties

### data

> **data**: [`IEmbedding`](/gigachat-node/dist/api/interfaces/embedding/interfaces/iembedding/)[]

Defined in: [interfaces/embedding.ts:38](https://github.com/zloishavrin/gigachat-node/blob/97b2ade0b7f31c93519f3b9ad8ca6ad9972792e9/src/interfaces/embedding.ts#L38)

Массив эмбеддингов, полученных в ответе.

***

### model

> **model**: `string`

Defined in: [interfaces/embedding.ts:33](https://github.com/zloishavrin/gigachat-node/blob/97b2ade0b7f31c93519f3b9ad8ca6ad9972792e9/src/interfaces/embedding.ts#L33)

Название модели, использованной для генерации эмбеддингов.

***

### object

> **object**: `string`

Defined in: [interfaces/embedding.ts:28](https://github.com/zloishavrin/gigachat-node/blob/97b2ade0b7f31c93519f3b9ad8ca6ad9972792e9/src/interfaces/embedding.ts#L28)

Тип объекта (например, "embedding").
