<template>
  <div>
    <mall-header></mall-header>
    <main>
      <!-- top section -->
      <section class="top-section">
        <div class="main-container">
          <div class="flex-box">
            <div class="my-location">
              <icon-svg class="i16" icon-class="location"></icon-svg>
              <p>当前位置：<span>白银区 XXXXXXXX</span></p>
              <router-link class="button-dashed" to="/location">
                切换位置
              </router-link>
            </div>
            <div class="user-center">
              <a class="button-dashed" href="#">登录</a>
              <a class="button-dashed" href="#">注册</a>
              <a class="button-dashed" href="#">我的小家</a>
            </div>
          </div>
        </div>
      </section>
      <!-- end top section -->
      <!-- the category and search section -->
      <section class="category-and-search">
        <div class="main-container">
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
        </div>
      </section>
      <!-- end the category and search section -->
      <!-- the shop  list section -->
      <section class="shop-list">
        <div class="main-container">
          <div class="flex-box space-between wrap">
            <shop-item v-for="item in shopList" v-bind:key="item"></shop-item>
          </div>
        </div>
      </section>
      <!-- end good list section -->
    </main>
    <mall-footer></mall-footer>
  </div>
</template>
<script src="@/page/js/shop.js"></script>
<style src="@/page/css/shop.scss" scoped lang="scss"></style>
