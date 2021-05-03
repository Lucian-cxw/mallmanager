// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MyHttpServer from '@/plugins/http.js'
// 使用element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "@/assets/css/reset.css"

// 导入moment 包
import moment from "moment"

Vue.use(ElementUI)
Vue.use(MyHttpServer)

Vue.config.productionTip = false

/* eslint-disable no-new */

// 编写全局过滤器，处理日期格式
Vue.filter("fmtdate",(v)=>{
    return moment(v).format('YYYY-MM-DD')
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
