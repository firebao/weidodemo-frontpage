<template>
  <div class="index">
    <div class="info flex">
      <div class="userinfo">
        <div class="ui-top">
          <div class="userphoto">
            <img src="../../assets/img/testi-1.jpg" alt="用户头像" />
          </div>
          <div class="username">
            小黑黑猫儿
          </div>
          <div class="handle flex h-around">
            <a class="points button-dashed">我的积分</a>
            <a class="goldcoin button-dashed">我的金币</a>
          </div>
        </div>
        <div class="ui-bottom flex h-around v-middle">
          <div class="intro">
            开通会员<br />
            尊享会员服务
          </div>
          <div class="open">
            <a class="button-dashed">立即开通</a>
          </div>
        </div>
      </div>
      <div class="capital">
        <base-box class="capital-box" title="我的资产">
          <div class="capital-content flex v-middle h-around">
            <div class="capital-column">
              <div class="coupon-num first-row">1</div>
              <div class="coupon-name second-row">优惠券</div>
              <div class="coupon-handle third-row">领券</div>
            </div>
            <div class="capital-column">
              <div class="redbag-num first-row">0</div>
              <div class="redbag-name second-row">红包</div>
              <div class="redbag-handle third-row">领红包</div>
            </div>
            <div class="capital-column">
              <div class="points-num first-row">88</div>
              <div class="points-name second-row">积分</div>
              <div class="points-handle third-row">明细</div>
            </div>
            <div class="capital-column">
              <div class="goldcoin-num first-row">569</div>
              <div class="goldcoin-name second-row">金币</div>
              <div class="goldcoin-handle third-row">明细</div>
            </div>
            <div class="capital-column">
              <div class="money-num first-row">897.50</div>
              <div class="money-name second-row">余额</div>
              <div class="money-handle third-row">充值</div>
            </div>
          </div>
        </base-box>
      </div>
    </div>
    <div class="other">
      <div class="order">
        <base-box title="我的订单">
          <div class="order-icon flex h-around">
            <icon-svg iconClass="wait-pay" class="i40"></icon-svg>
            <icon-svg iconClass="wait-receive" class="i40"></icon-svg>
            <icon-svg iconClass="wait-apraise" class="i40"></icon-svg>
            <icon-svg iconClass="wait-back" class="i40"></icon-svg>
            <icon-svg iconClass="all-order" class="i40"></icon-svg>
          </div>
          <div class="order-list">
            <div
              class="order-item"
              v-for="(item, index) in orderList"
              :key="index"
            >
              <img :src="item.image" :alt="item.name" :title="item.name" />
              <div class="order-intro">
                <div class="order-status">
                  {{ orderIntro(item.orderStatus) }}
                </div>
                <div class="order-money">
                  {{ item.money }}
                </div>
              </div>
              <div class="order-handle">
                <a class="order-detail">查看详情</a>
                <a class="track">物流跟踪</a>
              </div>
            </div>
          </div>
        </base-box>
      </div>
      <div>
        <div class="follow">
          <base-box title="我的关注">
            <div class="folow-content">
              <div class="folow-goods folow-item">
                <div class="num">
                  21
                </div>
                <div class="title">
                  关注商品
                </div>
              </div>
              <div class="folow-shops folow-item">
                <div class="num">
                  18
                </div>
                <div class="title">
                  关注店铺
                </div>
              </div>
              <div class="folow-menu folow-item">
                <div class="num">
                  21
                </div>
                <div class="title">
                  关注菜谱
                </div>
              </div>
              <div class="folow-news folow-item">
                <div class="num">
                  21
                </div>
                <div class="title">
                  关注内容
                </div>
              </div>
            </div>
          </base-box>
        </div>
        <div class="skim">
          <base-box title="浏览记录"></base-box>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseBox from "@/components/BaseBox";
