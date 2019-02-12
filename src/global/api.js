// 接口配置

// 把全体接口封装在的前端配置文件（序号与接口文档一一对应），多个环境配置时可快速切换整站式的全部接口，不用逐个页面去改。
// const config = require('../../config');

// let url = {
//   // staticPath:config.dev.staticPath,       //开发环境静态资源路径
//   // 条件 ? 结果1 : 结果2 //三元运算符，表示条件为true时，等式的结果就为结果1（'./'），否则为结果2('/static/')。
//   // development为开发环境（npm run dev），另外一个是生产环境（www.jd.com）
//   // 生产环境时staticPath的值为'./'，开发环境时staticPath的值为'/static/'。
//   staticPath: process.env.NODE_ENV !== 'development' ? config.build.staticPath : config.dev.staticPath
// };
const basePath = 'api/';
// ----------------请注意：如果正式环境，不需要本地json数据模拟，请删除以上代码和api中的模拟接口。----------------
export const api = {
  'login': basePath + 'login/admin',
  // 商品分类
  'sort_add': basePath + 'sort/add',
  'sort_all': basePath + 'sort/all',
  'sort_delete': basePath + 'sort/delete',
  'sort_delAll': basePath + 'sort/delall',
  'sort_edit': basePath + 'sort/edit',
  // 商品标签
  'tags_add': basePath + 'tags/add',
  'tags_all': basePath + 'tags/all',
  'tags_delete': basePath + 'tags/delete',
  'tags_delAll': basePath + 'tags/delall',
  'tags_edit': basePath + 'tags/edit',
  // 商品
  'product_list': basePath + 'product/list2',
  'addProduct': basePath + 'product/add',
  'pro_delete': basePath + 'product/delete',
  'pro_edit': basePath + 'product/edit',
  // 会员
  'user_add': basePath + 'user/add',
  'user_all': basePath + 'user/list',
  'user_delete': basePath + 'user/delete',
  'user_edit': basePath + 'user/edit',
  'reset_pwd': basePath + 'user/reset',
  // 管理员
  'admin_add': basePath + 'admin/add',
  'admin_all': basePath + 'admin/list',
  'admin_delete': basePath + 'admin/delete',
  'admin_edit': basePath + 'admin/edit',
  'reseta_admin_pwd': basePath + 'admin/reset',
  // 上传图片
  'upload': basePath + 'upload',
  'adv_Add': basePath + 'advertisement/add',
  'adv_list': basePath + 'advertisement/list',
  'adv_delete': basePath + 'advertisement/delete',
  'order_list': basePath + 'order/admin/list',
  'order_status': basePath + 'order/status'

};
