<template>
    <div class="qtt_table">
      <div class="filter-container">
        <el-button class="filter-item" type="primary" @click="handelCreate"  icon="edit">添加</el-button>
        <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
      </div>

      <el-table ref="multipleTable" :data="table" border tooltip-effect="dark"  style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="120">
      <template scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column prop="uid" label="会员编号" tagsable show-overflow-tooltip width="120"></el-table-column>
      <el-table-column prop="uname" label="会员名"></el-table-column>
      <el-table-column prop="phone_num" label="电话"></el-table-column>
      <el-table-column prop="email" label="电子邮件"></el-table-column>
      <el-table-column prop="rate" label="用户角色"></el-table-column>
      <el-table-column prop="real_name" label="真实姓名"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column align="center" label="操作">
      <template scope="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-button size="small" type="danger" @click="resetPwd(scope.$index, scope.row)">重置密码</el-button>
      </template>
      </el-table-column>
      </el-table>

      
      <!-- 添加信息功能的表单 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;' :rules="rules">
          <el-form-item label="会员名" prop="uname">
            <el-input v-model="form.uname"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password">
            <el-input v-model="form.password_" type="password"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone_num">
            <el-input v-model="form.phone_num"></el-input>
          </el-form-item>
          <el-form-item label="电子邮件" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="real_name">
            <el-input v-model="form.real_name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>                                                  
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>          
          <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
          <el-button type="primary" @click="resetPwd('form')">重置</el-button>
        </div>
      </el-dialog>
      <!-- 编辑信息的表单 -->
      <el-dialog title="修改用户信息" :visible.sync="dialogFormEditVisible">
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="电话">
            <el-input v-model="tableEdit.phone_num"></el-input>
          </el-form-item>
          <el-form-item label="用户角色">
            <el-input v-model="tableEdit.rate"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="tableEdit.real_name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="tableEdit.email"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="tableEdit.address"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormEditVisible = false">取 消</el-button>          
          <el-button type="primary" @click="handleEditSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 重置密码表单 -->
      <el-dialog title="重置密码" :visible.sync="dialogFormresetVisible">
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="新密码">
            <el-input v-model="newPwd" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormresetVisible = false">取 消</el-button>          
          <el-button type="primary" @click="handleResetSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
import {api} from '@/global/api.js';
import {http} from '@/global/http.js';
export default {
  data () {
    return {
      table: [],
      tableEdit: [],
      total: null,
      newPwd: '',
      dialogFormVisible: false,
      dialogFormEditVisible: false,
      dialogFormresetVisible: false,
      form: {
        uname: '',
        password: '',
        password_: '',
        phone_num: '',
        email: '',
        real_name: '',
        address: ''
      },
      rules: {
        uname: [
          { required: true, message: '请输入会员名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        password_: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { type: 'email', required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        real_name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        phone_num: [
          { required: true, message: '请输入联系方式', trigger: 'blur' }
        ]
      },
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 编辑
    handleEdit (index, row) {
      this.dialogFormEditVisible = true;
      this.tableEdit = row;
    },
    // 编辑表单的提交
    handleEditSubmit (index) {
      let this_ = this;
      http.ajaxPost(this, api.user_edit, { uid: this.tableEdit.uid, phone_num: this.tableEdit.phone_num, email: this.tableEdit.email, rate: this.tableEdit.rate, real_name: this.tableEdit.real_name, address: this.tableEdit.address }, function (data) {
        this_.dialogFormEditVisible = false;
        this_.table[index] = this_.tableEdit;
      });
    },
    handleResetSubmit (index) {
      let this_ = this;
      http.ajaxPost(this, api.reset_pwd, { uid: this.tableEdit.uid, newPwd: this.newPwd }, function (data) {
        this_.dialogFormresetVisible = false;
        this_.table[index] = this_.tableEdit;
      });
    },
    resetPwd (index, row) {
      this.dialogFormresetVisible = true;
      this.tableEdit = row;
    },
    // 选择删除
    handleDelete (index, row) {
      // 删除当前一个
      let deleteArr = [];
      if (this.multipleSelection.indexOf(row) === -1) {
        deleteArr.push(row);
      } else {
        deleteArr = this.multipleSelection;
      };
      let deleteArrId = [];
      deleteArr.forEach(function (e) {
        deleteArrId.push(e.uid);
      });
      let this_ = this;
      let newTable = [];
      http.ajaxPost(this, api.user_delete, {deleteArr: deleteArrId}, function (data) {
        this_.table.forEach(function (val) {
          if (deleteArr.indexOf(val) === -1) {
            newTable.push(val);
          }
        });
        this_.table = newTable;
      });
    },
    // 弹出添加弹窗
    handelCreate () {
      this.dialogFormVisible = true;
      this.resetForm();
    },
    // 导出为表格
    handleDownload () {
      var vm = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel');
        const tHeader = ['会员编号', '会员名', '电话', '电子邮件', '用户角色', '真实姓名', '地址'];
        const filterVal = ['uid', 'uname', 'phone_num', 'email', 'rate', 'real_name', 'address'];
        const table = vm.table;
        const data = vm.formatJson(filterVal, table);
        export_json_to_excel(tHeader, data, '用户列表');
      });
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleCreateSubmit () {
      let vm = this;
      if (vm.form.password !== vm.form.password_) {
        this.$message({
          message: '两次密码输入不一致',
          type: 'warning'
        });
        return;
      }
      http.ajaxPost(this, api.user_add, { uname: vm.form.uname, password: vm.form.password, phone_num: vm.form.phone_num, email: vm.form.email, real_name: vm.form.real_name, address: vm.form.address }, function (data) {
        if (data.code === 200) {
          vm.table.push(data.data[0]);
          vm.dialogFormVisible = false;
        }
      });
    },
    // 重置添加表单
    resetForm () {
      this.form = {
      };
    }
  },
  created () {
    // 获取所有用户
    let this_ = this;
    http.ajaxGet(this, api.user_all, {}, function (data) {
      this_.table = data.data;
    });
  }
};
</script>

<style lang="stylus-loader" rel="stylesheet/stylus" scoped>   
  .qtt_table
    padding: 10px 10px
    .filter-container
      margin-bottom:20px
    .pagination-container
      margin-top:50px
      margin-left:-5px
</style>

