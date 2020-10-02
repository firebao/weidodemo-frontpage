<!--
#***********************************************
#
#      Filename: src/components/TheSubMenu.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: SubMenu组件
#        Create: 2020-07-19 09:12:31
# Last Modified: 2020-07-19 09:12:31
#***********************************************
-->
<template>
  <div class="menu-block" v-show="mainMenuActive">
    <div class="menu-caption">
      <h2 class="menu-title">
        <icon-svg :icon-class="categoryIcon" class="i20"></icon-svg>
        {{ activeCategory }}
      </h2>
      <div class="sub-list">
        <div
          class="sub-category"
          v-for="(item, index) in subCategory"
          :key="index"
        >
          <dl>
            <dt>
              <router-link :to="item.url">
                <span class="c2-name">
                  {{ item.name }}
                </span>
              </router-link>
            </dt>
            <dd>
              <ul class="sub-list flex wrap">
                <li v-for="(subItem, subIndex) in item.c3" :key="subIndex">
                  <router-link :to="subItem.url">
                    {{ subItem.name }}
                  </router-link>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="menu-img">
      <img alt="" src="" />
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
import { GET_CATEGORY } from "@/utils/request/requestTypes";
import ClientData from "@/utils/clientData/clientData";
const { mapState } = createNamespacedHelpers("menu");

/**
 * SubMenu组件，HOME页面中SVG SubMenu
 * @vuedoc
 * @exports component/TheSubMenu
 */
export default {
  name: "subMenu",
  data: function() {
    return {
      /**
       * category数据
       */
      category: {}
    };
  },
  created() {
    //获取商品分类数据
    const clientData = ClientData.getStorage("session");
    if (!clientData.has("category")) {
      this.$Http[GET_CATEGORY]()
        .then(res => {
          this.category = res.data;
          clientData.setItem("category", this.category);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.category = clientData.getItem("category");
    }
  },
  computed: {
    ...mapState({
      activeCategoryName: state => state.activeCategory,
      mainMenuActive: state => state.mainMenuActive
    }),
    activeCategory: function() {
      let category = this.activeCategoryName;
      let value = "";
      if (category != "") {
        value = this.category[category].name;
      }
      return value;
    },
    categoryIcon: function() {
      let category = this.activeCategoryName;
      let icon = "";
      if (category != "") {
        icon = this.category[category].icon;
      }
      return icon;
    },
    subCategory: function() {
      let category = this.activeCategoryName;
      let subMenu = [];
      if (category != "") {
        subMenu = this.category[category].c2;
      }
      return subMenu;
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
@import "@/assets/css/layout.scss";
.menu-block {
  width: 700px;
  height: 650px;
  position: absolute;
  top: 0px;
  right: 15px;
  border: 3px solid #9bdf70;
  border-radius: 10px;
  background-image: linear-gradient(
    rgba(240, 251, 235, 0.8),
    rgba(238, 250, 255, 0.8)
  );
  box-shadow: 2px 2px 10px #9bdf70;
  overflow-y: auto;
  .menu-title {
    display: flex;
    padding: 10px 20px;
    font-size: 1.6rem;
    position: relative;
    color: $text-color;
    border-bottom: 2px solid #9bdf70;
  }
  .sub-list {
    .sub-category {
      border-bottom: 1px dashed #9bdf70;
      padding: 10px;
      dl {
        display: grid;
        grid-template-columns: 1fr 8fr;
      }
      .c2-name {
        padding: 2px 5px;
        color: $text-color;
        font-weight: 600;
        &:hover {
          color: $accent-color;
        }
      }
    }
    li {
      padding: 0 8px;
      a {
        color: $secondary-text-color;
        &:hover {
          color: $accent-color;
        }
      }
    }
  }
  .menu-img {
    height: 150px;
    position: relative;
    text-align: center;
  }
}
</style>
