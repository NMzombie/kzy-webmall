<template>
    <div>
        <div
            v-if="loading"
            class="loading_new_wrap">
            <div :class="['liu']" />
        </div>
        <div class="safe-info">
            <div
                class="safe-info-fixed">
                <ul class="box">
                    <li><span><i class="iconfont icon-circle-check" />正品保障</span></li>
                    <li><span><i class="iconfont icon-circle-check" />假一赔十</span></li>
                    <li><span><i class="iconfont icon-circle-check" />权威检测</span></li>
                    <li><span><i class="iconfont icon-circle-check" />无忧退换</span></li>
                </ul>
            </div>
        </div>
        <div
            class="address-container"
            @click="goAddress">
            <van-icon name="location-o" />
            <div class="address-content">
                <div class="user-info">
                    <h1>{{ address.name }}</h1><span>{{ address.phone }}</span><small
                        v-if="address.isDefault"
                        class="default">默认</small>
                </div>
                <p>{{ address.address }}</p>
            </div>
            <van-icon name="arrow" />
            <div class="color-line" />
        </div>
        <section class="goods-list">
            <div
                v-for="(item, index) in goodsList"
                :key="index">
                <van-card
                    :num="item.xNum"
                    :price="(item.sellPrice/100).toFixed(2)"
                    :desc="item.skus[0].optionCode"
                    :title="item.name"
                    :thumb="item.pictures[0]"
                    @click="$router.push('/goods/'+item.id)" />
            </div>
        </section>
        <section class="trade-detail">
            <van-cell
                title="商品合计"
                :value="'￥ ' + sumPrice()/100" />
            <van-cell
                title="运费"
                value="￥ 0.00" />
            <van-coupon-cell
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                @click="showList = true" />
            <!-- 优惠券列表 -->
            <van-popup
                v-model="showList"
                round
                position="bottom"
                style="height: 90%; padding-top: 4px;">
                <van-coupon-list
                    :coupons="coupons"
                    :chosen-coupon="chosenCoupon"
                    :disabled-coupons="disabledCoupons" />
            </van-popup>
        </section>
        <div class="real-info-tip m10-t">
            提示：浏览器中登录请下载app支付
        </div>
        <div class="footer">
            <van-submit-bar
                :price="sumPrice()"
                button-text="提交订单"
                @submit="onSubmit" />
        </div>
    </div>
</template>

<script>
import { Toast } from 'vant';
import AccountLogic from '@/logic/account'
import { post } from '@/http-handle/http2.js'

