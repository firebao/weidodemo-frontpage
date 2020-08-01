///javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/src/store/modules/login.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: user模块
//#        Create: 2020-07-14 14:53:20
//# Last Modified: 2020-07-14 14:53:20
//#***********************************************
import ClientData from "@/utils/clientData/clientData";
import { LOGIN, LOGOUT, UPDATE_USERINFO } from "../mutationTypes";

const LOGIN_TOKEN = "login_token";
const clientData = ClientData.getStorage();

//state
const state = {
  //手机+验证码登录页面发送验证码前滑块验证的验证状态
  mobileValidateState: false,
  //手机验证码发送状态
  sendCodeState: "disabled",
  //登录后服务端返回的JWT Token
  token: clientData.getItem(LOGIN_TOKEN) || null,
  //当前用户信息
  userInfo: null
};

//mutations
const mutations = {
  setMobileState(state, payload) {
    state.mobileValidateState = payload;
  },
  setSendCodeState(state, payload) {
    if (["verifySuccess"].indexOf(payload) >= 0) {
      state.sendCodeState = payload;
    }
  },
  [LOGIN](state, payload) {
    state.token = payload.token;
    clientData.setItem(LOGIN_TOKEN, payload.token, payload.expiresTime);
  },
  [LOGOUT](state) {
    state.token = null;
    clientData.removeItem(LOGIN_TOKEN);
  },
  [UPDATE_USERINFO](state, payload) {
    state.userInfo = payload.userInfo;
  }
};

export default {
  //带命名空间的模块
  namespaced: true,
  state,
  mutations
};
