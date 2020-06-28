<!--
#***********************************************
#
#      Filename: Order.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: 我的订单页面
#        Create: 2020-06-23 14:56:59
# Last Modified: 2020-06-23 14:56:59
#***********************************************
-->
<template>
  <div class="order">
    <tabs type="simple" size="default">
      <tab-pane label="全部订单">
        111
      </tab-pane>
      <tab-pane label="待付款">
        222
      </tab-pane>
      <tab-pane label="待收货">
        333
      </tab-pane>
      <tab-pane label="待评价">
        444
      </tab-pane>
      <div class="extra" slot="extra">
        <div class="middle">
          <span>常购商品</span>
          <span>订单回收站</span>
        </div>
        <div class="input-search">
          <base-input search placeholder="商品名称/订单号" />
        </div>
      </div>
    </tabs>
  </div>
</template>
<script>
import Tabs from "@/components/tab";
import TabPane from "@/components/tab/pane";
import BaseInput from "@/components/BaseInput";
export default {
  name: "Order",
  data() {
    return {};
  },
  components: {
    Tabs,
    TabPane,
    BaseInput
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.order {
  padding: 20px;
  //extra插槽
  .extra {
    height: 37px;
    display: flex;
    align-items: center;
    .middle {
      span {
        padding-right: 40px;
      }
    }
    .input-search {
      padding-right: 5px;
    }
  }
}
</style>
