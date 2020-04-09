<template>
    <section>
        <div class="recommend">
            <div class="title">
                激情推荐
            </div>
            <div
                v-for="(item,index) in dataList"
                :key="index"
                class="box">
                <van-image
                    class="goods-img"
                    :src="item.pictures[0]" />
                <div class="goods-info">
                    <p class="goods-title">
                        {{ item.name }}
                    </p>
                    <p class="detail">
                        {{ item.subName }}
                    </p>
                    <p class="r2">
                        <span class="price">￥{{ item.sellPrice }}</span>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions } from 'vuex'
import { post } from '@/http-handle/http2.js'
export default {
    props:['pid'],
    data() {
        return{
            dataList: []
        }
    },
    created() {
        this.initData()
    },
    methods: {
        ...mapActions(['actionPopupUIMessageShow']),
        initData () {
            let _this = this
            let postData = {
                goodsId: this.pid,
                size: 10
            }
            post('/goods/similarityGoodsRecommend',postData).then(obj => {
                if (obj.code == 10000) {
                    this.dataList = obj.data.data
                } else {
                    _this.actionPopupUIMessageShow(obj.desc || "网络请求失败")
                }
            })
        }
    }
}

</script>

<style lang="less" scoped>
.recommend{
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    overflow: hidden;
    padding: 0 0.12rem;
  .title {
    height: 0.585rem;
    line-height: 0.585rem;
    font-size: 0.14rem;
    color: #999;
    padding: 0 0.12rem;
  }
  .box {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 50%;
    min-height: 1.2rem;
    margin-bottom: 6px;
    box-sizing: border-box;
    float: left;
    padding-bottom: 3px;
    background-color: #fff;
    display: -webkit-box;
    height: 3rem;
    padding-right: 4px;
    .goods-img {
      width: 1.7rem;
      height: 1.7rem;
      position: relative;
    }
      .goods-info {
        width: 100%;
        padding: .15rem .10rem .1rem .10rem;
          .goods-title {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: .14rem;
            line-height: .21rem;
            height: .42rem;
            font-family: PingFangSC-Regular;
            color: #222;
          }
          .detail {
            font-size: .12rem;
            color: #999;
            line-height: .18rem;
            height: .36rem;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .r2 {
            position: relative;
            max-width: 1.46rem;
            height: .2rem;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            .price {
              font-family: PingFangSC-Regular;
              color: #f26;
              display: inline-block;
              margin-right: .08rem;
            }
          }
      }
  }
    .box:nth-child(odd) {
        padding-left: 4px;
    }
    .box:nth-child(even) {
        padding-right: 4px;
    }
}
</style>