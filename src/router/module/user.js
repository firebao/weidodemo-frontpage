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
      //我的口味
      {
        path: "tastes",
        component: () => import("@/page/user/Tastes")
      },
      //我的地址
      {
        path: "address",
        component: () => import("@/page/user/Address")
      },
      //邮件订阅
      {
        path: "subscription",
        component: () => import("@/page/user/Subscription")
      },
      //账号绑定
      {
        path: "bind",
        component: () => import("@/page/user/Bind")
      },
      //分享绑定
      {
        path: "share",
        component: () => import("@/page/user/Share")
      },
      //营养档案
      {
        path: "record",
        component: () => import("@/page/user/Record")
      },
      //企业发票
      {
        path: "invoice",
        component: () => import("@/page/user/Invoice")
      },
      //我的订单
      {
        path: "order",
        component: () => import("@/page/user/Order")
      },
      //评价晒单
      {
        path: "appraise",
        component: () => import("@/page/user/Appraise")
      },
      //我的红包
      {
        path: "redpackets",
        component: () => import("@/page/user/Redpackets")
      },
      //我的金币
      {
        path: "coin",
        component: () => import("@/page/user/Coin")
      },
      //我的积分
      {
        path: "points",
        component: () => import("@/page/user/Points")
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
