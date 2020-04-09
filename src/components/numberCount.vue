<template>
    <div>
        <div class="wrap">
            <div
                :class="['item',{'disabled':is_min}]"
                @click="minus">
                -
            </div>
            <div
                class="item inputItem"
                @click="plus">
                <input
                    v-model="value"
                    class="input">
            </div>
            <div
                :class="['item',{'disabled':is_max},'add']"
                @click="plus">
                +
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // eslint-disable-next-line vue/require-prop-types
        value: {
            type: Number,
            default: 0,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 50,
        }
    },
    data() {
        return {

        }
    },
    computed: {
        is_min() {
            if(this.value<=1 || this.value<= this.min){
                return true
            }else{
                return false
            }
        },
        is_max() {
            return parseInt(this.value) >= this.max;
        }
    },
    methods: {
        minus() {
            if (!this.is_min){
                this.$emit('eventSkuNum', [parseInt(this.value) - 1, 0]);
            }
        },
        plus() {
            if (!this.is_max){
                this.$emit('eventSkuNum', [parseInt(this.value) + 1, 1]);
            }
        }
    }
}
</script>
<style lang="less" scoped>
.wrap {
  display: flex;
  .input{
    width: 0.32rem;
    height: 0.32rem;
    line-height: 0.32rem;
    border: 0;
    border-radius: 0;
    -webkit-appearance: none;
    outline: none;
    padding: 0;
    background: none;
    text-align: center;
    box-sizing: border-box;
    color: #222;
    display: inline-block;
    font-size: 18px;
  }
  .item{
    font-size: 18px;
    height: 0.32rem;
    line-height: 0.32rem;
    width: 0.32rem;
    background: #F7F7F7;
    text-align: center;
    &.disabled {
        color: #ddd;
        background: #FCFCFC;
    }
  }
}
</style>