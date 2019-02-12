<template>
    <div class="qtt_table">
      <div class="filter-container">
        <el-button class="filter-item" type="primary" @click="handelCreate"  icon="edit">添加</el-button>
        <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
        <p class="tips">root为最高用户</p>
      </div>

      <el-table ref="multipleTable" :data="table" border tooltip-effect="dark"  style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="120">
      <template scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column prop="admin_id" label="管理员编号" tagsable show-overflow-tooltip width="120"></el-table-column>
      <el-table-column prop="admin_name" label="姓名"></el-table-column>
      <el-table-column prop="permissions" label="权限"></el-table-column>
      <el-table-column align="center" label="操作">
      <template scope="scope">
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" v-if="scope.row.permissions!==1">删除</el-button>
      </template>
      </el-table-column>
      </el-table>

      
      <!-- 添加信息功能的表单 -->
      <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;' :rules="rules">
          <el-form-item label="姓名" prop="admin_name">
            <el-input v-model="form.admin_name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password">
            <el-input v-model="form.password_" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>          
          <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
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
        admin_name: '',
        password: '',
        password_: '',
        phone_num: '',
        permissions: '',
        real_name: '',
        address: ''
      },
      rules: {
        admin_name: [
          { required: true, message: '请输入姓名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        password_: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        permissions: [
          { type: 'permissions', required: true, message: '请输入邮箱', trigger: 'blur' }
        ]
      },
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    handleResetSubmit (index) {
      let this_ = this;
      http.ajaxPost(this, api.reset_pwd, { admin_id: this.tableEdit.admin_id, newPwd: this.newPwd }, function (data) {
        this_.dialogFormresetVisible = false;
        this_.table[index] = this_.tableEdit;
      });
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
        deleteArrId.push(e.admin_id);
      });
      let this_ = this;
      let newTable = [];
      http.ajaxPost(this, api.admin_delete, {deleteArr: deleteArrId}, function (data) {
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
        const tHeader = ['管理员编号', '姓名', '权限'];
        const filterVal = ['admin_id', 'admin_name', 'permissions'];
        const table = vm.table;
        const data = vm.formatJson(filterVal, table);
        export_json_to_excel(tHeader, data, '管理员列表');
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
      http.ajaxPost(this, api.admin_add, { admin_name: vm.form.admin_name, password: vm.form.password, phone_num: vm.form.phone_num, real_name: vm.form.real_name, address: vm.form.address }, function (data) {
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
    // 获取所有管理员
    let this_ = this;
    http.ajaxGet(this, api.admin_all, {}, function (data) {
      this_.table = data.data;
    });
  }
};
</script>

<style lang="stylus-loader" rel="stylesheet/stylus" scoped>   
  .tips
    color:#ff4949
    font-size:13px
  .qtt_table
    padding: 10px 10px
    .filter-container
      margin-bottom:20px
    .pagination-container
      margin-top:50px
      margin-left:-5px
</style>

