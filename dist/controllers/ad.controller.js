"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../database'); var _database2 = _interopRequireDefault(_database);
var _enums = require('../utils/enums'); var _enums2 = _interopRequireDefault(_enums);
var _common = require('../utils/common');

exports. default = (function adController() {
  return {
    async index(req, res, next) {
      try {
        return res.status(200).json({
          ads: await _database2.default.Ad.findAll(_common.adRelatedData),
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

        const adStatus = _common.getKeyByValue.call(void 0, _enums2.default, +statusId);

        if (!adStatus) {
          return res.status(404).json({
            error: `Status with id ${statusId} does not exist`,
          });
        }

        const { include } = _common.adRelatedData;
        const adsByStatus = await _database2.default.Ad.findAll({
          where: { status_id: statusId },
          include,
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

        const ad = await _database2.default.Ad.findByPk(id, _common.adRelatedData);

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

        const ad = await _database2.default.Ad.findByPk(id);

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

        const newStatus = _common.getKeyByValue.call(void 0, _enums2.default, +statusId);

        if (!newStatus) {
          return res.status(400).json({
            error: 'Ad status does not exist',
          });
        }

        const ad = await _database2.default.Ad.findByPk(id);

        if (!ad) {
          return res.status(404).json({
            error: 'Ad not found',
          });
        }
        ad.status_id = _enums2.default[newStatus];
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

        const ad = await _database2.default.Ad.findByPk(id);

        if (!ad) {
          return res.status(404).json({
            error: 'Ad not found',
          });
        }
        await ad.update({ status_id: _enums2.default.deleted });
        return res.status(200).json(null);
      } catch (err) {
        return next(err);
      }
    },
  };
}());
