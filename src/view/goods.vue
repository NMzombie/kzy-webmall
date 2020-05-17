<template>
    <div style="background: #ffffff;">
        <div class="swipe">
            <mt-swipe :auto="0">
                <mt-swipe-item
                    v-for="(item,index) in p.pictures"
                    :key="index">
                    <img
                        :src="item"
                        class="img">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div
            v-if="loading"
            class="loading_new_wrap">
            <div :class="['liu']" />
        </div>
        <div class="container">
            <div class="box-price">
                <div
                    class="box-price-left">
                    <div v-if="p.existSku">
                        <span class="price-sell">￥</span><span class="price-s">{{ minPrice }}<span class="line"> - </span>{{ maxPrice }}</span>
                    </div>
                    <div v-else>
                        <span class="price-sell">￥</span><span class="price-s">{{ goodsPrice }}</span>
                    </div>
                </div>
                <span class="sale">已售{{ p.sales > 10000 ? (((p.sales-p.sales%1000)/10000+'万')) : (p.sales) }}</span>
            </div>
        </div>
        <div class="box-name box-j">
            <span class="sale-name">{{ p.name }}</span>
        </div>
        <p
            class="box-subheading">
            {{ p.subName }}
            <!-- <span class="sale">已售{{p.sales}}</span> -->
        </p>
        <div
            class="protect-box ">
            <div
                class="protect border-t-gray">
                <div class="protect-one">
                    <div>
                        <i class="protect-img  icon iconfont icon-circle-check" />
                    </div>
                    <div class="protect-wenzi">
                        正品保障
                    </div>
                </div>
                <div class="protect-one">
                    <div>
                        <i class="protect-img  icon iconfont icon-circle-check" />
                    </div>
                    <div class="protect-wenzi">
                        假一赔十
                    </div>
                </div>
                <div class="protect-one">
                    <div>
                        <i class="protect-img  icon iconfont icon-circle-check" />
                    </div>
                    <div class="protect-wenzi">
                        权威检测
                    </div>
                </div>
                <div class="protect-one">
                    <div>
                        <i class="protect-img  icon iconfont icon-circle-check" />
                    </div>
                    <div class="protect-wenzi">
                        无忧退换
                    </div>
                </div>
            </div>
        </div>
        <div class="middle-one" />
        <div
            class="specifications"
            @click="showSku = true">
            <!-- <span
                v-if="chooseNumFlag"
                class="text"><span :class="curStock <= 5 ? 'choose-spec' : 'no-emergency-stock' "><i>已选</i><span class="sku-str">{{ skuNameStr }}, {{ num }}</span> </span>
            </span> -->
            <span
                v-if="!skuChoosed.length"
                class="text">请选择 规格数量</span>
            <span
                v-else
                class="text">已选择： <span
                    v-for="(item,i) in skuChoosed"
                    :key="i">{{ item }} </span> </span>
            <span> <i class="right_arrow icon iconfont icon-arrow-right" /></span>
        </div>

        <!-- 缺货地区 -->
        <div class="middle-one" />
        <noStock
            :stock-place="stockPlace"
            @popupShow="showPop" />
        <div class="middle-one" />
        <div class="detail-title">
            商品详情
        </div>
        <img
            src="https://staticimg.ngmm365.com/cbc1db025feee1c2694bc2e7907d5cc6-w900_h1010.jpg?x-oss-process=image/resize,w_750/format,jpg/interlace,1/quality,Q_60/sharpen,90"
            style="width: 100%;">

        <!-- 商品详情富文本 -->
        <div
            class="richText"
            v-html="content" />
        <div class="middle-one" />

        <!-- 商品推荐 -->
        <recommend
            :pid="pid"
            type="detail" />
        <div class="bottom">
            <div class="short-line" />
            END
            <div class="short-line" />
        </div>
        <div class="tabbar">
            <router-link
                class="item"
                to="/">
                <img
                    src="../assets/home-new.png"
                    class="icon">
                <p>首页</p>
            </router-link>
            <router-link
                class="item"
                to="/cart">
                <img
                    src="../assets/cart-new.png"
                    class="icon">
                <p>购物车</p>
            </router-link>
            <div class="item">
                <img
                    src="../assets/kefu-new.png"
                    class="icon">
                <p>客服</p>
            </div>
            <div
                class="cart"
                @click="showSku = true">
                加入购物车
            </div>
            <div
                class="buynow"
                @click="showSku = true">
                立即购买
            </div>
        </div>

        <noStockPopup
            :show-popup="popupShow"
            rule-type="fahuo"
            :stock-place="stockPlace"
            @closePopup="hidePopup" />

        <skuPopup
            :show-sku="showSku"
            :p="p"
            :num="num"
            @closeSkuPop="closeSkuPop"
            @eventSkuNum="eventSkuNum" />
        <transition name="fade">
            <div
                v-if="showToTp"
                class="scroll-top"
                @click="backTop">
                <van-icon name="arrow-up" />
                <span>顶部</span>
            </div>
        </transition>
    </div>
    </div>
