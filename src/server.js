import express from 'express';
import cors from 'cors';
import logger from './db/logger/logger.js';

import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(logger);

  app.use(express.json());

  app.get('/contacts', async (req, res, next) => {
    console.log(req.params);
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).send({
        // or json
        message: 'Contact not found',
      });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  });

  const PORT = Number(env('PORT'));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default setupServer;
