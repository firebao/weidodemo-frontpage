<!--
#***********************************************
#
#      Filename: src/page/user/FavGoods.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: FavGoods 关注商品页面
#        Create: 2020-06-29 15:59:52
# Last Modified: 2020-06-29 15:59:52
#***********************************************
-->
<template>
  <div class="fav-goods">
    <div class="box">
      <div class="header">
        <h1>关注商品</h1>
      </div>
      <div class="body">
        <div class="filter">
          <div class="category">
            <span>分类：</span>
            <ul>
              <li>全部商品</li>
              <li>蔬菜</li>
              <li>水果</li>
              <li>肉禽蛋奶</li>
              <li>海鲜水产</li>
              <li>米面粮油/调味品</li>
              <li>冷冻食品</li>
              <li>厨房周边</li>
            </ul>
          </div>
          <div class="condition">
            <span>筛选条件：</span>
            <ul>
              <li>不限</li>
              <li>降价（2）</li>
              <li>优惠券（1）</li>
              <li>满减（3）</li>
              <li>下架（1）</li>
            </ul>
          </div>
        </div>
        <div class="list">
          <goods-item></goods-item>
          <goods-item></goods-item>
          <goods-item></goods-item>
          <goods-item></goods-item>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>
<script>
import GoodsItem from "@/components/GoodsItem";
export default {
  name: "FavGoods",
  data() {
    return {};
  },
  components: {
    GoodsItem
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.fav-goods {
  padding: 10px;
  .box {
    border: 1px solid #ccc;
    .header {
      padding: 20px;
      border-bottom: 1px solid #ccc;
      h1 {
        font-size: 18px;
        font-weight: 600;
        color: $secondary-text-color;
      }
    }
    .body {
      .filter {
        font-size: 12px;
        color: $secondary-text-color;
        padding: 20px;
        ul {
          display: inline-flex;
          justify-content: space-between;
          li {
            padding: 0 20px;
          }
        }
        .category,
        .condition {
          padding: 10px 0;
        }
      }
      .list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-content: space-between;
        text-align: center;
      }
    }
  }
}
</style>
