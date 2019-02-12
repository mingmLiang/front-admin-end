<template>
    <div class="qtt_table">
      <div class="filter-container">
         <!-- <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button> -->
          <div class="fr">
            <el-radio v-model="type" :label="0"  @click.native="changeType('')">全部</el-radio>
            <el-radio v-model="type" :label="item.value" v-for="item in typeList" @click.native="changeType(item.value)">{{item.label}}</el-radio>
          </div>
      </div>
      <el-table ref="multipleTable" :data="table" border tooltip-effect="dark"  style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" width="120">
      <template scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <el-table-column label="产品" width="250">
        <template slot-scope="scope">
          <div v-for="(item,i) in scope.row.product">
            <br>
            <p>{{item.pro_id}}&nbsp;-&nbsp;{{item.pro_name}}<br>规格:<span class="notice_tips">{{item.spe_name}}</span> <br>数量:<span  class="notice_tips">{{item.count}}</span><br>
              <div v-if="scope.row.tag!==1&&!item.courier_num">
                <el-input placeholder="请输入快递单号" v-model="courier_num[i]"></el-input>
                <el-button
                type="danger"
                @click="status(scope.row, item,i)" class="fr" style="margin-top:5px;">发货</el-button>
              </div>
              <div v-if="item.courier_num">
                <span>快递编号：{{item.courier_num}}</span>
              <el-button
                type="danger"
                @click="courier_num[i]=item.courier_num;item.courier_num='';" class="fr" style="margin-top:5px;">修改</el-button>
              </div>

              <br>
            </p>

          </div>
        </template>
      </el-table-column>

      <el-table-column prop="order_no" label="订单编号"></el-table-column>
      <el-table-column prop="send_name" label="收货人"></el-table-column>
      <el-table-column prop="send_adress" label="地址"></el-table-column>
      <el-table-column prop="send_phone" label="联系方式"></el-table-column>
      <!-- <el-table-column prop="payment" label="付款方式"></el-table-column> -->
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <span v-if="scope.row.tag===1" class="notice_tips">未付款</span>
          <span v-else-if="scope.row.tag===2" class="notice_tips">未发货</span>
          <span v-else-if="scope.row.tag===3" class="notice_tips">未收货</span>
          <span v-else-if="scope.row.tag===4" class="notice_tips">已完成</span>
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
      courier_num: [],
      table: [],
      tableEdit: [],
      total: null,
      typeList: [{
        'label': '未付款',
        'value': 1
      }, {
        'label': '未发货',
        'value': 2
      }, {
        'label': '未收货',
        'value': 3
      }, {
        'label': '已完成',
        'value': 4
      },
      {
        'label': '售后中',
        'value': 5
      }],
      type: 0,
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
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    changeType (val) {
      this.type = val;
    },
    // 商品发货
    status (items, item, i) {
      if (!this.courier_num[i]) {
        this.$message({
          message: '请输入快递单号',
          type: 'error'
        });
      } else {
        let item_ = item;
        let this_ = this;
        http.ajaxPost(this, api.order_status, { 'tag': items.tag, 'order_id': items.order_id, 'entry_id': item.entry_id, 'courier_num': this.courier_num[i] }, function (data) {
          item_.courier_num = this_.courier_num[i];
          this_.courier_num[i] = '';
          this_.getList();
        });
      }
    },
    // 导出为表格
    // handleDownload () {
    //   var vm = this;
    //   require.ensure([], () => {
    //     const { export_json_to_excel } = require('vendor/Export2Excel');
    //     const tHeader = ['会员编号', '会员名', '电话', '电子邮件', '订单角色', '真实姓名', '地址'];
    //     const filterVal = ['uid', 'uname', 'phone_num', 'email', 'rate', 'real_name', 'address'];
    //     const table = vm.table;
    //     const data = vm.formatJson(filterVal, table);
    //     export_json_to_excel(tHeader, data, '订单列表');
    //   });
    // },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    getList () {
      let this_ = this;
      http.ajaxPost(this, api.order_list, { tag: this.type }, function (data) {
        this_.table = data.data;
      });
    }
  },
  watch: {
    type: function () {
      this.getList();
    }
  },
  created () {
    this.getList();
  }
};
</script>

<style lang="stylus-loader" rel="stylesheet/stylus" scoped> 
  .fr
    float:right
  .notice_tips
    color: #ff4949  
  .qtt_table
    padding: 10px 10px
    .filter-container
      margin-bottom:20px
    .pagination-container
      margin-top:50px
      margin-left:-5px
</style>

