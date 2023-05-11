const path = require('path');
const sharp = require('sharp');
const { ensureDir } = require('fs-extra');
const randomstring = require('randomstring');

const uploadImage = async (imageFolder, id, imageData) => {
  ensureDir(imageFolder);
  const image = sharp(imageData);
  const imageName = randomstring.generate(12) + '.png';

  await image
    .resize(400)
    .toFormat('png')
    .toFile(path.join(imageFolder, imageName));

  return imageName;
};
module.exports = { uploadImage };
