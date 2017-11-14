<template>
  <div class="all-content" id="dataM">
    <top-header></top-header>
    <div class="under">
      <ul class="under-left">
        <li class="active">
          <div class="father">
            <span class="img test-platform"></span>
            <span>检测平台</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
          <div @click.stop="" class="children" id="capChildren">
            <router-link class="block" to="/dataM/foo/platform">全部</router-link>
            <router-link class="block" v-for="listA in capArr" :key="listA.code" :to="{path:'/dataM/foo/platform',query:{code:listA.code}}">{{listA.code}}</router-link>

            <!--<router-link to="/dataM/foo/grandE" data-code='grandE' class="block">-->
              <!--GrandExome-->
            <!--</router-link>-->
            <!--<router-link to='/dataM/foo/hg19_WGS' data-code="hg19" class="block">-->
              <!--hg19_WGS-->
            <!--</router-link>-->
            <!--<router-link to='/dataM/foo/IDTexome' data-code="hg19" class="block">-->
              <!--IDTexome-->
            <!--</router-link>-->
            <!--<router-link to='/dataM/foo/hg19_MT' data-code="hg19" class="block">-->
              <!--hg19_MT-->
            <!--</router-link>-->
            <!--<router-link to='/dataM/foo/agilentV6' data-code="hg19" class="block">-->
              <!--AgilentV6-->
            <!--</router-link>-->
            <!--<router-link to='/dataM/foo/trusightOne' data-code="hg19" class="block">-->
              <!--TrusightOne-->
            <!--</router-link>-->
          </div>
        </li>
        <li>
          <div class="father">
            <span class="img capture-region"></span>
            <span>捕获区域管理</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
          <div @click.stop="" class="children" style="display: none">
            <router-link to="/dataM/foo/capList" data-code='capList' class="block">
              捕获区域数据
            </router-link>
            <router-link to='/dataM/foo/addCap' data-code="addCap" class="block">
              添加捕获区域数据
            </router-link>
          </div>
        </li>
        <li>
          <div class="father">
            <span class="img capture-up"></span>
            <span>数据上传</span>
            <i class="triangle"></i>
            <img src="../../static/img/under-left-1.png" alt="">
          </div>
          <div @click.stop="" class="children" style="display: none">
            <router-link to="/dataM/foo/sUpload" data-code='sUpload' class="block">
              单个文件上传
            </router-link>
            <!--<router-link to='/dataM/foo/aUpload' data-code="aUpload" class="block">-->
              <!--多个文件批量上传-->
            <!--</router-link>-->
          </div>
        </li>
      </ul>
      <div class="under-right">
        <router-view :capArr="capArr"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import topHeader from './global/Header.vue'
  export default {
    components: {
      'top-header': topHeader,
    },
    data:function () {
      return{
        capArr:[],
        pageObj: {  //页面的code对应的name
          capList: 'dataM-capList',
          addCap: 'dataM-addCap',
          sUpload: 'dataM-sUpload',
          aUpload: 'dataM-aUpload',
        },
      }
    },
    created: function () {
      this.getCapture();
      this.getActive();
    },
    methods: {
      getCapture:function () {
        const _vue = this;
        if(this.capArr.length==0){
          this.myAxios({
            url:'sample/capture/'
          }).then(function (resp) {
            _vue.capArr = resp.data.results;
          }).catch(function (error) {
            _vue.catchFun(error);
          })
        }
      },
      getActive: function () {  //通过子页面判断左边具体的active
        const currentPath = this.$router.currentRoute.name;
        if(currentPath.includes('platform')){
          $(".under-left").find('li:first-child').addClass('active')
        }
        $.each(this.pageObj, function (code, name) {
          if (name === currentPath) {
            $(".children").find('a').each(function () {
              if ($(this).data('code') === code) {
                  $(this).parent().find('.active').removeClass('active');
                $(this).addClass('active');
                $(this).closest('li').addClass('active')
              }
            });
          }
        });
      },
    }
  }
</script>

<style scoped lang="less">
  #dataM{
    #capChildren{
      .router-link-active{
        color: inherit;
        background-color: inherit;
      }
      .router-link-exact-active{
        color: #0e7dc3;
        background-color: #dceef9;
      }
    }
  }
  .under-left {
    .data-centre{
      background: url(../../static/img/all-1.png) 0 266px;
    }
    .test-platform{
      background: url(../../static/img/all-1.png) 0 240px;
    }
    .capture-region{
      background: url(../../static/img/all-1.png) 0 212px;
    }
    .capture-up{
      background: url(../../static/img/all-1.png) 0 186px;
    }
    .active {
      .father{
        img{
          transform:rotate(180deg);
          -ms-transform:rotate(180deg); 	/* IE 9 */
          -moz-transform:rotate(180deg); 	/* Firefox */
          -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
          -o-transform:rotate(180deg); 	/* Opera */
        }
      }
      .data-centre{
        background: url(../../static/img/all-1.png) 16px 266px;
      }
      .test-platform{
        background: url(../../static/img/all-1.png) 16px 240px;
      }
      .capture-region{
        background: url(../../static/img/all-1.png) 16px 212px;
      }
      .capture-up{
        background: url(../../static/img/all-1.png) 16px 186px;
      }
    }
  }

</style>
