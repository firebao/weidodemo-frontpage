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
  methods: {
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
    },
    handleSubmit: function() {
      this.validate(error => console.log(error));
    }
  },
  props: {
    model: Object,
    rules: Object
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
