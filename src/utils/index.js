//javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/src/utils/index.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: 系统常量定义
//#        Create: 2020-07-09 17:27:04
//# Last Modified: 2020-07-09 17:27:04
//#***********************************************

let apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://192.168.1.5"
    : "http://192.168.1.5";
const VUE_APP_API_URL = apiUrl;
//高德地图应用的key
const VUE_APP_AMAP_KEY = "c20b73f52f1fdeb302d33145a17b4e0c";
export { VUE_APP_API_URL, VUE_APP_AMAP_KEY };
