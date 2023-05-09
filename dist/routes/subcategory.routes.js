"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _subcategorycontroller = require('../controllers/subcategory.controller'); var _subcategorycontroller2 = _interopRequireDefault(_subcategorycontroller);
var _checkLogin = require('../middlewares/checkLogin'); var _checkLogin2 = _interopRequireDefault(_checkLogin);

const router = new (0, _express.Router)();

router.post('/', _checkLogin2.default, _subcategorycontroller2.default.store);
router.get('/', _checkLogin2.default, _subcategorycontroller2.default.index);
router.get('/:id', _checkLogin2.default, _subcategorycontroller2.default.show);
router.put('/:id?', _checkLogin2.default, _subcategorycontroller2.default.update);
router.delete('/:id?', _checkLogin2.default, _subcategorycontroller2.default.delete);

exports. default = router;
