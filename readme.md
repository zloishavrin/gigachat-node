# GigaChat API Library

Эта библиотека обеспечивает удобный доступ к GigaChat REST API из TypeScript или JavaScript.

Чтобы узнать, как использовать GigaChat API, ознакомьтесь с [документацией по API](https://developers.sber.ru/docs/ru/gigachat/api/overview).

* [Установка](#установка)
* [Импорт](#импорт)
* [Начало работы](#начало-работы)
* [Получение всех моделей](#получение-всех-моделей)
* [Описание модели](#описание-модели)
* [Завершение чата](#завершение-чата)
* [Завершение чата в потоке](#завершение-чата-в-потоке)
* [Генерация изображений](#генерация-изображений)
* [Векторное представление текста](#векторное-представление-текста)
* [Подсчет кол-ва токенов](#подсчет-кол-ва-токенов)
* [Примеры работы](#примеры-работы)
* [Отключение цензуры](#отключение-цензуры)

## Использование

### Установка

```bash
npm i gigachat-node
```

### Импорт

Первый вариант импорта:
```javascript
import { GigaChat } from 'gigachat-node';
```

Второй вариант импорта:
```javascript
const GigaChat = require('gigachat-node').GigaChat;
```

### Начало работы

Создание экземпляра класса и получение токена доступа к API [(подробнее в документации)](https://developers.sber.ru/docs/ru/gigachat/api/authorization). Обратите внимание, что при получении CLIENT_SECRET необходимо копировать значение в Base64, иначе придется переводить самостоятельно ключ в Base64.

```js
const client = new GigaChat(
    clientSecretKey='CLIENT-SECRET-KEY', 
    isIgnoreTSL=true,
    isPersonal=true,
    autoRefreshToken=true
);
await client.createToken();
```
| Аргумент конструктора | Характеристика |
|-----------------------|----------------|
|clientSecretKey| Нужен для получения токена доступа к API. Получить можно в [личном кабинете](https://developers.sber.ru/studio). Обязательно в base64. |
|isIgnoreTSL| Используется для настройки https-агента. Некоторые системы считают сертификат безопасности Сбербанка ненадежным. Если сертикат безопасности игнорируется, то может снизиться безопасность обмена данными. Если же сертификат безопасности не игнорируется, то необходимо его [установить](https://developers.sber.ru/docs/ru/gigachat/certificates). |
|isPersonal| Нужно для получения токена доступа к API. Если вы используете API, как физическое лицо - ставьте true. Если юридическое лицо - false. |
|autoRefreshToken| Если параметр указан true, то токен будет автоматически обновляться. Токен обновляется, если при запросе получена ошибка о том, что срок действия токена закончился (запрос при этом выполняется повторно). Если параметр указан false, то при попытке использовать недействительный токен вернется ошибка. Срок действия токена - 30 минут. |
|imgOn|Включить возвращение изображений из генерации завершений чата. |
| imgPath | Путь, куда будут сохраняться сгенерированные изображения. |

### Получение всех моделей

Возвращает массив объектов с данными доступных моделей.

```js
const responce = await client.allModels();
```

### Описание модели

Возвращает объект с описанием указанной модели. Аргументом функции следует передать название модели.

```js
const responce = await client.model('GigaChat:latest');
```

### Завершение чата

Возвращает ответ модели с учетом переданных сообщений. Подробнее про параметры запроса можно прочитать в [оффициальной документации](https://developers.sber.ru/docs/ru/gigachat/api/reference#post-chat-completions).

```js
const responce = await client.completion({
    "model":"GigaChat:latest",
    "messages": [
        {
            role:"user",
            content:"Привет! Как дела?"
        }
    ]
});

console.log(responce.choices[0].message);
```

### Завершение чата в потоке

Возвращает ответ модели в потоке в base64. Подробнее можно прочитать в [оффициальной документации](https://developers.sber.ru/docs/ru/gigachat/api/response-token-streaming).

```js
const stream = await client.completionStream({
    "model":"GigaChat:latest",
    "messages": [
        {
            role:"user",
            content:"Привет! Напиши текст на 2000 слов про историю часов."
        }
    ]
});

let str = '';

stream.on('data', async (data) => {
    const decodedData = await data.toString('utf-8');
    const jsonData = await JSON.parse(decodedData.substring(6));
    str += jsonData.choices[0].delta.content;
})

stream.on('end', () => {
    console.log('Поток завершился.')
})
```

### Генерация изображений

При соответствующих настройках конструктора, можно генерировать изображения прямо из завершений чата. Необходимо указать путь до папки, куда будут сохраняться изображения. GigaChat API предоставляет изображения в бинарном виде, однако, если Вы пользуетесь данной библиотекой, то она заботится о преобразовании бинарного представления в JPG, а путь до сгенерированной картинки вернется вместе с завершением чата в объекте **responce.choices[0].message**.

```javascript
const responce = await client.completion({
    "model":"GigaChat:latest",
    "messages": [
        {
            role:"user",
            content:"Нарисуй солнечное небо."
        }
    ]
});

console.log(responce.choices[0].message.image);
```

### Векторное представление текста

Возвращает векторные представления соответствующих текстовых запросов. [Подробнее в документации API](https://developers.sber.ru/docs/ru/gigachat/api/reference/rest/post-embeddings).

```javascript
const embed = await client.embedding('Название модели', ["Как дела?", "Векторное представлеие? 0_0"]);
console.log(embed.data);
```

### Подсчет кол-ва токенов

Возвращает объект с информацией о количестве токенов, посчитанных заданной моделью. [Подробнее в документации API](https://developers.sber.ru/docs/ru/gigachat/api/reference/rest/post-tokens-count).

```javascript
const sum = await client.summarize("GigaChat:latest", ["Подсчитай кол-во токенов в этой строке"]);
console.log(sum[0].tokens);
```

## Примеры работы

* [Телеграм-бот с GigaChat API](https://gitverse.ru/zloishavrin/gigachat-tg-bot)

## Отключение цензуры

Отключение цензуры доступно только в том случае, если Вы пользуетесь GigaChat, как юридическое лицо. Далее следующий алгоритм:

1. Необходимо написать запрос на почту **gigachat@sberbank.ru** с указанием id пространства и client id, который дается при получении ключа.
2. После одобрения запроса, необходимо добавить свойство объекта **profanity_check** со значением **false** в запросе на [завершение чата](#завершение-чата).

## RoadMap

| Задача | Статус |
|--------|--------|
|Создание токена доступа|☑️|
|Завершение чата|☑️|
|Автоматическая смена токена, если срок действия подходит к концу|☑️|
|Завершение чата в потоке|☑️|
|Генерация картинок при завершении чата|☑️|
|Написание интерфейсов|☑️|
|Векторное представление текста|☑️|
|Метод для расчета кол-ва токенов по строчке запроса|☑️|
|Автоматическое добавление свойства **stream** при передаче ответа в потоке|☑️|
|Обновление интерфейсов: добавление **search_result** в message, добавление **update_interval** в completion|☑️|
|Возможность отключения цензуры|☑️|
