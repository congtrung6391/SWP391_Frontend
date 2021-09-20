class LocalStorageService {
  static read(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export default LocalStorageService;
