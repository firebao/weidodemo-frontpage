<template>
  <div>
    <simple-header title="用户注册" type="register"></simple-header>
    <main>
      <div class="main-container">
        <div class="register-container">
          <form action="">
            <div class="label">
              <label for="phone-number">手机号码</label>
            </div>
            <div class="input-group">
              <span class="icon">
                <icon-svg class="i20" icon-class="mobile"></icon-svg>
              </span>
              <input type="text" placeholder="输入您的手机号码" />
            </div>
            <div class="label">
              <label for="captcha">动态验证码</label>
            </div>
            <div class="input-group">
              <span class="icon">
                <icon-svg class="i20" icon-class="captcha"></icon-svg>
              </span>
              <input type="text" placeholder="手机动态验证码" />
            </div>
            <div class="label">
              <label for="password">创建密码</label>
            </div>
            <div class="input-group">
              <span class="icon">
                <icon-svg class="i20" icon-class="captcha"></icon-svg>
              </span>
              <input type="text" placeholder="输入8-16位密码" />
            </div>
            <div class="label">
              <label for="repassword">确认密码</label>
            </div>
            <div class="input-group">
              <span class="icon">
                <icon-svg class="i20" icon-class="captcha"></icon-svg>
              </span>
              <input type="text" placeholder="请重新输入您的密码" />
            </div>
            <button type="submit">同意以下协议并注册</button>
            <div class="agreement">
              <router-link to="/user-agreement">
                《围兜用户协议》
              </router-link>
              <router-link to="/privacy-agreement">
                《围兜隐私协议》
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import SimpleHeader from "@/components/TheSimpleHeader";
export default {
  name: "Register",
  components: {
    SimpleHeader
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
div {
  main {
    height: 100%;
    .login-container,
    .register-container {
      padding: 10px;
      width: 320px;
      margin: 150px auto 0;

      .about-password {
        margin-top: 10px;
      }

      button {
        width: 100%;
        margin-top: 30px;
        height: 40px;
        color: white;
        background-color: #199ed8;
        opacity: 0.7;
        border-radius: 5px;
        border: 1px solid #ccc;
      }

      p.tips {
        margin-top: 10px;
        font-size: 12px;
        color: $secondary-text-color;
      }

      .third-login {
        margin-top: 40px;
      }
      .oauthLoginFrame {
        height: 600px;
        width: 100%;
        border: none;
        //overwrite qq authorization page style
        .float_left {
          float: none;
        }
      }
    }
  }
}
</style>
