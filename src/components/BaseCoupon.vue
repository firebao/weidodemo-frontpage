<!--
#***********************************************
#
#      Filename: src/components/BaseCoupon.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: Coupon 基础优惠券组件
#        Create: 2020-06-29 09:35:01
# Last Modified: 2020-06-29 09:35:01
#***********************************************
-->
<template>
  <div class="single-coupon">
    <div class="top">
      <div class="value">
        <sup>￥</sup>
        <span>10</span>
      </div>
      <div class="tips">满30可用</div>
      <div class="time">2020.10.17-2020.11.17</div>
    </div>
    <div class="bottom">
      <div class="info">
        <div class="restrict">限品类：全品类(特例商品除外)</div>
        <div class="no">券编号：77240453925</div>
      </div>
      <div class="handle">
        <button class="button-dashed">立即使用</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Coupon",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.single-coupon {
  margin: 10px;
  border: 1px solid #ccc;
  display: grid;
  grid-template-rows: 1fr 1fr;
  text-align: center;
  .top {
    background-color: #0099cc;
    color: white;
    .value {
      padding: 20px;
      font-size: 28px;
    }
    .tips {
      padding: 10px;
    }
    .time {
      font-size: 12px;
      padding: 10px;
    }
  }
  .bottom {
    display: grid;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    .info {
      padding: 10px;
      text-align: left;
      font-size: 12px;
    }
  }
}
</style>
