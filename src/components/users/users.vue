<template>
<el-card class="box-card">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2 搜索-->
    <el-row class="searchRow">
        <el-col>
            <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="success">添加用户</el-button>
        </el-col>
    </el-row>
    <!-- 3表格 -->
    <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index"  label="#" width="60">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="phone" label="电话">
        </el-table-column>
        <el-table-column prop="email" label="创建时间">
        </el-table-column>
        <el-table-column prop="email" label="用户状态">
        </el-table-column>
        <el-table-column prop="email" label="操作">
        </el-table-column>
    </el-table>
    <!-- 4 分页-->
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: "",
            // 以下两条为假数据，本来是后台传递的值
            pageNum:1,
            pageSize:3,
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }]
        }
        
    },
  created() {
    //   也可以用mounted方法
    this.getUserList()
  },
    methods: {
        async getUserList(){
            /*
            请求数据
                query 查询参数 可以为空
                pageNum 当前页码 不能为空
                pageSize 每页显示条数 不能为空
                设置请求头
            */ 
           const AUTH_TOKEN=localStorage.getItem("token")
           this.$http.defaults.headers.common["Authorization"]=AUTH_TOKEN
           const res=await this.$http.get(`users?query=${this.query}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`)
           console.log(res)
        }
    },
}
</script>

<style>
.box-card {
    height: 100%;
}

.inputSearch {
    width: 300px;
}

.searchRow {
    margin-top: 20px;
}
</style>
