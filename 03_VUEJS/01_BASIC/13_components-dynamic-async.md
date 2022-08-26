# 동적 & 비동기 컴포넌트

### `keep-alive` 동적 컴포넌트

`<keep-alive>` 를 사용하면 인터인스턴스가 처음 생성될 때 캐시됨.

```html
<!-- Inactive components will be cached! -->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```
