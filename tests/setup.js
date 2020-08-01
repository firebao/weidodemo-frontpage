///javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/tests/setup.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: 设置测试所需的全局环境
//#        Create: 2020-07-31 19:27:28
//# Last Modified: 2020-07-31 19:27:28
//#***********************************************
let jsdom = require("jsdom");
require("jsdom-global")("", {
  url: "http://www.weido.com",
  referrer: "http://www.weido.com",
  contentType: "text/html",
});
