import models from '../database';

export default (function homeController() {
  return {
    async index(req, res, next) {
      try {
        return res.status(200).json({
          users: await models.UserAccount.findAll(),
          ads: await models.Ad.findAll(),
        });
      } catch (err) {
        return next(err);
      }
    },
  };
}());
