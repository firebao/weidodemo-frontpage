export default [
  //用户中心
  {
    path: "/user",
    name: "User",
    meta: {
      title: "用户中心",
      keepAlive: true,
      auth: true
    },
    component: () => import("@/page/user/User")
  },
  //用户登录
  {
    path: "/user/login",
    name: "UserLogin",
    meta: {
      title: "用户登录",
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "@/page/user/Login.vue")
  }
];
