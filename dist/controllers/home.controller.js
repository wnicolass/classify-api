"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../database'); var _database2 = _interopRequireDefault(_database);

exports. default = (function homeController() {
  return {
    async index(req, res, next) {
      try {
        return res.status(200).json({
          users: await _database2.default.UserAccount.findAll(),
          ads: await _database2.default.Ad.findAll(),
        });
      } catch (err) {
        return next(err);
      }
    },
  };
}());
