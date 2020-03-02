<template>
    <div>
        <div>home</div>
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
        // post('/account/smsCode',{phone:11111111111,goal:'LOGIN'}).then(res => {
        //     if(res.code === 10000){
        //         console.log(res,'大成功')
        //     } else {
        //         // self.actionPopupUIMessageShow(obj.desc || "网络原因请求失败");
        //     }
        // })
    }
}
</script>

<style lang="less" scoped>

</style>