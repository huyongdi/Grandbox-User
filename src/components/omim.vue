<template>
  <div class="data-content">
    <loading v-if="loading"></loading>
    <dataHeader></dataHeader>
    <div id="gene-d" class="right-content drop-down">
      <div class="title">
        【疾病】
        <!--<a :href="'https://www.omim.org/entry/'+allData.mimnumber" target="_blank">{{allData.mimnumber}}</a>-->
        <!--({{allData.prefix}}{{allData.title?allData.title.preferred:''}})-->
        {{allData.title ? allData.title.chinese : ''}}({{allData.title ? allData.title.preferred : ''}})
      </div>

      <div class="content-one">
        <div class="header" >
          <span class="fa fa-chevron-down" @click.self="showContent"></span><span @click.self="showContent">基本信息</span>
        </div>
        <div class="content" style="display: block">
          <table class="special-table">
            <tbody>
            <tr>
              <td class="t-bc">OMIM编号</td>
              <td>
                <a class="img-a mr-left15" target="_blank" :href="'https://www.omim.org/entry/'+allData.mimnumber" :title="allData.mimnumber">
                  <img src="../../static/img/omim.jpg" alt="">
                </a>
              </td>
              <td class="t-bc">其他标题</td>
              <td>{{allData.title ? allData.title.preferred : ''}} <span v-if="allData.includeds && allData.includeds.chinese">({{allData.includeds.chinese}})</span></td>
            </tr>
            <tr>
              <td class="t-bc">别名</td>
              <td colspan="3">{{allData.title ? allData.title.alternatives.join(' | ') : ''}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!--<div class="content-one">-->
        <!--<div class="header" >-->
          <!--<span class="fa fa-chevron-down" @click.self="showContent"></span><span @click.self="showContent">临床表型</span>-->
        <!--</div>-->
        <!--<div class="content left-right" style="display: block">-->
          <!--<table class="special-table">-->
            <!--<tbody id="">-->
            <!--<tr class="t-bc">-->
              <!--<td style="min-width: 100px">系统分类</td>-->
              <!--<td>临床表型</td>-->
              <!--<td style="min-width: 200px">中文表型标准术语</td>-->
            <!--</tr>-->
            <!--<tr v-if="clinicalSynopsisData.length === 0" class="center">-->
              <!--<td colspan="3" class="center">暂无数据</td>-->
            <!--</tr>-->
            <!--<tr v-for="data in clinicalSynopsisData" class="font-12">-->
              <!--<td><a class="no-d" data-toggle="tooltip" data-placement="top" :data-original-title="data.name">{{data.name | nameToCn}}</a></td>-->
              <!--<td>-->
                <!--<div v-if="data.content" v-for="dataS in data.content">{{dataS.text}}</div>-->
              <!--</td>-->
              <!--<td>-->
                <!--<div v-if="data.content" v-for="list in data.content">-->
                  <!--&lt;!&ndash;{{list}}&ndash;&gt;-->
                  <!--<div v-for="hpo in list.hpos">{{hpo.name &&hpo.name.chinese}}({{hpo.name &&hpo.name.english}})</div>-->
                  <!--&lt;!&ndash;<div v-if="list.hpo_ids" v-for="listHpo in list.hpo_ids">{{listHpo}}(<span :id="listHpo.replace(':','-')"></span>)</div>&ndash;&gt;-->
                  <!--&lt;!&ndash;<div v-if="!list.hpo_ids"> - </div>&ndash;&gt;-->
                <!--</div>-->
              <!--</td>-->
            <!--</tr>-->
            <!--</tbody>-->
          <!--</table>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div class="content-one">-->
        <!--<div class="header">-->
          <!--<span class="fa fa-chevron-down" @click.self="showContent"></span><span @click.self="showContent">基因信息</span>-->
        <!--</div>-->
        <!--<div class="content left-right" style="display: block">-->
          <!--<table class="special-table">-->
            <!--<tbody>-->
            <!--<tr>-->
              <!--<td class="t-bc">基因ID</td>-->
              <!--<td class="t-bc">基因名</td>-->
              <!--<td class="t-bc">遗传模式</td>-->
              <!--<td class="t-bc">表型</td>-->
            <!--</tr>-->
            <!--<tr v-for="list in allData.phenotype_maps">-->
              <!--<td>{{list.gene.geneid}}</td>-->
              <!--<td>{{list.gene.symbol}}</td>-->
              <!--<td>-->
                  <!--<span v-if="list.phenotype.inheritances" v-for="inh in list.phenotype.inheritances">-->
                    <!--<a class="po" data-toggle="tooltip" data-placement="top" :data-original-title="inh.name">{{inh.ab}}</a>-->
                  <!--</span>-->
              <!--</td>-->
              <!--<td>{{list.phenotype.title}}</td>-->
            <!--</tr>-->
            <!--</tbody>-->
          <!--</table>-->
        <!--</div>-->
      <!--</div>-->




      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span><span @click.self="showContent">疾病和基因</span>
        </div>
        <div class="content text-content left-right" style="display: block">
          <div class="left">
            <div class="title">临床表型 </div>
            <table class="special-table">
              <tbody id="synopsis_table">
              <tr class="t-bc">
                <td style="min-width: 100px">系统分类</td>
                <td>临床表型</td>
                <td style="min-width: 200px">中文表型标准术语</td>
              </tr>
              <tr v-if="clinicalSynopsisData.length === 0" class="center">
                <td colspan="3" class="center">暂无数据</td>
              </tr>
              <tr v-for="data in clinicalSynopsisData" class="font-12">
                <td><a class="no-d" data-toggle="tooltip" data-placement="top" :data-original-title="data.name">{{data.name | nameToCn}}</a></td>
                <td>
                  <div v-if="data.content" v-for="dataS in data.content">{{dataS.text}}</div>
                </td>
                <td>
                  <div v-if="data.content" v-for="list in data.content">
                    <!--{{list}}-->
                    <div v-for="hpo in list.hpos">{{hpo.hpoid}}：{{hpo.name &&hpo.name.chinese}}({{hpo.name &&hpo.name.english}})</div>

                    <!--<div v-if="list.hpo_ids" v-for="listHpo in list.hpo_ids">{{listHpo}}(<span :id="listHpo.replace(':','-')"></span>)</div>-->
                    <!--<div v-if="!list.hpo_ids"> - </div>-->
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="right">
            <div class="title">基因信息</div>
            <table class="special-table">
              <tbody>
              <tr>
                <td class="t-bc">基因ID</td>
                <td class="t-bc">基因名</td>
                <td class="t-bc">遗传模式</td>
                <td class="t-bc">表型</td>
              </tr>
              <tr v-for="list in allData.phenotype_maps">
                <td><router-link :to="{path:'geneD',query:{id:list.gene.geneid}}" target="_blank">{{list.gene.geneid}}</router-link></td>
                <td>{{list.gene.symbol}}</td>
                <td>
                  <span v-if="list.phenotype.inheritances" v-for="inh in list.phenotype.inheritances">

                    {{inh.chinese?inh.chinese:inh.name}}

                    <!--<a class="po" data-toggle="tooltip" data-placement="top" :data-original-title="inh.name">{{inh.name}}</a>-->
                  </span>
                </td>
                <td>{{list.phenotype.title}}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span><span @click.self="showContent">英文资料</span>
        </div>
        <div class="content text-content" style="display: block">
          <el-tabs tab-position="left" class="one">
            <el-tab-pane :label="text.title" v-for="(text,index) in allData.text_sections" :key="index">
              <div v-for="list in text.contents" class="text-one">{{list}}</div>
            </el-tab-pane>
          </el-tabs>
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
        sortArr: ['inheritance', 'growth', 'growthHeight', 'growthWeight', 'growthOther',
          'headAndNeck', 'headAndNeckHead', 'headAndNeckFace', 'headAndNeckEars', 'headAndNeckEyes',
          'headAndNeckNose', 'headAndNeckMouth', 'headAndNeckTeeth', 'headAndNeckNeck', 'cardiovascular',
          'cardiovascularHeart', 'cardiovascularVascular', 'respiratory', 'respiratoryNasopharynx', 'respiratoryLarynx',
          'respiratoryAirways', 'respiratoryLung', 'chest', 'chestExternalFeatures', 'chestRibsSternumClaviclesAndScapulae', 'chestBreasts',
          'chestDiaphragm', 'abdomen', 'abdomenExternalFeatures', 'abdomenLiver', 'abdomenPancreas', 'abdomenBiliaryTract', 'abdomenSpleen',
          'abdomenGastrointestinal', 'genitourinary',
          'genitourinaryExternalGenitaliaMale',
          'genitourinaryExternalGenitaliaFemale',
          'genitourinaryInternalGenitaliaMale',
          'genitourinaryInternalGenitaliaFemale',
          'genitourinaryKidneys',
          'genitourinaryUreters',
          'genitourinaryBladder',
          'skeletal',
          'skeletalSkull',
          'skeletalSpine',
          'skeletalPelvis',
          'skeletalLimbs',
          'skeletalHands',
          'skeletalFeet',
          'skinNailsHair',
          'skinNailsHairSkin',
          'skinNailsHairSkinHistology',
          'skinNailsHairSkinElectronMicroscopy',
          'skinNailsHairNails',
          'skinNailsHairHair',
          'muscleSoftTissue',
          'neurologic',
          'neurologicCentralNervousSystem',
          'neurologicPeripheralNervousSystem',
          'neurologicBehavioralPsychiatricManifestations',
          'voice',
          'metabolicFeatures',
          'endocrineFeatures',
          'hematology',
          'immunology',
          'neoplasia',
          'prenatalManifestations',
          'prenatalManifestationsMovement',
          'prenatalManifestationsAmnioticFluid',
          'prenatalManifestationsPlacentaAndUmbilicalCord',
          'prenatalManifestationsMaternal',
          'prenatalManifestationsDelivery',
          'laboratoryAbnormalities',
          'miscellaneous',
          'molecularBasis',
        ],
        clinicalSynopsisData: [],

      }
    },
    mounted: function () {
      this.getGene();
    },
    methods: {
      getGene: function () {
        const _vue = this;
        this.myAxios({
          url: 'biomeddb/omim/' + this.id
        }).then(function (resp) {
          _vue.loading = false;
          _vue.allData = resp.data.data;
          _vue.clinicalSynopsisData = _vue.sortSyn(_vue.allData.clinical_synopsis);
//          _vue.showCnName()
        })
      },
      sortSyn: function (clinicalSynopsis) {
        let arr = [];
        let _vue = this;
        $.each(clinicalSynopsis, function (i, value) { //进来是个对象
          if (!value) {
            return
          }
          if (i === 'dateCreated' || i === '_id') { //剔除数据
            return
          }
          $.each(_vue.sortArr, function (k, data) {
            if (i === data) {
              value.code = k
            }
          });
          let arrValue = []; //用来替换value值

          $.each(value, function (k1, k2) { //value是个对象
            if (k2 && k1!='code' &&k1!='_id') {
              arrValue = arrValue.concat(k2)
            }
          });
          arr.push({name: i, content: arrValue})
        });

        arr = arr.sort(function (a, b) { //排序
          return a.content.code - b.content.code
        });

        return arr
      },
    },
    filters: {
      nameToCn: function (name) {
        const Obj = {
          'inheritances': '遗传',
          'muscle_soft_tissues': '肌肉软组织损伤',
          'voices': '听力',
          'metabolic_features': '代谢特征',
          'endocrine_features': '内分泌特征',
          'hematology': '血液学',
          'immunologys': '免疫学',
          'neoplasia': '瘤形成',
          'laboratory_abnormalities': '实验室异常',
          'miscellaneous': '杂项',
          'molecular_basis': '分子基础',
          'old_formats': '旧格式',
          'growth': '生长',
          'head_and_neck': '头和颈部',
          'cardiovascular': '心血管',
          'respiratory': '呼吸',
          'chest': '胸部',
          'abdomen': '腹部',
          'genitourinary': '泌尿生殖器',
          'skeletal': '骨骼',
          'skin_nails_hair': '皮肤指甲头发',
          'neurologic':'神经系统',
          'prenatal_manifestations':'产前表现',
        };
        let cnName = '';
        $.each(Obj, function (n, data) {
          if (n === name) {
            cnName = data
          }
        });
        return cnName
      },
    },
  }
</script>

<style scoped lang="less">
  .text-content{
    .one{
      margin: 20px 0;
      .title{
        display: block;
        font-size: 14px;
        cursor: pointer;
      }
      .content-english{
        /*.text-one{*/
          /*margin: 10px 0;*/
          /*font-weight: normal;*/
          /*font-size: 14px;*/
        /*}*/
      }
      .text-one{
        margin: 10px 0;
        font-weight: normal;
        font-size: 14px;
      }
    }
  }
</style>
