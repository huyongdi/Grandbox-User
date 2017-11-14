<!--查看位点信息-->
<template>
  <div>
    <loading v-if="loading"></loading>
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
              <span class="my-btn" data-dismiss="modal"><img src="../../../static/img/red-close.png" alt="">关闭</span>
            </div>

            <div class="table-content">
              <table class="table my-table no-shadow" v-show="!hide0">
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
                  <!--<td>{{list.ratio ? list.ratio.toFixed(4) : '-'}}</td>-->
                  <td>{{list.ratio}}</td>
                  <td>{{list.gatkFilter ? list.gatkFilter : '-'}}</td>
                  <td>
                    <span v-if="list.edit">
                      {{list.edit.status|getStatus}}
                    </span>
                    <span v-else="">无信息</span>
                  </td>
                </tr>
                <tr v-if="lists0.length === 0" class="center">
                  <td colspan="7">该位点在其它样本中没有信息</td>
                </tr>
                </tbody>
              </table>

              <table class="table my-table no-shadow" v-show="!hide1">
                <thead>
                <tr>
                  <th>Datafile</th>
                  <th>长度</th>
                  <th>位置</th>
                  <!--<th>基因</th>-->
                  <th>基因型</th>
                  <th>深度(原始)</th>
                  <th>深度(标准化)</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="list in lists1">
                  <td>{{list.datafileData ? list.datafileData : '-'}}</td>
                  <td>{{list.length}}</td>
                  <td>{{list.position}}</td>
                  <!--<td v-if="list.annotations">-->
                  <!--<a target="_blank" class="block" v-if="list.annotations.geneSymbol"-->
                  <!--v-for="(single,index) in list.annotations.geneSymbol"-->
                  <!--:href="dbHtml+'#/gene?query=' + single">-->
                  <!--{{single}}-->
                  <!--</a>-->
                  <!--</td>-->
                  <td>{{list.genoType}}</td>
                  <td>{{list.originalReadDepth}}</td>
                  <td>{{list.readDepth}}</td>
                </tr>
                <tr v-if="lists1.length === 0" class="center">
                  <td colspan="5">该位点在其它样本中没有信息</td>
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
  export default {
    props: ['locusId', 'datafile', 'locus', 'type', 'app', 'locusId'],
    data: function () {
      return {
        lists0: [],
        lists1: [],
        loading: false,
        hide0: true,
        hide1: true,
      }
    },
    methods: {
      getOne: function () {
        if (this.type) {  //1是CNV
          return this.myAxios.get('report/cnv/' + this.locusId + '/records/');
        } else {
          return this.myAxios.get('report/snv/' + this.locus + '/records/');
        }
      },
      getTwo: function () {
        if (this.app == '全基因') {
        } else {
          if (this.type) {
            return this.myAxios.get('database/grandrecord/?type=cnv&var=' + this.locus);
          } else {
            return this.myAxios.get('database/grandrecord/?type=snv&var=' + this.locus);
          }
        }

      },
      getDatafile: function (str) {
        let arr = str.split('/');
        return arr[arr.length - 2]
      }
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
    watch: {
//      locus: function () {
//        this.hide0 = true;
//        this.hide1 = false;
//        const _vue = this;
//        _vue.loading = true;
//        if (this.type) { //1是cnv
//          _vue.myAxios({
//            url: 'report/cnv/records/?datafile=' + _vue.datafile + '&cnv=' + _vue.locus
//          }).then(function (resp) {
//            _vue.lists1 = resp.data;
//            _vue.loading = false;
//          }).catch(function (error) {
//            _vue.catchFun(error);
//          });
//        } else { //0是snv
//          this.hide0 = false;
//          this.hide1 = true;
//          _vue.myAxios({
//            url: 'report/snv/records/?datafile=' + _vue.datafile + '&snv=' + _vue.locus
//          }).then(function (resp) {
//            _vue.lists0 = resp.data;
//            _vue.loading = false;
//          }).catch(function (error) {
//            _vue.catchFun(error);
//          });
//        }
//      },


      locusId: function () {
        const _vue = this;
        _vue.loading = true;
        if (_vue.getTwo()) {
          _vue.$axios.all([_vue.getOne(), _vue.getTwo()])
            .then(_vue.$axios.spread(function (resp1, resp2) {
              _vue.loading = false;
              let data1 = resp1?resp1.data:[];
              let data2 = resp2?resp2.data.results:[];

              /*处理2个接口，数据格式为一样，然后输出*/
              $.each(data1, function (i, data) {
                data.datafileData = data.datafile.code;
                if (_vue.type) { //1是CNV
                  data.length = data.info.length;
                  data.position = data.info.position;
                  data.genoType = data.info.wes?data.info.wes.geneType:data.info.wgs.geneType;
                  data.originalReadDepth = data.info.wes?data.info.wes.originalReadDepth:'-';
                  data.readDepth = data.info.wes?data.info.wes.readDepth:'-';
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
                        depth: k2.info?k2.info.depth:'-',
                        quality: k2.info?k2.info.quality:'-',
                        ratio: k2.info?k2.info.ratio:'-',
                        gatkFilter: k2.info?k2.info.gatkFilter:'-',
                      })
                    });
                  }
                  if (value.cnv) {
                    $.each(value.cnv, function (k1, k2) {
                      _vue.lists1.push({
                        datafileData: k2.datafile.sample,
                        capture: k2.datafile.capture,
                        genoType: k2.info.genoType,
                        originalReadDepth: k2.info.originalReadDepth,
                        readDepth: k2.info.readDepth,
                        length: value.length
                      })
                    });
                  }
                })
              }

            }))
        } else {
          _vue.$axios.all([_vue.getOne()])
            .then(_vue.$axios.spread(function (resp1) {
              _vue.loading = false;
              let data1 = resp1?resp1.data:[];

//              /*处理2个接口，数据格式为一样，然后输出*/
//              $.each(data1, function (i, data) {
//                data.datafileData = data.datafile;
//              });

              $.each(data1, function (i, data) {
                data.datafileData = data.datafile.code;
                if (_vue.type) { //1是CNV
                  data.length = data.info.length;
                  data.position = data.info.position;
                  data.genoType = data.info.wes?data.info.wes.geneType:data.info.wgs.geneType;
                  data.originalReadDepth = data.info.wes?data.info.wes.originalReadDepth:'-';
                  data.readDepth = data.info.wes?data.info.wes.readDepth:'-';
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

            }))
        }
      },

    },
    filters: {
      filterData: function (data) { //取百分比
//          if (data == 0) {
//            return 0;
//          }
//          data = data * 100;
//          data = data.toFixed(2);
//          return data

        return Math.round(data * 10000) / 100


      },
      getDatafile: function (str) {
        let arr = str.split('/');
        return arr[arr.length - 2]
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
      }
    }
  }
</script>

<style scoped lang="less">
  .table-content {
    width: 100%;
    .center {
      text-align: center;
    }
    table {
      table-layout: fixed;
      td, th {
        word-break: break-all;
      }
    }
  }
</style>
