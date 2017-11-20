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

        .router-content{
          width: 100%;
          min-height: calc(~'100vh - 50px');
          background: url("../static/img/html-bc.png");
          >div{
            padding: 30px 60px;
          }
          .top-content{

          }
        }



      }
    }
  }
</style>
