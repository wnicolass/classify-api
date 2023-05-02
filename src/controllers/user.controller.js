import models from '../database';

export default (function userController() {
  return {
    async index(req, res, next) {
      try {
        return res.status(200).json({
          users: await models.UserAccount.findAll(),
        });
      } catch (err) {
        return next(err);
      }
    },

    async show(req, res, next) {
      try {
        const { id } = req.params;

        const user = await models.UserAccount.findByPk(id);

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

        const user = await models.UserAccount.findByPk(id);

        if (!user) {
          return res.status(404).json({
            error: 'User not found',
          });
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

        const user = await models.UserAccount.findByPk(id);

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