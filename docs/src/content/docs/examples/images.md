---
title: Массовая генерация изображений (JavaScript)
description: Массовая генерация изображений с GigaChat API.
---

[Репозиторий с кодом](https://github.com/zloishavrin/gigachat-text2image)

```shell
  npm install gigachat-node
```

Реализация генерации на JavaScript с помощью GigaChatJS.

```javascript
const GigaChat = require('gigachat-node').GigaChat;
const fs = require('fs');

// Ваш ключ от GigaChat API
const GIGACHAT_API_TOKEN = 'GIGACHAT_API_KEY';

// Инициализация класса GigaChat и передача объекта конфигурации в конструктор
const client = new GigaChat({
  clientSecretKey: GIGACHAT_API_TOKEN,
  isIgnoreTSL: true,
  isPersonal: true,
  autoRefreshToken: true,
  imgOn: true
});

const main = async () => {
  // Получение токена GigaChat для аутентификации запросов
  await client.createToken();

  for(let index = 0; index < 10; index++) {
    const response = await client.completion({
      model: "GigaChat",
      messages: [{ role: "user", content: `Нарисуй белую комнату` }],
      function_call: "auto"
    });

    const imageId = response.choices[0].message.image;

    if(imageId) {
      const binaryData = await client.downloadFile(imageId);
      const buffer = Buffer.from(binaryData, 'base64');
      fs.writeFile(`image${index}.jpg`, buffer, (err) => {
        if (err) {
            console.error('Ошибка при сохранении файла:', err);
        } else {
            console.log('Файл успешно сохранён!');
        }
      });
    }
  }
}

main();
```