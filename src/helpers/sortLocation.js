const { findCoordinatesByLocationName } = require('./locations');
const nearbySort = require('nearby-sort');

const sortByLocationName = async (location, array) => {
  const response = await findCoordinatesByLocationName(location);
  const lat = response.latitude;
  const long = response.longitude;
  const coordinates = {
    lat,
    long,
  };
  const sortedData = await nearbySort(coordinates, array);
  return sortedData;
};

module.exports = sortByLocationName;
