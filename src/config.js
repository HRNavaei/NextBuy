import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRE_AFTER = process.env.JWT_EXPIRE_AFTER;
