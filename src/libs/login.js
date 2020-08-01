//import router from "@/router";
import store from "@/store";

export default function toLogin(push, backUrl) {
  console.log(push);
  console.log(backUrl);
  store.commit("LOGOUT");
}
