import Vue from "vue";
import VueAwesomeSwiper from "vue-awesome-swiper";
import SwiperCore, { Navigation, Pagination, Scrollbar } from "swiper/core";

// configure Swiper to use modules
import "swiper/swiper-bundle.css";
import router from "@/router";

SwiperCore.use([Navigation, Pagination, Scrollbar]);
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

router.addRoute({
  path: "/swiper",
  name: "swiper",
  component: () =>
    import(/* webpackChunkName: "validate" */ "./SwiperView.vue"),
});
