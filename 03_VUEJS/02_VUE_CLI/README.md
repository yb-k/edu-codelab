# Vue CLI

> CLI란?
>
> `Command Line Interface`의 줄임말로 커맨드 프로그램입니다.

## 서론

`Vue`는 브라우저에 직접 로드하여 사용할 수도 있지만, 어느정도 규모있는 프로젝트 경우 여러 문제를 야기할 수 있습니다.

이러한 문제점을 해결하기 위 `Webpack` 또는 `Browserify`와 같은 빌드 도구를 사용하여 `.vue`확장자의 프로젝트를 구성할 수 있습니다.

따라서, 이번 챕터 부터는 `vue-cli`를 통해 생성된 기본 프로젝트를 가지고 실습을 진행하게 됩니다.

`04_BUILD_ENV`에서 해당 빌드 환경(도구)에 대한 내용을 담고있습니다.

현재 챕터에서는 `vue-cli`를 설치하고 사용하는 방법에 대한 간단한 가이드를 담고 있습니다.

## 설치

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

> `vue-cli`는 5버전대를 사용합니다.

```bash
vue -V
# @vue/cli 5.0.x
```

## 프로젝트 생성

아래의 스탭을 따라옵니다.

#### 사용할 패키지 매니저 설정 (선택)

`vue-cli`를 통해 프로젝트 매니저를 변경하고 싶은 경우, 아래의 내용을 확인한다.

실습시 예제에서는 `yarn`을 사용한다.

```bash
vue config
Resolved path: /Users/uracle/.vuerc # 설정 파일 경로
 {
  "useTaobaoRegistry": false,
  "latestVersion": "5.0.8",
  "lastChecked": 1657254983035,
  "packageManager": "yarn" # npm인 경우 yarn으로 수정한다.
}
```

#### 프로젝트 생성 시작

```bash

cd 02_VUE_CLI/practice

vue create hello-vue

```

#### 프로젝트 생성 환경에 대한 선택

```bash
Vue CLI v5.0.8
? Please pick a preset:
  Default ([Vue 3] babel, eslint)
  Default ([Vue 2] babel, eslint)
❯ Manually select features  # 선택
```

#### 프로젝트 내 사용 도구 설정

```bash
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
 ◉ Babel # (권장) 바벨
 ◯ TypeScript # 타입스크립트 사용시
 ◯ Progressive Web App (PWA) Support # PWA 사용시
 ◉ Router # (권장) 라우터 필수
 ◉ Vuex #(권장) Vuex 필수
 ◯ CSS Pre-processors #(선택적 사용) Sass, PostCss 사용시
 ◉ Linter / Formatter #(권장) 린터 및 포맷터 필수
 ◯ Unit Testing # unit 테스트시
 ◯ E2E Testing # e2e 테스트시
```

#### Vue 버전 선택

```bash
? Choose a version of Vue.js that you want to start the project with
  3.x
❯ 2.x # 선택
```

#### Vue-Router 동작 모드에 대한 설정

> `history`모드는 서버에서 별도로 `SPA`구조로 응답처리가 되어있어야합니다.

> `n`을 입력하는 경우 `hash`모드로 동작하며 별도의 서버에서 처리가 필요하지 않습니다.

```bash
? Use history mode for router? (Requires proper server setup for index fallback in production) (Y/n)
Y
```

#### 린트 / 포맷터 설정

> 린트 또는 린터는 소스 코드를 분석하여 프로그램 오류, 버그, 스타일 오류, 의심스러운 구조체에 표시를 달아놓기 위한 도구들

> 포맷터는 코드 스타일에 대한 도구입니다.

```bash
? Pick a linter / formatter config:
  ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
❯ ESLint + Prettier  # (권장)
```

#### 린트 시점에 대한 설정

```bash
? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
❯◉ Lint on save # 저장 시 자동 린트
 ◯ Lint and fix on commit # 커밋시 린트 강제
```

#### 도구 설정 파일에 대한 설정