const coupon = [{
    available: 1,
    condition: '无使用门槛\n最多优惠12元',
    reason: '',
    value: 50,
    name: '你好，我是一张优惠券',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '0.5',
    unitDesc: '元'
},{
    available: 1,
    condition: '有使用门槛\n最多优惠10元',
    reason: '',
    value: 250,
    name: '好巧，我也是一张优惠券',
    startAt: 1489104000,
    endAt: 1514592000,
    valueDesc: '2.5',
    unitDesc: '元'
}];
export default {
    data() {
        return {
            showList:false,
            chosenCoupon: -1,
            coupons: coupon,
            disabledCoupons: coupon,
            address: {},
            goodsList: [],
            loading: true
        }
    },
    computed: {
        userId () {
            return AccountLogic.getUserId()
        }
    },
    created() {
        console.log(typeof this.$route.query.goodsIds == 'string')
        this.initData()
        this.initAddress()
    },
    methods: {
        initData() {
            this.loading = true
            let goodsIds = this.$route.query.goodsIds
            let goodsSku = this.$route.query.goodsSku
            let goodsSkus = []
            if(typeof goodsIds == 'string' && typeof goodsSku == 'string'){
                goodsSkus = [{
                    goodsId: goodsIds,
                    skuId: goodsSku,
                    activityId: null
                }]
            }else {
                goodsIds.forEach((item,index) => {
                    goodsSkus.push({
                        goodsId: item,
                        skuId: goodsSku[index],
                        activityId: null
                    })
                })
            }
            let postData = {
                goodsSkus,
                userId:this.userId
            }
            let num = this.$route.query.num
            post('/goods/batchQuery', postData).then(({data,desc,code}) => {
                if(code*1 != 10000) {
                    Toast(desc||'网络请求失败')
                }else {
                    this.goodsList = data
                    this.goodsList.forEach((item, index) => {
                        item.xNum = num[index]
                    })
                    this.loading = false
                }
            })
        },
        goAddress() {
            this.$router.replace({
                path:'/address-list',
                query:{
                    from: 'pay-check',
                    redirect: this.$route.fullPath
                }
            })
        },
        onSubmit () {
            this.$dialog.alert({
                title: '提示',
                message: '请前往APP下单~',
            }).then(() => {
            });
        },
        sumPrice () {
            let price = 0
            this.goodsList.forEach((item, index) => {
                price += item.sellPrice*item.xNum
            })
            return price
        },
        initAddress () {
            let addressId = this.$route.query.addressId
            let postData = {
                addressId,
                userId: this.userId
            }
            post('/account/delivery_address/queryOne',postData).then(({desc,code,data}) => {
                if(code*1 != 10000) {
                    Toast(desc)
                } else {
                    this.address = data
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.van-card{
  background: white;
}
.safe-info {
    height: 0.3rem;
    line-height: 0.3rem;
    .safe-info-fixed {
    position: fixed;
    top: 0rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.22rem;
    background: white;
    z-index: 99;
    border-bottom: 1px solid #f3f3f3;
    ul {
        li {
        flex: auto;
        text-align: center;
        span {
            font-size: 0.12rem;
            i {
            margin-right: 0.05rem;
            line-height: 0.14rem;
            &:before {
                color: #ff2266;
                font-size: 0.14rem;
            }
            }
        }
        }
    }
    }
}
.address-container {
  position: relative;
  background: white;
  margin: 0.1rem;
  display: flex;
  justify-content: space-between;
  height: 0.85rem;
  border-top-right-radius: 0.07rem;
  border-top-left-radius: 0.07rem;
  box-shadow: 0 0.06rem 0.2rem -0.05rem rgba(57, 106, 188, 0.3);
    i {
      display: flex;
      align-items: center;
      width: 0.33rem;
      justify-content: center;
      font-size: 0.2rem;
    }
    .address-content {
      flex:1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .user-info {
          display: flex;
          margin-bottom: 0.03rem;
         h1 {
            font-size: 0.16rem;
         }
         span {
              margin-left: 0.14rem;
              font-size: 0.16rem;
         }
         .default {
            margin-left: 0.1rem;
            padding: 0.01rem 0.06rem;
            color: #ff6565;
            font-size: 0.1rem;
            border: 1px solid #ff6565;
            border-radius: 0.03rem;
            font-weight: 500;
         }
      }
      p {
        display: -webkit-box;
        height: 0.4rem;
        margin-top: 0.02rem;
        overflow: hidden;
        font-size: 0.14rem;
        line-height: 0.2rem;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
    }
    .color-line {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background-size: 80px;
    content: '';
    }
}
.goods-list {
  margin-top: 0.2rem;
}
.trade-detail {
  margin-top: 0.2rem;
  .van-cell {
    &:nth-child(1){
      .van-cell__value{
        color:red;
        font-size: 0.16rem;
      }
    }
    &:nth-child(2){
      .van-cell__value{
        color:black;
        font-size: 0.16rem;
      }
    }
  }
}
.real-info-tip {
    box-sizing: border-box;
    padding: 0.1rem 0.12rem;
    color: rgba(255, 34, 102, 0.7);
    font-size: 0.12rem;
    font-family: PingFangSC-Regular;
    line-height: 0.2rem;
    background-color: #feeff2;
}
.footer {
    height: 0.48rem;
    margin-top: 0.48rem;
}
</style>