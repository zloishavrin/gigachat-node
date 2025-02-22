---
title: GigaChat Vision
description: Работа с файлами в GigaChat API.
---

> **Важно:** В будущем планируется переписать метод загрузки файлов, чтобы вместо указания пути до файла, можно было передавать бинарные данные файла. Совместимость с указанием пути до файла останется.

С помощью библиотеки и GigaChat API можно работать с файлами в контексте LLM. Для того, чтобы получить ответ модели на основе какого-то документа или изображения, необходимо загрузить файл, а затем в запросе к модели передать уникальный идентификатор файла в запрос.

Загрузить файл можно с помощью метода *uploadFile* с указанием пути до файла.

```javascript
const uploadedFile = await client.uploadFile('./example.png');

const completion = await client.completion({
  model: "GigaChat-Pro",
  messages: [
    {
      role: "user",
      content: "На этой картинке изображен человек?",
      attachments: [uploadedFile.id]
    }
  ],
});

console.log(completion.choices[0].message.content);
```

Подробнее можно ознакомиться с работой с файлами в [официальной документации](https://developers.sber.ru/docs/ru/gigachat/api/working-with-files).