const sortByDistance = (fixed, array) => {
  //ya lo se, la tierra no es plana, esto es una mala aproximación para no pagar por una api o copiar y pegar una función que no entiendo...

  const [fixedLat, fixedLong] = fixed;
  console.log(fixed);
  const objectsWithDistance = array.map((object) => {
    object.distance = Math.sqrt(
      Math.pow(fixedLat - object.latitude, 2) +
        Math.pow(fixedLong - object.longitude, 2)
    );
    return object;
  });
  const sortedArray = objectsWithDistance.sort(
    (a, b) => a.distance - b.distance
  );
  console.log(sortedArray);
  return sortedArray;
};

module.exports = sortByDistance;
