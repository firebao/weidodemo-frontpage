//cookie管理对象
//参考vue-cookie插件
//https://www.jianshu.com/p/8deae75624eb

//根据key获取cookie
function get(key) {
  let value =
    decodeURIComponent(
      document.cookie.replace(
        //user\\-name  =   John Smith; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";
        new RegExp(
          //匹配到的 ^abcde 或 abcde;
          "(?:(?:^|.*;)\\s*" +
            //匹配到key中的-+.* 转义为\\- \\+ \\. \\*
            encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") +
            "\\s*\\=\\s*([^;]*).*$)|^.*$"
        ),
        "$1"
      )
    ) || null;
  //cookie中存的是JSON对象
  if (value && value.startsWith("{") && value.endsWith("}")) {
    try {
      value = JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  return value;
}

//设置cookie
function set(key, value, expireTime, path, domain, secure) {
  //key不能为空
  if (!key) {
    throw new Error("cookie名称不能为空");
    //key不能与cookie中的expires|max-age|path|domain|secure同名
  } else if (/^(?:expires|max-age|path|domain|secure)$/i.test(key)) {
    throw new Error(
      "cookie名称不能是expires|max-age|path|domain|secure,不区分大小写"
    );
  }
  //支持JSON对象
  if (value && value.constructor === Object) {
    value = JSON.stringify(value);
  }
  //默认有效期为1天
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
    }
  }
  document.cookie = `${encodeURIComponent(key)} = ${encodeURIComponent(
    value
  )}${_expires}${domain ? ";domain=" + domain : ""}${
    path ? ";path=" + path : ";path=/"
  }${secure ? ";secure" : ""}`;
}

//移除cookie
function remove(key, path, domain) {
  if (!key || !isKey(key)) {
    return false;
  }
  document.cookie =
    encodeURIComponent(key) +
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
    (domain ? "; domain=" + domain : "") +
    (path ? "; path=" + path : "; path=/");
}

//检查cookie是否存在
function isKey(key) {
  return new RegExp(
    "(?:^|;\\s*)" +
      encodeURIComponent(key).replace(/[-.+*]/g, "\\$&") +
      "\\s*\\="
  ).test(document.cookie);
}

//获取所有cookie
function keys() {
  if (!document.cookie) {
    return [];
  }
  var _keys = document.cookie
    .replace(/((?:^|\s*;)[^=]+)(?=;|$)|^\s*|\s*(?:=[^;]*)?(?:\1|$)/g, "")
    .split(/\s*(?:=[^;]*)?;\s*/);
  for (let _index = 0; _index < _keys.length; _index++) {
    _keys[_index] = decodeURIComponent(_keys[_index]);
  }
  return _keys;
}

export default {
  get,
  set,
  remove,
  keys,
  isKey
};
