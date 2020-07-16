<!--
#***********************************************
#
#      Filename: /root/vue-demo/src/components/BaseForm.vue
#
#        Author: wwj - 318348750@qq.com
#   Description: xxx
#        Create: 2020-07-11 09:31:14
# Last Modified: 2020-07-11 09:31:14
#***********************************************
-->
<template>
  <form @submit.prevent="handleSubmit" method="post">
    <div class="handler">
      <slot name="handler"></slot>
    </div>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: "BaseForm",
  componentName: "BaseForm",
  data: function() {
    return {
      fields: [],
      formError: {}
    };
  },
  props: {
    model: Object,
    rules: Object
  },
  provide() {
    return { form: this };
  },
  methods: {
    /**
     * @desc: 对表单进行验证
     * @param: {object} fieldProp=null
     *  null代表对表单的所有field进行验证
     *  需要对特定的field验证，传入field的prop
     * @returns: {Promise}
     */
    validate: function(fieldProp = null) {
      return new Promise(resolve => {
        let valid = true;
        let count = 0;
        this.fields.forEach(field => {
          if (fieldProp === null || field.prop === fieldProp) {
            field.handleValidate(errors => {
              if (errors) {
                valid = false;
              }
              if (++count === this.fields.length || fieldProp !== null) {
                // all finish
                resolve(valid);
              }
            });
          }
        });
      });
    }
  },
  created: function() {
    this.$on("form.addField", field => {
      if (field) {
        this.fields = [...this.fields, field];
      }
    });
    this.$on("form.removeField", field => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
      return false;
    });
  },
  mounted: function() {
    //第一个input元素获得焦点
    this.$nextTick(() => {
      document.querySelector("input").focus();
    });
  }
};
</script>
<style scoped lang="scss">
form {
  position: relative;
  .handler {
    margin-top: 6px;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
