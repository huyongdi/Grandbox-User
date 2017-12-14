<!--suppress ALL -->
<template>
  <div id="app" :class="{'xOverflow':inLogin}">
    <nav-header v-if="!inLogin"></nav-header>

    <div class="router-content">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
  import header from './components/global/header.vue'
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
      if(name === 'aHome' || name === 'login' || name==='p404'){
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
        });
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

  .bc {
    background: #fff;
    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
    font-weight: bold;
  }

  html {
    min-width: 1430px;
    background: linear-gradient(to bottom, #f0f0f0, #ffffff);
    min-height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    body {
      background-color: #f5f5f5;
      /*min-height: 100%;*/
      min-height: 100vh;
      width: 100%;
      margin: 0;
      padding: 0;
      font-family: "Microsoft YaHei","微软雅黑" !important;
      #app {
        /*min-height: 50px;*/
        min-height: 100vh;
        /*overflow-x: hidden;*/
        position: relative;

        .router-content{
          width: 100%;
          min-height: calc(~'100vh - 50px');
          background-size: 100% 100%;
          .p-div{
            padding: 30px 60px;
          }
          .top-content{

          }

          .data-content{
            min-height: calc(~'100vh - 50px');
            .left-ul {
              display: inline-block;
              width: 251px;
              background-color: #f5f5f5;
              min-height: calc(~'100vh - 50px');
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
            .right-content{
              display: inline-block;
              min-height: calc(~'100vh - 50px');
              min-width: calc(~'100vw - 275px');
              max-width: calc(~'100vw - 275px');
              vertical-align: top;
              padding: 20px 10px;
              border-left:1px solid #d3d4d4;
              margin-left: -4px;
              background: url("../static/img/html-bc.png") repeat center;
              background-size:100% 100%;
              background-position: 0 0;
            }
            .drop-down{
              > .title {
                .bc;
                font-size: 16px;
                padding: 10px 20px;
              }
              > .content-one {
                .bc;
                background-color: #fff;
                margin: 20px 0;
                padding: 10px 0;
                .header {
                  .fa {
                    color: @in;
                    margin-right: 15px;
                    width: 14px;
                    height: 14px;
                  }
                  position: relative;
                  height: 42px;
                  line-height: 42px;
                  padding: 0 15px 0 35px;
                  color: #333;
                  cursor: pointer;
                }
                .content {
                  padding: 15px 35px 15px;
                  font-size: 12px;
                }
                .left-right {
                  overflow: hidden;
                  .left, .right {
                    float: left;
                    width: 48%;
                    .title {
                      margin-bottom: 15px;
                      padding: 0 10px;
                      line-height: 40px;
                      height: 40px;
                      background: #e4ecea;
                      border-left: 3px solid #27a482;
                      color: #333;
                      overflow: hidden;
                      font-size: 14px;
                    }
                    ul {
                      margin-left: 12px;
                      li {
                        height: 33px;
                        line-height: 33px;
                        border-bottom: 1px dashed #ddd;
                      }
                    }
                  }
                  .left {
                    margin-right: 2%
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
