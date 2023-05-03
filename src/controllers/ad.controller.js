import models from '../database';
import { default as AdStatusEnum } from '../utils/enums';
import getKeyByValue from '../utils/common';

export default (function adController() {
  return {
    async index(req, res, next) {
      try {
        return res.status(200).json({
          ads: await models.Ad.findAll(),
        });
      } catch (err) {
        return next(err);
      }
    },

    async allAdsByStatus(req, res, next) {
      try {
        const { id: statusId } = req.params;

        if (!statusId) {
          return res.status(400).json({
            error: 'Missing status id',
          });
        }

        const adStatus = getKeyByValue(AdStatusEnum, +statusId);

        if (!adStatus) {
          return res.status(404).json({
            error: `Status with id ${statusId} does not exist`,
          });
        }

        const adsByStatus = await models.Ad.findAll({
          where: { status_id: statusId },
        });

        if (!adsByStatus.length) {
          return res.status(404).json({
            error: `No ads found with id ${statusId}`,
          });
        }

        return res.status(200).json({
          ads: adsByStatus,
        });
      } catch (err) {
        return next(err);
      }
    },

    async show(req, res, next) {
      try {
        const { id } = req.params;

        const ad = await models.Ad.findByPk(id);

        if (!ad) {
          return res.status(404).json({
            error: 'Ad not found',
          });
        }
        return res.status(200).json({
          ad,
        });
      } catch (err) {
        return next(err);
      }
    },

    async update(req, res, next) {
      try {
        const { id } = req.params;

        if (!Object.keys(req.body).length) {
          return res.status(400).json({
            error: 'No data to update',
          });
        }

        const ad = await models.Ad.findByPk(id);

        if (!ad) {
          return res.status(404).json({
            error: 'Ad not found',
          });
        }

        const updatedAd = await ad.update(req.body);
        const {
          id: adId,
          title,
          ad_description: adDescription,
        } = updatedAd;

        return res.status(200).json({
          id: adId,
          title,
          ad_description: adDescription,
        });
      } catch (err) {
        return next(err);
      }
    },

    async changeAdStatus(req, res, next) {
      try {
        const { id } = req.params;
        const { status_id: statusId } = req.body;

        if (!statusId) {
          return res.status(400).json({
            error: 'Missing new Ad status',
          });
        }

        const newStatus = getKeyByValue(AdStatusEnum, +statusId);

        if (!newStatus) {
          return res.status(400).json({
            error: 'Ad status does not exist',
          });
        }

        const ad = await models.Ad.findByPk(id);

        if (!ad) {
          return res.status(404).json({
            error: 'Ad not found',
          });
        }
        ad.status_id = AdStatusEnum[newStatus];
        ad.save();
        return res.status(200).json({
          msg: 'Status updated successfully',
        });
      } catch (err) {
        return next(err);
      }
    },

    async delete(req, res, next) {
      try {
        const { id } = req.params;

        const ad = await models.Ad.findByPk(id);

        if (!ad) {
          return res.status(404).json({
            error: 'Ad not found',
          });
        }
        await ad.update({ status_id: AdStatusEnum.deleted });
        return res.status(200).json(null);
      } catch (err) {
        return next(err);
      }
    },
  };
}());
