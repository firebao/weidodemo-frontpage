import { mapState } from "vuex";
import { Checkbox } from "view-design";
import SimpleHeader from "@/components/TheSimpleHeader";
import InputGroup from "@/components/BaseInputGroup";
import BaseForm from "@/components/BaseForm";
import BaseDialog from "@/components/BaseDialog";
import SlideVerification from "@/components/SlideVerification";

export default {
  name: "Login",
  data: function() {
    return {
      mobile: "",
      mobileValidateState: "",
      captcha: "",
      password: "",
      loginType: "loginCaptcha",
      dialogShow: false,
      verifyFlag: false,
      slideVerification: false,
      currentForm: "",
      //third-party ligin data,
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
    ...mapState({
      mobileState: state => state.login.mobileValidateState
    })
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
    //change login type to mobile and password
    loginPass: function() {
      this.loginType = "loginPass";
    },
    //chage login type to mobile and captcha
    loginCaptcha: function() {
      this.loginType = "loginCaptcha";
    },
    //the handler function on the button send code clicked
    handleSendCode: function() {
      this.setDialogShow(true);
    },
    //this function show or hide the slide verificition dialog
    setDialogShow(value) {
      this.dialogShow = value;
    },
    //the handler function on the slide verification success
    handleVerifyOk: function() {
      this.setDialogShow(false);
      this.$store.commit("setSendCoteState", "verifySuccess");
      this.sendCode();
    },
    //axios send cms code
    sendCode: async function() {
      let data = {};
      data.mobile = this.mobile;
      let res = await this.$Http.sendCmsCode(data);
      console.log(res);
    },
    //axios login action
    doLogin: async function() {
      //do form validate
      let result = await this.$refs[this.loginType].validate();
      if (!result) return;
      let data = {};
      data.loginType = this.loginType;
      data.mobile = this.mobile;
      data.captcha = this.captcha;
      data.password = this.password;
      let res = await this.$Http.doLogin(data);
      //router go back
      if (res.status === "success") {
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
