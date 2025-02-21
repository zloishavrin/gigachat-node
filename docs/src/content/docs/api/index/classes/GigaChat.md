---
editUrl: false
next: false
prev: false
title: "GigaChat"
---

Defined in: [index.ts:22](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/index.ts#L22)

Класс для взаимодействия с API GigaChat.
Позволяет выполнять авторизацию, отправлять запросы к модели, загружать файлы и работать с потоками данных.

## Constructors

### new GigaChat()

> **new GigaChat**(`config`): [`GigaChat`](/api/index/classes/gigachat/)

Defined in: [index.ts:82](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/index.ts#L82)

Создает новый экземпляр GigaChat.

#### Parameters

##### config

[`GigaChatConfig`](/api/interfaces/config/interfaces/gigachatconfig/)

Конфигурация клиента.

#### Returns

[`GigaChat`](/api/index/classes/gigachat/)

## Properties

### authorization

> **authorization**: `undefined` \| `string`

Defined in: [index.ts:26](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/index.ts#L26)

Токен авторизации для API.

## Methods

### allModels()

> **allModels**(): `Promise`\<[`IAllModelResponse`](/api/interfaces/model/interfaces/iallmodelresponse/)\>

Defined in: [index.ts:329](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/index.ts#L329)

Получает список всех моделей.

#### Returns

`Promise`\<[`IAllModelResponse`](/api/interfaces/model/interfaces/iallmodelresponse/)\>

Ответ сервера с моделями.

***

### completion()

> **completion**(`data`): `Promise`\<[`ICompletionResponse`](/api/interfaces/completion/interfaces/icompletionresponse/)\>

Defined in: [index.ts:258](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/index.ts#L258)

Отправляет запрос на завершение чата.

#### Parameters

##### data

[`ICompletionRequest`](/api/interfaces/completion/interfaces/icompletionrequest/)

Данные запроса.

#### Returns

`Promise`\<[`ICompletionResponse`](/api/interfaces/completion/interfaces/icompletionresponse/)\>

Ответ сервера.

***

### completionStream()

> **completionStream**(`data`): `Promise`\<`Readable`\>

Defined in: [index.ts:312](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/index.ts#L312)

Отправляет потоковый запрос на завершение чата.

#### Parameters

##### data

[`ICompletionRequest`](/api/interfaces/completion/interfaces/icompletionrequest/)

Данные запроса.

#### Returns

`Promise`\<`Readable`\>

Потоковый ответ сервера.

***

### createToken()

> **createToken**(): `Promise`\<[`ITokenResponse`](/api/interfaces/token/interfaces/itokenresponse/)\>

Defined in: [index.ts:224](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/index.ts#L224)

Создает новый токен доступа.

#### Returns

`Promise`\<[`ITokenResponse`](/api/interfaces/token/interfaces/itokenresponse/)\>

Данные токена.

***

### embedding()

> **embedding**(`input`): `Promise`\<[`IEmbeddingResponse`](/api/interfaces/embedding/interfaces/iembeddingresponse/)\>

Defined in: [index.ts:363](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/index.ts#L363)

Выполняет embedding запроса.

#### Parameters

##### input

`string`[]

Входные данные.

#### Returns

`Promise`\<[`IEmbeddingResponse`](/api/interfaces/embedding/interfaces/iembeddingresponse/)\>

Ответ сервера с embedding.

***

### model()

> **model**(`modelName`): `Promise`\<[`IModelResponse`](/api/interfaces/model/interfaces/imodelresponse/)\>

Defined in: [index.ts:346](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/index.ts#L346)

Получает информацию о конкретной модели.

#### Parameters

##### modelName

`string`

Название модели.

#### Returns

`Promise`\<[`IModelResponse`](/api/interfaces/model/interfaces/imodelresponse/)\>

Ответ сервера с данными модели.

***

### summarize()

> **summarize**(`model`, `input`): `Promise`\<[`ISummarizeResponse`](/api/interfaces/summarize/interfaces/isummarizeresponse/)[]\>

Defined in: [index.ts:381](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/index.ts#L381)

Подсчитывает количество токенов в тексте.

#### Parameters

##### model

`string`

Модель.

##### input

`string`[]

Входные данные.

#### Returns

`Promise`\<[`ISummarizeResponse`](/api/interfaces/summarize/interfaces/isummarizeresponse/)[]\>

Ответ с количеством токенов.

***

### uploadFile()

> **uploadFile**(`pathToFile`, `purpose`?): `Promise`\<[`IFile`](/api/interfaces/file/interfaces/ifile/)\>

Defined in: [index.ts:399](https://github.com/zloishavrin/gigachat-node/blob/925fff59761a1b53e792218c29ac1afe5e64131c/src/index.ts#L399)

Загружает файл в сервис.

#### Parameters

##### pathToFile

`string`

Путь к файлу.

##### purpose?

`string` = `'general'`

Назначение файла.

#### Returns

`Promise`\<[`IFile`](/api/interfaces/file/interfaces/ifile/)\>

Ответ сервера с данными файла.
