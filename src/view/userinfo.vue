<template>
    <div>
        <div class="header">
            <div class="avatar">
                <img
                    v-if="userInfo.head"
                    v-lazy="userInfo.head">
                <img
                    v-else
                    src="../assets/images/avatar.png">
            </div>
        </div>
        <div
            class="nickname"
            style="margin-top: 0.1rem;">
            <div class="title">
                昵称
            </div>
            <div class="content">
                <input
                    v-model="nickName"
                    placeholder="请设置你的昵称">
            </div>
        </div>
        <div class="nickname">
            <div class="title">
                登录方式
            </div>
            <div class="content">
                手机
            </div>
        </div>
        <div
            class="onSave"
            @click="onSave">
            保存
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import AccountLogic from '@/logic/account'
import { post } from '@/http-handle/http2.js'
export default {
    data() {
        return {
            userInfo: '',
            nickName: ''
        }
    },
    computed: {
        userId() {
            return AccountLogic.getUserId()
        }
    },
    created() {
        this.initData()
    },
    methods: {
        ...mapActions(['actionPopupUIMessageShow']),
        initData() {
            let terminal = AccountLogic.getTerminal()
            let userId = this.userId
            post('/account/userInfo',{userId,terminal}).then(({data,desc,code}) => {
                if (code * 1 !== 10000) {
                    this.actionPopupUIMessageShow(desc)
                    return
                } else {
                    this.userInfo = data
                    this.nickName = this.userInfo.nickname+''
                }
            })
        },
        onSave() {
            let userId = this.userId
            let nickname = this.nickName
            let head = ''
            let accessToken = AccountLogic.getAccessToken()
            let postData = {
                accountvo: {
                    accessToken,
                    head,
                    nickname,
                    userId,
                }
            }
            post('/account/editUserInfo',postData).then(({data,desc,code}) => {
                if (code*1 == 10000) {
                    this.actionPopupUIMessageShow('保存成功！')
                    setTimeout(() => {
                        this.$router.back(-1)
                    },1200)
                }else {
                    this.actionPopupUIMessageShow(desc)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    overflow: hidden;
    height: 1.4rem;
    border-bottom: 1px solid #f0f0f0;
    padding-top: .38rem;
    box-sizing: border-box;
    background-color: #fff;
    .avatar {
      width: .6rem;
      height: .6rem;
      border-radius: 100%;
      border: none;
      box-shadow: none;
      margin: 0 auto;
      img {
        border-radius: 100%;
      }
    }
}
.nickname {
    box-sizing: border-box;
    padding: 0 0.12rem;
    height: .5rem;
    overflow: hidden;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #f3f3f3;
    display: flex;
    justify-content: space-between;
    align-items: center;
      .title {
          color: #222;
          font-family: PingFangSC-Regular;
          font-size: 0.14rem;
      }
      .content {
        line-height: 0.5rem;
        font-size: 0.14rem;
      }
      input {
          border: none;
          line-height: .3rem;
          height: .3rem;
          outline: none;
          width: 100%;
          text-align: right;
      }
}
.onSave {
    color: #f26;
    border: 1px solid #f26;
    border-radius: .02rem;
    padding-top: .1rem;
    padding-bottom: .1rem;
    text-align: center;
    padding-left: .1rem;
    padding-right: .1rem;
    border-radius: 40px;
    margin: .1rem;
}
</style>