---
title: RESTful API (TypeScript)
description: RESTful API с GigaChat API.
---

Установка библиотек

```shell
  npm install gigachat-node express body-parser
  npm install --save-dev @types/express
```

Реализация RESTFul API с помощью GigaChatJS

```typescript
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { GigaChat } from 'gigachat-node';

// Ваш ключ от GigaChat API
const GIGACHAT_API_TOKEN = 'YOUR_GIGACHAT_API_KEY';

// Инициализация Express приложения
const app = express();
const port = 3000;

// Инициализация клиента GigaChat
const client = new GigaChat({
  clientSecretKey: GIGACHAT_API_TOKEN,
  isIgnoreTSL: true,
  isPersonal: true,
  autoRefreshToken: true
});

app.use(bodyParser.json());

// Создаем эндпоинт для обработки сообщений
app.post('/chat', async (req: Request, res: Response): Promise<void> => {
  const messageText: string = req.body.message?.trim();

  // Проверяем, что сообщение присутствует в теле запроса
  if (!messageText) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  try {
    // Отправляем запрос в GigaChat API
    const response = await client.completion({
      model: 'GigaChat:latest',
      messages: [{ role: 'user', content: messageText }]
    });

    // Проверка на пустой ответ от GigaChat
    if (!response || !response.choices || response.choices.length === 0) {
      res.status(500).json({ error: 'Error during message processing' });
      return;
    }

    const replyText = response.choices[0].message.content;

    // Отправляем ответ на запрос
    res.json({ reply: replyText });
  } 
  catch (error: any) {
    res.status(500).json({
      error: 'An error occurred while processing your request. Please try again later.'
    });
  }
});

// Запускаем сервер
app.listen(port, async () => {
  // Создаем токен GigaChat для аутентификации запросов
  await client.createToken();

  console.log(`Server running on http://localhost:${port}`);
});
```

Пример запроса

```shell
curl -X POST http://localhost:3000/chat -H "Content-Type: application/json" -d '{"message": "Привет, как дела?"}'
```