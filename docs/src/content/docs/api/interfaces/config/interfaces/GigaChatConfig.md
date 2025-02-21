---
editUrl: false
next: false
prev: false
title: "GigaChatConfig"
---

Defined in: [interfaces/config.ts:4](https://github.com/zloishavrin/gigachat-node/blob/ab8b775e72c82ff0f01d5047b5aa86d922ba4ef0/src/interfaces/config.ts#L4)

Конфигурационный интерфейс для настройки GigaChat.

## Properties

### autoRefreshToken?

> `optional` **autoRefreshToken**: `boolean`

Defined in: [interfaces/config.ts:30](https://github.com/zloishavrin/gigachat-node/blob/ab8b775e72c82ff0f01d5047b5aa86d922ba4ef0/src/interfaces/config.ts#L30)

Автоматически ли обновлять токен при его истечении.
`true` — токен будет обновляться автоматически.

#### Default

```ts
true
```

***

### clientSecretKey

> **clientSecretKey**: `string`

Defined in: [interfaces/config.ts:8](https://github.com/zloishavrin/gigachat-node/blob/ab8b775e72c82ff0f01d5047b5aa86d922ba4ef0/src/interfaces/config.ts#L8)

Секретный ключ клиента, используемый для аутентификации.

***

### imgOn?

> `optional` **imgOn**: `boolean`

Defined in: [interfaces/config.ts:37](https://github.com/zloishavrin/gigachat-node/blob/ab8b775e72c82ff0f01d5047b5aa86d922ba4ef0/src/interfaces/config.ts#L37)

Включена ли обработка изображений в ответах.
Если `true`, изображения будут сохраняться.

#### Default

```ts
true
```

***

### imgPath?

> `optional` **imgPath**: `string`

Defined in: [interfaces/config.ts:44](https://github.com/zloishavrin/gigachat-node/blob/ab8b775e72c82ff0f01d5047b5aa86d922ba4ef0/src/interfaces/config.ts#L44)

Путь для сохранения изображений, полученных в ответе.
По умолчанию используется текущая директория.

#### Default

```ts
"."
```

***

### isIgnoreTSL?

> `optional` **isIgnoreTSL**: `boolean`

Defined in: [interfaces/config.ts:16](https://github.com/zloishavrin/gigachat-node/blob/ab8b775e72c82ff0f01d5047b5aa86d922ba4ef0/src/interfaces/config.ts#L16)

Игнорировать ли проверку TLS (SSL-сертификатов).
`true` — проверка отключена (используется для обхода проблем с сертификатами).
`false` — проверка включена.

#### Default

```ts
true
```

***

### isPersonal?

> `optional` **isPersonal**: `boolean`

Defined in: [interfaces/config.ts:23](https://github.com/zloishavrin/gigachat-node/blob/ab8b775e72c82ff0f01d5047b5aa86d922ba4ef0/src/interfaces/config.ts#L23)

Используется ли персональный доступ (Personal API).
`true` — персональный доступ, `false` — корпоративный.

#### Default

```ts
true
```
