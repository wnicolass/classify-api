import express from 'express';
import homeRoutes from './src/routes/home.routes';

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
    }()),
  };
}());
