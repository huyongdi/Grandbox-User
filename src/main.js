// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './main'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'
import '../node_modules/less/dist/less.js'
import './components/global/globalFun.js'

Vue.prototype.Base64 = require('js-base64').Base64;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Vuex);


Vue.prototype.loginAxios = axios.create({
  baseURL: Vue.prototype.apiUrl,
});
/*取消請求*/
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
Vue.prototype.myAxios = axios.create({
  baseURL: Vue.prototype.apiUrl,
  cancelToken: source.token,
  headers: {'Authorization': localStorage.token},
});


/*請求攔截器*/
Vue.prototype.myAxios.interceptors.request.use(function (config) {
  const currentSecond = new Date().getTime() / 1000;

  if (currentSecond+1 > parseFloat(localStorage.time)) {
    $.ajax({
      url: Vue.prototype.apiUrl + 'auth/refresh',
      type: 'get',
      async: false,
      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", localStorage.token);
      },
      complete: function (resp) {
        localStorage.token = resp.getResponseHeader('Authorization');
      }
    });
    let data = JSON.parse(Vue.prototype.Base64.decode(localStorage.token.substring(6, localStorage.token.length - 1).split('.')[1]));
    localStorage.time = data.exp;
  }
  config.headers.Authorization = localStorage.token;
  return config
});

Vue.prototype.helpHtml = 'https://www.grandbox.site/manage/help/announcement';//帮助地址
Vue.prototype.feedBackHtml = 'https://redmine.grandbox.site';//反馈中心地址


new Vue({
  el: '#app',
  router,
//  store,
  template: '<App/>',
  components: {App}
});

