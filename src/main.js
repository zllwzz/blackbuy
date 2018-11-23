import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import index from './components/index'
import detail from './components/detail'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.config.productionTip = false

import "./assets/site/css/style.css";
import axios from 'axios';
Vue.prototype.$axios=axios;

import iView from 'iview';
import 'iview/dist/styles/iview.css';


Vue.use(iView);


const routes = [
  { path: '/', redirect:'/index' },
  { path: '/index', component: index },
  { path: '/detail/:artID', component: detail }

]
const router = new VueRouter({
  routes 
})
Vue.filter('shortTime', function (value) {
  return moment(value).format('YYYY年MM月DD');
})
Vue.filter('shortTimePlus', function (value) {
  return moment(value).format('YYYY/MM/DD HH:mm:ss');
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
