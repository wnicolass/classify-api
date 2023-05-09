"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _usercontroller = require('../controllers/user.controller'); var _usercontroller2 = _interopRequireDefault(_usercontroller);
var _checkLogin = require('../middlewares/checkLogin'); var _checkLogin2 = _interopRequireDefault(_checkLogin);

const router = new (0, _express.Router)();

router.get('/', _checkLogin2.default, _usercontroller2.default.index);
router.get('/:id', _checkLogin2.default, _usercontroller2.default.show);
router.put('/:id', _checkLogin2.default, _usercontroller2.default.update);
router.delete('/:id', _checkLogin2.default, _usercontroller2.default.delete);

exports. default = router;
