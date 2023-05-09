import dotenv from 'dotenv';

dotenv.config();

import './database';
import express from 'express';
import homeRoutes from './routes/home.routes';
import tokenRoutes from './routes/token.routes';
import userRoutes from './routes/user.routes';
import adRoutes from './routes/ad.routes';
import categoryRoutes from './routes/category.routes';
import subcategoryRoutes from './routes/subcategory.routes';
import errorHandler from './middlewares/errorHandler';
import enableCors from './middlewares/enableCors';

export default (function app() {
  const myApp = express();
  return {
    app: myApp,
    middlewares: (function middlewares() {
      myApp.use(enableCors);
      myApp.use(express.urlencoded({ extended: true }));
      myApp.use(express.json());
    }()),
    routes: (function routes() {
      myApp.use('/', homeRoutes);
      myApp.use('/token', tokenRoutes);
      myApp.use('/users', userRoutes);
      myApp.use('/ads', adRoutes);
      myApp.use('/categories', categoryRoutes);
      myApp.use('/subcategories', subcategoryRoutes);
      myApp.use(errorHandler);
    }()),
  };
}());
