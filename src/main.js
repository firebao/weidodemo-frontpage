///javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/src/main.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: vue main.js
//#        Create: 2020-07-15 15:38:34
//# Last Modified: 2020-07-15 15:38:34
//#***********************************************
//载入Vue框架、Vue Router、Vuex核心插件实例对象
import Vue from "vue";
import router from "./router";
import store from "./store";
//载入App.vue模块
import App from "./App";
//载入async-validator模块
import Schema from "async-validator";
//载入icons
import "@/icons";
//载入自定义组件IconSvg
import IconSvg from "@/components/IconSvg";
//载入axios的封装模块request
import Http from "@/utils/request/request";
//载入iView中Input，Rate组件以及iView的css
import { Input, Rate } from "view-design";
import "view-design/dist/styles/iview.css";
//载入Animate.css动画库
import Animated from "animate.css";
//载入vue-lazyload图片懒加载插件
import VueLazyLoad from "vue-lazyload";
//载入vue-infinite-scroll无限滚动插件
import VueInfiniteScroll from "vue-infinite-scroll";
//载入Normalize.css
import "normalize.css";
//载入common.scss
import "@/assets/css/common.scss";
//Vue全局配置
//阻止vue在启动时生成生产提示
Vue.config.productionTip = false;
//生产模式下取消所有日志和警告
Vue.config.silent = process.env.NODE_ENV === "production" ? true : false;
//浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和
//打补丁的性能追踪
Vue.config.performance = true;

//安装插件
//安装animate.css
Vue.use(Animated);
//安装vue-lazyload
Vue.use(VueLazyLoad);
//安装vue-infinite-scroll
Vue.use(VueInfiniteScroll);
//将async-validator的实例注册为vue的原型属性$validator
Vue.prototype.$validator = function(rule) {
  return new Schema(rule);
};
//将axios封装对象注册为vue的原型属性$Http
Vue.prototype.$Http = Http;

//全局注册组件自定义IconSvg组件，i-view的input、rate组件
Vue.component("icon-svg", IconSvg);
Vue.component("i-input", Input);
Vue.component("i-rate", Rate);

//创建vue实例
const vm = new Vue({
  router,
  store,
  render: h => h(App)
});

//挂载实例
setTimeout(() => {
  vm.$mount("#app");
});
