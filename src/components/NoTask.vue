<script>
export default {};
</script>

<template>
  <div class="hero h-72">
    <div class="header">
      <h1 class="text-3xl font-bold text-gray-600">No tasks found</h1>
      <h2 class="text-xl font-bold text-gray-600 mb-5">Click ADD TASK</h2>
    </div>
    <v-btn plain to="/create">Add Task</v-btn>
  </div>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.hero > .header {
  padding: 20px;
  text-align: center;
}
.hero > .header > p {
  padding: 10px;
}
</style>