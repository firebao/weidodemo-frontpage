const USER_API = {
  //发送短信验证码
  sendCmsCode: {
    method: "post",
    url: "/api/user/sendCmsCode"
  },
  //用户登录
  doLogin: {
    method: "post",
    url: "/api/user/doLogin"
  },
  //获取主导航信息
  getNav: {
    method: "get",
    url: "/api/common/getNav"
  },
  //获取页脚信息
  getFooterInfo: {
    method: "get",
    url: "/api/common/getFooterInfo"
  },
  //获取商品分类信息
  getCategory: {
    method: "get",
    url: "/api/common/getCategory"
  },
  //获取城市列表信息
  getCityList: {
    method: "get",
    url: "/api/common/getCityList"
  }
};
export default USER_API;
