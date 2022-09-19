## 참고

## redirect 옵션

```js
routes = [
  { path: "/intro", redirect: "/" },
  { path: "*", redirect: "/404" }, //
  { path: "*", redirect: "/" }, //  이렇게도 처리가 가능하다.
];
```

#### `name`이 정의된 라우트로 리다이렉션 처리

```js
const router = new VueRouter({
  routes: [{ path: "/a", redirect: { name: "foo" } }],
});
```

#### 동적 리다이렉션 처리

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

---

### mode

```js
const router = new VueRouter({
  mode: 'hash', // hash 가 기본 모드, history 가 있음.
  routes: [...]
})
```

`vue-router` 의 기본 모드는 _hash mode_ 입니다. URL 해시를 사용해 전체 URL을 시뮬레이트 하므로 URL이 변경 될 때 마다 페이지가 다시 로드 되지 않습니다.

해시를 제거하기 위해 라우터의 history 모드 를 사용할 수 있습니다. `history.pushState` API를 활용하여 페이지를 다시 로드하지 않고도 URL 탐색을 할 수 있습니다.

> yarn build dist 실행 liveserver로 dist 띄워서 실행해보기

#### hash

(#) 북마크를 통해서 핸들링되며 실제로 url이 변경되지 않습니다.

즉, 항상 동일한 index.html을 서버 요청합니다.

- localhost:8080/A -> 404
- localhost:8080/B -> 404
- localhost:8080/index.html#/A -> index.html
- localhost:8080/index.html#/B -> index.html

3번째 예시와 4번째 예시는 서버에 같은 index.html 을 요청

#### history 모드

개발 환경의 로컬 서버에서는 기본적으로 모든 URL에 `index.html`을 응답합니다.

- localhost:8080/A -> index.html
- localhost:8080/B -> index.html

> 개발환경 설정시, (`vue.config.js`) 내에
>
> devServer : { historyFallBack: false } 처리시, 응답 하지 않습니다.

---

### 데이터 가져오기

라우트가 활성화 될때 서버에서 데이터를 가져와야할 때가 있습니다.

> 사용자의 프로필을 렌더링하기 전에 서버에서 데이터를 가져와야하는 경우

- 탐색 후 가져오기 : 먼저 탐색하고 들어오는 컴포넌트의 라이프 사이클 훅에서 데이터를 가져옵니다. 데이터를 가져오는 동안 로드 상태를 표시합니다.
- 탐색하기 전에 가져오기 : 라우트 가드에서 경로를 탐색하기 전에 데이터를 가져오고 그 후에 탐색을 수행합니다.

사용자 경험에 따라 알맞게 선택해서 사용할 수 있습니다.

#### 탐색 후 가져오기

`create()` 훅에서 데이터를 가져온다.

> 네트워크를 통해 데이터를 가져 오는 동안 로드 상태를 표시 할 수 있는 기회를 제공하며 각 뷰 마다 로드를 다르게 처리 할 수도 있습니다.

##### 예시

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

이 접근 방식을 사용하면 실제로 새 경로로 이동하기 전에 데이터를 가져옵니다.

들어오는 컴포넌트에서 `beforeRouteEnter` 가드에서 데이터를 가져올 수 있으며 페치가 완료되면 `next`만 호출 할 수 있습니다.

다음 뷰에 대한 리소스를 가져 오는 동안 사용자는 현재 뷰를 유지합니다.

따라서 데이터를 가져 오는 동안 진행률 표시줄이나 일종의 표시기를 표시하는 것을 추천합니다. 데이터 가져오기가 실패하면 일종의 전역 경고 메시지를 표시해야합니다.

##### 예시

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

---

### Lazy Loading

`Vue` 의 비동기 컴포넌트와 `Webpack`의 코드 분할을 이용해 라우트 컴포넌트를 쉽게 불어 올 수 있습니다.

```js
const router = new VueRouter({
  routes: [{ path: "/foo", component: Foo }],
});
```

---

#### 그룹화

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ "./Foo.vue");
const Bar = () => import(/* webpackChunkName: "group-foo" */ "./Bar.vue");
const Baz = () => import(/* webpackChunkName: "group-foo" */ "./Baz.vue");
```

`webpack`의 `chunk` 단위를 같게하여 같은 이름을 가진 `chunk` 로 구분 할 수있습니다.
