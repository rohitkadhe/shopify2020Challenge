import { getAllImagesRoute } from '../constants/strings';
import ax from '../axios/axios';
import AuthService from './AuthService';
import { userImagesRoute } from '../constants/strings';

class ImageGalleryService {
  async getUserImages() {
    let user = AuthService.getUser();
    let auth = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    let resp = await ax.get(userImagesRoute(user.id), auth);
    console.log(resp.data);
    return resp.data;
  }

  async getPublicImages() {
    let resp = await ax.get(getAllImagesRoute);
    return resp.data;
  }

  deleteUserImages(images) {}
}

export default new ImageGalleryService();
