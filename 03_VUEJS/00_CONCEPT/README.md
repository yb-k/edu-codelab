# Concept

`Vue`를 들어가기 전, 사전 학습해두면 좋은 내용을 정리해 두었습니다.

## keyword

- `웹 프론트 개발 트렌드`
- `SPA (Single Page Application) with CSR (Client Side Rendering)`
- `선언형 프로그래밍 방식`
- `컴포넌트(Component) 개발 방식`
  - `관심사 분리`
  - `아토믹 디자인 패턴(Atomic Design)`
- `번들링(컴파일 또는 빌드)을 사용하는 프론트개발환경`

<br>

---

### 웹 프론트 개발 트렌드

> [2022 프론트엔드 동향](https://tsh.io/state-of-frontend/)

- 최근 1년 동안 사용한 프레임워크를 사용하고 좋아했는지에 대한 응답
  ![1년간 사용한 프레임워크 통계](https://raw.githubusercontent.com/yb-k/edu-codelab/main/static/2022_front_framework.png)
  > source: tsh.io/state-of-frontend

실제 한국에서도 대기업에서는 표준 플랫폼으로 (`Vue` 또는 `React`)를 선택하여 개발하는 추세이다.

<br>

---

### SPA (Single Page Application) with CSR (Client Side Rendering)

#### SPA란

`SPA`란, 하나의 페이지만을 사용하는 어플리케이션입니다.

`SPA`는 `JavaScript`에게 화면에 대한 제어권을 넘겨줌으로 실제로 새로운 페이지를 그리는 것이 아닌 이동된것 처럼 동작합니다.

이런 동작 방식은 화면에 대한 랜더링을 `Client`쪽에서 일임하는 방식으로 이를 `CSR`이라고도 합니다.

<br>

- **장점**

  - 퍼포먼스 향상(사용자 경험 개선) : 불필요한 또는 중복되는 리소스를 로딩하지 않습니다.
  - 개발 영역의 분리 : `FrontEnd`와 `BackEnd`가 분리됩니다.

- **단점**
  - 초기 리소스 로딩이 오래 걸린다. (최적화를 위한 `code split` 과 `lazyload`로 해결됨)
  - 검색 엔진인, `SEO`에 취약하다 (SSG 프레임워크 등장)

---

#### 짚고 넘어가기

하지만 대부분의 앱은 `SPA` 설명처럼 동작하지 않습니다!

이는, 일반적으로 `SPA`의 단점을 보완하기 위해서 아래와 같은 방식으로 처리되고 있습니다.

<br>

- 웹 서버에서 기본적(전역적)으로 `GET` 요청에 대한 응답을 `index.html`

  즉, 하나의 HTML을 응답하도록 설정하여 처리하는 방식 (`history mode`)

- 북마크(`#`)을 통한 `onHashChangeEvent`를 통해 실제로 `URL`이 변경되지 않지만, 변경된것 처럼 처리하는 방식

- `SSG`(Static Site Generators)을 통한 path 별 대응되는 `html`을 생성하여 처리하는 방식

- `SSR`(Server Side Rendering)방식으로 서버 내부적으로 처리되는 방식

- SSG 프레임워크(`Next.js` 또는 `Nuxt.js`)는 `SSG`와 `SSR` 두가지 방식을 같이 제공한다.

<br>

> `Vue`와 같은 `SPA` 방식의 프레임워크들에서 단점을 보완하기 위해
> 여러 프레임워크(`Nust.js`)들이 파생되었다.

---

### 선언형 프로그래밍 방식

명령형은 `어떻게` 할 것인가에 관점을 두며

선언형은 `무엇을` 에 관점을 두어 개발하는 방식이다.

<br>

**현실예시**

> 유라클을 어떻게 가야하나요?

<br>

**명령형 접근 방식**

> 9호선 봉은사역 5번출구로 나와서 오른쪽으로 두 블럭을 150미터 정도 직진합니다.
>
> 이후 3번째 골목으로 들어가 직진, 오른쪽에 있는 삼거리에서 치킨집 골목으로 200미터를 직진하면 됩니다.

<br>

**선언형 접근 방식**

> 서울 강남구 봉은사로108길 33 입니다.

훨씬 간결하다는 것을 알수있다.

이유는 사소한 처리에 대헤서는 컴퓨터에게 위임하기 때문인데

이러한 이유로 선언형 프로그래밍에서는 `높은 수준의 추상화`라는 키워드가 따라 붙는다.

> 이러한 패러다임의 변화는 근래의 자동차 기어 변환 장치가 수동(스틱)에서 자동(오토)으로 변화된 것과 비슷한 양상이다.

<br><br>

`jQuery` 또는 `DOM API`는 기본적으로 명령형 프로그래밍 방식입니다.

`jQuery`를 사용한 명령형 프로그래밍 방식 예시

```js
$("button.content-tab")
  .eq(2)
  .on("click", function () {
    $(".content-box").each(function (index) {
      if (index === 2) {
        $(this)
          .show()
          .find(".card li")
          .removeClass("is-on")
          .has("a.highlight[href]")
          .addClass("activate");
      } else {
        $(this).hide();
      }
    });
  });
```

- `DOM`을 직접 핸들링하며, `Element`의 형태을 한눈에 파악하기 힘들다.
- `class` 또는 `data-`에서 상태를 관리하여 전체적인 상태 흐름을 파악하기 어렵다.
- `UI` 상태 변화를 위해 많은 함수를 정의해야한다. (draw, change, click, redraw..)
- 가독성 및 유지보수성이 좋지 않다.

<br>

`Vue`를 사용한 선언형 프로그래밍 방식

```vue
<template>
  <div>
    <h1>Hello {{ content }}</h1>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      content: "Vue",
    };
  },
};
</script>
```

- `DOM`을 직접 핸들링하지 않는다.`상태`를 관리한다.

---

### 컴포넌트(Component) 개발 방식

`컴포넌트`란, 재사용이 가능한 독립된 모듈을 말한다.

> `Vue`에서는 재사용 가능한 최소 단위로 표현한다.

#### 관심사 분리

`HTML`, `CSS`, `JS`를 분리하는 것이 당연한 관심사의 분리라고 생각했다.

**Project Folder Stucructer**

- html
  - intro.html
- js
  - intro.js
- css
  - style.css

하지만, 버그나 수정사항이 발생되는 경우 함께 수정해야할 확률이 높다.
이런 경우, 분리된 환경보다 모여있는 경우가 대응하기 훨씬 수월하다.

<br>

**Vue 파일 (Single File Component)**

```vue
<template />
<!-- HTML -->
<script />
<!-- JS -->
<style />
<!-- CSS -->
```

> 즉, `UI` 중 하나의 구성(모듈)이라는 관심사로 볼때는 `html`,`css`,`javascript`는 이 모듈의 구성원이다.

---

#### 아토믹 디자인 패턴(Atomic Design)

brad frost의 아토믹 디자인 은 화학적 관점에서 영감을 얻은 디자인 시스템입니다. 모든 것은 atom(원자)으로 구성되어있고 atom(원자)들이 서로 결합하여 molecule(분자)이 되고, molecule는 더 복잡한 organism(유기체)으로 결합하여 궁극적으로 모든 물질을 생성합니다. 아토믹 디자인에서는 이 개념을 차용해서 컴포넌트를 atom, molecule, organism, template, page의 5가지 레벨로 나눕니다.

1. atom(원자)
   더 이상 분해 할 수 없는 **기본 컴포넌트** 입니다.
   ex) label, input, button 등

2. molecure
   여러 개의 atom 을 결합하여 자신의 고유한 특성을 가집니다. molecure의 중요한 특성은 **한 가지 일**을 한다는 것입니다.
   ex) input, button 을 결합한 form
