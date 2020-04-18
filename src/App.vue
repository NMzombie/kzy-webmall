<template>
    <div id="app">
        <keep-alive>
            <router-view
                v-if="$route.meta.keepAlive"
                :key="Key" />
        </keep-alive>
        <router-view
            v-if="!$route.meta.keepAlive"
            :key="Key" />
        <vuex-message />
    </div>
</template>
<script>
export default {
    data(){
        return {
            Key: ''
        }
    },
    watch: {
        $route: function(newUrl, oldUrl) {
            this.Key = new Date().getTime();
        }
    },
    created(){
        this.initDpr()
    },
    methods:{
        initDpr() {
            var doc = window.document;
            var docEl = doc.documentElement;
            var dpr = 0;
            var tid = 0;
            function refreshRem() {
                var width = docEl.getBoundingClientRect().width;
                var height = docEl.getBoundingClientRect().height;
                // 如果是横屏需要处理
                if (window.orientation === 90 || window.orientation === -90) {
                    if(isAndroid){ // 处理屏宽小于750的小屏
                        width = Math.min(height, window.innerWidth);
                    }else{
                        width = document.documentElement.clientHeight
                    }
                }
                if (width > 750) {
                    width = 750;
                }
                var rem = Number(width / 3.75).toFixed(0);
                docEl.style.fontSize = rem + "px";
            }
            refreshRem()
        }
    }
}
</script>
<style lang="less">
// @import "./assets/css/font.less";
@import "./assets/css/style.less";
// @import "./assets/css/style";
// @import "./assets/css/grid.less";
// @import "./assets/css/app.less";
// @import "./assets/css/button.less";
// @import "./assets/css/popup-animate.less";
@import "./assets/fonts/iconfont.css";
</style>
