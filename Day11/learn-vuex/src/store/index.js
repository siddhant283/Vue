import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { createStrore } from 'vuex'

export default createStrore({
    state: {
        counter: 0
    },
    mutations: {
        increaseCounter(state) {
            state.counter++
        },
        decreaseCounter(state) {
            state.counter--
        }
    },
    actions: {

    },
    getters: {},
    modules: {}
})