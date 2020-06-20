<template>
  <div class="account-security">
    <div class="security-header">
      <div class="icon">
        <icon-svg iconClass="safety" class="i80"></icon-svg>
      </div>
      <div class="info">
        <div class="grade">安全等级：一般</div>
        <div class="tip">您与安全达人仅一步之遥</div>
      </div>
      <div class="nav">
        <span>修改登录密码</span>
        <span>设置手机号</span>
        <span>设置邮箱</span>
        <span>账号锁定</span>
      </div>
    </div>
    <div class="security-detail item-box">
      <div class="telephone item-box">
        <icon-svg iconClass="mobile" class="i40"></icon-svg>
        <div class="title">手机号</div>
        <div class="tips">158*****210</div>
        <button>修改手机号</button>
      </div>
      <div class="login-password item-box">
        <icon-svg iconClass="password" class="i40"></icon-svg>
        <div class="title">登录密码</div>
        <div class="tips">定期更换密码有助于账号安全</div>
        <button>修改登录密码</button>
      </div>
      <div class="pay-password item-box">
        <icon-svg iconClass="paypass" class="i40"></icon-svg>
        <div class="title">支付密码</div>
        <div class="tips">支付密码有效保证您的资产安全</div>
        <button>设置支付密码</button>
      </div>
      <div class="email item-box">
        <icon-svg iconClass="email" class="i40"></icon-svg>
        <div class="title">邮箱</div>
        <div class="tips">设置邮箱有助于您的账号易用</div>
        <button>绑定邮箱</button>
      </div>
      <div class="login-protection item-box">
        <icon-svg iconClass="protection" class="i40"></icon-svg>
        <div class="title">登录保护</div>
        <div class="tips">登录保护服务未开启</div>
        <button>开启登录保护</button>
      </div>
      <div class="certificate item-box">
        <icon-svg iconClass="certificate" class="i40"></icon-svg>
        <div class="title">数字证书</div>
        <div class="tips">为您的账号安全保驾护航</div>
        <button>管理数字证书</button>
      </div>
      <div class="real-name-auth item-box">
        <icon-svg iconClass="real-name-auth" class="i40"></icon-svg>
        <div class="title">实名认证</div>
        <div class="tips">账号未实名认证</div>
        <button>启用实名认证</button>
      </div>
      <div class="password-protection item-box">
        <icon-svg iconClass="pass-protection" class="i40"></icon-svg>
        <div class="title">密码保护</div>
        <div class="tips">开启有助于您快速通过安全验证</div>
        <button>启用密码保护</button>
      </div>
      <div class="account-appeal item-box">
        <icon-svg iconClass="appeal" class="i40"></icon-svg>
        <div class="title"></div>
        <div class="tips">手机、密码问题找申诉</div>
        <button>账号申诉</button>
      </div>
      <div class="account-lock item-box">
        <icon-svg iconClass="lock" class="i40"></icon-svg>
        <div class="title"></div>
        <div class="tips">关闭低频客户端防止账号被盗</div>
        <button>账号锁定管理</button>
      </div>
      <div class="account-unregister item-box">
        <icon-svg iconClass="unregister" class="i40"></icon-svg>
        <div class="title"></div>
        <div class="tips">彻底关闭不再使用的围兜账号</div>
        <button>账号注销</button>
      </div>
      <div class="account-authorization item-box">
        <icon-svg iconClass="authorization" class="i40"></icon-svg>
        <div class="title"></div>
        <div class="tips">绑定、解绑qq、微信、微博账号</div>
        <button>账号授权管理</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AccountSecurity",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.account-security {
  padding: 20px;
  .security-header {
    height: 120px;
    padding: 10px;
    background: #f6f7f2;
    display: grid;
    grid-template-columns: 100px 200px 1fr;
    grid-column-gap: 20px;
    align-items: center;
    .icon {
      text-align: center;
    }
    .info {
      text-align: left;
      .grade {
        color: $secondary-text-color;
        font-size: 20px;
        font-weight: 600;
      }
      .tip {
        color: $alternate-text-color;
      }
    }
    .nav {
      color: $secondary-text-color;
      font-weight: 600;
      font-size: 16px;
      display: inline-flex;
      justify-content: space-around;
      cursor: pointer;
    }
  }
  .security-detail {
    display: grid;
    padding-top: 20px;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 220px);
    grid-gap: 40px 20px;
    .item-box {
      padding: 20px;
      text-align: center;
      border: 2px solid #ccc;
      box-shadow: 5px 5px 2px 3px #eee;
      .title {
        color: $secondary-text-color;
        margin-top: 15px;
        padding: 10px 0 5px 0;
        font-weight: 600;
      }
      .tips {
        color: $alternate-text-color;
        font-size: 12px;
        padding: 5px 0;
      }
      button {
        margin-top: 15px;
        padding: 5px 30px;
        background-color: white;
        cursor: pointer;
        border: 2px solid #ccc;
        color: $secondary-text-color;
        &:hover {
          border-color: $accent-color;
          color: $accent-color;
        }
      }
    }
  }
}
</style>
