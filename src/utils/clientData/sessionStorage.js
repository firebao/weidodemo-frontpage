///javascript
//#***********************************************
//#
//#      Filename: src/utils/clientData/sessionStorage.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: sessionStorage类
//#        Create: 2020-07-27 11:05:35
//# Last Modified: 2020-07-27 11:05:35
//#***********************************************
import Store from "./store.js";
export default class Session extends Store {
  /**
   * 构造函数
   */
  constructor() {
    super();
    if (!window.sessionStorage) {
      throw new Error("当前浏览器不支持sessionStorage");
    }
  }
  /**
   * 根据key获取sessionStorage中的项目
   * @param {string} key
   * @return {stirng|object|null} 不存在返回null
   */
  getItem(key) {
    let item = window.sessionStorage.getItem(key);
    if (
      item &&
      ((item.startsWith("{") && item.endsWith("}")) ||
        (item.startsWith("[") && item.endsWith("]")))
    ) {
      try {
        item = JSON.parse(item);
      } catch (e) {
        return item;
      }
    }
    return item;
  }
  /**
   * 设置sessionStorage中的项目
   * @param {string} key
   * @param {string|JSON} value
   * @return void
   */
  setItem(key, value) {
    //判断value是字符串还是对象
    if (typeof value === "string") {
      window.sessionStorage.setItem(key, value);
    } else {
      const item = JSON.stringify(value);
      window.sessionStorage.setItem(key, item);
    }
  }
  /**
   * 移除key对应的项目
   * @param {string} key
   * @return void
   */
  removeItem(key) {
    window.sessionStorage.removeItem(key);
  }
  /**
   * 移除loaalStorage中的所有项目
   * @return void
   */
  clear() {
    window.sessionStorage.clear();
  }
  /**
   * 获取sessionStorage中的所有项目
   * @return array
   */
  getAll() {
    let arr = new Array();
    for (let i = 0, j = this.length(); i < j; i++) {
      let getKey = this.key(i);
      let getVal = this.getItem(getKey);
      arr[i] = {
        key: getKey,
        value: getVal
      };
    }
    return arr;
  }
  /**
   * 获取sessionStorage第n个项目的key
   * @param {int} n
   * @return {string}
   */
  key(n) {
    return window.sessionStorage.key(n);
  }
  /**
   * 获取sessionStorage中的项目个数
   * @return {int}
   */
  length() {
    return window.sessionStorage.length;
  }
  /**
   * 判断sessionStorage中key对应的项目是否存在
   * @param {string} key
   * @return {bool} true存在|false不存在
   */
  has(key) {
    return this.getItem(key) !== null ? true : false;
  }
  /**
   * 遍历sessionStorage项目
   * @param {function} cb 回调函数
   * @return void
   */
  forEach(cb) {
    for (let i = 0, j = this.length(); i < j; i++) {
      cb(this.getItem(this.key(i)));
    }
  }
  /**
   * 删除所有过期的项目
   * @return void
   */
  deleteAllExpires() {
    for (let i = 0, j = this.length(); i < j; i++) {
      let getKey = this.key(i);
      let getVal = this.getItem(getKey);
      if (getVal !== null && new Date().getTime() > getVal.expires) {
        this.removeItem(getKey);
      }
    }
  }
  /**
   * 获取浏览器sessionStorage最大可用空间
   * @return void 结果在console中显示
   */
  getMaxSpace() {
    let test = "0123456789";
    const add = function(num) {
      num += num;
      if (num.length == 10240) {
        test = num;
        return;
      }
      add(num);
    };
    add(test);
    let sum = test;
    const show = setInterval(() => {
      sum += test;
      try {
        window.sessionStorage.removeItem("test");
        window.sessionStorage.setItem("test", sum);
        console.log(sum.length / 1024 + "KB");
      } catch (e) {
        console.log(sum.length / 1024 + "KB超出最大限制");
        clearInterval(show);
      }
    }, 0.1);
  }
  /**
   * 获取浏览器中sessionStorage已用空间
   * @return void 结果在console中显示
   */
  getUsedSpace() {
    let size = 0;
    for (let item in window.sessionStorage) {
      if (window.sessionStorage.hasOwnProperty(item)) {
        size += window.sessionStorage.getItem(item).length;
      }
    }
    console.log(
      "当前sessionStorage使用容量为" + (size / 1024).toFixed(2) + "KB"
    );
  }
}
