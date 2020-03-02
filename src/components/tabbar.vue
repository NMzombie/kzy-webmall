<template>
    <div>
        <div class="wrap">
            <div
                class="flex1"
                style="text-align:center"
                @click="go('/')">
                <p>
                    <span
                        v-if="pathName == 'home'"
                        class="iconfont icon-shouye-selected flex-center active"
                        style="margin-bottom:0.04rem" />
                    <span
                        v-else
                        class="iconfont icon-shouye flex-center c-86"
                        style="margin-bottom:0.04rem" />
                </p>
                <p
                    class="c-86"
                    :class="{'active':pathName == 'home'}">
                    首页
                </p>
            </div>
            <div
                class="flex1"
                style="text-align:center"
                @click="go('/cart')">
                <p>
                    <span
                        v-if="pathName == 'cart'"
                        class="iconfont icon-gouwuche-selected flex-center active"
                        style="margin-bottom:0.04rem" />
                    <span
                        v-else
                        class="iconfont icon-gouwuche flex-center c-86"
                        style="margin-bottom:0.04rem" />
                </p>
                <p
                    class="c-86"
                    :class="{'active':pathName == 'cart'}">
                    购物车
                </p>
            </div>
            <div
                class="flex1"
                style="text-align:center"
                @click="go('/ucenter')">
                <p>
                    <span
                        v-if="pathName == 'ucenter'"
                        class="iconfont icon-wode-selected flex-center active"
                        style="margin-bottom:0.04rem" />
                    <span
                        v-else
                        class="iconfont icon-wode flex-center c-86"
                        style="margin-bottom:0.04rem" />
                </p>
                <p
                    class="c-86"
                    :class="{'active':pathName == 'ucenter'}">
                    我的
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    created() {
        this.pathName = this.$route.name
        console.log(this.$route.name)
    },
    methods: {
        go(path){
            this.$router.push({
                path: path
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../assets/css/layout.less';
.wrap{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: .48rem;
  border-top: 1px solid #eee;
  box-sizing: border-box;
  background-color: #fff;
  opacity: .98;
  padding-top: .05rem;
  z-index: 100;
  display: flex;
}
.c-86{
  color: #868686
}
.active{
  color: #cc0404
}
</style>