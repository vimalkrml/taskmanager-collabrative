<template>
  <v-main>
    <v-btn class="mb-5" plain loading v-if="isLoading"></v-btn>
    <div v-else>
      <v-toolbar flat color="#F5F5F5" class="my-5">
        <v-toolbar-title>USERS</v-toolbar-title>
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
        </v-list-item>
      </v-list>
    </div>
  </v-main>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    ...mapActions("user", ["user_index"]),
  },
  computed: {
    ...mapState("user", ["users"]),
  },
  mounted() {
    this.user_index();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>
