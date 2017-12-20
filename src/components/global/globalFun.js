import Vue from 'vue'
import './../../../node_modules/socket.io-client/dist/socket.io.slim'
//import './socket.io'
import Echo from "laravel-echo"


/*自定义全局函数*/
// 捕获错误
Vue.prototype.toLoginParam='';
Vue.prototype.catchFun = function (error) {
  if (error.__proto__.__CANCEL__) {
    return
  }
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
      alertContent = error.response.data.message ? error.response.data.message : error.response.data.error
    } else {
      alertContent = error.response.data.message;
    }

    this.$message({
//      showClose: true,
      message: error.response.status + ' : ' + alertContent,
      type: 'error'
    });
    if (error.response.status === 401) {
      console.log(this.$route.name)
      if (this.$route.name !== 'login') {
//        localStorage.token = '';
        let _href =window.location.href;
        Vue.prototype.toLoginParam = _href.substring(_href.indexOf('?')+1,_href.length);
        this.$router.push({path: '/login'});
      }
    } else if (error.response.status === 404) {
      this.$router.push({path: '/p404'})
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
Vue.prototype.showContent = function (e) {
  const _header = $(e.target).parent();
  const _span = _header.find('.fa');
  _header.next().slideToggle();
  if (_span.hasClass("fa-chevron-right")) {
    _span.removeClass('fa-chevron-right').addClass("fa-chevron-down")
  } else {
    _span.removeClass('fa-chevron-down').addClass("fa-chevron-right")
  }
};

Vue.prototype.showNext = function (e) {
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

/*左侧导航展开收缩*/
Vue.prototype.upDown = function (e) {
  const _li = $(e.target).parent();
  const _children = _li.find('.children');

  if (_children.css("display") == 'none') { //先前状态为展开
    _li.addClass('active')
  } else {
    _li.removeClass('active');
  }
  _children.slideToggle()
};

//监听样本的完成情况
Vue.prototype.messageId =[];
$.getScript("http://192.168.2.192:6001/socket.io/socket.io.js", function () {
  let EchoS = new Echo({
    broadcaster: 'socket.io',
    host: 'http://192.168.2.192:6001',
    auth: {
      headers: {
        Authorization: localStorage.token
      }
    }
  });
  Vue.prototype.watchS = function () {
    EchoS.private(('App.Models.Manage.User.' + localStorage.getItem('grandId')))
      .notification((e) => {
        console.log(e);
        Vue.prototype.messageId.push(e.id);
        if (e.data_file.status == 2) {
          Vue.prototype.showSuccessNotify(`${e.sn}样本已完成，<a href="#/result?id=${e._id}" target="_blank">点击查看结果</a>`,e.id);
//          EchoS.leave(`App.Models.Manage.Sample.' + ${e._id}`);
        } else if (e.data_file.status == -1) {
          Vue.prototype.$notify.error({
            title: '错误',
            message: '样本' + e.sn + '出错',
          });
        } else if (e.data_file.status == 1) {
          Vue.prototype.$notify({
            title: '消息',
            dangerouslyUseHTMLString: true,
            message: `${e.sn}样本已开始运行`,
            type: 'success',
            duration: 0, /*10s*/
          });
        }
      });
  };

  Vue.prototype.showSuccessNotify = function (message,readId) {
    Vue.prototype.$notify({
      title: '成功',
      dangerouslyUseHTMLString: true,
      message: message,
      type: 'success',
      duration: 0, /*60s*/
      onClose: function () {
        Vue.prototype.ReadS(readId)
      },
      onClick:function () {
        Vue.prototype.ReadS(readId)
      }
    });
  };

  Vue.prototype.ReadS = function (id) {
    Vue.prototype.myAxios({
      url: 'manage/notification/' + id,
      method: 'patch',
    }).then(() => {
    }).catch((error) => {
      Vue.prototype.catchFun(error)
    })
  }

});
