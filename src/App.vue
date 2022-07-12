<template>
  <div id="app">
    <v-app-bar class="flex justify-between"> </v-app-bar>
    <v-app>
      <v-app-bar app color="gray" elevate-on-scroll>
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
      </v-app-bar>

      <v-container style="height: 1000px">
        <router-view />
      </v-container>
    </v-app>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
