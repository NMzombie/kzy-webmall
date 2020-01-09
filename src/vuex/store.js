import Vue from 'vue'
import Vuex from 'vuex'
import popupUI from './modules/popupUI'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        popupUI
    }
})

export default store