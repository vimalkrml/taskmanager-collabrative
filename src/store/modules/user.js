export default {
    namespaced: true,
    state: {
        users: [],
        user: {},
        current_id: '',
        name: '',
        toast: ''
    },
    mutations: {
        USER_INDEX(state, users) {
            // console.log(users);
            state.users = users;
            // console.log(state.users);
        },
        USER_DELETE(state, payload) {
            // console.log("hii");
            const mutateData = state.users.filter((user) => user.id !== payload);
            console.log(mutateData);
            state.users = mutateData;
            // console.log(state.users);
        },
        USER_ADD(state, payload) {
            console.log(state.users);
            // JSON.parse(JSON.stringify(state.users)).push(payload);
            state.users.push(payload);
            // console.log(payload)
        },
        USER_SHOW(state, payload) {
            state.user = payload;
        },
        USER_LOGIN(state, payload) {
            state.current_id = payload
            state.name = payload
            console.log(state.name)
        },
        USER_TOAST_ADD(state, payload) {
            state.toast = payload;
        },
        USER_TOAST_REMOVE(state) {
            state.toast = '';
        },
    },

    actions: {
        user_index: async (context) => {
            const res = await fetch("http://localhost:3000/users");
            const data = await res.json();
            // console.log(data);
            context.commit("USER_INDEX", data);
        },
        user_delete: async (context, payload) => {
            context.commit("USER_DELETE", payload);
            await fetch("http://localhost:3000/users/" + payload, {
                method: "DELETE",
            });
        },
        user_add: async (context, payload) => {
            context.commit("USER_ADD", payload);
            const newuser = { ...payload };
            // console.log(newuser);
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newuser),
            };
            await fetch("http://localhost:3000/users", requestOptions);
            context.commit('USER_TOAST_ADD', 'User created successfully!');
        },
        user_toast_remove: (context) => {
            context.commit('USER_TOAST_REMOVE');
        },
        user_show: async (context, payload) => {
            const response = await fetch("http://localhost:3000/users/" + payload);
            const json = await response.json();
            // console.log(json);
            context.commit("USER_SHOW", json);
        },
        user_login: (context, payload) => {
            context.commit('USER_LOGIN', payload);
        }
    },
    getters: {
        getUsers: (state) => state.users,
        getUser: (state) => state.user,
    },
};