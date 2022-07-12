<template>
  <v-content>
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
    this.posts = this.$store.getters.getNameAndDescription;
  },
};
</script>