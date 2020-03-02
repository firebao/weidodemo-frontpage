<template>
  <div class="menu-block" v-show="mainMenuActive">
    <div class="menu-caption">
      <h2 class="menu-title flex">
        <icon-svg :icon-class="categoryIcon" class="i20"></icon-svg>
        {{ activeCategory }}
      </h2>
      <div class="sub-list">
        <div
          class="sub-category"
          v-for="(item, index) in subCategory"
          :key="index"
        >
          <router-link :to="item.url">
            <span class="c2-name">
              {{ item.name }}
            </span>
          </router-link>
          <ul class="sub-list flex wrap">
            <li v-for="(subItem, subIndex) in item.c3" :key="subIndex">
              <router-link :to="subItem.url">
                {{ subItem.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="menu-img">
      <img alt="" src="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "subMenu",
  data: function() {
    return {
      category: {}
    };
  },
  mounted: async function() {
    //获取商品分类数据
    this.category = await this.$Http.getCategory();
  },
  computed: {
    activeCategory: function() {
      let category = this.$store.state.menu.activeCategory;
      let value = "";
      if (category != "") {
        value = this.category[category].name;
      }
      return value;
    },
    categoryIcon: function() {
      let category = this.$store.state.menu.activeCategory;
      let icon = "";
      if (category != "") {
        icon = this.category[category].icon;
      }
      return icon;
    },
    subCategory: function() {
      let category = this.$store.state.menu.activeCategory;
      let subMenu = [];
      if (category != "") {
        subMenu = this.category[category].c2;
      }
      return subMenu;
    },
    mainMenuActive: function() {
      return this.$store.state.menu.mainMenuActive;
    }
  },
  methods: {}
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.menu-block {
  position: absolute;
  top: 50px;
  right: 0;
  height: 600px;
  width: 600px;
  padding: 30px 20px 0;
  border: 1px solid $aux-color-green-var1;
  border-radius: 5px;
  background-color: $bg-color;
  .menu-title {
    font-size: 16px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    position: relative;
    color: $text-color;
    border-bottom: 2px solid $aux-color-green-var1;
  }
  .sub-list {
    padding-left: 10px;
    margin-bottom: 10px;
    .sub-category {
      border-bottom: 1px solid #eee;
      padding-top: 5px;
      .c2-name {
        border: 1px dashed #ccc;
        padding: 2px 5px;
        margin-bottom: 5px;
        color: $text-color;
      }
    }
    li {
      font-size: 14px;
      padding: 0 8px;
    }
  }
  .menu-img {
    height: 150px;
    position: relative;
    text-align: center;
  }
}
</style>
