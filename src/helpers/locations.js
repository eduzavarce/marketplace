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

// findCoordinatesByLocationName response:
// {
//     latitude: 41.074454,
//     longitude: 1.051729,
//     type: 'locality',
//     name: 'Cambrils',
//     number: null,
//     postal_code: null,
//     street: null,
//     confidence: 0.6,
//     region: 'Tarragona',
//     region_code: 'CT',
//     county: null,
//     locality: 'Cambrils',
//     administrative_area: 'Cambrils',
//     neighbourhood: null,
//     country: 'Spain',
//     country_code: 'ESP',
//     continent: 'Europe',
//     label: 'Cambrils, CT, Spain'
//   }

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
// findLocationNameByCoordinates response:
// {
//     latitude: 41.074454,
//     longitude: 1.051729,
//     type: 'locality',
//     name: 'Cambrils',
//     number: null,
//     postal_code: null,
//     street: null,
//     region: 'Tarragona',
//     region_code: 'CT',
//     county: null,
//     locality: 'Ardiaca',
//     administrative_area: 'Cambrils',
//     neighbourhood: null,
//     country: 'Spain',
//     country_code: 'ESP',
//     continent: 'Europe',
//     label: 'Cl Josep Lluis Sert 12, Ardiaca, CT, Spain'
//   }

module.exports = {
  findCoordinatesByLocationName,
  findLocationNameByCoordinates,
};
