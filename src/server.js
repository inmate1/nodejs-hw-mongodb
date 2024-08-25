import { env } from './utils/env.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './db/logger/logger.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(cookieParser());
  app.use(logger);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  const PORT = Number(env('PORT'));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
export default setupServer;
