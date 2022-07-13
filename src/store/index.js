import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: null,
    task: {}
  },
  mutations: {
    TASKS_INDEX(state, tasks) {
      // console.log(tasks);
      state.tasks = tasks;
      console.log(state.tasks);
    },
    onComplete(state, payload) {
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
    onDelete(state, id) {
      // console.log("hii");
      const mutateData = state.tasks.filter((task) => task.id !== id);
      console.log(mutateData);
      state.tasks = mutateData;
      // console.log(state.tasks);
    },
  },
  actions: {
    task_index: async (context) => {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      console.log(data);

      context.commit("TASKS_INDEX", data);
    },
    onComplete: (context, payload) => {
      context.commit("onComplete", payload);
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
    onDelete: async (context, id) => {
      context.commit("onDelete", id);
      await fetch("http://localhost:3000/tasks/" + id, { method: "DELETE" });
    },
  },
  modules: {},
  getters: {
    getTasks: state => state.tasks
  },
});
