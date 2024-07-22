class LocalStorageClass {
  setItem(key: string, value: any) {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string) {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
  }

  removeItem(key: string) {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  }
}
const LocalStorage = new LocalStorageClass();

export { LocalStorage };
