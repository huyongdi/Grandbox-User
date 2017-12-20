<template>
  <div id="report-content" class="p-div">
    <loading v-if="loading"></loading>
    <div class="row">
      <div class="top">
        <div class="title-content">
          <span class="my-btn pull-left get-word" @click="showTemplate"><img src="../../static/img/red-submit.png" alt="">生成word文档</span>
          <div class="template-content" :class="{'hide':hideT}">
            <img src="../../static/img/th-1.png" alt="" class="up">
            <ul>
              <li @click="getWord(1)">模板1</li>
              <li @click="getWord(2)">模板2</li>
            </ul>
          </div>

          <div class="logo-content">
            <div class="logo-left">
              <img src="../../static/img/report-logo.png" alt="">
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 col-lg-6 page-1 book fix-page">
        <div class="sample-title">
          <span class="big">基因分析报告</span>
          <span class="small">GENE ANALYSIS REPORT</span>
        </div>
        <img src="../../static/img/report-4.png" alt="" class="w100">
        <div class="patient-content">
          <span class="col-xs-4">姓名：{{allData.sample && allData.sample.patient && allData.sample.patient.name}}</span>
          <span class="col-xs-4">性别：{{allData.sample && allData.sample.patient && allData.sample.patient.gender}}</span>
          <span class="col-xs-4">民族：{{allData.sample && allData.sample.patient && allData.sample.patient.nation}}</span>
          <span class="col-xs-4">年龄：{{allData.sample && allData.sample.patient && allData.sample.patient.age}}</span>
          <span class="col-xs-4">样本编号：{{allData.sample && allData.sample.sn}}</span>
          <span class="col-xs-4">检测方法：捕获靶向测序-高通量测序</span>
          <div class="col-xs-12 panel-all">
            <div class="pull-left panel-name">检测项目：</div>
            <div class="pull-left row panel-content" v-if="allData.sample">
              <div v-for="p in allData.sample.panels" class="col-xs-4">{{p.name}}({{p.code}})</div>
            </div>
          </div>
        </div>
        <img src="../../static/img/report-4.png" alt="" class="w100">
        <div class="clinical-info">
          <span class="bold title">临床信息</span>
          <span class="content">
            {{allData.sample && allData.sample.patient && allData.sample.patient.medical_record}}
          </span>
        </div>

        <div class="result-info">
          <span class="block bold title">检测结果</span>
          <div class="content" v-if="allData.majors">
            <span class="no-data" v-if="allData.majors.length == 0">未检测到与患者临床表型相关的具有可能临床意义的变异（包括SNV和Indel）。</span>

            <table class="table report-table" v-else="">
              <thead>
              <tr>
                <th>序号</th>
                <th>基因名</th>
                <th>转录本</th>
                <th>染色体位置</th>
                <th>核苷酸改变</th>
                <th>氨基酸改变</th>
                <th>纯杂合</th>
                <th>普通人群频率</th>
                <th>变异类型</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(list,index) in allData.majors">
                <td>{{index + 1}}</td>
                <td>{{list.change && list.change.gene}}</td>
                <td>{{list.change && list.change.transcript}}</td>
                <td>{{list.position}}</td>
                <td>{{list.change && list.change.na_change}}</td>
                <td>{{list.change && list.change.aa_change}}</td>
                <td>{{list.hom_het}}</td>
                <td>{{list.freq}}</td>
                <td>{{list.intervar}}</td>
              </tr>
              </tbody>
            </table>

          </div>
        </div>

        <div class="result-explain">
          <span class="bold block title">结果说明</span>
          <div class="content" v-if="allData.majors">

          </div>
        </div>

        <div class="footer">
          注：以上解读基于目前对单基因遗传病致病基因的研究。疾病简介、基因简介、一代验证及其他意义未明变异位点见附录。 变异的解释及证据定级是参照美国医学遗传学与基因组学学会（ACMG）发布的最新版基因变异解读标准和指南； Pathogenic表示致病性变异，Likely pathogenic表示疑似致病性变异， VUS表示临床性意义未明变异，Likely benign表示疑 似良性变异，Benign表示良性变异[1].参考基因组为hg19， 变异命名参照HGVS建议的规则给出
        </div>

      </div>


      <div class="col-md-12 col-lg-6 page-2 book fix-page">
        <span class="title-2">附录</span>
        <div class="dis-content" v-if="allData.major_info">
          <div class="n-title">1.疾病简介</div>
          <div v-for="(dis,index) in allData.major_info.diseases">
            <div>{{index+1}}) {{dis.title.chinese?dis.title.chinese:dis.title.preferred}}</div>
            <div>
              疾病概述：{{dis.inheritances.join(',')}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--一代验证结果modal-->
    <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="verification-modal" role="dialog"
         aria-labelledby="gridSystemModalLabel3">
      <div class="modal-dialog modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="gridSystemModalLabel3">一代验证结果</h4>
          </div>
          <div class="modal-body">
            <div class="modal-btn">
              <span @click="saveVer" class="my-btn"><img src="../../static/img/red-save.png" alt="">保存</span>
              <span class="my-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>
            </div>


            <form id="addDataForm">
              <input type="text" name="datafile" class="hide" :value="datafile">
              <div class="one">
                <span class="title">验证位点：</span>
                <select name="snv" class="my-select" id="select-genotype">
                  <option value="" class="hide">请选择验证点</option>
                  <option :value="list.id" v-for="list in siteList">{{list.showName}}</option>
                </select>
              </div>

              <div class="one" id="patient">
                <span class="title">受检者：</span>
                <div class="geneAndImg">
                  <div>
                    genotype：
                    <select name="patientGenotype" class="my-select">
                      <option value="">请选择genotype</option>
                      <option value="纯合">纯合</option>
                      <option value="杂合">杂合</option>
                      <option value="半合子">半合子</option>
                    </select>
                  </div>
                  <div>
                    验证图：
                    <div class="upload-content">
                      <input type="text" class="show-name">
                      <span class="text">选择</span>
                      <input type='file' name="patientImage" class="hide-input">
                    </div>
                  </div>
                </div>
              </div>

              <div class="one" id="father">
                <span class="title">父亲：</span>
                <div class="geneAndImg">
                  <div>
                    genotype：
                    <select name="fatherGenotype" class="my-select">
                      <option value="">请选择genotype</option>
                      <option value="纯合">纯合</option>
                      <option value="杂合">杂合</option>
                      <option value="半合子">半合子</option>
                    </select>
                  </div>
                  <div>
                    验证图：
                    <div class="upload-content">
                      <input type="text" class="show-name">
                      <span class="text">选择</span>
                      <input type='file' name="fatherImage" class="hide-input">
                    </div>
                  </div>
                </div>
              </div>

              <div class="one" id="mother">
                <span class="title">母亲：</span>
                <div class="geneAndImg">
                  <div>
                    genotype：
                    <select name="motherGenotype" class="my-select">
                      <option value="">请选择genotype</option>
                      <option value="纯合">纯合</option>
                      <option value="杂合">杂合</option>
                      <option value="半合子">半合子</option>
                    </select>
                  </div>
                  <div>
                    验证图：
                    <div class="upload-content">
                      <input type="text" class="show-name">
                      <span class="text">选择</span>
                      <input type='file' name="motherImage" class="hide-input">
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>


    <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="changeImg-modal" role="dialog"
         aria-labelledby="gridSystemModalLabel3">
      <div class="modal-dialog modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="">修改图片</h4>
          </div>
          <div class="modal-body">
            <div class="modal-btn">
              <span @click="saveVerImg" class="my-btn"><img src="../../static/img/red-save.png" alt="">保存</span>
              <span class="my-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>
            </div>


            <form id="addDataForm1">
              <input type="text" name="datafile" class="hide" :value="datafile">
              <input type="text" name="snv" class="hide" :value="imgSnvId">
              <input type="text" :name="imgGenotypeName" class="hide" :value="imgGenotype">
              <div class="geneAndImg">
                <div>
                  上传图片：
                  <div class="upload-content">
                    <input type="text" class="show-name">
                    <span class="text" style="height: 26px">选择</span>
                    <input type='file' :name="imgName" class="hide-input">
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        sn: this.$route.query.sn ? this.$route.query.sn : 0,
        allData: '',
        loading: true,

        hideT: true,
        judgeUrl: '',
        patientImg: '',
        fatherImg: '',
        motherImg: '',
        hasUrl: '',
        datafileUrl: '',
        patchUrl: '',
        refreshUrl: '',
        wordUrl: '',
        viewUrl: '',
        siteList: [],
        imgSnvId: '',
        imgName: '',
        imgGenotype: '',
        imgGenotypeName: '',
        id: this.$route.query.code,
        app: this.$route.query.app,
        datafile: '',
        geneArr: [],
        minorDiseases: [],
        token: '',
        funStr: '',
        majorDiseases: [],
        sampleData: '',
        resultsData: [], /*结果说明*/
        resultsFuncsData: [], /*结果说明变异位点*/
        diseaseDessData: [], /*疾病描述*/
      }
    },
    created: function () {
      this.getReport();
    },
    methods: {
      getReport: function () {
        const _vue = this;
        this.myAxios({
          url: 'manage/report/' + this.sn
        }).then(function (resp) {
          _vue.allData = resp.data.data;
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      /*20170915更新全部重写*/
      changeImg: function (event) {
        const _name = $(event.target).data('name');
        this.imgSnvId = $(event.target).data('id');
        this.imgGenotype = $(event.target).data('genotype');
        if (_name == '受检者') {
          this.imgName = 'patientImage';
          this.imgGenotypeName = 'patientGenotype';
        } else if (_name == '父亲') {
          this.imgName = 'fatherImage';
          this.imgGenotypeName = 'fatherGenotype';
        } else if (_name == '母亲') {
          this.imgName = 'motherImage';
          this.imgGenotypeName = 'motherGenotype';
        }
        $("#changeImg-modal").modal('show')
      },

      saveVerImg: function () {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url: _vue.patchUrl + 'sanger/',
          method: 'post',
          data: new FormData(document.getElementById('addDataForm1'))
        }).then(function (resp) {
          alert('验证图保存成功');
          $("#changeImg-modal").modal('hide')
          _vue.loading = false
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },

      saveVer: function () {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url: _vue.patchUrl + 'sanger/',
          method: 'post',
          data: new FormData(document.getElementById('addDataForm'))
//          data:{
//            datafile: _vue.datafile,
//            snv: $("#select-genotype").find('option:selected').val(),
//            patient: { genotype:$("#patient").find('select option:selected').val() , image:$("#patient").find('input').val()},
//            father: { genotype:$("#father").find('select option:selected').val() , image:$("#father").find('.hide-input').val()},
//            mother: { genotype:$("#mother").find('select option:selected').val() , image:$("#mother").find('.hide-input').val()},
//          }
        }).then(function (resp) {
          alert('一代验证结果保存成功');
          $('#verification-modal').modal('hide')
          _vue.loading = false
        })
      },

      showVer: function () {
        $('#verification-modal').modal('show')
      },

      judgment: function () {
        const _vue = this;
        this.myAxios({
          url: _vue.judgeUrl
        }).then(function (resp) {
          const results = resp.data.results;
          if (results.length == 0) {
            _vue.hasUrl = false;
            _vue.loading = false
          } else {
            _vue.hasUrl = true;
            _vue.reportId = results[0].id;
            _vue.fillData()
          }
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },

      fillData: function () {
        const _vue = this
        _vue.siteList = []
        if (_vue.app = 'snv') {
          _vue.viewUrl = 'report/reportsnv/' + _vue.reportId + '/'
          _vue.refreshUrl = 'report/reportsnv/' + _vue.reportId + '/refresh/'
          _vue.wordUrl = 'report/reportsnv/' + _vue.reportId + '/word/'

        } else {

          _vue.viewUrl = 'report/reportsnv/' + _vue.reportId + '/'
          _vue.refreshUrl = 'report/reportsnv/' + _vue.reportId + '/refresh/'
          _vue.wordUrl = 'report/reportsnv/' + _vue.reportId + '/word/'

//              _vue.viewUrl = 'report/reportcnv/'+_vue.reportId+'/';
//              _vue.refreshUrl = 'report/reportcnv/'+_vue.reportId+'/refresh/';
//              _vue.wordUrl = 'report/reportcnv/'+_vue.reportId+'/word/';
        }

        this.myAxios({
          url: _vue.viewUrl
        }).then(function (resp) {
          let data = resp.data
          if (data.patient.birth != '未知') {
            let arr = data.patient.birth.split('-')
            data.patient.birth = arr[0] + '年' + arr[1] + '月'
          }

          _vue.allData = resp.data
          _vue.datafile = _vue.allData.datafile;
//          $("#hide123").val(_vue.datafile)
//          $("#hide123").attr('value','12345')
          $.each(_vue.allData.majors, function (i, data) {
            _vue.siteList.push({id: data.id, showName: data.gene + '：' + data.transcript + '：' + data.nachange + '：' + data.aachange})
          })
          $.each(_vue.allData.minors, function (i, data) {
            _vue.siteList.push({id: data.id, showName: data.gene + '：' + data.transcript + '：' + data.nachange + '：' + data.aachange})
          })

          $.each(_vue.allData.sangers.major, function (i, data) {
            data.infoArr = [];
            $.each(data.info, function (k1, k2) {
              if (k1 == 'patient') {
                k2.name = '受检者';
                data.infoArr.push(k2)
              } else if (k1 == 'father') {
                k2.name = '父亲';
                data.infoArr.push(k2)

              } else if (k1 == 'mother') {
                k2.name = '母亲';
                data.infoArr.push(k2)

              }
            })
          })

          $.each(_vue.allData.sangers.minor, function (i, data) {
            data.infoArr = [];

            $.each(data.info, function (k1, k2) {
              if (k1 == 'patient') {
                k2.name = '受检者';
                data.infoArr.push(k2)

              } else if (k1 == 'father') {
                k2.name = '父亲';
                data.infoArr.push(k2)

              } else if (k1 == 'mother') {
                k2.name = '母亲';
                data.infoArr.push(k2)

              }
            })
          })

          _vue.imgArr = _vue.allData.sangers.major.concat(_vue.allData.sangers.minor)

          _vue.loading = false;

        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },

      patchUrlFun: function () {
        const _vue = this
        _vue.loading = true
        this.myAxios({
          url: _vue.patchUrl,
          method: 'post',
          data: {
            datafile: _vue.id
          }
        }).then(function (resp) {
          _vue.loading = false
          _vue.judgment()
          alert('生成成功')
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },

      showTemplate: function () {
        this.hideT = !this.hideT;
      },
      getWord: function (type) {

        if (type == 1) {
          window.location.href = this.anaUrl + this.wordUrl + '?template=1'
        } else if (type == 2) {
          window.location.href = this.anaUrl + this.wordUrl + '?template=2'
        }
        this.hideT = true;

//        const _vue = this;
//        _vue.loading = true;
//        this.myAxios({
//          url:_vue.wordUrl,
//          method:'get',
//        }).then(function (resp) {
//          _vue.loading = false;
////          window.location.href=resp.data.url
//        });

      },

      /*20170915更新*/

      /*新版接口开始20170914*/
      getUrl: function () {
        const _vue = this
        this.myAxios({
          url: _vue.datafileUrl
        }).then(function (resp) {
          const data = resp.data
          _vue.hasUrl = Object.keys(data).length
          if (_vue.hasUrl) {
            _vue.refreshUrl = data.refresh
            _vue.wordUrl = data.word
            _vue.viewUrl = data.view
            _vue.fillData()
          } else {
            _vue.loading = false
          }
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },

      refresh: function () {
        const _vue = this
        _vue.loading = true
        _vue.myAxios({
          url: _vue.refreshUrl
        }).then(function (respRe) {
          alert('生成报告已完成')
          _vue.fillData()
          _vue.loading = false
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },

      /*新版接口结束*/
    },
    watch: {
      allData: function () {
        /*将数组里面的值8个8个输出*/
//        if (!this.allData) {
//          return
//        }
//        const _vue = this
//        const genes = this.allData.genes
//        let arrCount = Math.ceil(genes.length / 8)
//        let pushArr = []
//        while (arrCount) {
//          pushArr.push([])
//          arrCount -= 1
//        }
//        $.each(genes, function (i, data) {
//          i += 1
//          $.each(pushArr, function (k1, k2) {
//            if (Math.ceil(i / 8) === k1 + 1) {
//              k2.push(data)
//            }
//          })
//        })
//        $.each(pushArr, function (i, data) {
//          if (data.length !== 8) {
//            data.length = 8
//          }
//        })
//        this.geneArr = pushArr
//
//        //结果说明
//        //基因
//        if (_vue.allData.presentation) {
//          $.each(_vue.allData.presentation.gene, function (i, data) {
//
//            if (data.length == 2) {
//              _vue.resultsData.push(i + '基因是' + data.join('和'))
//            } else {
//              _vue.resultsData.push(i + '基因是' + data.join('  ,  '))
//            }
//
//          })
//        }
//        //变异位点
//        $.each(_vue.allData.presentation.func, function (i, data) {
//          _vue.resultsFuncsData.push(data + '个' + i + '位点')
//        })

      }
    },
    filters: {
      getName: function (type) {
        switch (type) {
          case 'AR':
            return '常染色体隐性遗传'
            break
          case 'AD':
            return '常染色体显性遗传'
            break
          case 'XLR':
            return 'X连锁隐性遗传'
            break
          case 'XLD':
            return 'X连锁显性遗传'
            break
          case '':
            return '未知遗传'
            break
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @gray: rgb(125, 125, 125);
  @green: rgb(112, 178, 79);
  @lineH: 23px;
  @title: rgb(83, 83, 83);
  html {
    overflow: hidden;
  }

  #report-content {
    overflow-x: hidden;
    color: @gray;
    > .row {
      background-color: #fff;
      padding: 20px;
      /*本页面公共样式*/
      .title {
        font-size: 16px;
        color: #70b24f;
        margin-bottom: 5px;
      }
      .report-table {
        text-align: center;
        thead {
          /*background:linear-gradient(to right,rgb(35,129,27),rgb(143,185,84));*/
          background: url('../../static/img/report-4.png');
          background-size: 100% 100%;
          color: #fff;
          th {
            border-right: 1px solid #fff;
            text-align: center;
            border-bottom: none;
          }
        }
        tbody {
          td {
            background-color: rgb(239, 239, 239);
            border-right: 1px solid #fff;
            border-bottom: 1px solid #fff;
          }
        }
      }
      .book {
        position: relative;
        border: 1px #eee solid;
        background-color: #fff;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2)
      }
      .book::after {
        position: absolute;
        content: '';
        bottom: 10px;
        left: 35px;
        width: 50%;
        height: 50%;
        -webkit-transform: skew(-30deg) rotate(-6deg);
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        z-index: -1
      }
      .book::before {
        position: absolute;
        content: '';
        bottom: 10px;
        right: 35px;
        width: 50%;
        height: 50%;
        -webkit-transform: skew(30deg) rotate(6deg);
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
        z-index: -1
      }
      .fix-page {
        position: relative;
        height: 1200px;
      }
      /*公共样式结束*/
      .top {
        position: relative;
        .title-content {
          margin: 10px 0;
          > .my-btn {
            margin-right: 20px;
          }
          .template-content {
            position: absolute;
            width: 130px;
            border: 1px solid #b9b8b8;
            border-radius: 5px;
            box-shadow: 0 0 10px 1px #b9b8b8;
            top: 50px;
            background-color: #fff;
            z-index: 10;
            img {
              position: absolute;
              right: 55px;
              top: -9px;
              z-index: 11;
            }
            ul {
              margin: 0;
              padding: 0;
              li {
                margin: 0;
                padding: 0;
                height: 30px;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
                &:hover {
                  background-color: rgb(255, 236, 210);
                }
              }
              li:first-child {
                &:hover {
                  border-top-right-radius: 5px;
                  border-top-left-radius: 5px;
                }
              }
              li:last-child {
                &:hover {
                  border-bottom-right-radius: 5px;
                  border-bottom-left-radius: 5px;
                }
              }
            }
          }
          .logo-content {
            text-align: right;
            .logo-left {
              display: inline-block;
              padding: 5px 15px;
              text-align: left;
              img {
                width: 160px;
              }
            }
          }
        }
      }
      .page-1 {
        .sample-title {
          text-align: center;
          margin: 10px 0 30px 0;
          .big {
            font-size: 48px;
            color: @green;
          }
          .small {
            display: block;
            font-size: 18px;
            font-family: "SIL";
            color: rgb(137, 137, 137);
            padding-left: 73px;
          }
        }
        .patient-content {
          > span, > div {
            margin: 5px 0;
          }
          .panel-all {
            .panel-name {
              width: 90px;
            }
            .panel-content {
              width: calc(~"100% - 90px");
              > div {
                word-break: break-all;
              }
            }
          }
        }
        .clinical-info {
          overflow: hidden;
          min-height: 50px;
          padding-bottom: 20px;
          .bold {
            width: 90px;
            float: left;
          }
          .content {
            width: calc(~'100% - 90px');
            float: left;
            word-break: break-all;
          }
        }
        .footer{
          position: absolute;
          bottom: 50px;
          font-size: 12px;
          margin-right: 15px;
        }
      }
      .page-2{
        .n-title{
          font-size: 16px;
          color: #535353;
          margin-bottom: 5px;
          font-weight: bold;
        }
        >.title-2{
          color: #434343;
          display: block;
          font-weight: bold;
          font-size: 18px;
          text-align: center;
          margin: 30px 0;
        }
      }
    }






    #normal-font {
      font-weight: normal;
      font-size: 16px;
    }
    .template-content {
      position: absolute;
      width: 130px;
      border: 1px solid #b9b8b8;
      border-radius: 5px;
      box-shadow: 0 0 10px 1px #b9b8b8;
      top: 50px;
      background-color: #fff;
      z-index: 10;
      img {
        position: absolute;
        right: 55px;
        top: -9px;
        z-index: 11;
      }
      ul {
        margin: 0;
        padding: 0;
        li {
          margin: 0;
          padding: 0;
          height: 30px;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
          &:hover {
            background-color: rgb(255, 236, 210);
          }
        }
        li:first-child {
          &:hover {
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
          }
        }
        li:last-child {
          &:hover {
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
          }
        }
      }
    }
    .get-word {
      width: 130px;
    }
    .refresh {
      width: 130px;
    }
    #showImg {
      overflow: hidden;
      table {
        margin-top: 20px;
        text-align: center;
        td {
          vertical-align: middle;
        }
      }
    }
    #addDataForm { //一代验证弹框
      .one {
        margin: 15px 0;
        .geneAndImg {
          width: 75px;
          > div {
            width: 400px;
            margin: 0 0 10px 75px;
            .my-select {
              width: 200px;
            }
            .upload-content {
              display: inline-block;
              width: 250px;
              margin-left: 22px;
              > input {
                width: 200px;
              }
              > input {
                width: 200px;
              }
              > span {
                width: 50px;
                height: 26px;
              }
            }
          }

        }
      }
    }
    .no-url {
      margin-top: 20px;
      .my-btn {
        display: block;
        margin-top: 15px;
      }
    }
    .bold {
      font-weight: bold;
    }

    .report {
      min-height: 200px;
      padding: 0 50px;
    }
    .title-content {
      margin: 10px 0;
      > .my-btn {
        margin-right: 20px;
      }
    }
    .logo-content {
      text-align: right;
      .logo-left {
        display: inline-block;
        padding: 5px 15px;
        text-align: left;
        img {
          width: 160px;
        }
      }
    }
    .office-content {
      margin: 50px 0 60px 0;
      font-size: 12px;
      .office-one:last-child {
        margin-top: 15px;
      }
      .office-one {
        .office-one-content {
          margin-left: -15px;
        }
        > div {
          margin-top: 2px;
          span:not(:last-child) {
            border-right: 1px solid rgb(84, 84, 84);
          }
          span {
            display: inline-block;
            padding-right: 13px;
            padding-left: 13px;
          }
        }
      }
    }
    .sample-content {
      .first-img {
        width: 100%;
      }

      .basic-content {
        .one {
          > span {
            display: inline-block;
            width: 17%;
          }
          margin-bottom: 20px;
        }
        .two {
          > span {
            display: inline-block;
            width: 23%;
          }
          margin-bottom: 22px;
        }
        .bottom-img {
          width: 100%;
        }
      }
      .first-page {
        padding-top: 60px;
        .one {
          margin-bottom: 30px;
          .title {
            font-size: 16px;
            color: @green;
            margin-bottom: 5px;
          }
          .content {
            line-height: @lineH;
            .notice {
              margin-top: 40px;
              font-size: 12px;
              color: @gray
            }
          }
        }
      }
      .appendix-page {
        margin-top: 80px;
        > .title {
          font-size: 18px;
          color: @title;
          text-align: center;
        }
        .one {
          margin-bottom: 30px;
          .title {
            font-size: 16px;
            color: @title;
            margin-bottom: 5px;
            > span {
              font-size: 12px;
              color: @gray;
            }
          }
          .content {
            line-height: @lineH;
            .diseases-content {
              margin-top: 10px;
            }
            .notice {
              margin-top: 40px;
              font-size: 12px;
              color: @gray
            }
          }
        }
      }
    }
  }
</style>
