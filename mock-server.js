const express = require("express");
const Mock = require("mockjs");
const path = require("path");
const fs = require("fs");
const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "PUT, GET, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Content-Security-Policy", "none");
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.post("/api/user/sendCmsCode", (req, res) => {
  let data = {
    status: "success",
    data: {},
    message: "操作成功"
  };
  res.json(data);
});
app.post("/api/user/doLogin", (req, res) => {
  let data = Mock.mock({
    "status|1": ["success", "error"],
    data: {},
    message: "操作成功"
  });
  res.json(data);
});
app.get("/api/common/getNav", (req, res) => {
  let data = Mock.mock({
    "status|1": ["success"],
    data: function() {
      if (this.status === "success") {
        return [
          { type: "mainNav", name: "首页", url: "/" },
          { type: "mainNav", name: "购物", url: "/shop" },
          { type: "mainNav", name: "菜谱", url: "/cookbook" },
          { type: "mainNav", name: "社区", url: "/community" },
          { type: "mainNav", name: "入驻加盟", url: "/join" },
          { type: "mainNav", name: "下载", url: "/download" }
        ];
      }
    },
    message: function() {
      return this.status === "success" ? "获取nav成功" : "获取nav失败";
    }
  });
  res.json(data);
});
app.get("/api/common/getFooterInfo", (req, res) => {
  let data = Mock.mock({
    "status|1": ["success"],
    data: function() {
      if (this.status === "success") {
        return {
          footerNav: [
            {
              id: 1,
              type: "footerNav",
              name: "购物指南",
              subNav: [
                {
                  type: "footerSubNav",
                  name: "购物流程",
                  url: "/help/shopping-flow"
                },
                {
                  type: "footerSubNav",
                  name: "会员介绍",
                  url: "/help/membership-rules"
                },
                {
                  type: "footerSubNav",
                  name: "常见问题",
                  url: "/help/common-problem"
                },
                {
                  type: "footerSubNav",
                  name: "联系客服",
                  url: "/help/contact-service"
                }
              ]
            },
            {
              id: 2,
              type: "footerNav",
              name: "配送方式",
              subNav: [
                {
                  type: "footerSubNav",
                  name: "上门自提",
                  url: "/help/pickup-in-store"
                },
                {
                  type: "footerSubNav",
                  name: "限时到",
                  url: "/help/time-limited-distribution"
                },
                {
                  type: "footerSubNav",
                  name: "配送服务查询",
                  url: "/help/distribution-service"
                },
                {
                  type: "footerSubNav",
                  name: "配送费收取标准",
                  url: "/help/distribution-fee"
                }
              ]
            },
            {
              id: 3,
              type: "footerNav",
              name: "支付方式",
              subNav: [
                { type: "footerSubNav", name: "货到付款", url: "/help/cod" },
                {
                  type: "footerSubNav",
                  name: "在线支付",
                  url: "/help/online-payment"
                },
                {
                  type: "footerSubNav",
                  name: "公司转账",
                  url: "/help/transfer-account"
                }
              ]
            },
            {
              id: 4,
              type: "footerNav",
              name: "售后服务",
              subNav: [
                {
                  type: "footerSubNav",
                  name: "售后政策",
                  url: "/help/customer-service-policy"
                },
                {
                  type: "footerSubNav",
                  name: "价格保护",
                  url: "/help/price-protection"
                },
                {
                  type: "footerSubNav",
                  name: "退款说明",
                  url: "/help/refund-instruction"
                },
                {
                  type: "footerSubNav",
                  name: "取消订单",
                  url: "/help/cancel-order"
                }
              ]
            },
            {
              id: 5,
              type: "footerNav",
              name: "社区规则",
              subNav: [
                {
                  type: "footerSubNav",
                  name: "社区规则说明",
                  url: "/help/community-rules"
                },
                {
                  type: "footerSubNav",
                  name: "社区活动奖励",
                  url: "/help/community-activity"
                }
              ]
            }
          ]
        };
      }
    },
    message: function() {
      return this.status === "success"
        ? "获取footerInfo成功"
        : "获取footerInfo失败";
    }
  });
  res.json(data);
});
app.get("/api/common/getCategory", (req, res) => {
  let data = Mock.mock({
    status: "success",
    data: function() {
      let data = fs.readFileSync(
        path.resolve(__dirname, "./data/category.json")
      );
      let obj = JSON.parse(data);
      return obj;
    },
    message: "获取Category信息成功"
  });
  res.json(data);
});
app.get("/api/common/getCityList", (req, res) => {
  let data = Mock.mock({
    status: "success",
    data: function() {
      let data = fs.readFileSync(path.resolve(__dirname, "./data/citys.json"));
      let obj = JSON.parse(data);
      return obj;
    },
    message: "获取城市列表成功"
  });
  res.json(data);
});
let server = app.listen(8081, function() {
  let host = server.address().address;
  let port = server.address().port;
  console.log("应用实例,访问地址为http://%s:%s", host, port);
});
