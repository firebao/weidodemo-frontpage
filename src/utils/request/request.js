///javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/src/utils/request/index.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: axios封装
//#        Create: 2020-07-15 14:34:34
//# Last Modified: 2020-07-15 14:34:34
//#***********************************************
import axios from "axios";
import API from "./modules";
import Store from "@/store";
import Qs from "qs";
import { VUE_APP_API_URL } from "../index";
import { Message } from "view-design";
import router from "@/router";

const instance = axios.create({
  baseURL: VUE_APP_API_URL,
  timeOut: 1000,
  paramsSerializer: function(params) {
    return Qs.stringify(params, { arrayFormat: "brackets" });
  }
});

const Http = {};
const defaultOptions = {
  needAuth: false,
  loading: false,
  errorTips: false,
  successTips: false
};

//遍历API对象
for (let key in API) {
  const api = API[key];
  Http[key] = function(params, isFormData = false, config = {}) {
    let newParams = {};

    //请求需要FormData对象包含请求参数
    if (params && isFormData) {
      newParams = new FormData();
      for (let i in params) {
        newParams.append(i, params[i]);
      }
    } else {
      newParams = params;
    }
    //默认配置与api中的配置合并
    const options = Object.assign(defaultOptions, api.options);
    //需要鉴权的请求
    if (options.needAuth) {
      const token = Store.state.user.token;
      //没有登录获得token,转到登录页面
      if (!token) {
        router.replace({ path: "/login" });
        return Promise.reject({ msg: "未登录", needAuth: true });
      }
      let authorization = {
        Bearer: token
      };
      instance.defaults.auth = authorization;
    }
    //配置参数合并
    config = Object.assign(options, config);

    //请求方法为put、post、patch时newParams为请求体的data
    //其余方法newParams为与请求一起发送的URL参数
    if (["put", "post", "patch"].indexOf(api.method) >= 0) {
      return instance[api.method](api.url, newParams, config);
    } else {
      instance.defaults.params = newParams;
      return instance[api.method](api.url, config);
    }
  };
}

//设置请求拦截器
instance.interceptors.request.use(
  config => {
    //显示加载中提示框
    if (config.loading) {
      Message.loading({
        content: "加载中，请稍候",
        duration: 0
      });
    }
    return config;
  },
  error => {
    Message.destroy();
    return Promise.reject(error);
  }
);
//设置响应拦截器
instance.interceptors.response.use(
  res => {
    Message.destroy();
    if (res.data.status === "success" && res.config.successTips) {
      Message.success({
        content: res.data.message,
        duration: 2
      });
    } else if (res.data.status === "fail" && res.config.errorTips) {
      Message.error({
        content: res.data.message,
        duration: 2
      });
    } else if (res.data.status === "needAuth") {
      router.replace({ path: "/login" });
    }
    return res.data;
  },
  error => {
    Message.destroy();
    return Promise.reject(error);
  }
);
export default Http;
