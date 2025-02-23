<div align="center" style="display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; align-items: baseline;">
<img src="https://img.shields.io/github/stars/zloishavrin/gigachat-node"/>&nbsp;<img src="https://img.shields.io/npm/v/gigachat-node?style=flat-square"/>&nbsp;<img src="https://img.shields.io/npm/dw/gigachat-node?style=flat-square"/>&nbsp;<img src="https://img.shields.io/bundlephobia/minzip/gigachat-node?style=flat-square"/>&nbsp;<img src="https://img.shields.io/badge/dependencies-0-0?style=flat-square"/>
</div>

# GigaChat API Library

Эта библиотека обеспечивает удобный доступ к GigaChat REST API из TypeScript или JavaScript.

Чтобы узнать, как использовать GigaChat API, ознакомьтесь с [документацией по API](https://developers.sber.ru/docs/ru/gigachat/api/overview).

* [Установка](#установка)
* [Импорт](#импорт)
* [Начало работы](#начало-работы)
* [Получение всех моделей](#получение-всех-моделей)
* [Завершение чата](#завершение-чата)
* [Завершение чата в потоке](#завершение-чата-в-потоке)
* [Генерация изображений](#генерация-изображений)
* [Векторное представление текста](#векторное-представление-текста)
* [Подсчет кол-ва токенов](#подсчет-кол-ва-токенов)
* [Загрузка файлов](#загрузка-файлов)
* [Получение доступных файлов](#получение-доступных-файлов)
* [Получение информации о файле](#получение-информации-о-файле)
* [Удаление файла](#удаление-файла)
* [Получение баланса токенов](#получение-баланса-токенов)
* [Скачивание файла](#скачивание-файла)
* [Примеры работы](#примеры-работы)

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
const client = new GigaChat({
    clientSecretKey: 'CLIENT-SECRET-KEY', 
    isIgnoreTSL: true,
    isPersonal: true,
    autoRefreshToken: true
});
await client.createToken();
```
| Аргумент конструктора | Характеристика |
|-----------------------|----------------|
|clientSecretKey| Нужен для получения токена доступа к API. Получить можно в [личном кабинете](https://developers.sber.ru/studio). Обязательно в base64. |
|isIgnoreTSL| Используется для настройки https-агента. Некоторые системы считают сертификат безопасности Сбербанка ненадежным. Если сертикат безопасности игнорируется, то может снизиться безопасность обмена данными. Если же сертификат безопасности не игнорируется, то необходимо его [установить](https://developers.sber.ru/docs/ru/gigachat/certificates). |
|isPersonal| Нужно для получения токена доступа к API. Если вы используете API, как физическое лицо - ставьте true. Если юридическое лицо - false. |
|autoRefreshToken| Если параметр указан true, то токен будет автоматически обновляться. Токен обновляется, если при запросе получена ошибка о том, что срок действия токена закончился (запрос при этом выполняется повторно). Если параметр указан false, то при попытке использовать недействительный токен вернется ошибка. Срок действия токена - 30 минут. |
|imgOn|Включить возвращение изображений из генерации завершений чата. |

### Получение всех моделей

Возвращает массив объектов с данными доступных моделей.

```js
const responce = await client.allModels();
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

### Векторное представление текста

Возвращает векторные представления соответствующих текстовых запросов. [Подробнее в документации API](https://developers.sber.ru/docs/ru/gigachat/api/reference/rest/post-embeddings).

```javascript
const embed = await client.embedding(["Как дела?", "Векторное представлеие? 0_0"]);
console.log(embed.data);
```

### Подсчет кол-ва токенов

Возвращает объект с информацией о количестве токенов, посчитанных заданной моделью. [Подробнее в документации API](https://developers.sber.ru/docs/ru/gigachat/api/reference/rest/post-tokens-count).

```javascript
const sum = await client.summarize("GigaChat", ["Подсчитай кол-во токенов в этой строке"]);
console.log(sum[0].tokens);
```

### Загрузка файлов

Загружает в хранилище текстовые документы или изображения. Возвращает объект с данными загруженного файла. Загруженные файлы доступны только вам. [Подробнее в документации API](https://developers.sber.ru/docs/ru/gigachat/api/reference/rest/post-file).

```javascript
const file = await client.uploadFile("path/to/file");
console.log(file);
```

### Получение доступных файлов

Получение списка всех доступных файлов. Возвращает массив объектов с данными доступных файлов. [Подробнее в документации API](https://developers.sber.ru/docs/ru/gigachat/api/reference/rest/get-files).

```javascript
const files = await client.getAllFiles();
console.log(files);
```

### Получение информации о файле

Получение информации о файле по уникальному идентификатору. Возвращает объект с описанием указанного файла. [Подробнее в документации API](https://developers.sber.ru/docs/ru/gigachat/api/reference/rest/get-file).

```javascript
const file = await client.getFileInfo('fileId');
console.log(file);
```

### Получение баланса токенов

Возвращает доступный остаток токенов для каждой из моделей. [Подробнее в документации API](https://developers.sber.ru/docs/ru/gigachat/api/reference/rest/get-balance).

```javascript
const balance = await client.getBalance();
console.log(balance);
```

### Удаление файла

Удаление файла по уникальному идентификатору. Переводит статус файла в значение *deleted*. [Подробнее в документации API](https://developers.sber.ru/docs/ru/gigachat/api/reference/rest/file-delete).

```javascript
const deletedFile = await client.deleteFile('fileId');
console.log(deletedFile);
```

### Скачивание файла

Получение файла в бинарном формате по уникальному идентификатору.

```javascript
const binary = await client.downloadFile("fileId");
console.log(binary);
```

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
|Загрузка файлов|☑️|
|Конфиг-интерфейс для конструктора класса|☑️|
|Настройка ESLinter|☑️|
|Настройка Prettier|☑️|
|Автодокументирование|☑️|
|Pre-Commit|☑️|
|GH-Action для NPM-публикации|☑️|
|Примеры использования|☑️|
|Избавиться от UUID-зависимости|☑️|
|Избавиться от FormData-зависимости|☑️|
|Добавить обработку ошибок|☑️|
|Настроить дженерики для обработки ошибок|☑️|
|Настроить экспорт ошибки|☑️|
|Настройка тестов в проекте|☑️|
|Переписать библиотеку на нативный HTTPS вместо Axios|☑️|
|Настроить минификацию пакета в CI|☑️|
|Метод для получения списка доступных файлов|☑️|
|Метод для получения информации о файле|☑️|
|Метод для удаления файла|☑️|
|Метод для получения баланса|☑️|
|Метод для скачивания файла|☑️|
|Добавить поддержку загрузки файла с помощью бинарных данных| |
|Рефакторинг обработки ошибок| |
|Тесты для публичных методов| |
|Извлечение видео из завершения чата| |
|Поддержка работы из браузерной среды| |