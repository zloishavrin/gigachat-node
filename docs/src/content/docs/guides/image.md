---
title: Генерация изображений
description: Генерация изображений c GigaChatAPI.
---

С помощью библиотеки и GigaChat API можно сгенерировать изображения.

Если в конструкторе класса параметр *imgOn* выключен, то объект *message* будет следующего формата

```javascript
{
  content: '<img src="fileId" fuse="true"/> Какой-то текст',
  role: 'assistant'
}
```

Если включить параметр (или оставить включенным по умолчанию), то уникальный идентификатор сгенерированного изображения будет извлечен из ответа модели и объект *message* придет следующего вида

```javascript
{
  content: 'Какой-то тест',
  role: 'assistant',
  image: 'fileId'
}
```

Затем *fileId* можно использовать для получения бинарного представления изображения

```javascript
const completion = await client.completion({
  model: "GigaChat",
  messages: [
    {
      role: "user",
      content: "Нарисуй что-то"
    }
  ],
  function_call: "auto"
});

if(completion.choices[0].message.image) {
  const binary = await client.downloadFile(completion.choices[0].message.image);
  ...
}
```

Подробнее можно ознакомиться с генерацией изображения в [официальной документации](https://developers.sber.ru/docs/ru/gigachat/api/images-generation).