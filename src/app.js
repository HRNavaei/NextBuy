import express from 'express';
import morgan from 'morgan';

import * as config from './config.js';
import authController from './controller/auth-controller.js';

const app = express();

app.use(morgan('dev'));

export default app;
