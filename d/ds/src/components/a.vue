<template>
  <div>
        <el-card class="box-card">
            <div class="pubu">
                <div class="column">
                    <img @click="bigImg(item)" :data-origin="'./static/img/'+item+'.jpg'" src="../../static/img/loading.gif" alt= "" v-for="(item,index) in data1" :key="index">
                </div>
                <div class="column">
                    <img @click="bigImg(item)" :data-origin="'./static/img/'+item+'.jpg'" src="../../static/img/loading.gif" alt= "" v-for="(item,index) in data2" :key="index">
                </div>
                <div class="column">
                    <img @click="bigImg(item)" :data-origin="'./static/img/'+item+'.jpg'" src="../../static/img/loading.gif" alt= "" v-for="(item,index) in data3" :key="index">
                </div>
            </div>
        </el-card>
        <showImg :src='showSrc' :show.sync='bigImgShow'></showImg>
  </div>
</template>

<script>
import {jieliu} from '../util/index'
import showImg from './showImg'
export default {
  name: '',
  components:{
      showImg
  },
  data () {
    return {
        bigImgShow:false,
        showSrc:'../../static/img/1.jpg',
        data1:[],
        data2:[],
        data3:[]
    }
  },
  mounted() {
      for(let i=0;i<11;i++){
          let x = i%3;
          if(x==0){
              this.data1.push(i+1);
          }else if(x==1){
              this.data2.push(i+1)
          }else if(x==2){
              this.data3.push(i+1)
          }
      }
      setTimeout(() => {
          this.lazyLoad();
      }, 0);
      window.addEventListener('scroll',jieliu(200,this.lazyLoad));
  },
  methods: {
      bigImg(item){
          this.showSrc =require(`../../static/img/${item}.jpg`);
          this.bigImgShow = true;
      },
      lazyLoad(){
          let clientHeight = document.documentElement.clientHeight;
          let scrollTop = document.documentElement.scrollTop;
          let imgs = document.getElementsByTagName('img');
          for(let i=0; i<imgs.length;i++){
              if(imgs[i].getBoundingClientRect().top < clientHeight+scrollTop){
                  let im = imgs[i].getAttribute('data-origin');
                  if(im != null){
                    imgs[i].setAttribute('src',im);
                  }
              }
          }
      }
  },
}
</script>

<style scoped lang='less'>
img{
    width: 100%
}
.pubu{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .column{
        flex-basis: 32%;
        display: flex;
        flex-direction: column;
        img{
            padding: 10px;
            transition: all .3s;
            &:hover{
                transform: scale(1.2);
            }
        }
    }
}
</style>
