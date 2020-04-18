<template>
    <div>
        <div class="blank">
            <img src="../assets/images/identity-bg.png">
            <p> 你还没有实名认证信息哦～ </p>
            <p>为了能顺利下单，请添加一个吧！</p>
        </div>
        <button
            class="add-button"
            @click="onClick">
            添加实名信息
        </button>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    methods: {
        onClick () {
            Toast('请前往APP添加实名信息~')
        }
    }
}
</script>

<style lang="less" scoped>
.blank {
  img {
        display: block;
        width: 2.56rem;
        margin: 0.82rem auto 0.13rem auto;
  }
  p {
    text-align: center;
    line-height: 0.28rem;
    font-size: 0.14rem;
    color: #999;
  }
}
.add-button {
    display: block;
    border: none;
    background-image: linear-gradient(90deg, #FF5533 0%, #FF2266 78%);
    border-radius: 0.5rem;
    height: 0.44rem;
    width: 2.7rem;
    margin: 0 auto;
    margin-top: 1rem;
    color: white;
    font-size: 0.16rem;
}
</style>