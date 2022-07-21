<template>
  <v-app-bar color="thin" dark fixed app>
    <v-row class="items-center justify-between">
      <div>
        <v-menu bottom rounded offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon x-large v-on="on">
              <v-app-bar-nav-icon />
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center">
              <div class="mx-auto text-center">
                <v-btn depressed rounded text to="/"> Tasks</v-btn>
                <v-divider class="my-1"></v-divider>
                <v-btn depressed rounded text to="/users"> Users</v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>
        <v-btn plain depressed text to="/" class="uppercase"
          >Task Manager
        </v-btn>
      </div>

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
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },

  computed: {
    ...mapState("user", ["user"]),
    ...mapState("task", {
      tasks(state) {
        return state.tasks;
      },
    }),
  },
};
</script>
