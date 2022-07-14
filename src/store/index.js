import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    task: {},
  },
  mutations: {
    TASKS_INDEX(state, tasks) {
      // console.log(tasks);
      state.tasks = tasks;
      // console.log(state.tasks);
    },
    TASK_COMPLETE(state, payload) {
      //   console.log(state.tasks);
      state.tasks.forEach((task) => {
        if (task.id === payload.id) {
          task.completed = payload.completed;
          task.status = true;
          //   console.log(task);
        }
      });
      //   console.log(state.tasks);
    },
    TASK_DELETE(state, payload) {
      // console.log("hii");
      const mutateData = state.tasks.filter((task) => task.id !== payload);
      console.log(mutateData);
      state.tasks = mutateData;
      // console.log(state.tasks);
    },
    TASK_ADD(state, payload) {
      console.log(state.tasks);
      // JSON.parse(JSON.stringify(state.tasks)).push(payload);
      state.tasks.push(payload);
      // console.log(payload)
    },
  },

  actions: {
    task_index: async (context) => {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      console.log(data);

      context.commit("TASKS_INDEX", data);
    },
    task_complete: (context, payload) => {
      context.commit("TASK_COMPLETE", payload);
      const updateRequest = {
        method: "PATCH",
        body: JSON.stringify({
          completed: payload.completed,
          status: payload.completed ? "Done" : "Not Done",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      fetch("http://localhost:3000/tasks/" + payload.id, updateRequest);
    },
    task_delete: async (context, payload) => {
      context.commit("TASK_DELETE", payload);
      await fetch("http://localhost:3000/tasks/" + payload, {
        method: "DELETE",
      });
    },
    task_add: (context, payload) => {
      context.commit("TASK_ADD", payload);
      const newTask = { ...payload };
      // console.log(newTask);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      };
      fetch("http://localhost:3000/tasks", requestOptions);
    },
  },
  modules: {},
  getters: {
    getTasks: (state) => state.tasks,
  },
});
