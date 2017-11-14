<template>
  <div class="all-content" id="dataA">
    <top-header></top-header>
    <div class="under" id="under">
      <AnalyzeLeft></AnalyzeLeft>
      <div class="under-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import topHeader from './global/Header.vue'
  import AnalyzeLeft from './global/AnalyzeLeft.vue'

  export default {
    components: {
      'top-header': topHeader,
      'AnalyzeLeft': AnalyzeLeft,
    },
    data: function () {
      return {
        leftObj: {
          pipelineArr: []
        },
        pageObj: {  //页面的code对应的name
          grandmgd: 'dataA-sgList',
          grandmito: 'dataA-mtList',
          grandwcnv: 'dataA-cnvList',
          grandanno: 'dataA-annoList',
          grandtrio: 'dataA-trioList',
        }
      }
    },
    updated: function () {
      this.getActive();
//      this.getHref();
    },
    created: function () {
//      const _vue = this;
//      this.myAxios({
//        url: 'application/app/',
//      }).then(function (resp) {
//        $.each(resp.data.results, function (i, data) {
//            data.vue_name = '';
//          if (data.category === "pipeline") {
//            _vue.leftObj.pipelineArr.push(data)
//          }
//        });
//      }).catch(function (error) {
//        _vue.catchFun(error);
//      })
    },
    methods: {
      toPage: function (pagePath) {
        this.$router.push({path: '' + pagePath})
      },
      getHref: function () {
        const _vue = this;
        $.each(_vue.leftObj, function (k1, k2) { //k2代表pipelineArr
          $.each(k2, function (k3, k4) {
            $.each(_vue.pageObj, function (k5, k6) {
              if (k5 === k4.code) {
                k4.vue_name = k6
              }
            });
          })
        })
      },
      getActive: function () {  //通过子页面判断左边具体的active
        const currentPath = this.$router.currentRoute.name;
        $.each(this.pageObj, function (code, name) {
          if (name === currentPath) {
            $(".children").find('a').each(function () {
              if ($(this).data('code') === code) {
                $(this).addClass('active')
              }
            });
          }
        })
      },
    }
  }
</script>

<style scoped lang="less">
  #dataA{
    #under{
      .under-left {
        .analyze-flow {
          background: url(../../static/img/all-1.png) 0 400px;
        }
        .analyze-soft{
          background: url(../../static/img/all-1.png) 0 374px;
        }
        .analyze-tool{
          background: url(../../static/img/all-1.png) 0 346px;
        }
        .task-genotype {
         margin-top: 3px;
          background: url(../../static/img/all-1.png) 0 80px;
        }
        .active {
          .analyze-flow {
            background: url(../../static/img/all-1.png) 16px 400px;
          }
          .analyze-soft{
            background: url(../../static/img/all-1.png) 16px 374px;
          }
          .analyze-tool{
            background: url(../../static/img/all-1.png) 16px 346px;
          }
          .task-genotype {
            background: url(../../static/img/all-1.png) 16px 80px;
          }
          .father{
            img{
              transform:rotate(180deg);
              -ms-transform:rotate(180deg); 	/* IE 9 */
              -moz-transform:rotate(180deg); 	/* Firefox */
              -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
              -o-transform:rotate(180deg); 	/* Opera */
            }
          }
        }
      }
    }
  }


</style>
