///javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/src/utils/request/modules/user.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: user api 模块
//#                method   axios的请求方法
//#                url      axios的url
//#                options  axios的config
//#                options.loading axios请求期间是否显示loading提示框
//#                options.errorTips axiox请求失败是否显示错误提示框
//#                options.successTips axiox请求成功是否显示成功提示框
//#                options.needAuth axios请求需要authorization
//#        Create: 2020-07-15 14:36:49
//# Last Modified: 2020-07-15 14:36:49
//#***********************************************
import { SEND_CMS_CODE, LOGIN, LOGIN_MOBILE } from "../requestTypes";

const USER = {
  [SEND_CMS_CODE]: {
    method: "post",
    url: "/api/user/sendCmsCode"
  },
  [LOGIN]: {
    method: "post",
    url: "/api/login"
  },
  [LOGIN_MOBILE]: {
    method: "post",
    url: "/api/login-mobile"
  }
};
export default USER;
