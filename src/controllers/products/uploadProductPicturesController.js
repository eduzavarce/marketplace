const Joi = require('joi');
const fs = require('fs/promises');
const path = require('path');
const { uploadImage } = require('../../helpers');
const { insertProductImageName } = require('../../repositories');

const uploadProductPicturesController = async (req, res, next) => {
  //   console.log(req.files);
  const { idProduct } = req.params;
  const productImagesFolder = path.join(
    __dirname,
    '../../../public',
    `/products/${idProduct}`
  );
  const { images } = req.files;

  console.log(images);
  for await (const image of images) {
    const filename = await uploadImage(
      productImagesFolder,
      idProduct,
      image.data
    );
    await insertProductImageName(idProduct, filename);
  }
  //   console.log(images[0].data);

  try {
    res.send('holitas');
  } catch (error) {
    next(error);
  }
};
module.exports = { uploadProductPicturesController };
