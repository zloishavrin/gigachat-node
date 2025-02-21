---
editUrl: false
next: false
prev: false
title: "ICompletionRequest"
---

Defined in: [interfaces/completion.ts:6](https://github.com/zloishavrin/gigachat-node/blob/e0c7f2246045fd98c57115a30a64631c7a91f514/src/interfaces/completion.ts#L6)

Интерфейс запроса на генерацию текста (completion).

## Properties

### max\_tokens?

> `optional` **max\_tokens**: `number`

Defined in: [interfaces/completion.ts:37](https://github.com/zloishavrin/gigachat-node/blob/e0c7f2246045fd98c57115a30a64631c7a91f514/src/interfaces/completion.ts#L37)

Максимальное количество токенов в ответе.
Если не указано, используется значение по умолчанию модели.

***

### messages

> **messages**: [`IMessage`](/api/interfaces/message/interfaces/imessage/)[]

Defined in: [interfaces/completion.ts:11](https://github.com/zloishavrin/gigachat-node/blob/e0c7f2246045fd98c57115a30a64631c7a91f514/src/interfaces/completion.ts#L11)

Массив сообщений, на основе которых будет сформирован ответ.

***

### model

> **model**: `string`

Defined in: [interfaces/completion.ts:8](https://github.com/zloishavrin/gigachat-node/blob/e0c7f2246045fd98c57115a30a64631c7a91f514/src/interfaces/completion.ts#L8)

Название модели, которая будет использоваться для генерации.

***

### n?

> `optional` **n**: `number`

Defined in: [interfaces/completion.ts:31](https://github.com/zloishavrin/gigachat-node/blob/e0c7f2246045fd98c57115a30a64631c7a91f514/src/interfaces/completion.ts#L31)

Количество альтернативных ответов, которые должны быть сгенерированы.

#### Default

```ts
1
```

***

### profanity\_check?

> `optional` **profanity\_check**: `boolean`

Defined in: [interfaces/completion.ts:55](https://github.com/zloishavrin/gigachat-node/blob/e0c7f2246045fd98c57115a30a64631c7a91f514/src/interfaces/completion.ts#L55)

Флаг проверки ненормативной лексики в сгенерированном тексте.

#### Default

```ts
false
```

***

### repetition\_penalty?

> `optional` **repetition\_penalty**: `number`

Defined in: [interfaces/completion.ts:43](https://github.com/zloishavrin/gigachat-node/blob/e0c7f2246045fd98c57115a30a64631c7a91f514/src/interfaces/completion.ts#L43)

Коэффициент штрафа за повторение слов или фраз.
Чем выше значение, тем меньше модель склонна повторяться.

***

### temperature?

> `optional` **temperature**: `number`

Defined in: [interfaces/completion.ts:18](https://github.com/zloishavrin/gigachat-node/blob/e0c7f2246045fd98c57115a30a64631c7a91f514/src/interfaces/completion.ts#L18)

Температура генерации (чем выше значение, тем более случайными будут ответы).
Значение должно быть от 0 до 1.

#### Default

```ts
1
```

***

### top\_p?

> `optional` **top\_p**: `number`

Defined in: [interfaces/completion.ts:25](https://github.com/zloishavrin/gigachat-node/blob/e0c7f2246045fd98c57115a30a64631c7a91f514/src/interfaces/completion.ts#L25)

Альтернативный параметр управления случайностью выборки токенов.
Используется вместо `temperature`, если задано.
Значение должно быть от 0 до 1.

***

### update\_interval?

> `optional` **update\_interval**: `number`

Defined in: [interfaces/completion.ts:49](https://github.com/zloishavrin/gigachat-node/blob/e0c7f2246045fd98c57115a30a64631c7a91f514/src/interfaces/completion.ts#L49)

Интервал обновления потока данных (в миллисекундах).
Используется в потоковом режиме.
