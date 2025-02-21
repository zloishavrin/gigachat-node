---
editUrl: false
next: false
prev: false
title: "ICompletionChoice"
---

Defined in: [interfaces/completion.ts:95](https://github.com/zloishavrin/gigachat-node/blob/faf651dc8ae98db0ac572e12a2d3d7bf36dd2ff3/src/interfaces/completion.ts#L95)

Один из вариантов ответа в completion-запросе.

## Properties

### finish\_reason

> **finish\_reason**: `string`

Defined in: [interfaces/completion.ts:100](https://github.com/zloishavrin/gigachat-node/blob/faf651dc8ae98db0ac572e12a2d3d7bf36dd2ff3/src/interfaces/completion.ts#L100)

Причина завершения генерации (например, "stop" или "length").

***

### index

> **index**: `number`

Defined in: [interfaces/completion.ts:97](https://github.com/zloishavrin/gigachat-node/blob/faf651dc8ae98db0ac572e12a2d3d7bf36dd2ff3/src/interfaces/completion.ts#L97)

Индекс данного варианта ответа в списке.

***

### message

> **message**: [`IMessage`](/gigachat-node/api/interfaces/message/interfaces/imessage/)

Defined in: [interfaces/completion.ts:103](https://github.com/zloishavrin/gigachat-node/blob/faf651dc8ae98db0ac572e12a2d3d7bf36dd2ff3/src/interfaces/completion.ts#L103)

Сгенерированное сообщение с ответом.
