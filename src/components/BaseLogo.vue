<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/components/BaseLogo.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: BaseLogo 组件
#        Create: 2020-07-17 10:36:35
# Last Modified: 2020-07-17 10:36:35
#***********************************************
-->
<template>
  <div class="main-logo">
    <router-link to="/" v-if="logoType === 'single'">
      <icon-svg class="i40" icon-class="logo"></icon-svg>
      <h1>
        Weido
      </h1>
    </router-link>
    <router-link to="/" v-else>
      <icon-svg class="i40" icon-class="logo"></icon-svg>
      <p class="big">WeiDo</p>
      <p class="small">we will do what you need</p>
    </router-link>
  </div>
</template>
<script>
/**
 * BaseLogo组件,页面中用到的Logo
 * @vuedoc
 * @exports component/BaseLogo
 */
export default {
  name: "BaseLogo",
  props: {
    /**
     * logo的类型，有single和complex两种类型
     * single类型指logo右边仅有weido文字
     * complex类型指logo右边不仅有weido文字还有we will do what you need的小字
     */
    logoType: {
      type: String,
      default: "single",
      validator: function(value) {
        return ["single", "complex"].indexOf(value) !== -1;
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/base.scss";
.main-logo {
  position: relative;

  a {
    height: 40px;
    display: flex;

    &:hover {
      svg {
        use {
          --hover-color: #7fba00;
        }
      }
      h1,
      p,
      small {
        color: $accent-color;
      }
    }

    h1 {
      color: $text-color;
      font-size: 20px;
      font-weight: 900;
      margin: 0 10px;
      line-height: 40px;
    }

    .big {
      position: absolute;
      left: 50px;
      top: 0;
      color: $text-color;
      font-size: 16px;
      font-weight: 900;
    }

    .small {
      position: absolute;
      left: 50px;
      top: 20px;
      color: $secondary-text-color;
      font-weight: 600;
    }
  }
}
</style>
