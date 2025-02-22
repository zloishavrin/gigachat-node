---
editUrl: false
next: false
prev: false
title: "GigaChatConfig"
---

Defined in: [src/interfaces/config.ts:4](https://github.com/zloishavrin/gigachat-node/blob/a69ec788472547a03123bbdeeaac3f6751954bc6/src/interfaces/config.ts#L4)

Конфигурационный интерфейс для настройки GigaChat.

## Properties

### autoRefreshToken?

> `optional` **autoRefreshToken**: `boolean`

Defined in: [src/interfaces/config.ts:30](https://github.com/zloishavrin/gigachat-node/blob/a69ec788472547a03123bbdeeaac3f6751954bc6/src/interfaces/config.ts#L30)

Автоматически ли обновлять токен при его истечении.
`true` — токен будет обновляться автоматически.

#### Default

```ts
true
```

***

### clientSecretKey

> **clientSecretKey**: `string`

Defined in: [src/interfaces/config.ts:8](https://github.com/zloishavrin/gigachat-node/blob/a69ec788472547a03123bbdeeaac3f6751954bc6/src/interfaces/config.ts#L8)

Секретный ключ клиента, используемый для аутентификации.

***

### imgOn?

> `optional` **imgOn**: `boolean`

Defined in: [src/interfaces/config.ts:37](https://github.com/zloishavrin/gigachat-node/blob/a69ec788472547a03123bbdeeaac3f6751954bc6/src/interfaces/config.ts#L37)

Включена ли обработка изображений в ответах.
Если `true`, изображения будут извлекаться в виде fileId в ответе модели.

#### Default

```ts
true
```

***

### isIgnoreTSL?

> `optional` **isIgnoreTSL**: `boolean`

Defined in: [src/interfaces/config.ts:16](https://github.com/zloishavrin/gigachat-node/blob/a69ec788472547a03123bbdeeaac3f6751954bc6/src/interfaces/config.ts#L16)

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

Defined in: [src/interfaces/config.ts:23](https://github.com/zloishavrin/gigachat-node/blob/a69ec788472547a03123bbdeeaac3f6751954bc6/src/interfaces/config.ts#L23)

Используется ли персональный доступ (Personal API).
`true` — персональный доступ, `false` — корпоративный.

#### Default

```ts
true
```
