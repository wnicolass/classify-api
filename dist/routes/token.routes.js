"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _tokencontroller = require('../controllers/token.controller'); var _tokencontroller2 = _interopRequireDefault(_tokencontroller);

const router = new (0, _express.Router)();

router.post('/', _tokencontroller2.default.store);

exports. default = router;
