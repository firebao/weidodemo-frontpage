<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/components/TheFooter.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: TheFooter组件
#        Create: 2020-07-17 12:19:54
# Last Modified: 2020-07-17 12:19:54
#***********************************************
-->
<template>
  <footer class="main-footer">
    <div class="main-container">
      <!-- footer 上栏 -->
      <div class="footer-top-row">
        <address class="box info">
          <base-logo logoType="complex"></base-logo>
          <ul>
            <li><strong>地址：</strong>XX市XX区XX街道XX号</li>
            <li><strong>邮箱：</strong>abc@def.com</li>
            <li><strong>电话：</strong>+086-0943-8563737</li>
          </ul>
        </address>
        <div class="footer-columns">
          <div
            v-for="(item, index) in footerInfo"
            class="box footer-column"
            :key="index"
          >
            <div class="column-title">
              {{ item.name }}
            </div>
            <ul>
              <li v-for="(subItem, subIndex) in item.subNav" :key="subIndex">
                <router-link :to="subItem.url">{{ subItem.name }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- end footer 上栏 -->
      <!-- footer 上栏 -->
      <div class="footer-bot-row">
        <div class="box copy-right">
          <base-logo></base-logo>
          <p>Copyright:2019-2028,围兜网weido.com.All rights reserved.</p>
          <p>京ICP备XXXXXXXX号-X</p>
        </div>
        <div class="box qr-code">
          <div class="qr-item">
            <p>安卓app</p>
            <img :src="require('@/assets/qr-code.png')" alt="" />
          </div>
          <div class="qr-item">
            <p>苹果app</p>
            <img :src="require('@/assets/qr-code.png')" alt="" />
          </div>
          <div class="qr-item">
            <p>微信公众号</p>
            <img :src="require('@/assets/qr-code.png')" alt="" />
          </div>
        </div>
      </div>
      <!-- end footer 下栏 -->
    </div>
  </footer>
</template>
<script>
import BaseLogo from "@/components/BaseLogo";
import { GET_FOOTER_INFO } from "@/utils/request/requestTypes";
import ClientData from "@/utils/clientData/clientData";
/**
 * TheFooter组件,页面中用到的Logo
 * @vuedoc
 * @exports component/BaseLogo
 */
export default {
  name: "TheFooter",
  data: function() {
    /**
     * 页脚的链接信息数组
     */
    return {
      footerInfo: null
    };
  },
  components: {
    BaseLogo
  },
  created() {
    const clientData = ClientData.getStorage("session");
    if (!clientData.has("footer-info")) {
      this.$Http[GET_FOOTER_INFO]()
        .then(res => {
          this.footerInfo = res.data;
          clientData.setItem("footer-info", this.footerInfo);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.footerInfo = clientData.getItem("footer-info");
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/css/base.scss";
@import "@/assets/css/layout.scss";
.main-footer {
  padding: 30px 0;
  background-color: $bg-color;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.25);
  .footer-top-row,
  .footer-bot-row {
    @include flex-layout($justify-content: space-between);
  }
  .box {
    box-shadow: 0 0 5px #ccc;
    border-radius: 10px;
  }
  .footer-top-row {
    .info {
      position: relative;
      width: 300px;
      padding: 10px;
      background-color: #999999;
      font-style: initial;
      ul {
        padding: 10px;
      }
    }
    .footer-columns {
      @include flex-layout($justify-content: space-between);
      .footer-column {
        text-align: center;
        padding: 10px;
        width: 150px;
        height: 145px;
        background-color: #ccc;
        margin-left: 15px;
        .column-title {
          font-weight: 900;
        }
        ul {
          padding: 10px 0;
          a {
            color: #666;
            &:hover {
              color: $accent-color;
            }
          }
        }
      }
    }
  }
  .footer-bot-row {
    margin-top: 40px;
    height: 100px;
    .copy-right {
      position: relative;
      width: 500px;
      height: 100px;
      background-color: #999;
      padding: 10px;
    }
    p {
      font-size: 1.2rem;
    }
    .qr-code {
      @include flex-layout($justify-content: space-around);
      padding: 10px;
      width: 600px;
      height: 100px;
      background-color: #999;
      .qr-item {
        @include flex-layout();
        p {
          padding-right: 5px;
          font-weight: 900;
        }
        img {
          width: 70px;
          height: 70px;
        }
      }
    }
  }
}
</style>
