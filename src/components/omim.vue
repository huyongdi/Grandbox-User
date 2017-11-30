<template>
  <div class="data-content">
    <loading v-if="loading"></loading>
    <dataHeader></dataHeader>
    <div id="gene-d" class="right-content drop-down">
      <div class="title">
        【OMIM】<a :href="'https://www.omim.org/entry/'+allData.mimnumber" target="_blank">{{allData.mimnumber}}</a>
        ({{allData.prefix}}{{allData.title?allData.title.preferred:''}})
      </div>

      <div class="content-one">
        <div class="header" @click.self="showContent">
          <span class="fa fa-chevron-down"></span>基本信息
        </div>
        <div class="content" style="display: block">
          <table class="special-table">
            <tbody>
            <tr>
              <td class="t-bc">标题</td>
              <td>{{allData.title?allData.title.preferred:''}}({{allData.title?allData.title.chinese:''}})</td>
              <td class="t-bc">其他标题</td>
              <td>{{allData.title?allData.title.preferred:''}}({{allData.includeds?allData.includeds.chinese:''}})</td>
            </tr>
            <tr>
              <td class="t-bc">别名</td>
              <td colspan="3">{{allData.title?allData.title.alternatives.join(' | '):''}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="content-one">
        <div class="header" @click.self="showContent">
          <span class="fa fa-chevron-down"></span>基因信息
        </div>
        <div class="content disease-phenotype" style="display: block">
          <table class="special-table">
            <tbody>
              <tr>
                <td class="t-bc">基因</td>
                <td class="t-bc">遗传模式</td>
                <td class="t-bc">表型</td>
              </tr>
              <tr v-for="list in allData.phenotype_maps">
                <td>{{list.gene.geneid}}</td>
                <td>
                  <span v-if="list.phenotype.inheritances" v-for="inh in list.phenotype.inheritances">
                    <a class="po" data-toggle="tooltip" data-placement="top" :data-original-title="inh.name">{{inh.ab}}</a>
                  </span>
                </td>
                <td>{{list.phenotype.title}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="content-one">
        <div class="header" @click.self="showContent">
          <span class="fa fa-chevron-down"></span>详情
        </div>
        <div class="content" style="display: block">
          XXXXXXXXXXXXXX
        </div>
      </div>

      <div class="content-one">
        <div class="header" @click.self="showContent">
          <span class="fa fa-chevron-down"></span>参考资料
        </div>
        <div class="content" style="display: block">
          XXXXXXXXXXXXXX
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
          _vue.allData = resp.data.data
        })
      }
    },
    filter: {}
  }
</script>

<style scoped lang="less">

</style>
