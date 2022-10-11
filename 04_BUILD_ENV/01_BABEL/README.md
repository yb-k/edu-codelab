# Babel

## 설명

브라우저는 버전에 따라 지원하지 않는 `JavaScript`함수 또는 키워드가 존재할 수 있습니다.

> 브라우저 버전에 따른 지원 여부 [es6 browser suppport](https://kangax.github.io/compat-table/es6/)

때문에, 사용자가 접근한 브라우저 버전에 따라서 미동작할 수 있습니다.

`babel`을 통해서 브라우저 지원버전을 설정하고 플러그인 또는 옵션을 통해

문법에 대한 동작을 보장받을 수 있습니다.

다만, 너무 낮은 버전의 브라우저도 지원하는 경우

파일 용량이 커질 수 있기 때문에 적절하게 구성하는 것이 좋습니다.

---

## 설정 파일

설정 파일은 아래와 같은 방법으로 구성할 수 있습니다.

- `.babelrc` 또는 `.babelrc.json` 파일을 통한 설정

- `babel.config.json` 또는 `.js`, `.cjs`, `.mjs`

- `package.json` 내 `"babel"` 키를 통한 설정

---

## 설정 옵션

많은 옵션이 있지만 아래의 내용만 체크해도 크게 문제없습니다.

- `plugins` : 플러그인 (실질적으로 변경되는 기능)

- `presets` : 사전 설정 (플러그인 모음으로, preset-env는 일반적으로 많이 사용하는 사전설정)

- `targets` : 지원 범위 설정 ([browserslist](https://github.com/browserslist/browserslist))

---

## 실습

1. `master`를 참고하여 `.babelrc`을 작성 babel을 통해 `lib/lib.js`을 생성하여 전후를 확인

## 선택적 실습

> babel 7.4.0 이상부터 `@babel/polyfill`가 decrecated되어 폴리필 처리에 대해 아래와 같은 플러그인으로 처리가 필요함

- babel plugins `@babel/plugin-transform-runtime`을 추가하여 처리
