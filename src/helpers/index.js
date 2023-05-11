const {
  findLocationNameByCoordinates,
  findCoordinatesByLocationName,
} = require('./locations');
const { uploadImage } = require('./uploadImage');

module.exports = {
  findCoordinatesByLocationName,
  findLocationNameByCoordinates,
  uploadImage,
};
