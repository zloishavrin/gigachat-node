# GigaChat Node API Library

Эта библиотека обеспечивает удобный доступ к GigaChat REST API из TypeScript или JavaScript.

Чтобы узнать, как использовать GigaChat API, ознакомьтесь с [документацией по API](https://developers.sber.ru/docs/ru/gigachat/api/overview).

* [Установка](#установка)
* [Начало работы](#начало-работы)
* [Получение всех моделей](#получение-всех-моделей)
* [Описание модели](#описание-модели)
* [Завершение чата](#завершение-чата)
* [Завершение чата в потоке](#завершение-чата-в-потоке)
* [Генерация изображений](#генерация-изображений)
* [Примеры работы](#примеры-работы)

## Использование

### Установка

```bash
npm i gigachat-node
```

### Начало работы

Создание экземпляра класса и получение токена доступа к API [(подробнее в документации)](https://developers.sber.ru/docs/ru/gigachat/api/authorization).

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
|clientSecretKey| Нужен для получения токена доступа к API. Получить можно в [личном кабинете](https://developers.sber.ru/studio). |
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
    ],
    "stream":true
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

## Генерация изображений

При соответствующих настройках конструктора, можно генерировать изображения прямо из завершений чата. Необходимо указать путь до папки, куда будут сохраняться изображения. GigaChat API предоставляет изображения в бинарном виде, однако, если Вы пользуетесь SDK, то библиотека заботится о преобразовании бинарного представления в JPG, а путь до сгенерированной картинки вернется вместе с завершением чата в объекте **responce.choices[0].message**.

```
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

## Примеры работы

* [Телеграм-бот с GigaChat API](https://github.com/zloishavrin/telegram-bot-gigachat)

# RoadMap

| Задача | Статус |
|--------|--------|
|Создание токена доступа|:white_check_mark:|
|Завершение чата|:white_check_mark:|
|Автоматическая смена токена, если срок действия подходит к концу|:white_check_mark:|
|Завершение чата в потоке|:white_check_mark:|
|Генерация картинок при завершении чата|:white_check_mark:|
|Написание интерфейсов||
|Векторное представление текста||
|Метод для расчета кол-ва токенов по строчке запроса||
|Автоматическое добавление свойства **stream** при передаче ответа в потоке||
