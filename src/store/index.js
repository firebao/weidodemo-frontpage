//载入vue框架、vuex核心插件
import Vue from "vue";
import Vuex from "vuex";
//载入getters和modules
import modules from "./modules";
import getters from "./getters";

//安装vuex插件
Vue.use(Vuex);

//创建并导出vuex实例对象
export default new Vuex.Store({
  modules,
  getters,
  strict: process.env.NODE_ENV !== "production"
});
