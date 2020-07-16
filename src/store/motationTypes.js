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

export default {
  LOGIN,
  LOGOUT,
  UPDATE_USERINFO,
  USERINFO,
  UPDATE_LOCATIONINFO
};
