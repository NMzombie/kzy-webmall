<template>
    <div>
        <div
            v-if="loading"
            class="loading_new_wrap">
            <div :class="['liu']" />
        </div>
        <!-- <van-picker
            v-if="showPrice"
            title="价格区间"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="Cancel"
            @change="onChange" /> -->
        <form
            style="position:relative;text-algn:center;background: white;"
            action="/">
            <van-radio-group
                v-model="radio"
                style="position:absolute;top: 0.1rem;left: 0.15rem;">
                <van-radio name="1">
                    价格大于
                </van-radio>
                <van-radio name="2">
                    价格小于
                </van-radio>
            </van-radio-group>
            <!-- <button
                style="position:absolute;top: 0.2rem;"
                @click.stop.prevent="showPrice = true">
                {{ '价格'+priceArea||'请选择价格范围' }}
            </button> -->
            <van-search
                v-model="keyword"
                show-action
                shape="round"
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel" />
            <div style="clear:both" />
        </form>
        <!-- <van-button
            style="margin-left: 0.2rem;"
            type="default"
            @click="showPrice = true">
            请选择价格范围
        </van-button> -->
        <section
            v-if="!isSearched"
            class="search-history">
            <div class="history-title">
                <div>搜索历史</div>
                <div
                    class="delete"
                    @click="onDelete">
                    <van-icon name="delete" />
                    <span>清空</span>
                </div>
            </div>
            <div class="container">
                <div
                    v-for="(item, index) in keyWordList"
                    :key="index"
                    class="key-word"
                    @click="onSearch(item)">
                    <p>{{ item }}</p>
                </div>
            </div>
            <div class="container">
                <p class="age">
                    适龄选择
                </p>
                <div
                    v-for="(item, index) in calssWords"
                    :key="index"
                    style="color:white;border: 1px solid rgb(255, 99, 116);background:rgb(255, 99, 116)"
                    class="key-word"
                    @click="onSearch(item)">
                    <p>{{ item }}</p>
                </div>
            </div>
        </section>
        <van-tabs
            v-if="isSearched"
            v-model="type"
            sticky>
            <van-tab
                title="商品"
                name="goods">
                <section
                    v-if="isSearched"
                    class="result-list">
                    <div class="sorting-bar">
                        <!-- <div style="color: rgba(102, 102, 102, 0.9);">
                            共{{ totalNumber }}个结果
                        </div> -->
                        <div>
                            <van-dropdown-menu active-color="#ee0a24">
                                <van-dropdown-item
                                    v-model="pageData.orderType"
                                    :options="sortOption" />
                            </van-dropdown-menu>
                        </div>
                    </div>
                    <goodsList
                        :goods-list="searchResult"
                        :page="pageData.pageNumber"
                        :scroll-disabled="scrollDisabled"
                        @getDataList="getDataList" />
                </section>
            </van-tab>

            <van-tab
                title="课程"
                name="course">
                <van-card
                    v-for="(item,index) in courseResult"
                    :key="index"
                    tag="早教课程"
                    :desc="item.subtitle"
                    :title="item.name"
                    :thumb="item.frontCover"
                    @click="$router.push('/knowledgePage/'+item.id)" />
            </van-tab>
        </van-tabs>

        <transition name="fade">
            <div
                v-if="showToTp"
                class="scroll-top"
                @click="backTop">
                <van-icon name="arrow-up" />
                <span>顶部</span>
            </div>
        </transition>
    </div>
</template>

