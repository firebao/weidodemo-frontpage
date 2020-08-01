///javascript
//#***********************************************
//#
//#      Filename: src/utils/clientData/cookie.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: cookie类
//#        Create: 2020-07-29 18:17:16
//# Last Modified: 2020-07-29 18:17:16
//#***********************************************

import Store from "./store.js";

export default class Cookie extends Store {
  /**
   * 构造函数
   */
  constructor() {
    super();
  }
  /**
   * 根据key获取cookie中的项目
   * @param {string} key
   * @return {string|object|null}
   */
  getItem(key) {
    let value =
      decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      ) || null;
    if (value && value.startsWith("{") && value.endsWith("}")) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        return value;
      }
    }
    return value;
  }
  /**
   * 设置cookie项目
   * @param {string} key
   * @param {string|object} value
   * @param {number|string|Date} expireTime 有效时间
   * @param {string} path 保存路径
   * @param {string} domain 有效域名
   * @param {string} secure 有效域名
   * @return void
   */
  setItem(key, value, expireTime, path, domain, secure) {
    if (!key) {
      throw new Error("cookie名称不能为空");
      //key不能与cookie中的expires|max-age|path|domain|secure同名
    } else if (/^(?:expires|max-age|path|domain|secure)$/i.test(key)) {
      throw new Error(
        "cookie名称不能是expires|max-age|path|domain|secure,不区分大小写"
      );
    }
    if (value && value.constructor === Object) {
      value = JSON.stringify(value);
    }
    let _expires = "; max-age=86400";
    if (expireTime) {
      switch (expireTime.constructor) {
        case Number:
          if (expireTime === Infinity || expireTime === -1) {
            _expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
          } else {
            _expires = `; max-age=${expireTime}`;
          }
          break;
        case String:
          if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expireTime)) {
            let _expireTime = expireTime.replace(
              /^(\d{1,})(?:y|m|d|h|min|s)$/i,
              "$1"
            );
            switch (
              expireTime
                .replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, "$1")
                .toLowerCase()
            ) {
              case "m":
                _expires = `; max-age=${_expireTime * 2592000}`;
                break;
              case "d":
                _expires = `; max-age=${_expireTime * 86400}`;
                break;
              case "h":
                _expires = `; max-age=${_expireTime * 3600}`;
                break;
              case "min":
                _expires = `; max-age=${_expireTime * 60}`;
                break;
              case "s":
                _expires = `; max-age=${_expireTime}`;
                break;
              case "y":
                _expires = `; max-age=${_expireTime * 31104000}`;
                break;
              default:
                new Error("字符串超出选项范围，请选择y|m|d|h|min|s其中之一");
            }
          } else {
            _expires = `; expires=${expireTime.toUTCString()}`;
          }
          break;
        case Date:
      }
    }
    document.cookie = `${encodeURIComponent(key)} = ${encodeURIComponent(
      value
    )}${_expires}${domain ? "; domain=" + domain : ""}${
      path ? "; path=" + path : "; path=/"
    }${secure ? "; secure" : ""}`;
  }
  /**
   * 移除key对应的项目
   * @param {string} key
   * @param {string} path
   * @param {string} domain
   * @return {bool} true移除成功|false移除失败
   */
  removeItem(key, path, domain) {
    if (!key || !this.has(key)) {
      return false;
    }
    document.cookie =
      encodeURIComponent(key) +
      "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
      (domain ? "; domain=" + domain : "") +
      (path ? "; path=" + path : "; path=/");
    return true;
  }
  /**
   * 获取全部的cookie项目
   * @retur {array}
   */
  getAll() {
    if (!document.cookie) {
      return [];
    }
    let items = document.cookie.split(/\s*;\s*/);
    //cookie中最后一个;号让items多出一个空数组项
    //items.pop();
    let array = new Array();
    for (let i = 0, j = items.length; i < j; i++) {
      let keyValue = items[i].split(/\s*=\s*/);
      array[i] = {
        key: decodeURIComponent(keyValue[0]),
        value: keyValue[1]
      };
    }
    return array;
  }
  /**
   * 获取cookie中第n个项目的key
   * @param {int} n
   * @return {string}
   */
  key(n) {
    let items = this.getAll();
    return items[n].key;
  }
  /**
   * 获取cookie中的项目个数
   * @return {int}
   */
  length() {
    return this.getAll().length;
  }
  /**
   * 判断cookie中key对应的项目是否存在
   * @param {string} key
   * @return {bool} true存在|false不存在
   */
  has(key) {
    return new RegExp(
      "(?:^|;\\s*)" +
        encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") +
        "\\s*\\="
    ).test(document.cookie);
  }
  /**
   * 遍历cookie中的项目
   * @param {function} cb 回调函数
   * @return void
   */
  forEach(cb) {
    let items = this.getAll();
    for (let i = 0, j = items.length; i < j; i++) {
      cb(items[i].value);
    }
  }
  /**
   * 删除所有过期项目
   * @throw Error
   */
  deleteAllExpires() {
    throw new Error("浏览器会自动删除过期项目");
  }
  /**
   * 测试浏览器cookie最大个数和包含的最多内容
   * @return void
   */
  getMaxSpace() {}
  /**
   * 测试浏览器cookie的已用空间
   * @return void
   */
  getUsedSpace() {}
  /**
   * 清除所有cookie项目
   */
  clear() {
    let cookies = document.cookie.split(";");
    //循环每一个数组项，把expires设置为过去时间，这样很容易地消除了所有Cookie
    for (let i = 0, j = cookies.length; i < j; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      name = name.replace(/^\s*|\s*$/, "");
      document.cookie =
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
  }
}
