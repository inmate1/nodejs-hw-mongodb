import dotenv from 'dotenv';

dotenv.config();

export const env = (name, defaultValue) => {
  const value = process.env[name];
  if (value !== undefined && value !== '') {
    return value;
  }

  if (defaultValue !== undefined) {
    return defaultValue;
  }

  throw new Error(`Missing: process.env['${name}'].`);
};

//  Использовать ее мы можем, например, в таком виде: env('PORT', '3000');
//  Если переменной окружения с таким именем не было указано и не было передано значение по умолчанию,
// то вызов этой функции выбросит ошибку с сообщением Missing: process.env['PORT'].
