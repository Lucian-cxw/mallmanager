<template>
<el-container class="container">
    <el-header class="header">
        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <img src="../../assets/logo.png" alt="无法显示文件">
                </div>
            </el-col>
            <el-col :span="18" class="middle">
                <h3>电商管理系统</h3>
            </el-col>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <!-- <a href="#" class="loginout">退出</a> -->
                    <a  href="#" class="loginout" @click="handleSigout()">退出</a>

                </div>
            </el-col>
        </el-row>
    </el-header>
    <el-container> 
        <!-- 侧边栏导航组件 -->
        <el-aside class="aside" width="200px">
            <el-menu :unique-opened="true"
            :router="true">
            <!-- 开启路由模式 -->
                <!-- 1 -->
                <el-submenu index="1">
                      <!-- <template slot="title">分组一</template> -->
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>用户管理</span>  
                    </template>   
                       <el-menu-item index="users">
                           <i class="el-icon-menu"></i> 
                           用户列表</el-menu-item>            
                </el-submenu>
                <!-- 2 -->
                  <el-submenu index="2">
                      <!-- <template slot="title">分组一</template> -->
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>权限管理</span>  
                    </template>   
                       <el-menu-item index="1-1">
                           <i class="el-icon-menu"></i> 
                           角色管理</el-menu-item>    
                            <el-menu-item index="1-1">
                           <i class="el-icon-menu"></i> 
                           权限列表</el-menu-item>           
                </el-submenu>
                <!-- 3 -->
                  <el-submenu index="3">
                      <!-- <template slot="title">分组一</template> -->
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>商品管理</span>  
                    </template>   
                       <el-menu-item index="1-1">
                           <i class="el-icon-menu"></i> 
                           商品列表</el-menu-item>     
                           <el-menu-item index="1-1">
                           <i class="el-icon-menu"></i> 
                           分类参数</el-menu-item>  
                           <el-menu-item index="1-1">
                           <i class="el-icon-menu"></i> 
                           商品分类</el-menu-item>         
                </el-submenu>
                <!-- 4 -->
                  <el-submenu index="4">
                      <!-- <template slot="title">分组一</template> -->
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>订单管理</span>  
                    </template>   
                       <el-menu-item index="1-1">
                           <i class="el-icon-menu"></i> 
                           订单列表</el-menu-item>            
                </el-submenu>
                <!-- 5 -->
                  <el-submenu index="5">
                      <!-- <template slot="title">分组一</template> -->
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>数据统计</span>  
                    </template>   
                       <el-menu-item index="1-1">
                           <i class="el-icon-menu"></i> 
                           数据报表</el-menu-item>            
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-main class="main">
            <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
export default {
    beforeCreate() {
        /*
            判断是否具有token值，有则渲染组件，无则返回登录页面验证
            因此，在判断的时候，组件没渲染，需要写在mounted 之前的生命周期函数中
        */ 
       const token=localStorage.getItem("token")
       if(!token){
           this.$router.push({name:"login"})
       }
    },
    methods: {
        handleSigout(){
            // 1清除token
            localStorage.clear()
            // 2提示退出
             this.$message.success("退出成功")
            // 3跳转到login页面
            this.$router.push({name:"login"})
        }
    },
    


}
</script>

<style>
.container {
    height: 100%;
}

.header {
    background-color: #b3c0d1;
}

.aside {
    background-color: #d3dce6;
}

.main {
    background-color: #e9eef3;
    height: 100%;
}

/* 头部样式 */
.middle {
    text-align: center;
}

.loginout {
    line-height: 60px;
    text-decoration: none;
}
</style>
