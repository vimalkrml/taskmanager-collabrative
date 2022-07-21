<template>
  <v-app-bar color="thin" dark fixed app>
    <v-row class="items-center justify-between">
<<<<<<< HEAD
      <v-app-bar-title
        ><v-btn to="/">Tasks</v-btn>
        <v-btn to="/users">Users</v-btn></v-app-bar-title
      >
      <v-app-bar-title class="uppercase">Task Manager </v-app-bar-title>
=======
      <v-btn plain depressed class="uppercase" @click="task_reload()"
        >Task Manager
      </v-btn>
>>>>>>> 1e316519da4104b2e278b1f562d385892225d4c9
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar size="38">
              <img :src="user.imageurl" />
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar>
                <img :src="user.imageurl" />
              </v-avatar>
              <v-divider class="my-1"></v-divider>
              <h3>{{ user.name }}</h3>
              <p class="text-caption">
                {{ user.email }}
              </p>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text to="/"> Tasks</v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text to="/users"> Users</v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text to="/create"> Add Task </v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text to="/createuser"> Add User</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
<<<<<<< HEAD
=======
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    task_reload() {
      window.location.reload();
    },
  },
>>>>>>> 1e316519da4104b2e278b1f562d385892225d4c9
  computed: {
    ...mapState("user", ["user"]),
  },
};
</script>
