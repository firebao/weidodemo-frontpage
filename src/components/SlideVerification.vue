<template>
  <div class="slide-verification">
    <div class="range flex v-middle h-middle" :class="value ? 'success' : ''">
      <span class="bg"></span>
      <i class="slider flex v-middle h-middle" @mousedown="mouseDown">
        <icon-svg class="i30" icon-class="right" v-if="!value"></icon-svg>
        <icon-svg class="i30" icon-class="success" v-else></icon-svg>
      </i>
      <span class="text">
        {{ value ? "验证成功" : "向右滑动完成验证" }}
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "SlideVerification",
  data: function() {
    return {
      disX: 0,
      startX: "",
      maxX: "",
      sliderWidth: "",
      rangeWidth: "",
      value: false
    };
  },
  methods: {
    mouseDown: function(e) {
      let slider = document.querySelector(".slider");
      this.startX = e.clientX;
      this.sliderWidth = slider.offsetWidth;
      this.rangeWidth = slider.parentElement.offsetWidth;
      this.maxX = this.rangeWidth - this.sliderWidth - 4;
      if (this.value) {
        return false;
      }
      window.addEventListener("mousemove", this.mouseMove, false);
      window.addEventListener("mouseup", this.mouseUp, false);
    },
    mouseMove: function() {
      let slider = document.querySelector(".slider");
      let bg = document.querySelector(".bg");
      let endX = event.clientX;
      this.disX = endX - this.startX;
      if (this.disX <= 0) {
        this.disX = 0;
      }
      if (this.disX >= this.maxX - this.sliderWidth) {
        this.disX = this.maxX;
      }
      slider.style.transition = ".1s all";
      slider.style.left = this.disX + "px";
      bg.style.width = this.disX + "px";
    },
    mouseUp: function() {
      let slider = document.querySelector(".slider");
      let bg = document.querySelector(".bg");
      if (this.disX !== this.maxX) {
        slider.style.transition = ".5s all";
        slider.style.left = "0";
        bg.style.width = "0";
        slider.errorFun && slider.errorFun();
      } else {
        this.value = true;
        this.$emit("verify-ok");
        setTimeout(this.reset(), 1000);
      }
      window.removeEventListener("mousemove", this.mouseMove, false);
      window.removeEventListener("mouseup", this.mouseUp, false);
    },
    reset: function() {
      let slider = document.querySelector(".slider");
      let bg = document.querySelector(".bg");
      this.value = false;
      this.disX = 0;
      slider.style.left = "0";
      bg.style.width = "0";
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.slide-verification {
  width: 300px;
  .range {
    margin: 10px 0 30px 0;
    box-sizing: content-box;
    background: $bg-color;
    border: 2px solid #ccc;
    border-radius: 5px;
    position: relative;
    transition: all 1s;
    user-select: none;
    height: 40px;
    &.success {
      .text {
        color: white;
      }
      i {
        color: $accent-color;
      }
    }
    .text {
      z-index: 999;
    }
    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 40px;
      background-color: $accent-color;
      opacity: 0.7;
      transition: all 0.1s;
      z-index: 0;
    }
    i {
      position: absolute;
      left: 0;
      width: 40px;
      height: 40px;
      color: #919191;
      background-color: #cccccc;
      opacity: 0.7;
      border-radius: 2px;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
