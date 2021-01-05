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
    console.log(err);
    next(err);
  }
};

module.exports = {
  uploadImages,
};
