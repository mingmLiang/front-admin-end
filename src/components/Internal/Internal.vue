<template>
  <div class="innnerApp">
    <div class="app-body">
    <!-- 菜单开始 -->
      <div class="menu" :class="{ smallNav: isCollapse }">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse"  theme="dark">
          <el-menu-item index="1"  @click="navToggle">
            <template> 
              <i :class="{ 'icon-packUp': !isCollapse ,'icon-spread': isCollapse }"></i>
              <span slot="title">收起/展开面板</span>
            </template>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="icon-qtt04"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">商品管理</span>
              <el-menu-item index="2-1" @click.native="nav='商品管理  /  商品分类'"><router-link to="/product/sort">商品分类</router-link></el-menu-item>
              <!--（查询、删除、编辑）-->
              <el-menu-item index="2-2" @click.native="nav='商品管理  /  商品列表'"><router-link to="/product/list">商品列表</router-link></el-menu-item>
              <el-menu-item index="2-3" @click.native="nav='商品管理  /  添加新商品'"><router-link to="/product/add">添加新商品</router-link></el-menu-item>
              <el-menu-item index="2-4" @click.native="nav='商品管理  /  商品标签'"><router-link to="/product/tags">商品标签</router-link></el-menu-item>
            </el-menu-item-group>

          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="icon-qtt02"></i>
              <span slot="title">会员管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">会员管理</span>
              <el-menu-item index="3-1"  @click.native="nav='会员管理  /  会员列表'"><router-link to="/user/list">会员列表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="icon-qtt01"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">订单管理</span>
              <el-menu-item index="4-1"   @click.native="nav='订单管理  /  订单列表'"><router-link to="/order/list">订单列表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
<!--           <el-submenu index="5">
            <template slot="title">
              <i class="icon-qtt06"></i>
              <span slot="title">售后管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">
                <i class="icon-chineseMedicine"></i>售后管理
              </span>
              <el-menu-item index="5-1"><router-link to="prescriptionManageC">换货申请</router-link></el-menu-item>
              <el-menu-item index="5-2"><router-link to="drugInfosC">退货退款申请</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          <el-submenu index="6">
            <template slot="title">
              <i class="icon-qtt05"></i>
              <span slot="title">广告管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">
                <i class="icon-chineseMedicine"></i>广告管理
              </span>
              <el-menu-item index="6-1"  @click.native="nav='广告管理  /  添加广告图'"><router-link to="/advertisement/add">添加广告图</router-link></el-menu-item>
              <el-menu-item index="6-2"  @click.native="nav='广告管理  /  广告图列表'"><router-link to="/advertisement/list">广告图列表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7" v-if="permissions">
            <template slot="title">
              <i class="icon-qtt03"></i>
              <span slot="title">管理员信息管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">
                <i class="icon-chineseMedicine"></i>管理员信息管理
              </span>
              <el-menu-item index="7-1"  @click.native="nav='管理员信息管理  /  管理员列表'"><router-link to="/admin/list">管理员列表</router-link></el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    <!-- 菜单结束 -->
      <!-- 内容显示区块 -->
      <div class="content" @mouseover="navColse">
        <!-- 右侧头部区域 -->
        <v-header :nav="nav"></v-header>
        <div class="tagcontent">
          <transition name="HISshow">
            <router-view></router-view>
          </transition>
        </div>
    </div>
  </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import header from '../header/header.vue';
  export default {
    name: 'app',
    data () {
      return {
        isCollapse: true,
        userLogin: '',
        type: '',
        permissions: 0,
        nav: '商品管理  /  添加新商品'
      };
    },
    methods: {
      // 左侧导航打开、关闭切换
      navToggle () {
        this.isCollapse = !this.isCollapse;
      },
      // 左侧导航关闭
      navColse () {
        this.isCollapse = true;
      }
    },
    created: function () {
      // 获取用户相关信息、判断用户是否登录
      if (sessionStorage.getItem('easeHis')) {
        this.userLogin = true;
        this.type = sessionStorage.getItem('easeHisType');
      } else {
        this.userLogin = false;
      }
      this.permissions = parseInt(sessionStorage.getItem('permissions_qtt'));
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus-loader" rel="stylesheet/stylus">
.innnerApp
  background-color:#fff
  min-height: 800px
  .el-menu-item>a
    display:inline-block
    height:100%
    width:100%
    color:#bfcbd9
    &.router-link-active
      color: #20a0ff
  .app-body
    .menu
      position:fixed
      z-index:9999
      height:100%
      width:230px
      transition: width 0.4s
      background-color:#324157
      overflow-y: scroll
      .el-menu--dark
        background-color: transparent
      &.smallNav
        width:64px
        overflow-y: visible
        .el-menu-item
        .el-submenu__title
          span
            display:none
          .el-submenu__icon-arrow
            display:none
    .content
      padding-left:60px
      .tagcontent
        padding:20px
      .HISshow
        opacity:1
        transition:all 0.5s
      .HISshow-enter,.HISshow-leave-active
        opacity:0
        transition:all 0.5s
</style>
