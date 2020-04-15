import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import Vuex from 'vuex'
import router from './router'
import store from './vuex/store'
import VueResource from 'vue-resource'
import common from './common'
import AccountLogic from '@/logic/account'
import components from '@/config-components'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueLazyload from 'vue-lazyload'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)
Vue.use(VueResource);
Vue.use(Vuex)
Vue.use(Mint);
Vue.use(Vant);
Vue.use(VueLazyload, {
    loading: require('./assets/images/lazyLoad.png'),//加载中图片，一定要有，不然会一直重复加载占位图
    error: require('./assets/images/lazyLoad.png')
});

Vue.config.productionTip = false
components(Vue)

AccountLogic.initContext()
Vue.http.options.emulateJSON = true;
Vue.http.interceptors.push((request, next) => {
    //请求超时20秒
    request.timeout = 20000;

    // 请求地址映射
    request.url = common.get_api_url(request.url);


    // 请求参数构建
    let data = request.body || {};
    let auth = AccountLogic.buildHttpHeaders();

    request.body = {
        data: JSON.stringify(data),
        auth: JSON.stringify(auth)
    }

    // continue to next interceptor
    next((response) => {
        if (response && response.body) {
            let obj = response.body;

            //需要登录或者access-token缺失，支付不匹配
            if (obj.code == 11991019 || obj.code == 11991011 || obj.code == 11020013) {

                // // @todo
                // Toast({
                //   message: `错误码：${obj.code},错误信息：${obj.desc}`,
                //   position: 'bottom',
                //   duration: 5000
                // });
                // return

                AccountLogic.cleanContext()

                // 判断是否是强制需要登录的页面
                // if (!system.isApp() || system.isApp() && !isNotLogin()) {
                //     //判断是否在知识付费详情页中
                //     if (isKnowledgeDetail()) { //使用学院公众号登录
                //         AccountLogic.login(window.location.href, common.config.appId_xy);
                //     // 新细胞页面
                //     } else if (isCellCoursePage()) {
                //         AccountLogic.login(window.location.href, common.config.appId_cell)
                //     } else {
                //         AccountLogic.login();
                //     }
                // }
            }
        }
        // 灰测用户标识
        // const currentUserId = auth['x-user-id']
        // let cookie_abtestUser = AccountLogic.getAbtestUser()
        // if (cookie_abtestUser) {
        //     cookie_abtestUser = cookie_abtestUser === 'true'
        // }
        // // cookie中存在abtestUser时
        // if (typeof cookie_abtestUser === 'boolean') {
        //     localStorage.setItem('abTestUserData', JSON.stringify({
        //         success: cookie_abtestUser,
        //         userId: currentUserId
        //     }))
        //     if (!!cookie_abtestUser) return
        // }
        // if (currentUserId) judgeAbTestUser(response, { currentUserId })
    });
});

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')
