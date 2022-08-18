# Concept

`Vue`를 들어가기 전, 사전 학습해두면 좋은 내용을 정리해 두었습니다.
## keyword

- `웹 프론트 개발 트렌드`
- `SPA (Single Page Application) with CSR (Client Side Rendering)`
- `선언형 프로그래밍 방식`
- `컴포넌트(Component) 개발 방식`
  - `관심사 분리의 문제점`
  - `아토믹 디자인 패턴(Atomic Design)`
- `번들링(컴파일 또는 빌드)을 사용하는 프론트개발환경`


### 웹 프론트 개발 트렌드

> [2022 프론트엔드 동향](https://tsh.io/state-of-frontend/)

- 최근 1년 동안 사용한 프레임워크를 사용하고 좋아했는지에 대한 응답
![1년간 사용한 프레임워크 통계](https://raw.githubusercontent.com/yb-k/edu-codelab/main/static/2022_front_framework.png)
> source: tsh.io/state-of-frontend

실제 한국에서도 대기업에서는 표준 플랫폼으로 (`Vue` 또는 `React`)를 선택하여 개발하는 추세이다.


### SPA (Single Page Application) with CSR (Client Side Rendering)

#### SPA란

`SPA`란, 하나의 페이지만을 사용하는 어플리케이션입니다.

`SPA`는 `JavaScript`에게 화면에 대한 제어권을 넘겨줌으로 실제로 새로운 페이지를 그리는 것이 아닌 이동된것 처럼 동작합니다.

이런 동작 방식은 화면에 대한 랜더링을 `Client`쪽에서 일임하는 방식으로 이를 `CSR`이라고도 합니다.


- 장점
  - 퍼포먼스 향상(사용자 경험 개선) : 불필요한 또는 중복되는 리소스를 로딩하지 않습니다.
  - 개발 영역의 분리 : `FrontEnd`와 `BackEnd`가 분리됩니다.

- 단점
  - 초기 리소스 로딩이 오래 걸린다. (최적화를 위한 `code split` 과 `lazyload`로 해결됨)
  - 검색 엔진인, `SEO`에 취약하다 (SSG 프레임워크 등장)

#### 짚고 넘어가기

하지만 대부분의 페이지는 실제로 `URL`이 변경되는데 일반적으로 `SPA`의 단점을 보완하기 위해서

아래와 같은 방식으로 처리되고 있습니다.


- 웹 서버에서 기본적(전역적)으로 `GET` 요청에 대한 응답을 `index.html`
       
  즉, 하나의 HTML을 응답하도록 설정하여 처리하는 방식 (`history mode`)

- 북마크(`#`)을 통한 `onHashChangeEvent`를 통해 실제로 `URL`이 변경되지 않지만, 변경된것 처럼 처리하는 방식

- `SSG`(Static Site Generators)을 통한 path 별 대응되는 `html`을 생성하여 처리하는 방식

- `SSR`(Server Side Rendering)방식으로 서버 내부적으로 처리되는 방식

- SSG 프레임워크(`Next.js` 또는 `Nuxt.js`)는 `SSG`와 `SSR` 두가지 방식을 같이 제공한다.

### 선언형 프로그래밍 방식


### 컴포넌트(Component) 개발 방식

#### 관심사 분리의 문제점

#### 아토믹 디자인 패턴(Atomic Design)

### 번들링(컴파일 또는 빌드)을 사용하는 프론트개발환경