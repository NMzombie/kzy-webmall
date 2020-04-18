<template>
    <div>
        <section class="header">
            <div class="header-name">
                <router-link
                    class="avatar"
                    to="/userinfo">
                    <img
                        v-if="userInfo.head"
                        v-lazy="userInfo.head">
                    <img
                        v-else
                        src="../assets/images/avatar.png">
                </router-link>
                <div>
                    <h1>{{ userInfo.nickname }}</h1>
                    <h2>ID：{{ userInfo.userId }}</h2>
                </div>
            </div>
            <div class="black-bottom">
                <img src="../assets/images/black-line.png">
            </div>
        </section>
        <section class="tabbar">
            <div
                class="tabbar-top"
                @click="$router.push('/trade-list/0')">
                <h1>我的订单</h1>
                <span>查看全部
                    <van-icon name="arrow" />
                </span>
            </div>
            <div
                class="tabbar-menu">
                <div
                    class="menu-item"
                    @click="$router.push('/trade-list/1')">
                    <van-icon
                        name="pending-payment" />
                    <p>待付款</p>
                </div>
                <div
                    class="menu-item"
                    @click="$router.push('/trade-list/2')">
                    <van-icon
                        name="send-gift-o" />
                    <p>待发货</p>
                </div>
                <div
                    class="menu-item"
                    @click="$router.push('/trade-list/3')">
                    <van-icon
                        name="logistics" />
                    <p>待收货</p>
                </div>
                <div
                    class="menu-item"
                    @click="$router.push('/trade-list/4')">
                    <van-icon
                        name="paid" />
                    <p>交易成功</p>
                </div>
            </div>
        </section>
        <section class="menu-list">
            <div class="menu-item border-right-bottom">
                <van-icon
                    color="rgb(255, 34, 102)"
                    name="like-o" />
                <p>我的收藏</p>
            </div>
            <div class="menu-item border-right-bottom">
                <van-icon
                    color="rgb(255, 124, 35)"
                    name="coupon-o" />
                <p>我的优惠券</p>
            </div>
            <router-link
                to="/address-list"
                class="menu-item border-bottom">
                <van-icon
                    color="rgb(74, 144, 226)"
                    name="location-o" />
                <p>地址管理</p>
            </router-link>
            <router-link
                to="/name-confirm"
                class="menu-item border-right">
                <van-icon
                    color="#0bb"
                    name="friends-o" />
                <p>实名认证</p>
            </router-link>
            <div class="menu-item border-right">
                <van-icon
                    color="rgb(74, 144, 226)"
                    name="service-o" />
                <p>帮助与客服</p>
            </div>
            <div class="menu-item">
                <van-icon
                    color="rgb(0, 187, 187)"
                    name="comment-o" />
                <p>意见反馈</p>
            </div>
        </section>
        <van-button
            round
            class="noLogin"
            color="#dd182e"
            @click="goLogin">
            退出登录
        </van-button>
        <tabbar />
    </div>
</template>

<script>
import tabbar from '../components/tabbar'
import { mapActions } from 'vuex'
import AccountLogic from '@/logic/account'
import { post } from '@/http-handle/http2.js'
export default {
    components: {
        tabbar
    },
    data(){
        return{
            userInfo: ''
        }
    },
    computed: {
        userId() {
            return AccountLogic.getUserId()
        }
    },
    created(){
        this.initData()
    },
    methods: {
        ...mapActions(['actionPopupUIMessageShow']),
        goLogin(){
            this.$router.push({
                path:'/login'
            })
        },
        initData() {
            let terminal = AccountLogic.getTerminal()
            let userId = this.userId
            post('/account/userInfo',{userId,terminal}).then(({data,desc,code}) => {
                if (code * 1 !== 10000) {
                    this.actionPopupUIMessageShow(desc)
                    return
                } else {
                    this.userInfo = data
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.header{
    overflow: hidden;
    box-sizing: border-box;
    background:url('../assets/images/ucenter-background.png') no-repeat;
    background-size: 100%;
    height: 1.43rem;
    position: relative;
    .header-name {
        height: 1.03rem;
        margin-left: .25rem;
        margin-right: .2rem;
        color: #fff;
        display: flex;
        align-items: center;
        .avatar {
            width: 0.6rem;
            height: 0.6rem;
            margin-right: 0.15rem;
            background: white;
            border-radius: 50%;
            img {
                display: block;
                width: 0.6rem;
                border-radius: 50%;
            }
        }
        h1 {
            font-size: 0.22rem;
            color: white;
            }
        h2 {
            font-size: 0.14rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,0.65);
            line-height: 0.19rem;
        }
    }
    .black-bottom {
        position: absolute;
        bottom: 0;
        text-align: center;
        img{
            display: block;
        }
    }
}
.tabbar {
    background: white;
    padding: 0.2rem 0.12rem 0 0.12rem;
    .tabbar-top {
        height: 0.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        h1 {
            font-size: 0.16rem;
            font-family:PingFangSC-Medium,PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height: 0.23rem;
        }
        span {
            font-size: 0.12rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(155,155,155,1);
            line-height: 0.17rem;
            align-items: center;
            display: flex;
        }
    }
    .tabbar-menu {
        height: 0.9rem;
        display: flex;
        padding: 0 0.11rem;
        justify-content: space-between;
        align-items: center;
        .menu-item {
            text-align: center;
            i {
                font-size: 0.3rem;
                }
            p {
                font-size:  0.12rem;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(51,51,51,1);
                line-height: 0.2rem;
            }
        }
    }
}
.menu-list {
    margin-top: 0.1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    background: white;
    .menu-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1.07rem;
        width: 33%;
        flex-direction: column;
        i {
            font-size: 0.25rem;
        }
        p {
            font-size: 0.12rem;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height: 0.17rem;
            margin-top: 0.09rem;
        }
    }
}
.border-right {
    border-right: 1px solid rgba(235,235,235,0.8);
}
.border-right-bottom {
    border-right: 1px solid rgba(235,235,235,0.8);
    border-bottom: 1px solid rgba(235,235,235,0.8);
}
.border-bottom {
    border-bottom: 1px solid rgba(235,235,235,0.8);
}
.noLogin {
    width: 2rem;
    margin: 0.3rem auto;
    display: block;
}
</style>