<template>
  <div :class="prefixCls" v-show="show" :style="contentStyle">
    <slot></slot>
  </div>
</template>
<script>
const prefixCls = "wd-tab-pane";
export default {
  name: "TabPane",
  inject: ["TabsInstance"],
  props: {
    //用于标识当前面板，对应value，默认为其索引值
    name: {
      type: String
    },
    //标签头部显示文字，支持render函数
    label: {
      type: [String, Function],
      default: ""
    },
    //标签头部图标
    icon: {
      type: String
    },
    //是否禁用该标签
    disabled: {
      type: Boolean,
      default: false
    },
    //是否可以关闭标签，仅在type=“card”时有用
    closable: {
      type: Boolean,
      default: null
    },
    //当嵌套使用时，该属性设置指向对应tabs的name字段
    tab: {
      type: String
    },
    //当TabPane使用v-if时，并不会按照预先的顺序渲染，这时可设置index，并从小到大排序（需要大于0）
    index: {
      type: Number
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      show: true,
      //标签的name，与Tabs的value相同则为选中状态
      currentName: this.name
    };
  },
  computed: {
    contentStyle() {
      return {
        visibility:
          this.TabsInstance.activeKey !== this.currentName
            ? "hidden"
            : "visible"
      };
    }
  },
  methods: {
    updateNav() {
      this.TabsInstance.updateNav();
    }
  },
  watch: {
    name(val) {
      this.currentName = val;
      this.updateNav();
    },
    label() {
      this.updateNav();
    },
    icon() {
      this.updateNav();
    },
    disabled() {
      this.updateNav();
    }
  },
  mounted() {
    this.updateNav();
  },
  destoyed() {
    this.updateNav();
  }
};
</script>
