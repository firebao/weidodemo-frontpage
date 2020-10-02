<!--
#***********************************************
#
#      Filename: src/components/TheSimpleHeader.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: 用户登录注册页面的header
#        Create: 2020-08-14 09:48:29
# Last Modified: 2020-08-14 09:48:29
#***********************************************
-->
<template>
  <header>
    <div class="logo">
      <base-logo></base-logo>
      <span class="title">{{ title }}</span>
    </div>
    <div class="hint">
      <p v-if="type === 'register'">
        已有账号?
        <router-link to="/user/login" class="button-dashed">登录</router-link>
      </p>
      <p v-else-if="type === 'loginPass'">
        没有账号?
        <router-link to="/user/register" class="button-dashed">
          注册
        </router-link>
      </p>
      <p v-else-if="type === 'loginCaptcha'">
        提示：未注册围兜账号的手机号，登录时将自动注册围兜账号
      </p>
      <p v-else-if="type === 'forgetPass'">
        <router-link to="/appeal" class="button-dashed">账号申诉</router-link>
      </p>
    </div>
  </header>
</template>
<script>
import BaseLogo from "@/components/BaseLogo";

/**
 * 用户登录页面
 * @vuedoc
 * @exports page/Home
 */
export default {
  name: "TheSimpleHeader",
  props: {
    /**
     * 标题(logo旁显示)
     */
    title: {
      type: String,
      required: true
    },
    /**
     * 类型：账号密码登录、手机验证码登录、注册、忘记密码
     */
    type: {
      type: String,
      validator: function(value) {
        return (
          ["loginPass", "loginCaptcha", "register", "forgetPass"].indexOf(
            value
          ) !== -1
        );
      }
    }
  },
  components: {
    BaseLogo
  }
};
</script>
<style lang="scss">
@import "@/assets/css/base.scss";
@import "@/assets/css/layout.scss";

header {
  height: 80px;
  width: 100%;
  padding: 0 20px;
  border-bottom: 2px solid #ccc;
  @include flex-layout($justify-content: space-between);

  .logo {
    @include flex-layout();
    span {
      font-size: 20px;
      font-weight: 600;
      padding: 10px;
    }
  }

  .hint {
    p {
      @include flex-layout();
      .button-dashed {
        margin-left: 5px;
      }
    }
  }
}
</style>
