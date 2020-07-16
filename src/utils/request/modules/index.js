///javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/src/utils/request/modules/index.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: 各个模块的api在这里组装成一个整体
//#        Create: 2020-07-15 14:38:19
//# Last Modified: 2020-07-15 14:38:19
//#***********************************************

import USER from "./user.js";
import WEBSITE from "./website.js";

const API = {
  ...USER,
  ...WEBSITE
};

export default API;
