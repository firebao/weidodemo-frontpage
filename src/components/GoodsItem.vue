<!--
#***********************************************
#
#      Filename: src/components/GoodsItem.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: GoodsItem 单一商品组件
#        Create: 2020-06-29 16:19:19
# Last Modified: 2020-06-29 16:19:19
#***********************************************
-->
<template>
  <div class="single-good">
    <figure>
      <img
        :src="require('@/assets/img/boluo.jpg').default"
        alt="越南进口白心火龙果4个装 中果 单果375-500g 新鲜水果"
        width="160"
        height="160"
      />
      <figcaption>
        越南进口白心火龙果4个装 中果 单果375-500g 新鲜水果
      </figcaption>
    </figure>
    <div class="charge">
      ￥58.00
    </div>
    <div class="notice">
      <span class="circle">降</span>
      比关注时降价￥301.00
    </div>
    <div class="info">
      <div class="comments">
        <icon-svg iconClass="talk" class="i16"></icon-svg>
        <span>5524879</span>
      </div>
      <div class="praise">
        <icon-svg iconClass="apraise" class="i16"></icon-svg>
        <span>93%</span>
      </div>
    </div>
    <div class="handle">
      <div class="cart">
        <icon-svg iconClass="cart" class="i16"></icon-svg>
      </div>
      <div class="compare">
        <icon-svg iconClass="compare" class="i16"></icon-svg>
      </div>
      <div class="enter">
        <icon-svg iconClass="down-left" class="i16"></icon-svg>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GoodsItem",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.single-good {
  margin: 10px;
  border: 1px solid #ccc;
  color: $secondary-text-color;
  figure {
    padding: 20px;
    figcaption {
      font-size: 12px;
      line-height: 16px;
      height: 32px;
      overflow: hidden;
    }
  }
  .charge {
    font-weight: 600;
  }
  .notice {
    padding: 10px;
    font-size: 12px;
    span {
      margin-right: 10px;
      padding: 2px 5px;
      font-weight: 800;
      color: white;
      border: 1px solid #ccc;
      border-radius: 10px;
      background-color: green;
    }
  }
  .info {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    border-top: 1px solid #ccc;
    .comments,
    .praise {
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .comments {
      border-right: 1px solid #ccc;
    }
  }
  .handle {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-top: 1px solid #ccc;
    .cart,
    .compare {
      border-right: 1px solid #ccc;
    }
    div {
      padding: 5px 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
