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
    <el-table :data="userlist" style="width: 100%">
        <el-table-column type="index" label="#" width="60">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="80">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column label="创建时间">
            <!-- temolate内部要使用数据，设置 slot-scope=""
                该属性的值要是create_time 的数据源，即userlist数组，也可医用scope代替，相当于形参
                前提：
                    1想在el栅格中插入一个非字符串数据，如插值表达式，先用小容器template包住
                    2 由于不同组件的数据不共享，有独立的作用域，因此通过slot-scope="数据源" 属性传值，
                        数组的row属性表示数组中的每一个对象
                    3使用表达式 {{userlist.row.create_time|fmtdate}}
            -->
            <template slot-scope=" userlist">
                {{userlist.row.create_time|fmtdate}}
            </template>
        </el-table-column>
        <el-table-column label="用户状态">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="">
                <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
                <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
                <el-button size="mini" plain type="success" icon="el-icon-check" circle></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 4 分页-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
    :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" 
    layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            query: "",
            // 以下用于接受后台返回的数据
            userlist: [],
            pagenum: 1,
            pagesize: 2,
            tatol: 32
        }

    },
    created() {
        //   也可以用mounted方法
        this.getUserList()
    },
    methods: {
        // 分页相关的两个方法
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        async getUserList() {
            /*
            请求数据
                query 查询参数 可以为空
                pageNum 当前页码 不能为空
                pageSize 每页显示条数 不能为空
                设置请求头
            */
            const AUTH_TOKEN = localStorage.getItem("token")
            this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN
            const res = await this.$http.get(`users?query=${this.query}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`)
            //    console.log(res.data)

            //    const {meta:{staus,msg},data:{users,total}}=res.data

            // 以下5个为假数据
            var status = 200
            var users = res.data
             var total1= 32
             
            var msg0 = "获取数据库失败"
            var msg1 = "获取数据库成功"

            if (status === 200) {
                //    1.给表格赋值
                this.userlist = users
                //  2 给total 赋值
                this.total = total1
                // 3提示
                this.$message.success(msg1)
            } else {
                //    提示
                this.$message.warning(msg0)
            }
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
