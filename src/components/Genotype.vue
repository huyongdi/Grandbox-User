<template>
  <div id="genoType-content" class="row">
    <loading v-show="loading"></loading>

    <div class="title">
      <span class="title-b">医学大数据库</span>
      <span class="title-s">< 表型分析</span>
    </div>

    <div class="col-sm-11">
      <div class="content shadow-top">

        <div class="one" id="content0">
          <div class="base-color">
            <span>添加表型相关基因</span>
            <div class="out-in">
              <span id="content0-0" class="check out-check"></span>
              <span>关联子表型</span>
            </div>
          </div>
          <fuzzyQuery placeholder='请输入表型' :leftData="leftData0" :rightData="originalRightData0" title="已选表型"
                      @sendInput="receiveFuzzy0"></fuzzyQuery>
        </div>

        <div class="one" id="content1">
          <div class="base-color">
            <span>去除表型相关基因</span>
            <div class="out-in">
              <span id="content1-0" class="check out-check"></span>
              <span>关联子表型</span>
            </div>
          </div>
          <fuzzyQuery placeholder='请输入表型' :leftData="leftData1" :rightData="originalRightData1" title="已选表型"
                      @sendInput="receiveFuzzy1"></fuzzyQuery>
        </div>

        <div class="btn-content">
          <span class="my-btn search-btn" @click="search"><img src="../../static/img/red-con.png" alt="">搜索</span>
          <div class="out-in orphanet-content">
            <span id="content-op" class="out-check check"></span>
            <span>扩展orphanet信息</span>
          </div>
        </div>
        <span class="my-btn submit" id="copy" @click.stop="copyGene"><img src="../../static/img/red-submit.png" alt="">复制基因到剪切板</span>
        <input type="text" class="form-control" id="copy-input">
        <div class="table-content">
          <!--<div class="my-table-content">-->
            <table class="my-table" id="show-table">
              <thead>
              <tr>
                <th style="width: 100px">基因ID</th>
                <th>基因名</th>
                <th>别名</th>
                <th>疾病</th>
                <!--<th>Panels</th>-->
                <!--<th>AgilentV5</th>-->
                <!--<th>AgilentV6</th>-->
                <!--<th>IDTexome</th>-->
                <!--<th>MedExome</th>-->

                <th>表型</th>
                <th>操作</th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="(result,index) in results" :class="[{'tr-bc':index%2},'p-tr-'+index]" :data-index="index" class="p-tr" >
                <td style="position: relative">{{result.gene.geneId}}
                </td>
                <td class="copy-gene">{{result.gene.name.symbol}}</td>
                <td class="warp">{{result.gene.name.synonyms.join('|')}}</td>
                <diseaseTd style="max-width: 250px" class="warp" :geneResp="result.gene" @sendOmimId="getOmimId"></diseaseTd>
                <td>
                <span class="show-hpos" v-for="hpo in result.hpos">{{hpo.info.hpoId}}({{hpo.info.title.chinese ? hpo.info.title.chinese
                  : hpo.info.title.english}})</span>
                </td>
                <td><a href="javascript:void(0)" class="common-a show-more" @click="showHide" :data-index="index">更多</a></td>
              </tr>

              <tr class="special-tr" v-for="(result,index) in results" :class="'tr-panel-'+index" style="display: none">
                <td style="width: 100px">相关panels</td>
                <td colspan="5"><span v-for="panel in result.gene.panels">{{panel.code}}-{{panel.name}}&nbsp;&nbsp;&nbsp;</span></td>
              </tr>
              <tr class="special-tr" v-for="(result,index) in results" :class="'tr-agv5-'+index" style="display: none">
                <td>AgilentV5</td>
                <td colspan="5"><div v-for="list in result.gene.tags.cov5">{{list.transcript}}:  {{list.value.AgilentV5 | filterData}}</div></td>
              </tr>
              <tr class="special-tr" v-for="(result,index) in results" :class="'tr-agv6-'+index" style="display: none">
                <td>AgilentV6</td>
                <td colspan="5"><div v-for="list in result.gene.tags.cov5">{{list.transcript}}:  {{list.value.AgilentV6 | filterData}}</div></td>
              </tr>
              <tr class="special-tr" v-for="(result,index) in results" :class="'tr-idt-'+index" style="display: none">
                <td>IDTexome</td>
                <td colspan="5"><div v-for="list in result.gene.tags.cov5">{{list.transcript}}:  {{list.value.IDTexome | filterData}}</div></td>
              </tr>
              <tr class="special-tr" v-for="(result,index) in results" :class="'tr-med-'+index" style="display: none">
                <td>MedExome</td>
                <td colspan="5"><div v-for="list in result.gene.tags.cov5">{{list.transcript}}:  {{list.value.MedExome | filterData}}</div></td>
              </tr>

              <tr v-if="results.length===0">
                <td class="center" colspan="6">暂无数据</td>
              </tr>
              </tbody>

            </table>
          <!--</div>-->
        </div>
        <hpoModal :omimId="omimId"></hpoModal>

      </div>
    </div>


  </div>
