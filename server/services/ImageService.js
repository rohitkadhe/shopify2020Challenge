const cloudinary = require('../config/cloudinary');
const db = require('../db/db');
const Image = require('../models/Image');

const uploadImages = async (imageFiles) => {
  const results = await Promise.all(
    imageFiles.map(
      async (imageFile) =>
        await cloudinary.v2.uploader.upload(imageFile.path, { folder: 'ShopifyImageRepo' }),
    ),
  );
  return results;
};

const addImagesToDb = async (imageData, imageUploadRes, user) => {
  let images = imageData.map((data, index) => {
    let dat = JSON.parse(data);
    return new Image(
      dat.name,
      imageUploadRes[index].public_id,
      user.id,
      imageUploadRes[index].secure_url,
      dat.visibility,
    );
  });

  let results = Promise.all(
    images.map(async (image) => {
      return await db('images')
        .insert(image)
        .returning(['name', 'user_id', 'public_id', 'secure_url']);
    }),
  );

  return results;
};

module.exports = {
  uploadImages,
  addImagesToDb,
};
