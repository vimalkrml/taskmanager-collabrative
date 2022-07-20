<template>
  <v-main>
    <v-card v-for="user in users" :key="user.id" class="mb-2" hover>
      <v-row align="center">
        <v-col cols="2">
          {{ user.name }}
        </v-col>
      </v-row>
    </v-card>
  </v-main>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions("user", ["user_index"]),
  },
  computed: {
    ...mapState("user", ["users"]),
  },
  mounted() {
    this.user_index();
  },
};
</script>
