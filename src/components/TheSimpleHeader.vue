<template>
  <header class="flex h-between v-middle">
    <div class="logo flex v-middle">
      <base-logo></base-logo>
      <span class="title">{{ title }}</span>
    </div>
    <div class="hint">
      <p class="flex v-middle" v-if="type === 'register'">
        已有账号?
        <router-link to="/user/login" class="button-dashed">登录</router-link>
      </p>
      <p class="flex v-middle" v-else-if="type === 'loginPass'">
        没有账号?
        <router-link to="/user/register" class="button-dashed">
          注册
        </router-link>
      </p>
      <p class="flex v-middle" v-else-if="type === 'loginCaptcha'">
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
export default {
  name: "TheSimpleHeader",
  props: {
    title: {
      type: String,
      required: true
    },
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
<style scoped lang="scss">
header {
  height: 80px;
  width: 100%;
  padding: 0 20px;
  border-bottom: 2px solid #ccc;

  .logo {
    span {
      font-size: 20px;
      font-weight: 600;
      padding: 10px;
    }
  }

  .hint {
    p {
      .button-dashed {
        margin-left: 5px;
      }
    }
  }
}
</style>
