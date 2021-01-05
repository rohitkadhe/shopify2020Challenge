class LocalStorageService {
  clear() {
    localStorage.clear();
  }

  delete(key) {
    localStorage.removeItem(key);
  }

  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }
}

export default new LocalStorageService();
