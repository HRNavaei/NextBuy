import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log('Successfully connected to database.'));

const port = process.env.PORT;

app.listen(port, () => console.log(`Listening to requests on port ${port}.`));