3. organism
   앞 단계 보다 더 복잡하고 서비스에서 표현될 수 있는 **명확한 영역**과 **특정 컨텍스트**를 가집니다.
   위의 나온 단계(atom, molecure)들로 구성될 수 있습니다.
   ex) header -> 로고, 검색창, 네비게이션바 등등으로 구성되어있음.
4. template
   템플릿은 page를 만들 수 있는 여러 개의 organism, molecure 로 구성, 실제 컴포넌트를 레이아웃에 배치하고 구조를 잡는 와이어 프레임입니다. 즉, 실제 콘텐츠가 없는 page 수준의 스켈레톤이라고 정의할 수 있습니다.
5. page
   page는 유저가 볼 수 있는 실제 콘텐츠를 담고 있습니다. template 의 인스턴스
   ex) 유저1은 장바구니에 물건이 하나도 없는 인스턴스를 볼수 있고 유저2는 여러개의 물품을 담은 인스턴스를 볼 수 있다.(장바구니 = template)

---

### 번들링(컴파일 또는 빌드)을 사용하는 프론트개발환경

![webpack image](https://raw.githubusercontent.com/yb-k/edu-codelab/main/static/webpack-method.png)

> 대표적으로 많이 쓰는 번들러는 `Webpack`

실제 프로젝트를 진행하는 곳에서 문의가 가장 많이 오는 부분은 아래와 같습니다.

> 개발 환경에서는 잘되는데 빌드 후에는 실제 앱에서 동작하지 않습니다

이는 `Vue` 또는 `React`문법 또는 개념을 알고 있더라도 프론트 개발 환경에 대해서 이해하지 못하는 경우 발생되는 문제입니다.

`Vue` 또는 `React`는 `JavaScript` 라이브러리 이며 `CDN`방식을 사용하여 점진적으로 적용이 가능합니다.(화면 내 하나의 구성만을 `Vue`를 적용 할 수 있다.)

거의 대다수는 위의 방식으로 사용하지 않고 별도의 노드 프로젝트를 통해 컴파일 및 번들링 과정을 수행하여 앱에 배포합니다.

그렇기 때문에 `.vue`파일 또는 `.jsx` 와 같이 브라우저에서 지원하지 않는 파일 포맷은 일종의 컴파일 과정을 통해 `js`파일로 변환되어 사용이 가능합니다.

또한, 생성된 프로젝트에서 제공되는 개발환경(로컬 개발 서버)은 편의성을 위해 **프레임워크에서 권장하는 서버의 설정**을 이미 포함한 상태로 실행됩니다.

그래서 실제 배포되는 서버 / 앱의 환경과는 일치하지 않기 때문에 발생되는 실제 배포시에 동작되지 않는 케이스가 발생될 수 있습니다.

아래와 같은 케이스에 대응하기 위해서 `Webpack` 과 같은 번들러의 설정 및 커스터마이징을 할 수 있어야합니다.

1. **배포 환경**에 따른 컴파일(번들링) 설정 처리
2. 소스 최적화(`optimazition`)을 위한 설정 시
3. 별도의 추가 페이지(`html`파일) 작성 및 포함시
4. 전역변수 및 환경변수를 관리
5. 프로젝트에 맞춘 개발환경 구성시 (예) 프록시 서버)
