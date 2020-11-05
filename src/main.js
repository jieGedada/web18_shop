import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
//引入全局的样式
import './assets/css/global.css'
//引入iconfont.css
import './assets/icon/iconfont.css'
//引入axios
import axios from 'axios'
//设置请求的基准路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.config.productionTip = false
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
