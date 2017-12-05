import Vue from 'vue'

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
      alertContent = error.response.data.message?error.response.data.message:error.response.data.error
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

//点击展开下来（GENE OMIM 详情）
Vue.prototype.showContent =function (e) {
  const _header = $(e.target).parent();
  const _span = _header.find('.fa');
  _header.next().slideToggle();
  if (_span.hasClass("fa-chevron-right")) {
    _span.removeClass('fa-chevron-right').addClass("fa-chevron-down")
  } else {
    _span.removeClass('fa-chevron-down').addClass("fa-chevron-right")
  }
};

Vue.prototype.showNext =function (e) {
  const _header = $(e.target);
  _header.next().slideToggle();
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
