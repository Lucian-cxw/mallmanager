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
        <el-input
          placeholder="请输入内容"
          v-model="query"
          clearable
          @clear="loadUserList"
          class="inputSearch"
        >
          <el-button
            @click="searchUser"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3表格 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column label="创建时间">
        <!-- temolate内部要使用数据，设置 slot-scope=""
                该属性的值要是create_time 的数据源，即userlist数组，也可医用scope代替，相当于形参
                前提：
                    1想在el栅格中插入一个非字符串数据，如插值表达式，先用小容器template包住
                    2 由于不同组件的数据不共享，有独立的作用域，因此通过slot-scope="数据源" 属性传值，
                        数组的row属性表示数组中的每一个对象
                    3使用表达式 {{userlist.row.create_time|fmtdate}}
            -->
        <template slot-scope="userlist">
          {{ userlist.row.create_time | fmtdate }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
          @change="changeMgState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditUserDia(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
            @click="showDeleteUserMsgBox(scope.row.id)"
          ></el-button>
          <el-button
            @click="showSetUserRoleDia(scope.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4 分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮    箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电    话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户 对话框 -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮    箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电    话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

<!--分配角色对话框  -->
<el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="100px">
   {{currUsername}} 
    </el-form-item>
    <el-form-item label="角色" label-width="100px">
        {{currRoleId}}
      <el-select v-model="currRoleId" >
        <!--  value="-1" 表示值为-1 的字符串，通过：绑定后转为数字类型
              补充，当select的绑定数据的值 和 option 的value一样，就会显示该option的lablel值
              如 在data中，给currRoleId 赋值-1 name对于的option的label就显示 请选择
        -->
        <el-option label="请选择" :value="-1"></el-option>
        <!-- 通过v-for 展示请求的数据 -->
        <el-option 
        :label="item.roleName" 
        :value="item.id"
          v-for="(item,i) in roles " :key="i"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
    <el-button type="primary" @click="setRoke()">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      // 以下用于接受后台返回的数据
      userlist: [],
      pageNum: 1,
      pageSize: 2,
      total: 32,
      //   添加对话框属性
      dialogFormVisibleAdd: false,
      // 编辑用户对话框 显示属性
      dialogFormVisibleEdit: false,
      // 显示分配角色对话框
      dialogFormVisibleRol:false,
      formLabelWidth: "100px",
      // 用户状态
      //   添加用户的表单数据
      form: {
        // 密码 用户名不能为空
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      currUsername:"",
      // 用户角色
      currRoleId:-1,
      // 当前用户id
      currUserId:-1,
      // 保存用户角色分类
      roles:[]
    };
  },
  created() {
    //   也可以用mounted方法
    this.getUserList();
  },
  methods: {
    // 分配角色，修改用户角色
    async setRoke(){
      // users/:id/role
     const res=await this.$http.put(`users/${this.currUserId}/role`,{rid:this.currRoleId})
      // console.log(res.data)
      if(res.data.meta.status==200){
        this.$message.success(res.data.meta.msg)
      }
      this.dialogFormVisibleRol=false
    },
    // 分配 角色显示
    async showSetUserRoleDia(user){
      this.currUsername=user.username
      // 获取当前用户的id，将值传递给serRole（）方法，用于提交修改用户id
      this.currUserId=user.id
      //获取所有角色种类 请求路径roles
      const res1= await this.$http.get(`roles`)
      this.roles=res1.data
      // console.log(this.roles)
      // 获取用户角色 rid users/:id
      const res= await this.$http.get(`users/${user.id}`)
      this.currRoleId=res.data.rid
      // 打开对话框
      this.dialogFormVisibleRol=true 
    },
    // 修改状态
   async changeMgState(user){
    //  1 mg_state =false 默认
    // 2点开关 mg_state=true
      // 请求路径 users/:uId/state/:type  uId为用户id type 为布尔值
      const res=await this.$http.put(`users/${user.id}/state/${user.mg_state}`)

      // if(res.data.meta.status==200){
      //   this.$message.success(res.data.meta.msg)
      // }
    },
    // 提交 编辑用户信息
    async editUser(){
      const res=await this.$http.put(`users/${this.form.id}`,this.form)
      // this.form.id 由于显示编辑对话框时调用 showEditUserDia， this.form=user ，因此id就在form中
      // 1关闭对话框
      this.dialogFormVisibleEdit=false
      // 2更新用户数据
      this.getUserList()
      // 提示成功信息
      if(res.data.meta.status===200){
         this.$message.success(res.data.meta.msg);
      }else{
        this.$message.success(res.data.meta.msg);
      }
    },
    // 编辑用户
    showEditUserDia(user){
      // 获取用户数据
      this.form=user
      // 显示编辑对话框
      this.dialogFormVisibleEdit=true
    },
    // 删除用户
    showDeleteUserMsgBox(userId) {
      this.$confirm("是否删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${userId}`);
          // user id来源：data中找 或者通过showDeleteUserMsgBox（） 参数传递
          //   <template slot-scope="scope"> 中的scope 就等同于userlist，在userlist下有用户的id
          if (res.data.meta.status === 200) {
            // 更新视图
            if(this.userlist.length>1){
               this.getUserList();
              //  console.log("正常，页数不减1")
            }else {
              if(this.pageNum>1){
                 this.pageNum-=1
                 this.getUserList();
              }else{
                this.getUserList()
              }
            }
            this.$message({
              type: "success",
              message: res.data.meta.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加用户
    async addUser() {
      const res = await this.$http.post("users", this.form);
      // console.log(res);
      const {
        meta: { status, msg },
      } = res.data;
      if (status === 201) {
        // 1提示成功
        this.$message.success(msg);
        // 2关闭对话框
        this.dialogFormVisibleAdd = false;
        // 3更新页面
        this.getUserList();
        // 4清空文本框
        this.form = {};
      } else {
        this.$message.warning(msg);
      }
    },
    //   添加用户-显示对话框
    showAddUserDia() {
      // 由于form会多次使用，因此确保填写前，其文本被清空
      this.form={}
      this.dialogFormVisibleAdd = true;
    },
    loadUserList() {
      // 清空搜索框，重新获取数据
      this.getUserList();
    },
    searchUser() {
      this.getUserList();
    },
    // 分页相关的两个方法
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.pageNum = 1;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      console.log(`当前页: ${val}`);
      this.getUserList();
    },
    async getUserList() {
      /*
            请求数据
                query 查询参数 可以为空
                pageNum 当前页码 不能为空
                pageSize 每页显示条数 不能为空
                设置请求头
            */
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`
      );
      //   console.log(res.data);

      const {
        meta: { status, msg },
        data: { users, total },
      } = res.data;
      //  console.log(msg,total,status,users)
      if (status === 200) {
        //    1.给表格赋值
        this.userlist = users;
        for(let i=0;i<this.userlist.length;i++){
          // 由于数据库终不能保存布尔类型数据，因此传给前端的true 为字符串类型，而控制用户状态需要的是一个布尔类型数据，因此需要转类型
          this.userlist[i].mg_state= this.userlist[i].mg_state=="true"? true:false
          // console.log(this.userlist[i].mg_state,typeof(this.userlist[i].mg_state))
        }

        //  2 给total 赋值
        this.total = total;
        // 3提示
        this.$message.success(msg);
        // console.log(this.total);
      } else {
        //    提示
        this.$message.warning(msg);
      }
    },
  },
};
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
