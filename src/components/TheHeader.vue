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
  <header ref="header" class="main-header">
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
  </header>
</template>
<script>
import BaseLogo from "@/components/BaseLogo";
import { GET_NAV } from "@/utils/request/requestTypes";
import ClientData from "@/utils/clientData/clientData";

/**
 * Header组件，页面中公共的Header，个别页面除外（如登录、注册页面）
 * @vuedoc
 * @exports component/TheHeader
 */
export default {
  name: "Header",
  data: function() {
    return {
      /**
       * 导航信息对象数组,导航信息对象包含type、name、url属性
       * type:  导航对象类型 现只有mainNav，此属性保留用来扩展主导航下有子导航的情况
       * name:  导航显示文本
       * url:   导航跳转的链接
       */
      nav: null
    };
  },
  components: {
    BaseLogo
  },
  methods: {
    /**
     * 页面滚动触发事件，header的类名发生改变
     * 滚动超过5，增加is-sticky类名，否则去除
     * @return: {undefined} 'undefined'
     */
    scrollHandle() {
      const top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      const header = this.$refs.header;
      if (top > 5) {
        header.classList.add("is-sticky");
      } else {
        header.classList.remove("is-sticky");
      }
    }
  },
  created() {
    const clientData = ClientData.getStorage("session");
    if (!clientData.has("nav")) {
      this.$Http[GET_NAV]()
        .then(res => {
          this.nav = res.data;
          clientData.setItem("nav", this.nav);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.nav = clientData.getItem("nav");
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scrollHandle);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollHandle);
  }
};
</script>
<style lang="scss">
@import "@/assets/css/base.scss";
@import "@/assets/css/layout.scss";
.main-header {
  padding: 40px;
  position: static;
  transition: all 0.4s ease-in-out 0s;
  @include flex-layout($justify-content: space-between);

  &.is-sticky {
    padding: 20px;
    background-color: $bg-color;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
  }

  nav {
    li {
      display: inline-block;
      margin: 0 10px;
      a {
        position: relative;
        padding: 10px;
        font-weight: 900;
        font-size: 16px;
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
</style>
