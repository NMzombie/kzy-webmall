<template>
    <div class="height-100">
        <section class="bgStyle">
            <div class="content">
                <p class="gojump" />
                <p class="bigTitle">
                    手机快速登录
                </p>

                <div class="main">
                    <input
                        v-model.trim="init.telphone"
                        class="input small"
                        type="text"
                        placeholder="手机号"
                        maxlength="11">
                    <button
                        :disabled="disabled"
                        :class="ifCanGet?'getCodeC active':'getCodeC'"
                        @click="getCode">
                        {{ getCodeText }}
                    </button>
                    <input
                        v-model.trim="init.veCode"
                        class="input"
                        type="text"
                        placeholder="验证码"
                        maxlength="6">
                </div>
                <div class="">
                    <button
                        :class="ifCanTap? 'bindButton active':'bindButton'"
                        @click="bindSubmit">
                        确定
                    </button>
                </div>
            </div>
            <!-- 等待三秒 -->
            <div
                v-if="isWait"
                class="wx_dialog_container">
                <div class="wx-mask" />
                <div class="wx-dialog waiting">
                    <div>手机登录中... </div>
                    <!-- <div>约等待3秒，不要关闭哦~</div> -->
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { post } from "@/http-handle/http2.js";
import Cookie from 'js-cookie'
import AccountLogic from '@/logic/account'
export default {
    data(){
        return{
            init: {
                telphone: null,
                veCode: null,
            },
            tel_regexp: /^1\d{10}$/,
            isShow: false,
            isWait: false,
            userInfo: {},
            ifCanTap: false,
            ifCanGet: false,
            getCodeText: '获取验证码',
            disabled: false,
            countdown: 60,
            fromS: true,
        }
    },
    computed: {
        userId() {
            return Account.getUserId();
        },
        redirect() {
            return this.$route.query.redirect
        },
        changeData() {
            const { init: { telphone, veCode } } = this
            return {
                telphone,
                veCode,
            }
        }
    },
    watch: {
        changeData: {
            handler: function(newval, oldval) {
                let { init: { telphone, veCode }, tel_regexp } = this;
                telphone = newval.telphone;
                veCode = newval.veCode;
                if (telphone && tel_regexp.test(telphone)) {
                    this.ifCanGet = true;
                } else {
                    this.ifCanGet = false;
                }
                if (telphone && tel_regexp.test(telphone) && veCode != null && veCode.length == 6) {
                    this.ifCanTap = true;
                    console.log(this.ifCanTap)
                } else {
                    this.ifCanTap = false;
                }
            },
            deep: true
        }
    },
    created(){

    },
    methods: {
        ...mapActions(['actionPopupUIMessageShow']),
        getCode() {
            let { init: { telphone }, tel_regexp } = this;
            if (!telphone) {
                this.actionPopupUIMessageShow('手机号不能为空');
                return false
            }
            if (!tel_regexp.test(telphone)) {
                this.actionPopupUIMessageShow('请输入正确的手机号');
                return false
            }
            post('/account/smsCode', {
                "phone": telphone,
                "goal": "LOGIN",
            }).then((obj) => {
                let { code } = obj;
                if (code === 10000) {
                    let { data } = obj;
                    this.settime();
                    console.log(obj,data)
                } else {
                    this.actionPopupUIMessageShow(obj.desc || "网络原因请求失败");
                }
            })
        },
        // 倒计时
        settime() {
            let _this = this;
            if (this.countdown == 0) {
                this.disabled = false;
                this.getCodeText = "获取验证码";
                this.countdown = 60;
            } else {
                this.disabled = true;
                this.getCodeText = "重新发送(" + this.countdown + ")";
                this.countdown--;
                setTimeout(function() {
                    _this.settime()
                }, 1000)
            }
        },
        bindSubmit() {
            let { init: { telphone, veCode }, tel_regexp } = this;
            if (!telphone) {
                this.actionPopupUIMessageShow('手机号不能为空');
                return false
            }
            if (!tel_regexp.test(telphone)) {
                this.actionPopupUIMessageShow('请输入正确的手机号');
                return false
            }
            if (!veCode) {
                this.actionPopupUIMessageShow('验证码不能为空');
                return false
            }

            this.isWait = true;

            var terminal = AccountLogic.getTerminal() || AccountLogic.getUUID()

            post('/account/login', {
                "phone": telphone,
                "smsCode": veCode,
                'terminal': terminal,
            }, "").then((obj) => {
                this.isWait = false;

                let { code } = obj;
                if (code === 10000) {
                    let { data } = obj;
                    this.isShow = true;

                    //写信息
                    let { userId, accessToken } = obj.data;

                    Cookie.set("user_id", userId, { expires: 30 })
                    Cookie.set("access_token", accessToken, { expires: 30 })
                    Cookie.set('client_token', terminal, { expires: 30 });

                    Cookie.set('login_type', "h5_phone", { expires: 30 });
                    Cookie.set('platform', "browser", { expires: 30 });


                    localStorage.setItem('userId', userId)
                    localStorage.setItem('accessToken', accessToken)
                    localStorage.setItem('clientToken', terminal)

                    localStorage.setItem('login_type', "h5_phone")
                    localStorage.setItem('platform', "browser")

                    this.$router.push({ path: "/" })

                } else {
                    this.actionPopupUIMessageShow(obj.desc || "网络原因请求失败");
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 .1rem;

    .box-item-1 {
        width: 0.6rem;
        flex: 0 0 .6rem;
    }

    .box-item-2 {
        flex: 1 1 auto;
        text-align: left;
    }
}

.session-wrap {
    box-sizing: border-box;

    .session-title {
        width: 0.8rem;
        flex: 0 0 .8rem;
    }

    .session {
        flex: 1 1 auto;

        .filed {
            padding-bottom: .05rem;
            border-bottom: 1px dashed #ddd;
            color: #999;

            .field-title {
                color: #333;
            }
        }
    }
}

.item {
    box-sizing: border-box;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    height: .8rem;
    border-bottom: 1px solid #f0f0f0;
    box-sizing: border-box;
    background-color: #fff;
}

.header-gap {
    height: .8rem;
}

.avatar {
    width: .6rem !important;
    height: .6rem !important;
    border-radius: 100%;
}

.order-status-box {
    justify-content: space-around;
}

.coupons-number {
    text-align: right;
}

.banner {
    position: absolute;
    width: 100%;
    bottom: 2px;
    left: 0;
    height: 0.38rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    padding: 0.10rem;
    line-height: 1.5;
}

.btn {
    display: inline-block;
    box-sizing: border-box;
    background-color: #F15A0C;
    color: #fff;
    border-radius: .05rem;
    padding: .05rem .1rem;
}

.btn-disable {
    background-color: #999;
}

.search-wrap {
    position: fixed;
    width: 100%;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    height: .5rem;
    background-color: #eee;
    padding: .1rem;

    input {
        outline: none;
    }
}

.search-wrap-gap {
    height: .5rem;
}

.btn-light {
    border: 1px solid #F15A0C;
    background-color: #F15A0C;
    color: #fff;
}

.c-12 {
    color: #121212;
}

.c-99-l {
    color: #999999;
    font-family: PingFangSC-Light;
}

.c-6d {
    color: #6d6d6d;
}

.c-22 {
    color: #222222;
    font-family: PingFangSC-Regular;
}

.c-22-l {
    color: #222222;
    font-family: PingFangSC-Light;
}

.c-66-l {
    color: #666666;
    font-family: PingFangSC-Light;
}

.mb-7 {
    margin-bottom: 7px;
}

.input-1 {
    width: .7rem;
}

.input-2 {
    width: 1.6rem;
}

// =========

.bgStyle {
    background: #ffffff;
    height: 100%;
    height: 100vh;
}

.content {
    margin: 0rem 0.375rem 0.065rem 0.375rem;
}

.main {
    position: relative;
}

.gojump {
    display: block;
    height: 0.44rem;
    line-height: 0.44rem;
    font-size: 0.16rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    text-align: right;
}

.bigTitle {
    display: block;
    height: 0.31rem;
    line-height: 0.31rem;
    font-size: 0.22rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(34, 34, 34, 1);
    margin-top: 0.19rem;
    margin-bottom: 0.19rem;
}

.smallTitle {
    display: block;
    font-size: 0.12rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 0.2rem;
    margin: 0.065rem auto 0.03rem auto;
}

.bindButton {
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    width: 100%;
    height: 0.49rem;
    background: linear-gradient(90deg, rgba(21, 228, 196, 0.5) 0%, rgba(0, 198, 236, 0.5) 100%);
    font-size: 0.19rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    border: none;
}

.bindButton.active {
    background: linear-gradient(90deg, rgba(21, 228, 196, 1) 0%, rgba(0, 198, 236, 1) 100%);
    color: rgba(255, 255, 255, 1);
}

input {
    width: 100%;
    height: 0.565rem;
    border: none;
    border-bottom: 0.005rem solid #E8E8E8;
    outline: none;
    -webkit-appearance: none;
    --webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.input.small {
    width: 78%;
}

.input-placeholder {
    font-size: 0.19rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
}

.agreement {
    display: block;
    text-align: center;
    font-size: 0.12rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
    line-height: 0.165rem;
    margin-top: 0.295rem;
}

.getCodeC {
    position: absolute;
    top: 0rem;
    right: 0rem;
    font-size: 0.14rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(204, 204, 204, 1);
    z-index: 1000;
    height: 0.585rem;
    line-height: 0.595rem;
    border: none;
    border-bottom: 0.005rem solid #E8E8E8;
    background: transparent;
}

.getCodeC.active {
    color: rgba(0, 187, 187, 1);
}

.wx-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
}

.wx-dialog.waiting {
    position: fixed;
    z-index: 5000;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    border-radius: 0.12rem;
    background: transparent;
    font-size: 0.17rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.31rem;
}

</style>
