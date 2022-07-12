<template>
  <div id="app">
    <v-app>
      <nav-bar />
      <v-container app style="height: 1000px"> <router-view /></v-container>
      <footer-bar></footer-bar>
    </v-app>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import FooterBar from "./components/FooterBar.vue";

export default {
  components: {
    NavBar,
    FooterBar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
