
class Utils {
  static generateKey(paramObj) {
    const obj = JSON.stringify(paramObj);
    return btoa(obj);
  }
}

export default Utils;
