//components/IconSvg
<template>
  <svg
    class="svg-icon"
    aria-hidden="true"
    :x="xAxis"
    :y="yAxis"
    :width="width"
    :height="height"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
export default {
  name: "IconSvg",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    xAxis: {
      type: Number,
      default: 0
    },
    yAxis: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 40
    },
    height: {
      type: Number,
      default: 40
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    }
  }
};
</script>
<style lang="scss">
.svg-icon {
  overflow: hidden;
}
.i90 {
  width: 90px;
  height: 90px;
}
.i40 {
  width: 40px;
  height: 40px;
}
.i16 {
  width: 16px;
  height: 16px;
  margin: 0 5px;
}
.i12 {
  width: 12px;
  height: 12px;
  margin: 0 4px;
}
.i20 {
  width: 20px;
  height: 20px;
  margin: 0 6px;
}
.i30 {
  width: 30px;
  height: 30px;
}
</style>
