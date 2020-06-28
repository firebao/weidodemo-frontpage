<!--
#***********************************************
#
#      Filename: Invoice.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: 企业发票页面
#        Create: 2020-06-23 14:44:36
# Last Modified: 2020-06-23 14:44:36
#***********************************************
-->
<template>
  <div class="invoice">
    <tabs type="simple" size="default">
      <tab-pane label="开普通发票">普通发票信息</tab-pane>
      <tab-pane label="开增值税发票">增值税发票信息</tab-pane>
    </tabs>
  </div>
</template>
<script>
import Tabs from "@/components/tab";
import TabPane from "@/components/tab/pane";
export default {
  name: "Invoice",
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
.invoice {
  padding: 20px;
}
</style>
