//载入Cookie对象和getUserInfo api函数
import Cookie from "@/utils/clientData/cookie";
import Http from "@/utils/request";
//使用常量替代Mutation事件类型
import {
  LOGIN,
  LOGOUT,
  UPDATE_USERINFO,
  USERINFO
} from "@/store/motationTypes";
//载入i-view Message组件
import { Message } from "view-design";

//用户模块state
const state = {
  //登录鉴权凭据
  token: Cookie.get("login_status") || null,
  //用户信息
  userInfo: null
};

//用户模块mutations
const mutations = {
  //用户登入
  [LOGIN](state, object) {
    state.token = object.token;
    Cookie.set("login_status", object.token, object.expiresTime);
  },
  //用户登出
  [LOGOUT](state) {
    state.token = undefined;
    Cookie.remove("login_status");
  },
  //更新用户信息
  [UPDATE_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  }
};

//用户模块actions
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
        Message.error("获取信息失!");
      });
    }
  }
};

//导出用户模块
export default {
  state,
  mutations,
  actions
};
