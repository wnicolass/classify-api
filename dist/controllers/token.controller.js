"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _database = require('../database'); var _database2 = _interopRequireDefault(_database);

exports. default = (function tokenController() {
  return {
    async store(req, res) {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: 'Invalid credentials',
        });
      }

      const admin = await _database2.default.AdminAccount.findOne({
        where: { email },
      });

      if (!admin) {
        return res.status(404).json({
          error: `Admin with email ${email} does not exist`,
        });
      }

      if (!(await _bcryptjs2.default.compare(password, admin.password_hash))) {
        return res.status(401).json({
          error: 'Invalid credentials',
        });
      }

      const { id } = admin;
      const payload = { id, email };
      const token = _jsonwebtoken2.default.sign(
        payload,
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRY_DATE },
      );
      return res.status(200).json({ token });
    },
  };
}());
