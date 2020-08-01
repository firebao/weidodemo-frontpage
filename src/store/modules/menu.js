///javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/src/store/modules/login.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: menu模块
//#        Create: 2020-07-14 14:53:20
//# Last Modified: 2020-07-14 14:53:20
//#***********************************************
import { SET_ACTIVE_CATEGORY, CANCEL_ACTIVE_CATEGORY } from "../mutationTypes";

const state = {
  mainMenuActive: false,
  activeCategory: ""
};

const mutations = {
  [SET_ACTIVE_CATEGORY](state, payload) {
    state.activeCategory = payload.category;
    state.mainMenuActive = true;
  },
  [CANCEL_ACTIVE_CATEGORY](state) {
    state.activeCategory = "";
    state.mainMenuActive = false;
  }
};
export default {
  //带命名空间的模块
  namespaced: true,
  state,
  mutations
};
