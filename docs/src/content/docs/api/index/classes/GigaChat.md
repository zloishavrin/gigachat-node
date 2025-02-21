---
editUrl: false
next: false
prev: false
title: "GigaChat"
---

Defined in: [src/index.ts:25](https://github.com/zloishavrin/gigachat-node/blob/31a44f8e658d314de1a3003c0dbac432e04dfa0f/src/index.ts#L25)

Класс для взаимодействия с API GigaChat.
Позволяет выполнять авторизацию, отправлять запросы к модели, загружать файлы и работать с потоками данных.

## Constructors

### new GigaChat()

> **new GigaChat**(`config`): [`GigaChat`](/gigachat-node/api/index/classes/gigachat/)

Defined in: [src/index.ts:85](https://github.com/zloishavrin/gigachat-node/blob/31a44f8e658d314de1a3003c0dbac432e04dfa0f/src/index.ts#L85)

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

Defined in: [src/index.ts:29](https://github.com/zloishavrin/gigachat-node/blob/31a44f8e658d314de1a3003c0dbac432e04dfa0f/src/index.ts#L29)

Токен авторизации для API.

## Methods

### allModels()

> **allModels**(): `Promise`\<[`IAllModelResponse`](/gigachat-node/api/interfaces/model/interfaces/iallmodelresponse/)\>

Defined in: [src/index.ts:353](https://github.com/zloishavrin/gigachat-node/blob/31a44f8e658d314de1a3003c0dbac432e04dfa0f/src/index.ts#L353)

Получает список всех моделей.

#### Returns

`Promise`\<[`IAllModelResponse`](/gigachat-node/api/interfaces/model/interfaces/iallmodelresponse/)\>

Ответ сервера с моделями.

***

### completion()

> **completion**(`data`): `Promise`\<[`ICompletionResponse`](/gigachat-node/api/interfaces/completion/interfaces/icompletionresponse/)\>

Defined in: [src/index.ts:282](https://github.com/zloishavrin/gigachat-node/blob/31a44f8e658d314de1a3003c0dbac432e04dfa0f/src/index.ts#L282)

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

Defined in: [src/index.ts:336](https://github.com/zloishavrin/gigachat-node/blob/31a44f8e658d314de1a3003c0dbac432e04dfa0f/src/index.ts#L336)

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

Defined in: [src/index.ts:245](https://github.com/zloishavrin/gigachat-node/blob/31a44f8e658d314de1a3003c0dbac432e04dfa0f/src/index.ts#L245)

Создает новый токен доступа.

#### Returns

`Promise`\<[`ITokenResponse`](/gigachat-node/api/interfaces/token/interfaces/itokenresponse/)\>

Данные токена.

***

### embedding()

> **embedding**(`input`): `Promise`\<[`IEmbeddingResponse`](/gigachat-node/api/interfaces/embedding/interfaces/iembeddingresponse/)\>

Defined in: [src/index.ts:387](https://github.com/zloishavrin/gigachat-node/blob/31a44f8e658d314de1a3003c0dbac432e04dfa0f/src/index.ts#L387)

Выполняет embedding запроса.

#### Parameters

##### input

`string`[]

Входные данные.

#### Returns

`Promise`\<[`IEmbeddingResponse`](/gigachat-node/api/interfaces/embedding/interfaces/iembeddingresponse/)\>

Ответ сервера с embedding.

***

### model()

> **model**(`modelName`): `Promise`\<[`IModelResponse`](/gigachat-node/api/interfaces/model/interfaces/imodelresponse/)\>

Defined in: [src/index.ts:370](https://github.com/zloishavrin/gigachat-node/blob/31a44f8e658d314de1a3003c0dbac432e04dfa0f/src/index.ts#L370)

Получает информацию о конкретной модели.

#### Parameters

##### modelName

`string`

Название модели.

#### Returns

`Promise`\<[`IModelResponse`](/gigachat-node/api/interfaces/model/interfaces/imodelresponse/)\>

Ответ сервера с данными модели.

***

### summarize()

> **summarize**(`model`, `input`): `Promise`\<[`ISummarizeResponse`](/gigachat-node/api/interfaces/summarize/interfaces/isummarizeresponse/)[]\>

Defined in: [src/index.ts:405](https://github.com/zloishavrin/gigachat-node/blob/31a44f8e658d314de1a3003c0dbac432e04dfa0f/src/index.ts#L405)

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

Defined in: [src/index.ts:423](https://github.com/zloishavrin/gigachat-node/blob/31a44f8e658d314de1a3003c0dbac432e04dfa0f/src/index.ts#L423)

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
