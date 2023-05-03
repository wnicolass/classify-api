import dotenv from 'dotenv';

dotenv.config();

import './src/database';
import express from 'express';
import homeRoutes from './src/routes/home.routes';
import tokenRoutes from './src/routes/token.routes';
import userRoutes from './src/routes/user.routes';
import adRoutes from './src/routes/ad.routes';
import categoryRoutes from './src/routes/category.routes';
import subcategoryRoutes from './src/routes/subcategory.routes';
import errorHandler from './src/middlewares/errorHandler';
import enableCors from './src/middlewares/enableCors';

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
