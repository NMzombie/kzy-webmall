<template>
    <div>
        <transition name="fade">
            <div
                v-show="showSku"
                class="shadow"
                @click="hideSku" />
        </transition>
        <div
            class="container"
            :class="showSku?'show-popup':''">
            <div class="panel-header m10 flex">
                <img
                    :src="(p.pictures && !choosedImg) ? p.pictures[0] : choosedImg"
                    class="pro-img-sm">
                <div class="sku-info">
                    <div class="sku-price">
                        ￥{{ (getPrice()/100).toFixed(2) }}
                    </div>
                    <div class="sku-choose">
                        已选择：<span
                            v-for="(item,i) in skuChoosed"
                            :key="i">{{ item }} </span>
                    </div>
                </div>
                <div
                    class="close"
                    @click="hideSku">
                    <i class="icon iconfont icon-guanbi" />
                </div>
            </div>
            <div
                v-for="(item,index) in skuList"
                :key="index"
                class="sku-container p10">
                <p class="sku-title p10">
                    {{ item.propName }}
                </p>
                <div class="sku-list flex">
                    <div
                        v-for="(sku,i) in item.optionNames"
                        :key="i"
                        :class="sku == skuChoosed[index] ? 'sku-choosed' : 'sku-unchoose'"
                        @click="skuChoose(sku,index)">
                        {{ sku }}
                    </div>
                </div>
            </div>
            <div class="buy-count">
                <div>购买数量</div>
                <numberCount
                    :value="num"
                    :max="p.stock"
                    @eventSkuNum="eventSkuNum" />
            </div>
            <!-- <div
                class="buy-button"
                @click="onSubmit">
                确定
            </div> -->
            <div class="two-button">
                <button
                    class="go-cart"
                    @click="addCart">
                    加入购物车
                </button>
                <button
                    class="go-buy"
                    @click="onBuy">
                    立即购买
                </button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import {
    mapActions
} from 'vuex'
import numberCount from './numberCount'
import system from '@/tools/system'
import { post } from '@/http-handle/http2.js'
export default {
    components: {
        numberCount
    },
    props:['p','showSku','num'],
    data() {
        return {
            skuChoosed:[],
            skuNumC: '',
            choosedSku: ''
        }
    },
    computed: {
        skuList () {
            let p = this.p
            let p_spec_list = []
            if (p.existSku) {
                if (this.goodsType == 'award') {
                    p_spec_list = p.awardPropVos
                } else {
                    p_spec_list = p.goodsPropVos
                }

                for (let i = 0; i < p_spec_list.length; i++) {
                    p_spec_list[i].belong = p_spec_list[i].propName
                }
            } else {
                p_spec_list = []
            }
            return p_spec_list
        },
        choosedImg() {
            let choosedImg = ''
            const skus = this.p.skus
            if(skus){
                skus.forEach((sku,index) => {
                    if (sku.optionCode == this.skuChoosed.join(',')) choosedImg = sku.skuImg
                })
            }
            return choosedImg
        },
        skuId () {
            let skuId = ''
            this.p.skus.forEach(sku => {
                if (sku.optionCode == this.choosedSku) skuId = sku.id
            })
            return skuId
        },
        channelCode () {
            return system.channelCode()
        },
        isCheckAllSku () {
            if (this.skuChoosed.length < this.skuList.length)
            {
                return false
            }else {
                return true
            }
        }
    },
    watch: {
        skuList:function(val) {
            if(val.length == 1) this.skuChoosed[0] = val[0].optionNames[0]
        }
    },
    created() {

    },
    methods: {
        ...mapActions(['actionPopupUIMessageShow']),
        hideSku() {
            clearTimeout(this.T)
            this.$emit('closeSkuPop',this.skuChoosed)
        },
        skuChoose(sku,i) {
            this.$set(this.skuChoosed,i,sku)
            this.choosedSku = this.skuChoosed.join(',')
            // this.skuChoosed[i] = sku
        },
        eventSkuNum (num) {
            this.skuNumC = num[0]
            this.$emit('eventSkuNum', num[0])
        },
        onSubmit () {
            this.$emit('closeSkuPop')
        },
        // 检查库存是否足够
        checkStockAvaible () {
            if (this.p.stock < this.num )
            {
                return false
            } else {
                return true
            }
        },
        addCart () {
            let _this = this
            if (!this.checkStockAvaible()) {
                this.actionPopupUIMessageShow('库存不足')
                return
            }
            if (!this.isCheckAllSku) {
                this.actionPopupUIMessageShow('请继续选择商品规格')
                return
            }

            let goodsId = this.p.id
            let itemNum = parseInt(this.num)
            let skuId = this.skuId
            let goodsNameSnapshot = this.p.name
            let itemPriceSnapshot = this.getPrice()
            let appPriceSnapshot = this.getPrice()
            let pictureUrlSnapshot = this.p.pictures[0]
            let optionsSnapshot = this.skuChoosed.join('、')
            let activityType = this.p.activityId ? 2 : 1 // 活动类型id, 1-无活动、2-限时折扣, 默认为1
            let activityId = this.p.activityId && this.p.v != 2 ? this.p.activityId : 0
            let source = (this.p.goodsMallVO && this.p.goodsMallVO.id) || 1 // 商品来源
            let jumpUrl = window.location.pathname // 商品跳转链接
            let cartItemType = 0 // 0:商品,1:奖品
            let exchangePointSnapshot = 0
            let channelCode = this.channelCode

            let data = {
                goodsId,
                skuId,
                goodsNameSnapshot,
                optionsSnapshot,
                itemPriceSnapshot,
                appPriceSnapshot,
                pictureUrlSnapshot,
                itemNum,
                activityType,
                activityId,
                source,
                jumpUrl,
                cartItemType,
                exchangePointSnapshot,
                channelCode
            }
            post('/cart/add', data).then(obj => {
                if (obj.code == 10000) {
                    _this.actionPopupUIMessageShow('加入购物车成功!')

                    // _this.actionAjaxCartNumber()

                    this.T = setTimeout(() => {
                        _this.hideSku()
                    }, 200)


                    _this.save(obj.data)
                } else {
                    _this.actionPopupUIMessageShow(obj.desc)
                }
            })
        },
        getPrice (){
            let price = ''
            let existSku = this.p.existSku
            if(existSku && this.skuId) {
                this.p.skus.forEach(sku => {
                    if (sku.id == this.skuId) price = sku.price
                })
            } else {
                price = this.p.sellPrice
            }
            return price
        },
        save (ids) {
            ids = Object.prototype.toString.call(ids) === '[object Array]' ? ids : [ids]
            let cache = JSON.parse(localStorage.getItem('stash_cart')) || []
            if (cache.length > 0) {
                ids.forEach((id, i) => {
                    if (!cache.includes(id)) {
                        cache.push(id)
                    }
                })
            } else {
                ids.forEach((id, i) => {
                    cache.push(id)
                })
            }
            localStorage.setItem('stash_cart', JSON.stringify(cache))
        },
        onBuy() {
            let goodsIds = [this.p.id]
            let num = [this.num]
            let goodsSku = [this.skuId]
            this.$router.push({
                path:'/pay-check',
                query: {
                    addressId: "",
                    goodsIds,
                    goodsSku,
                    num
                }
            })
        }
    }

}
</script>
<style lang="less" scoped>
@import '../assets/css/layout.less';
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
.container {
    background: #fff;
    text-align: left;
    box-sizing: border-box;
    border-top-left-radius: 0.1rem;
    border-top-right-radius: 0.1rem;
    position: fixed;
    left: 0;
    bottom: -100vh;
    transition: bottom .3s ease-out;
    width: 100%;
    z-index: 600;
}
.show-popup{
    bottom: 0;
}
.panel-header {
  border-bottom:1px solid #F3F3F3;
  padding-bottom: 0.1rem;
  .pro-img-sm {
    box-sizing: border-box;
    width: 1.15rem;
    height: 1.15rem;
    border-radius: 9px;
  }
  .sku-info {
    flex:1;
    padding-left: 0.15rem;
    .sku-price {
      font-size: 0.17rem!important;
      font-family: "PingFangSC-Medium";
      color: #FF2266;
      line-height: 0.24rem;
    }
    .sku-choose {
      margin-top: .07rem;
      font-family: "PingFangSC-Light";
      font-size: 13px;
      color: #666666;
      font-size: 12px !important;
    }
  }
  .close {
    text-align: right;
  }
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
.sku-container {
  border-bottom: 1px solid #f3f3f3;
    .sku-title {
        font-family: PingFangSC-Regular;
        color: #666;
        font-size: .14rem!important;
    }
      .sku-choosed {
        font-family: PingFangSC-Regular;
      display: inline-block;
      border-radius: .05rem;
      margin-right: .12rem;
      padding: .1rem .15rem;
      text-align: center;
      vertical-align: middle;
      box-sizing: border-box;
      white-space: nowrap;
      border-radius: .15rem;
      margin-bottom: .1rem;
      font-size: 12px!important;
      color: white;
      background: #ff7171
      }
      .sku-unchoose {
        font-family: PingFangSC-Regular;
      display: inline-block;
      border-radius: .05rem;
      margin-right: .12rem;
      padding: .1rem .15rem;
      text-align: center;
      vertical-align: middle;
      box-sizing: border-box;
      white-space: nowrap;
      border-radius: .15rem;
      margin-bottom: .1rem;
      font-size: 12px!important;
        color: #222;
        background: #f7f7f7;
      }
}
.buy-count {
    margin: 0.15rem auto;
    padding:0 .2rem;
    display: flex;
    justify-content: space-between;
}
.buy-button {
  height: 0.5rem;
  background: #FF2266;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.18rem
}
.two-button {
  padding: 0.08rem 0.16rem;
  display: flex;
  button {
    height: 0.4rem;
    font-size: 0.14rem;
    line-height: 0.34rem;
    border: none;
    border-radius: 0;
    width: 100%;
    color: white
  }
  .go-cart {
    border-top-left-radius: 0.2rem;
    border-bottom-left-radius: 0.2rem;
    background: linear-gradient(to right, #ffd01e, #ff8917);
  }
  .go-buy {
    background: linear-gradient(to right, #ff6034, #ee0a24);
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
  }
}
</style>