<!--
#***********************************************
#
#      Filename: Points.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: Points 我的积分页面
#        Create: 2020-06-28 20:24:08
# Last Modified: 2020-06-28 20:24:08
#***********************************************
-->
<template>
  <div class="points">
    <div class="points-info">
      <div class="left">
        <div class="left-title">我的积分</div>
        <div class="icon">
          <icon-svg iconClass="points" class="i40"></icon-svg>
        </div>
        <div class="num">100</div>
        <div class="level">
          <div class="current-level">
            <div class="intro">当前等级</div>
            <div class="account-level">青铜账号</div>
          </div>
          <div class="icon">
            <icon-svg iconClass="next" class="i40"></icon-svg>
          </div>
          <div class="next-level">
            <div class="intro">下一等级</div>
            <div class="account-level">白银账号</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-title">
          <div class="title">最近三个月积分统计</div>
          <div class="tips">
            <icon-svg iconClass="circle-question" class="i20"></icon-svg>
            <span>账号等级特权</span>
          </div>
        </div>
        <div class="right-body">
          <div class="item">
            <div class="intro">购物送积分</div>
            <div class="value">+10</div>
          </div>
          <div class="item">
            <div class="intro">评价晒单送积分</div>
            <div class="value">+20</div>
          </div>
          <div class="item">
            <div class="intro">签到送积分</div>
            <div class="value">+20</div>
          </div>
          <div class="item">
            <div class="intro">发表内容送积分</div>
            <div class="value">+20</div>
          </div>
          <div class="item">
            <div class="intro">其他</div>
            <div class="value">0</div>
          </div>
        </div>
        <div class="right-footer">
          <div class="account-level">青铜账号</div>
          <div class="next">
            <div class="limit">1000</div>
            <div class="icon">
              <icon-svg iconClass="next" class="i20"></icon-svg>
            </div>
          </div>
          <div class="account-level">白银账号</div>
          <div class="next">
            <div class="limit">10000</div>
            <div class="icon">
              <icon-svg iconClass="next" class="i20"></icon-svg>
            </div>
          </div>
          <div class="account-level">黄金账号</div>
          <div class="next">
            <div class="limit">50000</div>
            <div class="icon">
              <icon-svg iconClass="next" class="i20"></icon-svg>
            </div>
          </div>
          <div class="account-level">钻石账号</div>
          <div class="next">
            <div class="limit">100000</div>
            <div class="icon">
              <icon-svg iconClass="next" class="i20"></icon-svg>
            </div>
          </div>
          <div class="account-level">超级VIP</div>
        </div>
      </div>
    </div>
    <div class="points-detail">
      <div class="detail-title">积分明细</div>
      <div class="detail-header">
        <div>最近三个月</div>
        <div>收入</div>
        <div>详细说明</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Points",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.points {
  padding: 20px;
  .points-info {
    border: 1px solid #ccc;
    display: grid;
    grid-template-columns: 1fr 3fr;
    .left {
      border-right: 1px solid #ccc;
      padding: 20px;
      display: grid;
      grid-template-rows: 1fr 2fr 1fr 2fr;
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
      .level {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        .intro {
          font-size: 12px;
          font-weight: 600;
          color: $secondary-text-color;
        }
        .account-level {
          border: 2px solid;
          border-radius: 5px;
        }
        .current-level {
          .account-level {
            border-color: #cc6600;
            color: #cc6600;
          }
        }
        .next-level {
          .account-level {
            border-color: #cccccc;
            color: #cccccc;
          }
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
        grid-template-columns: repeat(5, 1fr);
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
      .right-footer {
        padding: 20px 0;
        display: grid;
        grid-template-columns: repeat(9, 1fr);
        justify-content: center;
        align-items: center;
        text-align: center;
        .next {
          .limit {
            font-size: 12px;
          }
        }
        .account-level {
          border: 2px solid;
          border-radius: 5px;
        }
        .account-level:nth-child(1) {
          border-color: #cc6600;
          color: #cc6600;
        }
        .account-level:nth-child(3) {
          border-color: #cccccc;
          color: #cccccc;
        }
        .account-level:nth-child(5) {
          border-color: #ffcc33;
          color: #ffcc33;
        }
        .account-level:nth-child(7) {
          border-color: #0099ff;
          color: #0099ff;
        }
        .account-level:nth-child(9) {
          border-color: #9900ff;
          color: #9900ff;
        }
      }
    }
  }
  .points-detail {
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