```bash
? Where do you prefer placing config for Babel, ESLint, etc.? (Use arrow keys)
❯ In dedicated config files # 설정 파일을 별도의 파일로 관리
  In package.json # package.json 내에서 관리
```

#### 현재 사용한 옵션을 기본 옵션으로 사용 여부

```bash
? Save this as a preset for future projects? (y/N)
N
```

#### 설치 완료 후 실행

```bash
cd hello-vue
yarn serve
```

## 생성 된 파일/폴더 구조

- public : 정적 자원에 대한 폴더 (default copy)
  - index.html : `html`파일 템플릿
- src : 소스 코드
  - assets : 정적자원에 대한 폴더 (tracking by webpack)
  - components : 컴포넌트 단위 `.vue` 파일
  - router : `Vue-Router` 관련
  - store : `Vuex` 관련
  - views : 라우팅(페이지)별 단위 `.vue`파일
  - Apps.vue : 루트(root) 컴포넌트
  - main.js : 메인 시작점 (webpack 진입(entry) 지점)
- .browserlistrc : 크로스 브라우징을 위한 브라우저 버전 설정 관련
- .eslintrc.js : enlint config 파일
- babel.config.js : babel config 파일
- jsconfig.json : `vscode`에서 `js`프로젝트에 대한 사용자 편의성을 위한 config 파일
- vue.config.js : vue-cli-services를 사용하는 config 파일 (with.webpack 설정)

## 기본 지원 커맨드

```bash

yarm serve # localserver 실행

yarn build # 소스 코드 기준 웹 리소스를 생성한다.

yarn lint # 소스코드 린트 실행

```

## 스크립트 확장

실제 개발시에는 운영/개발에 따라서 상수값을 핸들링하거나

별도의 옵션이 필요한 경우가 있습니다.

이러한 케이스를 위해서 `vue-cli`에서는 `.env`파일을 통해서 일부 옵션을 제공하고 있습니다.

환경은 일반적으로 아래와 같이 관리합니다.

- production : 운영
- development : 개발
- local : 개발자 간 로컬 환경에 대한 구성 (gitignore)
- test : 테스트 진행시

해당 환경을 아래와 같이 파일로 분리하여 관리할 수 있습니다.

```bash
.env                # 기본 (base)
.env.local          # 로컬환경
.env.[mode]         # 특정 모드 (production / development)
.env.[mode].local   # 특정 모드 + 로컬환경
```

### env 파일 작성

프로젝트 경로에 `.env`파일 생성하여 주석을 참고하여 아래와 같이 작성합니다.

```bash
# 빌드 환경에 대한 환경변수
HOST=0.0.0.0 # dev server host
PORT=9090 # dev server port
BASE_URL=/ # context Root (Public Path)


#앱 내 환경 변수
#해당 상수는 'VUE_APP_'이 prexif로 사용되어야한다.
#별도의 암호화를 하지 않는다.
VUE_APP_NOT_SECRET_CODE=1234
VUE_APP_API_URL=http://localhost:7070/api
```

> 해당 파일을 기준으로 `mode`에 따라서 환경변수파일을 생성하여 관리합니다.

해당 `env`에서 선언한 데이터는 아래와 같이 접근 하여 확인 할 수 있습니다.

```vue
<template>
  <div id="app">
    <h1>{{ secretCode }} {{ apiUrl }} {{ mode }} {{ baseUrl }}</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
const { VUE_APP_NOT_SECRET_CODE, VUE_APP_API_URL, NODE_ENV, BASE_URL } =
  process.env;
export default {
  data() {
    return {
      secretCode: VUE_APP_NOT_SECRET_CODE,
      apiUrl: VUE_APP_API_URL,
      mode: NODE_ENV,
      baseUrl: BASE_URL,
    };
  },
};
</script>
```

### LazyLoad를 위한 Magic Comment

> `lazyload`란, 직역하면 게으른 로딩으로 불필요한 리소스를 나중에 필요한 시점에 로드시키는 방식을 말한다.

