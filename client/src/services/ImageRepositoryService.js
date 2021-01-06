import ax from '../axios/axios';
import AuthService from './AuthService';
import {
  userImagesRoute,
  getAllImagesRoute,
  uploadImagesRoute,
  SERVER_BASE_URL,
} from '../constants/strings';

class ImageRepositoryService {
  async getUserImages() {
    let user = AuthService.getUser();
    let auth = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    let uri = userImagesRoute(user.id);
    let resp = await ax.get(uri, auth);
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

  async deleteUserImages(publicImageIds) {
    let user = AuthService.getUser();
    let dat = {
      publicImageIds,
    };

    let uri = userImagesRoute(user.id);
    const resp = await ax({
      url: `${SERVER_BASE_URL}${uri}`,
      data: dat,
      method: 'delete',
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return resp;
  }
}

export default new ImageRepositoryService();
