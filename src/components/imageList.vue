<template>
    <div>
        <div
            class="image-list">
            <img
                v-for="(item,index) in dataList"
                :key="index"
                v-lazy="item.image"
                :class="[`col-${col}`]"
                :alt="item.title"
                @click="clickImg(item)">
        </div>
    </div>
</template>

<script>
export default {
    props:['dataList','col'],
    data(){
        return {

        }
    },
    computed: {

    },
    created() {

    },
    methods: {
        clickImg(item) {
            if(item.type != 'GOODS') return
            this.$router.push('/goods/'+ item.data)
        }
    }
}
</script>
<style lang="less" scoped>
.image-list {
    display: flex;
    flex-wrap: wrap;
}
.col-1 {
    width: 100%
}
.col-2 {
    width: 50%
}
.col-3 {
    width: 33.33%
}
.col-4 {
    width: 25%
}
</style>