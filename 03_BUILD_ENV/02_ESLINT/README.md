# ESLINT

> [ESLint 공식사이트](https://eslint.org/)

## 설명

`Lint`란, 소스코드 상의 오류나 버그, 코드 스타일 오류 등 표시하기 위한 도구이며

그중 `ESLint`는 `javascript`에서 가장 많이 사용되는 `Lint`도구 중 하나입니다.

대부분의 최신 프레임워크 (react, vue, angular 등)에서 권장되는 사항이며,

제공되는 기본 템플릿 프로젝트에서도 필수적으로 적용되어있는 것을 확인할 수 있습니다.


## 설치

```bash
  npm i -D eslint
```

## 실행

```bash
  ## 검사 실행
  eslint src/ -c .eslint.json --ext .js

  ## 검사 후 수정가능한 부분에 대해서 자동 수정
  eslint src/ -c .eslint.json --ext .js --fix
```


## 예시

1. 발생가능한 오류에 대한 오류 표시 (문맥상의 오류)

  -  no-undef  (선언하지 않은 변수에 대한 참조)
  ```js
    function fn(a, b) {
      return a + b + c; // c is undefined!
    }
  ```

  - no-unused-vars (선언했으나 사용되지 않은 변수)
  ```js
    function fn(a, b, c) { // not used 'c'
      return a + b;
    }
  ```

  - no-unreachable (도달할 수 없는 구문)
  ```js
  function fn() {
    x = 1;
    return x;
    x = 3; // this will never execute
  }
  ```

2. 코드 스타일에 대한 처리

  - quotes : "single" (문자열 선언시 홀따옴표 사용 강제)
  ```js
    var bar = 'a'; // success
    var foo = "a"; // error
  ```
  
  - indentr : '2' (들여쓰기에 대한 처리 (공백 2칸))
  ```js
    function (some) {
          some();  // indent error!
    }
  ```

## 설정

### 파일 포맷
설정 파일은 아래의 포맷을 지원합니다.
1. .eslintrc.js
2. .eslintrc.cjs
3. .eslintrc.yaml
4. .eslintrc.yml
5. .eslintrc.json
6. package.json

### 옵션


```json
// .eslintrc.json 예시

{
  "root": true, // 현재 설정파일 기준 root로 설정 여부
  "env": { // 코드 runtime 환경
    "browser": true
  },
  "extends": ["eslint:recommended", "airbnb-base"], 
  // babel preset과 비슷한 개념으로, 사전 정의된 eslint 설정 상속한다
  // 'essential'는 '필수'
  // 'recommended'는 '권장'
  "plugins": [], // 기타 플러그인 사용시 ex ) babel-plugin
  "globals": {   // 전역객체에 대한 정의
    "Global": "writable", // writable 수정가능한
    "$":"readonly" // 수정불가능한
  },
  "rules": { // rule 설정
      // "semi": ["error", "always"],
      // "quotes": ["error", "double"]
  },
  "ignorePatterns": ["ignore/**"] // 제외하는 폴더 및 파일로 glob 패턴을 지원
  // 또는 .eslintignore 를 생성하여 처리할 수 도있다.
}
```
> 아래의 링크에서 전체 룰을 확인할 수 있습니다.

> [ESLint Rules](https://eslint.org/docs/rules/)

### 특정 파일, 라인에 대한 룰 제외

1. 특정 파일에 대한 룰 제외 (파일 최상단에 작성)
```js
  /* eslint-disable */ 모든 룰 제외
  
  /* eslint-disable  no-undef */ 특정 룰 제외
```

2. 특정 라인에 대한 룰 제외

```js
  // eslint-disable-next-line 모든 룰 제외
  var poo = 'poo'; // 적용될 라인
```

```js
  // eslint-disable-next-line no-var  특정 룰 제외
  var poo = 'poo'; // 적용될 라인
```

3. 전역 변수 사용시
```js
/* global var1, var2 */

또는

/* global var1:writable, var2:writable */
```

## 실습요구사항
  
  practice 폴더에서 진행합니다.

  1. `ESLint`설치 및 설정 파일 생성

  2. `src/ignore` 하위 파일은 Lint에서 제외한다.
  
  3. `eslint:recommended`를 적용하여 에러가 표시되는 내용을 확인한다.

  4. `scripts`에 `lint`, `lintfix`(--fix 플래그 추가)를 정의하여 실행해본다.

## 선택적 요구사항

  - 사용하는 IDE에서 ESLint 확장 플러그인을 설치하여 사용해본다.

  - `eslint-config-airbnb-base` (airbnb 코드스타일)을 eslint에 추가한다.

  - `prettier`를 eslint와 같이 구성한다.