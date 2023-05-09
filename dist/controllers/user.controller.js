"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../database'); var _database2 = _interopRequireDefault(_database);
var _common = require('../utils/common');

exports. default = (function userController() {
  return {
    async index(req, res, next) {
      try {
        return res.status(200).json({
          users: await _database2.default.UserAccount.findAll(_common.userRelatedData),
        });
      } catch (err) {
        return next(err);
      }
    },

    async show(req, res, next) {
      try {
        const { id } = req.params;

        const user = await _database2.default.UserAccount.findByPk(id, _common.userRelatedData);

        if (!user) {
          return res.status(404).json({
            error: 'User not found',
          });
        }
        return res.status(200).json({
          user,
        });
      } catch (err) {
        return next(err);
      }
    },

    async update(req, res, next) {
      try {
        const { id } = req.params;

        const user = await _database2.default.UserAccount.findByPk(id, _common.userRelatedData);

        if (!user) {
          return res.status(404).json({
            error: 'User not found',
          });
        }

        const { email_addr: userEmail } = req.body;

        if (userEmail) {
          const userLoginData = (
            await _database2.default.UserLoginData.findByPk(user.user_id)
          );
          userLoginData.email_addr = userEmail;
          userLoginData.save();
        }

        const updatedUser = await user.update(req.body);
        const { user_id: userId, username, email } = updatedUser;

        return res.status(200).json({
          user_id: userId,
          username,
          email,
        });
      } catch (err) {
        return next(err);
      }
    },

    async delete(req, res, next) {
      try {
        const { id } = req.params;

        const user = await _database2.default.UserAccount.findByPk(id);

        if (!user) {
          return res.status(404).json({
            error: 'User not found',
          });
        }
        await user.destroy();
        return res.status(200).json(null);
      } catch (err) {
        return next(err);
      }
    },
  };
}());
