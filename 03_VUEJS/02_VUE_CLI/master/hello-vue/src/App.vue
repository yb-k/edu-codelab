<template>
  <div id="app">
    <h1>{{ secretCode }} {{ apiUrl }} {{ mode }} {{ baseUrl }}</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
const { VUE_APP_NOT_SECRET_CODE, VUE_APP_API_URL, NODE_ENV, BASE_URL } =
  process.env;
export default {
  data() {
    return {
      secretCode: VUE_APP_NOT_SECRET_CODE,
      apiUrl: VUE_APP_API_URL,
      mode: NODE_ENV,
      baseUrl: BASE_URL,
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
