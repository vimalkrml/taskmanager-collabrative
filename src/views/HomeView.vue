<template>
  <!-- <v-main>
    <v-toolbar-title
      ><v-btn depressed to="/create">Create Task</v-btn></v-toolbar-title
    >
    <v-btn class="mt-20" plain loading v-if="isLoading"></v-btn>
    <v-content v-else class="mx-0 md:mx-10">
      <v-card v-for="task in tasks" :key="task.id" class="mb-2" hover>
        <v-row align="center">
          <v-col cols="2">
            <v-checkbox
              v-model="task.completed"
              @click="onComplete(task.id, task.completed)"
              class="ml-5"
            ></v-checkbox>
          </v-col>
          <v-snackbar v-model="snackbar" :multi-line="multiLine">
            {{ text }}
            <template v-slot:action="{ attrs }">
              <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
          <v-col cols="4">
            <v-card-title
              :class="{ 'line-through text-gray-400': task.completed }"
              v-html="task.name"
            >
               {{ task.title }}
   </v-card-title>
          </v-col>
          <v-spacer />

          <v-col col="2">{{ get_username(task.user_id) }}</v-col>
          <v-col cols="2">
            <v-btn
              :class="{ 'line-through text-gray-400': task.completed }"
              icon
              class="font-bold"
              >{{ task.date }}</v-btn
            >
          </v-col>
          <v-spacer />
          <v-col cols="2">
            <lord-icon
              @click="task_delete(task.id)"
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
  </v-main> -->
  <v-main>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Done</th>
            <th class="text-left">Name</th>
            <th class="text-left">Description</th>
            <th class="text-left">Modified By</th>
            <th class="text-left">Added By</th>
            <th class="text-left">Date Added</th>
            <th class="text-left">Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td class="text-left">
              <v-checkbox
                v-model="task.completed"
                @click="onComplete(task.id, task.completed)"
              ></v-checkbox>

              <v-snackbar v-model="snackbar" :multi-line="multiLine">
                {{ text }}
                <template v-slot:action="{ attrs }">
                  <v-btn
                    color="red"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                  >
                    Close
                  </v-btn>
                </template>
              </v-snackbar>
            </td>
            <td
              class="text-left"
              :class="{ 'line-through text-gray-400': task.completed }"
              v-html="task.name"
            ></td>
            <td class="text-left" v-html="task.title"></td>
            <td class="text-left">
              {{ get_username(task.user_id) }}
            </td>
            <td class="text-left">
              {{ get_username(task.user_id) }}
            </td>
            <td class="text-left">
              <v-btn
                :class="{ 'line-through text-gray-400': task.completed }"
                icon
                class="font-bold"
                >{{ task.date }}</v-btn
              >
            </td>
            <td class="text-left">
              <lord-icon
                @click="task_delete(task.id)"
                src="https://cdn.lordicon.com/qsloqzpf.json"
                trigger="hover"
                colors="primary:#121331"
                class="cursor-pointer w-7"
              >
              </lord-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-main>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      isLoading: true,
      multiLine: true,
      snackbar: false,
      text: null,
    };
  },
  methods: {
    onComplete(id, completed) {
      this.$store.dispatch("task_complete", { id, completed });
      this.tasks.forEach((task) => {
        if (task.id === id) {
          task.completed = completed;
          task.status = completed ? "Done" : "Not Done";
          this.text = task.status;
        }
      });
      this.snackbar = true;
    },

    get_username(user_id) {
      const currentUser = this.users.filter((user) => user.id == user_id);
      console.log(currentUser[0].name);
      return currentUser[0].name;
    },

    ...mapActions("task", ["task_index", "task_delete"]),
    ...mapActions("user", ["user_index"]),
  },
  mounted() {
    this.user_index();
    this.task_index();
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
  computed: {
    ...mapState("user", ["users"]),
    ...mapState("task", {
      tasks(state) {
        return state.tasks;
      },
    }),
  },
};
</script>
