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
