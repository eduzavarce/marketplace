const Joi = require('joi');
const fs = require('fs/promises');
const path = require('path');
const { uploadImage } = require('../../helpers');
const {
  insertProductImageName,
  findProductById,
} = require('../../repositories');
const { throwError } = require('../../middlewares');

const uploadProductPicturesController = async (req, res, next) => {
  try {
    const { FULL_DOMAIN } = process.env;
    const { idProduct } = req.params;
    const { id, role } = req.auth;

    const filesSchema = Joi.object().keys({
      images: Joi.required(),
    });
    const idSchema = Joi.number().integer().positive().required();

    await idSchema.validateAsync(idProduct);
    const product = await findProductById(idProduct);

    if (!product) throwError(404, 'Producto no encontrado');
    const productImagesFolder = path.join(
      __dirname,
      '../../../public',
      `/products/${idProduct}`
    );

    if (id !== product.idUser && role !== 'admin') {
      throwError(403, 'Usuario no autorizado');
    }
    await filesSchema.validateAsync(req.files);
    const { images } = req.files;
    const imagesNames = [];
    const imageList = {};
    if (Array.isArray(images)) {
      for await (const image of images) {
        const filename = await uploadImage(
          productImagesFolder,
          idProduct,
          image.data
        );
        await insertProductImageName(idProduct, filename);
        imagesNames.push(
          `${FULL_DOMAIN}/api/v1/products/${idProduct}/${filename}`
        );
      }
      for (let i = 0; i < imagesNames.length; i++) {
        const key = `image ${i + 1}`;
        const value = imagesNames[i];
        imageList[key] = value;
      }
      res.status(200).send({
        status: 'ok',
        data: {
          id: idProduct,
          imageList,
        },
      });
    } else {
      const filename = await uploadImage(
        productImagesFolder,
        idProduct,
        images.data
      );
      await insertProductImageName(idProduct, filename);

      res.status(200).send({
        status: 'ok',
        data: {
          id: idProduct,
          image1: `${FULL_DOMAIN}/api/v1/products/${idProduct}/${filename}`,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = { uploadProductPicturesController };