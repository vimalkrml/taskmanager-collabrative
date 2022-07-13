<template>
  <v-main>
    <v-btn class="mt-20" plain loading v-if="isLoading"></v-btn>
    <v-content v-else class="mx-0 md:mx-10">
      <v-card v-for="task in tasks" :key="task.id" class="mb-2">
        <v-row align="center">
          <v-checkbox
            v-model="task.completed"
            @click="onComplete(task.id, task.completed)"
            class="ml-5"
          ></v-checkbox>

          <v-col cols="7">
            <v-card-title>
              {{ task.title }}
            </v-card-title>
          </v-col>
          <v-col cols="2">
            <v-card-text>{{ task.status }}</v-card-text>
          </v-col>
          <v-col cols="2">
            <lord-icon
              @click="onDelete(task.id)"
              src="https://cdn.lordicon.com/qsloqzpf.json"
              trigger="hover"
              colors="primary:#121331"
              class="cursor-pointer w-7"
            >
            </lord-icon>
          </v-col>
        </v-row>
      </v-card>
    </v-content>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
      isLoading: true,
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
    onDelete(id) {
      console.log(id);
      this.$store.dispatch("onDelete", id);
      // console.log(this.tasks);
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
  },
  mounted() {
    this.$store.dispatch("getTasks").then(() => {
      this.tasks = this.$store.state.tasks;
      // console.log(this.tasks);
    });
    // console.log(JSON.parse(JSON.stringify(this.tasks)));
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
};
</script>
