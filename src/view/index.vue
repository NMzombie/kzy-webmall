<template>
    <div>
        <!-- <router-link to="/goods/42622">
            home
        </router-link>
        <router-link to="/search">
            search
        </router-link>
        <router-link to="/page/968">
            page
        </router-link> -->
        <microPage id="991" />
        <tabbar />
    </div>
</template>

<script>
import { post } from '@/http-handle/http2.js';
import tabbar from '../components/tabbar'
import microPage from '@/view/micro-page.vue'
export default {
    components: {
        tabbar,
        microPage
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