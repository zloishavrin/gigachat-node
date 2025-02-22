---
editUrl: false
next: false
prev: false
title: "ICompletionResponse"
---

Defined in: [src/interfaces/completion.ts:71](https://github.com/zloishavrin/gigachat-node/blob/a69ec788472547a03123bbdeeaac3f6751954bc6/src/interfaces/completion.ts#L71)

Интерфейс ответа на запрос генерации текста (completion).

## Properties

### choices

> **choices**: [`ICompletionChoice`](/gigachat-node/api/interfaces/completion/interfaces/icompletionchoice/)[]

Defined in: [src/interfaces/completion.ts:85](https://github.com/zloishavrin/gigachat-node/blob/a69ec788472547a03123bbdeeaac3f6751954bc6/src/interfaces/completion.ts#L85)

Список возможных вариантов ответа.

***

### created

> **created**: `number`

Defined in: [src/interfaces/completion.ts:73](https://github.com/zloishavrin/gigachat-node/blob/a69ec788472547a03123bbdeeaac3f6751954bc6/src/interfaces/completion.ts#L73)

Временная метка создания ответа (в формате Unix timestamp).

***

### model

> **model**: `string`

Defined in: [src/interfaces/completion.ts:76](https://github.com/zloishavrin/gigachat-node/blob/a69ec788472547a03123bbdeeaac3f6751954bc6/src/interfaces/completion.ts#L76)

Название модели, использованной для генерации.

***

### object

> **object**: `string`

Defined in: [src/interfaces/completion.ts:79](https://github.com/zloishavrin/gigachat-node/blob/a69ec788472547a03123bbdeeaac3f6751954bc6/src/interfaces/completion.ts#L79)

Тип объекта ответа (обычно "text_completion").

***

### usage

> **usage**: [`ICompletionUsage`](/gigachat-node/api/interfaces/completion/interfaces/icompletionusage/)

Defined in: [src/interfaces/completion.ts:82](https://github.com/zloishavrin/gigachat-node/blob/a69ec788472547a03123bbdeeaac3f6751954bc6/src/interfaces/completion.ts#L82)

Информация об использовании токенов.
