<!--suppress ALL -->
<template>
  <div id="app">
    <nav-header v-if="!inLogin"></nav-header>

    <div class="router-content">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
  import header from './components/header.vue'
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
      this.baseBind();
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
      this.baseBind();
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
      baseBind: function () {
        /*点击tr加背景色*/
        $('table tbody').off('click').on('click', 'tr', function () {
          if (!$(this).hasClass('not-base')) {
            if ($(this).hasClass('in')) {
            } else {
              $(this).closest('tbody').find('.in').removeClass('in')
              $(this).addClass('in')
            }
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
      },
    }
  }

</script>

<style lang="less">
  @import "./components/global/css/common.css";
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

  html {
    min-width: 1430px;
    background: linear-gradient(to bottom, #f0f0f0, #ffffff);
    min-height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    body {
      background-color: #f5f5f5;
      min-height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
      font-family: "Microsoft YaHei","微软雅黑" !important;
      #app {
        min-height: 50px;
        overflow-x: hidden;
        position: relative;
        /*用户版开始*/

        .router-content{
          width: 100%;
          min-height: calc(~'100vh - 50px');
          background: url("../static/img/html-bc.png");

          padding: 30px 60px;
        }

        /*用户版结束*/






       /* !*页面共用样式*!
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
              !*min-height: calc(~'100vh - 58px');*!
              !*height: 100%;*!
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
                !*.children {*!
                !*display: block;*!
                !*}*!
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
                !*display: none;*!
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

              !*position: absolute;*!
              !*top:50px;*!

              margin-left: 250px;
              background: url("../static/img/html-bc.png");
              background-size: 100% 100%;
              border-left: 1px solid rgb(211, 212, 212);
              display: inline-block;
              !*width: calc(~'100vw - 270px');*!
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

              !*几个结果页面的共用样式*!
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
                  !*width: 200px;*!
                  !*height: 100px;*!
                  !*background-color: #fff;*!
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
                  !*width: 200px;*!
                  !*height: 100px;*!
                  !*background-color: #fff;*!
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

              !*修改bootstrap样式*!

              .tooltip{
                !*white-space: nowrap;*!
                .tooltip-inner{
                  text-align: left;
                }
              }
              .modal-dialog {
                !*position: absolute;*!
                !*margin: 10px auto;*!
                !*left: 0;*!
                !*right: 0;*!
                !*top: 50%;*!
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

              !*.modal.in .modal-dialog {*!
              !*-webkit-transform: translate(0, 0%);*!
              !*-ms-transform: translate(0, 0%);*!
              !*-o-transform: translate(0, 0%);*!
              !*transform: translate(0, 0%);*!
              !*}*!

              !*.modal.fade .modal-dialog {*!
              !*-webkit-transition: -webkit-transform .3s ease-out;*!
              !*-o-transition: -o-transform .3s ease-out;*!
              !*transition: transform .3s ease-out;*!
              !*-webkit-transform: translate(0, -75%);*!
              !*-ms-transform: translate(0, -75%);*!
              !*-o-transform: translate(0, -75%);*!
              !*transform: translate(0, -75%)*!
              !*}*!

              !*.modal.in .modal-dialog {*!
              !*-webkit-transform: translate(0, -50%);*!
              !*-ms-transform: translate(0, -50%);*!
              !*-o-transform: translate(0, -50%);*!
              !*transform: translate(0, -50%)*!
              !*}*!
            }
          }
        }*/


      }
    }
  }
</style>
