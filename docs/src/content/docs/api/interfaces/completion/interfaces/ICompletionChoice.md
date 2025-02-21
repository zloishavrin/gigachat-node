---
editUrl: false
next: false
prev: false
title: "ICompletionChoice"
---

Defined in: [src/interfaces/completion.ts:95](https://github.com/zloishavrin/gigachat-node/blob/4d407d5ec44fd7231be5e6791fef0440e51d136d/src/interfaces/completion.ts#L95)

Один из вариантов ответа в completion-запросе.

## Properties

### finish\_reason

> **finish\_reason**: `string`

Defined in: [src/interfaces/completion.ts:100](https://github.com/zloishavrin/gigachat-node/blob/4d407d5ec44fd7231be5e6791fef0440e51d136d/src/interfaces/completion.ts#L100)

Причина завершения генерации (например, "stop" или "length").

***

### index

> **index**: `number`

Defined in: [src/interfaces/completion.ts:97](https://github.com/zloishavrin/gigachat-node/blob/4d407d5ec44fd7231be5e6791fef0440e51d136d/src/interfaces/completion.ts#L97)

Индекс данного варианта ответа в списке.

***

### message

> **message**: [`IMessage`](/gigachat-node/api/interfaces/message/interfaces/imessage/)

Defined in: [src/interfaces/completion.ts:103](https://github.com/zloishavrin/gigachat-node/blob/4d407d5ec44fd7231be5e6791fef0440e51d136d/src/interfaces/completion.ts#L103)

Сгенерированное сообщение с ответом.
