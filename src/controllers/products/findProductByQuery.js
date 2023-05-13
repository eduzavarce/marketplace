const sortByLocationName = require('../../helpers/sortLocation');
const { throwError } = require('../../middlewares');
const {
  findProductForLocationSearch,
  findProductByName,
  findProductByCategory,
  sortProductByPriceAsc,
  sortProductByPriceDesc,
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
      const products = await findProductForLocationSearch();
      const sorted = await sortByLocationName(location, products);
      res.send(sorted);
    }
    if (name) {
      const sorted = await findProductByName(name);
      res.send(sorted);
    }
    if (category) {
      await schemaCategory.validateAsync(category);
      const sorted = await findProductByCategory(category);
      res.send(sorted);
    }
    if (price) {
      await schemaPrice.validateAsync(price);
      let sorted;
      price === 'ASC'
        ? (sorted = await sortProductByPriceAsc())
        : (sorted = await sortProductByPriceDesc());

      res.send(sorted);
    }

    if (query) {
      throwError(404, 'Parámetro no encontrado');
    }
  } catch (error) {
    next(error);
  }
};
module.exports = findProductByQuery;
