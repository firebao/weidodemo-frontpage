export default {
  name: "subMenu",
  data() {
    return {
      category: {
        fruits: {
          name: "各色水果"
        },
        vegetables: {
          name: "新鲜蔬菜"
        },
        "kitchen-goods": {
          name: "厨房用品"
        },
        "frozen-food": {
          name: "冷冻食品"
        },
        rices: {
          name: "米面粮油"
        },
        fishes: {
          name: "海鲜水产"
        },
        meats: {
          name: "肉禽蛋奶"
        },
        more: {
          name: "更多"
        }
      }
    };
  },
  computed: {
    activeCategory: function() {
      let category = this.$store.state.menu.activeCategory;
      let value = "";
      if (category != "") {
        value = this.category[category].name;
      }
      return value;
    },
    mainMenuActive: function() {
      return this.$store.state.menu.mainMenuActive;
    }
  },
  methods: {}
};
