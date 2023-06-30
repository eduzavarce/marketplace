const { createImageUrl } = require('../../helpers');
const { throwError } = require('../../middlewares');
const {
  findDealById,
  findImagesByIdProduct,
  findAvgReviewsByUserId,
  findProductById,
  findLatestMessageContentByDealId,
  findExistingUserReviewsByDealId,
} = require('../../repositories');

const getDealDetailsByIdController = async (req, res, next) => {
  const {
    auth: { id: idUser },
  } = req;
  const { idDeal } = req.params;
  try {
    const {
      idProduct,
      idBuyer,
      usernameVendor,
      usernameBuyer,
      avatarBuyer,
      avatarVendor,
      statusDeal,
    } = await findDealById(idDeal);

    const product = await findProductById(idProduct);

    const { FULL_DOMAIN } = process.env;
    const {
      id,
      name,
      description,
      price,
      category,
      idUser: idVendor,
    } = product;
    if (idUser !== idBuyer && idUser !== idVendor)
      throwError(403, 'El usuario no tiene permiso de ver esta informacion');
    const picturesFileNames = await findImagesByIdProduct(idProduct);

    const pictures = picturesFileNames.map((picture) => {
      return createImageUrl(picture.fileName, idProduct, 'products');
    });
    const avgReviewsVendorData = await findAvgReviewsByUserId(idVendor);
    const avgReviewsBuyerData = await findAvgReviewsByUserId(idBuyer);
    const avatarVendorUrl = createImageUrl(avatarVendor, idVendor, 'users');
    const avatarBuyerUrl = createImageUrl(avatarBuyer, idBuyer, 'users');
    const messages = await findLatestMessageContentByDealId(idDeal);
    const verifyIfPreviouslyReviewed = await findExistingUserReviewsByDealId(
      idDeal,
      idUser
    );

    const response = {
      status: 'ok',
      data: {
        dealData: {
          id: idDeal,
          userRole: idUser === idVendor ? 'vendor' : 'buyer',
          idVendor,
          usernameVendor,
          avatarVendorUrl: avatarVendor
            ? avatarVendorUrl
            : `${FULL_DOMAIN}/users/default-avatar.png`,
          avgReviewsVendor: avgReviewsVendorData?.avgScore || null,
          idBuyer,
          usernameBuyer,
          avatarBuyerUrl: avatarBuyer
            ? avatarBuyerUrl
            : `${FULL_DOMAIN}/users/default-avatar.png`,
          avgReviewsBuyer: avgReviewsBuyerData?.avgScore || null,
          status: statusDeal,
          dealReviewedByCurrentUser: verifyIfPreviouslyReviewed ? true : false,
        },
        productData: {
          id,
          name,
          description,
          price,
          category,
          pictures,
        },
        messages,
      },
    };
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDealDetailsByIdController };
