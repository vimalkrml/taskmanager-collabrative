<template>
  <v-main>
<<<<<<< HEAD
    <v-btn class="mt-20" plain loading v-if="isLoading"></v-btn>
    <v-content v-else class="mx-0 md:mx-10">
      <v-card v-for="user in users" :key="user.id" class="mb-2" hover>
        <v-row align="center">
          <v-col cols="4">
            <v-card-title>
              {{ user.name }}
            </v-card-title>
          </v-col>
        </v-row>
      </v-card>
    </v-content>
=======
    <v-card v-for="user in users" :key="user.id" class="mb-2" hover>
      <v-row align="center">
        <v-col cols="2">
          {{ user.name }}
        </v-col>
      </v-row>
    </v-card>
>>>>>>> 6e375c716122462d7e1677e1aaffab87b6288b53
  </v-main>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
<<<<<<< HEAD
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    ...mapActions("user", ["user_index"]),
  },
  mounted() {
    this.user_index();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  computed: {
    ...mapState("user", {
      users(state) {
        return state.users;
      },
    }),
=======
  methods: {
    ...mapActions("user", ["user_index"]),
  },
  computed: {
    ...mapState("user", ["users"]),
  },
  mounted() {
    this.user_index();
>>>>>>> 6e375c716122462d7e1677e1aaffab87b6288b53
  },
};
</script>
