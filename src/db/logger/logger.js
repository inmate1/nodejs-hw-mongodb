import pino from 'pino-http';
import { createWriteStream } from 'fs';

const logStream = createWriteStream('app.log', { flags: 'a' });

const logger = pino({
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: true, 
          ignore: 'pid,hostname',
          singleLine: false,
          mkdir: true,
          append: true,
        },
        level: 'info',
      },
      {
        target: 'pino/file',
        options: {
          destination: logStream.path,
        },
        level: 'info',
      },
    ],
  },
});

export default logger;
