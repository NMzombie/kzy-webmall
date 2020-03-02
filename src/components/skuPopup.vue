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
                    src="https://staticimg.ngmm365.com/6d359a57a61fb27113c93c164c2b49f1-w1612_h1604.jpg?x-oss-process=image/resize,w_160/format,jpg/interlace,1/quality,Q_60/sharpen,90"
                    class="pro-img-sm">
                <div class="sku-info">
                    <div class="sku-price">
                        ￥111
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
            <div
                class="buy-button"
                @click="onSubmit">
                确定
            </div>
        </div>
    </div>
</template>

<script>
import numberCount from './numberCount'
export default {
    components: {
        numberCount
    },
    props:['p','showSku','num'],
    data() {
        return {
            skuChoosed:[],
            skuNumC: ''
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
        }
    },
    methods: {
        hideSku() {
            this.$emit('closeSkuPop')
        },
        skuChoose(sku,i) {
            this.$set(this.skuChoosed,i,sku)
            // this.skuChoosed[i] = sku
            console.log(this.skuChoosed[i] == sku)
        },
        eventSkuNum (num) {
            this.skuNumC = num
            this.$emit('eventSkuNum', num)
        },
        onSubmit() {
            this.$emit('closeSkuPop')
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
    z-index: 101;
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
</style>