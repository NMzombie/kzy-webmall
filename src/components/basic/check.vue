
<template>
    <span
        :class="['icon iconfont','f22',{'icon-circle':!checked,'c-999':!checked,'icon-circle-check-f':checked,'c-light':checked}]"
        @click="triggle()" />
</template>

<script>
export default {
    props: {
        checked: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
        },
    },
    watch: {
    // checked(a,b) {
    //    console.log(a);
    //}
    },
    methods:{
        triggle(){
            //      this.checked=!this.checked;
        },

    }
}
</script>

<style lang="less" scoped>
.c-999{
  color: #e8e8e8;
}
</style>
