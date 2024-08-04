import { env } from './utils/env.js';
import express from 'express';
import cors from 'cors';
import logger from './db/logger/logger.js';
import contactsRouter from './routers/contacts.js'
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(logger);


  app.use(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);


  const PORT = Number(env('PORT'));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default setupServer;
