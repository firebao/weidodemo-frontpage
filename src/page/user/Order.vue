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
      <tab-pane label="全部订单"></tab-pane>
      <tab-pane label="待付款"></tab-pane>
      <tab-pane label="待收货"></tab-pane>
      <tab-pane label="待评价"></tab-pane>
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
    <!-- 订单列表 -->
    <div class="list-table">
      <div class="list-header">
        <div>近三月订单</div>
        <div>订单详情</div>
        <div>收货人</div>
        <div>金额</div>
        <div>全部状态</div>
        <div>操作</div>
      </div>
      <div class="list-body">
        <order-item></order-item>
        <order-item></order-item>
        <order-item></order-item>
        <order-item></order-item>
      </div>
      <div class="list-footer">
        <base-page :total="100" mode="scroll"></base-page>
      </div>
    </div>
    <!-- end 订单列表 -->
  </div>
</template>
<script>
import Tabs from "@/components/tab";
import TabPane from "@/components/tab/pane";
import BaseInput from "@/components/BaseInput";
import OrderItem from "@/components/OrderItem";
import BasePage from "@/components/BasePage";
export default {
  name: "Order",
  data() {
    return {};
  },
  components: {
    Tabs,
    TabPane,
    BaseInput,
    OrderItem,
    BasePage
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
  .list-table {
    .list-header {
      padding: 3px 5px;
      font-size: 12px;
      color: $secondary-text-color;
      background-color: #ccc;
      display: grid;
      grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr;
    }
  }
}
</style>
