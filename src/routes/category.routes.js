import { Router } from 'express';
import categoryController from '../controllers/category.controller';
import checkLogin from '../middlewares/checkLogin';

const router = new Router();

router.post('/', checkLogin, categoryController.store);
router.get('/', checkLogin, categoryController.index);
router.get('/:id', checkLogin, categoryController.show);
router.put('/:id?', checkLogin, categoryController.update);
router.delete('/:id?', checkLogin, categoryController.delete);

export default router;
