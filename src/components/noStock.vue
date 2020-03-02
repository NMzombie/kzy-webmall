<template>
    <div>
        <div class="no-stock">
            <div class="fahuo">
                发货
            </div>
            <div
                v-if="stockPlace"
                class="no-stock-info"
                @click="popupShow">
                <div class="text box-l">
                    <div class="flex1">
                        <div class="box-j">
                            <img
                                class="no-img"
                                src="https://staticimg.ngmm365.com/ae4eb2c25d0eaf87bfecbd6cf9b81799-w48_h48.png">
                            <div
                                class="flex1 one-row"
                                style="line-height:1.3">
                                本商品不支持配送：{{ stockPlace }}
                            </div>
                        </div>
                    </div>
                    <div><i class="right_arrow icon iconfont icon-arrow-right" /></div>
                </div>
            </div>
            <span
                v-if="!stockPlace"
                class="normal-text flex-content">
                <img
                    v-if="!stockPlace"
                    class="no-img"
                    src="https://staticimg.ngmm365.com/f09fc3b6e0baaa1bcdf8ef90c67e3dd4-w24_h24.png">
                <div
                    class="flex1"
                    style="line-height:1.3">该商品支持全国配送</div>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        stockPlace:{
            type:String,
            default: ''
        }
    },
    data() {
        return {

        }
    },
    methods: {
        popupShow(){
            this.$emit('popupShow')
        }
    }
}
</script>
<style lang="less" scoped>
/**不支持配送**/
.no-stock{
  width:100%;
  font-size:0.13rem;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(102,102,102,1);
  display:flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 0.434rem;
  line-height: 1;
  .fahuo{
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    margin-left: 0.12rem;
    line-height: 0.434rem;
    white-space: nowrap;
  }
  .normal-text{
      margin-left: 0.185rem;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      display: flex;
      align-items: center;
      flex:1;
      .no-img{
        height:0.12rem;
        display: block;
        margin-right: 0.04rem
        // vertical-align: middle;
      }
  }
  .text{
      padding-left: 0.185rem;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height: 0.434rem;
      .no-img{
        width:0.12rem;
        display: block;
        margin-right: 0.04rem
        // vertical-align: middle;
      }
      i{
        color: rgba(255,79,88,1);
      }
    }
  .no-stock-info{
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    line-height: 0.434rem;
    display: flex;
    flex:1;
    justify-content: space-between;
    .right_arrow {
      margin-right: 0.12rem;
      color: #ccc;
      line-height: 0.434rem;
    }
  }
}
.flex1 {
    flex: 1;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
}
</style>