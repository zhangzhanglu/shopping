import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import api from "./api"
import VueUeditorWrap from 'vue-ueditor-wrap'
import './plugins/element.js'
import "./assets/css/common.css"

Vue.component('vue-ueditor-wrap', VueUeditorWrap)
Vue.prototype.$api = api
Vue.config.productionTip = false

// 本地是否存在数据
if(localStorage.getItem("token")){
  store.commit("loginModule/setToken",localStorage.getItem("token"));
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