개발자도구를 통해서 `network`을 켠 후 **about** 하이퍼링크를 클릭하여 about 페이지로 이동하면 아래와 같이 about.js파일이 추가되는 것을 확인해볼 수 있습니다.

![lazyload image](https://raw.githubusercontent.com/yb-k/edu-codelab/main/static/lazyload.png)

해당 기능은 `magic comment`를 사용하여 아래와 같이 라우터 파일에서 처리할 수 있습니다.

`router/index.js`

```js
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  ...
]
```

사용자 경험 및 초기 로딩속도를 개선하기 위해서는 위와 같이 적절한 단위로 `chunk`를 분리할 필요가 있습니다.

## vue.config.js

현재까지 `vue-cli`를 통해서 vue프로젝트를 구성하여 실행/빌드를 진행하였습니다.

이러한 실행/빌드에 대한 구성은 실제로 `webpack`이라는 번들러를 통해서 처리가 되는데 `vue-cli`에서는 해당 환경 구성을 번경할 수 있도록 가이드를 제공하고 있습니다.

챕터4에서 해당 구성에 대해서 설명하겠지만, `vue-cli`에서 기본적인 설정과 활용성/편의성에 관련된 옵션에 대해서 간단하게 진행합니다.

> [Vue-CLI Config Reference 참고](https://cli.vuejs.org/config/)

`vue.config.js`

```js
/* vue-cli config options */
const { NODE_ENV, SOURCE_MAP, BASE_URL, OUTPUT_DIR, ASSETS_DIR, PROXY_SERVER } =
  process.env;
const isProduction = NODE_ENV === "production";
const sourceMap = isProduction && SOURCE_MAP === "true";
const publicPath = BASE_URL || "/";
const outputDir = OUTPUT_DIR || "dist";
const assetsDir = ASSETS_DIR || "";
const proxyServer = PROXY_SERVER || "";

const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true, // babel loader를 사용하여 설치된 pacakge 내의 소스를 변환할지에 대한 여부
  publicPath, // Public Path, 빌드된 html 파일 내의 src 경로 확인 (like contextRoot)
  outputDir, // 빌드 경로
  assetsDir, // 빌드시 정적 콘텐츠에 대한 위치
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
      // the source template
      template: "public/index.html",
      // output as dist/index.html
      filename: "index.html",
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: "hello-my-vue",
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  css: {
    sourceMap: sourceMap,
  },
  devServer: {
    proxy: proxyServer,
    client: {
      overlay: {
        warnings: false, // lint warning가 뜨면 화면에 오버레이할 지 여부
        errors: false, // lint error가 뜨면 화면에 오버레이할 지 여부
      },
    },
  },
  productionSourceMap: sourceMap, // build시 sourcemap 생성 여부
});
```

해당 기능은 아래와 같이 `env`파일을 통해 핸들링할 수 있습니다.

```base
# 빌드 환경에 대한 환경변수

# dev server host
HOST=0.0.0.0
# dev server port
PORT=9090
# context Root (Public Path)
BASE_URL=/


## CUSTOM 환경변수
SOURCE_MAP=false
OUTPUT_DIR=mydist
ASSETS_DIR=static
# PROXY_SERVER=

#앱 내 환경 변수
#해당 상수는 'VUE_APP_'이 prexif로 사용되어야한다.
#별도의 암호화를 하지 않는다.
VUE_APP_NOT_SECRET_CODE=1234
VUE_APP_API_URL=http://localhost:7070/api
```

해당 값을 변경해보면서 `serve`/`build`를 수행해보시길 바랍니다.

기본적으로 해당 커맨드들은 아래와 같은 모드로 처리되며, 수정을 원하는 경우 `scripts`를 확장하여 처리해볼 수 있습니다.

```json
{
  "scripts": {
    "serve": "vue-cli-service serve --mode development",
    "serve:prd": "vue-cli-service serve --mode production",
    "build": "vue-cli-service build --mode production",
    "build:dev": "vue-cli-service build --mode development",
    "lint": "vue-cli-service lint"
  }
}
```
