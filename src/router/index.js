import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld' 无用代码，删除

// 引入login包
// import Login from "../components/login/login.vue"  这样写没问题
//  以下写法为webpack 提供的@ 可以直接找到SRC文件夹
import Login from "@/components/login/login.vue" 

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   // name: 'HelloWorld', 无用代码删除
    //   // component: HelloWorld  无用代码删除 整个组件也删除了
    // }
    {
      name:"login",
      path:"/login",
      component:Login     
    }
  ]
})
