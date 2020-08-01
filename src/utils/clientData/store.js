export default class Store {
  abstractFunctions = [
    "getItem",
    "setItem",
    "removeItem",
    "clear",
    "getAll",
    "key",
    "length",
    "has",
    "forEach",
    "deleteAllExpires",
    "getMaxSpace",
    "getUsedSpace"
  ];
  constructor() {
    if (new.target === Store) {
      throw new Error("Store抽象类不能实例化");
    } else {
      this.abstractFunctions.forEach(item => {
        if (!new.target.prototype.hasOwnProperty(item)) {
          throw new Error("请重写抽象方法".item);
        }
      });
    }
  }
  getItem() {}
  setItem() {}
  removeItem() {}
  clear() {}
  getAll() {}
  key() {}
  length() {}
  has() {}
  forEach() {}
  deleteAllExpires() {}
  getMaxSpace() {}
  getUdesSpace() {}
}
