/*
 * 系统常量定义
 */
//系统api接口的ip地址和端口
let apiUrl =
  process.env.NODE_ENV === "development"
    ? "http://192.168.1.3:8081"
    : "http://192.168.1.3:8080";
const VUE_APP_API_URL = apiUrl;
const VUE_APP_AMAP_KEY = "c20b73f52f1fdeb302d33145a17b4e0c";
//高德地图应用的key
export { VUE_APP_API_URL, VUE_APP_AMAP_KEY };
