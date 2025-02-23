---
title: Сертификат безопасности
description: Сертификат Минцифры c GigaChatAPI.
---

Для использования GigaChat API необходимо использовать публичный сертификат НУЦ Минцифры. Его можно установить на уровне OC или приложения. Однако, можно отключить проверку сертификата, для этого в конструкторе класса необходимо указать флаг *isIgnoreTSL*

```javascript
const client = new GigaChat({
  ...
  isIgnoreTSL: true,
  ...
});
```

Подробнее можно ознакомиться в [официальной документации](https://developers.sber.ru/docs/ru/gigachat/certificates).