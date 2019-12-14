// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import dConfrim from './components/confirm/index'

Vue.prototype.$dConfirm = dConfrim;
Vue.use(ElementUI);
Vue.config.productionTip = false
import {post,success,error,warning,get}  from './axios/axios'
import {Message} from 'element-ui'
Vue.prototype.$Message = Message
Vue.prototype.$post = post;
Vue.prototype.$success = success;
Vue.prototype.$error = error;
Vue.prototype.$warning = warning;
Vue.prototype.$get = get
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
