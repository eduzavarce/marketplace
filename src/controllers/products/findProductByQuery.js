const { createImageUrl } = require('../../helpers');
const { throwError } = require('../../middlewares');
const {
  findProductByName,
  findProductByCategory,
  sortProductByPriceAsc,
  sortProductByPriceDesc,
  findProductByCity,
  sortProductsByLocation,
  findImagesByIdProduct,
  findAllProducts,
  findProductsByAllQuerys,
} = require('../../repositories');

const Joi = require('joi');

const findProductByQuery = async (req, res, next) => {
  try {
    const { query } = req;
    const { name, category, price, location } = query;
    const schemaPrice = Joi.string().valid('ASC', 'DESC');
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
    // if (category) await schemaCategory.validateAsync(category);
    if (price) await schemaPrice.validateAsync(price);
    const sorted = await findProductsByAllQuerys(name, category, price);
    if (sorted) {
      await Promise.all(
        sorted?.map(async (product) => {
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

    // if (location) {
    //   const sorted = await findProductByCity(location);
    //   await sortProductsByLocation(40.42303945117233, -3.6804417870805737); /// por implementar, estas coordenadas son del centro de Madrid y ordena por distancia.

    //   await Promise.all(
    //     sorted.map(async (product) => {
    //       const picturesFileNames = await findImagesByIdProduct(product.id);
    //       if (picturesFileNames) {
    //         const pictures = picturesFileNames.map((picture) => {
    //           const url = createImageUrl(
    //             picture.fileName,
    //             product.id,
    //             'products'
    //           );
    //           return url;
    //         });
    //         product.images = pictures;
    //       }
    //     })
    //   );
    //   res.status(200).send({
    //     status: 'ok',
    //     data: { products: sorted },
    //   });
    //   return;
    // }
    // if (category) {
    //   await schemaCategory.validateAsync(category);
    //   const sorted = await findProductByCategory(category);
    //   await Promise.all(
    //     sorted.map(async (product) => {
    //       const picturesFileNames = await findImagesByIdProduct(product.id);
    //       if (picturesFileNames) {
    //         const pictures = picturesFileNames.map((picture) => {
    //           const url = createImageUrl(
    //             picture.fileName,
    //             product.id,
    //             'products'
    //           );
    //           return url;
    //         });
    //         product.images = pictures;
    //       }
    //     })
    //   );
    //   res.status(200).send({
    //     status: 'ok',
    //     data: { products: sorted },
    //   });
    //   return;
    // }
    // if (price) {
    //   await schemaPrice.validateAsync(price);
    //   let sorted;
    //   price === 'ASC'
    //     ? (sorted = await sortProductByPriceAsc())
    //     : (sorted = await sortProductByPriceDesc());

    //   await Promise.all(
    //     sorted.map(async (product) => {
    //       const picturesFileNames = await findImagesByIdProduct(product.id);
    //       if (picturesFileNames) {
    //         const pictures = picturesFileNames.map((picture) => {
    //           const url = createImageUrl(
    //             picture.fileName,
    //             product.id,
    //             'products'
    //           );
    //           return url;
    //         });
    //         product.images = pictures;
    //       }
    //     })
    //   );

    //   res.status(200).send({
    //     status: 'ok',
    //     data: { products: sorted },
    //   });
    //   return;
    // }

    if (query) {
      throwError(404, 'Parámetro no encontrado');
    }
  } catch (error) {
    next(error);
  }
};
module.exports = findProductByQuery;
