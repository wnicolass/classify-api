import { Router } from 'express';
import adController from '../controllers/ad.controller';
import checkLogin from '../middlewares/checkLogin';

const router = new Router();

router.get('/', checkLogin, adController.index);
router.get('/status/:id?', checkLogin, adController.allAdsByStatus);
router.get('/:id', checkLogin, adController.show);
router.put('/:id', checkLogin, adController.update);
router.patch('/:id', checkLogin, adController.changeAdStatus);
router.delete('/:id', checkLogin, adController.delete);

export default router;
