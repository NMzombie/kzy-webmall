import common from '@/common'
import Cookie from 'js-cookie'
import systemTool from '@/tools/system'
import { MessageBox, Toast } from 'mint-ui';
// import http from 'http-handle'
// import { getDistUrl, locationHref, locationReplace } from '@/tools/changeLocation.js'
// 主域名
// const { VUE_APP_MAIN_HOSTNAME: main_hostname } = process.env;
const main_hostname = 'ngmm001.com'

export default {
    getAbtestUser() {
        return Cookie.get('abTestUser')
    },
    getAccessToken() {
        return Cookie.get('access_token') || "";
    },
    getTerminal() {
        return Cookie.get("client_token") || localStorage.getItem("client_token") || ""
    },
    getClientToken() {
        return this.getTerminal();
    },
    getOpenId() {
        return Cookie.get('open_id') || "";
    },
    getUserId() {
        let app_id = Cookie.get('app_id') || "";
        let platform = Cookie.get("platform") ? Cookie.get("platform").toLowerCase() : "";
        //有appid就认为是微信授权登录
        if (app_id) {
            // 比较app_id和当前配置的appid是否一致
            if (app_id == common.config.appId || app_id == common.config.appId_xy || app_id == common.config.appId_zj || app_id == common.config.appId_cell) {
                return Cookie.get('user_id') || 0;
            } else {
                return 0;
            }
        } else if (platform == 'ios' || platform == 'android') {
            //判断platform是iOS和android的，认为是app登录。
            return Cookie.get('user_id') || 0;
        } else {
            //模拟登录和其他情况
            return Cookie.get('user_id') || 0;
        }
    },
    /**
     * 构建请求头参数
     * @return {[type]} [description]
     */
    buildHttpHeaders() {
        let userId = Cookie.get("user_id") || localStorage.getItem("user_id") || ""
        let accessToken = Cookie.get("access_token") || localStorage.getItem("access_token") || ""
        let platform = Cookie.get("platform") || localStorage.getItem("platform") || "wechat"

        let clientToken = Cookie.get("client_token") || localStorage.getItem("client_token") || ""

        // 异常情况处理。
        if (!clientToken || clientToken == '123') {
            clientToken = this.getUUID()
            localStorage.setItem('client_token', clientToken);
        }

        let systemVersion = Cookie.get("system_version") || localStorage.getItem("system_version") || ""
        let clientVersion = Cookie.get("client_version") || localStorage.getItem("client_version") || ""
        let methodVersion = Cookie.get("method_version") || localStorage.getItem("method_version") || ""
        let networkType = Cookie.get("network_type") || localStorage.getItem("network_type") || ""

        if (platform.indexOf('wechat') >= 0 && sessionStorage.getItem("_ngpf")) {
            platform = 'wechat_' + sessionStorage.getItem("_ngpf");
        }
        if (platform.toLowerCase().indexOf('ios') >= 0 && localStorage.getItem("_ngpf")) {
            platform = 'ios_' + localStorage.getItem("_ngpf");
        }
        if (platform.toLowerCase().indexOf('android') >= 0 && localStorage.getItem("_ngpf")) {
            platform = 'android_' + localStorage.getItem("_ngpf");
        }

        return {
            "x-user-id": userId,
            "x-access-token": accessToken,
            "x-platform": platform,
            "x-client-token": clientToken,

            "x-system-version": systemVersion,
            "x-client-version": clientVersion,
            "x-method-version": methodVersion,
            "x-network-type": networkType,
            "x-domain": main_hostname,
        }
    },
    /**
     * 清除登录相关的信息
     * @return {[type]} [description]
     */
    cleanContext() {
        let keys = [
            // "mock_app_id", //模拟微信登录时

            // "app_id", //微信授权登录时
            "user_id",
            "access_token",
            // "client_token",
            // "client_version",
            // "login_type",
            // "method_version",
            // "network_type",
            //"platform", //app登录时传ios|android
            //"system_version",
        ]

        keys.forEach((key, index) => {
            Cookie.remove(key)
            localStorage.removeItem(key)
        })

        //兼容老的判断，localStorage里面也存放一份。
        let compatibility_keys = [
            "userId",
            "accessToken",
        ]
        compatibility_keys.forEach((key, index) => {
            localStorage.removeItem(key)
        })

    },
    // 生成uuid
    getUUID() {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
            function(c) {
                let r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
        return uuid;
    },
    //初始化cookie
    initCookieForApp(info) {
        let keys = [
            "user_id",
            "access_token",
            "client_token",
            "client_version",
            "login_type",
            "method_version",
            "network_type",
            "platform", //app登录时传ios|android
            "system_version",
        ]

        keys.forEach((key, index) => {
            Cookie.set(key, info[key])
        })

        //兼容老的判断，localStorage里面也存放一份。
        let compatibility_keys = [
            "userId",
            "accessToken",
        ]

        compatibility_keys.forEach((key, index) => {
            localStorage.setItem(key, info[key])
        })
    },
    // 初始化 环境
    initContext() {
        let platform = Cookie.get("platform") ? Cookie.get("platform").toLowerCase() : "";

        //
        /**
         * 微信授权登录返回4个字段在cookie中
         */
        if (Cookie.get('app_id')) {
            // app_id
            // user_id
            // access_token
            // open_id

            // client_token用openID代替，部分cookie中没有的字段放在localstorage，避免每次请求都传输。

            localStorage.setItem('client_token', Cookie.get('open_id') || this.getUUID())
            localStorage.setItem('network_type', navigator.connection && navigator.connection.type || "3g")
            localStorage.setItem('platform', "wechat")
            localStorage.setItem('method_version', "1.0")
            localStorage.setItem('system_version', "10.1.1")
            localStorage.setItem('client_version', "2.0.1")
            localStorage.setItem('login_type', "wechat")

        } else if (platform == "ios" || platform == "android") {
            /*
             * app需要返回这8个cookie字段，新增一个login_type字段。
             */

            // user_id
            // access_token
            // platform
            // client_token
            // system_version
            // client_version
            // method_version
            // network_type

            // login_type   @todo 增加一个字段标识，登录类型4种：app_mobile（app中手机号）,app_wechat（app中微信）,wechat,h5_mock


            //app环境，什么都不用做。
        } else {
            //模拟登录环境

            //模拟环境，cookie存的是mock_app_id，用于区分微信授权登录的情况
            localStorage.setItem('login_type', "h5_mock")
            if (!localStorage.getItem('client_token') || localStorage.getItem('client_token') == '123') {
                localStorage.setItem('client_token', Cookie.get('open_id') || this.getUUID())
            }
            localStorage.setItem('network_type', navigator.connection && navigator.connection.type || "3g")
            localStorage.setItem('platform', "wechat")
            localStorage.setItem('method_version', "1.0")
            localStorage.setItem('system_version', "10.1.1")
            localStorage.setItem('client_version', "2.0.1")
        }
    },

    /**
     * 用户登录：包含微信授权登录和手机号登录。
     * @param  {[type]} backUrl 授权成功后跳转的完整地址。
     * @return {[type]}         [description]
     */
    login(backUrl, appId) {
        let isApp = systemTool.isApp()
        let isWechat = systemTool.isWechat()


        if (isApp) {
            let showLoging = sessionStorage.getItem('isLoging');
            if (!showLoging) {
                sessionStorage.setItem('isLoging', true);
                NGJsBridge.showLoginConfirm();
            }
        } else if (isWechat) {
            let currentUrl = backUrl || window.location.href;
            appId = appId || common.config.appId;

            let redirect_uri = common.config.loginCallbackUrl + "?app_id=" + appId + "&terminal=terminal&success_url=" + encodeURIComponent(currentUrl) + "&scope=snsapi_userinfo";

            if (systemTool.isDev() || systemTool.isTest()) { // 本地环境，跳转到模拟登录页面
                MessageBox.alert('未登录', '提示').then(()=>{
                    window.location.href = '/mock-login'
                })
                return
            }

            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect';
        } else {
            let currentPath = backUrl || (window.location.pathname + window.location.search);

            let redirect_path = encodeURIComponent(currentPath)

            if (systemTool.isDev()) { // 本地环境，跳转到模拟登录页面
                window.location.href = "/login?redirect=" + redirect_path + "&withMock=1";
            } else if (systemTool.isTest()) { // 测试环境，跳转到模拟登录页面
                window.location.href = "/login?redirect=" + redirect_path + "&withMock=1";
            } else {
                window.location.href = "/login?redirect=" + redirect_path;
            }
        }
    },

    /**
     * 微信授权(不登录)，用于服务端获取openid,unionid。用于仅授权，不设置cookie。服务端根据state决定是否写cookie。后期可以和login合并。
     * @param  {[type]} appId   [description]
     * @param  {[type]} backUrl [description]
     * @return {[type]}         [description]
     */
    authorize(appId, backUrl, state) {
        let isApp = systemTool.isApp();
        let isWechat = systemTool.isWechat();

        if (isApp) {
            let showLoging = sessionStorage.getItem('isLoging');
            if (!showLoging) {
                sessionStorage.setItem('isLoging', true);
                NGJsBridge.showLoginConfirm();
            }
        } else if (isWechat) {
            let app_id = appId || common.config.appId;
            let currentUrl = backUrl || window.location.href;
            state = state || 'state';
            let redirect_uri = common.config.authorizeCallbackUrl + "?app_id=" + app_id + "&terminal=terminal&success_url=" + encodeURIComponent(currentUrl) + "&scope=snsapi_userinfo";

            if (systemTool.isDev() || systemTool.isTest()) { // 本地环境，跳转到模拟登录页面
                MessageBox.alert('未登录', '提示').then(()=>{
                    window.location.href = '/mock-login'
                })
                return
            }

            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + app_id + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&response_type=code&scope=snsapi_userinfo&state=' + state + '#wechat_redirect';
        } else {
            let currentPath = backUrl || (window.location.pathname + window.location.search);

            let redirect_path = encodeURIComponent(currentPath)

            if (systemTool.isDev()) { // 本地环境，跳转到模拟登录页面
                window.location.href = "/login?redirect=" + redirect_path + "&withMock=1";
            } else if (systemTool.isTest()) { // 测试环境，跳转到模拟登录页面
                window.location.href = "/login?redirect=" + redirect_path + "&withMock=1";
            } else {
                window.location.href = "/login?redirect=" + redirect_path;
            }
        }
    },
    // checkOpenId(option) { //判断是否授权
    //     let { appId, url, isReplace } = option;
    //     let userId = this.getUserId(),
    //         key = appId + '_' + userId + 'openId',
    //         openId = localStorage.getItem(key),
    //         self = this;
    //     if (openId) {
    //         if (isReplace) {
    //             // window.location.replace(url)
    //             locationReplace(url)
    //         } else {
    //             locationHref(url)
    //             // window.location.href = url;
    //         }
    //     } else {
    //         http.AjaxCheckOpenIdExist({
    //             "appId": appId,
    //             "userId": userId,
    //         }, function(obj) {
    //             if (obj && obj.code === 10000) {
    //                 if (obj.data) {
    //                     localStorage.setItem(key, obj.data);
    //                     if (isReplace) {
    //                         // window.location.replace(url)
    //                         locationReplace(url)
    //                     } else {
    //                         window.location.href = url;
    //                     }
    //                 }
    //             } else {
    //                 self.authorize(appId, url, 'kuajing');
    //             }
    //         });
    //     }
    // },

    // checkOpenIdNew (option) {
    //     return new Promise((resolve, reject) => {
    //         let { appId, url } = option;
    //         let userId = this.getUserId(),
    //             key = appId + '_' + userId + 'openId',
    //             openId = localStorage.getItem(key),
    //             self = this;
    //         if (openId) {
    //             return resolve()
    //         } else {
    //             http.AjaxCheckOpenIdExist({
    //                 "appId": appId,
    //                 "userId": userId,
    //             }, function(obj) {
    //                 if (obj && obj.code === 10000) {
    //                     if (obj.data) {
    //                         localStorage.setItem(key, obj.data);
    //                         return resolve()
    //                     }
    //                 } else {
    //                     self.authorize(appId, url, 'kuajing');
    //                 }
    //             });
    //         }
    //     })
    // },

    setNgpf(option) {
        //记录来自于哪个平台  _ngpf  比如糕妈优选，宝宝辅食日至
        let platform, zjChannelCode;
        platform = getQueryString('_ngpf');
        zjChannelCode = getQueryString('zjChannelCode');

        if (platform) {
            localStorage.setItem("_ngpf", trim(platform));
            sessionStorage.setItem("_ngpf", trim(platform));
        }

        //只取最开始的一个，在早教主页资源位有时处会出现2个zjChannelCode
        //url 链接上有 zjChannelCode，且本地没有，除/education/zjtradelist这个地址外，把渠道码存下
        if (zjChannelCode && !sessionStorage.getItem('zjChannelCode') && !(window.location.href.indexOf('/education/zjtradelist') > -1)) {
            sessionStorage.setItem("zjChannelCode", trim(zjChannelCode));
        }

        function trim(s) {
            return s.replace(/(^\s*)|(\s*$)/g, "");
        }

        function getQueryString(name) {
            let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
    }
}
