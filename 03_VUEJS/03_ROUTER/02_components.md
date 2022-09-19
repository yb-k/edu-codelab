## 라우터 컴포넌트

### 설정

`vue.conifg.js`를 아래와 같이 설정

```js
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true, // vue를 js로 작성 가능하도록
});
```

### router-view

`뷰 라우터`에서는 `URL`이 매칭되는것에 따라서 변경되는 동적으로 컴포넌트를 구성할 수 있는 컴포넌트를 제공하고있습니다.

이는 중첩이 가능한 구조입니다.

또한, `name` 속성을 통해 하나의 `URL`에 여러개의 컴포넌트를 맵핑 할 수 있습니다.

아래와 같이 실습을 진행해봅니다.

---

`src/views/ContainerView.vue`

```vue
<template>
  <div>
    <h1>Container</h1>
    <div class="content">
      <router-view></router-view>
      <router-view name="a"></router-view>
    </div>
  </div>
</template>

<style scoped>
.content {
  border: 1px solid black;
}
</style>
```

`src/router/index.js`

```js
import ContainerView from "@/views/ContainerView";

const routes = [
  // router 설정
  {
    path: "/",
    component: ContainerView,
    children: [
      {
        path: "",
        components: {
          default: { template: "<h1>First</h1>" },
          a: { template: "<h1>A</h1>" },
        },
      },
    ],
  },
];
```

---

### router-link

`뷰 라우터`에서는 편의성을 위해 페이지 이동에 사용할 수 있는 컴포넌트와 API를 제공합니다.

`<router-link>` 를 사용하여 선언적 네비게이션을 사용할 수도 있습니다.

```js
const routes = [
  { path: "*", redirect: "/" }, // redirect 처리
  {
    path: "/",
    component: ContainerView,
    children: [
      // chiledren을 통해 중첩 라우트 설정
      {
        path: "",
        components: {
          default: { template: "<h1>First</h1>" },
          a: { template: "<h1>A</h1>" },
        },
        alias: "/first",
      },
      {
        path: "/second",
        name: "second",
        component: { template: "<h1>Second</h1>" },
      },
      {
        path: "/third",
        component: { template: "<h1>Third</h1>" },
      },
    ],
  },
];
```

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
      </ul>
    </nav>
    <div class="content">
      <router-view></router-view>
      <router-view name="a"></router-view>
    </div>
  </div>
</template>

<style scoped>
.content {
  border: 1px solid black;
}
nav > ul {
  display: flex;
  direction: row;
}
nav > ul > li {
  margin-right: 50px;
}
.router-link-active {
  font-weight: 800;
}
</style>
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
