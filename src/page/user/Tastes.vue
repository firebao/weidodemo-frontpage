<template>
  <div class="tastes">
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
    <div class="role-tastes">
      <tabs type="simple" size="default">
        <tab-pane label="标签1">标签1</tab-pane>
        <tab-pane label="标签1">标签2</tab-pane>
      </tabs>
    </div>
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
  .role-tastes {
    margin-top: 30px;
    padding: 20px;
    border: 2px solid #ccc;
    .tab-pane {
      display: inline-flex;
      .tab-item {
        padding: 10px 20px;
        cursor: pointer;
        color: $secondary-text-color;
        font-weight: 600;
        &:hover {
          color: $accent-color;
        }
      }
    }
  }
}
</style>
