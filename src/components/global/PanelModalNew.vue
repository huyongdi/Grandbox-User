<!--通过引入模糊搜索建立的panel搜索框-->
<template>
  <!--点击修改panel的模态框-->
  <div class="modal fade " aria-labelledby="gridSystemModalLabe5" tabindex="-1" role="dialog" id="panelModal">
    <loading v-if="loading"></loading>
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title" id="gridSystemModalLabel5">提交基因信息</h4>
        </div>
        <div class="modal-body" id="modal-panel">

          <div class="modal-btn">
            <span class="my-btn" @click="saveEditGene"><img src="../../../static/img/red-save.png" alt="">保存</span>
            <span class="my-btn close-btn" data-dismiss="modal"><img src="../../../static/img/red-close.png" alt="">关闭</span>
          </div>

          <div class="row">
              <fuzzyQuery placeholder='请输入panel名' :leftData="panelData" :rightData="originalPanelData" title="已选panel" leftName="Panel信息"
                          @sendInput="receiveFuzzy"></fuzzyQuery>

            <div class="gene-content">
              <span class="name">Gene信息：</span>
              <textarea v-model="geneInput" placeholder="请用逗号或换行隔开" class="form-control"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fuzzyQuery from './fuzzyQueryNew.vue'
  export default {
    props: ['originalGeneInput','originalPanelData'],
    components: {
      'fuzzyQuery': fuzzyQuery,
    },
    data: function () {
      return {
        panelData: [],
        loading: false,
        geneInput:this.originalGeneInput?this.originalGeneInput:''
      }
    },
    mounted:function () {
      const _vue = this;
      const _modal = $("#panelModal");
      console.log(this.originalGeneInput)
      _modal.on('hidden.bs.modal', function (e) {
        _vue.geneInput = ''
      });
      _modal.on('show.bs.modal', function (e) {
        _modal.on("click",function () {
          _vue.panelData = []
        });
        $('.name').css("width",'30%');
        $('#panelModal').find('.content').css("width",'65%');
      })
    },
    watch:{
      originalGeneInput:function (newValue) {
        this.geneInput = newValue;
      },
      originalPanelData:function (newValue) {
        this.geneInput = this.originalGeneInput;

//        this.$emit('toPanel', {panel: this.originalPanelData})
      }
    },
    methods: {
      receiveFuzzy: function (data) {
        const _vue = this;
        _vue.loading = true;
        this.myAxios({
          url: _vue.dbUrl + 'product/panel/search/?query=' + data
        }).then(function (resp) {
          _vue.panelData = [];
          $.each(resp.data, function (n, data) {
            _vue.panelData.push({
              key: data.code,
              value: data.name
            })
          });
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      saveEditGene: function () {
        this.$emit('saveData', {panel: this.originalPanelData, gene: this.strToArr(this.geneInput)}) //函数名和父元素的@一致
      }
    },
  }
</script>

<style scoped lang="less">
  /*新的样式*/
  .name{
    height: 100px;
  }
  #fuzzy-content.fuzzy-content{
    padding: 0 15px;
    .name{
      width: 30%;
    }
    .hide-ul{
      max-height: 120px;
    }
  }
  .gene-content{
    width: 50%;
    position: absolute;
    top: 100px;
    padding-left: 15px;
    z-index: 10;
    .name{
      width: 30%;
      float: left;
    }
    textarea{
      margin-left: 3px;
      float: left;
      width: 63%;
      height: 100px;
    }
  }
  .gene-row {
    margin-top: 20px;
    textarea {
      width: 95%;
      height: 100px;
    }
  }
</style>
