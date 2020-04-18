<template>
    <div>
        <router-link to="/goods/42622">
            home
        </router-link>
        <tabbar />
    </div>
</template>

<script>
import { post } from '@/http-handle/http2.js';
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
        console.log(process.env)
    }
}
</script>

<style lang="less" scoped>

</style>