</template>
<script>
import { Toast } from 'vant';
import { post } from "@/http-handle/http2.js";
import noStockPopup from '../components/noStockPopup'
import noStock from '../components/noStock'
import AccountLogic from '@/logic/account'
import skuPopup from '../components/skuPopup'
import recommend from '../components/recommend'
export default {
    components:{
        noStockPopup,
        noStock,
        skuPopup,
        recommend
    },
    data(){
        return{
            stockPlace: '',
            p: {},
            popupShow: false, // 缺货地区弹框
            minPrice: '',
            maxPrice: '',
            content: '',
            showSku: false,
            num: 1,
            skuChoosed: [],
            scroll: '',
            showToTp: false,
            loading: true,
            goodsPrice: ''
        }
    },
    computed: {
        pid() {
            return parseInt(this.$route.params.pid, 10)
        },
        userId () {
            return AccountLogic.getUserId()
        }
    },
    created(){
        this.getGoodsInfo()
    },
    mounted (){
        window.addEventListener('scroll', this.backTopShow)
    },
    methods: {
        backTopShow() {
            this.scroll = document.documentElement.scrollTop || document.body.scrollTop
            if(this.scroll>400) {
                this.showToTp = true
            } else {
                this.showToTp = false
            }
        },
        backTop() {
            window.scrollTo(0, 0)
        },
        hidePopup () {
            this.popupShow = false
        },
        showPop () {
            this.popupShow = true
        },
        closeSkuPop (val){
            this.showSku = false
            this.skuChoosed = val
        },
        getGoodsInfo() {
            this.loading = true
            let data = {goodsId: this.pid,userId: this.userId}
            post('/goods/detail',data).then(res => {
                if(res.code*1 !== 10000) {
                    Toast(res.desc || '网络连接失败！')
                    this.loading = false
                    return
                }
                let data = res.data
                this.p = data
                if(this.p.existSku) {
                    let price = []
                    this.p.skus.forEach((item,i) => {
                        price.push(item.price)
                    })
                    this.minPrice = Math.min.apply(0, price) / 100
                    this.maxPrice = Math.max.apply(0, price) / 100
                } else {
                    this.goodsPrice = this.p.sellPrice/100
                }
                this.$http.get(this.p.details).then(obj => {
                    this.content = obj.body
                })
                this.loading = false
            }).catch(obj => {})
        },
        eventSkuNum(num) {
            this.num = num
        }
    }
}
</script>
<style lang="less" scoped>
.swipe{
    height: 3.75rem;
    .img{
      width: 100%;
      height: 100%;
    }
}
.box-price {
  font-family: "HelveticaNeue-Medium";
  color: #f7615b;
  padding: 0 0.12rem;
  font-size: 0.16rem;
  overflow: hidden;
  height: 0.29rem;
  padding-top: 0.165rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .sale{
      display: flex;
      float: right;
      white-space: nowrap;
      align-items: center;
      justify-content: center;
      margin-right: -0.12rem;
      text-align: center;
      font-size: 0.12rem;
      font-family:PingFang SC;
      font-weight:400;
      color:rgba(238,142,147,1);
      line-height:0.15rem;
      padding: 0 0.08rem;
      height:0.2rem;
      background:rgba(255,79,88,0.06);
      border-radius:0.5rem 0rem 0rem 0.5rem;
    }
  .box-price-left {
    float: left;
    height: 100%;
  }
  .box-price-right {
    flex:1;
    float: left;
    color: #999999;
    height: 100%;
    max-width: 100%;
  }
  .originalPrice {
    font-family: "PingFangSC-Regular";
    color: #999;
    font-size: 0.12rem;
    line-height: 0.28rem;
  }
  .originalpricE {
    font-family: "PingFangSC-Regular";
    color: #999;
    text-decoration: line-through;
    font-size: 0.12rem;
    line-height: 0.28rem;
  }
  .absoluteItem {
    position: absolute;
    .v-icon{
        width: 0.2rem;
        vertical-align: middle;
    }
  }
  .hiddenItem {
      visibility: hidden;
      .v-icon{
        width: 0.2rem;
        vertical-align: middle;
      }
      &.memberPrice {
        display: inline-block;
        font-size: 0.1rem;
        height: 0.34rem;
        transform-origin: 0% 0.17rem;
        box-sizing: border-box;
        white-space: nowrap;
        .label {
            background: linear-gradient(78deg,rgba(94,84,71,1) 0%,rgba(48,42,34,1) 100%);
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(251,225,157,1);
            padding: 0 0.04rem 0 0.06rem;
            border-radius: 0.09rem 0 0 0.09rem;
            display: inline-block;
            height: 0.17rem;
            line-height: 0.17rem;
            box-sizing: border-box;
            white-space: nowrap;
        }
        .value {
            background: linear-gradient(90deg,rgba(255,232,164,1) 0%,rgba(232,191,121,1) 100%);
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(123,89,28,1);
            padding: 0 0.11rem 0 0.05rem;
            border-radius: 0 0.09rem 0.09rem 0;
            display: inline-block;
            height: 0.17rem;
            line-height: 0.17rem;
            box-sizing: border-box;
            white-space: nowrap;
        }
    }
  }
  .price-sell {
    font-family: "PingFangSC-Regular";
    font-size: 0.16rem;
    color: #ff2266;
    vertical-align: text-bottom;
  }
  .price-s {
    font-family: "PingFangSC-Medium";
    font-size: 0.24rem;
    color: #ff2266;
    line-height: 0.225rem;
  }
  .line {
    font-family: cursive;
  }
  .app-label {
    margin-left: 0.1rem;
    display: inline-block;
    border: 1px solid #ffb354;
    border-radius: 2px;
    font-family: PingFangSC-Regular;
    font-size: 0.12rem;
    color: #ffb354;
    width: 0.55rem;
    height: 0.18rem;
    line-height: 0.18rem;
    text-align: center;
  }
}
.box-name {
    padding: 0.12rem 0.12rem 0.06rem;
    display: flex;
    justify-content:space-between;
    align-items: center;
    .sale-name{
        font-family: "PingFangSC-Regular";
        font-size: 15px;
        line-height: 1.5;
        color: #222222;
        flex:1;
        font-size: 0.17rem;
        overflow: hidden;
        text-overflow: ellipsis;
        font-weight: bold;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
    }
}
.box-subheading {
  font-family: "PingFangSC-Regular";
  font-size: 0.14rem;
  line-height: 1.5;
  color:#666;
  padding: 0 0.12rem 0.06rem;
  font-size: 0.17rem;
  display: flex;
  justify-content:space-between;
}
.protect-box {
  width: 100%;
  background: #fff;
  display: inline-block;
  overflow: hidden;

  .protect {
    padding-left: 0.12rem;
    float: left;
    width: 100%;
    display: inline-block;
    overflow: hidden;
    .right_arrow {
      position: absolute;
      right: 0.12rem;
      line-height: 0.4rem;
      color: #ccc;
    }
    .protect-one {
      width: 24%;
      line-height: 0.39rem;
      float: left;
      margin-top: 0.02rem;
      .protect-img {
        float: left;
        color: #999999;
        vertical-align: middle;
        width: 15%;
        color: #ff2266;
        font-size: 0.12rem;
      }
      .protect-wenzi {
        float: left;
        font-family: "PingFangSC-Regular";
        color: #666;
        margin-left: 0.07rem;
        font-size: 0.12rem !important;
      }
    }
    .selfFlag-one {
      width: 24%;
      line-height: 0.39rem;
      float: left;
      margin-top: 0.02rem;
      .selfFlag-img {
        float: left;
        color: #999999;
        vertical-align: middle;
        width: 15%;
        color: #ff2266;
        font-size: 0.12rem;
      }
      .selfFlag-wenzi {
        float: left;
        font-family: "PingFangSC-Regular";
        color: #666;
        margin-left: 0.07rem;
        font-size: 0.12rem !important;
      }
    }
    .selfFlag-two {
      width: 48%;
      line-height: 0.39rem;
      float: left;
      margin-top: 0.02rem;
      .two-img {
        float: left;
        color: #999999;
        vertical-align: middle;
        width: 9%;
        color: #ff2266;
        font-size: 0.12rem;
      }
      .two-wenzi {
        float: left;
        font-family: "PingFangSC-Regular";
        color: #666;
        margin-left: 0.07rem;
        font-size: 0.12rem !important;
      }
    }
    .protect-two {
      width: 25%;
      height: 0.37rem;
      line-height: 0.37rem;
      float: left;
      margin-top: 0.02rem;
      .two-img {
        float: left;
        color: #999999;
        vertical-align: middle;
        width: 15%;
        margin-top: 0.115rem;
      }
      .two-wenzi {
        float: left;
        font-family: "PingFangSC-Light";
        font-size: 12px;
        color: #999999;
        margin-left: 0.05rem;
        margin-top: 0.01rem;
        font-size: 12px !important;
      }
    }
  }
}
.middle-one {
  width: 100%;
  height: .1rem;
  background: #f6f8fb;
}
// 选择规格数量
.specifications {
  color: #222;
  font-size: 0.14rem;
  width: 100%;
  overflow: hidden;
  font-family: "PingFangSC-Regular";
  /* border-bottom: 1px solid #f3f3f3; */
  .text {
    display: inline-block;
    float: left;
    line-height: 0.44rem;
    padding-left: 0.12rem;
    width: 88%;
    i{
        display: inline-block;
        color: #999999;
        font-size: 0.12rem;
        margin-right: 0.08rem;
        font-style: normal;
    }
    .choose-spec {
      max-width: 64%;
      display: inline-block;
      float: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .no-emergency-stock {
      width: 80%;
      display: inline-block;
      float: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    /*库存告急**/
    .emergency-stock {
      font-family: "PingFangSC-Regular";
      font-size: 0.12rem;
      color: #ff2266;
      float: right;
      min-width: 30%;
    }
    .sku-str {
        font-family: PingFangSC-Medium;
        font-weight: 500;
    }
  }
  .right_arrow {
    position: absolute;
    right: 0.12rem;
    color: #ccc;
    line-height: 0.44rem;
  }
}
.detail-title {
    height: 0.4rem;
    padding-left: 0.12rem;
    display: flex;
    align-items: center;
    color: #222;
    font-family: "PingFangSC-Regular";
}
.bottom {
  margin-bottom: 0.53rem;
  padding: 0.15rem 0;
  text-align: center;
  color: #ccc;
  display:flex;
  justify-content: center;
  align-items: center;
  background: #f6f8fb;
}
.short-line {
    height: 1px;
    width: 0.2rem;
    background-color: #dcd2d2;
    margin: 0.05rem
}
.richText {
    font-family: "PingFangSC-Light";
    font-size: 15px;
    color: #666666;
    line-height: 1.75;
    padding: 0 10px;
    word-wrap: break-word;
    word-spacing: normal;
    overflow-x: hidden;
}
.tabbar {
  position: fixed;
  bottom: 0;
  height: 0.53rem;
  background: #f7f7fa;
  z-index: 500;
  width: 100%;
  display: flex;
  .item{
    flex-direction: column;
    width: 14%;
    padding: 5px 0 0;
    color: #999;
    text-align: center;
    border-right: 1px solid #e0e0e0;
    border-top: 1px solid #e0e0e0;
    p{
      margin-top: 5px;
      font-size: 13px
    }
  }
  .icon{
    display: block;
    margin: 0 auto;
    width: 22px;
    height: 22px;
  }
  .buynow{
    text-align: center;
    background-color: #fd2840;
    height: 0.53rem;
    line-height: 0.53rem;
    font-size: .17rem;
    color: #fff;
    width: 29%;
    font-family: PingFangSC-Regular,sans-serif;
  }
  .cart{
    text-align: center;
    background-color: #313235;
    height: 0.53rem;
    line-height: 0.53rem;
    font-size: .17rem;
    color: #fff;
    width: 29%;
    font-family: PingFangSC-Regular,sans-serif;
  }
}
.scroll-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.12rem;
    position: fixed;
    bottom: 0.64rem;
    right: 0.15rem;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    border: 1px solid #f3f3f3;
    background: white;
    text-align: center;
    box-sizing: border-box;
    color: #fd273f;
    box-shadow: 0 0.06rem 0.2rem -0.05rem rgba(57, 106, 188, 0.3);
    i {
      font-size: 0.18rem;
      line-height: 0.11rem;
    }
    span {
      font-size: 0.14rem;
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>