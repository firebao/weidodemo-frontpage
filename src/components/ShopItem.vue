<template>
  <div
    class="shop-item"
    @mouseenter="detailShow()"
    @mouseleave="detailHidden()"
  >
    <div class="shop-logo">
      <img src="" alt="" width="100" height="100" />
    </div>
    <p class="shop-name">店铺名称：<span>XXX店</span></p>
    <div class="rate">
      <i-rate disabled />
    </div>
    <div class="flag">
      <span class="border-flag">保</span>
      <span class="border-flag">票</span>
      <span class="border-flag">陪</span>
      <span class="border-flag">W</span>
    </div>
    <div class="distribution-cost">
      <span class="info">起送：<span>￥15</span></span>
      <span class="info">配送费：<span>￥4</span></span>
      <span class="info distribution-time">
        <icon-svg class="i12" icon-class="clock"></icon-svg>
        <span>30分钟</span>
      </span>
    </div>
    <div class="detail hidden">
      <p class="shop-name">店铺名称：<span>XXX店</span></p>
      <p class="shop-intro">店铺介绍：<span>新鲜蔬菜、新鲜水果</span></p>
      <hr />
      <p class="insurance">
        <span class="border-flag">保</span>
        该店铺商品由XXX保险承担，食品安全有保障
      </p>
      <p class="componsation">
        <span class="border-flag">赔</span>
        商家原因导致订单取消，赔付代金券
      </p>
      <p class="invoice">
        <span class="border-flag">票</span>
        商家支持开发票，请在下单时填写发票抬头
      </p>
      <p class="w">
        <span class="border-flag">W</span>
        商家所有商品生产、运输、储存过程全部可在网站追溯
      </p>
      <hr />
      <div class="shop-notice">
        <p>店铺公告</p>
        <p class="content"></p>
      </div>
    </div>
  </div>
</template>
<script src="@/components/js/shop-item.js"></script>
<style src="@/components/css/shop-item.scss" scoped lang="scss"></style>