<script>
import { Toast } from 'vant';
import AccountLogic from '@/logic/account'
import { post } from '@/http-handle/http2.js'
import goodsList from '../components/goodsList'
import localData from './goods'
export default {
    components:{
        goodsList
    },
    data() {
        return {
            keyword: '',
            keyWordList: [],
            calssWords: ['2岁','3岁','0-6个月','6-12个月','12-18个月','19个月','20个月','21个月','22个月','23个月'],
            searchResult: [],
            totalNumber: 0,
            sortOption: [
                { text: '综合排序', value: 1 },
                { text: '最新', value: 2 },
                { text: '最热', value: 3 },
                { text: '价格小于100', value: 4 },
                { text: '价格100-200', value: 5 },
                { text: '价格200以上', value: 6 },
            ],
            pageData: {
                keyWord:'',
                pageNumber:1,
                pageSize:10,
                orderType:1
            },
            scrollDisabled: false,
            loadedNumber: 0,
            isSearched: false,
            loading: false,
            showToTp: false,
            columns: ['大于', '小于'],
            showPrice: false,
            priceArea: '',
            radio: '',
            type: '',
            courseResult: []
        }
    },
    watch: {
        'pageData.orderType': function(val) {
            if(val<4) {
                this.handleSearch(this.pageData.keyWord, 1,true)
            }
            else if (val == 4) {
                // this.handleSearch('',1,false)
                this.searchResult = this.searchResult.filter((item,index) => {
                    return item.sellPrice <= 10000
                })
            }else if (val == 5) {
                // this.handleSearch('',1,false)
                this.searchResult = this.searchResult.filter((item,index) => {
                    return item.sellPrice <= 20000 && item.sellPrice > 10000
                })
            } else if (val == 6) {
                // this.handleSearch('',1,false)
                this.searchResult = this.searchResult.filter((item,index) => {
                    return item.sellPrice > 20000
                })
            }
        },
        radio: function(val) {
            if (this.keyword == '') {
                Toast('请输入关键词！')
                this.radio = ''
                return
            }
            this.isSearched = true
            if (val == 1) {
                this.searchResult = localData.filter((item,index) => {
                    return item.sellPrice/100 >= this.keyword
                })
            } else if (val == 2){
                this.searchResult = localData.filter((item,index) => {
                    return item.sellPrice/100 < this.keyword
                })
            }
        },
    },
    created() {
        this.initKeyWords()
    },
    mounted (){
        window.addEventListener('scroll', this.backTopShow)
    },
    methods: {
        initKeyWords () {
            if (localStorage.getItem('search_words')) this.keyWordList = localStorage.getItem('search_words').split(',') || ''
        },
        onSearch(val) {
            if (!val) {
                Toast('请输入关键词！')
                return
            }
            this.isSearched = true
            let exist = false
            let list = []
            if (localStorage.getItem('search_words')) list = localStorage.getItem('search_words').split(',')
            if (Object.prototype.toString.call(list) != '[object Array]') list = [list]
            list.forEach((item, index) => {
                if(item == val) exist = true
            })
            if(!exist) {
                list.unshift(val)
                localStorage.setItem('search_words',list)
                this.keyWordList = localStorage.getItem('search_words').split(',')|| []
            }
            this.handleSearch(val,1,true)
        },
        handleSearch (val,page,isFilter) {
            this.loading = true
            if (val) this.pageData.keyWord = val
            this.pageData.pageNumber = page
            if(this.pageData.keyWord != '') {
                post('/search/mall/goods',this.pageData).then(({desc,data,code}) => {
                    if(code*1 !== 10000) {
                        Toast(desc||'网络请求失败！')
                    }else {
                        if(!data.data) {
                            this.loading = false
                            Toast('未查询到商品！')
                            return
                        }
                        this.totalNumber=data.totalNumber
                        this.loadedNumber += data.data.length
                        if(this.searchResult.length == 0 || isFilter) {
                            this.searchResult = data.data
                            this.loadedNumber = data.data.length
                        } else {
                            this.searchResult = this.searchResult.concat(data.data)
                        }
                        if (this.loadedNumber >= this.totalNumber) {
                            this.scrollDisabled = true
                        }else {
                            this.scrollDisabled = false
                        }
                    }
                    this.loading = false
                })
                post('/search/knowledge/curse',this.pageData).then(({desc,data,code}) => {
                    if(code*1 !== 10000) {
                        Toast(desc||'网络请求失败！')
                    }else{
                        this.courseResult = data.data
                    }
                })
            }

        },
        onCancel() {
            this.$router.replace('/')
        },
        onDelete() {
            localStorage.removeItem('search_words')
            this.keyWordList = []
        },
        getDataList(page) {
            if (this.loadedNumber < this.totalNumber) this.handleSearch('',page,false)
        },
        backTopShow() {
            this.scroll = document.documentElement.scrollTop || document.body.scrollTop
            if(this.scroll>400) {
                this.showToTp = true
            } else {
                this.showToTp = false
            }
        },
        backTop() {
            window.scrollTo(0, 0)
        },
        onConfirm(value, index) {
            this.showPrice = false
            this.priceArea = value
            this.isSearched = true
            if (this.priceArea == '大于') {
                this.searchResult = localData.filter((item,index) => {
                    return item.sellPrice/100 >= this.keyword
                })

            }else if (this.priceArea == '小于') {
                this.searchResult = localData.filter((item,index) => {
                    return item.sellPrice/100 < this.keyword
                })

            }
            this.showPrice = false
        },
        onChange (picker, value, index) {

        },
        Cancel () {
            this.priceArea = ''
            this.showPrice = false
        }
    }
}
</script>

<style>
.van-tab__pane {
    padding-top: 0;
}
.van-tabs--line{
    overflow: hidden;
}
.van-radio__icon {
    font-size: 14px;
}
.van-dropdown-menu {
  background: #f6f8fb;
}
[class*=van-hairline]::after {
    content: '';
}
.van-dropdown-menu {
  height: auto;
}
.van-dropdown-menu__item .van-ellipsis{
    color: #ee0a24;
}
.van-dropdown-menu__title::after {
  color: #ee0a24;
}
.van-search--show-action {
    width: 75%;
    float: right;
}
</style>
<style lang="less" scoped>
.history-title {
    padding: 0 0.12rem;
    padding-top: 0.175rem;
    color: #999;
    font-size: 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    .delete {
      display: flex;
      align-items: center;
      i{
        font-size: 0.16rem;
        margin-right: 0.04rem;
      }
    }
}
.container {
  padding-right:0.12rem;
  padding-bottom: 0.16rem;
  background: white;
  .age {
    padding: 0 0.12rem;
    padding-top: 0.175rem;
    color: #999;
    font-size: 0.15rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    background: white;
  }
  .key-word {
      padding: 0.055rem 0.1rem;
      border: 1px solid #CCCCCC;
      border-radius: 0.1rem;
      display: inline-block;
      margin-left: 0.12rem;
      color: #666;
      margin-top: 0.15rem;
      font-size: 0.15rem;
      max-width: 92%;
      p {
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
  }
}
.sorting-bar {
  margin-bottom: 0.125rem;
  display: flex;
  justify-content: space-between;
  padding: 0.125rem 0.15rem;
  padding-bottom: 0;
}
.scroll-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 0.12rem;
    position: fixed;
    bottom: 0.64rem;
    right: 0.15rem;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 50%;
    border: 1px solid #f3f3f3;
    background: white;
    text-align: center;
    box-sizing: border-box;
    color: #fd273f;
    box-shadow: 0 0.06rem 0.2rem -0.05rem rgba(57, 106, 188, 0.3);
    i {
      font-size: 0.18rem;
      line-height: 0.11rem;
    }
    span {
      font-size: 0.14rem;
    }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>