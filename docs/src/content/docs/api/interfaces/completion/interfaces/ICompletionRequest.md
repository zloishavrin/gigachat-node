---
editUrl: false
next: false
prev: false
title: "ICompletionRequest"
---

Defined in: [src/interfaces/completion.ts:6](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/completion.ts#L6)

Интерфейс запроса на генерацию текста (completion).

## Properties

### max\_tokens?

> `optional` **max\_tokens**: `number`

Defined in: [src/interfaces/completion.ts:37](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/completion.ts#L37)

Максимальное количество токенов в ответе.
Если не указано, используется значение по умолчанию модели.

***

### messages

> **messages**: [`IMessage`](/gigachat-node/api/interfaces/message/interfaces/imessage/)[]

Defined in: [src/interfaces/completion.ts:11](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/completion.ts#L11)

Массив сообщений, на основе которых будет сформирован ответ.

***

### model

> **model**: `string`

Defined in: [src/interfaces/completion.ts:8](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/completion.ts#L8)

Название модели, которая будет использоваться для генерации.

***

### n?

> `optional` **n**: `number`

Defined in: [src/interfaces/completion.ts:31](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/completion.ts#L31)

Количество альтернативных ответов, которые должны быть сгенерированы.

#### Default

```ts
1
```

***

### profanity\_check?

> `optional` **profanity\_check**: `boolean`

Defined in: [src/interfaces/completion.ts:55](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/completion.ts#L55)

Флаг проверки ненормативной лексики в сгенерированном тексте.

#### Default

```ts
false
```

***

### repetition\_penalty?

> `optional` **repetition\_penalty**: `number`

Defined in: [src/interfaces/completion.ts:43](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/completion.ts#L43)

Коэффициент штрафа за повторение слов или фраз.
Чем выше значение, тем меньше модель склонна повторяться.

***

### temperature?

> `optional` **temperature**: `number`

Defined in: [src/interfaces/completion.ts:18](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/completion.ts#L18)

Температура генерации (чем выше значение, тем более случайными будут ответы).
Значение должно быть от 0 до 1.

#### Default

```ts
1
```

***

### top\_p?

> `optional` **top\_p**: `number`

Defined in: [src/interfaces/completion.ts:25](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/completion.ts#L25)

Альтернативный параметр управления случайностью выборки токенов.
Используется вместо `temperature`, если задано.
Значение должно быть от 0 до 1.

***

### update\_interval?

> `optional` **update\_interval**: `number`

Defined in: [src/interfaces/completion.ts:49](https://github.com/zloishavrin/gigachat-node/blob/d9ff671dd4bbaa048a2c55a6dea62d3e75e84718/src/interfaces/completion.ts#L49)

Интервал обновления потока данных (в миллисекундах).
Используется в потоковом режиме.
