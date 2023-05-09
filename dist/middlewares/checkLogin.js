"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _database = require('../database'); var _database2 = _interopRequireDefault(_database);

 async function checkLogin(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: 'Login required',
    });
  }

  const [, token] = authorization.split(' ');
  try {
    const data = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const admin = await _database2.default.AdminAccount.findOne({
      where: { id, email },
    });

    if (!admin) {
      return res.status(401).json({
        error: 'Invalid admin account',
      });
    }

    req.adminId = id;
    req.adminEmail = email;

    return next();
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid or expired token',
    });
  }
} exports.default = checkLogin;
