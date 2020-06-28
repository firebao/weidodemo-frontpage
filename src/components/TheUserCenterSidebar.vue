<template>
  <div>
    <div class="nav" v-for="(item, index) in nav" :key="index">
      <div class="nav-title">{{ `0${index + 1}.${item.title}` }}</div>
      <div class="subnav">
        <ul>
          <li
            class="subnav-item"
            v-for="(subitem, subindex) in item.subnav"
            :key="subindex"
          >
            <router-link :to="subitem.url">{{ subitem.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SideBar",
  data() {
    return {
      nav: [
        {
          title: "我的账号",
          subnav: [
            { title: "个人信息", url: "/user/userinfo" },
            { title: "账号安全", url: "/user/account-security" },
            { title: "我的口味", url: "/user/tastes" },
            { title: "地址管理", url: "/user/address" },
            { title: "邮件订阅", url: "/user/subscription" },
            { title: "账号绑定", url: "/user/bind" },
            { title: "分享绑定", url: "/user/share" },
            { title: "营养档案", url: "/user/record" },
            { title: "企业发票", url: "/user/invoice" }
          ]
        },
        {
          title: "我的订单",
          subnav: [
            { title: "我的订单", url: "/user/order" },
            { title: "评价晒单", url: "/user/appraise" }
          ]
        },
        {
          title: "我的资产",
          subnav: [
            { title: "我的红包", url: "/user/redpackets" },
            { title: "我的金币", url: "/user/coin" },
            { title: "我的积分", url: "/user/points" },
            { title: "我的优惠券", url: "/user/userinfo" }
          ]
        },
        {
          title: "我的关注",
          subnav: [
            { title: "关注商品", url: "/user/userinfo" },
            { title: "关注店铺", url: "/user/userinfo" },
            { title: "关注菜谱", url: "/user/userinfo" },
            { title: "关注内容", url: "/user/userinfo" }
          ]
        },
        {
          title: "我的活动",
          subnav: [
            { title: "我的预约", url: "/user/userinfo" },
            { title: "我的定期购", url: "/user/userinfo" },
            { title: "我的常购商品", url: "/user/userinfo" },
            { title: "我的商品", url: "/user/userinfo" }
          ]
        }
      ]
    };
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.nav {
  background: #f6f7f2;
  margin: 2px 0;
  text-align: center;
  padding: 10px;
  .nav-title {
    font-size: 18px;
    font-weight: 600;
    color: $secondary-text-color;
    padding: 10px 0;
  }
  .subnav {
    color: $alternate-text-color;
    padding: 5px 0;
    .subnav-item {
      cursor: pointer;
      padding: 5px 0;
      a {
        color: $alternate-text-color;
        &:hover {
          color: $accent-color;
        }
      }
    }
  }
}
</style>
