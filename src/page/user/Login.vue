<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/page/user/Login.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: Login用户登录页面
#        Create: 2020-07-09 16:43:24
# Last Modified: 2020-07-09 16:43:24
#***********************************************
-->
<template>
  <div>
    <!-- 适用于登录注册页面的header -->
    <simple-header title="用户登录" :type="loginType"></simple-header>
    <!-- end 适用于登录注册页面的header -->
    <main>
      <div class="main-container">
        <div class="login-container">
          <transition
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutLeft"
            mode="out-in"
          >
            <!-- 手机验证码登录 -->
            <base-form
              ref="loginCaptcha"
              v-if="loginType === 'loginCaptcha'"
              key="l-c"
              autofocus
            >
              <template v-slot:handler>
                <a class="button-dashed" @click="loginPass">
                  切换为手机+密码登录
                </a>
              </template>
              <input-group
                key="c-m"
                v-model="mobile"
                prop="mobile"
                icon="mobile"
                label="手机号码"
                placeHolder="输入您的手机号码"
                name="mobile"
                id="mobile"
                type="tel"
                ref="mobile"
              >
              </input-group>
              <input-group
                key="c-c"
                v-model="captcha"
                prop="captcha"
                icon="captcha"
                label="动态验证码"
                placeHolder="手机动态验证码"
                name="captcha"
                id="captcha"
                type="text"
              >
                <template v-slot:default="slotProps">
                  <a
                    class="button-captcha"
                    :disabled="!mobileState"
                    :class="slotProps.flag ? 'move-left' : ''"
                    @click="handleSendCode"
                  >
                    获取验证码
                  </a>
                </template>
              </input-group>
              <button type="submit" @click.prevent="doLogin">登录</button>
              <p class="tips">
                提示：未注册围兜账号的手机号，登录时将自动注册围兜账号，且代表您同意
                <router-link class="inline" to="/user-agreement">
                  《围兜网用户协议》
                </router-link>
              </p>
              <div class="third-login flex v-middle h-between">
                <span>第三方登录</span>
                <span class="flex" @click="handleOauthLogin('qq')">
                  <icon-svg class="i20" icon-class="qq"></icon-svg>
                </span>
                <span class="flex" @click="handleOauthLogin('weixin')">
                  <icon-svg class="i20" icon-class="weixin"></icon-svg>
                </span>
                <span class="flex" @click="handleOauthLogin('weibo')">
                  <icon-svg class="i20" icon-class="weibo"></icon-svg>
                </span>
              </div>
              <!-- 滑块验证dialog -->
              <base-dialog
                v-model="dialogShow"
                :closable="false"
                title="请向右拖动滑块完成验证"
                :footerHide="true"
                width="450"
              >
                <div class="flex h-middle">
                  <slide-verification
                    v-model="verifyFlag"
                    @verify-ok="handleVerifyOk"
                  >
                  </slide-verification>
                </div>
              </base-dialog>
              <!-- end 滑块验证dialog -->
            </base-form>
            <!-- end 手机验证码登录 -->
            <!-- 账号密码登录 -->
            <base-form
              ref="loginPass"
              method="post"
              v-if="loginType === 'loginPass'"
              key="l-p"
            >
              <template v-slot:handler :value="dialogShow">
                <a class="button-dashed" @click="loginCaptcha">
                  切换为手机+验证码登录
                </a>
              </template>
              <input-group
                key="p-m"
                v-model="mobile"
                prop="mobile"
                icon="mobile"
                label="手机号码"
                placeHolder="输入您的手机号码"
                name="mobile"
                id="mobile"
                type="tel"
              >
              </input-group>
              <input-group
                key="p-p"
                v-model="password"
                prop="password"
                icon="password"
                label="密码"
                placeHolder="8-16位注册密码"
                name="password"
                id="password"
                type="password"
              >
              </input-group>
              <div class="about-password flex h-between">
                <i-checkbox>&nbsp;记住密码</i-checkbox>
                <router-link to="/forgetPass">忘记密码</router-link>
              </div>
              <button type="submit" @click.prevent="doLogin">登录</button>
              <div class="third-login flex h-between v-middle">
                <span>第三方登录</span>
                <span class="flex">
                  <icon-svg class="i20" icon-class="qq"></icon-svg>
                </span>
                <span class="flex">
                  <icon-svg class="i20" icon-class="weixin"></icon-svg>
                </span>
                <span class="flex">
                  <icon-svg class="i20" icon-class="weibo"></icon-svg>
                </span>
              </div>
            </base-form>
            <!-- end 账号密码登录 -->
          </transition>
          <!-- 第三方登录弹出层 -->
          <base-dialog
            v-model="oauthShowOrHide"
            :title="oauthLoginObject.title"
            width="1000"
          >
            <iframe
              class="oauthLoginFrame"
              :id="oauthLoginObject.id"
              :src="oauthLoginObject.url"
            ></iframe>
          </base-dialog>
          <!-- end第三方登录弹出层 -->
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import SimpleHeader from "@/components/TheSimpleHeader";
import InputGroup from "@/components/BaseInputGroup";
import BaseForm from "@/components/BaseForm";
import BaseDialog from "@/components/BaseDialog";
import SlideVerification from "@/components/SlideVerification";
import { createNamespacedHelpers } from "vuex";
import { Checkbox } from "view-design";
import dayjs from "dayjs";
import { LOGIN } from "@/store/mutationTypes";
import { SEND_CMS_CODE } from "@/utils/request/requestTypes";

