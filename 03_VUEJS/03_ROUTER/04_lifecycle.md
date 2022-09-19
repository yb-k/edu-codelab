## 생명주기

### 서론

`<router-view>`를 통해 컴포넌트가 마운트 되는 경우

해당 컴포넌트는 라우터와 관련된 생명주기를 추가로 사용할 수 있습니다.

### 라우터 진입 전

```js
/**
 * 이 구성 요소를 렌더링하는 경로가 확인되기 전에 호출됩니다.
 * @param to 이동할 대상의 라우터 객체
 * @param from 이동 요청한 대상의 라우터 객체
 * @param next 라우터 이동 훅
 **/
beforeRouterEnter(to, from, next) {
  // this에 접근 할 수 없습니다.
  next(); // 호출되어야 정상적으로 렌더링이 진행됩니다.
}
```

### 라우터 이탈 전

```js
/**
 * 경로가 변경되기 전에 호출됩니다.
 * @param to 이동할 대상의 라우터 객체
 * @param from 이동 요청한 대상의 라우터 객체
 * @param next 라우터 이동 훅
 **/
beforeRouterLeave(to, from, next) {
  // this에 접근 할 수 있습니다.
  next(); // 호출되어야 정상적으로 렌더링이 진행됩니다.
}
```

### next 핸들링

`next` hook은 아래와 같이 호출할 수 있습니다.

```js
// 승인
next();

// 중단
next(false);

// 다른 위치로 리다이렉션
next("/login");
next({ name: "login", params: {} });

// (2.4.0+) error 에 전달된 인자가 Error 의 인스턴스이면  탐색이 중단되고,
// router.onError() 를 이용해 등록 된 콜백에 에러가 전달됩니다.
next(new Error());
```

### 네비게이션 가드 (전역적 이벤트)

뷰 라우터에서는 전역적으로 핸들링 가능한 네비게이션 hook를 제공하고 있습니다.

#### router.beforeEach

탐색(이동) 시, 호출되는 hook입니다.

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})

```

이를 활용하여 권한(세션)에 대한 처리로도 활용할 수 있습니다.

```js
router.beforeEach((to, from, next) => {
  if (to.name !== "Login" && !isAuthenticated) next({ name: "Login" });
  else next();
});
```

또한, 탐색(이동) 후에 대한 hook도 사용할 수 있습니다.

```js
router.afterEach((to, from) => {
  // ...
});
```

## 실습

### 필수 파라미터 체크

`ConatinerView.vue`

`router-link` /echo 추가

```vue
<tempalte>
 <nav>
      <ul>
        <!-- 생략 -->
        <li>
          <router-link to="/echo?value=hello-world"
            >echo?value=hello-world</router-link
          >
        </li>
        <li>
          <router-link to="/echo">echo</router-link>
        </li>
      </ul>
    </nav>
</tempalte>
```

`/router/index.js`

/echo 라우트 추가

```js
const routes = [
  {
    path: "/",
    component: ContainerView,
    children: [
      //... 생략
      {
        path: "/echo",
        component: {
          template: "<h2>{{$route.query.value}}</h2>",
          beforeRouteEnter(to, from, next) {
            if (!to.query.value) {
              window.alert("value은 필수 입니다.");
              return next("/");
            }
            next();
          },
          beforeRouteUpdate(to, from, next) {
            // 경로가 수정되면 발생되는 이벤트
            if (!to.query.value) {
              window.alert("value은 필수 입니다.");
              return next("/");
            }
            next();
          },
        },
      },
    ],
  },
];
```

### 전역 네비게이션 활용

`/router/index.js`

```js
const router = new VueRouter({
  mode: "history", // or "hash"
  base: process.env.BASE_URL,
  routes,
});

const isAnonymous = ["/", "/first", "/third", "/match", "/echo"];
router.beforeEach((to, from, next) => {
  if (!isAnonymous.includes(to.path)) {
    alert("제한된 접근");
    return next("/first");
  }
  next();
});

export default router;
```
