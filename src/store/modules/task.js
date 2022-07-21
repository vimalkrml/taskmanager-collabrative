export default {
  namespaced: true,
  state: {
    tasks: [],
    task: {},
    toast: ''
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
      state.tasks.push(payload);
    },
    TASK_TOAST_ADD(state, payload) {
      state.toast = payload;
    },
    TASK_TOAST_REMOVE(state) {
      state.toast = '';
    },
  },

  actions: {
    task_index: async (context) => {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
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
    task_add: async (context, payload) => {
      context.commit("TASK_ADD", payload);
      const newTask = { ...payload };
      // console.log(newTask);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      };
      await fetch("http://localhost:3000/tasks", requestOptions);
      context.commit('TASK_TOAST_ADD', 'Task created successfully!');
    },
    task_toast_remove: (context) => {
      context.commit('TASK_TOAST_REMOVE');
    }
  },
  getters: {
    getTasks: (state) => state.tasks,
  },
};
