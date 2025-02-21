---
editUrl: false
next: false
prev: false
title: "ICompletionResponse"
---

Defined in: [src/interfaces/completion.ts:61](https://github.com/zloishavrin/gigachat-node/blob/8afb607ad366b0bd14a6dc735a672d9b9cc4bde9/src/interfaces/completion.ts#L61)

Интерфейс ответа на запрос генерации текста (completion).

## Properties

### choices

> **choices**: [`ICompletionChoice`](/gigachat-node/api/interfaces/completion/interfaces/icompletionchoice/)[]

Defined in: [src/interfaces/completion.ts:75](https://github.com/zloishavrin/gigachat-node/blob/8afb607ad366b0bd14a6dc735a672d9b9cc4bde9/src/interfaces/completion.ts#L75)

Список возможных вариантов ответа.

***

### created

> **created**: `number`

Defined in: [src/interfaces/completion.ts:63](https://github.com/zloishavrin/gigachat-node/blob/8afb607ad366b0bd14a6dc735a672d9b9cc4bde9/src/interfaces/completion.ts#L63)

Временная метка создания ответа (в формате Unix timestamp).

***

### model

> **model**: `string`

Defined in: [src/interfaces/completion.ts:66](https://github.com/zloishavrin/gigachat-node/blob/8afb607ad366b0bd14a6dc735a672d9b9cc4bde9/src/interfaces/completion.ts#L66)

Название модели, использованной для генерации.

***

### object

> **object**: `string`

Defined in: [src/interfaces/completion.ts:69](https://github.com/zloishavrin/gigachat-node/blob/8afb607ad366b0bd14a6dc735a672d9b9cc4bde9/src/interfaces/completion.ts#L69)

Тип объекта ответа (обычно "text_completion").

***

### usage

> **usage**: [`ICompletionUsage`](/gigachat-node/api/interfaces/completion/interfaces/icompletionusage/)

Defined in: [src/interfaces/completion.ts:72](https://github.com/zloishavrin/gigachat-node/blob/8afb607ad366b0bd14a6dc735a672d9b9cc4bde9/src/interfaces/completion.ts#L72)

Информация об использовании токенов.
