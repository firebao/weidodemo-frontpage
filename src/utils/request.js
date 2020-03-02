import axios from "axios";
import userApi from "@/api/userApi";
import { VUE_APP_API_URL } from "./index";
import { Message } from "view-design";

//创建axios实例
let instance = axios.create({
  baseURL: VUE_APP_API_URL,
  timeOut: 1000
});

//Http对象为导出对象
const Http = {};

//遍历userApi对象
for (let key in userApi) {
  let api = userApi[key];
  Http[key] = async function(
    //请求参数
    params,
    //请求是否是FormData对象
    isFormData = false,
    //axios配置对象
    config = {}
  ) {
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

    //响应
    let response = {};

    //请求方法为put、post、patch
    if (["put", "post", "patch"].indexOf(api.method) >= 0) {
      try {
        response = await instance[api.method](api.url, newParams, config);
      } catch (err) {
        response = err;
      }
      //请求方法为get、delete
    } else if (["get", "delete"].indexOf(api.method) >= 0) {
      try {
        response = await instance[api.method](api.url, config);
      } catch (err) {
        response = err;
      }
    }
    return response;
  };
}
//设置请求拦截器
instance.interceptors.request.use(
  config => {
    Message.loading({
      content: "加载中，请稍候",
      duration: 0
    });
    return config;
  },
  () => {
    Message.destroy();
    Message.error({
      content: "请求错误，请稍后重试",
      duration: 2
    });
  }
);
//设置响应拦截器
instance.interceptors.response.use(
  res => {
    Message.destroy();
    if (res.data.status === "success") {
      Message.success({
        content: res.data.message,
        duration: 2
      });
      return res.data.data;
    } else {
      Message.error({
        content: res.data.message,
        duration: 2
      });
      return {};
    }
  },
  () => {
    Message.destroy();
    Message.error({
      content: "请求错误，请稍后重试",
      duration: 2
    });
  }
);

export default Http;
