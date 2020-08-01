///javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/src/store/motationTypes.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: 使用常量替代mutation事件类型
//#        Create: 2020-07-14 14:45:18
//# Last Modified: 2020-07-14 14:45:18
//#***********************************************
//登录后往state中写入token
export const LOGIN = "LOGIN";
//登出后删除state中的token
export const LOGOUT = "LOGOUT";
//更新用户信息
export const UPDATE_USERINFO = "UPDATE_USERINFO";
export const USERINFO = "USERINFO";
export const UPDATE_LOCATIONINFO = "UPDATE_LOCATIONINFO";
//更新主页菜单激活信息
export const SET_ACTIVE_CATEGORY = "SET_ACTIVE_CATEGORY";
//取消主页菜单激活信息
export const CANCEL_ACTIVE_CATEGORY = "CANCEL_ACTIVE_CATEGORY";
export const SET_MOBILE_STATE = "SET_MOBILE_STATE";
export const SET_SEND_CODE_STATE = "SET_SEND_CODE_STATE";

export default {
  LOGIN,
  LOGOUT,
  UPDATE_USERINFO,
  USERINFO,
  UPDATE_LOCATIONINFO,
  SET_ACTIVE_CATEGORY,
  CANCEL_ACTIVE_CATEGORY,
  SET_MOBILE_STATE,
  SET_SEND_CODE_STATE
};
