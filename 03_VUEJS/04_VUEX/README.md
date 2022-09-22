# Vuex

`Vuex`는 `Vue` 애플리케이션에 대한 **상태 관리 패턴** + **라이브러리** 입니다.

즉, **상태(state)를 관리하는 라이브러리** 입니다.

## 컨셉

`vue`는 기본적으로 **단방향 데이터 흐름**을 가집니다.

> 부모 `state`를 자식에게 `prop`을 전달할 수 있으나
>
> 자식은 전달받은 `prop`을 `override`할 수 없습니다.

만약, 전역적(대부분의 컴포넌트)으로 공유되어야 하는 상태를 한다면

아래와 같이 처리해야합니다.

```html
<root>
  <!-- username이라는 상태 및 수정 이벤트를 child-3에게 전달하기위해서.. -->
  <child-1 :username="username" @onChangeUserName="onChangeUserName">
    <child-2 :username="username" @onChangeUserName="onChangeUserName">
      <child-3 :username="username" @onChangeUserName="onChangeUserName">
      </child-3>
    </child-2>
  </child-1>
</root>
```

이러한 문제점을 해결하기위해 `store`라는 저장소에서 상태(`state`)을 분리하여 관리하기 시작했습니다.

이 역할을 하는 라이브러리가 `vuex`입니다.

```js
const store = new Vuex.Store({
  state: {
    username: "",
  },
  mutations: {
    changeUserName(state, payload) {
      state.username = payload;
    },
  },
});
```

```html
<root>
  <child-1>
    <child-2>
      <child-3>
        <!-- this.$store.username 으로 접근 / this.$store.commit 으로 수정 -->
      </child-3>
    </child-2>
  </child-1>
</root>
```

> `store` 의 `state` 역시 반응형으로, 상태가 변경되면 대응/업데이트를 수행합니다.

> 위의 내용뿐만이 아니라 Client - Server 간 의 상태(state)를 관리한다는 개념까지 넓혀 사용합니다.

## 상태 관리 패턴

![vue 흐름도](https://v3.vuex.vuejs.org/flow.png)

아래는 이해를 돕기위한 간단한 예시입니다.

1. `state`가 선언됩니다.
2. `view`에서 `state`을 노출합니다.
3. `action`을 통해 `state`를 변경합니다.
4. `view`는 변경된 `state`를 대응 / 업데이트 합니다.

만약, `vuex`의 상태관리에 대한 패턴을 하나의 컴포넌트 내에서 간단하게 표현하면 아래와 같습니다.

```js
new Vue({
  // 상태
  data() {
    return {
      count: 0,
    };
  },
  // 뷰
  template: `<div>{{ count }}</div>`,
  // 액션
  methods: {
    increment() {
      this.count++;
    },
  },
});
```

여기서 핵심은 `increment` 라는 액션을 통해서만 `count`를 변경하는 것 입니다.

이러한 방식을 `상태관리패턴`이라고 합니다.

> 개인적으로 이해한 내용을 쉽게 풀어 작성하였습니다.
>
> 정확한 내용은 공식문서를 참고하시길 바랍니다.

## 실습

프로젝트를 생성합니다.

```bash
vue create hello-vuex
```

## Reference

[vuex v3 공식 문서](https://v3.vuex.vuejs.org/kr/guide/)
