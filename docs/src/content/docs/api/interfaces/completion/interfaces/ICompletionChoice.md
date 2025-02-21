---
editUrl: false
next: false
prev: false
title: "ICompletionChoice"
---

Defined in: [interfaces/completion.ts:95](https://github.com/zloishavrin/gigachat-node/blob/97b2ade0b7f31c93519f3b9ad8ca6ad9972792e9/src/interfaces/completion.ts#L95)

Один из вариантов ответа в completion-запросе.

## Properties

### finish\_reason

> **finish\_reason**: `string`

Defined in: [interfaces/completion.ts:100](https://github.com/zloishavrin/gigachat-node/blob/97b2ade0b7f31c93519f3b9ad8ca6ad9972792e9/src/interfaces/completion.ts#L100)

Причина завершения генерации (например, "stop" или "length").

***

### index

> **index**: `number`

Defined in: [interfaces/completion.ts:97](https://github.com/zloishavrin/gigachat-node/blob/97b2ade0b7f31c93519f3b9ad8ca6ad9972792e9/src/interfaces/completion.ts#L97)

Индекс данного варианта ответа в списке.

***

### message

> **message**: [`IMessage`](/gigachat-node/dist/api/interfaces/message/interfaces/imessage/)

Defined in: [interfaces/completion.ts:103](https://github.com/zloishavrin/gigachat-node/blob/97b2ade0b7f31c93519f3b9ad8ca6ad9972792e9/src/interfaces/completion.ts#L103)

Сгенерированное сообщение с ответом.
