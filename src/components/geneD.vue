<template>
  <div class="data-content">
    <loading v-if="loading"></loading>
    <dataHeader></dataHeader>
    <div id="gene-d" class="right-content drop-down">
      <div class="title">
        【基因】{{allData.name ? allData.name.symbol : ''}} <span class="font-12">({{allData.name ? allData.name.fullname_fna : ''}})</span>
      </div>

      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span> <span @click.self="showContent">基本信息</span>
        </div>
        <div class="content" style="display: block">
          <table class="special-table">
            <tbody>
            <tr>
              <td class="t-bc">基因ID</td>
              <td>{{allData.geneid}}</td>
              <td class="t-bc">别名</td>
              <td>{{allData.name ? allData.name.synonyms.join(' | ') : ''}}</td>
            </tr>

            <tr>
              <td class="t-bc">常用转录本</td>
              <td>{{allData.tag ? allData.tag.transcript : ''}}</td>
              <td class="t-bc">印记基因</td>
              <td class="color-out">
                <span>{{allData.tag &&allData.tag.isImprinted}}</span>
                <!--<span v-if="allData.tag" :class="{'color-in':allData.tag.isImprinted}">是</span> /-->
                <!--<span v-if="allData.tag" :class="{'color-in':!allData.tag.isImprinted}">否</span>-->
              </td>
            </tr>

            <tr>
              <td class="t-bc">位置</td>
              <td>{{allData.location ? allData.location.chrom : ''}}号染色体,{{allData.location ? allData.location.map_location : ''}}</td>
              <td class="t-bc">类型</td>
              <td>{{allData.information ? allData.information.genetype : ''}}</td>
            </tr>

            <!--<tr>-->
            <!--<td class="t-bc">Panel</td>-->
            <!--<td colspan="3">-->
            <!--<span v-for="panel in allData.panels" class="mr-right15">{{panel.name}}({{panel.code}})</span>-->
            <!--</td>-->
            <!--</tr>-->

            <tr>
              <td class="t-bc">外部编号</td>
              <td colspan="3" v-if="allData.dbxrefs">
                <span v-for="hgnc in allData.dbxrefs.HGNC">
                   <a class="img-a" target="_blank" :href="'https://www.genenames.org/cgi-bin/gene_symbol_report?hgnc_id='+hgnc" :title="hgnc">
                    <img src="../../static/img/hgnc.jpg" alt="">
                   </a>
                </span>

                <span v-for="mim in allData.dbxrefs.MIM">
                  <a class="img-a mr-left15" target="_blank" :href="'https://www.omim.org/entry/'+mim" :title="mim">
                    <img src="../../static/img/omim.jpg" alt="">
                  </a>
                </span>

                <span v-for="ens in allData.dbxrefs.Ensembl">
                  <a class="img-a mr-left15" target="_blank" :href="'http://grch37.ensembl.org/Homo_sapiens/Gene/Summary?g='+ens" :title="ens">
                    <img src="../../static/img/e-ensembl.png" alt="">
                  </a>
                </span>

              </td>
            </tr>

            <!--<tr>-->
            <!--<td class="t-bc">数据库</td>-->
            <!--<td colspan="3">-->
            <!--<div class="row">-->
            <!--<span class="col-md-3">MIM:{{allData.dbxrefs ? allData.dbxrefs.MIM.join(',') : ''}}</span>-->
            <!--<span class="col-md-3">Vega:{{allData.dbxrefs ? allData.dbxrefs.Vega.join(',') : ''}}</span>-->
            <!--<span class="col-md-3">HGNC:{{allData.dbxrefs ? allData.dbxrefs.HGNC.join(',') : ''}}</span>-->
            <!--&lt;!&ndash;<span class="col-md-2">HPRD:{{allData.dbxrefs?allData.dbxrefs.HPRD.join(','):''}}</span>&ndash;&gt;-->
            <!--<span class="col-md-3">Ensembl:{{allData.dbxrefs ? allData.dbxrefs.Ensembl.join(',') : ''}}</span>-->
            <!--</div>-->
            <!--</td>-->
            <!--</tr>-->

            <!--<tr>-->
            <!--<td class="t-bc">携带致病突变病例</td>-->
            <!--<td>0</td>-->
            <!--<td class="t-bc">收录变异</td>-->
            <!--<td>0</td>-->
            <!--</tr>-->
            <tr>
              <td class="t-bc">简介</td>
              <td colspan="3">{{allData.information ? allData.information.description : ''}}</td>
            </tr>

            </tbody>
          </table>
        </div>
      </div>

      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span> <span @click.self="showContent">疾病和表型</span>
        </div>
        <div class="content left-right" style="display: block">
          <div class="left">
            <div class="title">疾病相关表型 <!--（总病例数： 0 ）--></div>
            <ul v-for="omim in allData.omims">
              <li>
                <router-link target="_blank" :to="{path:'/omim',query:{id:omim._id}}">{{omim.title.chinese}}({{omim.mimnumber}})</router-link>
              </li>
            </ul>
          </div>
          <div class="right">
            <div class="title">基因相关表型 <!--（总病例数： 0 ）--></div>
            <ul v-for="hpo in allData.hpos">
              <!--<li>房间隔缺陷 （外显病例： 0 )</li>-->
              <li>{{hpo.name.chinese}}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span> <span @click.self="showContent">其他信息</span>
        </div>
        <div class="content" style="display: block">
          <table class="special-table">
            <tbody>
            <tr>
              <td class="t-bc">LOF容忍度</td>
              <td>{{allData.tag ? allData.tag.pli : ''}}</td>
              <td class="t-bc">常染色体显性遗传概率</td>
              <td>{{allData.tag ? allData.tag.pad : ''}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="content-one" v-if="allData.mgi">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span><span @click.self="showContent">小鼠基因组模型</span>
        </div>
        <div class="content mice-content" style="display: none">
          <div class="one">
            <div class="title">基本信息</div>
            <div class="one-content">
              <table class="special-table">
                <tbody>
                <tr>
                  <td class="t-bc">MGI Marker ID</td>
                  <td>{{mgi.mgiid}}</td>
                  <td class="t-bc">Human Gene Entrez ID</td>
                  <td>{{allData.geneid}}</td>
                </tr>
                <tr>
                  <td class="t-bc">染色体</td>
                  <td>{{mgi.location && mgi.location.chrom}}</td>
                  <td class="t-bc">起始位置</td>
                  <td>{{mgi.location && mgi.location.start}}</td>
                </tr>
                <tr>
                  <td class="t-bc">终止位置</td>
                  <td>{{mgi.location && mgi.location.end}}</td>
                  <td class="t-bc">Location</td>
                  <td>{{mgi.location && mgi.location.map_location}}</td>
                </tr>
                <tr>
                  <td class="t-bc">基因名</td>
                  <td>{{mgi.name && mgi.name.symbol}}</td>
                  <td class="t-bc">同义名</td>
                  <td>{{mgi.name && mgi.name.synonyms.join(' | ')}}</td>
                </tr>
                <tr>
                  <td class="t-bc">描述</td>
                  <td>{{mgi.name && mgi.name.name}}</td>
                  <td class="t-bc">基因类型</td>
                  <td>{{mgi.information && mgi.information.genetype}}</td>
                </tr>
                <tr>
                  <td class="t-bc">特征</td>
                  <td>{{mgi.information && mgi.information.feature_types.join(' | ')}}</td>
                  <td class="t-bc">生物型</td>
                  <td>{{mgi.information && mgi.information.biotypes.join(' | ')}}</td>
                </tr>
                <tr>
                  <td class="t-bc">状态</td>
                  <td>{{mgi.information && mgi.information.status}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="one">
            <div class="title">alleles</div>
            <div class="one-content">

              <table class="special-table" v-for="allele in mgi.alleles">
                <tbody>
                <tr class="t-bc">
                  <td colspan="7">
                    ID:<a class="common-a" target="_blank" :href="'http://www.informatics.jax.org/allele/'+allele.alleleId">{{allele.alleleId}}</a>
                    <span v-if="allele.name && allele.name.name"> ({{allele.name.name}})</span></td>
                </tr>
                <tr>
                  <td width="10%">名称</td>
                  <td width="10%">别名</td>
                  <td width="10%">文献</td>
                  <td width="10%">类型</td>
                  <td width="15%">属性</td>
                  <td width="45%">表型</td>
                </tr>
                <tr>
                  <td><span v-if="allele.name && allele.name.symbol">{{allele.name.symbolLeft}}<sup>{{allele.name.symbolRight}}</sup></span></td>
                  <td>
                    <span v-if="allele.name && allele.name.synonymsArr">
                      <span v-for="(sySingle,index) in allele.name.synonymsArr">
                      {{sySingle.synonymsSingleLeft}}<sup>{{sySingle.synonymsSingleRight}}</sup>
                        <span v-if="index !=allele.name.synonymsArr.length-1"> | </span>
                      </span>
                    </span>
                  </td>
                  <td>
                    <a class="common-a" target="_blank" :href="'https://www.ncbi.nlm.nih.gov/pubmed/'+allele.information.pubmed"
                         v-if="allele.information && allele.information.pubmed">{{allele.information.pubmed}}</a>
                  </td>
                  <td class="warp"><span v-if="allele.information && allele.information.alleletype">{{allele.information.alleletype}}</span></td>
                  <td>
                    <span v-if="allele.information && allele.information.attributes&&allele.information.attributes.length!=0">{{allele.information.attributes.join(
                    ' | ')}}</span><span v-else="">-</span>
                  </td>
                  <td>
                    <div v-for="phenotype in allele.phenotypes" class="one-p">
                      <a v-if="phenotype.definition" class="po" @click="showNext" title="查看定义">{{phenotype.mpId}} - {{phenotype.name}}</a>
                      <span v-else="">{{phenotype.mpId}} - {{phenotype.name}}</span>
                      <div class="hide-definition" style="display: none">
                        <a :href="'http://www.informatics.jax.org/vocab/mp_ontology/'+phenotype.mpid" class="common-a"
                           target="_blank">{{phenotype.definition}}</a>
                      </div>
                    </div>
                  </td>
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
  import dataHeader from './global/databaseHeader.vue'

  export default {
    components: {
      'dataHeader': dataHeader,
    },
    data: function () {
      return {
        id: this.$route.query.id,
        loading: true,
        allData: '',
        mgi: ''
      }
    },
    mounted: function () {
      this.getGene();
    },
    methods: {
      getGene: function () {
        const _vue = this;
        this.myAxios({
          url: 'biomeddb/gene/' + this.id
        }).then(function (resp) {
          _vue.loading = false;
          _vue.allData = resp.data.data;

          $.each(_vue.allData.mgi.alleles, function (i, data) {
            if (data.name && data.name.symbol) {
              let str = data.name.symbol;
              data.name.symbolLeft = str.substring(0, str.indexOf('<'));
              data.name.symbolRight = str.substring(str.indexOf('<') + 1, str.length - 1);
            }

            data.name.synonymsArr = [];
            if (data.name && data.name.synonyms) {
              $.each(data.name.synonyms, function (k, value) {
                let str = value;
                if (str.indexOf('<') > -0) {
                  data.name.synonymsArr.push({
                    synonymsSingleLeft: str.substring(0, str.indexOf('<')),
                    synonymsSingleRight: str.substring(str.indexOf('<') + 1, str.indexOf('>')),
                  })
                } else {
                  data.name.synonymsArr.push({
                    synonymsSingleLeft: value,
                    synonymsSingleRight: ''
                  })
                }
              })
            }
          });

          _vue.mgi = _vue.allData.mgi
        })
      }
    },
    filter: {}
  }
</script>

<style scoped lang="less">
  @in: rgb(14, 125, 195);

  .mice-content {
    .one {
      .title {
        font-size: 13px;
        margin-bottom: 8px;
      }
      .one-content {
        .special-table{
          margin-bottom: 10px;
        }
      }
    }
    .one:first-child {
      margin-bottom: 20px;
    }
  }

  .color-in {
    color: @in;
  }

  .color-out {
    color: #999;
  }
</style>
