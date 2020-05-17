<template>
    <div>
        <section
            v-if="type == 'micropage' && column == 2"
            class="list-container"
            style="margin-top: 0.1rem;">
            <div
                v-for="(item,index) in goodsList"
                :key="index"
                style="height:2.8rem"
                class="box"
                @click="$router.push('/goods/'+item.goodsId)">
                <img
                    v-lazy="item.pictures[0]"
                    class="goods-img">
                <div class="goods-info">
                    <p class="goods-title">
                        {{ item.name }}
                    </p>
                    <p class="r2">
                        <span class="price">￥{{ (item.sellPrice/100).toFixed(2) }}</span>
                    </p>
                </div>
                <img
                    class="cart-icon"
                    src="../assets/images/artboard-red.png">
            </div>
        </section>
        <section
            v-else-if="type == 'micropage' && column == 1"
            class="column-container">
            <div
                v-for="(item,index) in goodsList"
                :key="index"
                class="column-box"
                @click="$router.push('/goods/'+item.goodsId)">
                <img
                    v-lazy="item.pictures[0]"
                    class="goods-img">
                <div class="goods-info">
                    <p class="goods-title">
                        {{ item.name }}
                    </p>
                    <p class="r2">
                        <span class="price">￥{{ (item.sellPrice/100).toFixed(2) }}</span>
                    </p>
                </div>
                <img
                    class="cart-icon"
                    src="../assets/images/artboard-red.png">
            </div>
        </section>
        <section
            v-else
            v-infinite-scroll="pageScroll"
            infinite-scroll-disabled="scrollDisabled"
            infinite-scroll-distance="10"
            class="list-container">
            <div
                v-for="(item,index) in goodsList"
                :key="index"
                class="box"
                @click="$router.push('goods/'+item.id)">
                <img
                    v-lazy="item.pictures[0]"
                    class="goods-img">
                <div class="goods-info">
                    <p class="goods-title">
                        {{ item.name }}
                    </p>
                    <p class="detail">
                        {{ item.introduction }}
                    </p>
                    <p class="r2">
                        <span class="price">￥{{ (item.sellPrice/100).toFixed(2) }}</span>
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    props:['goodsList','page','scrollDisabled','type','column'],
    data() {
        return {
            currentPage: 1
        }
    },
    created() {
    },
    methods: {
        pageScroll() {
            this.currentPage = this.page
            this.currentPage++
            this.$emit('getDataList',this.currentPage)
        }
    }
}
</script>

<style lang="less" scoped>
.list-container{
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    padding: 0 0.12rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  .box {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 1.72rem;
    min-height: 1.2rem;
    margin-bottom: 0.12rem;
    box-sizing: border-box;
    float: left;
    display: -webkit-box;
    height: 3rem;
    background: white;
    border-radius: 0.08rem;
    box-shadow: 1px 1px 9px #ececec;
    position: relative;
    .goods-img {
      width: 1.7rem;
      height: 1.7rem;
      position: relative;
      border-top-left-radius: 0.08rem;
      border-top-right-radius: 0.08rem;
      }
      .goods-info {
        width: 100%;
        padding: .15rem .10rem .1rem .10rem;
        box-sizing: border-box;
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
      .cart-icon {
        width: .35rem;
        height: .35rem;
        position: absolute;
        bottom: .04rem;
        right: .1rem;
      }
  }
}
.column-container {
  display: flex;
  flex-direction: column;
  padding: 0.1rem;
  background: white;
  .column-box {
    display: flex;
    margin-bottom: 0.1rem;
    height: 1.2rem;
    border-radius: 8px;
    justify-content: flex-start;
    padding: 0.1rem 0.1rem 0 0.1rem;
    border: 1px solid #ddd;
    position: relative;
    .goods-img {
      width: 1.1rem;
      height: 1.1rem;
      position: relative;
      border-radius: 0.08rem;
    }
    .goods-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 0.1rem;
      .goods-title {
        font-family: PingFangSC-Regular;
        color: #222;
        font-size: .15rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .price {
        font-family: HelveticaNeue-Medium;
        color: #f7615b;
        display: inline-block;
        margin-top: 3px;
        font-size: 0.2rem;
      }
    }
  }
  .cart-icon {
    width: .35rem;
    height: .35rem;
    position: absolute;
    bottom: .04rem;
    right: .1rem;
  }
}
</style>