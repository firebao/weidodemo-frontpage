import router from "@/router";
import store from "@/store";

export default function toLogin(push, backUrl) {
  store.commit("LOGOUT");
}
