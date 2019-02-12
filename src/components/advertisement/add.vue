<template>
  <div class="putIn">
    <el-form ref="form" :model="form" label-width="120px"  :rules="rules">
      <el-form-item label="广告图类型" prop="type">
        <span class="tips">
         每类型的广告，只允许有一个。如果添加重复类型，会将之前的数据覆盖。
        </span>
          <el-radio v-model="form.type" label="1">轮播图</el-radio>
          <el-radio v-model="form.type" label="2">一栏广告图</el-radio>
          <el-radio v-model="form.type" label="3">三栏广告图</el-radio>
      </el-form-item>

      <el-form-item label="名称" prop="key">
        <el-input v-model.trim="form.key"></el-input>
      </el-form-item>
      <el-form-item label="添加图片" prop="image" class="imgbox">
        <label for="photo" style="display: inline-block;vertical-align: middle;">
          <input type="file" name="photo" id="photo" ref='upload' capture='camera' accept="image/" @change="getImg">
          <div class="addIcon" style="cursor: pointer;"><i class="el-icon-plus"></i></div>
        </label>
          <div class="imgitem" v-for="(item,i) in form.image">
            <img :src="item" alt="">
            <i class="el-icon-circle-close" @click="deleteImage(item,i)"></i>
          </div> 
      </el-form-item>
      <el-form-item label="链接产品编号" prop="spe_name">
      <span class="tips">
       链接产品编号就是该图片点击跳转到的产品详情页的产品编号（请按顺序输入）
      </span>
        <el-col :gutter="24">{{form.pro_id}}</el-col>
        <el-row :gutter="24">
          <el-col :span="10"><div class="grid-content bg-purple"><el-input v-model.trim="pro_name_item"></el-input></div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple"><el-button  type="primary" @click="pro_add()">添加</el-button><el-button  type="primary" @click="form.pro_id=[]">清空</el-button></div></el-col>
        </el-row>
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
        form: {
          type: '1',
          image: [],
          key: '',
          pro_id: []
        },
        pro_name_item: '',
        // 表单验证
        rules: {
          image: [
            { required: true, message: '请添加图片', trigger: 'blur' }
          ],
          key: [
            { required: true, message: '请输入广告名称', trigger: 'blur' }
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
      pro_add: function () {
        this.form.pro_id.push(this.pro_name_item);
        this.pro_name_item = '';
      },
      submit: function () {
        if (this.form.image.length && this.form.key) {

        } else {
          this.$message({
            message: '请填入必须项',
            type: 'error'
          });
          return;
        }
        let dataForm = this.form;
        let this_ = this;
        http.ajaxPost(this, api.adv_Add, {formdata: dataForm}, function (data) {
          if (data.code === 200) {
            this_.resetForm();
          } else {}
        });
      },
      // 重置输入表单
      resetForm () {
        this.form = {
          type: '1',
          image: [],
          key: '',
          pro_id: []
        };
      }
    },
    created () {}
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
.tips
  font-size:13px;
  display: block;
  text-align: left;
  color: #ff4949;
</style>
