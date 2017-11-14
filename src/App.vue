<!--suppress ALL -->
<template>
  <div id="app">
    <!--<nav-header v-if="inLogin"></nav-header>-->

    <div class="left-hover fold-hover" v-if="!inLogin"> <!--用来移入的时候显示导航-->
      <span class="fold" @click="fold">点击隐藏导航栏</span>
      <span class="unfold hide" @click="unfold">点击显示导航栏</span>
    </div>


    <router-view></router-view>
  </div>
</template>
<script>
  import header from './components/global/Header.vue'
  import Vue from 'vue'
  import axios from 'axios'

  Vue.component('loading', {
    template: '<div class="spinner">' +
    '<div class="bounce1"></div>' +
    '<div class="bounce2"></div>' +
    '<div class="bounce3"></div> ' +
    '</div>'
  })

  export default {
    name: 'app',
    components: {
      'nav-header': header,
    },
    data: function () {
      return {
        inLogin: '',
        inGene: '',
        ele11:''
      }
    },
    created: function () {
      this.baseBind()
    },
    mounted: function () {

      this.baseBind();
      const name = this.$router.currentRoute.name;
      if(name === 'aHome' || name === 'login'){
        this.inLogin = true
      }else{
        this.inLogin = false;
      }
    },
    updated: function () {
      this.baseBind()
    },
    watch: {
      '$route' (to, from) { //路由变化的时候判断需不需要加载头部
        if (from.name === 'login') {  //重新登录之后token不刷新
          this.myAxios.defaults.headers = {'Authorization': localStorage.token}
        }
        if(to.name === 'aHome' || to.name === 'login'){
          this.inLogin = true
        }else{
          this.inLogin = false;
        }
      }
    },
    methods: {
      /*左边导航移动*/
      fold: function () { //点击隐藏
        const _left = $('.under-left')
        const _right = $('.under-right')
        const _leftHover = $(".left-hover");
        _left.animate({
          marginLeft: '-250px',
        }, '', function () {
          $('.unfold').removeClass('hide')
        })
        _right.animate({
          marginRight: '0px',
          marginLeft: '0px',
          paddingRight: '25px',
        });
        _leftHover.css('width','25px');
        $('.fold').addClass('hide');
        this.ele11 = $(".col-sm-11");
        this.ele11.removeClass('col-sm-11')
      },
      unfold: function () {
        const _left = $('.under-left')
        const _right = $('.under-right');
        const _leftHover = $(".left-hover");
        _left.animate({
          marginLeft: '0',
        },'',function () {
          $('.fold').removeClass('hide')
        })
        _right.animate({
          marginRight: '-260px',
          marginLeft: '250px',
          paddingRight: '260px',
        });
        _leftHover.css('width','250px');
        $('.unfold').addClass('hide');
        this.ele11.addClass('col-sm-11')
      },

      baseBind: function () {
        /*点击tr加背景色*/
        $('table tbody').off('click').on('click', 'tr', function () {
          if (!$(this).hasClass('not-base')) {
            if ($(this).hasClass('in')) {
//              $(this).removeClass('in')
            } else {
              $(this).closest('tbody').find('.in').removeClass('in')
              $(this).addClass('in')
            }
          }
        })
        /*点击左侧列表*/
        $('.under-left').off('click').on('click', '>li', function (event) {
          const _currentLi = $(event.target).closest('li')
          const _children = _currentLi.find('.children')
          if (_currentLi.hasClass('active')) {
            _currentLi.removeClass('active')
            _currentLi.find('.children').slideToggle()

          } else {
//            $(".under-left").find("li.active").removeClass('active');
            _currentLi.addClass('active')
            _currentLi.find('.children').slideToggle()
          }
        })
        /*自定义的上传输入框*/
        $('.upload-content').off('click').on('click', '.text', function () {
          $(this).next().click()
        })
        $('.upload-content').on('change', '.hide-input', function () {
          const arr = $(this).val().split('\\')
          $(this).parent().find('.show-name').val(arr[arr.length - 1])
        })
        /*点击其它地方筛选关闭*/
        $('#app:not(\'.filtrate-content\')').on('click', function () {
          $('.filtrate-content').addClass('hide')
        })
        //点击遮罩层关闭遮罩层
        $('.under-right').on('click', '.cover', function (e) {
          e.stopPropagation();
          $(this).addClass('hide')
          $(this).parent().find('.light-btn').removeClass('light-btn')
          $(this).parent().find('.light-search').removeClass('light-search')
        })
      },
    }
  }

