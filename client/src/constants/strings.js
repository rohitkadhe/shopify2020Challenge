//BASEURL
const SERVER_BASE_URL = 'http://localhost:5433';

//Local storage keys

//Front and Backend common routes
const userImagesRoute = (user_id) => `/users/${user_id}/images`;

//Routes Front End
const homeRoute = '/images';
const loginRoute = '/login';
const registerRoute = '/register';
const uploadImagesRoute = '/images/upload';
const userDeleteImagesRoute = (user_id) => `/users/${user_id}/images/delete`;
//Routes Back End
const getAllImagesRoute = '/images';

export {
  SERVER_BASE_URL,
  homeRoute,
  getAllImagesRoute,
  loginRoute,
  registerRoute,
  userImagesRoute,
  uploadImagesRoute,
  userDeleteImagesRoute,
};
