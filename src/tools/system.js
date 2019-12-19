import Cookie from 'js-cookie'

export default {
    isApp() {
        let platform = Cookie.get("platform") ? Cookie.get("platform").toLowerCase(): "";
        if (platform == 'android' || platform == 'ios') {
            return true;
        } else {
            return false;
        }
    },
    isAppOrWechat(){
        return this.isApp() ||this.isWechat()
    },
    isIos(){
        let platform = Cookie.get("platform") ? Cookie.get("platform").toLowerCase(): "";
        return platform == 'ios';
    },
    isIpxH5(){
        let Ipx = /iphone/gi.test(navigator.userAgent) && ((screen.height == 812 && screen.width == 375) || (screen.height == 896 && screen.width == 414))
        return !this.isApp() && Ipx
        // return true
    },
    isAndroid(){
        let platform = Cookie.get("platform") ? Cookie.get("platform").toLowerCase(): "";
        return platform == 'android';
    },
    setApp(type = "android") {
        Cookie.set('platform', type)
    },

    getAppVersion(){
        let client_version = Cookie.get("client_version") ? Cookie.get("client_version").toLowerCase(): "1.0.0";
        return client_version;
    },

    isDev() {
        if (process.env.NODE_ENV == 'development' || process.env.VUE_APP_API_ENV === 'dev') {
            return true;
        } else {
            return false;
        }
    },
    isTest(){
        if (process.env.NODE_ENV == 'testing') {
            return true;
        } else {
            return false;
        }
    },
    isPro() {
        if (process.env.NODE_ENV == 'production') {
            return true;
        } else {
            return false;
        }
    },
    getApiEnv(){
        return process.env.VUE_APP_API_ENV;
    },
    isWechat(){
        return /micromessenger/.test(navigator.userAgent.toLowerCase())
    },
    getWechatVersion(){
        let wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i);
        if( !wechatInfo ) {
            return '';
        }else{
            return wechatInfo[1];
        }
    },
    isPC(){
       var userAgentInfo = navigator.userAgent;
       var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
       var flag = true;
       for (var v = 0; v < Agents.length; v++) {
           if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
       }
       return flag;
    },
    phoneIsAndroid(){
        let u = navigator.userAgent;
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    },
    phoneIsIos(){
        let u = navigator.userAgent;
        return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    channelCode() {
        return sessionStorage.getItem('channelCode')||null
    }
}
