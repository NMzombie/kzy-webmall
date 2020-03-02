<template>
    <div>
        <div>ucenter</div>
        <button @click="goLogin">
            login
        </button>
        <tabbar />
    </div>
</template>

<script>
import tabbar from '../components/tabbar'
export default {
    components: {
        tabbar
    },
    data(){
        return{

        }
    },
    created(){

    },
    methods: {
        goLogin(){
            this.$router.push({
                path:'/login'
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>