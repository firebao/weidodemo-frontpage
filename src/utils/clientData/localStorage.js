///javascript
//#***********************************************
//#
//#      Filename: src/utils/clientData/localStorage.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: localStorage类
//#        Create: 2020-07-27 11:05:35
//# Last Modified: 2020-07-27 11:05:35
//#***********************************************
import Store from "./store.js";
export default class Local extends Store {
  /**
   * 构造函数
   */
  constructor() {
    super();
    if (!window.localStorage) {
      throw new Error("当前浏览器不支持localStorage");
    }
  }
  /**
   * 根据key获取localStorage中的项目
   * @param {string} key
   * @return {stirng|JSON|null} 不存在返回null
   */
  getItem(key) {
    let item = window.localStorage.getItem(key);
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
   * 设置localStorage中的项目
   * @param {string} key
   * @param {string|object} value
   * @param {string|number|Date} expires
   * @example
   *  setItem("a", "1") value为string
   *  setItem("a", { x: 1, y: 2}) value为对象
   *  setItem("a", "1", -1) 永久有效期
   *  setItem("a", "1", Infinity) 永久有效期
   *  setItem("a", "1", 1000000) 1000秒内有效
   *  setItem("a", "1", "1000000") 1000秒内有效
   *  setItem("a", "1", "1y") 1年内有效
   *  setItem("a", "1", "2m") 2月内有效
   *  setItem("a", "1", "10d") 10天内有效
   *  setItem("a", "1", "1h") 1小时内有效
   *  setItem("a", "1", "1min") 1分钟内有效
   *  setItem("a", "1", "6s") 6秒内有效
   *  setItem("a", "1", new Date("October 13, 2020 11:13:00")) 指定时间内有效
   * @return void
   */
  setItem(key, value, expires) {
    if (expires) {
      let item = {};
      switch (expires.constructor) {
        case Number:
          if (expires === Infinity || expires === -1) {
            expires = new Date(9999, 11, 31, 23, 59, 59).getTime();
          } else {
            expires = new Date().getTime() + expires;
          }
          break;
        case String:
          if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expires)) {
            let _expires = expires.replace(
              /^(\d{1,})(?:y|m|d|h|min|s)$/i,
              "$1"
            );
            switch (
              expires
                .replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, "$1")
                .toLowerCase()
            ) {
              case "y":
                expires = new Date().getTime() + _expires * 31104000000;
                break;
              case "m":
                expires = new Date().getTime() + _expires * 2592000000;
                break;
              case "d":
                expires = new Date().getTime() + _expires * 86400000;
                break;
              case "h":
                expires = new Date().getTime() + _expires * 3600000;
                break;
              case "min":
                expires = new Date().getTime() + _expires * 60000;
                break;
              case "s":
                expires = new Date().getTime() + _expires * 1000;
                break;
              default:
                throw new Error(
                  "localStorage setItem String y|m|d...类型判断错误"
                );
            }
          } else {
            expires = new Date().getTime() + parseInt(expires);
          }
          break;
        case Date:
          expires = expires.getTime();
          break;
      }
      item.expires = expires;
      if (typeof value === "string") {
        item.value = value;
      } else {
        item = Object.assign(value, item);
      }
      window.localStorage.setItem(key, JSON.stringify(item));
    } else {
      //判断value是字符串还是对象
      if (typeof value === "string") {
        window.localStorage.setItem(key, value);
      } else {
        const item = JSON.stringify(value);
        window.localStorage.setItem(key, item);
      }
    }
  }
  /**
   * 移除key对应的项目
   * @param {string} key
   * @return void
   */
  removeItem(key) {
    window.localStorage.removeItem(key);
  }
  /**
   * 移除loaalStorage中的所有项目
   * @return void
   */
  clear() {
    window.localStorage.clear();
  }
  /**
   * 获取localStorage中的所有项目
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
   * 获取localStorage第n个项目的key
   * @param {int} n
   * @return {string}
   */
  key(n) {
    return window.localStorage.key(n);
  }
  /**
   * 获取localStorage中的项目个数
   * @return {int}
   */
  length() {
    return window.localStorage.length;
  }
  /**
   * 判断localStorage中key对应的项目是否存在
   * @param {string} key
   * @return {bool} true存在|false不存在
   */
  has(key) {
    return this.getItem(key) !== null ? true : false;
  }
  /**
   * 遍历localStorage项目
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
   * 获取浏览器localStorage最大可用空间
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
        window.localStorage.removeItem("test");
        window.localStorage.setItem("test", sum);
        console.log(sum.length / 1024 + "KB");
      } catch (e) {
        console.log(sum.length / 1024 + "KB超出最大限制");
        clearInterval(show);
      }
    }, 0.1);
  }
  /**
   * 获取浏览器中localStorage已用空间
   * @return void 结果在console中显示
   */
  getUsedSpace() {
    let size = 0;
    for (let item in window.localStorage) {
      if (window.localStorage.hasOwnProperty(item)) {
        size += window.localStorage.getItem(item).length;
      }
    }
    console.log("当前localStorage使用容量为" + (size / 1024).toFixed(2) + "KB");
  }
}
