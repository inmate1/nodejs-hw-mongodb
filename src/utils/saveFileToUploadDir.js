import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { env } from './env.js';

export const saveFileToUploadDir = async (file) => {
  try {
    
    const tempFilePath = path.join(TEMP_UPLOAD_DIR, file.filename);
    const uploadFilePath = path.join(UPLOAD_DIR, file.filename);

    await fs.rename(tempFilePath, uploadFilePath);


    return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
  } catch (error) {
    console.error('Error saving file to upload directory:', error);
    throw new Error('Failed to save file to upload directory');
  }
};
