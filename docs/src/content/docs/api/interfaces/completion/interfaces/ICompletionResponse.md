---
editUrl: false
next: false
prev: false
title: "ICompletionResponse"
---

Defined in: [interfaces/completion.ts:61](https://github.com/zloishavrin/gigachat-node/blob/670ebd7ca25a68b6d6d10056ed14010dbca603ea/src/interfaces/completion.ts#L61)

Интерфейс ответа на запрос генерации текста (completion).

## Properties

### choices

> **choices**: [`ICompletionChoice`](/gigachat-node/api/interfaces/completion/interfaces/icompletionchoice/)[]

Defined in: [interfaces/completion.ts:75](https://github.com/zloishavrin/gigachat-node/blob/670ebd7ca25a68b6d6d10056ed14010dbca603ea/src/interfaces/completion.ts#L75)

Список возможных вариантов ответа.

***

### created

> **created**: `number`

Defined in: [interfaces/completion.ts:63](https://github.com/zloishavrin/gigachat-node/blob/670ebd7ca25a68b6d6d10056ed14010dbca603ea/src/interfaces/completion.ts#L63)

Временная метка создания ответа (в формате Unix timestamp).

***

### model

> **model**: `string`

Defined in: [interfaces/completion.ts:66](https://github.com/zloishavrin/gigachat-node/blob/670ebd7ca25a68b6d6d10056ed14010dbca603ea/src/interfaces/completion.ts#L66)

Название модели, использованной для генерации.

***

### object

> **object**: `string`

Defined in: [interfaces/completion.ts:69](https://github.com/zloishavrin/gigachat-node/blob/670ebd7ca25a68b6d6d10056ed14010dbca603ea/src/interfaces/completion.ts#L69)

Тип объекта ответа (обычно "text_completion").

***

### usage

> **usage**: [`ICompletionUsage`](/gigachat-node/api/interfaces/completion/interfaces/icompletionusage/)

Defined in: [interfaces/completion.ts:72](https://github.com/zloishavrin/gigachat-node/blob/670ebd7ca25a68b6d6d10056ed14010dbca603ea/src/interfaces/completion.ts#L72)

Информация об использовании токенов.
