<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/components/BaseInput.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: input输入框组件
#        Create: 2020-06-23 16:07:18
# Last Modified: 2020-06-23 16:07:18
#***********************************************
-->
<template>
  <div :class="wrapClasses">
    <!-- input 输入框 -->
    <template v-if="type !== 'textarea'">
      <!-- 输入框前置插槽 -->
      <div :class="['group-prepend']" v-if="prepend" v-show="slotReady">
        <slot name="prepend"></slot>
      </div>
      <!-- end输入框前置插槽 -->
      <!-- 清空图标 -->
      <icon-svg
        iconClass="close"
        class="i20"
        v-if="clearable && currentValue && !disabled"
        @click="handleClear"
      ></icon-svg>
      <!-- end清空图标 -->
      <!-- 输入框尾部icon图标 -->
      <icon-svg
        :iconClass="icon"
        class="i20"
        v-else-if="icon"
        @click="handleIconClick"
      ></icon-svg>
      <!-- end icon图标 -->
      <!-- search图标 -->
      <icon-svg
        iconClass="search"
        class="icon icon-search input-icon icon-normal"
        v-else-if="search && enterButton === false"
        @click="handleSearch"
      ></icon-svg>
      <!-- end search图标 -->
      <!-- 输入框尾部suffix图标 -->
      <span class="input-suffix" v-else-if="showSuffix">
        <slot name="suffix">
          <icon-svg class="i20" :iconClass="[suffix]" v-if="suffix"></icon-svg>
        </slot>
      </span>
      <!-- end输入框尾部suffix图标 -->
      <!-- 长度限制 -->
      <span class="input-word-count" v-else-if="showWordLimit">
        {{ textLength }}/{{ upperLimit }}
      </span>
      <!-- end长度限制 -->
      <!-- 密码可见性 -->
      <span
        class="input-suffix"
        v-else-if="password"
        @click="handleToggleShowPassword"
      >
        <icon-svg iconClass="eyeOff" v-if="showPassword"></icon-svg>
        <icon-svg iconClass="eye" v-else></icon-svg>
      </span>
      <!-- end密码可见性 -->
      <input
        :id="elementId"
        :autocomplete="autocomplete"
        :spellcheck="spellcheck"
        ref="input"
        :type="currentType"
        :class="inputClasses"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :readonly="readonly"
        :name="name"
        :value="currentValue"
        :number="number"
        :autofocus="autofocus"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
        @change="handleChange"
      />
      <!-- 输入框后置内容插槽 -->
      <div :class="['group-append']" v-if="append" v-show="slotReady">
        <slot name="append"></slot>
      </div>
      <!-- end输入框后置内容插槽 -->
      <div
        :class="['group-append', 'search']"
        v-else-if="search && enterButton"
        @click="handleSearch"
      >
        <icon-svg iconClass="search" v-if="enterButton === true"></icon-svg>
        <template v-else>
          {{ enterButton }}
        </template>
      </div>
      <span class="input-prefix" v-else-if="showPrefix">
        <slot name="prefix">
          <icon-svg :iconClass="[prefix]" v-if="prefix"></icon-svg>
        </slot>
      </span>
    </template>
    <!-- end input 输入框 -->
    <!-- textarea -->
    <template v-else>
      <textarea
        :id="elementId"
        :wrap="wrap"
        :autocomplete="autocomplete"
        :spellcheck="spellcheck"
        ref="textarea"
        :class="textareaClasses"
        :style="textareaStyles"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        :maxlength="maxlength"
        :readonly="readonly"
        :name="name"
        :value="currentValue"
        :autofocus="autofocus"
        @keyup.enter="handleEnter"
        @keyup="handleKeyup"
        @keypress="handleKeypress"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="handleInput"
      >
      </textarea>
      <span class="input-word-count" v-if="showWordLimit">
        {{ textLength }}/{{ upperLimit }}
      </span>
    </template>
    <!-- end textarea -->
  </div>
</template>
<script>
import calcTextareaHeight from "@/utils/calcTextareaHeight";

