///javascript
//#***********************************************
//#
//#      Filename: src/utils/clientData/clientData.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: clientData本地存储工厂类
//#        Create: 2020-07-27 09:10:45
//# Last Modified: 2020-07-27 09:10:46
//#***********************************************

import Cookie from "./cookie";
import LocalStorage from "./localStorage";
import SessionStorage from "./sessionStorage";

export default class ClientData {
  /**
   * 本地存储（localStorage，sessionStorage，cookie）的工厂类
   * @param {string} type
   * @throw {Error}
   * @return {Store} 对象实例
   */
  static getStorage(type = "local") {
    switch (type) {
      case "local":
        return new LocalStorage();
      case "session":
        return new SessionStorage();
      case "cookie":
        return new Cookie();
      default:
        throw new Error("未知的本地存储类型");
    }
  }
}
