<template>
  <div>
    <!-- weido商城Header组件 -->
    <mall-header></mall-header>
    <!-- end Header-->
    <!-- weido商城主页面 -->
    <main>
      <section class="main">
        <div class="main-container rel-div">
          <div class="img-bg">
            <img :src="require('@/assets/bg.png').default" alt=".." />
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
export default {
  data() {
    return {};
  },
  components: {
    MallHeader,
    MallFooter,
    SvgMenu,
    SubMenu
  }
};
</script>
<style scoped lang="scss">
section.main {
  position: relative;

  .img-bg {
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    width: 100%;
    z-index: -1;

    img {
      width: 715px;
      height: 715px;
      opacity: 0.25;
    }
  }
}
</style>
