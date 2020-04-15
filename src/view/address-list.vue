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
            @add="onAdd"
            @edit="onEdit" />
    </div>
</template>

<script>
import { Toast } from 'vant';
import AccountLogic from '@/logic/account'
import { post } from '@/http-handle/http2.js'
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
        this.initData()
    },
    methods: {
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
                    this.chosenAddressId = list[0].id
                    this.list = list
                }
                this.loading = false
            })
        },
        onAdd() {
            Toast('新增地址');
        },
        onEdit(item, index) {
            Toast('编辑地址:' + index);
        }
    }
}
</script>

<style lang="less" scoped>
</style>