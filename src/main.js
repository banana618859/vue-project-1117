/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-11-17 21:34:10
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-11-18 11:05:18
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

// 引入样式
import './assets/main.css'

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios

// 基础路径
window.baseUrl= '';
console.log('process:',Vue.config);
if(!Vue.config.productionTip){
  window.baseUrl = '/api'
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
