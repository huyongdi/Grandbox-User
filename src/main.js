// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import axios from 'axios'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/font-awesome/css/font-awesome.min.css'

Vue.prototype.Base64 = require('js-base64').Base64;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Vuex);

let apiUrl = 'http://192.168.2.192:8000/api/';
Vue.prototype.apiUrl = apiUrl;
//let apiUrl = 'http://118.26.69.171:8765/api/';
Vue.prototype.loginAxios = axios.create({
  baseURL: apiUrl,
});
Vue.prototype.myAxios = axios.create({
  baseURL: apiUrl,
  headers: {'Authorization': localStorage.token},
});

Vue.prototype.myAxios.interceptors.request.use(function (config) {
  const currentSecond = new Date().getTime() / 1000;

  if (currentSecond+1 > parseFloat(localStorage.time)) {
    $.ajax({
      url: apiUrl + 'auth/refresh',
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
Vue.prototype.changePassword = 'https://www.grandbox.site/manage/updatePassword';//修改密码地址

/*自定义全局函数*/
// 捕获错误
Vue.prototype.catchFun = function (error) {
  if (error.response) {
    let alertContent = '';
    if (error.response.data.errors) {
      if (typeof error.response.data.errors === 'string') {
        alertContent = error.response.data.message + ' ' + error.response.data.errors
      } else {
        const arr = [];
        $.each(error.response.data.errors, function (i, value) {
          arr.push(i + ' : ' + value)
        });
        alertContent = error.response.data.message + ' : ' + arr.join(' ; ')
      }
    } else if (error.response.data.error) {
      alertContent = error.response.data.message
    } else {
      alertContent = error.response.data.message;
    }


    this.$message({
//      showClose: true,
      message: error.response.status + ' : ' + alertContent,
      type: 'error'
    });
    if (error.response.status === 401) {
      if (this.$route.name !== 'login') {
//        localStorage.token = '';
        this.$router.push({path: '/login', query: {'next': this.$route.path}})
      }
    }
  } else {

    this.$message({
//      showClose: true,
      message: error.message,
      type: 'error'
    });
  }
};
// 字符串转化为数组
Vue.prototype.strToArr = function (str) {
  str = $.trim(str).replace(/，/g, ','); //英文逗号替换为中文
  str = str.replace(/<\/?.+?>/g, ","); //回车替换成逗号
  str = str.replace(/[\r\n]/g, ",");//回车替换成逗号
  let arr = str.split(',');
  let arr1 = [];
  $.each(arr, function (i, data) {
    if (data) {
      arr1.push(data);
    }
  });
  return arr1
};
// hide转换(参数为id)
Vue.prototype.switchHide = function (ID) {
  const _ele = $("#" + ID);
  if (_ele.hasClass('hide')) {
    _ele.removeClass('hide')
  } else {
    _ele.addClass('hide')
  }
};

//错误提示

Vue.prototype.success = function (message) {
  this.$message({
//    showClose: true,
    message: message,
    type: 'success'
  });
};

Vue.prototype.alert = function (message) {
  this.$message({
//    showClose: true,
    message: message,
    type: 'error'
  });
};

new Vue({
  el: '#app',
  router,
//  store,
  template: '<App/>',
  components: {App}
});

