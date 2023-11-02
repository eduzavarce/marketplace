const { createImageUrl } = require('../../helpers');
const { throwError } = require('../../middlewares');
const {
  findImagesByIdProduct,
  findProductsByAllQuerys,
  findAvgReviewsByUserId,
} = require('../../repositories');

const Joi = require('joi');

const findProductByQuery = async (req, res, next) => {
  try {
    const { query } = req;

    const { name, category, order, lat, long } = query;
    const schemaCategory = Joi.string().valid(
      'music',
      'video',
      'photography',
      'gaming',
      'computer',
      'collector',
      'television',
      'cloth',
      'others'
    );
    if (category) await schemaCategory.validateAsync(category);
    const sorted = await findProductsByAllQuerys(
      name,
      category,
      order,
      lat,
      long
    );
    if (sorted) {
      await Promise.all(
        sorted?.map(async (product) => {
          const result = await findAvgReviewsByUserId(product.idUser);
          if (result) {
            const { avgScore } = result;
            product.avgReviewsVendor = avgScore;
          }
          const picturesFileNames = await findImagesByIdProduct(product.id);
          if (picturesFileNames) {
            const pictures = picturesFileNames.map((picture) => {
              const url = createImageUrl(
                picture.fileName,
                product.id,
                'products'
              );
              return url;
            });
            product.images = pictures;
          }
        })
      );
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
