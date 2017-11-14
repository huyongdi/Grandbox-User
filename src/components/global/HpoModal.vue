<!--弹框显示hpo中英文和ClinicalPhenotye-->
<template>
  <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="hpo_detail" role="dialog"
       aria-labelledby="gridSystemModalLabel3">
    <loading v-if="loadingHpo"></loading>
    <div class="modal-dialog modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
            aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="gridSystemModalLabel3">详情</h4>
        </div>
        <div class="modal-body">

          <div class="modal-btn">
            <span class="my-btn" data-dismiss="modal"><img src="../../../static/img/red-close.png" alt="">关闭</span>
          </div>

          <table class="table my-table no-shadow">
            <thead>
            <tr>
              <th>#</th>
              <th>ClinicalPhenotye</th>
              <th>HPO</th>
            </tr>
            </thead>
            <tbody id="synopsis_table">
            <tr v-if="clinicalSynopsisData.length === 0" class="center">
              <td colspan="3" class="center">暂无数据</td>
            </tr>
            <tr v-for="data in clinicalSynopsisData" class="font-12">
              <td><a data-toggle="tooltip" data-placement="top" :data-original-title="data.name">{{data.name | nameToCn}}</a></td>
              <td>
                <div v-if="data.content" v-for="dataS in data.content">{{dataS.text}}</div>
              </td>
              <td>
                <div v-if="data.content" v-for="list in data.content"><!--getCnName(listHpo)是为了触发get函数-->
                  <div v-if="list.hpos" v-for="listHpo in list.hpos">{{listHpo}}{{getCnName(listHpo)}}(<span :data-id="listHpo"
                                                                                                             class="hpo-cName"></span>)
                    <!--<div v-if="list.hpos" v-for="listHpo in list.hpos">{{listHpo}}{{listHpo|getCnName}}(<span :data-id="listHpo"-->
                                                                                                               <!--class="hpo-cName"></span>)-->
                  </div>
                  <div v-if="!list.hpos"> - </div>
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
    props: ['clinicalSynopsisObj'],
    data: function () {
      return {
        loadingHpo: '',
        sortArr: ["inheritance", "growth", "growthHeight", "growthWeight", "growthOther",
          "headAndNeck", "headAndNeckHead", "headAndNeckFace", "headAndNeckEars", "headAndNeckEyes",
          "headAndNeckNose", "headAndNeckMouth", "headAndNeckTeeth", "headAndNeckNeck", "cardiovascular",
          "cardiovascularHeart", "cardiovascularVascular", "respiratory", "respiratoryNasopharynx", "respiratoryLarynx",
          "respiratoryAirways", "respiratoryLung", "chest", "chestExternalFeatures", "chestRibsSternumClaviclesAndScapulae", "chestBreasts",
          "chestDiaphragm", "abdomen", "abdomenExternalFeatures", "abdomenLiver", "abdomenPancreas", "abdomenBiliaryTract", "abdomenSpleen",
          "abdomenGastrointestinal", "genitourinary",
          "genitourinaryExternalGenitaliaMale",
          "genitourinaryExternalGenitaliaFemale",
          "genitourinaryInternalGenitaliaMale",
          "genitourinaryInternalGenitaliaFemale",
          "genitourinaryKidneys",
          "genitourinaryUreters",
          "genitourinaryBladder",
          "skeletal",
          "skeletalSkull",
          "skeletalSpine",
          "skeletalPelvis",
          "skeletalLimbs",
          "skeletalHands",
          "skeletalFeet",
          "skinNailsHair",
          "skinNailsHairSkin",
          "skinNailsHairSkinHistology",
          "skinNailsHairSkinElectronMicroscopy",
          "skinNailsHairNails",
          "skinNailsHairHair",
          "muscleSoftTissue",
          "neurologic",
          "neurologicCentralNervousSystem",
          "neurologicPeripheralNervousSystem",
          "neurologicBehavioralPsychiatricManifestations",
          "voice",
          "metabolicFeatures",
          "endocrineFeatures",
          "hematology",
          "immunology",
          "neoplasia",
          "prenatalManifestations",
          "prenatalManifestationsMovement",
          "prenatalManifestationsAmnioticFluid",
          "prenatalManifestationsPlacentaAndUmbilicalCord",
          "prenatalManifestationsMaternal",
          "prenatalManifestationsDelivery",
          "laboratoryAbnormalities",
          "miscellaneous",
          "molecularBasis",
        ],
        availableHPOCount: 0,
        clinicalSynopsisData: [],
        hpoArr: [],
        hpoIdArr: []
      }
    },
    watch: {
      clinicalSynopsisObj: function () {
        this.loadingHpo = true;
        this.availableHPOCount = 0;
        this.clinicalSynopsisData = this.sortSyn(this.clinicalSynopsisObj);
      }
    },
    methods: {
      sortSyn: function (clinicalSynopsis) {
        let arr = [];
        let _vue = this;
        $.each(clinicalSynopsis, function (i, value) { //进来是个对象
          if (!value) {
            return;
          }
          if (i === 'dateCreated') { //剔除数据
            return;
          }
          $.each(_vue.sortArr, function (k, data) {
            if (i === data) {
              value.code = k;
            }
          });
          let arrValue = []; //用来替换value值
          $.each(value, function (k1, k2) { //value是个对象
            if (k2) {
              arrValue = arrValue.concat(k2)
            }
          });
          arr.push({name: i, content: arrValue})
        });

        arr = arr.sort(function (a, b) {
          return a.content.code - b.content.code
        });

        /*计算有效hpoId数*/
        $.each(arr, function (k3, k4) {
          $.each(k4.content, function (k5, k6) {
            if (k6.hpos) {
              _vue.availableHPOCount += k6.hpos.length
            }
          })
        });
        if (_vue.availableHPOCount == 0) {
          _vue.loadingHpo = false
        }
        return arr
      },
      getCnName: function (hpoId) {
        const _vue = this;

        _vue.myAxios({
          url: _vue.dbUrl + 'knowledge/hpo/?hpoid=' + hpoId
        }).then(function (resp) {
          const data = resp.data.results[0];
          const id = data.hpoId;
//          _vue.hpoIdArr.push(id);
          _vue.hpoArr.push({
            hpoId: id,
            hpoName: data.title.chinese ? data.title.chinese : data.title.english
          });
          $('.hpo-cName').each(function () {
            const id = $(this).data('id');
            const _this = $(this);
            $.each(_vue.hpoArr, function (n, value) {
              if (value.hpoId == id) {
                _this.html(value.hpoName)
              }
            });
          });
          _vue.availableHPOCount -= 1;
          if (_vue.availableHPOCount === 0) {
            _vue.loadingHpo = false
          }
        });
      },
    },
    filters: {
      nameToCn: function (name) {
        const Obj = {
          'inheritance': '遗传',
          'muscleSoftTissue': '肌肉软组织损伤',
          'voice': '听力',
          'metabolicFeatures': '代谢特征',
          'endocrineFeatures': '内分泌特征',
          'hematology': '血液学',
          'immunology': '免疫学',
          'neoplasia': '瘤形成',
          'laboratoryAbnormalities': '实验室异常',
          'miscellaneous': '杂项',
          'molecularBasis': '分子基础',
          'oldFormat': '旧格式',
          'growth': '生长',
          'headAndNeck': '头和颈部',
          'cardiovascular': '心血管',
          'respiratory': '呼吸',
          'chest': '胸部',
          'abdomen': '腹部',
          'genitourinary': '泌尿生殖器',
          'skeletal': '骨骼',
          'skinNailsHair': '皮肤指甲头发',
          'neurologic':'神经系统'

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
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
  }
</script>

<style scoped>

</style>
