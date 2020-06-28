<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/components/OrderItem.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: OrderItem组件
#        Create: 2020-06-28 16:56:44
# Last Modified: 2020-06-28 16:56:44
#***********************************************
-->
<template>
  <div class="order-item">
    <div class="item-header">
      <div class="datetime">
        2019-11-11 13:40:03
      </div>
      <div class="orderno">
        订单号：11100442004
      </div>
      <div class="shop">
        <div class="name">XXX店铺</div>
        <icon-svg iconClass="talk" class="i20"></icon-svg>
      </div>
    </div>
    <div class="item-body">
      <div class="detail">
        <div class="img">
          <img :src="require('@/assets/img/boluo.jpg').default" alt="" />
        </div>
        <div class="title">
          <div class="goods-name">
            越南进口白心火龙果4个装 中果 单果375-500g 新鲜水果
          </div>
          <div class="similar">
            <icon-svg iconClass="box" class="i16"></icon-svg>
            相似商品
          </div>
        </div>
      </div>
      <div class="receiver">
        <icon-svg iconClass="user" class="i20"></icon-svg>
        XXX
      </div>
      <div class="cash">
        <div class="sum">
          总额：￥56.8
        </div>
        <div class="pay-type">
          在线支付
        </div>
      </div>
      <div class="status">
        <div class="order-status">待付款</div>
        <div class="order-detail">订单详情</div>
      </div>
      <div class="handle">立即付款</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "OrderItem",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.order-item {
  font-size: 12px;
  color: $secondary-text-color;
  margin: 10px 0;
  border: 1px solid #ccc;
  .item-header {
    height: 26px;
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    align-items: center;
    text-align: center;
    background-color: #ccc;
    .shop {
      display: flex;
      align-items: center;
      justify-content: center;
      .name {
        font-weight: 600;
      }
    }
  }
  .item-body {
    display: grid;
    grid-template-columns: 4fr 1fr 1fr 1fr 1fr;
    .detail {
      border-right: 1px solid #ccc;
      display: flex;
      align-items: center;
      .img {
        margin: 10px;
        img {
          border: 1px solid #eee;
          width: 60px;
          height: 60px;
        }
      }
      .title {
        padding: 20px 10px;
        .goods-name {
          height: 40px;
        }
        .similar {
          display: flex;
          align-items: center;
          padding-bottom: 5px;
        }
      }
    }
    .receiver {
      border-right: 1px solid #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cash,
    .status {
      border-right: 1px solid #ccc;
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-rows: 1fr 1fr;
      .sum,
      .pay-type,
      .order-status,
      .order-detail {
        text-align: center;
      }
    }
    .handle {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
