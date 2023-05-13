const sortByLocationName = require('../../helpers/sortLocation');
const { findProductForLocationSearch } = require('../../repositories');

const findProductByQuery = async (req, res, next) => {
  try {
    const { query } = req;
    const { name, category, price, location } = query;
    console.log(name, category);
    if (location) {
      const products = await findProductForLocationSearch();
      const sorted = await sortByLocationName(location, products);
      console.log(sorted);
      res.send(sorted);
    }
    if (name) {
      res.send();
    }
    res.send();
  } catch (error) {
    next(error);
  }
};
module.exports = findProductByQuery;
