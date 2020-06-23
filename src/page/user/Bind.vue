<!--
#***********************************************
#
#      Filename: Bind.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: 账号绑定页面
#        Create: 2020-06-23 11:12:52
# Last Modified: 2020-06-23 11:12:52
#***********************************************
-->
<template>
  <div class="bind">
    <!-- box title -->
    <div class="title">
      账号绑定
    </div>
    <!-- end box title -->
    <!-- box body -->
    <div class="body">
      <div class="block">
        <div class="icon">
          <icon-svg iconClass="qq" class="i20"></icon-svg>
        </div>
        <div class="name">
          绑定QQ账号
        </div>
        <div class="status">
          已绑定
        </div>
        <div class="handle">
          <button class="button-dashed" href="">解绑</button>
        </div>
      </div>
      <div class="block">
        <div class="icon">
          <icon-svg iconClass="weixin" class="i20"></icon-svg>
        </div>
        <div class="name">
          绑定微信账号
        </div>
        <div class="status">
          未绑定
        </div>
        <div class="handle">
          <button class="button-dashed" href="">绑定</button>
        </div>
      </div>
      <div class="block">
        <div class="icon">
          <icon-svg iconClass="weibo" class="i20"></icon-svg>
        </div>
        <div class="name">
          绑定新浪微博账号
        </div>
        <div class="status">
          未绑定
        </div>
        <div class="handle">
          <button class="button-dashed">绑定</button>
        </div>
      </div>
    </div>
    <!-- end box body -->
  </div>
</template>
<script>
export default {
  name: "Bind",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.bind {
  padding: 20px;
  .body {
    .block {
      margin: 10px 0;
      padding: 10px;
      background-color: #ccc;
      display: grid;
      grid-template-columns: 40px 2fr 1fr 6fr;
      align-items: center;
      .handle {
        text-align: right;
      }
    }
  }
}
</style>
