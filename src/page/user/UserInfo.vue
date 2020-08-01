<template>
  <div class="userinfo">
    <div class="tab-pane">
      <div class="tab-item basic-info" @click="changeActive('basicInfo')">
        基本信息
      </div>
      <div class="tab-item user-photo" @click="changeActive('userPhoto')">
        头像照片
      </div>
      <div class="tab-item more-info" @click="changeActive('moreInfo')">
        更多个人信息
      </div>
    </div>
    <div class="tab-content">
      <div class="basic-info" v-if="activeTab === 'basicInfo'">
        <form class="basic-info-form">
          <div class="lable">用户名:</div>
          <div class="value">XXX</div>
          <div class="lable">登录名:</div>
          <div class="value flex">
            <div class="value-login-name">XXX</div>
            <button class="update">修改</button>
          </div>
          <div class="lable">昵称:</div>
          <input type="text" />
          <div class="lable">性别:</div>
          <input type="text" />
          <div class="lable">生日:</div>
          <input type="text" />
          <div class="lable">口味:</div>
          <input type="text" />
        </form>
      </div>
      <div class="user-photo" v-else-if="activeTab === 'userPhoto'">
        <div class="column-left">
          <div class="box-info">
            <img :src="require('@/assets/img/2.png').default" alt="" />
          </div>
          <div class="area upload-area"></div>
          <div class="recommend">
            <div class="title">推荐头像</div>
            <div class="list"></div>
          </div>
        </div>
        <div class="column-right">
          <div class="title">效果预览</div>
          <div class="tip">
            你上传的图片会自动生成2种尺寸,请注意小尺寸的头像是否清晰
          </div>
          <div class="over-view">
            <img src="" alt="" />
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserInfo",
  data() {
    return {
      activeTab: "basicInfo"
    };
  },
  methods: {
    changeActive(value) {
      this.activeTab = value;
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.userinfo {
  padding: 20px;
  .tab-pane {
    display: inline-flex;
    .tab-item {
      padding: 10px 20px;
      cursor: pointer;
      color: $secondary-text-color;
      font-weight: 600;
      &:hover {
        color: $accent-color;
      }
    }
  }
  .tab-content {
    padding: 20px;
    .basic-info-form {
      display: grid;
      grid-template-columns: 50px 200px;
      grid-template-rows: repeat(6, 30px);
      grid-gap: 10px 10px;
      align-items: center;
      .lable {
        justify-self: end;
        font-weight: 600;
      }
      .value {
        .update {
          margin-left: 20px;
        }
      }
      input {
        height: 30px;
      }
    }
    .user-photo {
      display: grid;
      grid-template-columns: 2fr 1fr;
    }
  }
}
</style>
