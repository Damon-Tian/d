import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/a'
import B from '@/components/b'
Vue.use(Router)

export default new Router({
    mode:'history',
  routes: [
    {
        path:'/',
        name:'b',
        component:B
    },
    {
      path: '/photo',
      name: 'HelloWorld',
      component: HelloWorld
    },
    
  ]
})
