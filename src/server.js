// В файле src/server.js создайте функцию setupServer, в которой будет создаваться express сервер. Эта функция должна включать в себя:

// 1.Создание сервера с помощью вызова express()
// 2.Настройка cors и логгера pino .
// 3.Обработку несуществующих роутов (возвращает статус 404 и ответное сообщение)
// {
//    message: 'Not found', ,
// }

// Запуск сервера на порте, указанном через переменную окружения PORT или 3000, если такая переменная не указана
// При удачном запуске сервера выводить в консоль строку “Server is running on port {PORT}”, где {PORT}это номер вашего порта
// Не забудьте указать переменную окружения в файле.env.example

import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const setupServer = () => {
  const app = express();
  // Настройка CORS
  app.use(cors());
  // Настройка логгера pino
  const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  });

  app.use(logger);

  app.use(express.json());

  // Регистрация роута GET /contacts
  app.get('/contacts', async (req, res, next) => {
    console.log(req.params);
    const contacts = await getAllContacts();
    res.status(200).json({
      status: '200',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });
  // Регистрация роута GET /contacts/:contactId
  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }
    res.status(200).json({
      status: '200',
      massage: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  // Обработка несуществующих роутов
  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });
  // Запуск сервера на указанном порту

  const PORT = Number(env('PORT'));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default setupServer;
