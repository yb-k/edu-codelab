<template>
  <div>
    <h1>Container</h1>
    <nav>
      <ul>
        <li>
          <router-link to="/first">first</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'second' }" replace>second</router-link>
        </li>
        <li>
          <router-link tag="button" :to="{ path: '/third' }">third</router-link>
        </li>
        <li>
          <button @click="$router.back()">back</button>
        </li>
        <li>
          <router-link to="/query?hello=world">query</router-link>
        </li>
        <li>
          <router-link
            :to="{
              path: '/query',
              query: { key: 'value' },
              params: { key: 'value' },
            }"
            >query2</router-link
          >
        </li>
        <li>
          <router-link
            :to="{
              name: 'props',
              query: { key: 'value' },
              params: { key: 'value' },
            }"
            >props</router-link
          >
        </li>
        <li>
          <router-link
            :to="{
              path: '/match/hello',
              query: { key: 'value' },
            }"
            >match</router-link
          >
        </li>
        <li>
          <router-link to="/matchNum/3">matchNum</router-link>
        </li>
        <li>
          <router-link to="/echo?value=hello-world"
            >echo?value=hello-world</router-link
          >
        </li>
        <li>
          <router-link to="/echo">echo</router-link>
        </li>
      </ul>
    </nav>
    <div class="content">
      <router-view></router-view>
      <router-view name="a"></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.content {
  border: 1px solid black;
}
nav > ul {
  display: flex;
  direction: row;
}
nav > ul > li {
  margin-right: 50px;
}
/* 활성화시 클래스 */
.router-link-active {
  font-weight: 800;
}
</style>
