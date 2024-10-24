import * as config from './config.js';
import mongoose from 'mongoose';

import app from './app.js';

mongoose
  .connect(config.DB_URI)
  .then(() => console.log('Successfully connected to database.'));

const port = config.PORT;

app.listen(port, () => console.log(`Listening to requests on port ${port}.`));
