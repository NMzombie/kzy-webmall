import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
    // {
    //   path:'/',
    //   redirect: '/'
    // },
        {
            path: '/',
            name: 'home',
            component: function (resolve) {
                require(['../view/index'], resolve)
            }
        },
        {
            path: '/cart',
            name: 'cart',
            component: function (resolve) {
                require(['../view/cart'], resolve)
            }
        },
        {
            path: '/ucenter',
            name: 'ucenter',
            component: function (resolve) {
                require(['../view/ucenter'], resolve)
            }
        },
        {
            path: '/login',
            name: 'login',
            component: function (resolve) {
                require(['../view/login'], resolve)
            }
        },
        {
            path: '/goods/:pid',
            name: 'goods',
            component: function (resolve) {
                require(['../view/goods'], resolve)
            }
        }
    ]
})
