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
        },{
            path: '/pay-check',
            name: 'pay-check',
            meta: {
                title: '订单结算'
            },
            component: function (resolve) {
                require(['../view/pay-check.vue'], resolve)
            }
        },
        {
            path: '/trade-list/:id',
            name: 'trade-list',
            meta: {
                title: '订单列表'
            },
            component: function (resolve) {
                require(['../view/trade-list.vue'], resolve)
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
            path: '/address',
            name: 'address',
            meta: {
                title: '添加／编辑收货地址'
            },
            component: function (resolve) {
                require(['../view/address.vue'], resolve)
            }
        },
        {
            path: '/name-confirm',
            name: 'name-confirm',
            meta: {
                title: '实名认证'
            },
            component: function (resolve) {
                require(['../view/name-confirm.vue'], resolve)
            }
        },
        {
            path: '/search',
            name: 'search',
            meta: {
                title: '搜索页'
            },
            component: function (resolve) {
                require(['../view/search.vue'], resolve)
            }
        },
        {
            path: '/page/:id',
            name: '首页',
            meta: {
                title: '首页'
            },
            component: function (resolve) {
                require(['../view/micro-page.vue'], resolve)
            }
        },
        {
            path: '/knowledgePage/:id',
            name: '课程页',
            meta: {
                title: '课程页'
            },
            component: function (resolve) {
                require(['../view/knowledgePage.vue'], resolve)
            }
        }
    ]
})
