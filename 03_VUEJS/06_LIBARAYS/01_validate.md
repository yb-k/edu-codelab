# Vee-Validate

## 서론

`vee-validate`는 유효성 체크에서 유용하게 사용할 수 있는 라이브러리 입니다.

`Vue2.x`를 사용하기 때문에 라이브러리는 `v3` 버전을 사용해야합니다.

> [Vee-Validate_v3 공식문서](https://vee-validate.logaretm.com/v3/)

## 실습

### 설치

```bash
# 3버전대 설치
yarn add vee-validate@^3.4.14
```

### 룰 설정

사용할 룰을 설정합니다.

자세한 내용은 공식 문서를 확인합니다.

> [Available Rules 문서](https://vee-validate.logaretm.com/v3/guide/rules.html#available-rules)

`/src/modules/01_validate/rules.js`

```js
/* eslint-disable no-useless-escape */
import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
// 모든 룰을 사용
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

// 룰 커스텀 확장
extend("verify_password", {
  validate: (value) => {
    const reg = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    return reg.test(value);
  },
});

extend("ko_phone", {
  validate: (value) => {
    const reg =
      /(02|0[3-9]{1}[0-9]{1})([\-\.])?[1-9]{1}[0-9]{2,3}([\-\.])?[0-9]{4}$/;
    return reg.test(value);
  },
});
```

## Locale 설정

기본 유효성 체크시에 대응될 메세지입니다.

해당 메세지는 국가/언어별로 확장하시어 사용하실 수 있습니다.

`/src/modules/01_validate/locales/ko.js`

```js
import _merge from "lodash/merge";
import { localize } from "vee-validate";
import ko from "vee-validate/dist/locale/ko.json";
// 에러메세지 정의
const _ko = _merge(ko, {
  messages: {
    verify_password:
      "{_field_}는 8자리 이상 영문,숫자,특수문자를 조합하여야 합니다.",
    ko_phone: "{_field_}는 올바르지 않은 전화번호 형식입니다.",
  },
});

// 한글 적용
localize({
  ko: {
    messages: _ko.messages,
  },
});
```

## 컴포넌트 작성

추가 설명

- slim : 기본 태그 `span`을 사용하지 않는 경우
- rules: 적용할 룰
- immediate: 최초상태에서도 validate 수행여부

`src/modules/01_validate/ValidateView.vue`

```vue
<template>
  <div>
    <div>
      <h1>유효성 체크</h1>
      <validation-observer
        slim
        v-slot="{ invalid, handleSubmit }"
        ref="observer"
      >
        <form @submit.prevent="handleSubmit(onSubmit)">
          <div>
            <validation-provider
              name="이름"
              rules="required|min:2|max:10"
              v-slot="{ errors }"
              immediate
            >
              <label for="name">이름(필수)</label>
              <input type="text" id="name" v-model="state.name" />
              <div>{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div>
            <validation-provider
              name="이메일"
              rules="email"
              v-slot="{ errors }"
            >
              <label for="email">이메일</label>
              <input type="text" id="email" v-model="state.email" />
              <div>{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div>
            <validation-provider
              name="전화번호"
              rules="ko_phone"
              v-slot="{ errors }"
            >
              <label for="phone">전화번호</label>
              <input type="text" id="phone" v-model="state.phone" />
              <div>{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div>
            <validation-provider
              name="비밀번호"
              rules="required|verify_password"
              v-slot="{ errors }"
            >
              <label for="phone">비밀번호(필수)</label>
              <input type="text" id="password" v-model="state.password" />
              <div>{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div>
            <validation-provider
              name="성별"
              rules="required|oneOf:M,F"
              v-slot="{ errors }"
            >
              <label for="sex">성별(필수)</label>
              <select id="sex" v-model="state.sex" placeholder="성별선택">
                <option value="M">남자</option>
                <option value="F">여자</option>
              </select>
              <div>{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <div>
            <validation-provider
              name="나이"
              rules="required|numeric|min_value:15"
              v-slot="{ errors }"
            >
              <label for="age">나이(필수)</label>
              <input type="text" id="age" v-model="state.age" />
              <div>{{ errors[0] }}</div>
            </validation-provider>
          </div>
          <button type="submit" :disabled="invalid">요청</button>
          <button type="button" @click="onSubmitPopup">팝업으로 처리</button>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
const INIT_STATE = () => ({
  name: "",
  email: "",
  phone: "",
  password: "",
  sex: "",
  age: "",
});
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      state: INIT_STATE(),
    };
  },
  methods: {
    onSubmit(...args) {
      console.log(args);
      alert("success!");
      return false;
    },
    onSubmitPopup() {
      // validate 수행
      this.$refs.observer.validate().then(() => {
        const err = this.$refs.observer.anyError();
        if (err) return alert(err);
        alert("success!");
      });
    },
  },
};
</script>

<style></style>
```

## 적용

`src/modules/01_validate/index.js`

```js
import "./rules";
import "./locales/ko";
import { localize, ValidationObserver } from "vee-validate";
import router from "@/router";
router.addRoute({
  path: "/validate",
  name: "validate",
  // which is lazy-loaded when the route is visited.
  component: () =>
    import(/* webpackChunkName: "validate" */ "./ValidateView.vue"),
});
/**
 * ValidateionObserver 확장 함수
 * @description error가 있으면 메세지를 리턴
 * @return string Error Message 리턴 또는 undefiend
 */
ValidationObserver.prototype.anyError = function () {
  const keys = Object.keys(this.errors);
  for (let i = 0; i < keys.length; i += 1) {
    if (this.errors[keys[i]][0] !== undefined) {
      return this.errors[keys[i]][0];
    }
  }
  return undefined;
};

// 로컬 라이즈 기본 세팅
localize("ko");
```

`src/modules/index.js`

```js
import "01_validate";
```

`src/main.js`

```js
// 아래 라인 추가
import "@/modules"; // module 불러오기
```

`src/App.vue`

```html
<!-- 아래 라인 추가 -->
<router-link to="/validate">Validate</router-link>
```
