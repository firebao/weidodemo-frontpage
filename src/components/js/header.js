import BaseLogo from "@/components/BaseLogo";
export default {
  mounted: function() {
    window.addEventListener("scroll", this.scrollHandle);
  },

  methods: {
    scrollHandle: function() {
      let top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let header = document.querySelector(".main-header");
      if (top > 5) {
        header.classList.add("is-sticky");
      } else {
        header.classList.remove("is-sticky");
      }
    }
  },
  components: {
    BaseLogo
  }
};
