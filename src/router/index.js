//载入Vue框架、Vue-Router核心插件以及Vuex
import Vue from "vue";
import VueRouter from "vue-router";
import $store from "@/store";

//载入视图组件，除去此处载入的视图组件，其余视图组件采用路由懒加载
import Home from "@/page/Home";
import Shop from "@/page/Shop";
import Cookbook from "@/page/Cookbook";
import Community from "@/page/Community";
import Join from "@/page/Join";
import Download from "@/page/Download";
import Location from "@/page/Location";
import Loading from "@/page/Loading";
import NotFound from "@/page/NotFound";

//载入toLogin函数
import toLogin from "@/libs/login";

//载入module中定义的路由
import Module from "./module";

Vue.use(VueRouter);

//创建router实例
const router = new VueRouter({
  //vue-router采用HTML5 History模式
  mode: "history",
  //路由定义
  routes: [
    //首页
    {
      path: "/",
      name: "Home",
      //路由元数据
      meta: {
        title: "首页",
        keepAlive: true
      },
      component: Home
    },
    //购物
    {
      path: "/shop",
      name: "Shop",
      meta: {
        title: "购物",
        keepAlive: true
      },
      component: Shop
    },
    //菜谱
    {
      path: "/cookbook",
      name: "Cookbook",
      meta: {
        title: "菜谱",
        keepAlive: true
      },
      component: Cookbook
    },
    //社区
    {
      path: "/community",
      name: "Community",
      meta: {
        title: "社区",
        keepAlive: true
      },
      component: Community
    },
    //入驻加盟
    {
      path: "/join",
      name: "Join",
      meta: {
        title: "入驻加盟",
        keepAlive: true
      },
      component: Join
    },
    //下载手机版
    {
      path: "/download",
      name: "Download",
      meta: {
        title: "下载手机版",
        keepAlive: true
      },
      component: Download
    },
    //地理位置
    {
      path: "/location",
      name: "Location",
      meta: {
        title: "地理位置",
        keepAlive: true
      },
      component: Location
    },
    //加载Modelu中定义的路由
    ...Module,
    //加载中页面
    {
      path: "/auth/:url",
      name: "Loading",
      meta: {
        title: "加载中",
        keepAlive: true
      },
      component: Loading
    },
    //404 Not Found页面
    {
      path: "*",
      name: "NotFound",
      meta: {
        title: "找不到页面",
        keepAlive: true
      },
      component: NotFound
    },
    ...Module
  ]
});

//创建路由的全局前置守卫
router.beforeEach((to, from, next) => {
  //获取路由中的元数据信息
  const { title, auth } = to.meta;
  //判断路由是否需要登录权限以及用户是否为登录状态
  if (auth === true && !$store.state.app.token) {
    return toLogin(true, to.fullPath);
  }
  //控制页面title
  document.title = title || "weibo";
  //更新vuex中userinfo
  if (auth) {
    $store.dispatch("USERINFO").then(() => {
      next();
    });
  } else {
    //确保要调用next方法，否则钩子就不会被resolved
    next();
  }
});

//导出模块
export default router;
