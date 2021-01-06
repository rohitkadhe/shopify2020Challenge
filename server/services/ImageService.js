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
      dat.visibility.toLowerCase(),
    );
  });

  let results = Promise.all(
    images.map(async (image) => {
      let res = await db('images').insert(image).returning(['*']);
      return res[0];
    }),
  );

  return results;
};

const getPublicImages = async () => {
  let images = await db('images').select(['*']).where('visibility', 'public');
  return images;
};

const getUserImages = async (user_id, visibility) => {
  let images;
  if (visibility.toLowerCase() === 'private' || visibility.toLowerCase() === 'public') {
    images = await db('images')
      .select(['*'])
      .where('user_id', user_id)
      .where('visibility', visibility);
  } else {
    images = await db('images').select(['*']).where('user_id', user_id);
  }
  return images;
};

const deleteUserImages = async (user_id, publicImageIds) => {
  let imageIdObjs = await Promise.all(
    publicImageIds.map(async (publicImageId) => {
      let res = await db('images')
        .select('public_id')
        .where('user_id', user_id)
        .where('public_id', publicImageId);
      return res[0];
    }),
  );
  await Promise.all(
    publicImageIds.map(async (publicImageId) => {
      let res = await db('images')
        .delete()
        .where('user_id', user_id)
        .where('public_id', publicImageId);
      return res[0];
    }),
  );

  let res = await Promise.all(
    imageIdObjs.map(
      async (imageIdObj) => await cloudinary.v2.uploader.destroy(imageIdObj.public_id),
    ),
  );

  return res;
};

module.exports = {
  uploadImages,
  addImagesToDb,
  getPublicImages,
  getUserImages,
  deleteUserImages,
};
