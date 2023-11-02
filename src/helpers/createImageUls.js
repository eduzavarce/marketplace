const { FULL_DOMAIN } = process.env;
const createImageUrl = (fileName, id, group) => {
  const url = `${FULL_DOMAIN}/${group}/${id}/${fileName}`;

  return url;
};
module.exports = createImageUrl;
