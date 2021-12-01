import Vue from 'vue'

export const socket = {
  state: () => ({
    message: '',
    incomingMessage: {
      message: null,
      timestamp: null,
    },
    snack: null,
    close: false,
  }),
  mutations: {
    SET_MESSAGE(state, payload) {
      state.message = payload
    },
    SET_INCOMINGMESSAGE(state, payload) {
      Vue.set(state, 'incomingMessage', {
        message: payload,
        timestamp: new Date().getTime(),
      })
    },
    SET_SNACK(state, payload) {
      state.snack = payload
    },
    DISCONNECT(state) {
      state.close = true
      setTimeout(() => {
        state.close = false
      }, 200)
    },
  },
  actions: {},
}

export default socket
