const state = {
  mainMenuActive: false,
  activeCategory: ""
};

const mutations = {
  setActiveCategory(state, payload) {
    state.activeCategory = payload.category;
    state.mainMenuActive = true;
  },
  cancelActiveCategory(state) {
    state.activeCategory = "";
    state.mainMenuActive = false;
  }
};
export default {
  state,
  mutations
};
