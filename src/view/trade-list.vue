<template>
    <div>
        <div
            v-if="loading"
            class="loading_new_wrap">
            <div :class="['liu']" />
        </div>
        <van-tabs
            v-model="active"
            sticky>
            <van-tab
                v-for="(item,index) in tab"
                :key="index"
                :title="item.title"
                :name="item.name" />
        </van-tabs>
        <div v-if="list.length > 0">
            <van-card
                v-for="(item,index) in list"
                :key="index"
                :tag="item.trade.tradeState != 1 ? '订单已关闭' : ''"
                :price="item.trade.payment/100"
                :desc="item.trade.orders[0].itemTitle"
                :title="item.trade.orders[0].itemSkuName"
                :thumb="item.trade.orders[0].itemIcon">
                <template #footer>
                    <van-button
                        v-if="item.trade.tradeState == 1"
                        size="small"
                        @click="cancel(item.trade.tradeId)">
                        取消订单
                    </van-button>
                    <van-button size="small">
                        前往APP
                    </van-button>
                </template>
            </van-card>
        </div>
        <div
            v-else
            class="noData">
            <img src="../assets/images/trade-list-nodata.png">
            <p>啊哦，您还没有相关的订单～</p>
        </div>
        <div class="recommend">
            <span class="short-line left" />
            <img
                src="https://staticimg.ngmm365.com/04c1b2f4406f001b9447341450cc8bb3-w60_h60.png"
                class="title-icon">
            <span class="title-text">为你推荐</span>
            <span class="short-line right" />
        </div>
        <recommend type="trade-list" />
    </div>
</template>

<script>
import { Toast } from 'vant';
import AccountLogic from '@/logic/account'
import { post } from '@/http-handle/http2.js'
import recommend from '../components/recommend'
export default {
    components: {
        recommend
    },
    data() {
        return {
            active: 0,
            tab: [
                {
                    title:"全部",
                    name: '0'
                },
                {
                    title:"待收货",
                    name: '1'
                },
                {
                    title:"待发货",
                    name: '2'
                },
                {
                    title:"待收货",
                    name: '3'
                },
                {
                    title:"交易成功",
                    name: '4'
                }
            ],
            list: [],
            loading: true
        }
    },
    computed: {
        userId() {
            return AccountLogic.getUserId()
        }
    },
    created() {
        this.active = this.$route.params.id
        this.initData()
    },
    methods: {
        initData() {
            this.loading = true
            let postData = {
                pageNo:1,
                pageSize: 10,
                tradeStatus: null,
                userId: this.userId,
                queryRatable: ''
            }
            post('/trade/queryMyTradeList',postData).then(({data,code,desc}) => {
                if(code*1 != 10000) {
                    Toast(desc || '网络连接失败')
                }else {
                    this.list = data
                }
                this.loading = false
            })
        },
        cancel(id) {
            this.$dialog.alert({
                title: '提示',
                message: '是否取消订单？',
            }).then(() => {
                let postData = {
                    tradeId: id,
                    userId: this.userId
                }
                post('/trade/cancelTrade',postData).then(({data,desc,code}) => {
                    if(code*1 != 10000) {
                        Toast(desc || '网络连接失败！')
                    } else {
                        Toast('订单取消成功！')
                        this.initData()
                    }
                })
            });

        }
    }
}
</script>

<style lang="less" scoped>
.noData {
      padding-top: 0.6rem;
      margin-bottom: 0.5rem;
      text-align: center;
      font-family: 'PingFangSC-Light';
      color: #999999;
      img {
        width: 2.56rem;
      }
      p {
        margin-top: 0.15rem;
        font-size: 0.14rem;
      }
}
.recommend {
    text-align: center;
    font-size: 0.14rem;
    margin: 0.1rem 0;
    .short-line {
      display: inline-block;
      width: 0.24rem;
      height: 1px;
      background: linear-gradient(270deg, #f3f5f7 0%, #cccccc 100%);
      position: relative;
      top: -0.05rem;
      margin: 0 0.08rem;
    }
    .left {
      background: linear-gradient(270deg, #cccccc 0%, #f3f5f7 100%);
    }
    .title-text {
      display: inline-block;
      color: #222;
      font-size: 0.14rem;
      font-family: PingFangSC-Medium, PingFangSC;
      font-weight: 500;
      color: #222222;
    }
    .title-icon {
      width: 0.20rem;
      height: 0.20rem;
      position: relative;
      top: 0.05rem;
    }
}
</style>