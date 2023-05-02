import { Router } from 'express';
import homeController from '../controllers/home.controller';
import checkLogin from '../middlewares/checkLogin';

const router = new Router();

router.get('/', checkLogin, homeController.index);

export default router;
