---
editUrl: false
next: false
prev: false
title: "GigaChat"
---

Defined in: [src/index.ts:22](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L22)

Класс для взаимодействия с API GigaChat.
Позволяет выполнять авторизацию, отправлять запросы к модели, загружать файлы и работать с потоками данных.

## Constructors

### new GigaChat()

> **new GigaChat**(`config`): [`GigaChat`](/gigachat-node/api/index/classes/gigachat/)

Defined in: [src/index.ts:82](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L82)

Создает новый экземпляр GigaChat.

#### Parameters

##### config

[`GigaChatConfig`](/gigachat-node/api/interfaces/config/interfaces/gigachatconfig/)

Конфигурация клиента.

#### Returns

[`GigaChat`](/gigachat-node/api/index/classes/gigachat/)

## Properties

### authorization

> **authorization**: `undefined` \| `string`

Defined in: [src/index.ts:31](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L31)

Токен авторизации для API.

## Methods

### allModels()

> **allModels**(): `Promise`\<[`IAllModelResponse`](/gigachat-node/api/interfaces/model/interfaces/iallmodelresponse/)\>

Defined in: [src/index.ts:275](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L275)

Получает список всех моделей.

#### Returns

`Promise`\<[`IAllModelResponse`](/gigachat-node/api/interfaces/model/interfaces/iallmodelresponse/)\>

Ответ сервера с моделями.

***

### completion()

> **completion**(`data`): `Promise`\<[`ICompletionResponse`](/gigachat-node/api/interfaces/completion/interfaces/icompletionresponse/)\>

Defined in: [src/index.ts:229](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L229)

Отправляет запрос на завершение чата.

#### Parameters

##### data

[`ICompletionRequest`](/gigachat-node/api/interfaces/completion/interfaces/icompletionrequest/)

Данные запроса.

#### Returns

`Promise`\<[`ICompletionResponse`](/gigachat-node/api/interfaces/completion/interfaces/icompletionresponse/)\>

Ответ сервера.

***

### completionStream()

> **completionStream**(`data`): `Promise`\<`Readable`\>

Defined in: [src/index.ts:258](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L258)

Отправляет потоковый запрос на завершение чата.

#### Parameters

##### data

[`ICompletionRequest`](/gigachat-node/api/interfaces/completion/interfaces/icompletionrequest/)

Данные запроса.

#### Returns

`Promise`\<`Readable`\>

Потоковый ответ сервера.

***

### createToken()

> **createToken**(): `Promise`\<[`ITokenResponse`](/gigachat-node/api/interfaces/token/interfaces/itokenresponse/)\>

Defined in: [src/index.ts:178](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L178)

Создает новый токен доступа.

#### Returns

`Promise`\<[`ITokenResponse`](/gigachat-node/api/interfaces/token/interfaces/itokenresponse/)\>

Данные токена.

***

### deleteFile()

> **deleteFile**(`fileId`): `Promise`\<[`IFileDeleteResponse`](/gigachat-node/api/interfaces/file/interfaces/ifiledeleteresponse/)\>

Defined in: [src/index.ts:377](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L377)

Удаление файла по идентификатору.

#### Parameters

##### fileId

`string`

Идентификатор файла.

#### Returns

`Promise`\<[`IFileDeleteResponse`](/gigachat-node/api/interfaces/file/interfaces/ifiledeleteresponse/)\>

Ответ сервера.

***

### downloadFile()

> **downloadFile**(`fileId`): `Promise`\<`any`\>

Defined in: [src/index.ts:405](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L405)

#### Parameters

##### fileId

`string`

#### Returns

`Promise`\<`any`\>

***

### embedding()

> **embedding**(`input`): `Promise`\<[`IEmbeddingResponse`](/gigachat-node/api/interfaces/embedding/interfaces/iembeddingresponse/)\>

Defined in: [src/index.ts:292](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L292)

Выполняет embedding запроса.

#### Parameters

##### input

`string`[]

Входные данные.

#### Returns

`Promise`\<[`IEmbeddingResponse`](/gigachat-node/api/interfaces/embedding/interfaces/iembeddingresponse/)\>

Ответ сервера с embedding.

***

### getAllFiles()

> **getAllFiles**(): `Promise`\<[`IFile`](/gigachat-node/api/interfaces/file/interfaces/ifile/)[]\>

Defined in: [src/index.ts:343](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L343)

Получение списка доступных файлов.

#### Returns

`Promise`\<[`IFile`](/gigachat-node/api/interfaces/file/interfaces/ifile/)[]\>

Массив объектов с информацией о доступных файлах.

***

### getBalance()

> **getBalance**(): `Promise`\<[`IBalanceResponse`](/gigachat-node/api/interfaces/balance/interfaces/ibalanceresponse/)\>

Defined in: [src/index.ts:393](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L393)

Получение баланса токенов по всем моделям.

#### Returns

`Promise`\<[`IBalanceResponse`](/gigachat-node/api/interfaces/balance/interfaces/ibalanceresponse/)\>

Ответ сервера с информацией о балансе.

***

### getFileInfo()

> **getFileInfo**(`fileId`): `Promise`\<[`IFile`](/gigachat-node/api/interfaces/file/interfaces/ifile/)\>

Defined in: [src/index.ts:360](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L360)

Получение информации о файле по идентификатору.

#### Parameters

##### fileId

`string`

Идентификатор файла.

#### Returns

`Promise`\<[`IFile`](/gigachat-node/api/interfaces/file/interfaces/ifile/)\>

Объект с информацией о файле.

***

### summarize()

> **summarize**(`model`, `input`): `Promise`\<[`ISummarizeResponse`](/gigachat-node/api/interfaces/summarize/interfaces/isummarizeresponse/)[]\>

Defined in: [src/index.ts:310](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L310)

Подсчитывает количество токенов в тексте.

#### Parameters

##### model

`string`

Модель.

##### input

`string`[]

Входные данные.

#### Returns

`Promise`\<[`ISummarizeResponse`](/gigachat-node/api/interfaces/summarize/interfaces/isummarizeresponse/)[]\>

Ответ с количеством токенов.

***

### uploadFile()

> **uploadFile**(`pathToFile`, `purpose`?): `Promise`\<[`IFile`](/gigachat-node/api/interfaces/file/interfaces/ifile/)\>

Defined in: [src/index.ts:328](https://github.com/zloishavrin/gigachat-node/blob/73265cae60cba8596986acf3536cf528c60d2cf0/src/index.ts#L328)

Загружает файл в сервис.

#### Parameters

##### pathToFile

`string`

Путь к файлу.

##### purpose?

`string` = `'general'`

Назначение файла.

#### Returns

`Promise`\<[`IFile`](/gigachat-node/api/interfaces/file/interfaces/ifile/)\>

Ответ сервера с данными файла.
