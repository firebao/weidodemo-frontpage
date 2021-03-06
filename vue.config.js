//vue.config.js
const webpack = require("webpack");
const path = require("path");

module.exports = {
  //部署应用包时的基本URL
  publicPath:
    process.env.NODE_ENV === "production" ? "/production-sub-path/" : "/",

  //构建文件目录
  outputDir: "build",

  //静态资源目录
  assetsDir: "./assets",

  //生成的index.html的输出路径（相对于outputDir）
  indexPath: "./public",

  //静态资源文件名是否包含hash
  filenameHashing: true,

  //是否在开发环境下通过eslint-loader在每次保存时lint代码
  //需要@vue/cli-plugin-eslint插件支持
  //Type:boolean|'error'
  //true将lint错误输出为编译警告，输出到命令行
  //'error',将lint错误输出为编译错误，输出到浏览器，并导致编译失败
  lintOnSave: process.env.NODE_DEV !== "production",

  //是否使用包含运行时编译器的vue构建版本
  runtimeCompiler: true,

  //默认情况下babel-loader会忽略所有node_modules中的文件
  //如果想要通过Babel显式转译一个依赖，可在这个选项中列出
  transpileDependencies: [],

  //如果你不需要生产环境的source map,可以将其设置为false
  productionSourceMap: true,

  //设置由html-webpack-plugin构建注入的link与script标签的crossorigin属性
  //crossorigin:

  //设置由html-webpack-plugin构建注入的link与script标签
  //是否启用Subresource Integrity
  integrity: false,

  //webpack配置，Type: object|function
  configureWebpack: {
    //webpack插件配置

    //包含vue编译器
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js"
      }
    }
  },
  //是一个函数，会接收一个基于webpack-chain的ChainableConfig实例
  //允许对内部的webpack配置进行更细粒度的修改
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    svgRule.exclude.add(/node_modules/);
    svgRule
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "./src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
    //修改images loader添加svg处理
    const imageRule = config.module.rule("images");
    imageRule.exclude.add(path.resolve(__dirname, "./src/icons"));
    imageRule.test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
  },
  css: {
    //默认情况下，只有*.module.[ext]结尾的文件才会被视作CSS Modules模块
    //设置为false后你就可以去掉文件名中的.module
    //并将所有的*.(css|scss|sass|less|styl(us)?)文件视为CSS Modules模块
    requireModuleExtension: true,

    //是否将组件中的CSS提取至一个独立的CSS文件中
    //(而不是动态注入到JavaScript中的inline代码)。
    //extract:

    //是否为CSS开启source map
    sourceMap: false
  },

  //webpack-dev-server的选项
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    hotOnly: false,
    disableHostCheck: true
  },

  //向PWA插件传递选项
  pwa: {}
};
