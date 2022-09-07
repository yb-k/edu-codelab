# Vue-Router

> v3.x 버전을 기준으로 작성되었습니다.

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

`<router-link>` 를 사용하여 선언적 네비게이션을 사용할 수도 있습니다.

```js
<template>
  <router-link :to="someLink"></router-link>
</template>
```

### push / replace / back API

> `router.push(location, onComplete?, onAbort?)`

라우터의 인스턴스 메소드를 사용하여 프로그래밍으로 수행할 수도있습니다.

| 메소드  | description                                                               |
| ------- | ------------------------------------------------------------------------- |
| push    | URL이동. 히스토리 스택에 추가되므로 뒤로가기 버튼 동작시 이전 URL 로 이동 |
| replace | URL 이동. 현재 URL을 대체하기 때문에 히스토리 스택에 쌓이지 않음.         |
| go      | 숫자만큼 뒤로가기 또는 앞으로 가기 `window.history.go(n).`                |

> 인스턴스 내부에서는 라우터 인스턴스에 `$router` 로 엑서스 할 수 있습니다.  
> ex) `this.$router.push(...)`

### parameter 처리

`$route.push({ name: 'test', params: {key : value} , query : {key : value}})`

> `params` 는 `path`와 동시에 사용될때, 무시된다. 따라서 `params`를 사용할 떄는 `name` 을 사용해야한다.

```js
// literal string path
router.push("/users/eduardo");

// object with path
router.push({ path: "/users/eduardo" });

// named route with params to let the router build the url
router.push({ name: "user", params: { username: "eduardo" } });

// with query, resulting in /register?plan=private
router.push({ path: "/register", query: { plan: "private" } });

// with hash, resulting in /about#team
router.push({ path: "/about", hash: "#team" });
```

### custom regex in params

```js
const routes = [
  // matches /o/3549
  { path: "/o/:orderId" },
  // matches /p/books
  { path: "/p/:productName" },
];
```

위의 상황에서 `orderId`는 **숫자만**을 받고 싶을때

```js
const routes = [
  // /:orderId -> matches only numbers
  { path: "/:orderId(\\d+)" },
  // /:productName -> matches anything else
  { path: "/:productName" },
];
```

### Repeatable params

- `*` : o or more
- `+` : 1 or more

```js
const routes = [
  // /:chapters -> matches /one, /one/two, /one/two/three, etc
  { path: "/:chapters+" },
  // /:chapters -> matches /, /one, /one/two, /one/two/three, etc
  { path: "/:chapters*" },
];
```

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

`router.beforeEach` 를 사용하여 전역가드를 등록할 수 있습니다.

```js
const router = new VueRouter({ ... })
const anonymous = ['/', '/login', '/main', '/faq'];

router.beforeEach((to, from, next) => {
  if(!anonymous.includes(to.path) && store.state.loginUser === null) {
  // 세션유지기간이 만료되거나, 특정페이지에 접근하는 경우 로그인 페이지로 이동
  return next('/login');
  }
  next();
})
```

- `to` : 대상 **Route 객체**
- `from` : 현재 라우트로 오기전 라우트
- `next` : 이 함수는 훅을 해결하기 위해 호출되어야함. 액션은 next() 에 제공된 전달인자에 달려있음.
  - `next()` : 파이프라인의 다음 훅으로 이동. 혹이 없는경우 네비게이션 **승인**
  - `next(false)` : 현재 네비게이션 중단.
  - `next(/)` or `next({path : '/'})` : 다른 위치로 리다이렉션.
  - `next(error)` : (2.4.0+) error 에 전달된 인자가 Error 의 인스턴스이면 탐색이 중단되고, `router.onError()` 를 이용해 등록 된 콜백에 에러가 전달됩니다.

> **`next()`를 꼭 호출**해야함. 그렇지 않으면 훅이 불러지지 않음.

## redirect 옵션 사용해보기

```js
routes = [
  { path: "/intro", redirect: "/" },
  { path: "*", redirect: "/404" }, //
  { path: "*", redirect: "/" }, //  이렇게도 처리가 가능하다.
];
```

또는 `name`이 이정된 라우트로 할 수도있음.

```js
const router = new VueRouter({
  routes: [{ path: "/a", redirect: { name: "foo" } }],
});
```

또는 동적으로 리다이렉션을 할 수도있습니다.

```js
const router = new VueRouter({
  routes: [
    {
      path: "/a",
      redirect: (to) => {
        // 함수는 인수로 대상 라우트를 받습니다.
        // 여기서 path/location 반환합니다.
      },
    },
  ],
});
```

### mode

```js
const router = new VueRouter({
  mode: 'hash', // hash 가 기본 모드, history 가 있음.
  routes: [...]
})
```

`vue-router` 의 기본 모드는 _hash mode_ 입니다. URL 해시를 사용해 전체 URL을 시뮬레이트 하므로 URL이 변경 될 때 마다 페이지가 다시 로드 되지 않습니다.

