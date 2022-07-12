import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tasks: [{ id: '1', name: 'vimal', description: 'tasks done', status: 0, duedate: new Date() }]
    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        getNameAndDescription: (state) => {
            return state.tasks[0].name + ' ' + state.tasks[0].description
        }
    }
})