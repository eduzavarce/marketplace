const { createImageUrl } = require('../../helpers');
const { throwError } = require('../../middlewares');
const {
  findImagesByIdProduct,
  findAvgReviewsByUserId,
  findProductById,
  findChatIdbyUserAndProductId,
  findLatestMessageContentByChatId,
} = require('../../repositories');

const getProductChatDetailsByIdController = async (req, res, next) => {
  const {
    auth: { id: idUser },
  } = req;
  const { idProduct } = req.params;

  try {
    const chatInfo = await findChatIdbyUserAndProductId(idUser, idProduct);
    if (!chatInfo) throwError(404, 'No tienes chats para este producto');
    const {
      id: idChat,
      idBuyer,
      usernameBuyer,
      avatarBuyer,
      idVendor,
      usernameVendor,
      avatarVendor,
    } = chatInfo;
    console.log('idUser', idUser);
    console.log(chatInfo);
    const product = await findProductById(idProduct);

    const { FULL_DOMAIN } = process.env;
    const { id, name, description, price, category } = product;
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

    const messages = await findLatestMessageContentByChatId(idChat);

    const response = {
      status: 'ok',
      data: {
        dealData: {
          id: idChat,
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

module.exports = { getProductChatDetailsByIdController };
