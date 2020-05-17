<template>
    <div>
        <section>
            <ul>
                <li
                    v-for="(item,index) in dataList"
                    :key="index"
                    class="box"
                    @click="$router.push('/knowledgePage/'+item.id)">
                    <div class="_left">
                        <div class="img">
                            <img v-lazy="item.frontCover">
                        </div>
                    </div>
                    <div class="_right">
                        <h2>{{ item.name }}</h2>
                        <p class="description">
                            {{ item.subtitle }}
                        </p>
                        <p class="subscribe">
                            <span :style="{'color':item.labelColor,'background-color':item.labelBgColor}">{{ item.label }}</span>
                            {{ item.subscribers }}人订阅
                        </p>
                        <span
                            v-if="item.isFree!=1"
                            class="price"><small>￥</small>{{ (item.originalPrice/100).toFixed(2) }}</span>
                        <span
                            v-else
                            class="price">免费</span>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    props:['dataList'],
    data() {
        return {

        }
    },
    created () {
        console.log(this.dataList)
    },
    methods: {

    }
}
</script>

<style lang="less" scoped>
.purple {
    color: rgb(144, 132, 202);
    background-color: rgb(239, 239, 253);
}
ul {
    list-style: none;
    li {
      height: 1.145rem;
      padding: .135rem .15rem .11rem .12rem;
      padding-bottom: .11rem;
      box-sizing: border-box;
      border-bottom: 1px solid #f8f8f8;
      background: #fff;
      ._left {
        .img {
          width: .9rem;
          height: .9rem;
          border-radius: .04rem;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      ._right {
        flex: 1;
        min-width: 0;
        margin-left: .11rem;
        height: .9rem;
        position: relative;
        h2 {
          font-size: .16rem;
          line-height: .225rem;
          color: #222;
          overflow: hidden;
          word-break: break-all;
        }
        .description {
            margin-top: .04rem;
            font-size: .12rem;
            line-height: .165rem;
            color: #999;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 1.87rem;
        }
        .subscribe {
          position: absolute;
          bottom: .04rem;
          left: 0;
          font-size: .24rem;
          line-height: .24rem;
          color: #999;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          width: 3.74rem;
          display: -ms-flexbox;
          display: flex;
          -ms-flex-align: center;
          align-items: center;
          transform: scale(.5);
          transform-origin: left bottom;
           span {
              font-size: .2rem;
              padding: .06rem .08rem;
              margin-right: .19rem;
              line-height: .18rem;
              display: inline-block;
              border-radius: .04rem;
              font-family: PingFangSC-Regular;
              font-weight: 400;
           }
        }
        .price {
          font-size: .16rem;
          color: #f26;
          position: absolute;
          right: 0;
          bottom: 0;
          line-height: .14rem;
          small {
            font-size: .1rem;
          }
        }
      }
    }
}
</style>