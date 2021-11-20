import Vue from 'vue'
import Vuex from 'vuex'
import socket from './modules/socket'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    modules: {
        socket: socket,
    },
})
