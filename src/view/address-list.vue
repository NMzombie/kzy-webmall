<template>
    <div>
        <div
            v-if="loading"
            class="loading_new_wrap">
            <div :class="['liu']" />
        </div>
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            :disabled-list="disabledList"
            disabled-text="以下地址超出配送范围"
            default-tag-text="默认"
            @click-item="addressChoose"
            @add="onAdd"
            @edit="onEdit" />
    </div>
</template>

<script>
import { Toast } from 'vant';
import AccountLogic from '@/logic/account'
import { post } from '@/http-handle/http2.js'
import queryString from 'query-string'
export default {
    data() {
        return {
            chosenAddressId: '1',
            list: [],
            loading: true,
            disabledList: [
                {
                    id: '399',
                    name: '王五',
                    tel: '1320000000',
                    address: '浙江省杭州市滨江区江南大道 15 号'
                }
            ]
        }
    },
    computed: {
        userId() {
            return AccountLogic.getUserId()
        }
    },
    created () {
        console.log(this.build_redirect_path(this.$route.query.redirect,this.chosenAddressId))
        this.initData()
    },
    methods: {
        check_from_trade_check_page(query) {
            return query && query.from == 'pay-check'
        },
        redirect_path_addressId (redirect_path){
            let path = decodeURIComponent(redirect_path)
            let index = path.indexOf('?')
            let base

            if (index > -1) {
                base = path.substr(0, index)
            } else {
                base = path
            }

            let query = queryString.parse(path.replace(base, ''))
            return query.addressId
        },
        // 根据传入的redirect_path，构建新的redirect_path。追加或替换addressId参数
        build_redirect_path (redirect_path, addressId) {
            let path = decodeURIComponent(redirect_path)
            let index = path.indexOf('?')
            let base

            if (index > -1) {
                base = path.substr(0, index)
            } else {
                base = path
            }

            let query = queryString.parse(path.replace(base, ''))
            query.addressId = addressId

            return base + '?' + decodeURIComponent(queryString.stringify(query))
        },
        initData() {
            this.loading = true
            let userId = this.userId
            post('/account/delivery_address/list',{userId}).then(({code,data,desc}) => {
                if(code*1 !== 10000) {
                    Toast(desc)
                } else {
                    let list = data
                    data.forEach((item,index) => {
                        list[index]={
                            id: item.id,
                            name: item.name,
                            tel: item.phone,
                            address: item.province+item.city+item.area+item.address,
                            isDefault: item.isDefault
                        }
                    })
                    for(let i=0; i<list.length; i++){
                        if(list[i].isDefault) {
                            list.unshift(...list.splice(i, 1))
                            break;
                        }
                    }
                    if(!this.redirect_path_addressId(this.$route.query.redirect)) {
                        this.chosenAddressId = list[0].id
                    } else {
                        this.chosenAddressId = parseInt(this.redirect_path_addressId(this.$route.query.redirect))
                    }
                    this.list = list
                }
                this.loading = false
            })
        },
        addressChoose() {
            if(!this.check_from_trade_check_page(this.$route.query)) return
            let redirect_path = this.$route.query.redirect
            let redirectUrl = this.build_redirect_path(redirect_path,this.chosenAddressId)
            this.$router.push(redirectUrl)
        },
        onAdd() {
            this.$router.push({
                name: 'address',
                params: {id: '0'}
            })
        },
        onEdit(item, index) {
            this.$router.push({
                path: '/address',
                query: {addressId: item.id}
            })
        }
    }
}
</script>

<style lang="less" scoped>
</style>