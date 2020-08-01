import ShopItem from "@/components/ShopItem";
import MallHeader from "@/components/TheHeader";
import MallFooter from "@/components/TheFooter";
export default {
  name: "Shop",
  data: function() {
    return {
      category: "aaa",
      shopList: []
    };
  },
  created: function() {
    for (let i = 0; i < 32; i++) {
      this.shopList[i] = i;
    }
  },
  method: {},
  components: {
    ShopItem,
    MallHeader,
    MallFooter
  }
};
