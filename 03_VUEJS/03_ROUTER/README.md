# Vue-Router

## 서론

`뷰 라우터`는 대부분의 뷰 프로젝트에서 필수적으로 사용하며, 주요 기능으로는 `url`에 따른 `Component` 맵핑에 있습니다.

## 실습

```bash
vue create hello-router
#02_VUE_CLI 챕터 참고
```

### Router Config 작성

`vue-cli`를 통해 router를 사용 체크시 자동으로 생성되지만, 원래는 아래와 같은 작업을 통해 라우터를 설정할 수 있습니다.

소스코드를 참고하여 아래 경로의 파일을 수정합니다.
`src/router/index.js`

```js
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  mode: "history", // or "hash"
  base: process.env.BASE_URL,
  routes,
});

export default router;
```

`src/main.js`

```js
import Vue from "vue";
import App from "./App.vue";
import router from "./router"; //  1. router 모듈을 불러와
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router, // 2. 적용
  store,
  render: (h) => h(App),
}).$mount("#app");
```

`src/App.vue`

```vue
<template>
  <div id="app">
    <router-view />
    <router-view name="second" />
  </div>
</template>
<script>
export default {
  data: function () {
    return {};
  },
};
</script>
```

### router-view

`뷰 라우터`에서는 `URL`이 매칭되는것에 따라서 변경되는 동적으로 컴포넌트를 구성할 수 있는 컴포넌트를 제공하고있습니다.

아래와 같이 사용할 수 있습니다.

`name` 속성을 통해 하나의 `URL`에 여러개의 컴포넌트를 맵핑 할 수 있습니다.

```vue
<template>
  <div>
    <router-view />
    <router-view name="second" />
  </div>
</template>
```

### router-link

`뷰 라우터`에서는 편의성을 위해 페이지 이동에 사용할 수 있는 컴포넌트와 API를 제공합니다.

### push / replace / back API

### parameter 처리

대기

$route.push({ name: 'test', params: {key : value} })

params-> 순수 Object
query -> ?qwe=123
A
데이터 공유
B

const routes = [
// matches /o/3549
{ path: '/o/:orderId' },
// matches /p/books
{ path: '/p/:productName' },
]

## 생명주기

beforeRouterEnter(to, from, next)
// 필수데이터 체크하여 핸들링을 처리할 수 있음.
to : 이제 이동할 대상에 대한 정보
A->B
FROM -A
TO - B
next / express middleware
// created this.key = this.$route.params.value;
주의할점 .this 에 대해 접근할 수 없음
next(); //정상적으로 동작함.
beforeRouterLeave(to, from, next)
// 화면에서 Step / modal popup
B->C
to : C
from: B
next () / next(false) 이동을 막을 수있음.
this 에 대해 접근할 수 있음.
예)
if(this.openPopup) {
this.openPopup = false;
return next(false)
}

next(); //정상적으로 동작함.

### route 정보를 watch 로 활용하기.

헤더에 있는 데이터를 path, name으로 표시하기 = path, name을 활용하여 h1태그의 값을 바꿔보자
{'/about':'업 ㅏ웃'}
{'about':'어바웃'}

### 전역네비게이션

beforeEach
전역적으로 URL이 바뀌는 경우에 대한 핸들링이 가능하다.
// 권한에따른 처리가 가능하다.
import store from './store';
const anonymous = ['/', '/login', '/main', '/faq'];
beforeEach(to, from, next) {
if(!anonymous.includes(to.path) && store.state.loginUser === null) {
=> 세션유지기간이 만료되거나, 특정페이지에 접근하는 경우
return next('/login')
}
next();
}

## redirect 옵션 사용해보기

routes = [
intro -> /
{path: '/intro', redirect: '/'},
{ path: '*', redirect: '/404' } or { path: '*', redirect: '/' } 이렇게도 처리가 가능하다.
];

### mode

hash / history
정확하게 이해하기 위해서는
yarn build
dist 실행
liveserver로 dist 띄워서 실행볼것

hash / # 북마크를 통해서 핸들링되며 실제로 url이 변경되지 않음. 즉, 항상 동일한 index.html을 서버에 요청할뿐
localhost:8080/A -> 404
localhost:8080/B -> 404
localhost:8080/index.html#/A -> index.html
localhost:8080/index.html#/B -> index.html

history / 서버에서 기본적으로 mapping된 라우트에 index.html을 리턴하도록 처리되어있음
localhost:8080/A -> index.html
localhost:8080/B ->index.html

-> devServer : { historyFallBack: false }로 하면 서버쪽에서의 처리를 하지않음.
