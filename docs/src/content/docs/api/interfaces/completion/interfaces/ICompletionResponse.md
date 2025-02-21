---
editUrl: false
next: false
prev: false
title: "ICompletionResponse"
---

Defined in: [interfaces/completion.ts:61](https://github.com/zloishavrin/gigachat-node/blob/6da600b42ccae098cf918eab832f5d434d83a47e/src/interfaces/completion.ts#L61)

Интерфейс ответа на запрос генерации текста (completion).

## Properties

### choices

> **choices**: [`ICompletionChoice`](/gigachat-node/docs/api/interfaces/completion/interfaces/icompletionchoice/)[]

Defined in: [interfaces/completion.ts:75](https://github.com/zloishavrin/gigachat-node/blob/6da600b42ccae098cf918eab832f5d434d83a47e/src/interfaces/completion.ts#L75)

Список возможных вариантов ответа.

***

### created

> **created**: `number`

Defined in: [interfaces/completion.ts:63](https://github.com/zloishavrin/gigachat-node/blob/6da600b42ccae098cf918eab832f5d434d83a47e/src/interfaces/completion.ts#L63)

Временная метка создания ответа (в формате Unix timestamp).

***

### model

> **model**: `string`

Defined in: [interfaces/completion.ts:66](https://github.com/zloishavrin/gigachat-node/blob/6da600b42ccae098cf918eab832f5d434d83a47e/src/interfaces/completion.ts#L66)

Название модели, использованной для генерации.

***

### object

> **object**: `string`

Defined in: [interfaces/completion.ts:69](https://github.com/zloishavrin/gigachat-node/blob/6da600b42ccae098cf918eab832f5d434d83a47e/src/interfaces/completion.ts#L69)

Тип объекта ответа (обычно "text_completion").

***

### usage

> **usage**: [`ICompletionUsage`](/gigachat-node/docs/api/interfaces/completion/interfaces/icompletionusage/)

Defined in: [interfaces/completion.ts:72](https://github.com/zloishavrin/gigachat-node/blob/6da600b42ccae098cf918eab832f5d434d83a47e/src/interfaces/completion.ts#L72)

Информация об использовании токенов.
