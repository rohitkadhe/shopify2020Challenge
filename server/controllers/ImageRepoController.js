const { UNAUTHORIZED } = require('../errors/HttpErrors');
const ImageService = require('../services/ImageService');

const uploadImages = async (req, res, next) => {
  try {
    let user = req.user;
    let imageFiles = Object.values(req.files);
    let imageData = Object.values(req.body);
    const results = await ImageService.uploadImages(imageFiles);
    let images = await ImageService.addImagesToDb(imageData, results, user);

    res.json(images);
  } catch (err) {
    next(err);
  }
};

const getPublicImages = async (req, res, next) => {
  try {
    let images = await ImageService.getPublicImages();
    res.json(images);
  } catch (err) {
    next(err);
  }
};

const getUserImages = async (req, res, next) => {
  try {
    if (parseInt(req.params.user_id) !== parseInt(req.user.id))
      return next({ message: 'Unauthorized', statusCode: UNAUTHORIZED });

    const user_id = req.params.user_id;
    const visibility = req.query.visibility != null ? req.query.visibility : '';
    let images = await ImageService.getUserImages(user_id, visibility);
    res.json(images);
  } catch (err) {
    next(err);
  }
};

const deleteUserImages = async (req, res, next) => {
  try {
    if (parseInt(req.params.user_id) !== parseInt(req.user.id)) {
      return next({ message: 'Unauthorized', statusCode: UNAUTHORIZED });
    }
    const user_id = req.params.user_id;
    const publicImageIds = req.body.publicImageIds;
    let images = await ImageService.deleteUserImages(user_id, publicImageIds);
    res.json(images);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadImages,
  getPublicImages,
  getUserImages,
  deleteUserImages,
};
