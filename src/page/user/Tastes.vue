<!--
#***********************************************
#
#      Filename: src/page/user/Tastes.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: 我的口味页面
#        Create: 2020-06-22 17:17:02
# Last Modified: 2020-06-22 17:17:02
#***********************************************
-->
<template>
  <div class="tastes">
    <role-manager></role-manager>
    <!-- 角色口味 -->
    <div class="role-tastes">
      <tabs type="simple" size="default">
        <!-- 味觉偏好 -->
        <tab-pane label="味觉偏好">
          <div class="flex h-around">
            <div class="taste">酸</div>
            <div class="taste">甜</div>
            <div class="taste">苦</div>
            <div class="taste">辣</div>
            <div class="taste">咸</div>
          </div>
        </tab-pane>
        <!-- end味觉偏好 -->
        <tab-pane label="菜系偏好">菜系偏好</tab-pane>
      </tabs>
    </div>
    <!-- end角色口味 -->
  </div>
</template>
<script>
import Tabs from "@/components/tab";
import TabPane from "@/components/tab/pane";
import RoleManager from "@/components/TheRoleManager";
export default {
  name: "Tasets",
  data() {
    return {};
  },
  components: {
    Tabs,
    TabPane,
    RoleManager
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.tastes {
  padding: 20px;
  //角色口味
  .role-tastes {
    margin-top: 30px;
    padding: 20px;
    border: 2px solid #ccc;
    .taste {
      height: 200px;
      padding: 20px;
      border: 1px solid #ccc;
    }
  }
}
</style>
