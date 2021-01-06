import ax from '../axios/axios';
import AuthService from './AuthService';
import { userImagesRoute, getAllImagesRoute, uploadImagesRoute } from '../constants/strings';

class ImageGalleryService {
  async getUserImages() {
    let user = AuthService.getUser();
    let auth = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    let resp = await ax.get(userImagesRoute(user.id), auth);
    return resp.data;
  }

  async getPublicImages() {
    let resp = await ax.get(getAllImagesRoute);
    return resp.data;
  }

  async uploadImages(imageFile) {
    let user = AuthService.getUser();
    let auth = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    let resp = await ax.post(uploadImagesRoute, imageFile, auth);
    return resp;
  }

  deleteUserImages(images) {}
}

export default new ImageGalleryService();
