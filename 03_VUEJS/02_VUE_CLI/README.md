# Vue CLI

> CLI란? 
>
>`Command Line Interface`의 줄임말로 커맨드 프로그램입니다.

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
yarn server
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