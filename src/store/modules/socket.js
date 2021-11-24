export const socket = {
  state: () => ({
    message: '',
    incomingMessage: null,
    snack: null,
    close: false,
  }),
  mutations: {
    SET_MESSAGE(state, payload) {
      state.message = payload
    },
    SET_INCOMINGMESSAGE(state, payload) {
      state.incomingMessage = payload
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
