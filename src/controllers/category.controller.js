import models from '../database';

export default (function categoryController() {
  return {
    async store(req, res, next) {
      try {
        const {
          category_name: categoryName,
          category_icon: categoryIcon,
        } = req.body;

        if (!categoryName || !categoryIcon) {
          return res.status(400).json({
            error: 'Missing required data',
          });
        }

        const categoryAlreadyExists = await models.Category.findOne({
          where: { category_name: categoryName },
        });
        if (categoryAlreadyExists) {
          return res.status(400).json({
            error: `Category with name '${categoryName} already exists'`,
          });
        }

        await models.Category.create(req.body);
        return res.status(201).json({
          msg: 'Category created successfully',
        });
      } catch (err) {
        return next(err);
      }
    },

    async index(req, res, next) {
      try {
        return res.status(200).json({
          categories: await models.Category.findAll(),
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

        const category = await models.Category.findByPk(id);

        if (!category) {
          return res.status(404).json({
            error: 'Category not found',
          });
        }

        return res.status(200).json({
          category,
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

        const category = await models.Category.findByPk(id);

        if (!category) {
          return res.status(404).json({
            error: 'Category not found',
          });
        }

        const updatedCategory = await category.update(req.body);
        return res.status(200).json({
          updated_category: updatedCategory,
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

        const category = await models.Category.findByPk(id);

        if (!category) {
          return res.status(404).json({
            error: 'Category not found',
          });
        }

        await category.destroy();
        return res.status(200).json(null);
      } catch (err) {
        return next(err);
      }
    },
  };
}());
