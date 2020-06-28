<!--
#***********************************************
#
#      Filename: Appraise.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: Appraise页面
#        Create: 2020-06-28 17:29:53
# Last Modified: 2020-06-28 17:29:53
#***********************************************
-->
<template>
  <div class="appraise">
    <tabs type="simple" size="default">
      <tab-pane label="待评价订单"></tab-pane>
      <tab-pane label="待晒单"></tab-pane>
      <tab-pane label="待追评"></tab-pane>
      <tab-pane label="服务评价"></tab-pane>
    </tabs>
  </div>
</template>
<script>
import Tabs from "@/components/tab";
import TabPane from "@/components/tab/pane";

export default {
  name: "Appraise",
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
.appraise {
  padding: 20px;
}
</style>
