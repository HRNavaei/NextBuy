import express from 'express';
import morgan from 'morgan';

import * as config from './config.js';
import authRouter from './routes/auth-routes.js';
import globalErrorHandler from './utils/global-error-handler.js';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use(globalErrorHandler);

export default app;
