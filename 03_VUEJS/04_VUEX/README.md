# Vuex

Vuex는 Vue.js 애플리케이션에 대한 **상태 관리 패턴** + **라이브러리** 입니다.

## 실습

```bash
vue create hello-vuex
```

### 상태 관리 패턴이란?

```js
new Vue({
  // 상태
  data() {
    return {
      count: 0,
    };
  },
  // 뷰
  template: `
    <div>{{ count }}</div>
  `,
  // 액션
  methods: {
    increment() {
      this.count++;
    },
  },
});
```

- 상태 : 상태는 앱을 작동하는 원본 소스
- 뷰 : 상태의 **선언적 매핑**
- 액션 : 뷰에서 사용자 입력에 대해 반응적으로 상태를 바꿈

상태는 오로지 액션을 통해서만 바뀔 수 있습니다.

![vue 흐름도](https://v3.vuex.vuejs.org/flow.png)

- 여러 뷰가 같은 상태에 의존 할때
- 서로 다른 뷰의 작업은 동일한 상태를 반영해야 할 때

이런 문제들을 해결하기 위해 컴포넌트에서 공유된 상태를 추출해 전역 싱글톤으로 관리합니다. => Vuex

## 라이선스

MIT

## 자료출처

[vuex 공식 홈페이지](https://v3.vuex.vuejs.org/kr/guide/)
