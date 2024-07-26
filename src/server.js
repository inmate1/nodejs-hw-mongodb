import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const setupServer = () => {
  const app = express();

  app.use(cors());

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

  app.get('/contacts', async (req, res, next) => {
    console.log(req.params);
    const contacts = await getAllContacts();
    res.status(200).json({
      status: '200',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

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


  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });


  const PORT = Number(env('PORT'));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default setupServer;
