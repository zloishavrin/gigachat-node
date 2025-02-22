---
editUrl: false
next: false
prev: false
title: "GigaChat"
---

Defined in: [src/index.ts:21](https://github.com/zloishavrin/gigachat-node/blob/2cd93ba574de8045adaf64a14aee346c2a22e99e/src/index.ts#L21)

Класс для взаимодействия с API GigaChat.
Позволяет выполнять авторизацию, отправлять запросы к модели, загружать файлы и работать с потоками данных.

## Constructors

### new GigaChat()

> **new GigaChat**(`config`): [`GigaChat`](/gigachat-node/api/index/classes/gigachat/)

Defined in: [src/index.ts:86](https://github.com/zloishavrin/gigachat-node/blob/2cd93ba574de8045adaf64a14aee346c2a22e99e/src/index.ts#L86)

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

Defined in: [src/index.ts:30](https://github.com/zloishavrin/gigachat-node/blob/2cd93ba574de8045adaf64a14aee346c2a22e99e/src/index.ts#L30)

Токен авторизации для API.

## Methods

### allModels()

> **allModels**(): `Promise`\<[`IAllModelResponse`](/gigachat-node/api/interfaces/model/interfaces/iallmodelresponse/)\>

Defined in: [src/index.ts:321](https://github.com/zloishavrin/gigachat-node/blob/2cd93ba574de8045adaf64a14aee346c2a22e99e/src/index.ts#L321)

Получает список всех моделей.

#### Returns

`Promise`\<[`IAllModelResponse`](/gigachat-node/api/interfaces/model/interfaces/iallmodelresponse/)\>

Ответ сервера с моделями.

***

### completion()

> **completion**(`data`): `Promise`\<[`ICompletionResponse`](/gigachat-node/api/interfaces/completion/interfaces/icompletionresponse/)\>

Defined in: [src/index.ts:250](https://github.com/zloishavrin/gigachat-node/blob/2cd93ba574de8045adaf64a14aee346c2a22e99e/src/index.ts#L250)

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

Defined in: [src/index.ts:304](https://github.com/zloishavrin/gigachat-node/blob/2cd93ba574de8045adaf64a14aee346c2a22e99e/src/index.ts#L304)

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

Defined in: [src/index.ts:199](https://github.com/zloishavrin/gigachat-node/blob/2cd93ba574de8045adaf64a14aee346c2a22e99e/src/index.ts#L199)

Создает новый токен доступа.

#### Returns

`Promise`\<[`ITokenResponse`](/gigachat-node/api/interfaces/token/interfaces/itokenresponse/)\>

Данные токена.

***

### embedding()

> **embedding**(`input`): `Promise`\<[`IEmbeddingResponse`](/gigachat-node/api/interfaces/embedding/interfaces/iembeddingresponse/)\>

Defined in: [src/index.ts:338](https://github.com/zloishavrin/gigachat-node/blob/2cd93ba574de8045adaf64a14aee346c2a22e99e/src/index.ts#L338)

Выполняет embedding запроса.

#### Parameters

##### input

`string`[]

Входные данные.

#### Returns

`Promise`\<[`IEmbeddingResponse`](/gigachat-node/api/interfaces/embedding/interfaces/iembeddingresponse/)\>

Ответ сервера с embedding.

***

### summarize()

> **summarize**(`model`, `input`): `Promise`\<[`ISummarizeResponse`](/gigachat-node/api/interfaces/summarize/interfaces/isummarizeresponse/)[]\>

Defined in: [src/index.ts:356](https://github.com/zloishavrin/gigachat-node/blob/2cd93ba574de8045adaf64a14aee346c2a22e99e/src/index.ts#L356)

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

Defined in: [src/index.ts:374](https://github.com/zloishavrin/gigachat-node/blob/2cd93ba574de8045adaf64a14aee346c2a22e99e/src/index.ts#L374)

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
