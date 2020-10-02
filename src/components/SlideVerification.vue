<!--
#***********************************************
#
#      Filename: src/components/SlideVerification.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: 滑块验证组件
#        Create: 2020-08-14 12:27:27
# Last Modified: 2020-08-14 12:27:27
#***********************************************
-->
<template>
  <div class="slide-verification">
    <div class="range" :class="value ? 'success' : ''">
      <!-- 滑块划过后的背景方块 -->
      <span class="bg" :style="bgStyle"></span>
      <!-- end 滑块划过后的背景方块 -->
      <!-- 滑块 -->
      <i
        class="slider"
        ref="slider"
        :style="sliderStyle"
        @mousedown="mouseDown"
      >
        <icon-svg class="i30" :icon-class="icon"></icon-svg>
      </i>
      <!-- end 滑块 -->
      <!-- 滑块验证区域内描述文字 -->
      <span class="text">
        {{ value ? "验证成功" : "向右滑动完成验证" }}
      </span>
      <!-- end 滑块验证区域内描述文字 -->
    </div>
  </div>
</template>
<script>
/**
 * 滑块验证组件
 * @vuedoc
 * @exports component/SlideVerification
 */
export default {
  name: "SlideVerification",
  data: function() {
    return {
      /**
       * 滑块移动距离
       */
      disX: 0,
      /**
       * 滑块点击事件起始x坐标
       */
      startX: "",
      /**
       * 滑块滑动maxX的距离，即可认定滑块到达终点
       */
      maxX: "",
      /**
       * 滑块宽度
       */
      sliderWidth: "",
      /**
       * 滑块可滑动范围range的宽度
       */
      rangeWidth: "",
      /**
       * 验证结果
       */
      value: false
    };
  },
  computed: {
    /**
     * 滑块slider样式
     */
    sliderStyle() {
      return {
        left: this.disX + "px"
      };
    },
    /**
     * 滑块划过后的背景方块的样式
     */
    bgStyle() {
      return {
        width: this.disX + "px"
      };
    },
    icon() {
      return this.value ? "success" : "right";
    }
  },
  methods: {
    /**
     * 滑块鼠标按下mouseDown事件
     * @param {Event} event
     * @return void
     */
    mouseDown(event) {
      //滑块对象
      let slider = this.$refs.slider;

      this.startX = event.clientX;
      this.sliderWidth = slider.offsetWidth;
      this.rangeWidth = slider.parentElement.offsetWidth;
      this.maxX = this.rangeWidth - this.sliderWidth - 4;

      //滑块已经验证通过，直接返回不做后续操作
      if (this.value) return;

      //注册鼠标移动，鼠标按键释放的事件处理函数
      window.addEventListener("mousemove", this.mouseMove, false);
      window.addEventListener("mouseup", this.mouseUp, false);
    },
    /**
     * 滑块按下鼠标移动事件
     * @return void
     */
    mouseMove() {
      //取得鼠标移动的x坐标
      let endX = event.clientX;

      //鼠标移动到起始点左边，保持滑块移动距离为0，防止出现向左滑动的情况
      this.disX = endX - this.startX;
      if (this.disX <= 0) this.disX = 0;

      //鼠标移动超过最大移动距离，保持滑块在右边边界上，防止超出
      if (this.disX >= this.maxX - this.sliderWidth) {
        this.disX = this.maxX;
      }
    },
    /**
     * 鼠标按键松开触发事件
     * @return void
     */
    mouseUp() {
      //滑块对象没有到达最右边界，回滚到初始位置
      //滑块对象到达最右边界，设置滑块验证成功，触发事件verify-ok
      if (this.disX !== this.maxX) {
        this.reset();
      } else {
        this.value = true;
        this.$emit("verify-ok");
        //verify-ok事件触发后，1s后重置
        setTimeout(this.reset, 1000);
      }

      //取消事件注册
      window.removeEventListener("mousemove", this.mouseMove, false);
      window.removeEventListener("mouseup", this.mouseUp, false);
    },
    /**
     * 滑块状态重置，滑块回到初始位置，验证状态回到未通过状态
     * @return void
     */
    reset() {
      //重置
      this.value = false;
      this.disX = 0;
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
@import "@/assets/css/layout.scss";
.slide-verification {
  width: 80%;
  height: 40px;
  margin: 10px 0 30px 0;
  .range {
    height: 100%;
    position: relative;
    box-sizing: content-box;
    border: 2px solid #ccc;
    border-radius: 5px;
    user-select: none; //不可选取文本
    @include flex-layout();

    //验证成功时描述文字为白色，slider为强调色
    &.success {
      .text {
        color: white;
      }
      i {
        color: $accent-color;
      }
    }

    //描述文字
    .text {
      z-index: 1;
    }

    //滑块
    .slider {
      width: 40px;
      height: 40px;
      position: absolute;
      left: 0;
      color: #919191;
      background-color: #cccccc;
      opacity: 0.7;
      border-radius: 2px;
      cursor: pointer;
      transition: left 0.1s;
      z-index: 2;
      @include flex-layout();

      //hover状态有加深效果
      &:hover {
        opacity: 1;
      }
    }

    //滑块划过后的背景方块
    .bg {
      width: 0;
      height: 40px;
      position: absolute;
      left: 0;
      top: 0;
      background-color: $accent-color;
      opacity: 0.7;
      transition: width 0.1s;
      z-index: 0;
    }
  }
}
</style>
