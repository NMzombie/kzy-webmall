<template>
    <div>
        <div
            v-if="loading"
            class="loading_new_wrap">
            <div :class="['liu']" />
        </div>
        <div class="banner">
            <img
                v-lazy="goodsData.frontCover"
                alt="banner">
        </div>
        <div class="title-info">
            <div class="title-info-top">
                <h2>{{ goodsData.name }}</h2>
                <p>{{ goodsData.subtitle }}</p>
                <span style="min-height: 0.24rem;"> {{ goodsData.subscribersStr }}</span>
            </div>
        </div>
        <van-tabs style="margin-top:0.12rem">
            <van-tab title="介绍">
                <div v-html="richContent" />
            </van-tab>
        </van-tabs>
        <van-goods-action>
            <van-goods-action-icon
                icon="home-o"
                text="首页"
                @click="$router.push('/')" />
            <van-goods-action-icon
                icon="cart-o"
                text="购物车"
                @click="$router.push('/cart')" />
            <van-goods-action-button
                type="danger"
                text="去APP学习" />
        </van-goods-action>
    </div>
</template>

<script>
import { Toast } from 'vant';
import AccountLogic from '@/logic/account'
import { post } from '@/http-handle/http2.js'
import richContent from '../logic/richContent'
export default {
    mixins:[richContent],
    data() {
        return {
            goodsData: {},
            loading: true
        }
    },
    computed: {
        userId () {
            return AccountLogic.getUserId()
        },
        goodsId () {
            return this.$route.params.id
        }
    },
    created() {
        this.initData()
    },
    methods: {
        initData() {
            this.loading = true
            let postData = {
                userId:this.userId,
                goodsId:this.goodsId,
                activityFlag: 'N',
                sourceFrom: 'H5'
            }
            post('/knowledge/commodity/getCommodityById',postData).then(({data,desc,code}) => {
                if(code*1 !== 10000) {
                    Toast(desc||'网络请求失败')
                    return
                } else {
                    this.goodsData = data
                    this.loadRichContent(this.goodsData.goodsDetailId)
                }
                this.loading = false
            })
        }
    }
}
</script>
<style>
.van-tab__pane {
    text-align: center;
    padding-top: 0.4rem;
}
</style>
<style lang="less" scoped>
.banner {
    height: 2.11rem;
    img {
        width: 100%;
        height: 2.11rem;
    }
}
.title-info {
    padding: .13rem .12rem .1rem .12rem;
    background: #fff;
  .title-info-top {
    position: relative;
    h2 {
      font-family: PingFangSC-Medium;
      font-size: .22rem;
      color: #222;
      line-height: .35rem;
      word-break: break-all;
    }
    p {
      font-size: .14rem;
      color: #666;
      line-height: .24rem;
      margin-top: .05rem;
      word-break: break-all;
    }
    span {
      display: block;
      margin-top: .085rem;
      font-size: .14rem;
      color: #f26;
      line-height: .24rem;
    }
  }
}
</style>