import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(VueResource);

// 菜单组件
import internal from '@/components/internal/internal';

// 登录组件
import login from '@/components/login/login';

// 商品分类
import sort from '@/components/product/sort';
// 商品标签
import tags from '@/components/product/tags';
// 添加商品
import productAdd from '@/components/product/add';
// 添加商品列表
import productList from '@/components/product/list';
import productEdit from '@/components/product/edit';
// 会员列表
import userList from '@/components/user/list';
import adminList from '@/components/admin/list';
// 添加广告图-轮播图
import advAdd from '@/components/advertisement/add';
import advList from '@/components/advertisement/list';
import orderList from '@/components/order/list';
Vue.use(Router);

export default new Router({
  routes: [
    { path: '/internal',
      name: 'internal',
      component: internal,
      children: [
        { path: '/product/sort', name: 'sort', component: sort },
        { path: '/product/tags', name: 'tags', component: tags },
        { path: '/user/list', name: 'userList', component: userList },
        { path: '/admin/list', name: 'adminList', component: adminList },
        { path: '/product/add', name: 'productAdd', component: productAdd },
        { path: '/product/edit', name: 'productEdit', component: productEdit },
        { path: '/product/list', name: 'productList', component: productList },
        { path: '/advertisement/add', name: 'advAdd', component: advAdd },
        { path: '/advertisement/list', name: 'advList', component: advList },
        { path: '/order/list', name: 'orderList', component: orderList },
        {path: '*', redirect: '/product/add'}
      ]
    },
    { path: '/login', name: 'login', component: login },
    {path: '*', redirect: '/login'}
  ]
});
