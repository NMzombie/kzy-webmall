<template>
    <div>
        <van-address-edit
            :area-list="areaList"
            :show-delete="$route.query.addressId != 0"
            show-set-default
            :address-info="AddressInfo"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete" />
    </div>
</template>

<script>
import { Toast } from 'vant';
import Area from '../tools/area';
import AccountLogic from '@/logic/account'
import { post } from '@/http-handle/http2.js'
export default {
    data() {
        return {
            areaList: Area,
            AddressInfo: {
                id: '',
                name: '',
                tel: '',
                province: '',
                city: '',
                county: '',
                addressDetail: '',
                isDefault: false
            }
        }
    },
    computed: {
        userId() {
            return AccountLogic.getUserId()
        }
    },
    created() {
        this.initData()
    },
    methods: {
        initData(){
            let id = this.$route.query.addressId
            let userId = this.userId
            if (id != 0){
                post('/account/delivery_address/list',{userId}).then(({code,data,desc}) => {
                    if(code*1 !== 10000) {
                        Toast(desc)
                    } else {
                        data.forEach(item => {
                            if(item.id == id) {
                                this.AddressInfo = {
                                    id: item.id,
                                    name: item.name,
                                    tel: item.phone,
                                    province: item.province,
                                    city: item.city,
                                    county: item.area,
                                    addressDetail: item.address,
                                    isDefault: item.isDefault
                                }
                            }
                        })
                        document.getElementsByClassName('van-field__control')[2].setAttribute("placeholder",`${this.AddressInfo.province}/${this.AddressInfo.province}${this.AddressInfo.county? '/'+ this.AddressInfo.county: ''}`)
                    }
                })
            }
        },
        onSave(content) {
            let id = this.$route.query.addressId
            let userId = this.userId
            const {name,tel: phone,province,city,county: area,addressDetail: address,isDefault} = content
            let postData = {
                id,
                name,
                phone,
                area,
                province,
                city,
                address,
                lon: "0",
                lat: "0",
                isDefault,
                userId
            }
            let addData = {
                name,
                phone,
                area,
                province,
                city,
                address,
                lon: "0",
                lat: "0",
                isDefault,
                userId
            }
            post(id == 0? '/account/delivery_address/add' : '/account/delivery_address/modify', {userAddressVo: id == 0 ? addData : postData}).then(({data,desc,code}) => {
                if(code*1 != 10000) {
                    Toast(desc || '网络请求失败')
                }else {
                    Toast('保存成功！')
                    setTimeout(() => {
                        this.$router.back(-1)
                    },1500)
                }
            })
        },
        onDelete() {
            let id = this.$route.query.addressId
            let userId = this.userId
            post('/account/delivery_address/remove',{id,userId}).then(({code,data,desc}) => {
                if(code*1 !== 10000) {
                    Toast(desc)
                } else {
                    Toast('删除成功！')
                    setTimeout(() => {
                        this.$router.back(-1)
                    },1200)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>