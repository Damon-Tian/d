<template >
<div style="transition:all .3s">
    <el-card class="box-card" >
        <div>
            <span class="userTime">{{item.gmtCreate}}</span>
            <span class="userName">{{item.userName}}</span>
        </div>
        <pre>{{item.content}}</pre>

        <div class="logo">
            <img @click="lookForComments($event)"  src="../../static/img/comment.png" title="评论" alt="">
        </div>


        <transition name="fade">
            <div class="comments" v-if="commentShow">
                <p v-if="commentLoading">数据加载中~~~</p>
                <div v-else>
                    <comment @getData='lookForComments'  :blogId='id' :datas='commentData'></comment>
                </div>
            </div>
        </transition>




    </el-card>
    </div>
</template>


<script>
var comment = {
    props:['datas','blogId'],
    template:`
        <div>
            <p style='display:flex;align-items:center'>
                <span style='width:80px'>评论：</span>
                <el-input v-model='content' style='flex:2;margin-right:10px' size='small'></el-input>
            </p>
            <p style='display:flex;align-items:center'>
                <span  style='width:80px'>你的昵称：</span>
                <el-input v-model='userName' style='flex:2;margin-right:10px' size='small'></el-input>
                <el-button size='small' type='warning' round  @click='confirm'>确认</el-button>
            </p>
            <p v-if="datas.length == 0" style='text-align:center'>做第一个评论者吧~~~</p>
            <template v-else>
                    <div  v-for='(item,index) in datas' style='display:flex;padding:10px 0 20px;position:relative'>
                        <img :src='"./../static/img/people/"+Math.ceil(Math.random()*16)+".png"'  style='width:40px;height:40px;border-radius:50%;padding:10px'>
                        <div style='display:flex;flex-direction:column;position:relative;top:8px;border-bottom:1px solid gainsboro;flex:2;position:relative'>
                            <p style='color:gray'>{{item.userName}}</p>
                            <p style='color:black'>{{item.content}}</p>
                            <p style='color:gray;font-size:12px'>{{item.gmtCreate}}</p>
                            <div style='text-align:right;height:10px;position:relative;top:-27px'>
                                <img style='width:20px;cursor:pointer' @click="reply(item)"  src="../../static/img/comment.png" title="回复" alt="">
                            </div>

                            <div v-if='item.subset' style='background-color:rgba(0,0,0,.1);margin-bottom:10px'>
                                <div  v-for='(itemx,indexx) in item.subset' style='display:flex;padding:10px 0 20px;position:relative'>
                                    <img :src='"./../static/img/people/"+Math.ceil(Math.random()*16)+".png"' style='width:40px;height:40px;border-radius:50%;padding:10px'>
                                    <div style='display:flex;flex-direction:column;position:relative;top:8px;flex:2;position:relative'> 
                                        <p style='color:gray'>{{itemx.userName}}</p>
                                        <p style='color:black'>{{itemx.content}}</p>
                                        <p style='color:gray;font-size:12px'>{{itemx.gmtCreate}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </template>
        </div>
    `,
    data() {
        return {
            content:'',
            userName:'',
            id:'',
            imgs:[require('../../static/img/1.jpg'),require('../../static/img/2.jpg'),require('../../static/img/3.jpg')],
            replyName:'',
        }
    },
    mounted() {
        console.log(this.datas);
    },
    methods: {
        reply(item){
            // this.id = item.id;
            this.content = `回复 ${item.userName} :`;
            this.replyName = item.userName;
        },
        confirm(){
            let that = this,rContent='';
            let parentId='' ;
            if(this.content[0] == '回'){
                rContent = this.content.split(`回复 ${this.replyName} :`)[1];
                parentId = this.datas.find(item=>item.userName == that.replyName).id;
            }else{
                rContent=this.content;
            }
            this.$post('/comment/save',{parentId,content:rContent,userName:this.userName,blogId:this.blogId}).then(res=>{
                that.$success('评论成功！');
                that.$parent.$parent.commentShow = false;
                that.$emit('getData');
                that.$parent.commentShow = true;
                that.id='';
                that.content = '';
                that.userName = '';
            })
        }
    },
}
export default {
    props:['item'],
    data() {
        return {
            data1:'',
            commentData:'loadig',
            commentShow:false,
            commentLoading:true,
            id:this.item.id,
        }
    },
    components:{
        comment,
    },
    methods: {
        lookForComments(e){
            let that = this;
            this.commentShow = !this.commentShow;
            if(!this.commentShow){
                this.commentLoading = true;
            }else{
                this.$get('/comment/list_all?blogId='+this.id)
                .then(res=>{
                    that.commentData = res.data.data;
                    that.$nextTick(()=>{that.commentLoading = false})
                })
            }
        }
    },
}
</script>

<style lang="less" scoped>
pre {
    white-space: pre-wrap;       /* css-3 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
    word-break:break-all;
    overflow:hidden;
}
.userName{
    position: absolute;
    right: 20px;
    font-weight: 700;
    font-size: 16px;
}
.userTime{
    font-weight: 700;
    font-size: 16px
}
.logo{
    text-align: right;
    img{
        cursor: pointer;
        width: 23px;
    }
}
.fade-enter,.fade-leave-to{
    transform: translateY(-20px);
    opacity: 0;
}
.fade-enter-active,.fade-leave-active{
    transition: all .3s;
}
</style>