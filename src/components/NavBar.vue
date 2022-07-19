<template>
  <v-app-bar color="thin" dark fixed app>
    <v-toolbar-title><v-btn to="/">Tasks</v-btn></v-toolbar-title>
    <v-spacer />
    <v-toolbar-title><v-btn to="/users">Users</v-btn></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title class="uppercase">Task Manager </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-title><v-btn to="/create">Create</v-btn></v-toolbar-title>
    {{ user.name }}
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  methods: {
    ...mapActions("user", ["user_show", "user_index"]),
  },
  computed: mapState("user", {
    user(state) {
      return state.user;
    },
  }),
  mounted() {
    this.user_show(1);
    this.user_index();
  },
};
</script>
