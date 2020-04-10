<template>
    <div class="main-container">
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
        <section class="store">
            <div
                v-for="(item,index) in goodsList.cartItemList"
                :key="index"
                class="item-div">
                <dd
                    class="box"
                    @click="goDetail(item.goodsId)">
                    <div
                        class="check-wrap wd-box"
                        @click.stop.prevent="triggerItem(item)">
                        <check
                            class="check-store"
                            :checked="item.t_check" />
                    </div>
                    <div class="img-wrap">
                        <img :src="item.pictureUrl">
                    </div>
                    <div class="info-wrap">
                        <h3>{{ item.goodsName }}</h3>
                        <h4>{{ item.options }}</h4>
                        <p><span>￥{{ (item.sellPrice/100).toFixed(2) }}</span></p>
                        <numberCount
                            :value="item.itemNum"
                            class="btn-group"
                            @eventSkuNum="eventSkuNum($event, item)" />
                        <i
                            class="btn-close icon iconfont icon-guanbi"
                            @click.stop="doDel(item)" />
                    </div>
                </dd>
            </div>
        </section>
        <van-submit-bar
            :price="sumPrice || 0"
            button-text="提交订单"
            @submit="onSubmit">
            <van-checkbox
                v-model="checkedAll"
                @click="checkAll">
                全选
            </van-checkbox>
        </van-submit-bar>
        <tabbar />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import tabbar from '../components/tabbar'
import check from '../components/basic/check'
import numberCount from '../components/numberCount'
import AccountLogic from '@/logic/account'
import { post } from '@/http-handle/http2.js'
export default {
    components: {
        tabbar,
        check,
        numberCount
    },
    data(){
        return{
            checkedAll: false,
            goodsList: {},
            checkIds: []
        }
    },
    computed: {
        userId () {
            return AccountLogic.getUserId()
        },
        sumPrice () {
            let sumPrice = 0
            if(this.goodsList.cartItemList){
                this.goodsList.cartItemList.forEach((item,index) => {
                    this.checkIds.forEach((id,i) => {
                        if (item.id == id) sumPrice += item.sellPrice*item.itemNum
                    })
                })
            }
            return sumPrice
        }
    },
    created() {
        this.loadData()
    },
    methods: {
        ...mapActions(['actionPopupUIMessageShow']),
        loadData() {
            post('/shoppingcart/query', {
                vipVersion: false,
                userId: this.userId
            }).then(({ code, data = {}, desc }) => {
                if (code * 1 !== 10000) {
                    this.actionPopupUIMessageShow(desc)
                    return
                }else {
                    let isAllChecked = true
                    this.goodsList = data.shops[0].campaignList[0]
                    let itemList = this.goodsList.cartItemList
                    itemList.forEach((item, index) => {
                        item.t_check = false
                        item.t_check = this.setDefaultCheck(item)
                        if(item.t_check) this.checkIds.push(item.id)
                        if(!item.t_check) isAllChecked = false
                    })
                    this.checkedAll = isAllChecked
                }
            })
        },
        onSubmit() {

        },
        goDetail(goodsId) {
            this.$router.push({
                path: '/goods/'+goodsId
            })
        },
        triggerItem (item) {
            // let shops = this.shops
            item.t_check = !item.t_check
            this.stash(item.id, item.t_check ? 1 : 2)
            // 修改店铺
            if (item.t_check) {
                this.checkIds.push(item.id)
                // this.checkShop(shop)
            } else {
                // shop.t_check = false
                this.checkIds.forEach((checkId, k) => {
                    if (checkId == item.id) {
                        this.checkIds.splice(k, 1)
                    }
                })
            }
            // 修改全选
            // this.checkAll(shops)
            // this.calculateByCampaign(this.goodsList, shop, n)
        },
        stash (ids, type) {
            // type=1 add type=2 remove
            ids = Object.prototype.toString.call(ids) === '[object Array]' ? ids : [ids]
            let cache = []
            try {
                cache = JSON.parse(localStorage.getItem('stash_cart')) || []
            } catch (e) {}
            if (type == 1) {
                if (cache.length > 0) {
                    ids.forEach((id, i) => {
                        if (cache.indexOf(id) == -1) {
                            cache.push(id)
                        }
                    })
                } else {
                    ids.forEach((id, i) => {
                        cache.push(id)
                    })
                }
            } else {
                if (cache.length > 0) {
                    ids.forEach((id, i) => {
                        if (cache.indexOf(id) > -1) {
                            cache.splice(cache.indexOf(id), 1)
                        }
                    })
                }
            }
            localStorage.setItem('stash_cart', JSON.stringify(cache))
        },
        setDefaultCheck (item) {
            let stash_cart_str = localStorage.getItem('stash_cart') || ''
            let cache = []
            if (stash_cart_str) {
                try {
                    cache = JSON.parse(stash_cart_str) || []
                } catch (e) {}
            }
            return cache.includes(item.id)
        //     if (Array.prototype.includes) {
        //         return (
        //             Array.prototype.includes.call(cache, item.id) &&
        //   this.showItemCheck(item)
        //         )
        //     } else {
        //         return (
        //             Array.prototype.indexOf.call(cache, item.id) > -1 &&
        //   this.showItemCheck(item)
        //         )
        //     }
        },
        doDel (item) {
            let self = this
            let list = this.goodsList.cartItemList
            this.$dialog.confirm({
                title: '提示',
                message: '确认要删除该商品吗？'
            }).then(() => {
                post('/cart/remove',{cartItemId: item.id}).then(obj => {
                    if (obj.code == 10000) {
                    // self.actionUpdateCartNumber(self.getCartNumber - 1)
                        for (let i = 0; i < list.length; ++i) {
                            if (list[i].id == item.id) {
                                list.splice(i--, 1)
                                break
                            }
                        }
                        self.actionPopupUIMessageShow('删除成功')
                    } else {
                        self.actionPopupUIMessageShow(obj.desc)
                    }
                })
            }).catch(() => {
            });
        },
        checkAll () {
            let { goodsList:{ cartItemList:list }, checkedAll} = this
            checkedAll = !checkedAll
            list.forEach((item, index) => {
                if (!checkedAll) {
                    this.stash(item.id, 2)
                    item.t_check = false
                }else {
                    this.stash(item.id, 1)
                    item.t_check = true
                }
            })
            this.checkIds = JSON.parse(localStorage.getItem('stash_cart')) || []
        },
        eventSkuNum (number, item) {
            item.itemNum = number[0]
            post('/cart/edit',{
                cartItemId: item.id,
                itemNum: item.itemNum,
                goodsId: item.goodsId,
                skuId: item.skuId
            }).then(({desc, code}) => {
                if(code*1 != 10000 ) this.actionPopupUIMessageShow(desc)
            })
            if (number[1]) {

            } else {

            }
        }
    }
}
</script>

