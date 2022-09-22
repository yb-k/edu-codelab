import router from "@/router/index";
import CoreView from "./01_core/CoreView.vue";
import ModuleView from "./02_module/ModuleView.vue";
import { MapHelperView } from "./03_map_helper";

// 라우팅 추가
router.addRoute({
  path: "/core",
  name: "core",
  component: CoreView,
});

// 라우팅 추가
router.addRoute({
  path: "/module",
  name: "module",
  component: ModuleView,
});

// 라우팅 추가
router.addRoute({
  path: "/maphelper",
  name: "maphelper",
  component: MapHelperView,
});
