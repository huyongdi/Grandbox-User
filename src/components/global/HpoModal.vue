<!--弹框显示hpo中英文和ClinicalPhenotye-->
<template>
  <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="hop_modal" role="dialog"
       aria-labelledby="gridSystemModalLabel3">
    <loading v-if="loadingHpoNew"></loading>
    <div class="modal-dialog modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="gridSystemModalLabel3">详情</h4>
        </div>
        <div class="modal-body">

          <div class="modal-btn">
            <span class="my-btn" @click="hideMo"><img src="../../../static/img/red-close.png" alt="">关闭</span>
          </div>

          <table class="table my-table no-shadow table-top">
            <thead>
            <tr>
              <th style="min-width: 100px">系统分类</th>
              <th>临床表型</th>
              <th style="min-width: 200px">中文表型标准术语</th>
            </tr>
            </thead>
            <tbody id="synopsis_table">
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
                  <div v-for="hpo in list.hpos">{{hpo.hpoid}}：{{hpo.name &&hpo.name.chinese}}({{hpo.name &&hpo.name.english}})</div>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    props: ['omimId'],
    data: function () {
      return {
        loadingHpoNew: '',
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

        availableHPOCount: 0,
        needAxiosCount: 0,
        doneAxiosCount:0,

        clinicalSynopsisData: [],
        hpoArr: [],
        hpoIdArr: [],
      }
    },
    watch: {
      omimId: function () {
        this.getOmimData()
      },
    },
    methods: {
      hideMo:function () {
        $("#"+this.modalIdCurrent).modal('hide')
      },
      getOmimData: function () {
        const _vue = this;
        this.loadingHpoNew = true;
        this.myAxios({
          url: 'biomeddb/omim/' + this.omimId
        }).then(function (resp) {
          _vue.loadingHpoNew = false;
          _vue.allData = resp.data.data;
          _vue.clinicalSynopsisData = _vue.sortSyn(_vue.allData.clinical_synopsis);

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
          'muscleSoftTissue': '肌肉软组织损伤',
          'voice': '听力',
          'metabolicFeatures': '代谢特征',
          'endocrineFeatures': '内分泌特征',
          'hematology': '血液学',
          'immunologys': '免疫学',
          'neoplasia': '瘤形成',
          'laboratoryAbnormalities': '实验室异常',
          'miscellaneous': '杂项',
          'molecular_basis': '分子基础',
          'oldFormat': '旧格式',
          'growth': '生长',
          'head_and_neck': '头和颈部',
          'cardiovascular': '心血管',
          'respiratory': '呼吸',
          'chest': '胸部',
          'abdomen': '腹部',
          'genitourinary': '泌尿生殖器',
          'skeletal': '骨骼',
          'skin_nails_hair': '皮肤指甲头发',
          'neurologic':'神经系统'
        }
        let cnName = ''
        $.each(Obj, function (n, data) {
          if (n === name) {
            cnName = data
          }
        })
        return cnName
      },
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip()
    },
  }
</script>

<style scoped>

</style>