<style lang="less" scoped>
.van-submit-bar {
    bottom: 0.457rem;
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
.store{
    margin-top: .1rem;
    background: #fff;
    margin-bottom: 1.07rem;
    .item-div{
        overflow: hidden;
        width: 100%;
        dd {
            padding: .09rem 0;
            position: relative;
            transition: all .03s;
            .check-wrap {
                line-height: .96rem;
                height: .96rem;
                width: .45rem;
                -ms-flex: 0 0 .45rem;
                flex: 0 0 .45rem;
                .check-store{
                    font-size: .22rem;
                }
            }
            .img-wrap {
                height: 0.96rem;
                width: 0.96rem;
                flex: 0 0 0.96rem;
                position: relative;
                overflow: hidden;
                border-radius: 0 0 0.02rem 0.02rem;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .info-wrap {
                height: .96rem;
                -ms-flex: auto;
                flex: auto;
                min-width: 0;
                padding-left: .12rem;
                box-sizing: border-box;
                float: left;
                position: relative;
                h3 {
                    max-height: 0.4rem;
                    line-height: 0.2rem;
                    font-size: 0.14rem;
                    color: #222;
                    display: -webkit-box;
                    /* ! autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    padding-right: 0.37rem;
                }
                h4 {
                    line-height: 0.18rem;
                    font-size: 0.12rem;
                    color: #999;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    padding-right: 0.37rem;
                }
                 p {
                    position: absolute;
                    left: .12rem;
                    bottom: 0;
                    span {
                        color: #f26;
                        font-size: .16rem;
                        display: inline-block;
                        height: .2rem;
                        }
                 }
                 .btn-group {
                    font-size: 0;
                    position: absolute;
                    right: .12rem;
                    bottom: 0;
                 }
                 .btn-close {
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding-right: .12rem;
                    line-height: .2rem;
                    width: .35rem;
                    height: .4rem;
                    text-align: right;

                    }
                }
            }
        }
    }
</style>