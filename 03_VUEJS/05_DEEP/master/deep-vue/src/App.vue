<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/directives">Directives</router-link> |
      <router-link to="/todos">Todos</router-link> |
      <router-link to="/vmodel">VModel</router-link> |
      <router-link to="/keepalive">keepalive</router-link> |
      <router-link to="/custom-popup">custom-popup</router-link> |
      <button type="button" v-back>Back</button>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { eventBus } from "@/modules";
export default {
  data() {
    return {
      title: "",
    };
  },
  created() {
    const self = this;
    eventBus.$on("setTitle", function (title) {
      self.title = title;
    });
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
