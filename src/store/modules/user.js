///javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/src/store/modules/user.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: user模块
//#        Create: 2020-07-14 16:23:41
//# Last Modified: 2020-07-14 16:23:41
//#***********************************************

import Cookie from "@/utils/clientData/cookie";
import Http from "@/utils/request/request";
import { Message } from "view-design";
import {
  LOGIN,
  LOGOUT,
  UPDATE_USERINFO,
  USERINFO,
  UPDATE_LOCATIONINFO,
  SET_MOBILE_STATE,
  SET_SEND_CODE_STATE
} from "@/store/mutationTypes";

//state
const state = {
  //用户登录服务端返回的JWT Token
  token: Cookie.get("login_status") || null,
  //用户信息
  userInfo: null,
  //用户所在城市信息
  locationInfo: null,
  //手机+验证码登录页面发送验证码前滑块验证的验证状态
  mobileValidateState: false,
  //手机验证码发送状态
  sendCodeState: "disabled"
};

//mutations
const mutations = {
  //用户登入
  [LOGIN](state, payload) {
    state.token = payload.token;
    Cookie.set("login_status", payload.token, payload.expiresTime);
  },
  //用户登出
  [LOGOUT](state) {
    state.token = null;
    Cookie.remove("login_status");
  },
  //更新用户信息
  [UPDATE_USERINFO](state, payload) {
    state.userInfo = payload.userInfo;
  },
  //更新用户位置信息
  [UPDATE_LOCATIONINFO](state, payload) {
    state.locationInfo = payload.locationInfo;
  },
  //手机验证码发送状态
  [SET_MOBILE_STATE](state, payload) {
    state.mobileValidateState = payload;
  },
  [SET_SEND_CODE_STATE](state, payload) {
    if (["verifySuccess"].indexOf(payload) >= 0) {
      state.sendCodeState = payload;
    }
  }
};

//actions
const actions = {
  [USERINFO]({ state, commit }, force) {
    if (state.userInfo !== null && !force) {
      return Promise.resolve(state.userInfo);
    } else {
      return new Promise(resolve => {
        Http.getUserInfo.then(res => {
          commit([UPDATE_USERINFO], res.data);
          resolve(res.data);
        });
      }).catch(() => {
        Message.error("获取信息失败!");
      });
    }
  }
};

//导出用户模块
export default {
  //带命名空间的模块
  namespaced: true,
  state,
  mutations,
  actions
};