</template>

<script>
  import fuzzyQuery from './global/fuzzyQueryNew.vue'
  import diseaseTd from './global/geneDiseaseTd.vue'
  import hpoModal from './global/HpoModalNew.vue'

  export default {
    components: {
      'fuzzyQuery': fuzzyQuery,
      'diseaseTd': diseaseTd,
      'hpoModal': hpoModal,
    },
    data: function () {
      return {
        loading: '',
        omimId:0,

        input0: '',
        input0Arr: [],
        leftData0: [],
        originalRightData0: [],

        input1: '',
        input1Arr: [],
        leftData1: [],
        originalRightData1: [],

        results: [],
      }
    },
    mounted: function () {
      this.baseInit()
    },
    methods: {
      copyGene: function () {
        let geneArr = [];
        $('.copy-gene').each(function () {
          geneArr.push($.trim($(this).html()))
        });
        $('#copy-input').val(geneArr.join(','));
        const input = document.getElementById('copy-input');
        input.focus();
        input.select();
        try {
          if (document.execCommand('copy', false, null)) {
            alert('已复制')
          } else {
            $('#copy-input').css('opacity', '1')
          }
        } catch (err) {
          $('#copy-input').css('opacity', '1')
        }
      },
      baseInit: function () {
        $('.out-in').on('click', function () {
          const _check = $(this).find('.check')
          if (_check.hasClass('out-check')) {
            _check.removeClass('out-check').addClass('in-check')
          } else {
            _check.removeClass('in-check').addClass('out-check')
          }
        })
      },
      receiveFuzzy0: function (data) {
        const _vue = this
        this.loading = true
        this.myAxios({
          url: _vue.dbUrl + 'knowledge/phenomini/?query=' + data,
          type: 'get'
        }).then(function (resp) {
          _vue.loading = false
          const results = resp.data
          _vue.leftData0 = []
          $.each(results, function (i, data) {
            data.vHtml = data.hpoId + ' ' + data.titles.chinese + '(' + data.titles.english + ')'
            _vue.leftData0.push({
              key: data.hpoId,
              value: data.vHtml
            })
          })
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      receiveFuzzy1: function (data) {
        const _vue = this
        this.loading = true
        this.myAxios({
          url: _vue.dbUrl + 'knowledge/phenomini/?query=' + data,
          type: 'get'
        }).then(function (resp) {
          _vue.loading = false
          const results = resp.data
          _vue.leftData1 = []
          $.each(results, function (i, data) {
            data.vHtml = data.hpoId + ' ' + data.titles.chinese + '(' + data.titles.english + ')'
            _vue.leftData1.push({
              key: data.hpoId,
              value: data.vHtml
            })
          })
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      getOmimId: function (id) {
        this.omimId = id;
        $("#hpo_modalN").modal('show')
      },
      search: function () {
        const _vue = this
        this.loading = true
        const ajaxMust = []
        const ajaxOpt = []

        _vue.results = [];

        $('#content0').find('.fuzzy-content .right .content .has-panel .hasPanel-one').each(function (i, data) {
          ajaxMust.push($(this)[0].dataset.key)
        })
        $('#content1').find('.fuzzy-content .right .content .has-panel .hasPanel-one').each(function (i, data) {
          ajaxOpt.push($(this)[0].dataset.key)
        })


        this.myAxios({
          url: _vue.dbUrl + 'knowledge/phenomini/',
          method: 'post',
          data: {
            'includes': ajaxMust,
            'excludes': ajaxOpt,
            'children': [$('#content0-0').hasClass('in-check'), $('#content1-0').hasClass('in-check')],
            'orpha': $('#content-op').hasClass('in-check')
          }
        }).then(function (resp) {
          _vue.loading = false

          $.each(resp.data,function (k1,k2) {
            $.each(k2.gene.omims,function (i,data) {
              data.inheritances = [];
              $.each(data.phenotypeMaps,function (k,value) {
                if(value.gene.geneId == k2.gene.geneId){
                  data.inheritances = value.phenotype.inheritance?value.phenotype.inheritance:[]
                }
              })
            })
          })

          _vue.results = resp.data
          console.log(_vue.results)
        }).catch(function (error) {
          _vue.catchFun(error)
        })

      },
      showHide:function (e) {
//        const _this = $(e.target).closest('tr');
        const index = $(e.target).data('index');

        $(".tr-panel-"+index).slideToggle();
        $(".tr-agv5-"+index).slideToggle();
        $(".tr-agv6-"+index).slideToggle();
        $(".tr-idt-"+index).slideToggle();
        $(".tr-med-"+index).slideToggle();
      }
    },
    watch:{
      results:function () {
        this.$nextTick(function () {
          $(".p-tr").each(function () {
            const index = $(this).data('index');
            $(this).after($(".tr-med-"+index)).after($(".tr-idt-"+index)).after($(".tr-agv6-"+index)).after($(".tr-agv5-"+index)).after($(".tr-panel-"+index))
          })
        })
      }
    },
    filters: {
      filterData: function (data) { //取百分比
        if (data == 0) {
          return 0
        }
        else if (data == 1) {
          return 1
        } else {
          return data.toFixed(4)
        }
      },
    }
  }
</script>

<style scoped lang="less">

  #genoType-content {
    /*新样式*/
    #show-table{
      .special-tr{
        cursor: auto;
        &:hover{
          background-color: #fff;
        }
      }
    }

    .content {
      .one {
        margin: 30px 33px 0;
        .base-color {
          margin: 0 0 15px;
          .out-in {
            margin-left: 25px;
          }
        }
        .fuzzy-content {
          padding: 0 10px;
        }
      }
    }

    .content {
      min-height: 450px;
      margin-top: 25px;
      background-color: #fff;
      padding-bottom: 20px;

      #copy-input {
        margin-left: 10px;
        opacity: 0;
        width: 500px;
        float: left;
      }
      #copy {
        float: left;
        width: 150px;
        margin-left: 33px;
        margin-bottom: 10px;
      }
      .out-in {
        display: inline-block;
        cursor: pointer;
        margin-bottom: 5px;
        margin-right: 10px;
        .check {
          display: inline-block;
          width: 15px;
          height: 15px;
          background-size: 15px 15px;
          margin-bottom: -3px;
        }
        .out-check {
          background: url("../../static/img/all-2.png") 43px 0;
        }
        .in-check {
          background: url("../../static/img/all-2.png") 15px 0;
        }
      }
      .content-op {
        clear: both;
        width: 100%;
        text-align: center;
        padding-top: 20px;
      }
      .check-content {
        margin: 0 33px;
        .title {
          display: block;
          margin: 10px 0 5px 0;
        }
      }
      .btn-content{
        width: 280px;
        margin: 15px auto;
        .search-btn {
         display: inline-block;
          width: 95px;
        }
        .orphanet-content{
          margin-left: 30px;
          display: inline-block;
          .out-check{
            background-position: 72px 15px;
          }
          .in-check {
            background: url(../../static/img/red-all.png);
          }
        }
      }

      .table-content {
        margin: 0 33px;
        .my-table {
          box-shadow: none;
          border-radius: 0;
        }
      }

      /*width: 650px;*/
      /*margin: 40px auto;*/
      /*>div{*/
      /*margin-bottom: 26px;*/
      /*.left-input{*/
      /*margin-left: 16px;*/
      /*}*/
      /*.red {*/
      /*font-family: "FZXH1JW";*/
      /*color: rgb(238, 83, 63);*/
      /*font-size: 18px;*/
      /*float: left;*/
      /*margin-top: 5px;*/
      /*margin-right: 8px;*/
      /*}*/
      /*input{*/
      /*width: 345px;*/
      /*}*/
      /*.out-in{*/
      /*display: inline-block;*/
      /*margin-left: 15px;*/
      /*cursor: pointer;*/
      /*.check{*/
      /*display: inline-block;*/
      /*width: 15px;*/
      /*height: 15px;*/
      /*background-size: 15px 15px;*/
      /*margin-bottom: -3px;*/
      /*}*/
      /*.out-check{*/
      /*background: url("../../static/img/all-2.png") 43px 0;*/
      /*}*/
      /*.in-check{*/
      /*background: url("../../static/img/all-2.png") 15px 0;*/
      /*}*/
      /*}*/
      /*}*/
      /*.single{*/
      /*position: relative;*/
      /*ul{*/
      /*width: 345px;*/
      /*left: 16px;*/
      /*}*/
      /*}*/
    }
  }
</style>
