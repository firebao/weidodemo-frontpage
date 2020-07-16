<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/components/BaseInputGroup.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: 用户登录、注册输入框组
#        Create: 2020-07-11 10:12:54
# Last Modified: 2020-07-11 10:12:54
#***********************************************
-->
<template>
  <div class="wrapper">
    <div class="label flex v-middle">
      <label :for="id">{{ label }}</label>
    </div>
    <div class="input-group">
      <input
        :type="type"
        :name="name"
        :id="id"
        :value="currentValue"
        :maxLength="maxLength"
        :placeholder="placeHolder"
        :prop="prop"
        :autofocus="autofocus"
        @input="handleInput"
        @keyup.enter="handleValidate"
        @blur="handleValidate"
        @change="handleValidate"
        style="ime-mode:disable"
      />
      <span class="icon flex v-middle h-middle">
        <icon-svg class="i20" :icon-class="icon"></icon-svg>
      </span>
      <span class="icon-validate-state flex v-middle h-middle">
        <transition
          enter-active-class="animated rotateIn"
          leave-active-class="animated rotateOut"
          mode="out-in"
        >
          <icon-svg
            key="success"
            class="i20"
            icon-class="success"
            v-if="validateState === 'success'"
          >
          </icon-svg>
          <icon-svg
            key="error"
            class="i20"
            icon-class="error"
            v-if="validateState === 'error'"
          >
          </icon-svg>
        </transition>
      </span>
      <slot v-bind:flag="validateState"></slot>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div class="error-tip" v-if="validateState === 'error'">
          {{ validateMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseInputGroup",
  data: function() {
    return {
      currentValue: this.value,
      validateState: "",
      validateMessage: "",
      defaultRule: {
        mobile: [
          { required: true, message: "手机号码不能为空" },
          { pattern: /^1[34578]\d{9}$/, message: "手机号码格式不正确" }
        ],
        captcha: [
          { required: true, message: "动态验证码不能为空" },
          { pattern: /^\d{4}$/, message: "验证码格式不正确" }
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { range: { min: 8, max: 16 }, message: "密码长度为8-16位" }
        ]
      }
    };
  },
  props: {
    //是否自动获得输入焦点
    autofocus: {
      type: Boolean,
      default: false
    },
    prop: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    placeHolder: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text",
      validator: function(value) {
        return (
          ["text", "password", "url", "email", "date", "number", "tel"].indexOf(
            value
          ) !== -1
        );
      }
    },
    name: {
      type: String
    },
    id: {
      type: String
    },
    value: {
      type: [String, Number],
      default: ""
    },
    rule: {
      type: Object,
      default: function() {
        return {};
      }
    },
    flag: {
      type: String,
      default: "prending"
    }
  },
  inject: ["form"],
  computed: {
    maxLength: function() {
      if (this.type === "tel") return 11;
      if (this.name === "captcha") return 4;
      return "";
    }
  },
  methods: {
    /**
     * @desc: 获取验证规则
     * @returns: {object}
     */
    getRule: function() {
      let rule = new Object();
      rule[this.prop] = Object.assign(this.rule, this.defaultRule)[this.prop];
      return rule;
    },
    /**
     * @desc: input事件触发
     * @param: {Event} event
     * @returns: void
     */
    handleInput: function(event) {
      let value = event.currentTarget.value;
      if (this.type === "tel" || this.prop == "mobile") {
        //restrict to only digits
        value = value.replace(/[^\d]/g, "");
        //insert space in mobile number
        value = value.replace(/^(.{3})(.{4})(.{4})$/, "$1 $2 $3");
      } else if (this.prop === "captcha") {
        //restrict to only digits
        value = value.replace(/[^\d]/g, "");
      }
      this.$emit("input", value);
      this.setCurrentValue(value);
    },
    setCurrentValue(value) {
      this.currentValue = value;
    },
    /**
     * @desc: 方法描述
     * @param: {Closure} callback 验证后的回调函数
     * @returns: void
     */
    handleValidate: function(callback) {
      let rule, value, cv;
      cv = this.currentValue;
      //romove space
      if (cv) cv = cv.replace(/\s/g, "");
      //package the async-validateor's parameters
      value = new Object();
      value[this.prop] = cv;
      rule = this.getRule();
      //validate
      this.$validator(rule).validate(value, { firstFields: true }, errors => {
        //set state and error message
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";
        if (this.prop === "mobile") {
          let state = errors ? false : true;
          this.$store.commit("setMobileState", state);
        }
        typeof callback === "function" ? callback(this.validateMessage) : "";
      });
    },
    dispatchEvent: function(eventName, params) {
      if (typeof this.form !== "object") {
        console.error("BaseInputFroup must be in component BaseForm");
        return;
      }
      this.form.$emit.apply(this.form, [eventName].concat(params));
      this.form.$emit.apply(this.form, [eventName].concat(params));
    }
  },
  mounted: function() {
    if (this.prop) {
      this.dispatchEvent("form.addField", this);
    }
  },
  beforeDestroy: function() {
    if (this.prop) {
      this.dispatchEvent("form.removeField", {
        prop: this.prop
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/assets/css/base.scss";
.wrapper {
  .label {
    transition: all 0.4s ease-in-out;
    height: 35px;
    font-weight: 600px;
  }

  .input-group {
    position: relative;
    .icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
      /deep/ svg use {
        --fill-color: #ccc;
      }
    }
    .error-tip {
      color: $error-color;
      width: 200px;
      line-height: 36px;
      margin-left: 15px;
      position: absolute;
      top: 0;
      left: 300px;
      border: 2px dashed $error-color;
      text-align: center;
      &:after {
        content: "";
        position: absolute;
        top: 8px;
        left: -20px;
        width: 0;
        height: 0;
        border: 10px dashed transparent;
        border-right-color: $error-color;
      }
    }

    .icon-validate-state {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
    }

    .button-captcha {
      height: 30px;
      line-height: 30px;
      text-align: center;
      width: 100px;
      background-color: #ccc;
      color: white;
      position: absolute;
      margin-right: 10px;
      right: 0;
      top: 5px;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #999;
      }
    }
    .move-left.button-captcha {
      right: 30px;
    }

    input {
      width: 100%;
      height: 40px;
      border: 2px solid #ccc;
      border-radius: 5px;
      padding: 0 40px;
      transition: all 0.4s ease-in-out;
      &:focus {
        border-color: $accent-color;
      }

      &:focus + .icon {
        /deep/ svg use {
          --fill-color: #7fba00;
        }
      }
    }
  }
  &:hover {
    .label {
      color: $accent-color;
    }

    .icon {
      /deep/ svg use {
        --fill-color: #7fba00;
      }
    }

    input {
      border-color: $accent-color;
    }
  }
}
</style>