const { mapMutations } = createNamespacedHelpers("user");

/**
 * 用户登录页面
 * @vuedoc
 * @exports page/Home
 */
export default {
  name: "Login",
  data() {
    return {
      /**
       * 手机号码，与手机号码输入框绑定
       */
      mobile: "",
      /**
       * 手机号码验证状态
       */
      mobileValidateState: "",
      /**
       * 手机验证码，与手机号码验证码输入框绑定
       */
      captcha: "",
      /**
       * 密码，与密码输入框绑定
       */
      password: "",
      /**
       * 登录类型，分为验证码登录与账号密码登录
       */
      loginType: "loginCaptcha",
      /**
       * 滑块验证弹层显示
       */
      dialogShow: false,
      /**
       * 验证标识
       */
      verifyFlag: false,
      slideVerification: false,
      currentForm: "",
      oauthLoginObject: {},
      oauthShowOrHide: false,
      oauthType: "",
      oauthQQAppId: "",
      oauthQQScope: "",
      oauthWeixinAppId: "",
      oauthWeixinScope: "",
      oauthWeiboAppId: "",
      oauthRediectUrl: "",
      oauthState: ""
    };
  },
  computed: {
    mobileState() {
      return this.$refs.mobile.validateState;
    }
  },
  watch: {
    oauthType: function(oauthType) {
      let object = {};
      switch (oauthType) {
        case "qq":
          object.title = "QQ登录";
          object.id = "oauth-qq";
          object.url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${this.oauthQQAppId}&redirect_uri=${this.oauthRediectUrl}&scope=${this.oauthQQScope}`;
          break;
        case "weixin":
          object.title = "微信登录";
          object.id = "oauth-weixin";
          object.url = `https://open.weixin.qq.com/connect/qrconnect?appid=${this.oauthWeixinAppId}&redirect_uri=${this.oauthRediectUrl}&response_type=code&scope=${this.oauthWeixinScope}&state=${this.oauthState}#wechat_redirect`;
          break;
        case "weibo":
          object.title = "微博登录";
          object.id = "oauth-weibod";
          object.url = `https://api.weibo.com/oauth2/authorize?client_id=${this.oauthWeiboAppId}&response_type=code&redirect_uri=${this.oauthRediectUrl}`;
          break;
        default:
          object.title = "";
          object.id = "";
          object.url = "";
      }
      debugger;
      this.oauthLoginObject = object;
    }
  },
  methods: {
    ...mapMutations({
      storeToken: LOGIN
    }),
    /**
     * 设置登录模式为手机+密码
     * @return: void
     */
    loginPass: function() {
      this.loginType = "loginPass";
    },
    /**
     * 设置登录模式为手机+验证码
     * @return: void
     */
    loginCaptcha: function() {
      this.loginType = "loginCaptcha";
    },
    /**
     * @desc: 发送验证码按键点击事件
     * @return: void
     */
    handleSendCode: function() {
      this.setDialogShow(true);
    },
    /**
     * @desc: 滑块验证弹出框显示影藏切换
     * @param: {bool} value
     * @return: void
     */
    setDialogShow(value) {
      this.dialogShow = value;
    },
    /**
     * @desc: 滑块验证成功
     * @return: void
     */
    handleVerifyOk() {
      this.setDialogShow(false);
      this.sendCode();
    },
    /**
     * @desc: 发送短信验证码
     * @return: void
     */
    sendCode() {
      const data = {
        mobile: this.mobile.replace(/\s+/g, "")
      };
      this.$Http[SEND_CMS_CODE](data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @desc: 登录操作
     * @return: void
     */
    doLogin: async function() {
      //表单验证
      let result = await this.$refs[this.loginType].validate();
      if (!result) return;
      //axios发送登录请求
      let data = {};
      let res;
      data.mobile = this.mobile.replace(/\s+/g, "");
      if (this.loginType === "loginPass") {
        data.password = this.password;
        res = await this.$Http.login(data);
      } else if (this.loginType === "loginCaptcha") {
        data.captcha = this.captcha;
        res = await this.$Http.loginMobile(data);
      }
      if (res) {
        //vuex存储token
        let newTime = Math.round(new Date() / 1000);
        let payload = {
          token: res.token,
          expiresTime: dayjs(res.expires_time) - newTime
        };
        this.storeToken(payload);
        setTimeout(this.$router.go(-1), 2000);
      }
    },
    //handle Oauth2 third-party login
    handleOauthLogin: function(type) {
      if (["qq", "weixin", "weibo"].indexOf(type) !== -1) {
        this.oauthType = type;
        this.oauthShowOrHide = true;
      }
    }
  },
  components: {
    "i-checkbox": Checkbox,
    SimpleHeader,
    InputGroup,
    BaseForm,
    BaseDialog,
    SlideVerification
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
        cursor: pointer;
      }

      p.tips {
        margin-top: 10px;
        font-size: 12px;
        color: $secondary-text-color;
      }

      .third-login {
        margin-top: 40px;
        .flex {
          cursor: pointer;
        }
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
