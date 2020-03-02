const state = {
  mobileValidateState: false,
  sendCodeState: "disabled"
};
const mutations = {
  setMobileState(state, payload) {
    state.mobileValidateState = payload;
  },
  setSendCodeState(state, payload) {
    if (["verifySuccess"].indexOf(payload) >= 0) {
      state.sendCodeState = payload;
    }
  }
};
export default {
  state,
  mutations
};
