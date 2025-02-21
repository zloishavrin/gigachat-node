---
editUrl: false
next: false
prev: false
title: "GigaChatError"
---

Defined in: [src/utils/GigaChatError.ts:17](https://github.com/zloishavrin/gigachat-node/blob/417d2024921382b1bcd8619ed0bfe58ac6a747e8/src/utils/GigaChatError.ts#L17)

Класс ошибки API GigaChat с дополнительной информацией

## Example

```ts
try {
  await gigachat.completion(...);
} catch (error) {
  if (error instanceof GigaChatError) {
    console.error(`Код ошибки: ${error.code}`, error.message);
  }
}
```

## Extends

- `Error`

## Constructors

### new GigaChatError()

> **new GigaChatError**(`message`, `code`): [`GigaChatError`](/gigachat-node/api/index/classes/gigachaterror/)

Defined in: [src/utils/GigaChatError.ts:30](https://github.com/zloishavrin/gigachat-node/blob/417d2024921382b1bcd8619ed0bfe58ac6a747e8/src/utils/GigaChatError.ts#L30)

Создает экземпляр ошибки GigaChat

#### Parameters

##### message

`string`

Человекочитаемое описание ошибки

##### code

`string`

Уникальный идентификатор типа ошибки

#### Returns

[`GigaChatError`](/gigachat-node/api/index/classes/gigachaterror/)

#### Overrides

`Error.constructor`

## Properties

### code

> `readonly` **code**: `string`

Defined in: [src/utils/GigaChatError.ts:22](https://github.com/zloishavrin/gigachat-node/blob/417d2024921382b1bcd8619ed0bfe58ac6a747e8/src/utils/GigaChatError.ts#L22)

Уникальный код ошибки для идентификации типа проблемы

***

### message

> **message**: `string`

Defined in: docs/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: docs/node\_modules/typescript/lib/lib.es5.d.ts:1076

Название ошибки (всегда 'GigaChatError')

#### Inherited from

`Error.name`

***

### stack?

> `optional` **stack**: `string`

Defined in: docs/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/@types/node/globals.d.ts:98

Optional override for formatting stack traces

#### Parameters

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/@types/node/globals.d.ts:100

#### Inherited from

`Error.stackTraceLimit`

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt`?): `void`

Defined in: node\_modules/@types/node/globals.d.ts:91

Create .stack property on a target object

#### Parameters

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`
