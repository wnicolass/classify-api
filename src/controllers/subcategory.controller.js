import models from '../database';

export default (function subcategoryController() {
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

        const subcategoryAlreadyExists = await models.Subcategory.findOne({
          where: { subcategory_name: subcategoryName },
        });
        if (subcategoryAlreadyExists) {
          return res.status(400).json({
            error: `Subcategory with name '${subcategoryName}' already exists`,
          });
        }

        const category = await models.Category.findByPk(categoryId);

        if (!category) {
          return res.status(404).json({
            error: `Category with id ${categoryId} not found`,
          });
        }

        await models.Subcategory.create(req.body);
        return res.status(201).json({
          msg: 'Subategory created successfully',
        });
      } catch (err) {
        return next(err);
      }
    },

    async index(req, res, next) {
      try {
        return res.status(200).json({
          subcategories: await models.Subcategory.findAll(),
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

        const subcategory = await models.Subcategory.findByPk(id);

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
          const category = await models.Category.findByPk(categoryId);

          if (!category) {
            return res.status(400).json({
              error: `Category with id ${categoryId} does not exist`,
            });
          }
        }

        const subcategory = await models.Subcategory.findByPk(id);

        if (!subcategory) {
          return res.status(404).json({
            error: 'Subcategory not found',
          });
        }

        const updatedSubcategory = await subcategory.update(req.body);
        return res.status(200).json({
          updated_category: updatedSubcategory,
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

        const subcategory = await models.Subcategory.findByPk(id);

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
