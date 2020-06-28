<!--
#***********************************************
#
#      Filename: Redpackets.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: Redpackets我的红包页面
#        Create: 2020-06-28 18:17:41
# Last Modified: 2020-06-28 18:17:41
#***********************************************
-->
<template>
  <div class="red-packets">
    <div class="my-packets">
      <div class="packets-box-title">
        <div class="packets-title">我的红包</div>
        <div class="tips">
          <icon-svg iconClass="circle-question" class="i20"></icon-svg>
          <span>红包使用规格</span>
        </div>
      </div>
      <div class="packets-summary">
        <span>￥99.99</span>
      </div>
    </div>
    <div class="packets-list">
      <tabs type="simple" size="default">
        <tab-pane label="可使用红包"></tab-pane>
        <tab-pane label="已使用红包"></tab-pane>
        <tab-pane label="已过期红包"></tab-pane>
      </tabs>
      <div class="packets-list-header">
        <div>红包名称</div>
        <div>红包金额（元）</div>
        <div>有效期</div>
        <div>使用范围</div>
      </div>
      <div class="packets-list-body"></div>
    </div>
  </div>
</template>
<script>
import Tabs from "@/components/tab";
import TabPane from "@/components/tab/pane";
export default {
  name: "Apprairse",
  data() {
    return {};
  },
  components: {
    Tabs,
    TabPane
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.red-packets {
  padding: 20px;
  .my-packets {
    padding: 20px;
    border: 1px solid #ccc;
    margin-bottom: 30px;
    .packets-box-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .packets-title {
        font-size: 20px;
        font-color: $secondary-text-color;
        font-weight: 600;
      }
      .tips {
        display: flex;
        align-items: center;
      }
    }
    .packets-summary {
      padding: 20px;
      margin-top: 20px;
      span {
        font-size: 28px;
        color: red;
        font-weight: 600;
        padding: 20px;
        border: 3px solid red;
        border-radius: 20px;
      }
    }
  }
  .packets-list {
    .packets-list-header {
      margin-top: 20px;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
      font-weight: 600;
      background-color: #eee;
      display: grid;
      grid-template-columns: 1fr 1fr 2fr 1fr;
    }
  }
}
</style>
