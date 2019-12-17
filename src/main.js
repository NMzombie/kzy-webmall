import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui';
import Vuex from 'vuex'
import router from './router'
import store from './store'

Vue.use(Vuex)
Vue.use(Mint);
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
