<!--变异详情的模态框-->
<!--cnvResult里面的CNV实际上应该放到mutateModalCNV.vue里面，但是由于和本文件相似性更高，放到了这里-->
<template>
  <div class="content">
    <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="mutateDetailModal" role="dialog"
         aria-labelledby="gridSystemModalLabel1">
      <div class="modal-dialog modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="gridSystemModalLabel1">详情</h4>
          </div>
          <div class="modal-body" id="id_modal_mutate">

            <div class="modal-btn">
              <span class="my-btn" :data-url="moduleData.url" @click="patchEdit(moduleData.url,moduleData.id)"><img
                src="../../../static/img/red-save.png"
                alt="">保存</span>
              <span class="my-btn close-btn" data-dismiss="modal"><img src="../../../static/img/red-close.png" alt="">关闭</span>
            </div>


            <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'|| app==='grandtrio' ">
              <a class="analyze-mutate po common-a" v-if="moduleData.variant" :href="dbHtml+'#/variationD?p='+moduleData.variant.chrom + ':'
              + moduleData.variant.start + ':' + moduleData.variant.ref + ':' + moduleData.variant.alt"
                 target="_blank" title="查看变异数据库">查看变异数据库
              </a>
              <!--<a class="analyze-mutate po common-a" v-if="moduleData.variant"-->
              <!--@click="showDataBase(moduleData.variant.chrom + ':'+ moduleData.variant.start + ':' + moduleData.variant.ref + ':' + moduleData.variant.alt)">查看变异数据库 弹框待做</a>-->
            </div>
            <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno' || app==='grandtrio'||app==='grandwcnv'">
              <span class="title">位点：</span>
              <span v-if="moduleData.variant">
               <span
                 v-if="moduleData.variant.start == moduleData.variant.end">{{moduleData.variant.chrom}}:{{moduleData.variant.start}}({{moduleData.variant.ref}}/{{moduleData.variant.alt}})</span>
               <span
                 v-else="">{{moduleData.variant.chrom}}:{{moduleData.variant.start}}-{{moduleData.variant.end}}({{moduleData.variant.ref}}/{{moduleData.variant.alt}})</span>
            </span>
            </div>

            <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'">
              <router-link v-if="moduleData.variant && (app==='grandmgd'||app==='grandanno')" class="common-a" :to="{path:'/taskM/foo/locusSvg',query:{pos: moduleData.variant.chrom +
                       ':' + moduleData.variant.start+ '-' + moduleData.variant.end,id:ID}}" target="_blank"
                           title="查看位点覆盖图">查看位点覆盖图
              </router-link>
              <router-link v-if="moduleData.variant && app==='grandmito'" class="common-a" :to="{path:'/taskM/foo/locusSvg',query:{pos: moduleData.variant.chrom +
                       ':' + moduleData.variant.start+ '-' + moduleData.variant.end,id:ID,t:1}}" target="_blank"
                           title="查看位点覆盖图">查看位点覆盖图
              </router-link>
            </div>

            <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'||app==='grandtrio'">
              <span class="title">基因：</span><span v-if="moduleData.anno">
                    <a class="common-a" target="_blank" v-if="moduleData.anno.genes.symbols" v-for="(oneGene,index) in moduleData.anno.genes.symbols"
                       :href="dbHtml+'#/gene?geneValue='+moduleData.anno.genes.symbols.join(',')">
                      {{oneGene}} <span v-if="index!==moduleData.anno.genes.symbols.length-1">,</span>
                    </a>
            </span>
            </div>
            <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandwcnv'||app==='grandanno'||app==='grandtrio'">
              <span class="title">NCBI GENE ID:</span>
              <span v-if="moduleData.anno">
                    <a class="common-a" target="_blank" v-if="moduleData.anno.genes.geneids" v-for="(oneGene,index) in moduleData.anno.genes.geneids"
                       :href="dbHtml+'#/geneD?id='+oneGene">
                      {{oneGene}} <span v-if="index!==moduleData.anno.genes.geneids.length-1">,</span>
                    </a>
            </span>
            </div>
            <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito' || app==='grandwcnv'||app==='grandanno'||app==='grandtrio'">
              <span class="title">区域：</span><span v-if="moduleData.anno">{{moduleData.anno.regions.join(',')}}</span>
            </div>

            <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'||app==='grandtrio'">
              <span class="title">功能：</span><span v-if="moduleData.anno &&moduleData.anno.funcs.length!=0">{{moduleData.anno.funcs.join(
              ',')}}</span><span v-else="">-</span>
            </div>
            <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
              <span class="title">纯/杂合：</span><span v-if="moduleData.info">{{moduleData.info.info.genotype}}</span>
            </div>
            <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
              <span class="title">深度：</span><span v-if="moduleData.info">{{moduleData.info.info.depth}}</span>
            </div>

            <div class="col-md-4" v-if=" app==='grandwcnv'">
              <span class="title">相对深度：</span><span v-if="moduleData.info && moduleData.info.info.wgs">{{moduleData.info.info.wgs.mCPratio}}</span><span v-else="">-</span>
            </div>
            <div class="col-md-4" v-if=" app==='grandwcnv'">
              <span class="title">人群平均深度：</span><span v-if="moduleData.info && moduleData.info.info.wgs">{{moduleData.info.info.wgs.mDepOfPopu}}</span><span v-else="">-</span>
            </div>
            <div class="col-md-4" v-if=" app==='grandwcnv'">
              <span class="title">人群深度标准差：</span><span v-if="moduleData.info && moduleData.info.info.wgs">{{moduleData.info.info.wgs.stdOfPopDep}}</span><span v-else="">-</span>
            </div>

            <div class="col-md-12" v-if="app==='grandwcnv'">
              <span class="title">基因：</span><span v-if="moduleData.anno">
                    <a class="common-a" target="_blank" v-if="moduleData.anno.genes.symbols" v-for="(oneGene,index) in moduleData.anno.genes.symbols"
                       :href="dbHtml+'#/gene?n='+oneGene">
                      {{oneGene}} <span v-if="index!==moduleData.anno.genes.symbols.length-1">,</span>
                    </a>
            </span>
            </div>

            <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
              <span class="title">质量：</span><span v-if="moduleData.info">{{moduleData.info.info.quality}}</span>
            </div>
            <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
              <span class="title">变异比例：</span>
              <span v-if="moduleData.info">{{moduleData.info.info.ratio | percentData}}%</span>
            </div>
            <div class="col-md-4" v-if="app==='grandmgd'||app==='grandanno' || app==='grandtrio'">
              <span class="title">MCAP：</span><span v-if="moduleData.anno">{{moduleData.anno.dbinfo.mcap ? moduleData.anno.dbinfo.mcap : '-'}}</span>
            </div>

            <div class="col-md-4" v-if="app==='grandmgd'||app==='grandanno' || app==='grandtrio'">
              <span class="title">HGMD：</span><span v-if="moduleData.anno">{{moduleData.anno.dbinfo.hgmd ? moduleData.anno.dbinfo.hgmd : '-'}}</span>
            </div>
            <div class="col-md-4" v-if="app==='grandmgd'||app==='grandanno' || app==='grandtrio'">
              <span class="title">东亚人群频率(e/g)：</span><span v-if="moduleData.anno">{{moduleData.anno.freqs.dbfreq.exome |
            percentData}}%/{{moduleData.anno.freqs.dbfreq.genome |
            percentData}}%</span>
            </div>
            <div class="col-md-4" v-if="app==='grandmito'">
              <span class="title">人群频率：</span><span v-if="moduleData.anno">{{moduleData.anno.freqs.mtdb | percentData}}%</span>
            </div>
            <div class="col-md-4" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno' || app==='grandtrio'">
              <span class="title">本地人群频率：</span><span v-if="moduleData.anno">{{moduleData.anno.freqs.grandfreq | percentData}}%</span>
            </div>

            <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
              <span class="title">gatkFilter：</span><span v-if="moduleData.info && moduleData.info.info">{{moduleData.info.info.gatkFilter}}</span>
            </div>

            <!--moduleData.variant.chrom+':'+moduleData.variant.start+':'+moduleData.variant.end+':'+moduleData.variant.ref+':'+moduleData.variant.alt-->

            <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno'">
              <span class="title">ACMG：</span><span v-if="moduleData.intervar">{{moduleData.intervar.intervar}}
              (
              <router-link class="common-a" target="_blank"
                           :to="{path:'/taskM/foo/getIntervar',query:{query:moduleData.id
            }}">
              {{moduleData.intervar.intervarStr}}
            </router-link>
              )
            </span>
            </div>

            <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandanno' || app==='grandtrio'">
              <span class="title">CLINVAR：</span><span v-if="moduleData.anno&&moduleData.anno.dbinfo&&moduleData.anno.dbinfo.clinvar.length!=0">{{moduleData.anno.dbinfo.clinvar.join(
              ',')}}</span><span v-else="">-</span>
            </div>

            <div class="col-md-12" v-if="app==='grandmgd'|| app==='grandmito'||app==='grandwcnv'||app==='grandanno'||app==='grandtrio'">
              <div class=""><span class="title">变异信息：</span>
                (常用转录本：<span v-if="moduleData.diseases">{{moduleData.diseases[0].transcript?moduleData.diseases[0].transcript:'无'}}</span>)
              </div>
              <div v-if="moduleData.anno && moduleData.anno.changes">
                <div v-for="single in moduleData.anno.changes">{{single.gene}}:{{single.transcript}}:{{single.exon}}:{{single.nachange}}:{{single.aachange}}</div>
              </div>
            </div>

            <div class="col-md-12" v-if="app==='grandwcnv'">
              <span class="title">DGV：</span><span v-if="moduleData.anno" class="break-all">{{moduleData.anno.dgvs.join(',')}}</span>
            </div>

            <table class="table my-table no-shadow" v-if="app==='grandtrio'">
              <thead>
              <tr>
                <th>关系</th>
                <th>姓名</th>
                <th>是否存在</th>
                <th>纯/杂合</th>
                <th>质量</th>
                <th>深度</th>
                <th>gatkFilter</th>
                <th>变异比例</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>受检者</td>
                <td><span v-if="moduleData.info && moduleData.info.datafile">{{moduleData.info.datafile.patientName?moduleData.info.datafile.patientName:'-'}}</span></td>
                <td><span>{{patientEx ? '存在' : '不存在'}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.info">{{moduleData.info.info.genotype}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.info">{{moduleData.info.info.quality}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.info">{{moduleData.info.info.depth}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.info">{{moduleData.info.info.gatkFilter}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.info">{{moduleData.info.info.ratio}}</span></td>
              </tr>
              <tr>
                <td>父亲</td>
                <td><span v-if="moduleData.info && moduleData.info.familyInfo &&  moduleData.info.familyInfo.father&& moduleData.info.familyInfo.father.datafile">{{moduleData.info.familyInfo.father.datafile.patientName?moduleData.info.familyInfo.father.datafile.patientName:'-'}}</span></td>
                <td><span>{{fatherEx ? '存在' : '不存在'}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.familyInfo &&  moduleData.info.familyInfo.father&& moduleData.info.familyInfo.father.datafile">{{moduleData.info.familyInfo.father.info.genotype}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.familyInfo &&  moduleData.info.familyInfo.father&& moduleData.info.familyInfo.father.datafile">{{moduleData.info.familyInfo.father.info.quality}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.familyInfo &&  moduleData.info.familyInfo.father&& moduleData.info.familyInfo.father.datafile">{{moduleData.info.familyInfo.father.info.depth}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.familyInfo &&  moduleData.info.familyInfo.father&& moduleData.info.familyInfo.father.datafile">{{moduleData.info.familyInfo.father.info.gatkFilter}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.familyInfo &&  moduleData.info.familyInfo.father&& moduleData.info.familyInfo.father.datafile">{{moduleData.info.familyInfo.father.info.ratio}}</span></td>
              </tr>
              <tr>
                <td>母亲</td>
                <td><span v-if="moduleData.info && moduleData.info.familyInfo &&  moduleData.info.familyInfo.mother&& moduleData.info.familyInfo.mother.datafile">{{moduleData.info.familyInfo.mother.datafile.patientName?moduleData.info.familyInfo.mother.datafile.patientName:'-'}}</span></td>
                <td><span>{{motherEx ? '存在' : '不存在'}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.familyInfo &&  moduleData.info.familyInfo.mother&& moduleData.info.familyInfo.mother.datafile">{{moduleData.info.familyInfo.mother.info.genotype}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.familyInfo &&  moduleData.info.familyInfo.mother&& moduleData.info.familyInfo.mother.datafile">{{moduleData.info.familyInfo.mother.info.quality}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.familyInfo &&  moduleData.info.familyInfo.mother&& moduleData.info.familyInfo.mother.datafile">{{moduleData.info.familyInfo.mother.info.depth}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.familyInfo &&  moduleData.info.familyInfo.mother&& moduleData.info.familyInfo.mother.datafile">{{moduleData.info.familyInfo.mother.info.gatkFilter}}</span></td>
                <td><span v-if="moduleData.info && moduleData.info.familyInfo &&  moduleData.info.familyInfo.mother&& moduleData.info.familyInfo.mother.datafile">{{moduleData.info.familyInfo.mother.info.ratio}}</span></td>
              </tr>
              </tbody>
            </table>

            <div class="edit">
              <div class="edit-title">
                <span class="title">编辑：</span><span>(最后编辑人:"<span v-if="moduleData.info">{{moduleData.info.edit.lastEditor ? moduleData.info.edit.lastEditor :
                '无'}}</span>")：</span>
              </div>
              <!--<div class="edit-content" id="select_content">-->
              <!--<div>状态：</div>-->
              <!--<select class="form-control" id="detail_select">-->
              <!--<option value="major">主要的</option>-->
              <!--<option value="minor">次要的</option>-->
              <!--<option value="benign">良性的</option>-->
              <!--<option value="invalid">无效的</option>-->
              <!--<option value="">未作标记</option>-->
              <!--</select>-->
              <!--</div>-->

              <div class="edit-content">
                <div class="edit-radio" id="status-all">
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
                <textarea v-if="moduleData.info" class="form-control" id="comment" rows="3" :value="moduleData.info.edit.comment"></textarea>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
    <variationD :locus="locus"></variationD>
  </div>
</template>

<script>
  import variationD from './VariationDModal.vue'
  import acmgJson from './../../../static/acmg_rank.json'

  export default {
    props: ['moduleDataFromFather', 'ID', 'app', 'postId','datafile'],
    components: {
      'variationD': variationD,

    },
    data: function () {
      return {
        moduleData: this.moduleDataFromFather,
        locus: '',
        acmgJson: acmgJson,
        status: '',
        patientEx:'',
        fatherEx:'',
        motherEx:'',
      }
    },
    mounted: function () {
      const _vue = this;
      $('#id_modal_mutate').find('.status-content').on('click', function () {
        const _checkRadio = $(this).find('.check-span');
        const _parent = $(this).closest('.edit-radio');
        if (_checkRadio.hasClass('check-no')) {
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
        const _comment = $.trim($('#comment').val());
//        let _status = $('#status-all').find('.status-content').find('.check-yes').data('value')
//        let _validation = $('#validation-all').find('.status-content').find('.check-yes').data('value')

//        $('.validation-check').each(function () {
//          if ($(this).hasClass('check-yes')) {
//            _validation = _validation ? _validation : $(this).data('value')
//          }
//        });

        let _varType = '';
        if (_vue.app == 'grandwcnv') {
          _varType = 'cnv'
        } else if (_vue.app == 'grandtrio') {
          _varType = 'trio'
        } else {
          _varType = 'snv'
        }

        this.myAxios({
          url: 'report/edit/',
          method: 'post',
          data: {
            datafile:_vue.datafile?_vue.datafile:_vue.moduleData.info.datafile.code,
            varType: _varType,
            objId: _vue.postId,
            status: _vue.status,
//            validation: _vue.validation,
            comment: _comment,
          }
        }).then(function () {
//          _vue.$emit('changeStatus', {status: _vue.status, validation: _vue.validation, comment: _comment});
          _vue.$emit('changeStatus', {status: _vue.status, comment: _comment});
          alert('修改成功!');
          $('#mutateDetailModal').modal('hide')
        })
      },
      showDataBase: function (p) {
        this.locus = p;
        $("#variation-d").modal('show')
      }
    },
    watch: {
      moduleDataFromFather: function (newData) {
        $('#comment').val(newData.info.edit.comment);

        $('.status-check').each(function () {
          const _value = $(this).data('value');
          if ($(this).hasClass('check-yes')) {
            $(this).removeClass('check-yes').addClass('check-no')
          }
          if (_value === newData.info.edit.status) {
            $(this).removeClass('check-no').addClass('check-yes')
          }
        });

//        $('.validation-check').each(function () {
//          const _value = $(this).data('value');
//          if ($(this).hasClass('check-yes')) {
//            $(this).removeClass('check-yes').addClass('check-no')
//          }
//          if (_value === newData.info.edit.validation) {
//            $(this).removeClass('check-no').addClass('check-yes')
//          }
//        });

        /*处理受检者、父母是否存在*/
        if(newData.info && newData.info.flag && newData.info.flag.family){
          let family= newData.info.flag.family;
          this.patientEx = parseInt(family.substring(0,1));
          this.fatherEx = parseInt(family.substring(1,2));
          this.motherEx = parseInt(family.substring(2,3));
        }


        let intervarArr = [];
        $.each(newData.intervar, function (key, value) {
          if (key == 'ba1' && value) {
            intervarArr.push('BA1')
          }
          if (key == 'bp') {
            $.each(value, function (i, data) {
              if (i == 0 && data) {
                intervarArr.push('BP1')
              } else if (i == 1 && data) {
                intervarArr.push('BP2')
              } else if (i == 2 && data) {
                intervarArr.push('BP3')
              } else if (i == 3 && data) {
                intervarArr.push('BP4')
              } else if (i == 4 && data) {
                intervarArr.push('BP5')
              } else if (i == 5 && data) {
                intervarArr.push('BP6')
              } else if (i == 6 && data) {
                intervarArr.push('BP7')
              }
            })
          }
          if (key == 'bs') {
            $.each(value, function (i, data) {
              if (i == 0 && data) {
                intervarArr.push('BS1')
              } else if (i == 1 && data) {
                intervarArr.push('BS2')
              } else if (i == 2 && data) {
                intervarArr.push('BS3')
              } else if (i == 3 && data) {
                intervarArr.push('BS4')
              }
            })
          }
          if (key == 'pm') {
            $.each(value, function (i, data) {
              if (i == 0 && data) {
                intervarArr.push('PM1')
              } else if (i == 1 && data) {
                intervarArr.push('PM2')
              } else if (i == 2 && data) {
                intervarArr.push('PM3')
              } else if (i == 3 && data) {
                intervarArr.push('PM4')
              } else if (i == 4 && data) {
                intervarArr.push('PM5')
              } else if (i == 5 && data) {
                intervarArr.push('PM6')
              }
            })
          }
          if (key == 'pp') {
            $.each(value, function (i, data) {
              if (i == 0 && data) {
                intervarArr.push('PP1')
              } else if (i == 1 && data) {
                intervarArr.push('PP2')
              } else if (i == 2 && data) {
                intervarArr.push('PP3')
              } else if (i == 3 && data) {
                intervarArr.push('PP4')
              } else if (i == 4 && data) {
                intervarArr.push('PP5')
              }
            })
          }
          if (key == 'ps') {
            $.each(value, function (i, data) {
              if (i == 0 && data) {
                intervarArr.push('PS1')
              } else if (i == 1 && data) {
                intervarArr.push('PS2')
              } else if (i == 2 && data) {
                intervarArr.push('PS3')
              } else if (i == 3 && data) {
                intervarArr.push('PS4')
              }
            })
          }
          if (key == 'pvs1' && value) {
            intervarArr.push('PVS1')
          }
        });
        if(newData.intervar){
          newData.intervar.intervarStr = intervarArr.join(',');
        }
        this.moduleData = newData;
      }
    },
    filters: {
      percentData: function (data) { //取百分比
//        if (data == 0) {
//          return 0;
//        }
//        data = data * 100;
//        data = data.toFixed(2);
//        return data

        return Math.round(data * 100)

      },
    }
  }
</script>

<style scoped lang="less">
  #id_modal_mutate {
    .edit-radio {
      display: inline-block;
      .status-content {
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

    .col-md-4 {
      margin: 4px 0;
    }
    .col-md-12 {
      margin: 4px 0;
    }
    .edit {
      margin: 0 15px;
      padding-top: 5px;
      clear: both;
      #comment {
        margin-bottom: 10px;
      }
      .edit-content {
        margin-bottom: 8px;
      }
    }
    .edit-title {
      margin-bottom: 10px;
    }
    .my-table {
      float: right;
    }
  }
</style>
