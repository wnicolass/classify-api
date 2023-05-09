"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _adcontroller = require('../controllers/ad.controller'); var _adcontroller2 = _interopRequireDefault(_adcontroller);
var _checkLogin = require('../middlewares/checkLogin'); var _checkLogin2 = _interopRequireDefault(_checkLogin);

const router = new (0, _express.Router)();

router.get('/', _checkLogin2.default, _adcontroller2.default.index);
router.get('/status/:id?', _checkLogin2.default, _adcontroller2.default.allAdsByStatus);
router.get('/:id', _checkLogin2.default, _adcontroller2.default.show);
router.put('/:id', _checkLogin2.default, _adcontroller2.default.update);
router.patch('/:id', _checkLogin2.default, _adcontroller2.default.changeAdStatus);
router.delete('/:id', _checkLogin2.default, _adcontroller2.default.delete);

exports. default = router;
