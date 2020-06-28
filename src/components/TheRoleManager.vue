<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/components/TheRoleManager.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: 角色管理组件
#        Create: 2020-06-23 14:27:45
# Last Modified: 2020-06-23 14:27:45
#***********************************************
-->
<template>
  <div class="role">
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
  </div>
</template>
<script>
export default {
  name: "RoleManger",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.role {
  margin-bottom: 30px;
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
}
</style>
