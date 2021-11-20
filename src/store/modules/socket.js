export const socket = {
    state: () => ({
        message: '',
    }),
    mutations: {
        SET_MESSAGE(state, payload) {
            state.message = payload
        },
    },
    actions: {},
}

export default socket
