<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/page/Home.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: Home主页
#        Create: 2020-07-15 18:04:04
# Last Modified: 2020-07-15 18:04:04
#***********************************************
-->
<template>
  <div>
    <!-- Header Nav -->
    <mall-header></mall-header>
    <!-- end Header Nav-->
    <!-- weido商城主页面 -->
    <main>
      <section class="main">
        <div class="main-container rel-div">
          <div class="img-bg">
            <img :src="require('@/assets/bg.png')" alt=".." />
          </div>
          <svg-menu></svg-menu>
          <sub-menu></sub-menu>
        </div>
      </section>
    </main>
    <!-- end main -->
    <!-- weido商城Footer组件 -->
    <mall-footer></mall-footer>
    <!-- end Footer -->
  </div>
</template>
<script>
import MallHeader from "@/components/TheHeader.vue";
import MallFooter from "@/components/TheFooter.vue";
import SvgMenu from "@/components/TheSvgMenu.vue";
import SubMenu from "@/components/TheSubMenu.vue";

/**
 * Home页面，首页
 * @vuedoc
 * @exports page/Home
 */
export default {
  name: "Home",
  components: {
    MallHeader,
    MallFooter,
    SvgMenu,
    SubMenu
  }
};
</script>
<style lang="scss">
.main {
  position: relative;

  .img-bg {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    z-index: -1;

    img {
      width: 715px;
      height: 715px;
      opacity: 0.25;
    }
  }
}
</style>
