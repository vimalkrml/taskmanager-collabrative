<template>
  <div id="app">
    <v-app>
      <nav-bar />
      <v-container app> <router-view /></v-container>
      <footer-bar></footer-bar>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import NavBar from "./components/NavBar.vue";
import FooterBar from "./components/FooterBar.vue";

export default {
  components: {
    NavBar,
    FooterBar,
  },
  methods: {
    ...mapActions("user", ["user_show"]),
  },
  mounted() {
    console.log(process.env.VUE_APP_CURRENT_USER_ID);
    this.user_show(process.env.VUE_APP_CURRENT_USER_ID);
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
