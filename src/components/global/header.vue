<!--头部-->
<template>
  <div class="header">
    <div class="pull-left logo po" @click="toMajorPage">
      <img class="logo-img" src="../../../static/img/logo.png" alt="grandbox">
      <img class="pull-right" src="../../../static/img/header-2.png"/>
    </div>
    <ul id="pathUl">
      <li class="home-li" @mouseover="showProject" @mouseleave="hideProject">
        <i class="triangle"></i>
        <router-link to="/home">
          <span class="img-analyze li-img"></span>
          <span>分析系统</span>
        </router-link>
        <img class="right-img" src="../../../static/img/header-2.png"/>

        <ul class="change-project hide">
          <li @click="toPage(0)">
            <a>
              <img src="../../../static/img/project-1.png" alt="">
              <span>管理系统</span>
            </a>

          </li>
          <li @click="toPage(1)">
            <a>
              <img src="../../../static/img/project-2.png" alt="">
              <span>医学数据库</span>
            </a>
          </li>
        </ul>

      </li>
      <li>
        <router-link to="/dataM/foo/platform">
          <span class="img-dataManage li-img"></span>
          <span>数据管理</span>
        </router-link>
        <img class="right-img" src="../../../static/img/header-2.png"/>
      </li>
      <li>
        <router-link to="/dataA/foo/sgList">
          <span class="img-dataAnalysis li-img"></span>
          <span>数据分析</span>
        </router-link>
        <img class="right-img" src="../../../static/img/header-2.png"/>
      </li>
      <li>
        <router-link to="/taskM/foo/done">
          <span class="img-taskManage li-img"></span>
          <span>任务管理</span>
        </router-link>
        <img class="right-img" src="../../../static/img/header-2.png"/>
      </li>
    </ul>

    <div class="pull-right po" @click="out">
      <img src="../../../static/img/header-2.png"/>
      <img class="register-img" src="../../../static/img/header-8.png"/>
      <span class="register-span">注销</span>
    </div>
    <div class="pull-right po" @click="toPage1(0)">
      <img src="../../../static/img/header-2.png"/>
      <img class="register-img" src="../../../static/img/header-12.png"/>
      <span class="register-span">反馈</span>
    </div>
    <div class="pull-right po" @click="toPage1(1)">
      <img src="../../../static/img/header-2.png"/>
      <img class="register-img" src="../../../static/img/header-11.png"/>
      <span class="register-span">帮助</span>
    </div>


    <div class="pull-right po dropdown">
      <div class="dropdown-toggle name-content" aria-haspopup="true" aria-expanded="true" data-toggle="dropdown"
           id="hideContent">
        <img src="../../../static/img/header-2.png"/>
        <img class="register-img" src="../../../static/img/header-9.png"/>
        <span class="register-span">{{uname}}</span>
        <i class="triangle"></i>
      </div>
      <ul class="dropdown-menu" aria-labelledby="hideContent">
      <li><a :href="manHtml+'updatePassword'">修改密码</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data: function () {
      return {
        uname: ''
      }
    },
    mounted: function () {  //兼容刷新的时候
      let currentName = this.$router.currentRoute.name;
      const _ul = $("#pathUl");
      _ul.find('.active').removeClass('active');
      _ul.find('li').each(function () {
        const href = $(this).find("a").attr("href");
        currentName = currentName.includes('-') ? currentName.substring(0, currentName.indexOf('-')) : currentName;
        if (href && href.includes(currentName)) {
          $(this).addClass('active')
        }
      })
    },
    watch: {
      '$route' (to, from) {
        const currentPath = to.name;
      }
    },
    created: function () {
      this.uname = localStorage.uname;
      if (!localStorage.token) {
//        this.$router.push({path: '/login?next=' + this.$route.path})
      }
    },
    methods: {
      toPage1: function (type) {
        if (type) { //帮助
          window.location.href = this.manHtml + "help/announcement?prev=1";
        } else { //反馈
          window.open(this.feedBackHtml)
        }
      },
      toMajorPage:function () {
        this.$router.push({path: '/'})
      },
      toPage:function (type) {
        if(type){ //数据库
//          window.location.href=this.dbHtml
          window.open(this.dbHtml)
        }else{
//          window.location.href=this.manHtml
          window.open(this.manHtml)
        }
      },
      showProject:function () {
        $(".change-project").removeClass('hide')
      },
      hideProject:function () {
        $(".change-project").addClass('hide')
      },
      out: function () {
        if (confirm('确定要退出登录吗？')) {
          localStorage.removeItem('token');
          localStorage.removeItem('uname');
//          this.$router.push({path: '/login?next=' + this.$route.path})
          this.$router.push({path: '/'})
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .header {
    position: absolute;
    .home-li.active{
      .triangle{
        border-top: 7px solid rgb(0,118,192);
      }
    }
    .home-li{
      position: relative;
      .triangle{
        position: absolute;
        float: right;
        width: 0;
        height: 0;
        border-top: 7px solid #fff;
        border-right: 8px solid transparent;
        border-left: 7px solid transparent;
        right: 15px;
        top: 22px;
      }
      .change-project{
        position: absolute;
        padding-left: 0;
        border: 1px solid #ccc;
        width: 100%;
        z-index: 1000;
        color: #333;
        left: -1px;
        top: 50px;
        li{
          height: 40px;
          line-height: 40px;
          background-color: #fff;
          border-right: 1px solid #ccc;
          &:hover{
            background-color: rgb(241,242,244);
          }
          img{
            float: left;
            margin: 11px 10px 0 20px;
          }
          span{
            float: left;
          }
        }
      }
    }
    min-width: 1300px;
    height: 50px;
    line-height: 40px;
    width: 100%;
    color: #fff;
    background: url('../../../static/img/header-bc.png') no-repeat center;
    background-size: 100%;
    border-bottom: 1px solid rgb(0, 77, 144);

    .logo {
      width: 251px;
      line-height: 48px;
      text-align: center;
    }

    .font-content {

      .cloud {
        margin: 0 6px 0 32px;
      }

      .header-font {
        margin-right: 28px;
      }
    }

    > ul {
      margin: 0;
      li.active {
        background-color: #fff;
        /*border-bottom: 1px solid #fff;*/
        color: rgb(0, 118, 192);
        height: 51px;
        .img-dataAnalysis {
          background: url(../../../static/img/all-3.png) -34px -59px no-repeat;
        }
        .img-taskManage {
          background-size: 28px 19px;
          background: url(../../../static/img/all-3.png) -34px -89px no-repeat;
        }
        .img-dataManage{
          background-size: 21px 21px;
          background: url(../../../static/img/all-3.png) -34px -30px no-repeat;
        }
        .img-analyze{
          background-size: 22px 21px;
          background: url(../../../static/img/all-3.png) -34px 1px no-repeat;
        }
      }
      li {
        float: left;
        text-align: center;
        width: 165px;
        cursor: pointer;
        position: relative;
        height: 50px;
        line-height: 50px;
        .right-img {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
        }
        a {
          color: inherit;
          width: 100%;
          height: 100%;
          display: inline-block;
        }
        .li-img {
          display: inline-block;
          margin-bottom: -5px;
          width: 28px;
          height: 21px;
          margin-right: 2px;
        }
        .img-analyze {
          background-size: 21px 20px;
          /*background: url(../../../static/img/header-4.png) no-repeat center;*/
          background: url(../../../static/img/all-3.png) 0 1px no-repeat;
        }
        .img-dataManage {
          background-size: 21px 21px;
          background: url(../../../static/img/all-3.png) 0 -30px no-repeat;
        }
        .img-dataAnalysis {
          background-size: 22px 21px;
          background: url(../../../static/img/all-3.png) 0 -59px no-repeat;

        }
        .img-taskManage {
          background-size: 28px 19px;
          background: url(../../../static/img/all-3.png) 0 -89px no-repeat;
        }
      }
    }
    .name-content {
      padding-right: 20px;
      .triangle {
        float: right;
        width: 0;
        height: 0;
        border-top: 7px solid #fff;
        border-right: 8px solid transparent;
        border-left: 7px solid transparent;
        margin: 23px 10px 0 -10px;
      }
      .register-img {
        margin-left: 25px;
      }
    }

    .dropdown-menu {
      left: 0;
    }

    .register-img {
      margin: 0 5px 2px 20px;
    }

    .register-span {
      margin-right: 20px;
    }

  }
</style>
