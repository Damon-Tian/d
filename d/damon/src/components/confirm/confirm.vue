<template>
    <transition name="fade">
        <div class="d" v-if="show" >
            <!-- <div @mouseenter="stopTimer" @mouseout="goonTimer"> -->
            <div>
                <div class="header">
                    删除
                </div>
                <div class="content">
                    确认删除吗
                </div>
                <div class="buttons">
                    <span class="confirm" @click="confirm">确定</span>
                    <span class="cancel" @click="close">取消</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            show:false,
            timer:''
        };
    },
    methods: {
        showBlock(){
            this.show = true;
            return new Promise((resolve,reject)=>{
                this.resolve = resolve;
                this.reject = reject;
            })
        },
        confirm(){
            this.resolve('success');
            this.hide();
        },
        close(){
            this.reject('failed');
            this.hide();
        },
        stopTimer(){
            clearTimeout(this.timer);
        },
        goonTimer(){
            this.timer = setTimeout(() => {
                this.show=false
            }, this.duration);
        },
        hide(){
            this.show=false;
            document.body.removeChild(this.$el);  
            this.$destroy();
        }
    },
    mounted() {
        this.goonTimer();
    },
    }
</script>
<style lang='less' scoped>
.fade-enter,.fade-leave-to{
    opacity: 0;
    transform: translateY(-100%);
}
.fade-enter-active,.fade-leave-active{
    transition: all .3s;
}
.d{
    position: fixed;
    top: 5%;
    width: 100%;
    text-align: center;
    &>div{
        display: inline-block;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    }
    .header{
        text-align: center;
    }
    .content{
        padding: 60px;
        text-align:center;
    }
    .buttons{
        text-align: center;
        span{
            display: inline-block;
            padding: 3px 6px;
        }
        .confirm{
            background-color: greenyellow;
        }
        
    }
}
</style>