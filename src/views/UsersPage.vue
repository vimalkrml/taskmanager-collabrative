<template>
  <v-main>
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
  },
};
</script>

