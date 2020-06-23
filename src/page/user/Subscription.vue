<!--
#***********************************************
#
#      Filename: Subscription.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: 邮件订阅页面
#        Create: 2020-06-23 08:23:08
# Last Modified: 2020-06-23 08:23:08
#***********************************************
-->
<template>
  <div class="subsrciption">
    <!-- box title -->
    <div class="title">
      <div class="info">
        <icon-svg iconClass="warning" class="i40"></icon-svg>
        <div class="text">
          <p>您的邮箱未验证</p>
          <p>验证邮箱可加强账户安全，您可以使用已验证的邮箱快速找回密码.</p>
        </div>
      </div>
      <div class="handle">
        <button class="button-dashed">马上验证</button>
      </div>
    </div>
    <!-- end box title -->
    <!-- box body -->
    <div class="status">
      <div class="status-title">
        <p>订阅状态</p>
        <p>SUBSCRIPTION</p>
      </div>
      <div class="status-body">
        <div class="check">
          <input type="checkbox" />
        </div>
        <div class="label">
          <span>促销消息提醒:</span>
          第一时间收到感兴趣的促销信息，什么值得买尽在掌握
        </div>
        <div class="check">
          <input type="checkbox" />
        </div>
        <div class="label">
          <span>账户相关提醒:</span>
          包括优惠券到账、过期等账户相关重要提醒
        </div>
        <div class="check">
          <input type="checkbox" />
        </div>
        <div class="label">
          <span>订单相关提醒:</span>
          包括订单下单、未评价、满意度调查等订单相关重要提醒
        </div>
      </div>
    </div>
    <!-- end box body -->
  </div>
</template>
<script>
export default {
  name: "Subscription",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.subsrciption {
  margin-top: 20px;
  border: 4px solid #999;
  //box title
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 4px dashed #999;
    .info {
      display: flex;
      .text {
        padding-left: 10px;
      }
    }
  }
  //box body
  .status {
    margin: 60px;
    padding: 20px;
    background-color: #ccc;
    .status-title {
      line-height: 16px;
      font-weight: 600;
    }
    .status-body {
      padding: 20px 0;
      display: grid;
      grid-template-columns: 1fr 5fr;
      grid-template-rows: repeat(3, 30px);
      align-items: center;
      .check {
        text-align: right;
      }
      .label {
        font-size: 12px;
        color: $secondary-text-color;
        text-align: left;
        padding: 0 10px;
        span {
          font-size: 14px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
