import store from "@/store";
import { module } from "../01_core";

store.registerModule("A", {
  namespaced: false,
  ...module,
});

export { default as MapHelperView } from "./MapHelperView.vue";