export default {
  name: "BaseInput",
  props: {
    //输入框类型
    type: {
      validator(value) {
        return (
          [
            "text",
            "textarea",
            "password",
            "url",
            "email",
            "date",
            "number",
            "tel"
          ].indexOf(value) !== -1
        );
      },
      default: "text"
    },
    //输入框绑定的值
    value: {
      type: [String, Number],
      default: ""
    },
    //输入框尺寸
    size: {
      validator(value) {
        return ["small", "large", "default"].indexOf(value) !== -1;
      },
      default() {
        return !this.$IVIEW || this.$IVIEW.size === ""
          ? "default"
          : this.$IVIEW.size;
      }
    },
    //占位文本
    placeholder: {
      type: String,
      default: ""
    },
    //最大输入长度
    maxlength: {
      type: [String, Number]
    },
    //设置输入框为禁用状态
    disabled: {
      type: Boolean,
      default: false
    },
    //输入框尾部图标
    icon: String,
    //自适应内容高度，仅在textarea下有效
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    //textarea rows
    rows: {
      type: Number,
      default: 2
    },
    //设置输入框为只读
    readonly: {
      type: Boolean,
      default: false
    },
    //输入框name
    name: {
      type: String
    },
    //将用户的输入转换为Number类型
    number: {
      type: Boolean,
      default: false
    },
    //自动获取焦点
    autofocus: {
      type: Boolean,
      default: false
    },
    //原生的spellcheck属性
    spellcheck: {
      type: Boolean,
      default: false
    },
    //原生的自动完成
    autocomplete: {
      type: String,
      default: "off"
    },
    //是否显示清空按钮
    clearable: {
      type: Boolean,
      default: false
    },
    //给表单元素设置id
    elementId: {
      type: String
    },
    //原生的wrap属性
    wrap: {
      validator(value) {
        return ["hard", "index"].indexOf(value) !== -1;
      }
    },
    //输入框头部图标
    prefix: {
      type: String,
      default: ""
    },
    //输入框尾部图标
    suffix: {
      type: String,
      default: ""
    },
    //是否显示为搜索型输入框
    search: {
      type: Boolean,
      default: false
    },
    //开启search时，是否有确认按钮，可设未按钮文字
    enterButton: {
      type: [Boolean, String],
      default: false
    },
    //是否显示输入字数统计
    showWordLimit: {
      type: Boolean,
      default: false
    },
    //是否显示切换密码图标
    password: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentValue: this.value,
      slotReady: false,
      textareaStyles: {},
      isOnComposition: false,
      showPassword: false
    };
  },
  computed: {
    //wrap的类属性
    wrapClasses() {
      return [
        "wrapper",
        {
          [`wapper-${this.size}`]: !!this.size,
          [`type-${this.size}`]: this.type,
          ["group"]:
            this.prepend || this.append || (this.search && this.enterButton),
          ["group-with-prepend"]: this.prepend,
          ["group-with-append"]:
            this.append || (this.search && this.enterButton),
          ["hide-icon"]: this.append,
          ["with-search"]: this.search && this.enterButton
        }
      ];
    },
    //input输入框类属性
    inputClasses() {
      return [
        "input",
        {
          [`${this.size}`]: !!this.size,
          ["disabled"]: this.disabled,
          ["with-prefix"]: this.showPrefix,
          ["with-suffix"]:
            this.showSuffix || (this.search && this.enterButton === false)
        }
      ];
    },
    //textarea类属性
    textareaClassed() {
      return [
        "input",
        {
          ["disable"]: this.disabled
        }
      ];
    },
    //input的type属性
    currentType() {
      let type = this.type;
      if (type === "password" && this.password && this.showPassword) {
        type = "text";
      }
      return type;
    },
    //是否显示前置内容
    prepend() {
      let state = false;
      if (this.type !== "textarea") {
        state = this.$slots.prepend !== undefined;
      }
      return state;
    },
    //是否显示后置内容
    append() {
      let state = false;
      if (this.type !== "textarea") {
        state = this.$slots.append !== undefined;
      }
      return state;
    },
    //是否显示输入框头部图标
    showPrefix() {
      let state = false;
      if (this.type !== "textarea") {
        state = this.prefix !== "" || this.$slots.prefix !== undefined;
      }
      return state;
    },
    //是否显示输入框尾部图标
    showSuffix() {
      let state = false;
      if (this.type !== "textarea") {
        state = this.suffix !== "" || this.$slots.suffix !== undefined;
      }
      return state;
    },
    //最大输入长度
    upperLimit() {
      return this.maxlength;
    },
    //当前文本长度
    textLength() {
      if (typeof this.value === "number") {
        return String(this.value).length;
      }
      return (this.value || "").length;
    }
  },
  methods: {
    /**
     * @desc: Enter按键事件
     * @param: {object} event
     * @returns: void
     */
    handleEnter(event) {
      this.$emit("on-enter", event);
      if (this.search) {
        this.$emit("on-search", this.currentValue);
      }
    },
    /**
     * @desc: 键盘按下任意键事件
     * @param: {object} event
     * @returns: void
     */
    handleKeydown(event) {
      this.$emit("on-keydown", event);
    },
    /**
     * @desc: 键盘按下任意字符键事件
     * @param: {object} event
     * @returns: void
     */
    handleKeypress(event) {
      this.$emit("on-keypress", event);
    },
    /**
     * @desc: 键盘释放字符键事件
     * @param: {object} event
     * @returns: void
     */
    handleKeyup(event) {
      this.$emit("on-keyup", event);
    },
    /**
     * @desc: 输入框尾部图标点击事件
     * @param: {object} enent
     * @returns: void
     */
    handleIconClick(event) {
      this.$emit("on-click", event);
    },
    /**
     * @desc: 输入框获得焦点事件
     * @param: {object} event
     * @returns: void
     */
    handleFocus(event) {
      this.$emit("on-focus", event);
    },
    /**
     * @desc: 输入框失去焦点事件
     * @param: {object} event
     * @returns: void
     */
    handleBlur(event) {
      this.$emit("on-blur", event);
    },
    /**
     * @desc: 输入法编辑器开始新的输入时事件
     * @param: {object} event
     * @returns: void
     */
    handleComposition(event) {
      if (event.type === "compositionstart") {
        this.isOnComposition = true;
      }
      if (event.type === "compositionend") {
        this.isOnComposition = false;
        this.handleInput(event);
      }
    },
    /**
     * @desc: 输入框内容变化触发事件
     * @param: {object} event
     * @returns: void
     */
    handleInput(event) {
      if (this.isOnComposition) return;

      let value = event.target.value;
      if (this.number && value !== "") {
        value = Number.isNaN(Number(value)) ? value : Number(value);
      }
      this.$emit("input", value);
      this.setCurrentValue(value);
      this.$emit("on-change", event);
    },
    /**
     * @desc: 输入框失去焦点且内容发生变化事件
     * @param: {object} event
     * @returns: void
     */
    handleChange(event) {
      this.$emit("on-input-change", event);
    },
    /**
     * @desc: 设置输入框当前的value
     * @param: {string} value
     * @returns: void
     */
    setCurrentValue(value) {
      if (value === this.currentValue) return;
      this.$nextTick(() => {
        this.resizeTextarea();
      });
      this.currentValue = value;
    },
    /**
     * @desc: 重新设置textare大小
     * @returns: {bool} false:失败
     */
    resizeTextarea() {
      const autosize = this.autosize;
      if (!autosize || this.type !== "textarea") {
        return false;
      }

      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;

      this.textareaStyles = calcTextareaHeight(
        this.$refs.textarea,
        minRows,
        maxRows
      );
    },
    /**
     * @desc: 使输入框获得焦点
     * @returns: void
     */
    focus() {
      if (this.type === "textarea") {
        this.$refs.textarea.focus();
      } else {
        this.$refs.input.focus();
      }
    },
    /**
     * @desc: 使输入框失去焦点
     * @returns: void
     */
    blur() {
      if (this.type === "textarea") {
        this.$refs.textarea.blur();
      } else {
        this.$refs.input.blur();
      }
    },
    /**
     * @desc: 输入框清空图标点击事件
     * @returns: void
     */
    handleClear() {
      const e = { target: { value: "" } };
      this.$emit("input", "");
      this.setCurrentValue("");
      this.$emit("on-change", e);
      this.$emit("on-clear");
    },
    /**
     * @desc: 输入框搜索图标点击事件
     * @returns: void
     */
    handleSearch() {
      if (this.disabled) return false;
      this.$refs.input.focus();
      this.$emit("on-search", this.currentValue);
    },
    /**
     * @desc: 输入框密码可见性图标点击事件
     * @returns: void
     */
    handleToggleShowPassword() {
      if (this.disabled) return false;
      this.showPassword = !this.showPassword;
      this.focus();
      const len = this.currentValue.length;
      setTimeout(() => {
        this.$refs.input.setSelectionRange(len, len);
      }, 0);
    }
  },
  watch: {
    value(val) {
      this.setCurrentValue(val);
    }
  },
  mounted() {
    this.slotReady = true;
    this.resizeTextarea();
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.wrapper {
  display: inline-block;
  width: 100%;
  position: relative;
  vertical-align: middle;
  line-height: normal;
}
.input {
  display: inline-block;
  width: 100%;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #515a6e;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}
.input::-moz-placeholder {
  color: #ccc;
  opacity: 1;
}
.input:-ms-input-placeholder {
  color: #ccc;
}
.input::-webkit-input-placeholder {
  color: #ccc;
}
.input:focus,
.input:hover {
  border-color: $accent-color;
}
.input:focus {
  outline: 0;
  box-shadow: 0 0 0 3px rgba(127, 186, 0, 0.2);
}
.input[disabled],
fieldset[disabled] .input {
  background-color: #f3f3f3;
  opacity: 1;
  cursor: not-allowed;
  color: #ccc;
}
.input[disabled]:hover,
fieldset[disabled] .input:hover {
  border-color: #e3e5e8;
}
textarea.input {
  max-width: 100%;
  height: auto;
  min-height: 32px;
  vertical-align: bottom;
  font-size: 14px;
}
.input-large {
  font-size: 16px;
  padding: 6px 7px;
  height: 40px;
}
.input-small {
  padding: 1px 7px;
  height: 24px;
  border-radius: 3px;
}
.input-icon {
  width: 32px;
  height: 32px;
  line-height: 32px;
  font-size: 16px;
  text-align: center;
  color: #808695;
  position: absolute;
  right: 0;
  z-index: 3;
}
.input-hide-icon .input-icon,
.input-icon-clear,
.input-icon-validate {
  display: none;
}
.input-wrapper:hover .input-icon-clear {
  display: inline-block;
}
.input-icon-normal + .input {
  padding-right: 32px;
}
.input-hide-icon .input-icon-normal + .input {
  padding-right: 7px;
}
.input-wrapper-large .input-icon {
  font-size: 18px;
  height: 40px;
  line-height: 40px;
}
.input-wrapper-small .input-icon {
  width: 24px;
  font-size: 14px;
  height: 24px;
  line-height: 24px;
}
.input-prefix,
.input-suffix {
  width: 32px;
  height: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.input-prefix i,
.input-suffix i {
  font-size: 16px;
  line-height: 32px;
  color: #808695;
}
.input-suffix {
  left: auto;
  right: 0;
}
.input-wrapper-small .input-prefix i,
.input-wrapper-small .input-suffix i {
  font-size: 14px;
  line-height: 24px;
}
.input-wrapper-large .input-prefix i,
.input-wrapper-large .input-suffix i {
  font-size: 18px;
  line-height: 40px;
}
.input-with-prefix {
  padding-left: 32px;
}
.input-with-suffix {
  padding-right: 32px;
}
.input-search {
  cursor: pointer;
  padding: 0 16px !important;
  background: #2d8cf0 !important;
  color: #fff !important;
  border-color: #2d8cf0 !important;
  transition: all 0.2s ease-in-out;
  position: relative;
  z-index: 2;
}
.input-search i {
  font-size: 16px;
}
.input-search:hover {
  background: #57a3f3 !important;
  border-color: #57a3f3 !important;
}
.input-search:active {
  background: #2b85e4 !important;
  border-color: #2b85e4 !important;
}
.input-search-icon {
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}
.input-search-icon:hover {
  color: inherit;
}
.input-search:before {
  content: "";
  display: block;
  width: 1px;
  position: absolute;
  top: -1px;
  bottom: -1px;
  left: -1px;
  background: inherit;
}
.input-wrapper-small .input-search {
  padding: 0 12px !important;
}
.input-wrapper-small .input-search i {
  font-size: 14px;
}
.input-wrapper-large .input-search {
  padding: 0 20px !important;
}
.input-wrapper-large .input-search i {
  font-size: 18px;
}
.input-with-search:hover .input {
  border-color: #57a3f3;
}
.input-word-count {
  text-align: center;
  position: absolute;
  right: 7px;
  top: 1px;
  bottom: 1px;
  padding-left: 7px;
  background: #fff;
  z-index: 1;
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #808695;
  font-size: 12px;
}
.input-type-textarea .input-word-count {
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  top: auto;
}
.input-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 6px;
  top: 6px;
  background-color: #fff;
  z-index: 3;
}
.icon-search {
  cursor: pointer;
  transition: color 0.2s ease-in-out;
}
</style>