</script>

<style lang="less">
  @triangle-color: rgb(0, 118, 192);
  @border: rgb(168, 185, 209);
  @tableSha: rgb(185, 184, 184);
  @in: rgb(14, 125, 195);
  @inBc: rgb(220, 238, 249);
  @color: rgb(49, 49, 49);
  @tdBorder: rgb(225, 226, 227);
  @trHover: rgb(255, 245, 231);
  @trIn: rgb(255, 236, 210);
  @interleave: rgb(246, 248, 250);
  @fliterBorder: rgb(212, 212, 212);

  @keyframes show {
    0% {
      left: 225px;
    }
    100% {
      left: 250px;
      background-color: rgb(189, 189, 189);
    }
  }

  @keyframes showUn {
    100% {
      left: 0px;
      background-color: rgb(189, 189, 189);
    }
  }

  html {
    min-width: 1430px;
    background: linear-gradient(to bottom, #f0f0f0, #ffffff);
    min-height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    /*overflow-x: hidden;*/
    body {
      /*background: url("../static/img/html-bc.png");*/
      /*background-size: 100% 100%;*/
      /*background:linear-gradient(to bottom,#e9e9e9,#fafafa);*/
      background-color: #f5f5f5;
      min-height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      font-family: "Microsoft YaHei","微软雅黑" !important;
      #app {
        min-height: 100%;
        overflow-x: hidden;
        position: relative;
        /*移动左边导航的样式*/
        .left-hover {
          width: 250px;
          z-index: 10;
          position: fixed;
          height: 100%;
          top: 0px;
          cursor: pointer;
          &:hover {
            .fold {
              animation: show 1s infinite forwards;
              animation-iteration-count: 1;
              color:#fff
            }
            .unfold {
              animation: showUn 1s infinite forwards;
              animation-iteration-count: 1;
              color:#fff
            }
          }
          .fold {
            z-index: 5;
            position: fixed;
            top: calc(~'50% - 95px');
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            padding: 50px 0;
            cursor: pointer;
            color: transparent;
            width: 23px;
            left: 225px;
            text-align: center;
            font-size: 12px;
          }
          .unfold {
            z-index: 5;
            position: fixed;
            top: calc(~'50% - 95px');
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            padding: 50px 0;
            cursor: pointer;
            color: #fff;
            width: 23px;
            left: -23px;
            text-align: center;
            font-size: 12px;
          }
        }

        /*自定义class*/
        .base-color { /*标题背景底色*/
          padding: 8px 10px;
          margin-left: -10px;
          background-color: rgb(245, 245, 245);
        }
        .light-font { /*浅字体*/
          font-size: 13px;
          color: rgb(125, 125, 125);
        }
        .span-a {
          color: #337ab7;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
            color: #23527c;
          }
        }
        .warp {
          word-break: break-all;
        }
        .nowrap{
          white-space: nowrap;
        }
        .font-12 {
          font-size: 12px;
        }
        .break-all {
          word-break: break-all;
        }
        .po {
          cursor: pointer;
        }
        .inline {
          display: inline-block;
        }
        .block {
          display: block;
        }
        .fr {
          float: right;
        }
        .fl {
          float: left;
        }
        .center {
          text-align: center;
        }
        a {
          text-decoration: none;
        }
        .modal-btn {
          margin: 5px 0 15px 0;
          .close-btn {
            margin-left: 20px;
          }
        }
        .common-a {
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .bold {
          font-weight: bold;
        }
        ul {
          li {
            list-style: none;
          }
        }
        .rea {
          position: relative;
        }
        .search-div {
          display: inline-block;
          .search-input {
            width: 240px;
            float: left;
            height: 28px;
          }
          .my-btn {
            float: left;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            width: 45px;
            margin-left: -6px;
            img {
              margin-left: 3px;
            }
          }
        }
        input, textarea {
          border: 1px solid #d4d4d4;
          border-radius: 3px;
          padding: 2px 8px;
          &:focus {
            outline: none;
          }
        }
        select::-ms-expand {
          display: none;
        }
        .my-select {
          border: 1px solid #d4d4d4;
          border-radius: 3px;
          height: 26px;
          line-height: 26px;
          padding-left: 5px;
          padding-right: 24px;
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          -ms-appearance: none;
          background: url(../static/img/select-right.png) no-repeat scroll right center transparent;
          &:focus {
            outline: none;
          }
        }

        .my-btn {
          display: inline-block;
          width: 95px;
          height: 28px;
          line-height: 28px;
          border-radius: 3px;
          border: 1px solid #df3a24;
          text-align: center;
          color: #fff;
          background: linear-gradient(to bottom, #f46554, #ea533f);
          cursor: pointer;
          img {
            margin: -3px 5px 0 0;
          }
          &:active {
            background: linear-gradient(to bottom, #ea533f, #f46544);
          }
        }
        .noResult-td{
          img{
            width: 500px
          }
        }
        .upload-content {
          display: inline-block;
          width: 50%;
          padding: 0;
          .show-name {
            background-color: #fff;
            width: 78%;
            margin-right: -2%;
            padding-right: 2%;
            float: left;
            &:focus {
              outline: none;
            }
          }
          .text {
            cursor: pointer;
            border: 1px solid #d4d4d4;
            border-radius: 3px;
            display: inline-block;
            width: 24%;
            height: 24px;
            line-height: 24px;
            text-align: center;
            background-color: rgb(238, 238, 238);
          }
          .hide-input {
            display: none;
          }
        }

        .shadow {
          border: 1px solid @tableSha;
          border-radius: 5px;
          box-shadow: 0 0 10px 1px @tableSha;
        }
        .shadow-top {
          border-top: 5px solid rgb(0, 118, 192);
          border-radius: 5px;
          box-shadow: 0 0 10px 1px @tableSha;
        }
        .bc-fff {
          background-color: #fff;
        }
        /*表格样式*/
        table {
          tr.interleave {
            background-color: @interleave;
          }
        }
        table.my-table {
          margin-top: 15px;
          border: 1px solid @tableSha;
          border-radius: 5px;
          box-shadow: 0 0 10px 1px @tableSha;
          width: 100%;
          max-width: 100%;
          border-spacing: 0;
          border-collapse: separate;
          overflow-x: auto;
          /*overflow: hidden;*/
          thead {
            background-color: rgb(230, 239, 245);
            overflow: hidden;
            tr {
              th {
                padding: 5px 10px 5px 10px;
                border-bottom: 2px solid rgb(206, 219, 227);
                border-top: none;
                vertical-align:middle;
              }
              th:first-child {
                border-top-left-radius: 5px;
              }
              th:last-child {
                border-top-right-radius: 5px;
              }
              th:not(:first-child) {
                border-left: 1px dashed @tdBorder;
              }
              th {
                .img1 { //th上面显示的图
                  width: 29px;
                  height: 32px;
                  background: url(../static/img/th-2.png);
                  float: right;
                  margin-top: -6px;
                  margin-bottom: -6px;
                  margin-right: -10px;
                  cursor: pointer;
                  position: relative;
                  &:hover {
                    .hide-content {
                      display: block;
                    }
                  }
                  .hide-content {
                    position: absolute;
                    top: 32px;
                    display: none;
                    .img2 {
                      cursor: pointer;
                      background-color: transparent;
                      z-index: 11;
                      margin-left: 6px;
                    }
                    ul {
                      margin: -5px 0 0 -30px;
                      border: 1px solid @tableSha;
                      box-shadow: 0 0 10px 1px @tableSha;
                      padding: 0;
                      z-index: 10;
                      background-color: #fff;
                      font-weight: normal;
                      cursor: pointer;
                      li {
                        padding: 5px 20px;
                        white-space: nowrap;
                        &:hover {
                          background-color: @trIn;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          tbody {
            cursor: pointer;
            font-size: 12px;
            tr {
              /*td:first-child {
                border-bottom-left-radius: 5px;
              }*/
              /*td:last-child {*/
              /*border-bottom-right-radius: 5px;*/
              /*}*/
              td {
                padding: 5px 10px 5px 10px;
                border-top: none;
                border-bottom: 1px dashed @tdBorder;
                vertical-align: middle;
              }
              td:not(:first-child) {
                border-left: 1px dashed @tdBorder;
              }
              &:hover {
                background-color: @trHover;
              }
            }
            tr.tr-bc {
              background-color: rgb(246, 248, 250);
            }
            tr.in {
              background-color: @trIn;
            }
            tr:last-child {
              td {
                border-bottom: none;
              }
              td:first-child {
                border-bottom-left-radius: 5px;
              }
              td:last-child {
                border-bottom-right-radius: 5px;
              }
            }
          }
          table tr:first-child th:first-child {
            border-top-left-radius: 5px
          }
        }
        table.no-shadow {
          border-radius: 0;
          box-shadow: none;
        }
        table.table-top{
          thead{
            tr{
              th{
                vertical-align: top;
              }
            }
          }
          tbody{
            tr{
              td{
                vertical-align: top;
              }
            }
          }
        }

        /*修改表格插件样式*/
        .el-table {
          border-radius: 5px;
          border: 1px solid @tableSha;
          .el-table__header-wrapper { //表头
            table {
              thead {
                background-color: rgb(230, 239, 245);
                tr {
                  th {
                    height: 30px;
                    border-bottom: 2px solid rgb(206, 219, 227);
                    border-top: none;
                    background-color: rgb(230, 239, 245);
                    > .cell {
                      padding: 0px 10px;
                      line-height: 20px;
                      background-color: rgb(230, 239, 245);
                    }
                  }
                }
              }
            }
          }
          .el-table__body-wrapper {
            /*overflow: visible;*/
            font-size: 12px;
            table {
              tbody {
                tr {
                  td {
                    height: 28px;
                    > .cell {
                      padding: 0 10px;
                      line-height: 20px;
                    }
                  }
                  &:hover {
                    background-color: @trHover;
                    td {
                      background-color: @trHover;
                    }
                  }
                }
                tr.el-table__row--striped {
                  td {
                    background-color: #f6f8fa;
                  }
                }
              }
            }
          }
        }

        /*筛选框样式*/
        .filtrate-content {
          width: 290px;
          border: 1px solid @tableSha;
          border-radius: 5px;
          box-shadow: 0 0 10px 1px @tableSha;
          position: absolute;
          right: 0;
          top: 40px;
          padding: 14px 14px 20px 14px;
          background-color: #fff;
          z-index: 10;
          .up {
            position: absolute;
            right: 20px;
            top: -9px;
          }
          .title {
            padding-bottom: 9px;
            border-bottom: 1px solid @fliterBorder;
          }
          .content {
            padding-top: 6px;
            .left {
              float: left;
              width: 70px;
            }
            .right {
              float: left;
              width: 185px;
              input {
                border: 1px solid @fliterBorder;
                border-radius: 3px;
                width: 100%;
              }
            }
            .single {
              margin: 3px 0;
              min-height: 28px;
            }
          }
          .search-btn {
            margin-top: 20px;
            margin-left: 90px;
          }
        }
        /*页面共用样式*/
        .all-content {
          height: 100%;
          .under {
            padding-top: 50px;
            border-top: 1px solid @border;
            min-height: calc(~'100vh - 58px');
            float: left;
            margin-top: -1px;
            width: 100%;
            .under-left {
              position: absolute;
              z-index: 20;
              float: left;
              width: 250px;
              /*min-height: calc(~'100vh - 58px');*/
              /*height: 100%;*/
              margin: 0;
              padding: 0;
              color: @color;
              li {
                cursor: pointer;
              }
              li.active {
                background-color: #fff;
                .father {
                  .triangle {
                    opacity: 1;
                  }
                  border-right: 1px solid @triangle-color;
                  color: @in;
                }
                /*.children {*/
                /*display: block;*/
                /*}*/
              }
              .father {
                height: 40px;
                line-height: 40px;
                border-bottom: 1px solid #d3d4d4;
                border-top: 1px solid #fbfbfb;
                font-weight: bold;
                .img {
                  float: left;
                  width: 16px;
                  height: 25px;
                  margin: 6px 12px 0 20px;
                }
                img {
                  float: right;
                  margin: 16px 20px 0 0;
                }
                .triangle {
                  float: right;
                  width: 0;
                  height: 0;
                  margin-top: 4px;
                  border-top: 15px solid transparent;
                  border-right: 18px solid @triangle-color;
                  border-bottom: 15px solid transparent;
                  opacity: 0;
                }
              }
              .children {
                /*display: none;*/
                border-top: 1px solid #fbfbfb;
                border-bottom: 1px solid #d3d4d4;
                font-size: 13px;
                a {
                  height: 25px;
                  line-height: 25px;
                  color: inherit;
                  padding-left: 23px;
                }
                a.active, a:hover, .router-link-active, .router-link-active:hover {
                  color: @in;
                  background-color: @inBc;
                }
              }
            }
            .under-right {

              /*position: absolute;*/
              /*top:50px;*/

              margin-left: 250px;
              background: url("../static/img/html-bc.png");
              background-size: 100% 100%;
              border-left: 1px solid rgb(211, 212, 212);
              display: inline-block;
              /*width: calc(~'100vw - 270px');*/
              min-width: 1170px;
              min-height: calc(~'100vh - 58px');
              padding-left: 25px;
              padding-top: 28px;
              padding-bottom: 50px;
              width: 100%;
              margin-right: -260px;
              padding-right: 260px;
              .shadow-title {
                margin: 16px 33px 0 33px;
                padding-bottom: 5px;
                border-bottom: 1px solid rgb(212, 212, 212);
                color: rgb(0, 118, 192);
              }
              .title {
                color: rgb(67, 67, 67);
                font-weight: bold;
                .title-b {
                  font-weight: bold;
                  font-size: 18px;
                }
              }
              > div {
                margin: 0;
              }

              /*几个结果页面的共用样式*/
              .cover {
                bottom: 0;
                position: fixed;
                left: 0;
                min-height: 100%;
                width: 100%;
                opacity: 0.5;
                z-index: 30;
                background-color: #333;
              }
              .light-btn {
                position: relative;
                z-index: 31;
                &:after {
                  content: "修改受检者关注的基因和表型";
                  right: -200px;
                  position: absolute;
                  /*width: 200px;*/
                  /*height: 100px;*/
                  /*background-color: #fff;*/
                }
              }
              .light-search {
                position: relative;
                z-index: 31;
                &:after {
                  content: "自定义筛选条件";
                  right: 100px;
                  width: 100px;
                  position: absolute;
                  /*width: 200px;*/
                  /*height: 100px;*/
                  /*background-color: #fff;*/
                }
              }
              .long {
                margin-top: 40px;
              }

              .top-content {
                margin-bottom: -15px;
                .red {
                  color: rgb(243, 98, 81);
                }
                .detail-btn-content {
                  margin: 10px 0;
                  .refresh {
                    display: inline-block;
                    margin-right: 20px;
                  }
                  #filtrate-content-edit4,#filtrate-content-edit2,#filtrate-content-edit-1,#filtrate-content-edit-0,#filtrate-content-edit, #filtrate-content-edit-2 {
                    position: absolute;
                    padding: 0;
                    width: auto;
                    width: 98px;
                    left: 118px;
                    .up {
                      left: 40px;
                    }
                    ul {
                      padding: 0;
                      margin: 0;
                      li {
                        cursor: pointer;
                        height: 28px;
                        line-height: 28px;
                        text-align: center;
                        &:hover {
                          background-color: rgb(255, 236, 210);
                        }
                      }
                      li:first-child {
                        border-top-left-radius: 5px;
                        border-top-right-radius: 5px;
                      }
                      li:last-child {
                        border-bottom-left-radius: 5px;
                        border-bottom-right-radius: 5px;
                      }
                    }
                  }
                }
              }

              /*修改bootstrap样式*/

              .tooltip{
                /*white-space: nowrap;*/
                .tooltip-inner{
                  text-align: left;
                }
              }
              .modal-dialog {
                /*position: absolute;*/
                /*margin: 10px auto;*/
                /*left: 0;*/
                /*right: 0;*/
                /*top: 50%;*/
                .modal-header {
                  padding: 8px 15px;
                  font-size: 14px;
                  color: #fff;
                  background: linear-gradient(to bottom, rgb(46, 157, 228), rgb(7, 126, 202));
                  border-top-left-radius: 6px;
                  border-top-right-radius: 6px;
                  h4 {
                    font-size: 14px;
                  }
                  .close {
                    margin-top: -2px;
                    color: #fff;
                    opacity: 1;
                  }
                  .modal-title {
                    margin: 0;
                    line-height: 1.42857143
                  }
                }
              }

              /*.modal.in .modal-dialog {*/
              /*-webkit-transform: translate(0, 0%);*/
              /*-ms-transform: translate(0, 0%);*/
              /*-o-transform: translate(0, 0%);*/
              /*transform: translate(0, 0%);*/
              /*}*/

              /*.modal.fade .modal-dialog {*/
              /*-webkit-transition: -webkit-transform .3s ease-out;*/
              /*-o-transition: -o-transform .3s ease-out;*/
              /*transition: transform .3s ease-out;*/
              /*-webkit-transform: translate(0, -75%);*/
              /*-ms-transform: translate(0, -75%);*/
              /*-o-transform: translate(0, -75%);*/
              /*transform: translate(0, -75%)*/
              /*}*/

              /*.modal.in .modal-dialog {*/
              /*-webkit-transform: translate(0, -50%);*/
              /*-ms-transform: translate(0, -50%);*/
              /*-o-transform: translate(0, -50%);*/
              /*transform: translate(0, -50%)*/
              /*}*/
            }
          }
        }
        /*加载动画*/
        .spinner {
          z-index: 10000;
          position: fixed;
          top: 50%;
          left: 45%;
          width: 150px;
          text-align: center;
          div {
            width: 30px;
            height: 30px;
            background-color: #258dc1;
            border-radius: 100%;
            display: inline-block;
            -webkit-animation: bounceDelay 1.4s infinite ease-in-out;
            animation: bounceDelay 1.4s infinite ease-in-out;
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
          }
          .bounce1 {
            -webkit-animation-delay: -0.32s;
            animation-delay: -0.32s;
          }
          .bounce2 {
            -webkit-animation-delay: -0.16s;
            animation-delay: -0.16s;
          }
        }
        @-webkit-keyframes bounceDelay {
          0%, 80%, 100% {
            -webkit-transform: scale(0.0)
          }
          40% {
            -webkit-transform: scale(1.0)
          }
        }
        @keyframes bounceDelay {
          0%, 80%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
          }
          40% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
          }
        }

      }
    }
  }
</style>
