import { Router } from 'express';
import userController from '../controllers/user.controller';
import checkLogin from '../middlewares/checkLogin';

const router = new Router();

router.get('/', checkLogin, userController.index);
router.get('/:id', checkLogin, userController.show);
router.put('/:id', checkLogin, userController.update);
router.delete('/:id', checkLogin, userController.delete);

export default router;
