---
editUrl: false
next: false
prev: false
title: "ICompletionChoice"
---

Defined in: [src/interfaces/completion.ts:105](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/interfaces/completion.ts#L105)

Один из вариантов ответа в completion-запросе.

## Properties

### finish\_reason

> **finish\_reason**: `string`

Defined in: [src/interfaces/completion.ts:110](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/interfaces/completion.ts#L110)

Причина завершения генерации (например, "stop" или "length").

***

### index

> **index**: `number`

Defined in: [src/interfaces/completion.ts:107](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/interfaces/completion.ts#L107)

Индекс данного варианта ответа в списке.

***

### message

> **message**: [`IMessage`](/gigachat-node/api/interfaces/message/interfaces/imessage/)

Defined in: [src/interfaces/completion.ts:113](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/interfaces/completion.ts#L113)

Сгенерированное сообщение с ответом.
