<template>
    <div class="qtt_table">
      <div class="filter-container">
        <el-button class="filter-item" type="primary" @click="handelCreate"  icon="edit">添加</el-button>
        <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>

        <el-select v-model="sor_id" placeholder="请选择查询分类">
          <el-option
            :label="所有商品"
            :key="''"
            :value="'所有商品'">
          </el-option>
          <el-option
            v-for="item in sort"
            :key="item.sor_id"
            :label="item.sor_name"
            :value="item.sor_id">
          </el-option>
        </el-select>
      </div>

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
    <el-table-column
      label="分类">
      <template slot-scope="scope">
      {{ scope.row.sor_name }}
      </template>
    </el-table-column>
    <el-table-column
      label="编号">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.pro_id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="商品名称" width="160">
      <template slot-scope="scope">
      {{ scope.row.pro_name }}
      </template>
    </el-table-column>
    <el-table-column
      label="展示图" width="300">
      <template slot-scope="scope">
      <img :src="item" alt="" v-for="(item, key) in scope.row.image.split(';')" v-if="key<5">
      </template>
    </el-table-column>
    <el-table-column
      label="成本">
      <template slot-scope="scope">
      {{ scope.row.price }}
      </template>
    </el-table-column>
    <el-table-column
      label="售价">
      <template slot-scope="scope">
      {{ scope.row.sale_price }}
      </template>
    </el-table-column>
    <el-table-column
      label="介绍">
      <template slot-scope="scope">
      {{ scope.row.decript }}
      </template>
    </el-table-column>
<!--     <el-table-column
      label="标签">
      <template slot-scope="scope">
      <span v-for="item in scope.row.tags">{{ item.tags_name }}</span>
      </template>
    </el-table-column> -->
<!--     <el-table-column
      label="规格"  width="300">
      <template slot-scope="scope">
      <span v-for="item in scope.row.spes" style="display:inline-block;border:1px solid #e0e0e0;margin-right:24px;">{{ item.spe_name }}</span>
      </template>
    </el-table-column> -->
<!--      <el-table-column
      label="售出">
      <template slot-scope="scope">
      {{ scope.row.sale_count }}
      </template>
    </el-table-column> -->
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
      


    
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
      sor_id: '',
      sort: [],
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 编辑
    handleEdit (index, row) {
      sessionStorage.setItem('edit_pro_qtt', JSON.stringify(row));
      this.$router.push({
        name: 'productEdit'
      });
    },
    // 选择删除
    handleDelete (index, row) {
      console.log(this.multipleSelection);
      // 删除当前一个
      let deleteArr = [];
      if (this.multipleSelection.indexOf(row) === -1) {
        deleteArr.push(row);
      } else {
        deleteArr = this.multipleSelection;
      };
      let deleteArrId = [];
      deleteArr.forEach(function (e) {
        deleteArrId.push(e.pro_id);
      });
      let this_ = this;
      let newTable = [];
      http.ajaxPost(this, api.pro_delete, {deleteArr: deleteArrId}, function (data) {
        this_.table.forEach(function (val) {
          if (deleteArr.indexOf(val) === -1) {
            newTable.push(val);
          }
        });
        this_.table = newTable;
      });
    },
    // 跳转到添加页面
    handelCreate () {
      this.$router.push({
        name: 'productAdd'
      });
    },
    // 导出为表格
    handleDownload () {
      var vm = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require('vendor/Export2Excel');
        const tHeader = ['商品分类', '商品编号', '商品名称', '展示图', '成本', '售价', '介绍'];
        const filterVal = ['sor_id', 'pro_id', 'pro_name', 'image', 'price', 'sale_price', 'decript'];
        const table = vm.table;
        const data = vm.formatJson(filterVal, table);
        export_json_to_excel(tHeader, data, '商品列表');
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
    },
    getProList () {
      // 获取商品列表
      let this_ = this;
      http.ajaxPost(this, api.product_list, {'sor_id': this.sor_id}, function (data) {
        this_.table = data.data;
      });
    }
  },
  created () {
    // 获取所有商品分类
    let this_ = this;
    http.ajaxGet(this, api.sort_all, {}, function (data) {
      this_.sort = data.data;
    });
    http.ajaxGet(this, api.tags_all, {}, function (data) {
      this_.tagsList = data.data;
    });
    this.getProList();
  },
  watch: {
    sor_id: function (val) {
      this.getProList();
    }
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

