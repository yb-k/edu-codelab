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
