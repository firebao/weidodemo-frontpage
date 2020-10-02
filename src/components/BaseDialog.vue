<!--
#***********************************************
#
#      Filename: src/components/BaseDialog.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: BaseDialog组件
#        Create: 2020-08-14 16:38:48
# Last Modified: 2020-08-14 16:38:48
#***********************************************
-->
<template>
  <div class="wrap" v-show="visible">
    <!-- 遮罩层 -->
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div class="dialog-mask" v-show="mask" @click="handleMask"></div>
    </transition>
    <!-- 遮罩层 -->
    <!-- 包裹层 -->
    <div class="dialog-wrap" @click="handleWrapClick">
      <!-- 对话框 -->
      <div class="dialog" :style="dialogStyle">
        <!-- 对话框内容区 -->
        <div class="dialog-content" :style="dialogStyle">
          <!-- 关闭按钮 -->
          <a class="dialog-close" v-if="closable" @click="close">
            <slot name="close">
              <icon-svg class="w40" icon-class="close"></icon-svg>
            </slot>
          </a>
          <!-- end 关闭按钮 -->
          <!-- 内容区头部 -->
          <div class="dialog-header" v-if="showHead">
            <slot name="header">
              <div class="header-inner">
                {{ title }}
              </div>
            </slot>
          </div>
          <!-- end 内容区头部 -->
          <!-- 内容区主干 -->
          <div class="dialog-body">
            <slot></slot>
          </div>
          <!-- end 内容区主干 -->
          <!-- 内容区尾部 -->
          <div class="dialog-footer" v-if="!footerHide">
            <slot name="footer">
              <button @click="cancel">{{ cancelText }}</button>
              <button @click="ok">{{ okText }}</button>
            </slot>
          </div>
          <!-- end 内容区尾部 -->
        </div>
        <!-- end对话框内容区 -->
      </div>
      <!-- end 对话框 -->
    </div>
    <!-- end 包裹层 -->
  </div>
</template>
<script>
export default {
  name: "BaseDialog",
  data: function() {
    return {
      /**
       * dialog显示隐藏
       */
      visible: this.value
    };
  },
  props: {
    /**
     * 对话框是否显示
     */
    value: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示右上角关闭按钮
     */
    closable: {
      type: Boolean,
      default: true
    },
    /**
     * 是否显示遮罩层
     */
    mask: {
      type: Boolean,
      default: true
    },
    /**
     * 点击遮罩层是否可以关闭dialog
     */
    maskClosable: {
      type: Boolean,
      default: true
    },
    /**
     * 自定义内容区样式
     */
    styles: {
      type: Object,
      default() {
        return {};
      }
    },
    /**
     * 对话框标题
     */
    title: {
      type: String
    },
    /**
     * 确定按钮文字
     */
    okText: {
      type: String
    },
    /**
     * 取消按钮文字
     */
    cancelText: {
      type: String
    },
    /**
     * 不显示尾部
     */
    footerHide: {
      type: Boolean,
      default: false
    },
    /**
     * 显示头部
     */
    showHead: {
      type: Boolean,
      default: true
    },
    /**
     * 对话框宽度.小于100时表示n%，大于100表示 n px
     */
    width: {
      type: [Number, String],
      default: 520
    }
  },
  watch: {
    /**
     * 绑定value到visible
     */
    value: function(val) {
      this.visible = val;
    }
  },
  computed: {
    /**
     * dialog样式
     */
    dialogStyle: function() {
      let style = {};

      //首先计算width prop中的宽度,将width写入
      const width = parseInt(this.width);
      style = { width: width <= 100 ? `${width}%` : `${width}px` };

      //合并自定义样式
      const customStyle = this.styles ? this.styles : {};
      Object.assign({}, style, customStyle);

      return style;
    }
  },
  methods: {
    /**
     * 关闭对话框
     * @return void
     */
    close() {
      this.visible = false;
      this.$emit("input", false);
      this.$emit("on-cacel");
    },
    /**
     * 点击遮罩层关闭dialog
     * @return void
     */
    handleMask() {
      if (this.maskClosable && this.mask) {
        this.close();
      }
    },
    /**
     * 点击包裹层关闭dialog
     * @param {Event} event
     * @return void
     */
    handleWrapClick(event) {
      const className = event.target.getAttribute("class");
      if (className && className.indexOf(`dialog-wrap`) > 0) {
        this.handleMask();
      }
    },
    /**
     * 取消按钮点击事件
     * @return void
     */
    cancel: function() {
      this.close();
    },
    /**
     * 确定按钮点击事件
     * @return void
     */
    ok: function() {
      this.visible = false;
      this.$emit("input", false);
      this.$emit("on-ok");
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
@import "@/assets/css/layout.scss";

.wrap {
  //遮罩层
  .dialog-mask {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    bottom: 0;
    height: 100%;
    background-color: rgba(55, 55, 55, 0.6);
    z-index: 999;
  }

  //包裹层
  .dialog-wrap {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: auto;
    z-index: 1000;
    @include content-center();

    //对话框
    .dialog {
      margin: 0 auto;
      position: relative;

      //内容区
      .dialog-content {
        position: relative;
        background-color: white;
        border: 2px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 4px 12px #ccc;

        //内容区头部
        .dialog-header {
          height: 55px;
          display: flex;
          .header-inner {
            font-size: 20px;
            margin: 30px auto 0;
            font-weight: 600;
          }
        }
        .dialog-close {
          z-index: 1;
          position: absolute;
          right: 8px;
          top: 8px;
          overflow: hidden;
          cursor: pointer;
        }
        .dialog-body {
          margin: 20px auto;
        }
      }
    }
  }
}
</style>
