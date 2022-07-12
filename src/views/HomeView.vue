<template>
  <v-content>
    Updating
    <v-btn tile plain loading></v-btn>
    {{ posts }}
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.posts = this.$store.state.tasks;
  },
};
</script>