export default {
  name: "UcIndex",
  data() {
    return {
      orderList: [
        {
          image: require("@/assets/img/boluo.jpg").default,
          name: "越南进口菠萝",
          orderStatus: "waitPay",
          money: "￥58.00"
        },
        {
          image: require("@/assets/img/2.png").default,
          name: "越南进口菠萝",
          orderStatus: "waitPay",
          money: "￥58.00"
        },
        {
          image: require("@/assets/img/2.png").default,
          name: "越南进口菠萝",
          orderStatus: "waitPay",
          money: "￥58.00"
        },
        {
          image: require("@/assets/img/2.png").default,
          name: "越南进口菠萝",
          orderStatus: "waitPay",
          money: "￥58.00"
        },
        {
          image: require("@/assets/img/2.png").default,
          name: "越南进口菠萝",
          orderStatus: "waitPay",
          money: "￥58.00"
        },
        {
          image: require("@/assets/img/2.png").default,
          name: "越南进口菠萝",
          orderStatus: "waitPay",
          money: "￥58.00"
        },
        {
          image: require("@/assets/img/2.png").default,
          name: "越南进口菠萝",
          orderStatus: "waitPay",
          money: "￥58.00"
        },
        {
          image: require("@/assets/img/2.png").default,
          name: "越南进口菠萝",
          orderStatus: "waitPay",
          money: "￥58.00"
        }
      ]
    };
  },
  components: {
    BaseBox
  },
  computed: {
    orderIntro() {
      return status => {
        if (status === "waitPay") return "您提交了订单，等待付款";
      };
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.index {
  padding: 20px 0;
  .info {
    .userinfo {
      height: 250px;
      width: 250px;
      z-index: 1;
      .ui-top {
        background: #f6f7f2;
        .userphoto {
          text-align: center;
          padding: 20px 0 10px 0;
          img {
            width: 50px;
            height: 50px;
            border-radius: 25px;
            border: 2px solid white;
          }
        }
        .username {
          padding: 0 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 600;
          font-size: 18px;
          color: $secondary-text-color;
          text-align: center;
        }
        .handle {
          padding: 20px;
        }
      }
      .ui-bottom {
        height: 74px;
        background: #5e5e5e;
        .intro {
          color: white;
          text-align: center;
        }
      }
    }
    .capital {
      margin: 5px 0;
      .capital-box {
        height: 240px;
        width: 710px;
        margin-left: -2px;
        z-index: -1;
        .capital-content {
          height: 200px;
          .capital-column {
            .first-row,
            .second-row,
            .third-row {
              text-align: center;
              cursor: pointer;
              &:hover {
                color: $accent-color;
              }
            }
            .first-row {
              font-size: 32px;
              padding: 15px 0;
            }
            .second-row {
              color: $secondary-text-color;
              padding: 10px 0;
            }
            .third-row {
              font-size: 12px;
              color: $alternate-text-color;
              padding: 10px 0;
            }
          }
        }
      }
    }
  }
  .other {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-column-gap: 20px;
    .order-icon {
      padding: 10px 0;
    }
    .order-list {
      .order-item {
        display: grid;
        grid-template-columns: 1fr 7fr 3fr;
        grid-column-gap: 20px;
        align-items: center;
        padding: 10px;
        border-top: 1px dashed #ccc;
        img {
          width: 60px;
          height: 60px;
          border: 1px solid #ccc;
        }
        .order-intro {
          font-size: 12px;
          font-weight: 600;
          color: $alternate-text-color;
          .order-status {
            padding: 5px 0;
          }
          .order-money {
            color: red;
          }
        }
        .order-handle {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 20px;
        }
      }
    }
    .follow {
      .folow-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-gap: 10px 10px;
        align-items: center;
        justify-items: center;
        .folow-item {
          padding: 20px 0;
          .num {
            font-size: 20px;
            font-weight: 600;
            text-align: center;
          }
          .title {
            color: $secondary-text-color;
            text-align: center;
          }
        }
      }
    }
    .skim {
      margin-top: 20px;
    }
  }
}
</style>
