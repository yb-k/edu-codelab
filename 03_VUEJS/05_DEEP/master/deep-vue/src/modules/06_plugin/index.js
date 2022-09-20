import Vue from "vue";
import router from "../../router/index";
import "./style.css";
import CustomPopupPlugin from "./plugin";
import CustomPopup from "./CustomPopup.vue";

Vue.use(CustomPopupPlugin);
Vue.component("custom-popup", CustomPopup);

router.addRoute({
  path: "/custom-popup",
  name: "custom-popup",
  component: () => import(/* webpackChunkName: "popup" */ "./PopupView.vue"),
});
