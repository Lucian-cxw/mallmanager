<template>
<div class="login-wrap">
    <el-form class="login-form "
    label-position="top" 
    label-width="80px" 
    :model="formdata">
     <h2>用户登录</h2>
        <el-form-item label="用户名">
            <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-button 
        @click.prevent="handleLogin()"
        type="primary" class="login-btn">提交</el-button>
    </el-form>
</div>
</template>

<script>
export default {
    data() {
        return {
            formdata:{
                username:"",
                password:""
            },
        }     
    },
    methods:{
          /* 
          handleLogin(){
         
            // 因为在http.js中设置了基准url，所以一下面路径可以写login不用补全
            this.$http.post("login",this.formdata)
            .then((res)=>{  
                const {status,data}=res       
              
                    // const {data,meta:{msg,status}}=res.data
                    // 选择不清楚如何设置meta，以后再说
              
               if(status===201){
                    // console.log(data)
                    // 1跳转home页面
                    this.$router.push({name:"home"})
                // 2如果输入错误账号密码，给出提醒
                     this.$message.success('登录成功');
               } else{
                    this.$message.warning('登录失败');
               }
              
            })        
        }
        */  
        // await +async 同步化异步代码
        async handleLogin(){
           const res = await this.$http.post("login",this.formdata)
            
            const {data:{token},meta:{msg,status}}=res.data
            

            if(status===201){
                // 跳转页面前，下保存token值
                localStorage.setItem("token",token)  
                this.$message.success(msg)
                this.$router.push({name:"home"})
            } else{
                this.$message.warning(msg);
            }
                  
        }
         
    },
}
</script>

<style >
    .login-wrap{
        height: 100%;
        background-color: #324152;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-wrap .login-form{
        width: 400px;
        background-color: #fff;
        border-radius: 5px;
        padding: 30px;
    }
</style>
