"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _database = require('../database'); var _database2 = _interopRequireDefault(_database);
var _common = require('../utils/common');

exports. default = (function subcategoryController() {
  return {
    async store(req, res, next) {
      try {
        const {
          subcategory_name: subcategoryName,
          category_id: categoryId,
        } = req.body;

        if (!subcategoryName || !categoryId) {
          return res.status(400).json({
            error: 'Missing required data',
          });
        }

        const subcategoryAlreadyExists = await _database2.default.Subcategory.findOne({
          where: { subcategory_name: subcategoryName },
        });
        if (subcategoryAlreadyExists) {
          return res.status(400).json({
            error: `Subcategory with name '${subcategoryName}' already exists`,
          });
        }

        const category = await _database2.default.Category.findByPk(categoryId);

        if (!category) {
          return res.status(404).json({
            error: `Category with id ${categoryId} not found`,
          });
        }

        await _database2.default.Subcategory.create(req.body);
        return res.status(201).json({
          msg: 'Subategory created successfully',
        });
      } catch (err) {
        return next(err);
      }
    },

    async index(req, res, next) {
      try {
        const { include } = _common.subcategoryRelatedData;
        return res.status(200).json({
          subcategories: await _database2.default.Subcategory.findAll({
            attributes: ['id', 'subcategory_name'],
            include,
          }),
        });
      } catch (err) {
        return next(err);
      }
    },

    async show(req, res, next) {
      try {
        const { id } = req.params;

        if (!id) {
          return res.status(400).json({
            error: 'Missing id',
          });
        }

        const { include } = _common.subcategoryRelatedData;
        const subcategory = await _database2.default.Subcategory.findByPk(
          id,
          {
            attributes: ['id', 'subcategory_name'],
            include,
          },
        );

        if (!subcategory) {
          return res.status(404).json({
            error: 'Subcategory not found',
          });
        }

        return res.status(200).json({
          subcategory,
        });
      } catch (err) {
        return next(err);
      }
    },

    async update(req, res, next) {
      try {
        const { id } = req.params;

        if (!id) {
          return res.status(400).json({
            error: 'Missing id',
          });
        }

        if (!Object.keys(req.body).length) {
          return res.status(400).json({
            error: 'No data to update',
          });
        }

        const {
          category_id: categoryId,
        } = req.body;

        if (categoryId) {
          const category = await _database2.default.Category.findByPk(categoryId);

          if (!category) {
            return res.status(400).json({
              error: `Category with id ${categoryId} does not exist`,
            });
          }
        }

        const {
          subcategory_name: subcategoryName,
        } = req.body;
        const subcategoryAlreadyExists = !!(await _database2.default.Subcategory.findOne(
          { where: { subcategory_name: subcategoryName } },
        ));
        if (subcategoryAlreadyExists) {
          return res.status(400).json({
            error: `Subcategory with name '${subcategoryName}' already exists`,
          });
        }

        const subcategory = await _database2.default.Subcategory.findByPk(id);

        if (!subcategory) {
          return res.status(404).json({
            error: 'Subcategory not found',
          });
        }

        const updatedSubcategory = await subcategory.update(req.body);
        return res.status(200).json({
          updated_subcategory: updatedSubcategory,
        });
      } catch (err) {
        return next(err);
      }
    },

    async delete(req, res, next) {
      try {
        const { id } = req.params;

        if (!id) {
          return res.status(400).json({
            error: 'Missing id',
          });
        }

        const subcategory = await _database2.default.Subcategory.findByPk(id, _common.subcategoryRelatedData);

        if (!subcategory) {
          return res.status(404).json({
            error: 'Subcategory not found',
          });
        }

        await subcategory.destroy();
        return res.status(200).json(null);
      } catch (err) {
        return next(err);
      }
    },
  };
}());
