export default {
    state: {
        PopupUIMessage: {
            show: false,
            text: ''
        },
    },
    mutations: {
        PopupUIMessageShow: function(state, text) {
            state.PopupUIMessage = {
                show: true,
                text,
            }
        },
        PopupUIMessageHide: function(state, text) {
            state.PopupUIMessage = {
                show: false,
                text: '',
            }
        }
    },
    actions: {
        actionPopupUIMessageShow: ({ commit }, payload) => {
            commit('PopupUIMessageShow', payload)
        },
        actionPopupUIMessageHide: ({ commit }, payload) => {
            commit('PopupUIMessageHide', payload)
        },
    },
    getters: {
        PopupUIMessage(state) {
            return state.PopupUIMessage;
        },
    }
}