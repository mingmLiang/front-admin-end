<template>
  <div class="putIn">
    <el-form ref="form" :model="form" label-width="120px"  :rules="rules">
      <el-form-item label="商品名称" prop="pro_name">
        <el-input v-model.trim="form.pro_name"></el-input>
      </el-form-item>
      <el-form-item label="商品图片" prop="image" class="imgbox">
        <p style="color: #ff4949;font-size:13px;">前五张为商品详情轮播图图片，之后的是商品详情图片</p>
        <label for="photo" style="display: inline-block;vertical-align: middle;">
          <input type="file" name="photo" id="photo" ref='upload' capture='camera' accept="image/" @change="getImg">
          <div class="addIcon" style="cursor: pointer;"><i class="el-icon-plus"></i></div>
        </label>
          <div class="imgitem" v-for="(item, i) in form.image">
            <img :src="item" alt="">
             <i class="el-icon-circle-close" @click="deleteImage(item,i)"></i>
          </div>
      </el-form-item>
      <el-form-item label="参考价格" prop="price">
        <el-input v-model.trim="form.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="销售价格" prop="sale_price">
        <el-input v-model.trim="form.sale_price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="发货地" prop="city">
        <el-input v-model.trim="form.city" type="text"></el-input>
      </el-form-item>
      <el-form-item label="产品介绍" prop="decript">
        <el-input v-model.trim="form.decript"></el-input>
      </el-form-item>
<!--       <el-form-item label="是否上架">
        <el-radio v-model="form.stack" label="1" checked>是</el-radio>
        <el-radio v-model="form.stack" label="0">否</el-radio>
      </el-form-item> -->
      <el-form-item label="产品分类"  prop="sor_id">
         <el-select v-model="form.sor_id" placeholder="请选择">
          <el-option
            v-for="item in sort"
            :key="item.sor_id"
            :label="item.sor_name"
            :value="item.sor_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格" prop="spe_name">
        <el-col :gutter="24">{{form.spe_name}}</el-col>
        <el-row :gutter="24">
          <el-col :span="10"><div class="grid-content bg-purple"><el-input v-model.trim="form.spe_name_item"></el-input></div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple"><el-button  type="primary" @click="spe_add()">添加</el-button><el-button  type="primary" @click="form.spe_name=[]">清空</el-button></div></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="标签"  prop="tags">
        <el-checkbox-group v-model="form.tags">
          <el-checkbox :label="item.tags_id" v-for="item in tagsList">{{item.tags_name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">添加</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
  import {api} from '@/global/api.js';
  import {http} from '@/global/http.js';
  export default {
    data () {
      return {
        date1: '',
        sort: [],
        tagsList: '',
        form: {
          pro_name: '',
          image: [],
          price: 0,
          sale_price: 0,
          decript: '',
          stack: '1',
          sor_id: '',
          tags: [],
          spe_name: [],
          spe_name_item: '',
          city: ''
        },
        // 表单验证
        rules: {
          pro_name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          image: [
            { required: true, message: '请添加产品图片', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入成本价格', trigger: 'blur' }
          ],
          sale_price: [
            { required: true, message: '请输入销售价格', trigger: 'blur' }
          ],
          decript: [
            { required: true, message: '请输入产品介绍', trigger: 'blur' }
          ],
          sor_id: [
            { required: true, message: '请选择产品分类', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      deleteImage (item, i) {
        this.form.image.splice(i, 1);
      },
      getImg () {
        // 上传图片
        var formData = new FormData();
        formData.append('file', this.$refs.upload.files[0]);
        let This_ = this;
        http.ajaxPostFile(this, api.upload, {formdata: formData}, function (data) {
          data = JSON.parse(data);
          This_.form.image.push(data.data);
        });
      },
      spe_add: function () {
        this.form.spe_name.push(this.form.spe_name_item);
        this.form.spe_name_item = '';
      },
      submit: function () {
        if (this.form.pro_name && this.form.price > -1 && this.form.sale_price > -1 && this.form.decript && this.form.sor_id) {

        } else {
          this.$message({
            message: '请填入必须项',
            type: 'error'
          });
          return;
        }
        let dataForm = this.form;
        let tags = dataForm.tags;
        dataForm.tags = [];
        tags.forEach(function (e, index) {
          if (index !== 0) {
            dataForm.tags += ',' + e;
          } else {
            dataForm.tags += e;
          }
        });
        let this_ = this;
        http.ajaxPost(this, api.addProduct, {formdata: dataForm}, function (data) {
          if (data.code === 200) {
            this_.resetForm();
          } else {}
        });
      },
      // 重置输入表单
      resetForm () {
        this.date1 = '';
        this.form = {
          pro_name: '',
          image: [],
          price: 0,
          sale_price: 0,
          decript: '',
          stack: '1',
          sor_id: '',
          tags: [],
          spe_name: []
        };
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
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus" scoped>
  .el-icon-circle-close
    color:#000;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 20px;
    opacity: .8;
    color: #826d6d;
  .el-icon-circle-close:hover
    color:#e40707;
    cursor: pointer;
  #photo
    display: none;
  .putIn
    max-width:800px
  .addIcon
    border: 1px dashed #ccc;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    margin-right:30px;
    margin-bottom:10px;
    i
      font-size:50px;
      color:#999;
      vertical-align: middle;
  .imgbox
    .imgitem
      height:102px;
      display:inline-block;
      margin-right: 10px;
      vertical-align: middle;
      margin-bottom:10px;
      position:relative;
      i.el-icon-error
        font-size:15px;
      img
        height:100%;
        display:inline-block;

</style>
