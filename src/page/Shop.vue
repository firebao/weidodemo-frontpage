<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/page/Shop.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: 购物页面
#        Create: 2020-08-01 22:34:12
# Last Modified: 2020-08-01 22:34:12
#***********************************************
-->
<template>
  <div>
    <mall-header></mall-header>
    <main>
      <div class="main-container">
        <!-- top section -->
        <section class="top-section">
          <div class="flex-box">
            <div class="my-location">
              <icon-svg class="i16" icon-class="location"></icon-svg>
              <p>
                当前位置：
                <span>{{ locationInfo.detail }}</span>
              </p>
              <router-link class="button-dashed" to="/location">
                切换位置
              </router-link>
            </div>
            <div class="user-center">
              <router-link class="button-dashed" to="/user/login">
                登录
              </router-link>
              <router-link class="button-dashed" to="/user/register">
                注册
              </router-link>
              <router-link class="button-dashed" to="/user">
                我的小家
              </router-link>
            </div>
          </div>
        </section>
        <!-- end top section -->
        <!-- 分类与搜索 -->
        <section class="category-and-search">
          <div class="flex-box">
            <div class="category">
              <icon-svg class="i16" icon-class="category"></icon-svg>
              <p>商家分类：</p>
              <ul>
                <li>蔬菜</li>
                <li>水果</li>
                <li>肉禽蛋奶</li>
                <li>海鲜水产</li>
                <li>冷冻速食</li>
                <li>米面粮油/调味品</li>
                <li>厨房周边</li>
              </ul>
            </div>
            <div class="search">
              <i-input search enter-button placeholder="您要搜素的商品或店铺" />
            </div>
          </div>
        </section>
        <!-- end the category and search section -->
        <!-- the shop  list section -->
        <section class="shop-list">
          <div class="flex-box space-between wrap">
            <shop-item v-for="item in shopList" v-bind:key="item"></shop-item>
          </div>
        </section>
        <!-- end good list section -->
      </div>
    </main>
    <mall-footer></mall-footer>
  </div>
</template>
<script>
import ShopItem from "@/components/ShopItem";
import MallHeader from "@/components/TheHeader";
import MallFooter from "@/components/TheFooter";
import { createNamespacedHelpers } from "vuex";

const { mapState } = createNamespacedHelpers("user");
/**
 * 购物页面
 * @vuedoc
 * @exports page/Shop
 */
export default {
  name: "Shop",
  data: function() {
    return {
      /**
       * 商家分类
       */
      category: "",
      /**
       * 店铺列表
       */
      shopList: []
    };
  },
  components: {
    ShopItem,
    MallHeader,
    MallFooter
  },
  computed: {
    ...mapState({
      locationInfo: state => state.locationInfo
    })
  },
  created() {
    if (this.locationInfo && this.locationInfo.detail) {
      for (let i = 0; i < 32; i++) {
        this.shopList[i] = i;
      }
    } else {
      this.$router.push({ name: "Location" });
    }
  },
  method: {}
};
</script>
<style lang="scss">
@import "@/assets/css/base.scss";
@import "@/assets/css/layout.scss";

main {
  .flex-box {
    height: 100%;
    @include flex-layout($justify-content: space-between);
  }
  .top-section {
    height: 40px;
    padding: 20px;
    background-color: $primary-color-base;
    border-radius: 5px;
    box-shadow: 0 0 5px 5px $primary-color-base;

    .my-location {
      @include flex-layout($justify-content: flex-start);
      p {
        height: 16px;
        line-height: 16px;
        margin-right: 10px;

        span {
          color: $secondary-text-color;
        }
        .button-dashed {
          height: 20px;
          line-height: 18px;
        }
      }
    }

    .user-center {
      display: inline-flex;

      .button-dashed {
        margin: 0 5px;
      }
    }
  }

  .category-and-search {
    margin-top: 30px;
    padding: 20px;
    height: 125px;
    background-color: $primary-color-base;
    border-radius: 5px;
    box-shadow: 0 0 5px 5px $primary-color-base;
    .category {
      display: inline-flex;

      p {
        height: 16px;
        line-height: 16px;
      }

      ul {
        height: 16px;
        line-height: 16px;
        display: inline-flex;

        li {
          margin: 0 10px;
        }
      }
    }
  }

  .shop-list {
    padding: 20px 0;
  }
}
</style>
