//BASEURL
const SERVER_BASE_URL = 'http://localhost:5433';

//Local storage keys

//Routes Front End
const homeRoute = '/images';
const loginRoute = '/login';
const registerRoute = '/register';
const userImagesRoute = (user_id) => `/users/${user_id}/images`;

//Routes Back End

export { SERVER_BASE_URL, homeRoute, loginRoute, registerRoute, userImagesRoute };
