<template>
    <div style="margin: .12rem;">
        <van-swipe
            :autoplay="2500"
            indicator-color="white">
            <van-swipe-item
                v-for="(item,index) in listData"
                :key="index"
                @click="clickItem(item)">
                <img
                    v-lazy="item.image"
                    style="height:1.7rem; width: 100%">
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
    props:['listData'],
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        clickItem(item) {
            if(item.type != "GOODS") return
            this.$router.push('/goods/'+item.data)
        }
    }
}
</script>

<style lang="less" scoped>

</style>