해시를 제거하기 위해 라우터의 history 모드 를 사용할 수 있습니다. `history.pushState` API를 활용하여 페이지를 다시 로드하지 않고도 URL 탐색을 할 수 있습니다.

> yarn build dist 실행 liveserver로 dist 띄워서 실행해보면 좋음.

#### hash

(#) 북마크를 통해서 핸들링되며 실제로 url이 변경되지 않음. 즉, 항상 동일한 index.html을 서버에 요청할뿐

- localhost:8080/A -> 404
- localhost:8080/B -> 404
- localhost:8080/index.html#/A -> index.html
- localhost:8080/index.html#/B -> index.html

3번째 예시와 4번째 예시는 서버에 같은 index.html 을 요청 함.

#### history

서버에서 기본적으로 mapping된 라우트에 index.html을 리턴하도록 처리되어있음
localhost:8080/A -> index.html
localhost:8080/B ->index.html

devServer : { historyFallBack: false }로 하면 서버쪽에서의 처리를 하지않음.

### 트랜지션

`<router-view>`는 본질적으로 동적인 컴포넌트이기 때문에 `<transition>` 컴포넌트를 사용하는 것과 같은 방식으로 트랜지션 효과를 적용할 수 있습니다.

#### 라우트 별 트랜지션

위의 사용법은 모든 라우트에 대해 동일한 트랜지션을 적용합니다. 각 라우트의 컴포넌트가 서로 다른 트랜지션을 갖도록 하려면 각 라우트 컴포넌트 내에서 다른 이름으로 `<transition>`을 사용할 수 있습니다.

```js
const Foo = {
  template: `
    <transition name="slide">
      <div class="foo">...</div>
    </transition>
  `,
};

const Bar = {
  template: `
    <transition name="fade">
      <div class="bar">...</div>
    </transition>
  `,
};
```

### 데이터 가져오기

라우트가 활성화 될때 서버에서 데이터를 가져와야할 때가 있습니다.  
ex) 사용자의 프로필을 렌더링하기 전에 서버에서 데이터를 가져와야함.

- 탐색 후 가져오기 : 먼저 탐색하고 들어오는 컴포넌트의 라이프 사이클 훅에서 데이터를 가져옵니다. 데이터를 가져오는 동안 로드 상태를 표시합니다.
- 탐색하기 전에 가져오기 : 라우트 가드에서 경로를 탐색하기 전에 데이터를 가져오고 그 후에 탐색을 수행합니다.

사용자 경험에 따라 알맞게 선택해서 사용해아함.

#### 탐색 후 가져오기

`create()` 훅에서 데이터를 가져온다. 네트워크를 통해 데이터를 가져 오는 동안 로드 상태를 표시 할 수 있는 기회를 제공하며 각 뷰 마다 로드를 다르게 처리 할 수도 있습니다.

```html
<template>
  <div class="post">
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>
```

```js
export default {
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    };
  },
  created() {
    // 뷰가 생성되고 데이터가 이미 감시 되고 있을 때 데이터를 가져온다.
    this.fetchData();
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      // `getPost`를 데이터 가져오기 위한 유틸리티/API 래퍼로 변경합니다.
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.post = post;
        }
      });
    },
  },
};
```

#### 탐색하기 전에 가져오기

이 접근 방식을 사용하면 실제로 새 경로로 이동하기 전에 데이터를 가져옵니다. 들어오는 컴포넌트에서 `beforeRouteEnter` 가드에서 데이터를 가져올 수 있으며 페치가 완료되면 `next`만 호출 할 수 있습니다.

다음 뷰에 대한 리소스를 가져 오는 동안 사용자는 현재 뷰를 유지합니다. 따라서 데이터를 가져 오는 동안 진행률 표시줄이나 일종의 표시기를 표시하는 것을 추천합니다. 데이터 가져오기가 실패하면 일종의 전역 경고 메시지를 표시해야합니다.

```js
export default {
  data() {
    return {
      post: null,
      error: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    getPost(to.params.id, (err, post) => {
      next((vm) => vm.setData(err, post));
    });
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출합니다
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      // `getPost`를 데이터 페치 유틸리티/API 래퍼로 바꿉니다.
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false;
        if (err) {
          this.error = err.toString();
        } else {
          this.post = post;
        }
      });
    },
  },
};
```

### Lazy Loading

Vue 의 비동기 컴포넌트와 Webpack의 코드 분할을 이용해 라우트 컴포넌트를 쉽게 불어 올 수 있습니다.

```js
const router = new VueRouter({
  routes: [{ path: "/foo", component: Foo }],
});
```

#### 그룹화

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ "./Foo.vue");
const Bar = () => import(/* webpackChunkName: "group-foo" */ "./Bar.vue");
const Baz = () => import(/* webpackChunkName: "group-foo" */ "./Baz.vue");
```

webpack의 chunk 단위를 같게하여 같은 이름을 가진 chunk 로 구분 할 수있습니다.
