import LocalStorageService from './LocalStorageService';

class AuthService {
  authRouteHandler(history) {
    if (this.isAuthenticated()) {
      LocalStorageService.delete('user');
      history.push('/images');
    } else {
      history.push('/login');
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
