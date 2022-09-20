/**
 * 커스텀 디렉티브 작성하기
 */

import Vue from "vue";
import router from "../../router/index";

router.addRoute({
  path: "/directives",
  name: "directives",
  // which is lazy-loaded when the route is visited.
  component: () =>
    import(/* webpackChunkName: "directive" */ "./DirectiveView.vue"),
});

Vue.directive("logging", {
  bind(...args) {
    console.log("BIND :: \n", ...args);
  },
  inserted(...args) {
    console.log("INSERTED :: \n", ...args);
  },
  update(...args) {
    console.log("UPDATE :: \n", ...args);
  },
  componentUpdated(...args) {
    console.log("COMPONENT_UPDATE :: \n", ...args);
  },
  unbind(...args) {
    console.log("UNBIND :: \n", ...args);
  },
});

/**
 * v-back
 * @description 뒤로가기 디렉티브
 * @example
 * <button type="button" v-back>뒤로가기</button>
 */
Vue.directive("back", {
  bind(el, binding, vnode) {
    el.addEventListener("click", function () {
      router.back();
    });
  },
});

function onUpperCaseContent(el, binding, vnode) {
  el.textContent = binding.value.toUpperCase();
}

/**
 * v-upper
 * @description 컴포넌트 내 data를 upperCase한다.
 * @example
 * <h1 v-upper="upper"></h1>
 */
Vue.directive("upper", {
  bind: onUpperCaseContent,
  update: onUpperCaseContent,
});
