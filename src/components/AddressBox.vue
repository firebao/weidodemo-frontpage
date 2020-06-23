<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/components/AddressBox.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: 地址栏组件
#        Create: 2020-06-22 22:12:58
# Last Modified: 2020-06-22 22:12:58
#***********************************************
-->
<template>
  <div class="address-box">
    <!-- address box title -->
    <div class="box-title">
      <div class="tag">
        <icon-svg iconClass="tag" class="i20"></icon-svg>
        <div class="tag-name">家</div>
      </div>
      <div class="close">
        <icon-svg iconClass="close" class="i20"></icon-svg>
      </div>
    </div>
    <!--end address box title -->
    <!-- address box info -->
    <div class="box-info">
      <div class="label">收货人</div>
      <div class="value">XXX</div>
      <div class="label">所在地区</div>
      <div class="value">XXX市XXX区</div>
      <div class="label">地址</div>
      <div class="value">XXX小区XXX楼XXX-XXX</div>
      <div class="label">移动电话</div>
      <div class="value">123*****321</div>
      <div class="label">备用电话</div>
      <div class="value"></div>
    </div>
    <!-- end address box info -->
    <!-- address box handle -->
    <div class="box-handle">
      <button class="button-dashed">设为默认</button>
      <button class="button-dashed">编辑</button>
    </div>
    <!-- end address box handle -->
  </div>
</template>
<script>
export default {
  name: "AddressBox",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.address-box {
  position: relative;
  border: 2px solid #ccc;
  padding: 20px;
  margin-top: 20px;
  //address box title
  .box-title {
    display: flex;
    justify-content: space-between;
    .tag {
      display: flex;
    }
    .close {
      float: right;
    }
  }
  //address box info
  .box-info {
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: repeat(5, 1fr);
    .label {
      text-align: right;
    }
    .value {
      font-size: 12px;
      color: $secondary-text-color;
      text-align: left;
      padding-left: 20px;
    }
  }
  //address-box-handle
  .box-handle {
    position: absolute;
    bottom: 20px;
    right: 20px;
    button {
      margin-left: 20px;
    }
  }
}
</style>
