<template>
    <div
        v-show="PopupUIMessage.show"
        class="msg-info"
        transition="ng-c-msg">
        <span class="f14">{{ PopupUIMessage.text || '' }} &nbsp;</span>
    </div>
</template>
<script>
import {
    mapGetters,
    mapActions
} from 'vuex'

export default {
    computed: {
        ...mapGetters(['PopupUIMessage'])
    },
    watch: {
        'PopupUIMessage': {
            handler: function(val, oldVal) {
                var _this = this;
                if (val.show) {
                    setTimeout(function() {
                        _this.actionPopupUIMessageHide()
                    }, 3500);
                }
            },
            deep: true
        }
    },
    methods: {
        ...mapActions(['actionPopupUIMessageHide']),
    }
}
</script>
<style lang="less" scoped>
.msg-info {
    position: fixed;
    bottom: 10%;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 1025;
    box-sizing: border-box;
}

.msg-info span {
    display: inline-block;
    background: rgba(0, 0, 0, .6);
    color: #fff;
    padding: 0.08rem 0.15rem;
    border-radius: 5px;
    word-wrap: break-word;
    text-align: center;
    word-break: break-all;
    max-width: 80%;
    line-height: 0.23rem;
    transition: all 1s;
}

.ng-c-msg-transition {
    transition: all 1s;
    opacity: 1;
}

.ng-c-msg-enter,
.ng-c-msg-leave {
    opacity: 0;
}
</style>
