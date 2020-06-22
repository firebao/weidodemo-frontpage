<!--
#***********************************************
#
#      Filename: src/page/user/Tastes.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: xxx
#        Create: 2020-06-22 17:17:02
# Last Modified: 2020-06-22 17:17:02
#***********************************************
-->
<template>
  <div class="tastes">
    <!-- 新增角色 -->
    <div class="add-role">
      <div class="item">
        <div class="add flex h-middle v-middle">
          <icon-svg iconClass="add" class="i80"></icon-svg>
        </div>
        <div class="tips">
          新建角色
        </div>
      </div>
    </div>
    <!-- end新增角色 -->
    <!-- 角色信息 -->
    <div class="role-info">
      <div class="name">
        <div class="label">姓名</div>
        <input id="name" type="text" />
      </div>
      <div class="sex">
        <div class="label">性别</div>
        <input id="name" name="sex" type="radio" value="" />
        <div class="sex-label">男</div>
        <input id="name" name="sex" type="radio" value="" />
        <div class="sex-label">女</div>
      </div>
      <div class="birthday">
        <div class="label">生日</div>
        <input id="birthday" type="text" />
      </div>
      <div class="weight">
        <div class="label">体重</div>
        <input id="weight" type="text" />
      </div>
    </div>
    <!-- end角色信息 -->
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
export default {
  name: "Tasets",
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
.tastes {
  padding: 20px;
  //新增角色
  .add-role {
    width: 100%;
    padding: 20px;
    border: 2px solid #ccc;
    .item {
      .add {
        border-radius: 25px;
        width: 50px;
        height: 50px;
        border: 2px solid #ccc;
      }
      .tips {
        margin-top: 10px;
        font-weight: 600;
        color: $secondary-text-color;
      }
    }
  }
  //角色信息
  .role-info {
    margin-top: 30px;
    padding: 20px;
    border: 2px solid #ccc;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    .label {
      color: $secondary-text-color;
      font-weight: 600;
      margin-bottom: 5px;
    }
    input[type="text"] {
      width: 60%;
      height: 25px;
      padding: 0 2px;
      border: 1px solid #ccc;
    }
    input[type="radio"] {
      height: 25px;
    }
    .sex-label {
      display: inline-block;
      line-height: 25px;
      height: 25px;
      vertical-align: super;
      margin-right: 15px;
    }
  }
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
