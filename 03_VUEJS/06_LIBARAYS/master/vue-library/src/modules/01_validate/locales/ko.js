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
