<!--
#***********************************************
#
#      Filename: src/page/user/Coupon.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: Coupon 我的优惠券页面
#        Create: 2020-06-29 08:51:07
# Last Modified: 2020-06-29 08:51:07
#***********************************************
-->
<template>
  <div class="coupon">
    <div class="coupon-list">
      <div class="coupon-list-header">
        我的优惠券
      </div>
      <div class="coupon-list-body">
        <tabs type="simple" size="default">
          <tab-pane label="商城优惠券"></tab-pane>
          <tab-pane label="店铺优惠券"></tab-pane>
          <tab-pane label="运费优惠券"></tab-pane>
        </tabs>
        <div class="body-header">
          <div>可用优惠券</div>
          <div class="select">
            <div>新到账</div>
            <div>即将过期</div>
            <div>最优惠</div>
          </div>
        </div>
        <div class="coupons">
          <base-coupon></base-coupon>
          <base-coupon></base-coupon>
          <base-coupon></base-coupon>
          <base-coupon></base-coupon>
        </div>
      </div>
    </div>
    <div class="coupon-footer">
      <div class="rule">
        <icon-svg iconClass="rule" class="i40"></icon-svg>
        <span>优惠券使用规则</span>
      </div>
      <div class="coupon-center">
        <icon-svg iconClass="coupon" class="i40"></icon-svg>
        <span>领券中心</span>
      </div>
    </div>
  </div>
</template>
<script>
import Tabs from "@/components/tab";
import TabPane from "@/components/tab/pane";
import BaseCoupon from "@/components/BaseCoupon";

export default {
  name: "Coupon",
  data() {
    return {};
  },
  components: {
    Tabs,
    TabPane,
    BaseCoupon
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.coupon {
  padding: 20px;
  .coupon-list {
    border: 1px solid #ccc;
    .coupon-list-header {
      padding: 20px;
      font-size: 18px;
      font-weight: 600;
      color: $secondary-text-color;
      border-bottom: 1px solid #ccc;
    }
    .coupon-list-body {
      padding: 20px;
      .body-header {
        margin: 20px 0;
        line-height: 30px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        background-color: #ccc;
        font-size: 12px;
        font-weight: 600;
        text-align: center;
        .select {
          display: inline-flex;
          justify-content: space-around;
        }
      }
      .coupons {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }
  .coupon-footer {
    padding: 20px;
    margin-top: 20px;
    border: 1px solid #ccc;
    display: grid;
    grid-template-columns: 1fr 1fr;
    div {
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
