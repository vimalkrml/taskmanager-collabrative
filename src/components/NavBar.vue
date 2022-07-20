<template>
  <v-app-bar color="thin" dark fixed app>
    <v-app-bar-title><v-btn to="/">Tasks</v-btn></v-app-bar-title>
    <v-app-bar-title> <v-btn to="/users">Users</v-btn></v-app-bar-title>
    <v-spacer />
    <v-row justify="center">
      <v-app-bar-title class="uppercase">Task Manager </v-app-bar-title>
    </v-row>

    <v-spacer />

    <v-row justify="end">
      <v-menu bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar size="35">
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
              <v-btn depressed rounded text to="/"> TASKS</v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text to="/users"> USERS</v-btn>
              <v-divider class="my-1"></v-divider>
              <v-btn depressed rounded text to="/create"> CREate</v-btn>
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
  computed: {
    ...mapState("user", ["user"]),
  },
};
</script>
