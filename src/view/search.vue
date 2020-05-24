<template>
    <div>
        <div
            v-if="loading"
            class="loading_new_wrap">
            <div :class="['liu']" />
        </div>
        <form action="/">
            <van-search
                v-model="keyword"
                show-action
                shape="round"
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel" />
        </form>
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
        </section>
        <section
            v-if="isSearched"
            class="result-list">
            <div class="sorting-bar">
                <div style="color: rgba(102, 102, 102, 0.9);">
                    共{{ totalNumber }}个结果
                </div>
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
export default {
    components:{
        goodsList
    },
    data() {
        return {
            keyword: '',
            keyWordList: [],
            searchResult: [],
            totalNumber: 0,
            sortOption: [
                { text: '综合排序', value: 1 },
                { text: '最新', value: 2 },
                { text: '最热', value: 3 },
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
            showToTp: false
        }
    },
    watch: {
        'pageData.orderType': function(val) {
            this.handleSearch(this.pageData.keyWord, 1,true)
        }
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
        }
    }
}
</script>

<style>
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