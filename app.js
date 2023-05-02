import dotenv from 'dotenv';

dotenv.config();

import './src/database';
import express from 'express';
import homeRoutes from './src/routes/home.routes';
import tokenRoutes from './src/routes/token.routes';
import userRoutes from './src/routes/user.routes';
import adRoutes from './src/routes/ad.routes';
import errorHandler from './src/middlewares/errorHandler';

export default (function app() {
  const myApp = express();
  return {
    app: myApp,
    middlewares: (function middlewares() {
      myApp.use(express.urlencoded({ extended: true }));
      myApp.use(express.json());
    }()),
    routes: (function routes() {
      myApp.use('/', homeRoutes);
      myApp.use('/token', tokenRoutes);
      myApp.use('/users', userRoutes);
      myApp.use('/ads', adRoutes);
      myApp.use(errorHandler);
    }()),
  };
}());
