///javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/src/utils/request/modules/website.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: website API 模块
//#                method   axios的请求方法
//#                url      axios的url
//#                options  axios的config
//#                options.loading axios请求期间是否显示loading提示框
//#                options.errorTips axiox请求失败是否显示错误提示框
//#                options.successTips axiox请求成功是否显示成功提示框
//#                options.needAuth axios请求需要authorization
//#        Create: 2020-07-15 14:41:27
//# Last Modified: 2020-07-15 14:41:27
//#***********************************************
import {
  GET_NAV,
  GET_FOOTER_INFO,
  GET_CATEGORY,
  GET_CITY_LIST
} from "../requestTypes";

const WEBSITE = {
  [GET_NAV]: {
    method: "get",
    url: "/api/common/getNav"
  },
  [GET_FOOTER_INFO]: {
    method: "get",
    url: "/api/common/getFooterInfo"
  },
  [GET_CATEGORY]: {
    method: "get",
    url: "/api/common/getCategory"
  },
  [GET_CITY_LIST]: {
    method: "get",
    url: "/api/common/getCityList"
  }
};

export default WEBSITE;
