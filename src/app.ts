import express from 'express';
import errorHandler from './middlewares/error';
import 'express-async-errors';

const app = express();
app.use(express.json());
app.use(errorHandler);

export default app;
