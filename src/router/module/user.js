export default [
  //用户中心
  {
    path: "/user",
    name: "User",
    meta: {
      title: "用户中心",
      keepAlive: true
      //auth: true
    },
    component: () => import("@/page/user/User"),
    children: [
      //用户中心主页
      {
        path: "",
        component: () => import("@/page/user/Index")
      },
      //个人信息
      {
        path: "userinfo",
        component: () => import("@/page/user/UserInfo")
      },
      //账号安全
      {
        path: "account-security",
        component: () => import("@/page/user/AccountSecurity")
      },
      {
        path: "tastes",
        component: () => import("@/page/user/Tastes")
      }
    ]
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
  },
  {
    path: "/user/register",
    name: "UserRegister",
    meta: {
      title: "用户注册",
      keepAlive: true
    },
    component: () => import("@/page/user/Register")
  }
];
