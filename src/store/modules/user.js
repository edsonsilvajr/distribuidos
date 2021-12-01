export const user = {
  state: () => ({
    user: null,
  }),
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
  },
  actions: {},
}

export default user
