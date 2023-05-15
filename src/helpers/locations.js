const axios = require('axios');

const { POSITIONSTACK_KEY } = process.env;

const findCoordinatesByLocationName = async (locationName) => {
  const params = {
    access_key: POSITIONSTACK_KEY,
    query: locationName,
    limit: 1,
  };

  const response = await axios.get('http://api.positionstack.com/v1/forward', {
    params,
  });

  const { data: content } = response;
  const { data } = content;
  return data[0];
};

const findLocationNameByCoordinates = async (lat, long) => {
  const params = {
    access_key: POSITIONSTACK_KEY,
    query: `${lat},${long}`,
  };

  const response = await axios.get('http://api.positionstack.com/v1/reverse', {
    params,
  });

  const { data: content } = response;
  const { data } = content;
  return data[0];
};

module.exports = {
  findCoordinatesByLocationName,
  findLocationNameByCoordinates,
};
