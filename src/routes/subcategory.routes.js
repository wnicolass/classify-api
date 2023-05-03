import { Router } from 'express';
import subcategoryController from '../controllers/subcategory.controller';
import checkLogin from '../middlewares/checkLogin';

const router = new Router();

router.post('/', checkLogin, subcategoryController.store);
router.get('/', checkLogin, subcategoryController.index);
router.get('/:id', checkLogin, subcategoryController.show);
router.put('/:id?', checkLogin, subcategoryController.update);
router.delete('/:id?', checkLogin, subcategoryController.delete);

export default router;
