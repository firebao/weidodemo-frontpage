<!--
#***********************************************
#
#      Filename: Share.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: 分享绑定页面
#        Create: 2020-06-23 09:45:01
# Last Modified: 2020-06-23 09:45:01
#***********************************************
-->
<template>
  <div class="share">
    <!-- box title -->
    <div class="title">
      <div class="icon">
        <icon-svg iconClass="info" class="i40"></icon-svg>
      </div>
      <div class="tips">
        绑定社交网站账号，可以让您快速、便捷地分享在围兜的乐趣！
      </div>
    </div>
    <!-- end box title -->
    <!-- box body -->
    <div class="body">
      <div class="block">
        <div class="img">
          <img src="../../assets/img/qzone.png" alt="QQ空间" title="QQ空间" />
        </div>
        <div class="name">QQ空间</div>
        <div class="handle">
          <button class="button-dashed">立刻设置</button>
        </div>
      </div>
      <div class="block">
        <div class="img">
          <img
            src="../../assets/img/sina.png"
            alt="新浪微博"
            title="新浪微博"
          />
        </div>
        <div class="name">新浪微博</div>
        <div class="handle">
          <button class="button-dashed">立刻设置</button>
        </div>
      </div>
      <div class="block">
        <div class="img">
          <img
            src="../../assets/img/tencent.png"
            alt="腾讯微博"
            title="腾讯微博"
          />
        </div>
        <div class="name">腾讯微博</div>
        <div class="handle">
          <button class="button-dashed">立刻设置</button>
        </div>
      </div>
      <div class="block">
        <div class="img">
          <img src="../../assets/img/douban.png" alt="豆瓣" title="豆瓣" />
        </div>
        <div class="name">豆瓣</div>
        <div class="handle">
          <button class="button-dashed">立刻设置</button>
        </div>
      </div>
      <div class="block">
        <div class="img">
          <img src="../../assets/img/renren.png" alt="人人网" title="人人网" />
        </div>
        <div class="name">人人网</div>
        <div class="handle">
          <button class="button-dashed">立刻设置</button>
        </div>
      </div>
    </div>
    <!-- end box body -->
  </div>
</template>
<script>
export default {
  name: "Share",
  data() {
    return {};
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.share {
  padding: 20px;
  //box title
  .title {
    display: flex;
    align-items: center;
    .tips {
      padding-left: 5px;
    }
  }
  //box body
  .body {
    margin-top: 40px;
    .block {
      border-bottom: 1px dashed #ccc;
      padding: 10px 0;
      display: grid;
      grid-template-columns: 1fr 5fr 1fr;
      align-items: center;
      .img {
        border: 1px solid #eee;
      }
      .name {
        font-weight: 600;
        color: $secondary-text-color;
        padding-left: 10px;
      }
    }
  }
}
</style>
