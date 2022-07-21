<template>
  <v-main>
<<<<<<< HEAD
    <v-list justify-center>
      <v-btn depressed to="/create">ADD USER</v-btn>
      <v-list-item v-for="user in users" :key="user.id" class="mb-2">
        <v-list-item-avatar>
          <v-img :src="user.imageurl" />
        </v-list-item-avatar>
        <v-list-item-content>
          {{ user.name }}
          <v-divider />
          {{ user.email }}
        </v-list-item-content>
      </v-list-item>
    </v-list>
=======
    <v-btn class="my-5" plain loading v-if="isLoading"></v-btn>
    <div v-else>
      <v-toolbar flat color="#F5F5F5" class="my-5">
        <v-toolbar-title class="font-bold">USERS</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn depressed to="/createuser">ADD USER</v-btn>
      </v-toolbar>

      <v-list justify-center>
        <v-list-item v-for="user in users" :key="user.id" class="mb-2">
          <v-list-item-avatar>
            <v-img :src="user.imageurl" />
          </v-list-item-avatar>
          <v-list-item-content>
            {{ user.name }}
            <v-divider />
            {{ user.email }}
          </v-list-item-content>
          <lord-icon
            @click="user_delete(user.id)"
            src="https://cdn.lordicon.com/qsloqzpf.json"
            trigger="hover"
            colors="primary:#121331"
            class="cursor-pointer w-7"
          >
          </lord-icon>
        </v-list-item>
      </v-list>
    </div>
>>>>>>> 1e316519da4104b2e278b1f562d385892225d4c9
  </v-main>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["user_index", "user_delete"]),
  },
  computed: {
    ...mapState("user", ["users"]),
  },
  mounted() {
    this.user_index();
  },
};
</script>
