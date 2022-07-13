<template>
  <v-content>
    <v-card v-for="task in tasks" :key="task.id" class="mb-2">
      <v-row align="center">
        <v-col cols="1">
          <v-checkbox
            v-model="task.completed"
            @click="onComplete(task.id, task.completed)"
            class="ml-2"
          ></v-checkbox>
        </v-col>
        <v-col cols="9">
          <h1 class="text-left text-2xl">
            {{ task.title }}
          </h1>
        </v-col>
        <v-col cols="2">
          <v-card-text>{{ task.status }}</v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    onComplete(id, completed) {
      // console.log("dddd");
      this.$store.dispatch("onComplete", { id, completed });
      this.tasks.forEach((task) => {
        if (task.id === id) {
          task.completed = completed;
          task.status = completed ? "Done" : "Not Done";
          //   console.log(task);
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch("getTasks").then(() => {
      this.tasks = this.$store.state.tasks;
      console.log(this.tasks);
    });
    // console.log(JSON.parse(JSON.stringify(this.tasks)));
  },
};
</script>
