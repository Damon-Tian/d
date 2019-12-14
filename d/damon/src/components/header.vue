<template>
    <div id="headers">
        <div class="bodys">
            <div v-for="(item,index) in titleData" >
                <el-popover
                    width="200"
                    trigger="hover"
                    >
                    <span slot="reference">{{item.name}}</span>
                    <slot >
                        <div v-if="index == 0" class="contents">
                            <router-link to="/">Logs</router-link>
                            <router-link to="/photo">Photo</router-link>
                        </div>
                        <div v-if="index == 1" class="contents">
                            <p>```明日```</p>
                            <p>```今日```</p>
                        </div>
                        <div v-if="index == 2" class="contents">
                            <p>```末日```</p>
                            <p>```明日```</p>
                        </div>
                    </slot>
                </el-popover>
            </div>
        </div>
        <div class="backs">

        </div>
        <div class="blacks"></div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            titleData:[
                {name:'SomeThing',content:'white'},
                {name:'Waiting~~',content:'black'},
                {name:'Loading~~',content:'red'}
            ]
        }
    },
    methods: {
    },
}
</script>

<style lang="less">
.el-popover{
    padding: 10px;
    width: 50px;
}
.contents{
    margin: 0;
    padding: 0;
    p,a{
        margin: 0;
        padding: 10px;
        transition: all .3s;
        &:hover{
            background-color: gainsboro
        }
        &:active,&:visited,&:link{
            color: #666
        }
    }
    a{
        display: block;
        text-decoration: none
    }
}
.hoverBlock{
    border: 1px solid #fff;
    position: absolute;
    padding: 10px;
    border-radius: 2px;
    background-color: #fff;
    pointer-events: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
    &::before{
        content: "";
        width: 0px;
        height: 0px;
        border-top: 10px solid transparent;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom:15px solid #fff;
        position: absolute;
        left: 50%;
        top: -20px;
        transform: translateX(-50%);
    }
    &:hover{
        display: block;
    }
}
#headers{
    width: 100%;
    height: 9vw;
    min-height: 150px;
    .bodys{
        height: 40px;
        line-height: 40px;
        text-align: center;
        text-shadow: 0 1px 1px rgba(0,0,0,.3);
        color: #fff;
        font-size: 14px;
        background-color: transparent;
        z-index: 2;
        &>div{
            display: inline;
            span{
                margin: 0 10px;
                cursor: pointer;
            }
        }
    }
    .backs{
        z-index: -1;
        position: absolute;
        top: 0;
        height: 9vw;
        min-height: 150px;
        background-image: url('https://watermelon-object.oss-cn-shenzhen.aliyuncs.com/image/0d53dd89b02269319127c076d59c297.png');
        background-position: center;
        background-repeat:no-repeat;
        width: 100%;
        background-size: cover
    }
    .blacks{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100px;
        background:linear-gradient(rgba(0,0,0,.5),transparent);
        z-index: -1;
    }
}
</style>