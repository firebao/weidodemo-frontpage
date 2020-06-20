<script>
export default {
  name: "BaseRender",
  functional: true,
  props: {
    render: Function
  },
  render: (h, context) => {
    return context.props.render(h);
  }
};
</script>
