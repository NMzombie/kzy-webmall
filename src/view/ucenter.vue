<template>
    <div>
        <div>ucenter</div>
        <button @click="goLogin">
            login
        </button>
    </div>
</template>

<script>
export default {
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