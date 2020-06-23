<!--
#***********************************************
#
#      Filename: Address.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: address页面
#        Create: 2020-06-22 21:41:46
# Last Modified: 2020-06-22 21:41:46
#***********************************************
-->
<template>
  <div class="address">
    <!-- 新增收货地址栏 -->
    <div class="add">
      <button class="button-dashed">新增收货地址</button>
      <div class="tip">您已创建1个收货地址，最多可创建20个</div>
    </div>
    <!-- end新增收货地址栏 -->
    <!-- 地址栏 -->
    <div class="address-box">
      <address-box></address-box>
    </div>
    <!-- end地址栏 -->
  </div>
</template>
<script>
import AddressBox from "@/components/AddressBox";
export default {
  name: "Address",
  data() {
    return {};
  },
  components: {
    AddressBox
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.address {
  padding: 20px;
  //新增收货地址栏
  .add {
    display: inline-flex;
    height: 40px;
    .tip {
      align-self: center;
      padding-left: 20px;
    }
  }
}
</style>
