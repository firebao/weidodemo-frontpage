///javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/src/utils/request/requestTypes.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: 使用常量代替API名称
//#        Create: 2020-07-15 17:06:50
//# Last Modified: 2020-07-15 17:06:50
//#***********************************************

export const SEND_CMS_CODE = "sendCmsCode"; //发送短信验证码
export const LOGIN = "login"; //用户登录(手机+密码)
export const LOGIN_MOBILE = "loginMobile"; //用户登录(手机+验证码)
export const GET_NAV = "getNav"; //获取主导航信息
export const GET_FOOTER_INFO = "getFooterInfo"; //获取页脚信息
export const GET_CATEGORY = "getCategory"; //获取商品分类信息
export const GET_CITY_LIST = "getCityList"; //获取城市列表信息

export default {
  SEND_CMS_CODE,
  LOGIN,
  LOGIN_MOBILE,
  GET_NAV,
  GET_FOOTER_INFO,
  GET_CATEGORY,
  GET_CITY_LIST
};
