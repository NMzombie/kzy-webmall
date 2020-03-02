<template>
    <div class="bottom-popup">
        <transition name="fade">
            <div
                v-show="showPopup"
                class="shadow"
                @click="hidePopup" />
        </transition>
        <div
            ref="popup"
            class="rule"
            :class="showPopup?'show-popup':''">
            <div
                class="box-j"
                :class="ruleType === 'dingdan' ? 'mg-b' : ''">
                <div class="title">
                    {{ title }}
                </div>
                <div @click="hidePopup">
                    <i class="icon iconfont icon-shanchutupian close-popup" />
                </div>
            </div>
            <div
                v-if="isFahuo"
                class="p20-t max-height"
                style="min-height:1.3rem;margin-bottom:-0.1rem">
                <div class="rule-item">
                    <p>本商品不支持配送：{{ stockPlace }}</p>
                </div>
            </div>

            <div
                v-if="isDingdan"
                class="max-height">
                <ul class="goods-list">
                    <li
                        v-for="(item, index) in stockList"
                        :key="index"
                        class="box">
                        <div style="display:flex">
                            <div class="_left">
                                <img :src="item.pictures[0] | ali(80)">
                            </div>
                            <div class="_center">
                                <h3>{{ item.name }}</h3>
                                <h4>{{ item.xSkuName }}</h4>
                                <p>
                                    <span v-if="q_pintuanVersion == 2 && q_groupEvent == 2">¥<strong>{{ setItemPrice(item, isVip, vipPrice.vipMemberDiscount) }}</strong></span>
                                    <span v-else>¥<strong>{{ ((((item.xHasAppPrice && !(isShowVip && isVip && item.xMemberPrice && item.activityJoinUser !== 1)) ? item.xAppPrice : item.xPrice) || 0) / 100).toFixed(2) }}</strong></span>
                                    <template v-if="item.cartItemType!=1 && q_pintuanVersion!=2">
                                        <span
                                            v-if="isShowVip && isVip && item.xMemberPrice && item.activityJoinUser !== 1"
                                            class="memberPrice">会员￥{{ item.xMemberPrice / 100 }}</span>
                                        <del v-else-if="item.priceMap && item.sellPrice < item.priceMap.originSellPrice">¥{{ ((item.priceMap.originSellPrice || 0) / 100).toFixed(2) }}</del>
                                    </template>
                                </p>
                                <small>x {{ item.xNum }}</small>
                            </div>
                            <div class="_right" />
                        </div>
                        <div class="quehuo">
                            该商品您所在的区域缺货
                        </div>
                    </li>
                </ul>
            </div>
            <div
                v-if="isDingdan"
                class="close-button"
                @click="hidePopup">
                关闭
            </div>
        </div>
    </div>
