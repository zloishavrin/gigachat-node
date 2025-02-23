---
title: Телеграм-бот c генерацией изображений (JavaScript)
description: Телеграм-бот с GigaChat API.
---

[Репозиторий с кодом](https://github.com/zloishavrin/gigachat-tg-bot)

Установка библиотек

```shell
  npm install gigachat-node node-telegram-bot-api
```

Реализация бота на JavaScript с помощью GigaChatJS

```javascript
const TelegramBot = require('node-telegram-bot-api');
const GigaChat = require('gigachat-node').GigaChat;

// Ваш ключ от Telegram Bot API
const TG_API_TOKEN = "TG_API_KEY";
// Ваш ключ от GigaChat API
const GIGACHAT_API_TOKEN = 'GIGACHAT_API_KEY';

const bot = new TelegramBot(TG_API_TOKEN, { polling: true });

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

  bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text.trim();

    try {
      // Обработка старта
      if(messageText === '/start') {
        bot.sendMessage(chatId, 'Привет! Я могу нарисовать что угодно. Что ты хочешь увидеть?');
        return;
      }

      // Отправка сообщения в GigaChat
      const response = await client.completion({
        model: "GigaChat",
        messages: [{ role: "user", content: `Нарисуй ${messageText}` }],
        function_call: "auto"
      });

      // Проверка на пустой ответ
      if (!response || !response.choices || response.choices.length === 0) {
        bot.sendMessage(chatId, 'Произошла ошибка при обработке запроса.');
        return;
      }

      const imageId = response.choices[0].message.image;
      // Обработка случая, когда не удалось сгенерировать изображение.
      if(!imageId) {
        bot.sendMessage(chatId, 'Не удалось изобразить данный запрос :(');
      }

      // Получение изображения в бинарном формате
      const binaryImage = await client.downloadFile(imageId);

      const replyText = response.choices[0].message.content;

      // Отправка ответа пользователю
      bot.sendPhoto(chatId, binaryImage, {
        caption: replyText
      })
    } 
    catch (error) {
      console.error(error);
      // Обработка ошибок при запросе к GigaChat
      bot.sendMessage(chatId, 'Произошла ошибка при общении с GigaChat. Попробуйте снова позже.');
    }
  });
}

main();
```