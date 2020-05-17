<template>
    <div style="margin-bottom: 0.48rem">
        <section
            v-for="(item,index) in dataList"
            :key="index">
            <div v-if="item.type == 'goodsList'">
                <goodsList
                    :goods-list="item.list"
                    :column="item.column"
                    type="micropage" />
            </div>
            <div v-if="item.type == 'slider'">
                <Slider :list-data="item.list" />
            </div>
            <div v-if="item.type == 'searchBar'">
                <div class="search-bar">
                    <div
                        class="search-content"
                        @click="$router.push('/search')">
                        <van-icon name="search" /><span>搜索商品</span>
                    </div>
                </div>
            </div>
            <div v-if="item.type == 'imageList'">
                <imageList
                    :data-list="item.list"
                    :col="item.column" />
            </div>
            <div v-if="item.type == 'knowledgeList'">
                <knowledgeList :data-list="item.list" />
            </div>
        </section>
    </div>
</template>
、
<script>
import { Toast } from 'vant';
import AccountLogic from '@/logic/account'
import { post } from '@/http-handle/http2.js'
import goodsList from '@/components/goodsList.vue'
import Slider from '@/components/slider.vue'
import imageList from '@/components/imageList.vue'
import knowledgeList from '@/components/knowledgeList.vue'
export default {
    components: {
        goodsList,
        Slider,
        imageList,
        knowledgeList
    },
    props:['id'],
    data() {
        return {
            dataList: []
        }
    },
    computed: {
        pageId() {
            return this.$route.params.id || this.id
        },
        userId () {
            return AccountLogic.getUserId()
        }
    },
    created() {
        this.initPageData()
    },
    methods: {
        initPageData() {
            post('/goods/micro_page/query',{id:this.pageId,userId:this.userId}).then(({data,desc,code}) => {
                if(code*1 !== 10000) {
                    Toast(desc||'网络连接失败！')
                } else {
                    let list = JSON.parse(data.pageData).list
                    this.dataList = list
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  .search-content {
    overflow: hidden;
    word-break: break-word;
    align-self: flex-start;
    box-sizing: border-box;
    margin: .075rem .1rem;
    text-align: center;
    background: #f7f7f7;
    outline: none;
    width: 100%;
    border-radius: 1rem;
    border: none;
    position: relative;
    padding: .05rem 0;
    color: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    i {
      font-size:  0.2rem;
      background-size: 100%;
      margin-right: 0.05rem;
    }
  }
}
</style>