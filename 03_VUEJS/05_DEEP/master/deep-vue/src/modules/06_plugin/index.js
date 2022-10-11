import Vue from "vue";
import router from "../../router/index";
import "./style.css";
import CustomPopupPlugin from "./plugin";
import ModalLayout from "./components/ModalLayout.vue";

Vue.use(CustomPopupPlugin);
Vue.component("modal-layout", ModalLayout);

router.addRoute({
  path: "/custom-popup",
  name: "custom-popup",
  component: () => import(/* webpackChunkName: "popup" */ "./PopupView.vue"),
});
