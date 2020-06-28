<!--
#***********************************************
#
#      Filename: Coin.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: Coin 我的金币页面
#        Create: 2020-06-28 19:15:26
# Last Modified: 2020-06-28 19:15:26
#***********************************************
-->
<template>
  <div class="coin">
    <div class="coin-info">
      <div class="left">
        <div class="left-title">我的金币</div>
        <div class="icon">
          <icon-svg iconClass="coin" class="i40"></icon-svg>
        </div>
        <div class="num">100</div>
        <div class="handle">
          <button class="button-dashed">赚金币</button>
          <button class="button-dashed">花金币</button>
        </div>
      </div>
      <div class="right">
        <div class="right-title">
          <div class="title">最近三个月金币统计</div>
          <div class="tips">
            <icon-svg iconClass="circle-question" class="i20"></icon-svg>
            <span>金币使用规则</span>
          </div>
        </div>
        <div class="right-body">
          <div class="item">
            <div class="intro">购物返金币</div>
            <div class="value">+10</div>
          </div>
          <div class="item">
            <div class="intro">评价晒单返金币</div>
            <div class="value">+20</div>
          </div>
          <div class="item">
            <div class="intro">其他返金币</div>
            <div class="value">+20</div>
          </div>
          <div class="item">
            <div class="intro">金币支付订单数</div>
            <div class="value">2</div>
          </div>
          <div class="item">
            <div class="intro">金币抵扣节省</div>
            <div class="value">200元</div>
          </div>
        </div>
      </div>
    </div>
    <div class="coin-detail">
      <div class="detail-title">金币明细</div>
      <div class="detail-header">
        <div>最近三个月</div>
        <div>收入/支出</div>
        <div>详细说明</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Coin",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.coin {
  padding: 20px;
  .coin-info {
    border: 1px solid #ccc;
    display: grid;
    grid-template-columns: 1fr 3fr;
    .left {
      border-right: 1px solid #ccc;
      padding: 20px;
      display: grid;
      grid-template-rows: 1fr 2fr 1fr 1fr;
      align-items: center;
      justify-content: center;
      text-align: center;
      .left-title {
        font-size: 24px;
        color: $secondary-text-color;
        font-weight: 600;
      }
      .num {
        color: $aux-color-green-base;
        font-weight: 600;
        font-size: 20px;
      }
      .handle {
        button {
          padding: 2px 5px;
          margin: 0 5px;
        }
      }
    }
    .right {
      padding: 20px;
      .right-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
          color: $secondary-text-color;
          font-weigh: 600;
          font-size: 18px;
        }
        .tips {
          display: flex;
          align-items: center;
        }
      }
      .right-body {
        padding: 20px 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        .item {
          padding: 10px;
          text-align: center;
          .intro {
            font-size: 12px;
            color: $secondary-text-color;
            font-weight: 600;
            padding-bottom: 10px;
          }
          .value {
            font-size: 18px;
            color: $aux-color-yellow-base;
          }
        }
      }
    }
  }
  .coin-detail {
    margin-top: 20px;
    border: 1px solid #ccc;
    .detail-title {
      padding: 20px;
      font-size: 18px;
      font-weight: $secondary-text-color;
      color: $secondary-text-color;
      border-bottom: 1px solid #ccc;
    }
    .detail-header {
      margin: 20px;
      line-height: 30px;
      display: grid;
      grid-template-columns: 1fr 1fr 2fr;
      background-color: #ccc;
      font-size: 12px;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
