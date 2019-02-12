<template>
    <div class="qtt_table">
  <el-table
    :data="table"
    style="width: 100%" @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column label="序号" width="120">
      <template scope="scope">{{ scope.$index+1 }}</template>
    </el-table-column>
<!--     <el-table-column
      label="编号">
      <template slot-scope="scope">
      {{ scope.row.adv_id }}
      </template>
    </el-table-column> -->
    <el-table-column
      label="类型">
      <template slot-scope="scope">
        <span style="margin-left: 10px" v-if="scope.row.adv_type===1">{{scope.row.adv_type}}-轮播图</span>
        <span style="margin-left: 10px" v-if="scope.row.adv_type===2">{{scope.row.adv_type}}-一栏广告图</span>
        <span style="margin-left: 10px" v-if="scope.row.adv_type===3">{{scope.row.adv_type}}-三栏广告图</span>
      </template>
    </el-table-column>
    <el-table-column
      label="模块名字" width="300">
      <template slot-scope="scope">
      {{ scope.row.adv_key }}
      </template>
    </el-table-column>
    <el-table-column
      label="图片" width="300">
      <template slot-scope="scope">
      <img :src="item" alt="" v-for="item in scope.row.image.split(';')">
      </template>
    </el-table-column>
    <el-table-column
      label="产品编号">
      <template slot-scope="scope">
      {{ scope.row.pro_id }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      
      <!-- 添加信息功能的表单 -->
      <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
        <el-form class="small-space" :model="form" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="分类名称">
            <el-input v-model="form.sor_name"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>          
          <el-button type="primary" @click="handleCreateSubmit">确 定</el-button>
          <el-button type="primary" @click="resetForm('form')">重置</el-button>
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
      dialogFormVisible: false,
      dialogFormEditVisible: false,
      form: {
        sor_name: '',
        add_data: ''
      },
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
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
        deleteArrId.push(e.adv_id);
      });
      let this_ = this;
      let newTable = [];
      http.ajaxPost(this, api.adv_delete, {deleteArr: deleteArrId}, function (data) {
        this_.table.forEach(function (val) {
          if (deleteArr.indexOf(val) === -1) {
            newTable.push(val);
          }
        });
        this_.table = newTable;
      });
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleCreateSubmit () {
      let vm = this;
      if (!vm.form.sor_name) {
        this.$message({
          message: '请输入分类名称',
          type: 'warning'
        });
        return;
      }
      http.ajaxPost(this, api.sort_add, {sor_name: vm.form.sor_name}, function (data) {
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
    // 获取商品列表
    let this_ = this;
    http.ajaxGet(this, api.adv_list, {}, function (data) {
      this_.table = data.data;
    });
  }
};
</script>

<style lang="stylus-loader" rel="stylesheet/stylus" scoped>   
  .qtt_table
    padding:10 10px
    .filter-container
      margin-bottom:20px
    .pagination-container
      margin-top:50px
      margin-left:-5px
  img
    width: auto;
    height: 73px;
</style>

