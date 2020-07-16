<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/components/TheHeader.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: Header组件
#        Create: 2020-07-15 18:07:27
# Last Modified: 2020-07-15 18:07:27
#***********************************************
-->
<template>
  <header class="main-header">
    <div class="container-fluid flex v-middle h-between">
      <base-logo></base-logo>
      <nav>
        <ul>
          <li v-for="(item, index) in nav" :key="index">
            <router-link :to="item.url">
              {{ item.name }}
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
import BaseLogo from "@/components/BaseLogo";
import { GET_NAV } from "@/utils/request/requestTypes";
export default {
  data: function() {
    return {
      nav: [{ type: "mainNav", name: "首页", url: "/" }]
    };
  },
  created() {
    //获取主导航数据
    this.$Http[GET_NAV]().then(res => {
      this.nav = res.data;
    });
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandle);
  },
  methods: {
    //scroll事件处理
    scrollHandle: function() {
      let top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let header = document.querySelector(".main-header");
      if (top > 5) {
        header.classList.add("is-sticky");
      } else {
        header.classList.remove("is-sticky");
      }
    }
  },
  components: {
    BaseLogo
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.main-header {
  padding: 40px 10px;
  position: static;
  transition: all 0.4s ease-in-out 0s;
  &.is-sticky {
    background-color: $bg-color;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.25);
    padding: 20px 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }
  .container-fluid {
    padding-right: 15px;
    padding-left: 15px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
  }
  nav {
    ul {
      li {
        display: inline-block;
        margin: 0 10px;
        a {
          font-weight: 900;
          padding: 10px;
          font-size: 16px;
          position: relative;
          color: $text-color;
          &:after {
            content: "";
            height: 5px;
            width: 5px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            transition: 0.4s;
            margin: 0 auto;
            border-radius: 50%;
          }
          &:hover,
          &.router-link-exact-active {
            color: $accent-color;
            &:after {
              background-color: $accent-color;
              bottom: -5px;
              opacity: 1;
            }
          }
        }
      }
    }
  }
}
</style>
