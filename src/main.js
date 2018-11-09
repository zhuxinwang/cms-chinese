// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview' //引入iview组件库
import 'iview/dist/styles/iview.css'  //引入iview的css
import "babel-polyfill"

import global from './assets/js/Global' //导入全局参数
import network from './assets/js/NetworkAPI' //导入网络请求工具


Vue.config.productionTip = false;
Vue.use(iView);  //在vue中使用iview
Vue.prototype.$GLOBAL = global;
Vue.prototype.$network = network;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});


// 兼容ie浏览器indexOf方法
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (elt /*, from*/) {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
      ? Math.ceil(from)
      : Math.floor(from);
    if (from < 0)
      from += len;
    for (; from < len; from++) {
      if (from in this &&
        this[from] === elt)
        return from;
    }
    return -1;
  };
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});
