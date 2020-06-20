<template>
  <div class="box">
    <div class="box-title">
      {{ title }}
    </div>
    <div class="box-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseBox",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>
<style scoped lang="scss">
.box {
  border: 2px solid #ccc;
  .box-title {
    padding: 10px 20px;
    border-bottom: 1px solid #ccc;
    width: 100%;
  }
}
</style>
