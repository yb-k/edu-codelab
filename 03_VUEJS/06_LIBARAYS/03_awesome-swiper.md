# Swiper

## 개요

`Swiper`는 슬라이드에 관련되어 사용되는 대중적인 라이브러리입니다.

`vue`와 `swiper`를 호환되어 컴포넌트로 사용하기위해서는 `vue-awesome-swiper`를 통해 사용할 수 있습니다.

다만, Vue3.0부터 `swiper`에서 공식적으로 지원을 시작하였기때문에 향후 Vue3 프로젝트에서 `Swiper`를 사용하는 경우,

`swiper`의 공식 문서를 확인하시어 진행하시길 바랍니다.

아래는 버전별 호환되는 라이브러리 버전입니다.

- Swiper 5-6 vue-awesome-swiper@4.1.1 (Vue2)
- Swiper 4.x vue-awesome-swiper@3.1.3 (Vue2)
- Swiper 3.x vue-awesome-swiper@2.6.7 (Vue2)

## 공식 문서

[vue-awesome-swiper github](https://github.com/surmon-china/vue-awesome-swiper)

[swiper v6 docs](https://swiper6.vercel.app/swiper-api)

## 설치

실습에서는 swiper 6.x버전을 사용합니다.

```bash
yarn add swiper@^6.8.4 vue-awesome-swiper@^4.1.1
```

## 실습

`src/modules/03_swiper/index.js`

```js
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
```

`src/modules/03_swiper/SwiperView.vue`

```vue
<template>
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- If we need scrollbar -->
    <div class="swiper-scrollbar"></div>
  </swiper>
</template>

<script>
export default {
  name: "swiper-view",
  data() {
    return {
      swiperOptions: {
        // direction: "vertical",
        loop: true,

        // If we need pagination
        pagination: {
          el: ".swiper-pagination",
        },

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // And if we need scrollbar
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    console.log("Current Swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  },
};
</script>
<style scoped>
.swiper-container {
  width: 600px;
  height: 300px;
  border: 1px solid #eaeaea;
}
</style>
```
