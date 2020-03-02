export default {
  name: "ShopItem",
  data: function() {
    return {};
  },
  methods: {
    detailShow: function() {
      let detailElement = event.target.querySelector(".detail");
      detailElement.setAttribute("class", "detail");
    },
    detailHidden: function() {
      let detailElement = event.target.querySelector(".detail");
      detailElement.setAttribute("class", "detail hidden");
    }
  }
};
