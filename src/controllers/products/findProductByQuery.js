const { throwError } = require('../../middlewares');
const {
  findProductByName,
  findProductByCategory,
  sortProductByPriceAsc,
  sortProductByPriceDesc,
  findProductByCity,
} = require('../../repositories');

const Joi = require('joi');

const findProductByQuery = async (req, res, next) => {
  try {
    const { query } = req;
    const { name, category, price, location } = query;
    const schemaPrice = Joi.string().valid('ASC', 'DESC');
    const schemaCategory = Joi.string().valid(
      'consoles',
      'games',
      'PC',
      'cloth',
      'controllers',
      'arcade'
    );
    if (location) {
      const sorted = await findProductByCity(location);
      res.status(200).send({
        status: 'ok',
        data: { products: sorted },
      });
      return;
    }
    if (name) {
      const sorted = await findProductByName(name);
      res.status(200).send({
        status: 'ok',
        data: { products: sorted },
      });
      return;
    }
    if (category) {
      await schemaCategory.validateAsync(category);
      const sorted = await findProductByCategory(category);
      res.status(200).send({
        status: 'ok',
        data: { products: sorted },
      });
      return;
    }
    if (price) {
      await schemaPrice.validateAsync(price);
      let sorted;
      price === 'ASC'
        ? (sorted = await sortProductByPriceAsc())
        : (sorted = await sortProductByPriceDesc());

      res.status(200).send({
        status: 'ok',
        data: { products: sorted },
      });
      return;
    }

    if (query) {
      throwError(404, 'Parámetro no encontrado');
    }
  } catch (error) {
    next(error);
  }
};
module.exports = findProductByQuery;
