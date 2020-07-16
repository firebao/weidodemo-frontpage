//javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/src/store/index.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: 组装并导出store对象
//#        Create: 2020-07-14 14:26:45
//# Last Modified: 2020-07-14 14:26:45
//#***********************************************
//
//载入vue框架、vuex核心插件
import Vue from "vue";
import Vuex from "vuex";

//载入根级别的getters、actions、mutations以及模块modules
import modules from "./modules";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

//安装vuex插件
Vue.use(Vuex);

//创建并导出vuex实例对象
export default new Vuex.Store({
  //开发环境采用严格模式,保证state状态改变只能有mutations引起
  strict: process.env.NODE_ENV !== "production",
  modules,
  getters,
  actions,
  mutations
});
