///javascript
//#***********************************************
//#
//#      Filename: /root/vue-demo/webpack.config.js
//#
//#        Author: wwj - 318348750@qq.com
//#   Description: mochapack的webpack配置
//#        Create: 2020-07-31 19:20:18
//# Last Modified: 2020-07-31 19:20:18
//#***********************************************
const nodeExternals = require("webpack-node-externals");

module.exports = {
  //暴露NPM依赖
  externals: [nodeExternals()],
  //源码表
  devtool: "inline-cheep-module-source-map",
}
