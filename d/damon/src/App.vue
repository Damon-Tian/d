<template>
  <div id="app">
        <headers></headers>
        <music></music>
        <div class="content">
            <transition appear  name="fade">
                <router-view/>
            </transition>
        </div>
  </div>
</template>

<script>
import headers from './components/header'
import music from './components/music'
export default {
    name: 'App',
    components:{
        headers,music
    },
    mounted() {

    },  
}
</script>

<style scoped>
.content{   
    width: 1198px;
    display: block;
    margin: 0 auto;
    padding-top: 20px;
    position: relative;
}
 .fade-enter-active{
    transition: all .7s ease
}
.fade-enter{
    opacity: 0;
    transform: translateY(50px)
}

</style>
