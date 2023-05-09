"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _homecontroller = require('../controllers/home.controller'); var _homecontroller2 = _interopRequireDefault(_homecontroller);
var _checkLogin = require('../middlewares/checkLogin'); var _checkLogin2 = _interopRequireDefault(_checkLogin);

const router = new (0, _express.Router)();

router.get('/', _checkLogin2.default, _homecontroller2.default.index);

exports. default = router;
