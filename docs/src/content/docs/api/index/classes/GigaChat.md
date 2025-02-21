---
editUrl: false
next: false
prev: false
title: "GigaChat"
---

Defined in: [index.ts:24](https://github.com/zloishavrin/gigachat-node/blob/d189086914c2675e167ddaa294abadc9d850de3a/src/index.ts#L24)

Класс для взаимодействия с API GigaChat.
Позволяет выполнять авторизацию, отправлять запросы к модели, загружать файлы и работать с потоками данных.

## Constructors

### new GigaChat()

> **new GigaChat**(`config`): [`GigaChat`](/gigachat-node/api/index/classes/gigachat/)

Defined in: [index.ts:84](https://github.com/zloishavrin/gigachat-node/blob/d189086914c2675e167ddaa294abadc9d850de3a/src/index.ts#L84)

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

Defined in: [index.ts:28](https://github.com/zloishavrin/gigachat-node/blob/d189086914c2675e167ddaa294abadc9d850de3a/src/index.ts#L28)

Токен авторизации для API.

## Methods

### allModels()

> **allModels**(): `Promise`\<[`IAllModelResponse`](/gigachat-node/api/interfaces/model/interfaces/iallmodelresponse/)\>

Defined in: [index.ts:334](https://github.com/zloishavrin/gigachat-node/blob/d189086914c2675e167ddaa294abadc9d850de3a/src/index.ts#L334)

Получает список всех моделей.

#### Returns

`Promise`\<[`IAllModelResponse`](/gigachat-node/api/interfaces/model/interfaces/iallmodelresponse/)\>

Ответ сервера с моделями.

***

### completion()

> **completion**(`data`): `Promise`\<[`ICompletionResponse`](/gigachat-node/api/interfaces/completion/interfaces/icompletionresponse/)\>

Defined in: [index.ts:263](https://github.com/zloishavrin/gigachat-node/blob/d189086914c2675e167ddaa294abadc9d850de3a/src/index.ts#L263)

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

Defined in: [index.ts:317](https://github.com/zloishavrin/gigachat-node/blob/d189086914c2675e167ddaa294abadc9d850de3a/src/index.ts#L317)

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

Defined in: [index.ts:229](https://github.com/zloishavrin/gigachat-node/blob/d189086914c2675e167ddaa294abadc9d850de3a/src/index.ts#L229)

Создает новый токен доступа.

#### Returns

`Promise`\<[`ITokenResponse`](/gigachat-node/api/interfaces/token/interfaces/itokenresponse/)\>

Данные токена.

***

### embedding()

> **embedding**(`input`): `Promise`\<[`IEmbeddingResponse`](/gigachat-node/api/interfaces/embedding/interfaces/iembeddingresponse/)\>

Defined in: [index.ts:368](https://github.com/zloishavrin/gigachat-node/blob/d189086914c2675e167ddaa294abadc9d850de3a/src/index.ts#L368)

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

Defined in: [index.ts:351](https://github.com/zloishavrin/gigachat-node/blob/d189086914c2675e167ddaa294abadc9d850de3a/src/index.ts#L351)

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

Defined in: [index.ts:386](https://github.com/zloishavrin/gigachat-node/blob/d189086914c2675e167ddaa294abadc9d850de3a/src/index.ts#L386)

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

Defined in: [index.ts:404](https://github.com/zloishavrin/gigachat-node/blob/d189086914c2675e167ddaa294abadc9d850de3a/src/index.ts#L404)

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
