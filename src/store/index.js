import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: null,
  },
  mutations: {
    loadTasks: (state, tasks) => {
      // console.log(tasks);
      state.tasks = tasks;
      // console.log(state.tasks);
    },
    onComplete(state, payload) {
      //   console.log(state.tasks);
      state.tasks.forEach((task) => {
        if (task.id === payload.id) {
          task.completed = payload.completed;
          //   console.log(task);
        }
      });
      //   console.log(state.tasks);
    },
    onDelete(state, tasks) {
      // console.log("hii");
      const mutateData = state.tasks.filter((task) => task.id !== tasks);
      // console.log(mutateData)
      state.tasks = mutateData;
      console.log(state.tasks);
    },
  },
  actions: {
    getTasks: async (context) => {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      console.log(data);

      context.commit("loadTasks", data);
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
    onDelete: (context, tasks) => {
      context.commit("onDelete", tasks)
      fetch("http://localhost:3000/tasks/" + tasks.id, { method: "DELETE" })
    }
  },
  modules: {},
  getters: {},
});
