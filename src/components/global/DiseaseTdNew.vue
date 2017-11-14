<!--各种分析结果页面，疾病那一行-->
<template>
  <td class="disease-td">
    <div v-for="(disease,index) in diseases" v-if="diseases.length!==0">
      <!--小圆点-->
      <span v-if="diseases.length !==1"
            :class="{color0:index===0,color1:index%4===1,color2:index%4===2,color3:index%4===3,color4:index%4===0&&index!==0}">
      </span>
      <div v-for="omimSingle in disease.omims">
        <!--[AD]-->
        <span v-if="omimSingle.inheritances.length == 0" class="bold">[无]</span>
        <span v-for="inheritance in omimSingle.inheritances">
          <span class="po bold" data-toggle="tooltip" data-placement="top" :data-original-title='inheritance.name+"("+inheritance.chinese+")"'>
            [{{inheritance.ab}}]
          </span>
        </span>
        <!--Pfeiffer综合征有中文名-->
        <a class="po common-a" @click="showHPO(omimSingle.id)" data-toggle="tooltip" data-placement="top"
           :data-original-title='omimSingle.preferred'>
          {{omimSingle.name}}
        </a>
        (<a target="_blank" :href="dbHtml+'#/oMIMD?&id='+omimSingle.mimNumber" class="common-a">{{omimSingle.mimNumber}}</a>)
      </div>
      <span v-if="disease.omims.length==0"> - </span>
    </div>
    <div v-else=""> - </div>
  </td>
</template>

<script>
  export default {
    props: ['diseases'],
    data: function () {
      return {
        allNull: 0,
      }
    },
    watch: {

    },
    methods: {
      showHPO: function (id) {
        this.$emit('sendOmimId', id);
        $("#hpo_modalN").modal("show")
      }
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip();
    },
  }
</script>

<style scoped lang="less">
  .disease-td {
    padding-left: 16px;
    > div {
      position: relative;
    }
    > div:not(:last-child) {
      border-bottom: 1px solid #ddd;
      padding-bottom: 8px;
    }
    > div:not(:first-child) {
      margin-top: 8px;
    }
    .color {
      position: absolute;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      top: 3.5px;
      left: -10px;
    }
    .color0 {
      .color;
      background-color: #eeb763;
    }
    .color1 {
      .color;
      background-color: #8ebf73;
    }
    .color2 {
      .color;
      background-color: #d32c52;
    }
    .color3 {
      .color;
      background-color: #2a7fd2;
    }
    .color4 {
      .color;
      background-color: #959595;
    }
  }
</style>
