import LocalStorageService from './LocalStorageService';
import { homeRoute, loginRoute } from '../constants/strings';
class AuthService {
  authRouteHandler(history) {
    if (this.isAuthenticated()) {
      LocalStorageService.delete('user');
      history.push(homeRoute);
    } else {
      history.push(loginRoute);
    }
  }

  getUser() {
    return LocalStorageService.get('user');
  }

  isAuthenticated() {
    let user = LocalStorageService.get('user');
    if (user === null || user === '') return false;
    if (user.token === '') return false;
    return true;
  }
}

export default new AuthService();
