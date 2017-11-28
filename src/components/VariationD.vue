<template>
  <div id="vaD-content" class="p-div">
    <loading v-show="loading"></loading>
    <div class="title">
      <span class="title-b">医学大数据库</span>
      <span class="title-s">< 变异</span>
    </div>

    <div class="shadow-top bc-fff">

      <!--<div class="gene-information">-->
        <!--<span class="gene-information-title base-color">基本信息</span>-->
        <!--<div class="gene-content row">-->
          <!--<span class="col-xs-2">变异：{{basicResp.chrom}}:{{basicResp.start}}-{{basicResp.end}}({{basicResp.ref}}/{{basicResp.alt}})</span>-->
          <!--<span class="col-xs-2">携带病例：0/0</span>-->

          <!--<span v-if="basicResp.avsnp" class="rsid">rsid: <a :href='"https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs="+basicResp.avsnp'-->
                                                             <!--class="common-a" target="_blank">{{basicResp.avsnp}}</a></span>-->
        <!--</div>-->
      <!--</div>-->


      <div class="title-list">
        <div @click="changeContent" data-type="0" class="title-single active">基本信息</div>
        <div @click="changeContent" data-type="1" class="title-single">人群频率</div>
        <div @click="changeContent" data-type="2" class="title-single">生信预测/剪切</div>
        <div @click="changeContent" data-type="3" class="title-single">疾病报道</div>
      </div>

      <div class="all-content">

        <div :class="{'hide':!in0}" class="basic-div">
          <div class="row">
            <span class="col-xs-2">变异：11:119052976-119052976(C/T) </span>
            <span v-if="basicResp.avsnp" class="rsid col-xs-2">
              rsid: <a :href='"https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs="+basicResp.avsnp' class="common-a" target="_blank">{{basicResp.avsnp}}</a>
            </span>
            <span class="col-xs-2">携带病例：0/0</span>
            <span class="col-xs-2">基因：ABC</span>
            <span class="col-xs-2">区域：exc</span>
            <span class="col-xs-2">功能：func</span>
            <span class="col-xs-2">纯杂合：杂合</span>
            <span class="col-xs-2">gatkFilter：fff</span>
            <span class="col-xs-2">深度：60</span>
            <span class="col-xs-2">变异比例(%)：60</span>
            <div  class="col-xs-4">
              <span class="pull-left">变异信息：</span>
              <ul class="pull-left">
                <li class="nowarp ellipsis po">11111111111111111111111111111111111111111111111111111</li>
              </ul>
            </div>
            <span class="col-xs-2">报告状态: 主要</span>

            <span class="col-xs-12">该位点。。。。。</span>

          </div>
        </div>

        <div :class="{'hide':!in1}">
          <div class="gene-information">
            <span class="gene-information-title base-color">人群频率</span>
            <div class="gene-content">
              <div class="row">
                <div class="frequency-chart col-md-6" id="frequency-chart"></div>
                <div class="frequency-chart col-md-6" id="frequency-chart-1"></div>
              </div>
            </div>
          </div>
        </div>
        <div :class="{'hide':!in2}">
          <div class="gene-information">
            <span class="gene-information-title base-color">DBnsfp</span>
            <div class="gene-content row">
              <div class="col-md-6">
                <table class="my-table no-thead">
                  <tbody>
                  <tr>
                    <td>数据库</td>
                    <td v-for="(data,index) in dataBaseArr" v-if="index>=0 &&index<=5">{{data | changeName}}
                    </td>
                  </tr>
                  <tr>
                    <td>score</td>
                    <td v-for="(data,index) in dataBaseData" v-if="index>=0 &&index<=5">{{data.score ? data.score : ' - '}}</td>
                  </tr>
                  <tr>
                    <td>pred</td>
                    <td v-for="(data,index) in dataBaseData" v-if="index>=0 &&index<=5">{{data.pred ? data.pred : ' - '}}</td>
                  </tr>
                  </tbody>
                </table>
                <table class="my-table no-thead">
                  <tbody>
                  <tr>
                    <td>数据库</td>
                    <td v-for="(data,index) in dataBaseArr" v-if="index>5">{{data | changeName}}
                    </td>
                  </tr>
                  <tr>
                    <td>score</td>
                    <td v-for="(data,index) in dataBaseData" v-if="index>5">{{data.score ? data.score : ' - '}}</td>
                  </tr>
                  <tr>
                    <td>pred</td>
                    <td v-for="(data,index) in dataBaseData" v-if="index>5">{{data.pred ? data.pred : ' - '}}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="gene-information">
            <span class="gene-information-title base-color">剪切区域</span>
            <div class="gene-content">

              <table class="my-table no-thead">
                <tbody>
                <tr>
                  <td>dbscSNV</td>
                  <td>
                <span class="col-md-6">ada_score:<span v-if="dbData">{{dbData.adaScore ? dbData.adaScore : ' - '}}</span><span
                  v-else=""> - </span></span>
                    <span class="col-md-6">rf_score:<span v-if="dbData">{{dbData.rfScore ? dbData.rfScore : ' - '}}</span><span
                      v-else=""> - </span></span>
                  </td>
                </tr>
                <tr>
                  <td>spidex</td>
                  <td>
                    <span class="col-md-6">max_tissue: <span v-if="spiData">{{spiData.maxTissue ? spiData.maxTissue : '-'}}</span><span
                      v-else=""> - </span></span>
                    <span class="col-md-6">zscore: <span v-if="spiData">{{spiData.zscore ? spiData.zscore : '-'}}</span><span
                      v-else=""> - </span></span>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div :class="{'hide':!in3}">
          <div class="gene-information">
            <span class="gene-information-title base-color">HGMD（2014-2）</span>
            <div class="gene-content">
              <table class="my-table no-thead">
                <tbody>
                <tr>
                  <td>基本信息</td>
                  <td>疾病信息</td>
                  <td>数据库</td>
                </tr>
                <tr>
                  <td colspan="3" v-if="!hgmdData" class="center">暂无数据</td>
                </tr>
                <tr v-if="hgmdData">
                  <td>hgmdNumber:&nbsp;{{hgmdData.hgmdNumber}}</td>
                  <td>disease:&nbsp;{{hgmdData.disease}}</td>
                  <td>uniprot:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.uniprot}}</span></td>
                </tr>
                <tr v-if="hgmdData">
                  <td>hgnc:&nbsp;{{hgmdData.hgnc}}</td>
                  <td>citation:&nbsp;{{hgmdData.citation}}</td>
                  <td>rsid:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.rsid}}</span></td>
                </tr>
                <tr v-if="hgmdData">
                  <td>hgvs:&nbsp;{{hgmdData.hgvs}}</td>
                  <td>comments:&nbsp;{{hgmdData.comments}}</td>
                  <td>ensembl:&nbsp;<span v-if="hgmdData">{{hgmdData.ensembl}}</span></td>
                </tr>
                <tr v-if="hgmdData">
                  <td>snv_raw:&nbsp;<span
                    v-if="hgmdData.snvRaw">{{hgmdData.snvRaw.chrom}}:{{hgmdData.snvRaw.start}}-{{hgmdData.snvRaw.end}}({{hgmdData.snvRaw.ref}}/{{hgmdData.snvRaw.alt}}){{hgmdData.snvRaw.strand}}</span>
                  </td>
                  <td>confidence:&nbsp;{{hgmdData.confidence}}</td>
                  <td>omim:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.omim}}</span></td>
                </tr>
                <tr v-if="hgmdData">
                  <td>密码子改变:&nbsp;<span v-if="hgmdData">{{hgmdData.codNum ? hgmdData.codNum : '-'}}</span></td>
                  <td>feature:&nbsp;{{hgmdData.feature}}</td>
                  <td>pmid:&nbsp;<span v-if="hgmdData.dbid">
                <a class="common-a" v-for="list in hgmdData.dbid.pmid" :href="'https://www.ncbi.nlm.nih.gov/pubmed/'+list"
                   target="_blank">{{list}}</a>
              </span></td>
                </tr>
                <tr v-if="hgmdData">
                  <td>核苷酸改变:&nbsp;<span v-if="hgmdData.change">{{hgmdData.change.nucleotide}}</span></td>
                  <td>mutType:&nbsp;<span v-if="hgmdData.type">{{hgmdData.type.mutation}}</span></td>
                  <td>hgmdAcc:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.hgmdAcc}}</span></td>
                </tr>
                <tr v-if="hgmdData">
                  <td>氨基酸改变:&nbsp;<span v-if="hgmdData.change">{{hgmdData.change.aminoacid}}</span></td>
                  <td>varType:&nbsp;<span v-if="hgmdData.type">{{hgmdData.type.mutation}}</span></td>
                  <td>entrez:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.entrez}}</span></td>
                </tr>
                <tr v-if="hgmdData">
                  <td colspan="3">genoSeq:&nbsp;{{hgmdData.genoSeq}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="gene-information">
            <span class="gene-information-title base-color">Clinvar（2017-01-30）</span>
            <div class="gene-content">

              <table class="no-thead my-table">
                <tbody>
                <tr>
                  <td>CLNACC</td>
                  <td>
                  <span v-if="clinvarData.clnacc">
                    <span v-for="list in clinvarData.clnacc">
                      <a class="common-a" target="_blank" :href="'https://www.ncbi.nlm.nih.gov/clinvar/'+list">{{list}}</a>&nbsp;&nbsp;&nbsp;
                    </span>
                  </span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>CLINSIG</td>
                  <td>
                    <span v-if="clinvarData.clinsig">{{clinvarData.clinsig.join('|')}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>CLNDBN</td>
                  <td>
                    <span v-if="clinvarData.clndbn">{{clinvarData.clndbn.join('|')}}</span>
                    <span v-else=""> - </span>
                  </td>
                </tr>
                <tr>
                  <td>CLNDSDBS</td>
                  <td>
                    <div class="clnd-conten pull-left">
                      <div v-if="clinvarData.clndsdbs" v-for="list in clinvarData.clndsdbs">
                        <div v-html="objToArr(list)"></div>
                      </div>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>

              <div class="gene-information">
                <span class="gene-information-title base-color">线粒体</span>
                <div class="gene-content">
                  <table class="my-table no-thead">
                    <tbody>
                    <tr>
                      <td>Mitomap</td>
                      <td>Mitimpact</td>
                      <td>Mitimpact dbnsfp</td>
                    </tr>
                    <tr>
                      <td>allele:&nbsp;{{MitomapData.allele}}</td>
                      <td>mitimpactId:&nbsp;{{MitimpactData.mitimpactId}}</td>
                      <td>EFIN_SP:&nbsp;&nbsp;
                        <span v-if="MitimpactData.dbnsfp">
                  <span v-if="MitimpactData.dbnsfp.efin_sp">{{MitimpactData.dbnsfp.efin_sp.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.efin_sp">{{MitimpactData.dbnsfp.efin_sp.pred}}(pred)</span>
                </span>
                      </td>
                    </tr>
                    <tr>
                      <td>aa_change:&nbsp;{{MitomapData.aaChange}}</td>
                      <td>ensemblId:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.ensembl.gene}}</span>
                      </td>
                      <td>EFIN_HD:&nbsp;&nbsp;
                        <span v-if="MitimpactData.dbnsfp">
                  <span v-if="MitimpactData.dbnsfp.efin_hd">{{MitimpactData.dbnsfp.efin_hd.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.efin_hd">{{MitimpactData.dbnsfp.efin_hd.pred}}(pred)</span>
              </span>
                      </td>
                    </tr>
                    <tr>
                      <td>homo:&nbsp;{{MitomapData.homo}}</td>
                      <td>ncbiId:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.ncbi.gene}}</span></td>
                      <td>Polyphen2:&nbsp;&nbsp;
                        <span v-if="MitimpactData.dbnsfp">
                  <span v-if="MitimpactData.dbnsfp.polyphen2">{{MitimpactData.dbnsfp.polyphen2.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.polyphen2">{{MitimpactData.dbnsfp.polyphen2.pred}}(pred)</span>
                </span>
                      </td>
                    </tr>
                    <tr>
                      <td>hete:&nbsp;{{MitomapData.hete}}</td>
                      <td>symbol:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.symbol}}</span></td>
                      <td>SIFT:&nbsp;&nbsp;
                        <span v-if="MitimpactData.dbnsfp">
                  <span v-if="MitimpactData.dbnsfp.sift">{{MitimpactData.dbnsfp.sift.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.sift">{{MitimpactData.dbnsfp.sift.pred}}(pred)</span>
                </span>
                      </td>
                    </tr>
                    <tr>
                      <td>status:&nbsp;{{MitomapData.status}}</td>
                      <td>aa_change:&nbsp;
                        <span v-if="MitimpactData.aaChange">
                  {{MitimpactData.aaChange.change.ref.aa}}-{{MitimpactData.aaChange.change.alt.aa}}
                </span>
                      </td>
                      <td>FATHMM:&nbsp;&nbsp;
                        <span v-if="MitimpactData.dbnsfp">
                  <span v-if="MitimpactData.dbnsfp.fathmm">{{MitimpactData.dbnsfp.fathmm.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.fathmm">{{MitimpactData.dbnsfp.fathmm.pred}}(pred)</span>
                </span>
                      </td>
                    </tr>
                    <tr>
                      <td>locus:&nbsp;{{MitomapData.locus}}</td>
                      <td>disease:&nbsp;{{MitimpactData.disease ? MitimpactData.disease : '-'}}</td>
                      <td>PROVEAN:&nbsp;&nbsp;
                        <span v-if="MitimpactData.dbnsfp">
                  <span v-if="MitimpactData.dbnsfp.provean">{{MitimpactData.dbnsfp.provean.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.provean">{{MitimpactData.dbnsfp.provean.pred}}(pred)</span>
                </span>
                      </td>
                    </tr>
                    <tr>
                      <td>disease:&nbsp;{{MitomapData.disease}}</td>
                      <td>status:&nbsp;{{MitimpactData.status ? MitimpactData.status : '-'}}</td>
                      <td>MutationAssessor:&nbsp;&nbsp;
                        <span v-if="MitimpactData.dbnsfp">
                   <span v-if="MitimpactData.dbnsfp.mutationassessor">{{MitimpactData.dbnsfp.mutationassessor.score}}(score)</span>&nbsp;
                  <span v-if="MitimpactData.dbnsfp.mutationassessor">{{MitimpactData.dbnsfp.mutationassessor.pred}}(pred)</span>
                </span>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!--<div>CLNDSDB:<span v-if="clinvarData.clndsdbs">{{clinvarData.clndsdbs.join('|')}}</span><span v-else=""> - </span></div>-->
              <!--<div>CLNDSDBID:<span v-if="clinvarData.clndsdbid">{{clinvarData.clndsdbid.join('|')}}</span><span v-else=""> - </span></div>-->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade bs-example-modal-lg" aria-labelledby="gridSystemModalLabe5" tabindex="-1" role="dialog" id="locusM">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content ">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="gridSystemModalLabel5">位点信息</h4>
          </div>
          <div class="modal-body" id="modal-panel">

            <div class="modal-btn">
              <span class="my-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>
            </div>

            <div class="table-content">
              <table class="table my-table no-shadow">
                <thead>
                <tr>
                  <th>Datafile</th>
                  <th>捕获区域</th>
                  <th>纯/杂合</th>
                  <th>深度</th>
                  <th>质量</th>
                  <th>变异比例</th>
                  <th>GatkFilter</th>
                  <th>状态</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="list in lists0">
                  <td>{{list.datafileData ? list.datafileData : '-'}}</td>
                  <td>{{list.capture ? list.capture : '-'}}</td>
                  <td>{{list.isHomo}}</td>
                  <td>{{list.depth}}</td>
                  <td>{{list.quality}}</td>
                  <td>{{list.ratio ? list.ratio.toFixed(4) : '-'}}</td>
                  <td>{{list.gatkFilter ? list.gatkFilter : '-'}}</td>
                  <td>
                    <span v-if="list.edit">
                      {{list.edit.status | getStatus}}
                    </span>
                    <span v-else="">无信息</span>
                  </td>
                </tr>
                <tr v-if="lists0.length === 0" class="center">
                  <td colspan="7">该位点在其它样本中没有信息</td>
                </tr>
                </tbody>
              </table>

            </div>

          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  const echarts = require('echarts');
  export default {
    data: function () {
      return {
        in0: true,
        in1: '',
        in2: '',
        in3: '',

        basicResp: '',

        deData: '',
        hgmdData: '',
        clinvarData: '',
        gwasData: '',
        MitomapData: '',
        MitimpactData: '',
        dbData: '',
        spiData: '',

        type_0: 0,
        type_1: 0,
        type_2: 0,
        type_3: 0,
        loading: false,

        dataBaseArr: [],
        dataBaseData: [],


        /*位点弹框*/
        fullLocusStr: '',
        lists0: []
      }
    },
    mounted: function () {
      const _vue = this;
      _vue.myAxios({
//        url: 'database/snv/?query=' + this.$route.query.id,
      }).then(function (resp) {
        _vue.loading = false;
        if (resp.data.results.length == 0) {
          _vue.alert('该位点无任何信息')
          return;
        }
        _vue.basicResp = resp.data.results[0];

        _vue.fullLocusStr =
          _vue.basicResp.chrom + ':' + _vue.basicResp.start + ':' + _vue.basicResp.end + ':' + _vue.basicResp.ref + ':' + _vue.basicResp.alt;

        _vue.dbfreq();//绘制人群频率
        _vue.dbnfsp(); //绘制dbnfsp区域
        _vue.fillHgmd();//填充hgmd
        _vue.fillClinvar(); //填充clinvar
        _vue.fillGwas();//填充gwas
        _vue.fillMito();//填充线粒体
        _vue.fillCut();//填充剪切区域


      }).catch(function (error) {
        _vue.catchFun(error)
      })
    },
    methods: {
      //切换导航
      changeContent: function (event) {
        const _current = $(event.target);
        const current = _current.data('type');
        _current.parent().find('.active').removeClass('active');
        _current.addClass('active');
        this.in0 = '';
        this.in1 = '';
        this.in2 = '';
        this.in3 = '';
        if (current === 0) {
          this.in0 = true
        } else if (current === 1) {
          this.in1 = true
        } else if (current === 2) {
          this.in2 = true
        } else if (current === 3) {
          this.in3 = true
        }
      },
      showLocusModal: function () {
        $("#locusM").modal('show');
        const _vue = this;
        _vue.$axios.all([this.myAxios.get('report/snv/' + this.fullLocusStr + '/records/'),
          this.myAxios.get('database/grandrecord/?type=snv&var=' + this.fullLocusStr)])
          .then(_vue.$axios.spread(function (resp1, resp2) {
            _vue.loading = false;
            let data1 = resp1.data;
            let data2 = resp2.data.results;

            /*处理2个接口，数据格式为一样，然后输出*/
            $.each(data1, function (i, data) {
              data.datafileData = data.datafile.code;
              if (_vue.type) { //1是CNV
                data.length = data.info.length;
                data.position = data.info.position;
                data.genoType = data.info.wes ? data.info.wes.geneType : data.info.wgs.geneType;
                data.originalReadDepth = data.info.wes ? data.info.wes.originalReadDepth : '-';
                data.readDepth = data.info.wes ? data.info.wes.readDepth : '-';
              } else {
                data.capture = data.datafile.capture;
                data.isHomo = data.info.genotype;
                data.depth = data.info.depth;
                data.quality = data.info.quality;
                data.ratio = data.info.ratio;
                data.gatkFilter = data.info.gatkFilter;
              }
            });

            if (_vue.type) { //1是CNV
              _vue.lists1 = data1;
              _vue.hide0 = true;
              _vue.hide1 = false;
              _vue.loading = false
            } else {
              _vue.lists0 = data1;
              _vue.hide0 = false;
              _vue.hide1 = true;
              _vue.loading = false
            }
            if (data2 && data2.length != 0) { //results是一个数组
              $.each(data2, function (n, value) {
                if (value.snv) {
                  $.each(value.snv, function (k1, k2) {
                    _vue.lists0.push({
                      datafileData: k2.datafile.sample,
                      capture: k2.datafile.capture,
                      isHomo: k2.info && k2.info.isHom ? '纯合' : '杂合',
                      depth: k2.info ? k2.info.depth : '',
                      quality: k2.info ? k2.info.quality : '',
                      ratio: k2.info ? k2.info.ratio : '',
                      gatkFilter: k2.info ? k2.info.gatkFilter : '',
                    })
                  });
                }
                if (value.cnv) {
                  $.each(value.cnv, function (k1, k2) {
                    _vue.lists1.push({
                      datafileData: k2.datafile.sample,
                      capture: k2.datafile.capture,
                      genoType: k2.cnvinfo.genoType,
                      originalReadDepth: k2.cnvinfo.originalReadDepth,
                      readDepth: k2.cnvinfo.readDepth,
                      length: value.length
                    })
                  });
                }
              })
            }

          }))
      },
      dbfreq: function () { /*德系犹太人*/
        let mtdb_data;
        let exac_data = this.basicResp.freq && this.basicResp.freq.exac ? this.basicResp.freq.exac : {
          "all": 0, //ExAC所有人群频率
          "afr": 0, //ExAC非洲人群频率
          "amr": 0, //ExAC美洲人群频率
          "eas": 0, //ExAC东亚人群频率
          "sas": 0, //ExAC南亚人群频率
          "fin": 0, //ExAC芬兰人群频率
          "nfe": 0, //ExAC非芬兰欧洲人群频率
          "oth": 0  //ExAC其他人群频率
        };
        let g100_data = this.basicResp.freq && this.basicResp.freq.onekg ? this.basicResp.freq.onekg : {
          "all": 0, //千人所有人群频率
          "afr": 0, //千人非洲人群频率
          "amr": 0, //千人美洲人群频率
          "eas": 0, //千人东亚人群频率
          "sas": 0, //千人南亚人群频率
          "eur": 0  //千人欧洲人群频率
        };
        let esp_data = this.basicResp.freq && this.basicResp.freq.esp6500 ? this.basicResp.freq.esp6500 : {
          "all": 0, //ESP6500si所有人群频率
          "aa": 0,  //ESP6500si_AA人群频率
          "ea": 0   //ESP6500si_EE人群频率
        };
        let grandFreq = this.basicResp.freq && this.basicResp.freq.grandfreq ? this.basicResp.freq.grandfreq : {
          sampleNum:0,
          freq:0,
          count:{
            gatkpass:{
              het:0,
              hom:0
            },
            total:{
              het:0,
              hom:0
            }
          }
        };
//        mtdb_data = this.basicResp.mito && this.basicResp.mito.mtdb ? this.basicResp.mito.mtdb : 0;
        mtdb_data = this.basicResp.freq && this.basicResp.freq.mtdb ? this.basicResp.freq.mtdb : 0;

        /*gnomad外显子和基因组*/
        let gnomadExome_data = this.basicResp.freq && this.basicResp.freq.gnomad && this.basicResp.freq.gnomad.exome ?
          this.basicResp.freq.gnomad.exome : {
            "all": 0.0, //gnomad外显子所有人群频率
            "afr": 0.0, //gnomad外显子非洲人群频率
            "amr": 0.0, //gnomad外显子美州人群频率
            "asj": 0.0, //gnomad外显子阿什肯纳兹犹太人
            "eas": 0.0, //gnomad外显子东亚人群频率
            "fin": 0.0,//gnomad外显子芬兰人群频率
            "nfe": 0.0,//gnomad外显子非芬兰欧洲人群频率
            "oth": 0.0,//gnomad外显子其他人群频率
            "sas": 0.0//gnomad外显子南亚人群频率
          };
        let gnomadGenome_data = this.basicResp.freq && this.basicResp.freq.gnomad && this.basicResp.freq.gnomad.genome ?
          this.basicResp.freq.gnomad.genome : {
            "all": 0.0, //gnomad外显子所有人群频率
            "afr": 0.0, //gnomad外显子非洲人群频率
            "amr": 0.0, //gnomad外显子美州人群频率
            "asj": 0.0, //gnomad外显子阿什肯纳兹犹太人
            "eas": 0.0, //gnomad外显子东亚人群频率
            "fin": 0.0,//gnomad外显子芬兰人群频率
            "nfe": 0.0,//gnomad外显子非芬兰欧洲人群频率
            "oth": 0.0,//gnomad外显子其他人群频率
          };

        this.dataBaseCharts('frequency-chart', {
          grid: {
            bottom: 200
          },
          tooltip: {
            trigger: 'item'
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisLabel: {rotate: -60, 'interval': 0},
              data: [{
                value: '本地全部',
                textStyle: {color: 'red', fontSize: '12'}
              },
                {
                  value: '本地高质量',
                  textStyle: {color: 'red', fontSize: '12'}
                },
                {value: 'gnomAD外显子东亚', textStyle: {color: 'red'}}, 'gnomAD外显子所有', 'gnomAD外显子非洲', 'gnomAD外显子美州', 'gnomAD外显子阿什肯纳兹犹太人',
                'gnomAD外显子芬兰', 'gnomAD外显子非芬兰欧洲', 'gnomAD外显子其他', 'gnomAD外显子南亚',
                {value: 'gnomAD基因组东亚', textStyle: {color: 'red'}}, 'gnomAD基因组所有', 'gnomAD基因组非洲', 'gnomAD基因组美州', 'gnomAD基因组阿什肯纳兹犹太人',
                'gnomAD基因组芬兰', 'gnomAD基因组非芬兰欧洲', 'gnomAD基因组其他',
              ]
            }
          ],

          yAxis: [
            {
              type: 'value',
              name: '频率(%)',
            }
          ],
          series: [
            {
              name: '人群频率(%)',
              type: 'bar',
              data: [
                /*本地*/
                {
                  tooltip: '样本数：' + grandFreq.sampleNum + '<br>人群频率(%)：' + this.filterData(grandFreq.freq),
                  value: grandFreq ? this.filterData(grandFreq.freq) : 0,
                  itemStyle: {normal: {color: '#c23531'}}
                },
                {
                  tooltip: '样本数：' +grandFreq.sampleNum + '<br>人群频率(%)：' + this.filterData((grandFreq.count.gatkpass.het + grandFreq.count.gatkpass.hom) / (grandFreq.sampleNum)),
                  value: grandFreq ? this.filterData(grandFreq.freq) : 0,
                  itemStyle: {normal: {color: '#c23531'}}
                },
                /*gnomAD*/
                {
                  tooltip: '样本数：' + 8624 + '<br>人群频率(%)：' + this.filterData(gnomadExome_data.eas),
                  value: this.filterData(gnomadExome_data.eas), itemStyle: {normal: {color: '#c23531'}}
                },
                {
                  tooltip: '样本数：' + 123136 + '<br>人群频率(%)：' + this.filterData(gnomadExome_data.all),
                  value: this.filterData(gnomadExome_data.all), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 7652 + '<br>人群频率(%)：' + this.filterData(gnomadExome_data.afr),
                  value: this.filterData(gnomadExome_data.afr), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 16791 + '<br>人群频率(%)：' + this.filterData(gnomadExome_data.amr),
                  value: this.filterData(gnomadExome_data.amr), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 4925 + '<br>人群频率(%)：' + this.filterData(gnomadExome_data.asj),
                  value: this.filterData(gnomadExome_data.asj), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 11150 + '<br>人群频率(%)：' + this.filterData(gnomadExome_data.fin),
                  value: this.filterData(gnomadExome_data.fin), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 55860 + '<br>人群频率(%)：' + this.filterData(gnomadExome_data.nfe),
                  value: this.filterData(gnomadExome_data.nfe), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 2743 + '<br>人群频率(%)：' + this.filterData(gnomadExome_data.oth),
                  value: this.filterData(gnomadExome_data.oth), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 15391 + '<br>人群频率(%)：' + this.filterData(gnomadExome_data.sas),
                  value: this.filterData(gnomadExome_data.sas), itemStyle: {normal: {color: '#797b7f'}}
                },


                {
                  tooltip: '样本数：' + 811 + '<br>人群频率(%)：' + this.filterData(gnomadGenome_data.eas),
                  value: this.filterData(gnomadGenome_data.eas),
                  itemStyle: {normal: {color: '#c23531'}}
                },
                {
                  tooltip: '样本数：' + 15496 + '<br>人群频率(%)：' + this.filterData(gnomadGenome_data.all),
                  value: this.filterData(gnomadGenome_data.all),
                  itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 4368 + '<br>人群频率(%)：' + this.filterData(gnomadGenome_data.afr),
                  value: this.filterData(gnomadGenome_data.afr),
                  itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 151 + '<br>人群频率(%)：' + this.filterData(gnomadGenome_data.amr),
                  value: this.filterData(gnomadGenome_data.amr),
                  itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 15391 + '<br>人群频率(%)：' + this.filterData(gnomadGenome_data.asj),
                  value: this.filterData(gnomadGenome_data.asj),
                  itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 1747 + '<br>人群频率(%)：' + this.filterData(gnomadGenome_data.fin),
                  value: this.filterData(gnomadGenome_data.fin),
                  itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 7509 + '<br>人群频率(%)：' + this.filterData(gnomadGenome_data.nfe),
                  value: this.filterData(gnomadGenome_data.nfe),
                  itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 491 + '<br>人群频率(%)：' + this.filterData(gnomadGenome_data.oth),
                  value: this.filterData(gnomadGenome_data.oth),
                  itemStyle: {normal: {color: '#797b7f'}}
                },

              ],
              markLine: {
                data: [{
                  name: 'Y 轴值为 1的水平线',
                  yAxis: 1
                }, {
                  name: 'Y 轴值为 5的水平线',
                  yAxis: 5
                }
                ]
              }
            }
          ],
          barWidth: '20%'
        });

        this.dataBaseCharts('frequency-chart-1', {
          grid: {
            bottom: 200
          },
          tooltip: {
            trigger: 'item'
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              axisLabel: {rotate: -60, 'interval': 0},
              data: [
                {
                  value: 'ExAC东亚',
                  textStyle: {color: 'red'}
                }, '\nExAC所有', 'ExAC非洲', '\nExAC美洲', 'ExAC南亚', '\nExAC芬兰', 'ExAC非芬兰欧洲', '\nExAC其他',
                {
                  value: '千人东亚',
                  textStyle: {color: 'red'}
                }, '\n千人所有', '千人非洲', '\n千人美洲', '千人南亚', '\n千人欧洲',
                'ESP6500si所有', '\nESP6500si_AA', 'ESP6500si_EA', {
                  value: 'MTDB',
                  textStyle: {color: 'red'}
                }
              ]
            }
          ],

          yAxis: [
            {
              type: 'value',
              name: '频率(%)',
            }
          ],
          series: [
            {
              name: '人群频率(%)',
              type: 'bar',
              data: [
                /*EXAC*/
                {
                  tooltip: '样本数：' + 4327 + '<br>人群频率(%)：' + this.filterData(exac_data.eas),
                  value: this.filterData(exac_data.eas), itemStyle: {normal: {color: '#c23531'}}
                },
                {
                  tooltip: '样本数：' + 60706 + '<br>人群频率(%)：' + this.filterData(exac_data.all),
                  value: this.filterData(exac_data.all), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 5203 + '<br>人群频率(%)：' + this.filterData(exac_data.afr),
                  value: this.filterData(exac_data.afr), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 5789 + '<br>人群频率(%)：' + this.filterData(exac_data.amr),
                  value: this.filterData(exac_data.amr), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 8256 + '<br>人群频率(%)：' + this.filterData(exac_data.sas),
                  value: this.filterData(exac_data.sas), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 3307 + '<br>人群频率(%)：' + this.filterData(exac_data.fin),
                  value: this.filterData(exac_data.fin), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 33370 + '<br>人群频率(%)：' + this.filterData(exac_data.nfe),
                  value: this.filterData(exac_data.nfe), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 454 + '<br>人群频率(%)：' + this.filterData(exac_data.oth),
                  value: this.filterData(exac_data.oth), itemStyle: {normal: {color: '#797b7f'}}
                },
                /*G100*/
                {
                  tooltip: '样本数：' + 617 + '<br>人群频率(%)：' + this.filterData(g100_data.eas),
                  value: this.filterData(g100_data.eas),
                  itemStyle: {normal: {color: '#c23531'}}
                },
                {
                  tooltip: '样本数：' + 3900 + '<br>人群频率(%)：' + this.filterData(g100_data.all),
                  value: this.filterData(g100_data.all),
                  itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 1418 + '<br>人群频率(%)：' + this.filterData(g100_data.afr),
                  value: this.filterData(g100_data.afr),
                  itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 535 + '<br>人群频率(%)：' + this.filterData(g100_data.amr),
                  value: this.filterData(g100_data.amr),
                  itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 661 + '<br>人群频率(%)：' + this.filterData(g100_data.sas),
                  value: this.filterData(g100_data.sas),
                  itemStyle: {normal: {color: '#797b7f'}}
                },
                {
                  tooltip: '样本数：' + 669 + '<br>人群频率(%)：' + this.filterData(g100_data.eur),
                  value: this.filterData(g100_data.eur),
                  itemStyle: {normal: {color: '#797b7f'}}
                },

                {
                  tooltip: '样本数：' + 6503 + '<br>人群频率(%)：' + this.filterData(esp_data.all),
                  value: this.filterData(esp_data.all), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
//                  tooltip: '样本数：' + 669 + '<br>人群频率(%)：' + this.filterData(g100_data.eur),
                  value: this.filterData(esp_data.aa), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
//                  tooltip: '样本数：' + 669 + '<br>人群频率(%)：' + this.filterData(g100_data.eur),
                  value: this.filterData(esp_data.ea), itemStyle: {normal: {color: '#797b7f'}}
                },
                {
//                  tooltip: '样本数：' + 669 + '<br>人群频率(%)：' + this.filterData(g100_data.eur),
                  value: this.filterData(mtdb_data), itemStyle: {normal: {color: '#c23531'}}
                }


              ],
              markLine: {
                data: [{
                  name: 'Y 轴值为 1的水平线',
                  yAxis: 1
                }, {
                  name: 'Y 轴值为 5的水平线',
                  yAxis: 5
                }
                ]
              }
            }
          ],
          barWidth: '20%'
        });

      },
      dataBaseCharts: function (eleId, option) {
        const myChart = echarts.init(document.getElementById(eleId));
        myChart.setOption(option);
      },
      dbnfsp: function () {
        const _vue = this;
//        _vue.basicResp.dbnsfp = null;
        if (!_vue.basicResp.dbnsfp) { //如果不存在的话，给个初始数据库的值
          _vue.dataBaseArr =
            ['mcap', 'sift', 'polyphen2', 'lrt', 'fathmm', 'provean', 'mutationtaster', 'mutationassessor', 'metasvm', 'meatlr', 'revel',]
          $.each(_vue.dataBaseArr, function () {
            _vue.dataBaseData.push({score: '-', pred: '-'})
          })
        }

        $.each(_vue.basicResp.dbnsfp, function (key, value) { //遍歷對象
          if (key !== 'gerp') { //剔除gerp
            _vue.dataBaseArr.push(key);
            if (value) {
              _vue.dataBaseData.push(value);
              _vue.doPie(value.pred);
            } else {
              _vue.dataBaseData.push({score: '-', pred: '-'})
            }
          }
        });
        this.dataBaseCharts('mit-chart', {
          title: {
            text: '有害性预测统计',
            subtext: '共十个数据库',
            x: 'right'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Damaging: D/A/H/M', 'Non-damaging:  B/T/N/P/L/U', 'Undefined: -'],
            right: 50
          },
          series: [
            {
              name: '预测统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: this.type_0, name: 'Damaging: D/A/H/M', itemStyle: {normal: {color: '#5c6f7b'}}},
                {value: this.type_1, name: 'Non-damaging:  B/T/N/P/L/U', itemStyle: {normal: {color: '#cfb2a9'}}},
                {
                  value: this.type_2, name: 'Undefined: -', itemStyle:

                  {normal: {color: '#666666'}}
                },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        this.in1 = false;
      },
      doPie: function (value) {
        if ('D/A/H/M'.indexOf(value) >= 0) {  //Damaging
          this.type_0 += 1;
        } else if ('B/T/N/P/L/U'.indexOf(value) >= 0) { //Non-damaging
          this.type_1 += 1;
        } else { //undefined
          this.type_2 += 1;
        }
      },
      fillHgmd: function () {
        if (this.basicResp.disease && !$.isEmptyObject(this.basicResp.disease.hgmd)) {
          let data = this.basicResp.disease.hgmd;
          data.hgvs = data.hgvs.join(' , ');
          data.citation = data.citation.join(' , ');
//          data.dbid.uniprot = data.dbid.uniprot.join(' , ');
          this.hgmdData = data;
          console.log(this.hgmdData)
        }
      },
      fillClinvar: function () {
        if (this.basicResp.disease && !$.isEmptyObject(this.basicResp.disease.clinvar)) {
          this.clinvarData = this.basicResp.disease.clinvar;
        }
      },
      fillGwas: function () {
        if (this.basicResp.gwas) {
          this.gwasData = this.basicResp.gwas;
        }
      },
      fillMito: function () {
        if (this.basicResp.mito && (this.basicResp.mito.mitomap || this.basicResp.mito.mitimpact)) {
          if (this.basicResp.mito.mitomap) {
            this.MitomapData = this.basicResp.mito.mitomap;
          }
          if (this.basicResp.mito.mitimpact) {
            this.MitimpactData = this.basicResp.mito.mitimpact;
          }
        }
      },
      fillCut: function () {
        if (this.basicResp.splicing && (this.basicResp.splicing.dbscsnv || this.basicResp.splicing.spidex)) {
          this.dbData = this.basicResp.splicing.dbscsnv;
          this.spiData = this.basicResp.splicing.spidex;
//          this.loading = false
        }
      },
      objToArr: function (obj) {
        let str = '';
        $.each(obj, function (key, value) {
          str += key + ': ' + value + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        });
        return str;
      },
      filterData: function (data) { //为0输出0，不存在输出-
        if (data === 0) {
          return 0;
        }
        if (!data) {
          return ' - '
        }
        return data * 100
      }
    },
    filters: {
      objToArr: function (obj) {
        let str = '';
        $.each(obj, function (key, value) {
          str += key + ': ' + value + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        });
        return str;
      },
      getStatus: function (status) {
        switch (status) {
          case 'major':
            return '主要的';
            break;
          case 'minor':
            return '次要的';
            break;
          case 'benign':
            return '良性的';
            break;
          case 'invalid':
            return '无效的';
            break;
          case '':
            return '未标记';
            break;
        }
      },
      changeName: function (name) {
        if (name == 'fathmm') {
          return 'FATHMM'
        } else if (name == 'gerp') {
          return 'GERP++'
        } else if (name == 'lrt') {
          return 'LRT'
        } else if (name == 'mcap') {
          return 'M-Cap'
        } else if (name == 'meatlr') {
          return 'MetaLR'
        } else if (name == 'metasvm') {
          return 'MetaSVM'
        } else if (name == 'mutationassessor') {
          return 'MutationAssessor'
        } else if (name == 'mutationtaster') {
          return 'MutationTaster'
        } else if (name == 'polyphen2') {
          return 'PolyPhen2'
        } else if (name == 'provean') {
          return 'PROVEAN'
        } else if (name == 'revel') {
          return 'REVEL'
        } else if (name == 'sift') {
          return 'SIFT'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @border: rgb(193, 192, 192);
  @in: rgb(44, 127, 210);
  @tableSha: rgb(185, 184, 184);

  #vaD-content {
    /*20171106新加标签样式*/
    .title-list {
      width: 486px;
      border-bottom: 1px solid @border;
      font-weight: bold;
      margin-bottom: -1px;
      position: relative;
      z-index: 10;
      .title-single {
        display: inline-block;
        width: 116px;
        height: 27px;
        padding-top: 3px;
        vertical-align: bottom;
        background-color: #fff;
        text-align: center;
        border-top: 1px solid @border;
        border-left: 1px solid @border;
        border-right: 1px solid @border;
        border-top-right-radius: 3px;
        border-top-left-radius: 3px;
        /*margin-left: 3px;*/
        cursor: pointer;
      }
      .title-single:first-child {
        margin: 0;
        box-shadow: -3px 0 5px -2px rgb(200, 200, 200);
      }
      .title-single.active {
        height: 35px;
        border-top: 4px solid rgb(0, 118, 192);
        padding-top: 7px;
        margin-bottom: -1px;
        color: @in;
      }
    }
    .all-content {
      margin: 0;
      border: 1px solid @tableSha;
      padding-left: 20px;
      min-height: 150px;
      .basic-div{
        padding-top: 20px;
      }
      #mit-chart {
        width: 50%;
        min-width: 300px;
      }
    }

    /*20171106-end*/

    .shadow-top {
      min-height: 300px;
      margin-top: 15px;
      padding: 20px;
      .rsid {
        display: inline-block;
        margin-left: 50px;
      }
      .gene-information {
        clear: both;
        overflow: hidden;
        .locus-a {
          margin-left: 50px;
        }
        .frequency-chart {
          /*width: 100%;*/
          height: 500px;
          overflow-x: auto;
          overflow-y: hidden;
        }
        #mit-chart {
          height: 400px;
          overflow-x: auto;
          overflow-y: hidden;
        }
        margin: 20px 0;
        .gene-information-title {
          font-size: 16px;
        }
        .gene-content {
          background-color: #fafafa;
          padding: 20px 20px 0 20px;
        }
        .omIm-value {
          margin: 0 0 10px 0;
        }
        .explain {
          font-size: 12px;
          > span {
            display: block;
            margin: 5px 0;
            word-break: break-all;

          }
        }
        .one {
          margin-bottom: 15px;
        }
      }
    }
  }

</style>
