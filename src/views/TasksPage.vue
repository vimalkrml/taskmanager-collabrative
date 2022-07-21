<template>
  <v-main>
    <v-snackbar v-model="toast" light>
      {{ toast }}
      <template v-slot:action="{ attrs }">
        <v-btn color="indigo" text v-bind="attrs" @click="task_toast_remove()">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-btn class="my-5" plain loading v-if="isLoading"></v-btn>
    <div v-else>
      <div flat class="my-10 flex justify-between items-center text-2xl">
        <h1 class="font-bold">TASKS</h1>
        <v-spacer></v-spacer>
        <v-btn depressed to="/create">Create Task</v-btn>
      </div>

      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr class="bg-[#E0E0E0]">
              <th class="text-left">Done</th>
              <th class="text-left">Name</th>
              <th class="text-left">Description</th>
              <th class="text-left">Modified By</th>
              <th class="text-left">Completed By</th>
              <th class="text-left">Added By</th>
              <th class="text-left">Date Added</th>
              <th class="text-left">Remove</th>
              <th class="text-left">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id" class="bg-[#F5F5F5]">
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
              <td class="text-left">-</td>
              <td class="text-left">{{ task.completedBy }}</td>
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
              <td class="text-left">
                <lord-icon
                  src="https://cdn.lordicon.com/wloilxuq.json"
                  trigger="hover"
                  colors="primary:#121331"
                  class="cursor-pointer w-10"
                  @click="editPage(task.id)"
                >
                </lord-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <edit-task
      :id="userId"
      class="absolute top-0"
      v-show="localState"
      @tasksub="tasksub"
    />
  </v-main>
</template>

<script>
import { mapActions, mapState } from "vuex";
import EditTask from "../components/EditTask.vue";

export default {
  components: { EditTask },

  data() {
    return {
      isLoading: true,
      multiLine: true,
      snackbar: false,
      text: null,
      currentuser: "",
      completedby: "",
      localState: false,
      userId: "",
    };
  },
  methods: {
    onComplete(id, completed) {
      // console.log(this.$store.state.user.current_id);
      let current_id = this.$store.state.user.current_id;
      this.$store.dispatch("task/task_complete", { id, completed, current_id });
      this.tasks.forEach((task) => {
        if (task.id === id) {
          task.completed = completed;
          task.status = completed ? "Done" : "Not Done";
          this.text = task.status;
          this.completedby = this.currentuser;
        }
      });

      this.snackbar = true;
    },

    get_username(user_id) {
      const currentUser = this.users.filter((user) => user.id == user_id);
      // console.log(currentUser[0].name);
      return currentUser[0].name;
    },
    editPage(id) {
      console.log(id);
      this.userId = id;
      this.localState = true;
    },
    tasksub(val) {
      console.log(val);
      this.localState = val;
      console.log(this.localState);
    },
    // task_modify() {},

    ...mapActions("task", ["task_index", "task_delete", "task_toast_remove"]),
    ...mapActions("user", ["user_index"]),
  },
  mounted() {
    this.user_index();
    this.task_index();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  },
  computed: {
    ...mapState("user", ["users"]),
    ...mapState("task", {
      tasks(state) {
        return state.tasks;
      },
      toast(state) {
        return state.toast;
      },
    }),
    // mapState("task", ['editState'])
  },
};
</script>
