## 파라미터

### 파라미터 처리

`$router.push({ name: 'test', params: {key : value} , query : {key : value}})`

> `params` 는 `path`와 동시에 사용될때, 무시된다. 따라서 `params`를 사용할 떄는 `name` 을 사용해야한다.

```js
// literal string path
this.$router.push("/users/eduardo");

// object with path
this.$router.push({ path: "/users/eduardo" });

// named route with params to let the router build the url
this.$router.push({ name: "user", params: { username: "eduardo" } });

// with query, resulting in /register?plan=private
this.$router.push({ path: "/register", query: { plan: "private" } });

// with hash, resulting in /about#team
this.$router.push({ path: "/about", hash: "#team" });
```

### match를 사용한 파라미터 전달

```js
const routes = [
  // matches /o/3549
  { path: "/o/:orderId" },
  // matches /p/books
  { path: "/p/:productName" },
];
```

#### 숫자만 허용시

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

## 실습

### 파라미터 전달

`src/views/ContainerView.vue`

```vue
<template>
  <div>
    <h1>Container</h1>
    <nav>
      <ul>
        <li>
          <router-link to="/first">first</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'second' }" replace>second</router-link>
        </li>
        <li>
          <router-link tag="button" :to="{ path: '/third' }">third</router-link>
        </li>
        <li>
          <button @click="$router.back()">back</button>
        </li>
        <li>
          <router-link to="/query?hello=world">query</router-link>
        </li>
        <li>
          <router-link
            :to="{
              path: '/query',
              query: { key: 'value' },
              params: { key: 'value' },
            }"
            >query2</router-link
          >
        </li>
        <li>
          <router-link
            :to="{
              name: 'props',
              query: { key: 'value' },
              params: { key: 'value' },
            }"
            >props</router-link
          >
        </li>
        <li>
          <router-link
            :to="{
              path: '/match/hello',
              query: { key: 'value' },
            }"
            >match</router-link
          >
        </li>
        <li>
          <router-link to="/matchNum/3">matchNum</router-link>
        </li>
      </ul>
    </nav>
    <div class="content">
      <router-view></router-view>
      <router-view name="a"></router-view>
    </div>
  </div>
</template>
```

`src/router/index.js`

```js
// ...중략
const INIT_PARAM_VIEW = () => ({
  template: `<div>
  <h3>query</h3>
  <pre>{{querysStr}}</pre>
  <h3>params</h3>
  <pre>{{paramsStr}}</pre></div>`,
  computed: {
    paramsStr() {
      return JSON.stringify(this.$route.params, "\t", 4);
    },
    querysStr() {
      return JSON.stringify(this.$route.query, "\t", 4);
    },
  },
});
// ... 중략
const routes = [
  { path: "*", redirect: "/" },
  {
    path: "/",
    component: ContainerView,
    children: [
      // ... 중략
      {
        path: "/query",
        component: INIT_PARAM_VIEW(),
      },
      {
        name: "props", // 객체 전달시 꼭 선언
        path: "/props",
        props: true, // 객체 전달시에 꼭 선언
        component: INIT_PARAM_VIEW(),
      },
      {
        path: "/match/:key",
        component: INIT_PARAM_VIEW(),
      },
      {
        path: "/matchNum/:onlyNum(\\d+)",
        component: INIT_PARAM_VIEW(),
      },
    ],
  },
];
```
