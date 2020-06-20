<template>
  <div>
    <mall-header></mall-header>
    <main>
      <div class="header">
        <div class="main-container flex v-bottom">
          <div class="title">
            我的小家
          </div>
          <div class="breadcrumb">
            我的小家/首页
          </div>
        </div>
      </div>
      <div class="main-container main">
        <div class="sidebar">
          <side-bar></side-bar>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </main>
    <mall-footer></mall-footer>
  </div>
</template>
<script>
import MallHeader from "@/components/TheHeader";
import MallFooter from "@/components/TheFooter";
import SideBar from "@/components/TheUserCenterSidebar";
export default {
  name: "UserCenter",
  data() {
    return {};
  },
  components: {
    MallHeader,
    MallFooter,
    SideBar
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.header {
  //height: 253px;
  background-image: url(../../assets/img/usercenter-header.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  padding: 100px 0;
  display: flex;
  .title {
    padding-right: 40px;
    font-size: 20px;
    font-weight: 600;
  }
  .breadcrumb {
    color: $alternate-text-color;
  }
}
.main {
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-column-gap: 20px;
}
</style>