</template>
<script>
import system from '@/tools/system'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    props: ['showPopup','ruleType','stockPlace','stockList','isShowVip','isVip','vipPrice','qPintuanVersion','qGroupEvent'],
    data() {
        return {
            title: '',
            isFahuo: false,
            isDingdan: false,
            clientHeight:''
        }
    },
    computed: {

    },
    created() {
        if(this.ruleType === "fahuo"){
            this.title = "发货"
            this.isFahuo = true
        }else if(this.ruleType === "dingdan"){
            this.title = "以下商品您所在的区域暂时缺货"
            this.isDingdan = true
        }
    },
    mounted(){
        // 获取浏览器可视区域高度
        if(this.ruleType === "dingdan"){
            this.clientHeight = document.documentElement.clientHeight
            console.log(this.clientHeight)
            this.$refs.popup.style.height = this.clientHeight*0.7+'px';
        }
    },
    methods: {
        hidePopup(){
            this.$emit('closePopup')
            // this.showPopup = false
        },
        setItemPrice(item, isVip, vipMemberDiscount){
            console.log(item)
            let groupPrice = item.xPrice;
            if(item.skus[0].price<groupPrice){
                groupPrice = item.sellPrice
            }
            if(!item.virtual){
                let appPrice = item.skus[0].priceMap.newUserAppPrice;
                let memberPrice = item.skus[0].priceMap.memberPrice;

                if(this.isApp&& !isVip && groupPrice > appPrice){
                    groupPrice  = appPrice
                }
                if(isVip && memberPrice && item.xPrice > memberPrice){
                    groupPrice  = memberPrice + (vipMemberDiscount||0)
                }
            }

            return ((groupPrice||0)/100).toFixed(2);
        }
    }
}
</script>
<style lang="less" scoped>
@import '../assets/css/layout.less';
@theme-color: #ff6565;
.p20-t{
    padding-top: .1rem;
}
.mg-b{
    margin-bottom: 0.12rem;
}
.box-j{
    height: 5%;
}
.title{
    font-size:0.15rem;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(34,34,34,1);
    line-height:0.18rem;
}
.shadow {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
    top: 0;
    left: 0;
    z-index: 101;
}
.rule{
    width: 100%;
    box-sizing: border-box;
    padding: .2rem .13rem;
    position: fixed;
    background: #fff;
    border-radius: .12rem .12rem 0 0;
    z-index: 102;
    bottom: -100vh;
    transition: bottom .3s ease-out;
    max-height: 70%;
    overflow: hidden;
}
.show-popup{
    bottom: 0;
}
.rule-item{
    display: block;
    font-size: .13rem;
    color: #999;
    font-family: PingFangSC;
    font-weight: 400;
    max-height: 1.5rem;
    line-height: 0.2rem;
    overflow-y: scroll;
}
.close-popup{
    font-size:.25rem;
    color:#999;
}
.max-height{
    height: 80%;
    overflow-y: scroll;
    margin-bottom: 0.2rem
}
.rule-item  span{
    display: inline-block;
    padding-left:0.1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-move {
  transition: transform 0.3s;
}
.quehuo{
    white-space: nowrap;
    font-size:0.14rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(255,79,88,1);
    padding: 0.08rem 1.15rem 0.02rem 0.93rem;
    }
.goods-list {
    background: white;
    li {
        flex-direction: column;
        align-items: stretch;
        padding: 0.1rem 0;
        border-bottom: 1px solid #f3f3f3;

        ._left {
            flex: 0 0 0.84rem;
            width: 0.84rem;
            height: 0.84rem;

            img {
                width: 0.84rem;
                height: 0.84rem;
            }
        }

        ._center {
            position: relative;
            flex: auto;
            min-width: 0;
            height: 0.84rem;
            padding-left: 0.09rem;

            h3 {
                display: -webkit-box;
                overflow: hidden;
                color: #222;
                font-size: 0.14rem;
                line-height: 0.22rem;
                /* ! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                -webkit-line-clamp: 2;
            }

            h4 {
                height: 0.22rem;
                overflow: hidden;
                color: #999;
                font-size: 0.12rem;
                line-height: 0.22rem;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            p {
                position: absolute;
                bottom: 0;
                left: 0.12rem;

                span {
                    color: @theme-color;
                    font-size: 0.12rem;
                    font-family: PingFangSC-Medium;

                    strong {
                        margin-left: 0.05rem;
                        font-weight: normal;
                        font-size: 0.16rem;
                    }
                }

                del {
                    margin-left: 0.05rem;
                    color: #999;
                    font-size: 0.1rem;
                    line-height: 0.1rem;
                }

                .memberPrice {
                    box-sizing: border-box;
                    padding: 0 0.06rem;
                    height: 0.15rem;
                    line-height: 0.15rem;
                    background: linear-gradient(90deg,rgba(94,84,71,1) 0%,rgba(48,42,34,1) 100%);
                    color: rgba(251,225,157,1);
                    border-radius: 0.08rem;
                    font-size: 0.09rem;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    position: relative;
                    top: -0.02rem;
                }
            }

            small {
                position: absolute;
                right: 0;
                bottom: 0;
                color: #999;
                font-size: 0.12rem;

                i {
                    line-height: 0.12rem;
                    vertical-align: bottom;

                    &::before {
                        font-size: 0.12rem;
                    }
                }
            }
        }

        ._right {
            flex: 0 0 0.12rem;
            width: 0.12rem;
            height: 0.84rem;
        }
    }
}
.close-button{
    line-height: 0.4rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    font-size:0.15rem;
    color:rgba(255,255,255,1);
    text-align: center;
    background:linear-gradient(90deg,rgba(255,99,129,1) 0%,rgba(255,43,84,1) 100%);
    border-radius:0.2rem;
    margin: 0 0.15rem;
}

</style>