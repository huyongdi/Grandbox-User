<template>
  <div class="data-content">
    <toolHeader></toolHeader>
    <loading v-if="loading"></loading>
    <div class="right-content">
      <div class="row">
        <div class="col-xs-6 one">
          <div class="title">
            <span class="bold">添加表型相关基因</span>

            <span class="child-content">
              <span class="my-radio" id="hasRadio"></span>
              <span id="addChild">关联子表型</span>
            </span>
          </div>
          <choosePh @getHpo="getHpo" @getHpoAll="getHpoAll" :rightData="phRightData" phId="leftPhId"></choosePh>
        </div>
        <div class="col-xs-6 one">
          <div class="title">
            <span class="bold">去除表型相关基因</span>

            <span class="child-content">
              <span class="my-radio" id="deleteRadio"></span>
              <span id="deleteChild">关联子表型</span>
            </span>
          </div>
          <choosePh @getHpo="getHpoDelete" @getHpoAll="getHpoAllDelete" :rightData="phRightDataDelete" phId="rightPhId"></choosePh>

        </div>
      </div>

      <div class="center btn-content">
        <span data-v-76c9c7f4="" class="my-btn search-btn" @click="searchPh"><img src="../../static/img/red-con.png" alt="">搜索</span>
      </div>

      <div class="table-content">
        <span class="my-btn submit" id="copy" @click.stop="copyGene"><img src="../../static/img/red-submit.png" alt="">复制基因到剪切板</span>

        <table class="my-table" id="show-table">
          <thead>
          <tr>
            <th style="width: 100px">基因ID</th>
            <th>基因名</th>
            <th>别名</th>
            <th style="min-width: 150px">疾病</th>
            <th>表型</th>
            <!--<th>操作</th>-->
          </tr>
          </thead>

          <tbody>

          <tr v-for="(result,index) in phList" :class="['p-tr-'+index]" :data-index="index" class="p-tr">
            <td style="position: relative">{{result.geneid}}</td>
            <td class="copy-gene">{{result.name.symbol}}</td>
            <td class="warp">{{result.name.synonyms.join('|')}}</td>
            <td>
              <div v-for="dis in result.diseases">
                <span class="bold">[<span v-if="dis.inheritances.length == 0">无</span><span v-else="">{{dis.inheritances.join(',')}}</span>]</span>

                <a v-if="dis.title" class="po common-a" data-toggle="tooltip" data-placement="top" :data-original-title='dis.title.preferred'
                   @click="showHPO(dis._id)">
                  {{dis.title.chinese ? dis.title.chinese : dis.title.preferred}}
                </a>
                (
                <router-link :to="{path:'/omim',query:{id:dis.mimnumber}}" target="_blank">{{dis.mimnumber}}</router-link>
                )
              </div>
            </td>
            <td>
            <span class="show-hpos" v-for="hpo in result.hpos">{{hpo.hpoid}}({{hpo.name.chinese ? hpo.name.chinese : hpo.info.title.english}})</span>
            </td>
            <!--<td><a href="javascript:void(0)" class="common-a show-more" @click="showHide" :data-index="index">更多</a></td>-->
          </tr>
          </tbody>
        </table>
      </div>


      <input type="text" id="copy-input" class="hide">
      <hpoModal :omimId="omimId"></hpoModal>

    </div>
  </div>
</template>

<script>
  import page from './global/Page.vue'
  import toolHeader from './global/toolHeader.vue'
  import choosePh from './global/choosePh.vue'
  import hpoModal from './global/HpoModal.vue'



  export default {
    data: function () {
      return {
        phRightData: [],
        phRightDataDelete: [],
        allHpoData: [],
        postHpo: [],
        loading: false,

        phList: [],
        hasHpo: [],
        hasHpoDelete: [],
        omimId: '',
      }
    },
    mounted: function () {
    },
    components: {
      'page': page,
      'toolHeader': toolHeader,
      'choosePh': choosePh,
      'hpoModal': hpoModal,
    },
    methods: {
      searchPh: function () {
        this.loading = true;
        const _vue = this;
        this.myAxios({
          url: 'biomeddb/phenolyzer',
          method: 'post',
          data: {
            'includes': this.hasHpo,
            'excludes': this.hasHpoDelete,
            'children': [$('#hasRadio').hasClass('in-check'), $('#deleteRadio').hasClass('is-checked')],
          }
        }).then((resp) => {
          _vue.loading = false;
          _vue.phList = resp.data
        }).catch((error) => {
          _vue.catchFun(error)
        })

      },
      getHpoDelete: function (data) {
        this.hasHpoDelete = data
      },
      getHpo: function (data) {
        this.hasHpo = data
      },
      showHide: function (e) {
        const index = $(e.target).data('index');
        $(".tr-panel-" + index).slideToggle();
        $(".tr-agv5-" + index).slideToggle();
        $(".tr-agv6-" + index).slideToggle();
        $(".tr-idt-" + index).slideToggle();
        $(".tr-med-" + index).slideToggle();
      },
      getHpoAll: function (data) {
//        this.allHpoData = data;
//        const _vue = this;
//        this.postHpo = [];
//        $.each(data, function (key, value) {
//          _vue.postHpo.push(value._id)
//        })
      },
      getHpoAllDelete: function () {

      },
      copyGene: function () {
        let geneArr = [];
        const _copyInput = $('#copy-input');
        $('.copy-gene').each(function () {
          geneArr.push($.trim($(this).html()))
        });
        _copyInput.val(geneArr.join(','));
        const input = document.getElementById('copy-input');
        input.focus();
        input.select();
        try {
          if (document.execCommand('copy', false, null)) {
            this.success('已复制')
          } else {
            _copyInput.css('opacity', '1')
          }
        } catch (err) {
          _copyInput.css('opacity', '1')
        }
      },
      showHPO: function (id) {
        this.omimId = id;
        $("#hop_modal").modal("show")
      }

    },
    filter: {},
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip()
    },
  }
</script>

<style scoped lang="less">

  .one {
    padding: 0 50px;
    .title {
      margin-bottom: 10px;
      margin-left: -15px;
      .child-content {
        vertical-align: middle;
        margin-left: 30px;
        .my-radio {
          margin-bottom: -2px;
        }
      }
    }
  }

  .btn-content {
    margin: 20px 0;
  }

  .table-content {
    margin: 0 20px;
    #copy {
      width: 170px;
    }
  }


</style>
