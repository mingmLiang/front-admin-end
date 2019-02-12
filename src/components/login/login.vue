<template>
    <div class="login">
      <div class="loginContainer">
        <h2 class="title">抢淘淘后台系统登录</h2>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item>
            <el-input v-model.trim="form.name" placeholder="用户名" @keyup.enter.native="nextInput"></el-input>
          </el-form-item>
          <el-form-item @keyup.enter.native="_login">
            <el-input id="psw" v-model="form.password" type="password" class="inputpsw" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="_login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  // import {mapActions} from 'vuex'; // 引入vuex中各个模块的actions
  import {api} from '../../global/api.js';
  export default {
    name: 'login',
    data () {
      return {
        tips: '',
        form: {
          name: '',
          password: '',
          type: ''
        },
        user: ''
      };
    },
    methods: {
      // ...mapActions({setUserInfo: 'setUserInfo'}),  // 本组件注册VUEX输出的actions中的setUserInfo方法
      // 用户登录验证不能为空
      _login () {
        if (!this.form.name || !this.form.password) {
          if (!this.form.name) {
            this.tips = '用户名不能为空！';
          } else {
            this.tips = '密码不能为空！';
          }
          this.$message({
            message: this.tips,
            type: 'warning'
          });
          return;
        }
        let this_ = this;
        // 获取所有的用户信息
        this.$http.post(api.login, {'name': this.form.name, 'password': this.form.password}).then((response) => {
          if (response.body.code === 200) {
            this.$message({
              message: response.body.msg,
              type: 'success'
            });
            sessionStorage.setItem('admin_qtt', this.form.name);
            sessionStorage.setItem('permissions_qtt', response.body.data.permissions);

            this_.$router.push({path: '/product/add'});
          } else {
            this.$message({
              message: response.body.msg,
              type: 'error'
            });
          }
        }, response => {
          this.$message({
            message: '数据请求失败',
            type: 'error'
          });
        });
      },
      // 用户名文本框回车跳到密码文本框
      nextInput () {
        document.querySelector('#psw input').focus();
      }
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
  .login
    .loginContainer
      max-width:500px
      margin: 90px auto 0 auto
      background-color:#48576a
      padding:25px 30px
      border-radius: 20px
      .title
        font-size: 35px
        text-align: center
        color: rgb(255,255,255)
        font-weight: 900
        margin-bottom: 40px
        padding: 20px 0 10px 0
        letter-spacing: 4px
    .el-form-item__content
      margin-right: 80px
    .el-button
      width:100%
    .tips
      color:#fff
      font-size:12px
      text-indent:2em
    .el-input
      input
        background-color: rgba(0,0,0,0.1)
        color: #fff
</style>