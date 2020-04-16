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
            meta: {
                title: '首页'
            },
            component: function (resolve) {
                require(['../view/index'], resolve)
            }
        },
        {
            path: '/cart',
            name: 'cart',
            meta: {
                title: '购物车'
            },
            component: function (resolve) {
                require(['../view/cart'], resolve)
            }
        },
        {
            path: '/ucenter',
            name: 'ucenter',
            meta: {
                title: '个人中心'
            },
            component: function (resolve) {
                require(['../view/ucenter'], resolve)
            }
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登录'
            },
            component: function (resolve) {
                require(['../view/login'], resolve)
            }
        },
        {
            path: '/goods/:pid',
            name: 'goods',
            meta: {
                title: '商品详情'
            },
            component: function (resolve) {
                require(['../view/goods'], resolve)
            }
        },
        {
            path: '/userinfo',
            name: 'userinfo',
            meta: {
                title: '编辑个人信息'
            },
            component: function (resolve) {
                require(['../view/userinfo'], resolve)
            }
        },
        {
            path: '/address-list',
            name: 'address-list',
            meta: {
                title: '收货地址'
            },
            component: function (resolve) {
                require(['../view/address-list'], resolve)
            }
        },{
            path: '/address/:id',
            name: 'address',
            meta: {
                title: '添加／编辑收货地址'
            },
            component: function (resolve) {
                require(['../view/address.vue'], resolve)
            }
        }
    ]
})
