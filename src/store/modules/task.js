export default {
  namespaced: true,
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
      console.log(this.state.user.users);
      console.log(payload.current_id);
      let name = "";
      this.state.user.users.forEach((user) => {
        if (user.id == payload.current_id) {
          name = user.name;
        }
      });
      state.tasks.forEach((task) => {
        if (task.id === payload.id) {
          task.completed = payload.completed;
          task.status = payload.completed ? "Done" : "Not Done";
          task.completedBy = payload.completed ? name : "-";

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
    TASK_EDIT(state, payload) {
      state.tasks.forEach((task) => {
        if (task.id == payload.id) {
          task.name = payload.editedData.name;
          task.title = payload.editedData.title;
          task.date = payload.editedData.date;
        }
      });
    },
  },

  actions: {
    task_index: async (context) => {
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      context.commit("TASKS_INDEX", data);
    },
    task_complete: async (context, payload) => {
      context.commit("TASK_COMPLETE", payload);

      const res = await fetch(
        "http://localhost:3000/users/" + payload.current_id
      );
      const data = await res.json();
      // console.log(data);

      const updateRequest = {
        method: "PATCH",
        body: JSON.stringify({
          completed: payload.completed,
          status: payload.completed ? "Done" : "Not Done",
          completedBy: payload.completed ? await data.name : "-",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      await fetch("http://localhost:3000/tasks/" + payload.id, updateRequest);
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
    async task_edit(context, payload) {
      console.log(context, payload);
      context.commit("TASK_EDIT", payload);
      const editTask = { ...payload.editedData };
      // console.log(editTask);
      const requestOptions = {
        method: "PATCH",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(editTask),
      };
      await fetch("http://localhost:3000/tasks/" + payload.id, requestOptions);
    },
  },
  getters: {
    getTasks: (state) => state.tasks,
  },
};
