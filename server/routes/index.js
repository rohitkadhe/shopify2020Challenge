const express = require('express');
const router = express();
const ImageRepoController = require('../controllers/ImageRepoController');
const AuthController = require('../controllers/AuthController');
const auth = require('../middlewares/validateToken');

router.get('/', (req, res) => {
  res.send('Server Started');
});

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.get('/images', ImageRepoController.getPublicImages);
router.get('/users/:user_id/images', auth, ImageRepoController.getUserImages);
router.post('/images/upload', auth, ImageRepoController.uploadImages);
router.delete('/users/:user_id/images', auth, ImageRepoController.deleteUserImages);

module.exports = router;
