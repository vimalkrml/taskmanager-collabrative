<template>
  <v-toolbar app color="indigo" elevate-on-scroll>
    <v-toolbar-title class="uppercase text-gray-800"
      ><router-link to="/">Home</router-link></v-toolbar-title
    >
    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-toolbar-title v-bind="attrs" v-on="on">
          <router-link to="/about">Create</router-link>
        </v-toolbar-title>
      </template>
      <span>Create New task</span>
    </v-tooltip>
  </v-toolbar>
</template>

<script>
export default {};
</script>