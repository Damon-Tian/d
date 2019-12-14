<template>
    <div>
        <transition name="list">
            <div  v-if="!writing">
                <div  class="writeBlog">
                    <span @click="writing=true">写点什么吧  </span>
                </div>
                    <div  class="pubu">
                        <div ref='first'>
                            <div  v-for="(item,index) in blogList[0]" >
                                <blog-block 
                                :item='item'
                                ></blog-block>
                            </div>
                        </div>
                        <div ref='second'>
                            <div v-for="(item,index) in blogList[1]" >
                                <blog-block 
                                :item='item'
                                ></blog-block>
                            </div>
                        </div>
                        <div  ref='third'>
                            <div v-for="(item,index) in blogList[2]" >
                                <blog-block 
                                :item='item'
                                ></blog-block>
                            </div>
                        </div>
                    </div>
            </div>
        </transition>
    <transition name="write"  >
        <div class="writing" v-show="writing">
            <div class="backs">
                <img :src="item" alt="" v-for="item in fruits">
            </div>
            <div @click="createConfirm">打开弹框</div>
            <div id="particles-js">
            </div>
            <el-card class="box-card  " >
                <div class="wrtingBlock" >
                    <span>你的昵称 ~~~~~</span>
                    <el-input style="width:60%" v-model="name"></el-input>
                </div>

                <div  class="wrtingBlock" style="display:flex;justify-content:center">
                    <span>你想写些什么 ~~</span>
                    <el-input type='textarea' style="width:60%;" :rows=15  resize='none' v-model="content"></el-input>
                </div>

                <div  class="wrtingBlock" >
                    <span> </span>
                    <div style="width:60%;display:inline-block;z-index:10;position:relative">
                        <el-button size='small' type='warning' @click="save">确认</el-button>
                        <el-button size='small' type='info' plain @click="writing = false">取消</el-button>
                    </div>
                </div>
            </el-card>
        </div>
    
    </transition>

    </div>
</template>

<script>
import particles from 'particles.js'
import blogBlock from './blogBlock'
import particalesJson from '../../static/js/particales/particles.json'
export default {
    data() {
        return {
            blogList:[[],[],[]],
            writing:false,
            name:'',
            content:'',
            fruits:[],
        }
    },
    components:{
        blogBlock
    },
    mounted() {
        this.getList();
        for(let i=0;i<10;i++){
            let index = Math.ceil(Math.random()*10);
            this.fruits.push(require(`../../static/img/fruit/${index}.png`));
        }
    },
    watch:{
        writing(){
            if(this.writing == true){
                setTimeout(() => {
                    particlesJS('particles-js',particalesJson);
                }, 200);
            }
        }
    },
    methods: {
        createConfirm(){
            this.$dConfirm(2000).then(res=>{
                console.log(res)
            }).catch(
                res=>{console.log(res)}
            );
        },
        getList(){
            let that = this;
            //如要分页   当前页curPage   每页数量limit  
            this.blogList = [[],[],[]];
            this.$get('/blog/list_all')
            .then((res)=>{
                let  i = 0;
                showFall();
                function showFall(){
                    if(i>=res.data.data.length){
                        return;
                    }
                    let origin = that.$refs.first.offsetHeight<=that.$refs.second.offsetHeight?that.$refs.first:that.$refs.second;
                    let final = origin.offsetHeight<=that.$refs.third.offsetHeight?origin:that.$refs.third;
                    for(let v in that.$refs){
                        if(that.$refs[v] == final){
                            if(v == 'first'){
                                that.blogList[0].push(res.data.data[i]);
                            }else if(v == 'second'){
                                that.blogList[1].push(res.data.data[i]);
                            }else{
                                that.blogList[2].push(res.data.data[i]);
                            }
                        }
                    }
                    i++;
                    that.$nextTick(()=>{showFall()})
                }
            })
        },
        save(){
            let that = this;
            this.$post('/blog/save',{userName:this.name,content:this.content})
            .then((res)=>{
                that.$success('上传成功');
                that.writing = false;
                that.getList();
            })
        }
    },
}
</script>


<style lang="less" scoped>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
}
.list-enter,.list-leave-to{
    opacity: 0;
    transform: translateX(-50%);
}
.list-enter-active,.list-leave-active{
    transition: all .3s;
}
.write-enter,.write-leave-to{
    transform: translateX(50%);
    opacity: 0;
}
.write-enter-active,.write-leave-active{
    transition: all .3s;
}
.writeBlog{
    z-index: 9999;
    // overflow: hidden;
    height: 40px;
    padding-bottom: 10px;
    span{
        display: inline-block;
        position: absolute;
        right: 0;
        top: -30px;
        line-height: 80px;
        border-radius: 50%;  
        text-align: center;
        width: 80px;
        height: 80px;
        // box-shadow: 0 2px 4px rgba(0, 0, 0, .32);
        // padding: 8px 10px;
        // border-radius: 3px;
        transition: all .3s;
        cursor: pointer;
        background-color: #F56C6C;
        color: white;
        &:hover{
            padding: 10px;
            background-color: lighten(#F56C6C,10%)
        }
    }
}
.writing{
    position: absolute;
    width: 100%;
    top: 40px;  
    .wrtingBlock{
        padding: 10px;
        text-align: center;
        span{
            display: inline-block;
            width: 30%;
        }
    }
    .backs{
        position: absolute;
        bottom: 0;
        left: 5%;
        img{
            width: 50px
        }
    }
}
.pubu{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
    &>div{
        width: 32%;
        display: flex;
        flex-direction: column;
        &>div{
            position: relative;
            transition: all .2s;
            margin-bottom: 10px;
            &:hover{
                box-shadow: 0 2px 10px rgba(0, 0, 0, .22);
            }
        }
    }
}
</style>