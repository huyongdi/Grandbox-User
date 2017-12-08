<!--头部-->
<template>
  <div class="header">
    <div class="pull-left logo po" @click="toMajorPage">
      <img class="logo-img" src="../../../static/img/logo.png" alt="grandbox">
    </div>
    <ul id="pathUl">
      <li class="li-1" @click="cancelAxios">
        <router-link to="/myData" v-if="group!='3'">
          <span class="img-analyze li-img"></span>
          <span>我的数据</span>
        </router-link>
      </li>
      <li class="li-2" @click="cancelAxios">
        <router-link to="/disease">
          <span class="img-dataManage li-img"></span>
          <span>数据库</span>
        </router-link>
      </li>
      <li class="li-3" @click="cancelAxios">
        <router-link to="/tool">
          <span class="img-taskManage li-img"></span>
          <span>实用工具</span>
        </router-link>
      </li>
      <!--<li class="li-2">-->
        <!--<router-link to="/disease">-->
          <!--<span class="img-dataManage li-img"></span>-->
          <!--<span>疾病档案库</span>-->
        <!--</router-link>-->
      <!--</li>-->
      <!--<li class="li-3">-->
        <!--<router-link to="/gene">-->
          <!--<span class="img-dataAnalysis li-img"></span>-->
          <!--<span>基因档案库</span>-->
        <!--</router-link>-->
      <!--</li>-->
      <!--<li class="li-4">-->
        <!--<router-link to="/phenotype">-->
          <!--<span class="img-taskManage li-img"></span>-->
          <!--<span>表型档案库</span>-->
        <!--</router-link>-->
      <!--</li>-->
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
        <li><a href="javascript:void(0)" @click="showPModal">修改密码</a></li>
        <li v-if="isAdmin" :data-abc="isAdmin"> <router-link :to="{path:'/userList'}">用户列表</router-link></li>
      </ul>
    </div>
    <changeP></changeP>
  </div>
</template>

<script>
  import changeP from './changePassword.vue'
  import axios from 'axios'

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  export default {
    name: 'header',
    components: {
      'changeP': changeP,
    },
    data: function () {
      return {
        group:localStorage.grandGroup,
        uname: localStorage.uname,
        isAdmin:localStorage.isAd == 'true'
      }
    },
    mounted: function () {  //兼容刷新的时候
      this.getActive();
    },
    watch: {
      '$route'(to, from) {
        this.getActive();
      }
    },
    methods: {
      cancelAxios:function () {
        source.cancel();
      },

      getActive: function () {  //通过子页面判断左边具体的active
        const currentPath = this.$router.currentRoute.name;

        const _header = $("#pathUl");
        _header.find('>.active').removeClass('active');
        if(currentPath == 'myData' || currentPath == 'report' || currentPath=='result' ||currentPath == 'variationD' ||currentPath == 'addSample' ||currentPath=='sampleD'){
          $(".li-1").addClass('active')
        }else if(currentPath == 'disease' || currentPath == 'gene' || currentPath == 'geneD'  || currentPath=='omim' || currentPath=='phenotype'){
          $(".li-2").addClass('active')
        }else if(currentPath == 'tool' || currentPath == ''){
          $(".li-3").addClass('active')
        }else if(currentPath == 'phenotype'){
          $(".li-4").addClass('active')
        }
      },
      toPage1: function (type) {
        if (type) { //帮助
          window.location.href =this.helpHtml;
        } else { //反馈
          window.open(this.feedBackHtml)
        }
      },
      toMajorPage: function () {
        this.$router.push({path: '/'})
      },
      out: function () {
        if (confirm('确定要退出登录吗？')) {
          localStorage.removeItem('token');
          localStorage.removeItem('uname');
          this.$router.push({path: '/'})
        }
      },

      //修改密码
      showPModal:function () {
        $("#passwordModal").modal("show")
      }
    }
  }
</script>

<style scoped lang="less">
  .header {
    min-width: 1300px;
    height: 50px;
    line-height: 40px;
    width: 100%;
    /*color: #fff;*/
    background: url('../../../static/img/header-bc.png') no-repeat center;
    background-size: 100%;
    border-bottom: 1px solid rgb(0, 77, 144);

    .logo {
      color: #fff;
      position: relative;
      width: 251px;
      line-height: 49px;
      text-align: center;
      &:after {
        position: absolute;
        top: 0;
        content: "";
        width: 1px;
        height: 50px;
        right: 0;
        background-image: linear-gradient(180deg, #05afe7, #0c4983);
      }
    }

    > ul {
      color: #fff;
      margin: 0;
      li.active {
        background-color: #fff;
        color: rgb(0, 118, 192);
        .img-dataAnalysis {
          background: url(../../../static/img/all-3.png) -34px -59px no-repeat;
        }
        .img-taskManage {
          background-size: 28px 19px;
          background: url(../../../static/img/all-3.png) -34px -89px no-repeat;
        }
        .img-dataManage {
          background-size: 21px 21px;
          background: url(../../../static/img/all-3.png) -34px -30px no-repeat;
        }
        .img-analyze {
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
        &:before {
          position: absolute;
          top: 0;
          content: "";
          width: 1px;
          height: 50px;
          left: 0;
          background-image: linear-gradient(180deg, #13c8fd, #1a7eb9);
        }
        &:after {
          position: absolute;
          top: 0;
          content: "";
          width: 1px;
          height: 50px;
          right: 0;
          background-image: linear-gradient(180deg, #05afe7, #0c4983);
        }
        a {
          color: inherit;
          width: 100%;
          height: 100%;
          display: inline-block;
          text-decoration: none;
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
      color: #fff;
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
      color: #fff;
      left: 0;
    }
    .register-img {
      margin: 0 5px 2px 20px;
    }
    .register-span {
      color: #fff;
      margin-right: 20px;
    }
    #modal-title{

    }
  }

</style>
