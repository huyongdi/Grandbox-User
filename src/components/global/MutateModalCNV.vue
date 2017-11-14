<!--CNV变异详情的模态框-->
<template>
  <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="mutateDetailModalCNV" role="dialog"
       aria-labelledby="gridSystemModalLabel2">
    <div class="modal-dialog modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="gridSystemModalLabel2">详情</h4>
        </div>
        <div class="modal-body" id="id_modal">

          <div class="modal-btn">
            <span class="my-btn" :data-url="CNVModuleData.url" @click="patchEdit(CNVModuleData.url,CNVModuleData.id)"><img src="../../../static/img/red-save.png" alt="">保存</span>
            <span class="my-btn close-btn" data-dismiss="modal"><img src="../../../static/img/red-close.png" alt="">关闭</span>
          </div>

          <div class="row">
            <div class="col-md-4">
              <span class="title">位点：</span> <span v-if="CNVModuleData.variant">
               <span v-if="CNVModuleData.variant.start == CNVModuleData.variant.end">{{CNVModuleData.variant.chrom}}:{{CNVModuleData.variant.start}}({{CNVModuleData.variant.ref}}/{{CNVModuleData.variant.alt}})</span>
               <span v-else="">{{CNVModuleData.variant.chrom}}:{{CNVModuleData.variant.start}}-{{CNVModuleData.variant.end}}({{CNVModuleData.variant.ref}}/{{CNVModuleData.variant.alt}})</span>
            </span>
            </div>
            <div class="col-md-4">
              <router-link v-if="CNVModuleData.variant" :to="{path:'/taskM/foo/locusSvg',query:{pos: CNVModuleData.variant.chrom +
                       ':' + CNVModuleData.variant.start+ '-' + CNVModuleData.variant.end,id:ID}}" target="_blank"
                           title="查看位点覆盖图" class="common-a">查看位点覆盖图
              </router-link>
            </div>
            <div class="col-md-4">
              <span class="title">区域：</span><span v-if="CNVModuleData.anno">{{CNVModuleData.anno.regions.join(',')}}</span>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <span class="title">基因型：</span><span v-if="CNVModuleData.info&& CNVModuleData.info.info.wes">{{CNVModuleData.info.info.wes.geneType?CNVModuleData.info.info.wes.geneType:'-'}}</span><span v-else=""> - </span>
            </div>
            <div class="col-md-4">
              <span class="title">深度(原始)：</span><span v-if="CNVModuleData.info&& CNVModuleData.info.info.wes">{{CNVModuleData.info.info.wes.originalReadDepth?CNVModuleData.info.info.wes.originalReadDepth:'-'}}</span><span v-else=""> - </span>
            </div>
            <div class="col-md-4">
              <span class="title">深度(标准化)：</span><span v-if="CNVModuleData.info&& CNVModuleData.info.info.wes">{{CNVModuleData.info.info.wes.readDepth?CNVModuleData.info.info.wes.readDepth:'-'}}</span><span v-else=""> - </span>
            </div>
          </div>

          <div class="row specialRow">
            <div class="col-md-11">
              <span class="title">基因：</span> <span v-if="CNVModuleData.anno">
                    <a class="common-a" target="_blank" v-if="CNVModuleData.anno.genes.symbols" v-for="(oneGene,index) in CNVModuleData.anno.genes.symbols"
                       :href="dbHtml+'#/gene?geneValue='+CNVModuleData.anno.genes.symbols.join(',')">
                      {{oneGene}} <span v-if="index!==CNVModuleData.anno.genes.symbols.length-1">,</span>
                    </a>
                  </span>
            </div>

          </div>
          <div class="row specialRow">
            <div class="col-md-11">
              <span class="title">NCBI GENE ID:</span>
              <span v-if="CNVModuleData.anno">
                    <a class="common-a" target="_blank" v-if="CNVModuleData.anno.genes.geneids" v-for="(oneGene,index) in CNVModuleData.anno.genes.geneids"
                       :href="dbHtml+'#/geneD?id='+oneGene">
                      {{oneGene}} <span v-if="index!==CNVModuleData.anno.genes.geneids.length-1">,</span>
                    </a>
            </span>
            </div>

          </div>

          <div class="row">
            <div class="col-md-12">
              <div class=""><span class="title">变异信息：</span>
                (常用转录本：<span v-if="CNVModuleData.diseases">{{CNVModuleData.diseases[0].transcript?CNVModuleData.diseases[0].transcript:'无'}}</span>)
              </div>
              <div v-if="CNVModuleData.anno && CNVModuleData.anno.changes">
                <div v-for="single in CNVModuleData.anno.changes">{{single.gene}}:{{single.transcript}}:{{single.exon}}:{{single.nachange}}:{{single.aachange}}</div>
              </div>
            </div>
          </div>

          <div class="row specialRow">
            <div class="col-md-11">
              <span class="title">DGV：</span><span v-if="CNVModuleData.anno" class="dgv">{{CNVModuleData.anno.dgvs.join(',')}}</span>
            </div>
          </div>

          <div class="center">
            <img :src=IMG alt="">
          </div>

          <div class="edit">
            <div class="edit-title">
              <span class="title">编辑：</span><span>(最后编辑人:"<span v-if="CNVModuleData.info && CNVModuleData.info.edit">{{CNVModuleData.info.edit.comment ? CNVModuleData.info.edit.comment : '无'}}</span>")：</span>
            </div>


            <div class="edit-content">
              <div class="edit-radio" id="status-allCNV">
                <span class="title">报告：</span>
                <span class="status-content"><span class="check-span check-no status-check" data-value="major" data-type="0"></span>主要的</span>
                <span class="status-content"><span class="check-span check-no status-check" data-value="minor" data-type="0"></span>次要的</span>
                <!--<span class="status-content"><span class="check-span check-no status-check" data-value="benign" data-type="0"></span>良性的</span>-->
                <!--<span class="status-content"><span class="check-span check-no status-check" data-value="invalid" data-type="0"></span>无效的</span>-->
                <span class="status-content"><span class="check-span check-no status-check" data-value="" data-type="0"></span>未做标记</span>
              </div>
            </div>

            <!--<div class="edit-content">-->
              <!--<div class="edit-radio" id="validation-all">-->
                <!--<span class="title">验证来源：</span>-->
                <!--<span class="status-content"><span class="check-span check-no validation-check" data-value="father" data-type="1"></span>父源</span>-->
                <!--<span class="status-content"><span class="check-span check-no validation-check" data-value="mother" data-type="1"></span>母源</span>-->
                <!--<span class="status-content"><span class="check-span check-no validation-check" data-value="both" data-type="1"></span>双方</span>-->
                <!--<span class="status-content"><span class="check-span check-no validation-check" data-value="unknown" data-type="1"></span>未知</span>-->
              <!--</div>-->
            <!--</div>-->

            <div class="edit-content">
              <div class="title">评论：</div>
              <textarea v-if="CNVModuleData.records" class="form-control" :data-id=CNVModuleData.id id="commentCNV"
                        rows="3" :value="CNVModuleData.info.edit.comment"></textarea>

            </div>

            <!--<div class="edit-content">-->
              <!--<div>状态：</div>-->
              <!--<select class="form-control" id="detail_selectCNV">-->
                <!--<option value="major">主要的</option>-->
                <!--<option value="minor">次要的</option>-->
                <!--<option value="benign">良性的</option>-->
                <!--<option value="invalid">无效的</option>-->
                <!--<option value="">未作标记</option>-->
              <!--</select>-->
            <!--</div>-->
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['moduleDataFromFatherCNV', 'ID','postId','datafile'],
    data: function () {
      return {
        CNVModuleData: this.moduleDataFromFatherCNV,
        IMG: '',
//        validation: '',
        status: '',
      }
    },
    mounted:function () {
      const _vue = this;
      $('#id_modal').find(".status-content").on("click",function () {
        const _checkRadio = $(this).find('.check-span');
        const _parent = $(this).closest('.edit-radio');
        if(_checkRadio.hasClass('check-no')){
          _parent.find('.check-yes').removeClass('check-yes').addClass('check-no');
          _checkRadio.removeClass('check-no').addClass('check-yes');

          if(_checkRadio.data('type')){ //validation-check
//            _vue.validation = _checkRadio.data('value')
          }else{
            _vue.status = _checkRadio.data('value')
          }
        }
      })
    },
    methods: {
      patchEdit: function (axiosUrl) {
        const _vue = this;
        const _comment = $.trim($("#commentCNV").val());
//        let _status=$("#status-all").find('.check-yes').data('value');
//        let _validation=$("#validation-all").find('.check-yes').data('value');

        this.myAxios({
          url: 'report/edit/',
          method: 'post',
          data: {
            datafile:_vue.datafile,
//            datafile:'59965ae4ccaa6c5f03a30cdf',
            varType: 'cnv',
            objId: _vue.postId,
            status: _vue.status,
//            validation: _vue.validation,
            comment: _comment,
          }
        }).then(function () {
//          _vue.$emit('changeStatusCNV', {status: _vue.status,validation: _vue.validation,comment: _comment});
          _vue.$emit('changeStatusCNV', {status: _vue.status,comment: _comment});
          alert('修改成功!');
          $("#mutateDetailModalCNV").modal('hide')
        });
      },
    },
    watch: {
      moduleDataFromFatherCNV: function (newData) {
        this.CNVModuleData = newData;
        const _vue = this;
        $("#commentCNV").val(newData.info.edit.comment);


        $('#status-allCNV').find('.status-check').each(function () {
          const _value = $(this).data('value');
          if($(this).hasClass('check-yes')){
            $(this).removeClass('check-yes').addClass('check-no')
          }
          if(_value === newData.info.edit.status){
            $(this).removeClass('check-no').addClass('check-yes')
          }
        });

//        $(".validation-check").each(function () {
//          const _value = $(this).data('value');
//          if($(this).hasClass('check-yes')){
//            $(this).removeClass('check-yes').addClass('check-no')
//          }
//          if(_value === newData.info.edit.validation){
//            $(this).removeClass('check-no').addClass('check-yes')
//          }
//        });

        this.myAxios({
          url: 'application/job/' + this.ID + '/image/?pos=' + newData.variant.chrom +
          ':' + newData.variant.start + '-' + newData.variant.end
        }).then(function (resp) {
//          _vue.IMG = resp.data.url
          _vue.IMG = resp.data
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #id_modal {
    .edit-title {
      margin-bottom: 10px;
    }
    .edit-content{
      margin-bottom: 10px;
    }
    .edit-radio {
      display: inline-block;
      .status-content{
        margin-right: 10px;
        cursor: pointer;
      }
      .check-span {
        display: inline-block;
        margin-bottom: -2px;
        margin-right: 5px;
      }
      .check-no {
        width: 15px;
        height: 15px;
        background: url(../../../static/img/all-2.png) 43px 0;
      }
      .check-yes {
        width: 15px;
        height: 15px;
        background: url(../../../static/img/all-2.png) 15px 0;
      }
    }
    .row {
      margin: 10px 0;
    }
    .edit {
      margin: 0 15px;
      padding-top: 5px;
      #comment {
        margin-bottom: 10px;
      }
    }
    .dgv{
      word-break: break-all;
    }
  }
</style>
