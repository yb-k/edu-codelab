# 슬롯

`<slot>` 을 컨텐츠 배포 통로로 사용 가능하다. slot 을 사용하면다음과 같이구성이 가능하다.
다음의 예시를 보자.

```html
<navigation-link url="/profile"> Your Profile </navigation-link>
```

그리고 `navigation-link` 템플릿은 다음과 같이 생겼다.

```html
<a v-bind:href="url" class="nav-link">
  <slot></slot>
</a>
```

`<slot></slot>`이 Your Profile 으로 교체되어 다음과 같은 모습을 취한다.

```html
<navigation-link url="/profile">
  <!-- Font Awesome 아이콘을 추가합시다 -->
  <span class="fa fa-user"></span>
  Your Profile
</navigation-link>
```

### 기본값 지정

아무 컨텐츠도 전달받지 못했을때 슬롯에 렌더링 시킬 기본값을 지정해 놓을 수 있습니다.

`<submit-button>` 템플릿 예시입니다.

```html
<button type="submit">
  <slot>Submit</slot>
</button>
```

위와 같이 작성하면, 기본값으로 Submit 이 들어가게됩니다.

### 이름있는 슬롯

> 2.6.0+

name이 지정되지 않은 `<slot>`에는 암묵적으로 “default” 값이 사용됩니다.
또한 여러개의 슬롯을 만들어 사용할때 name속성을 이용해 지정해 줄 수있습니다.

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

### 단일 디폴트 슬롯을 위한 축약 문법

제공된 내용이 디폴트 슬롯 밖에 없으면 컴포넌트의 태그를 슬롯의 템플릿으로 바로 쓸 수 있습니다

```html
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
<!-- 위의 예시를 다음과 같이 사용할 수 있다. -->
<current-user v-slot:default="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
```

### 동적 슬롯 이름

가변 디렉티브 속성을 가변 스롯 이름을 정의 하는 방식으로 `v-slot`에서도 동일하게 적용시킬 수 있습니다.

```html
base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

### 단축어 표기(#)

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
<!-- 위의 내용을 # 을 이용해 다음과 같이 사용할 수 있다. -->
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```
