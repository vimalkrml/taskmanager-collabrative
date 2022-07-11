<template>
  <v-content>
    <v-card-title>
      <h2>Add New Task</h2>
    </v-card-title>
<v-form class="px-3">
  <v-text-field label="ID NO"></v-text-field>
   <v-text-field label="Name"></v-text-field>
   <v-textarea label="Description" ></v-textarea>
   <!-- <v-date-picker class="" ></v-date-picker> -->
   <v-btn color="thin" dark  >Submit</v-btn>
</v-form>
  </v-content>

</template>

<script>
export default {};
</script>

<style>
</style>