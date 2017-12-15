<template>
  <div class="data-content pheno-content">
    <loading v-if="loading"></loading>
    <dataHeader></dataHeader>
    <div class="right-content drop-down ph-detail">

      <div class="title">
        【表型】 <span v-if="allData.name">{{allData.name.chinese ? allData.name.chinese : allData.name.english}}</span>
      </div>

      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span><span @click.self="showContent">基本信息</span>
        </div>
        <div class="content text-content" style="display: block">
          <table class="special-table">
            <tbody>
            <tr>
              <td class="t-bc">ID</td>
              <td>{{allData.hpoid}}</td>
              <td class="t-bc">外部编号</td>
              <td>
                <a target="_blank" v-if="allData.hpoid" :href="'http://compbio.charite.de/hpoweb/showterm?id=HP:0000118'+allData.hpoid">{{allData.hpoid}}</a>
              </td>
            </tr>
            <tr>
              <td class="t-bc">定义</td>
              <td colspan="3"><span v-if="allData.definition">{{allData.definition.chinese?allData.definition.chinese:allData.definition.english}}</span></td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span> <span @click.self="showContent">父/子类</span>
        </div>
        <div class="content left-right" style="display: block">
          <div class="left">
            <div class="title">父类</div>
            <ul v-for="parent in allData.parents">
              <li>
                <router-link target="_blank" :to="{path:'/phenotypeD',query:{id:parent.hpoid}}">
                  {{parent.hpoid}}({{parent.name.chinese ? parent.name.chinese : parent.name.english}})
                </router-link>
              </li>
            </ul>
          </div>
          <div class="right">
            <div class="title">子类</div>
            <ul v-for="child in allData.children">
              <li>
                <router-link target="_blank" :to="{path:'/phenotypeD',query:{id:child.hpoid}}">
                  {{child.hpoid}}({{child.name.chinese ? child.name.chinese : child.name.english}})
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span> <span @click.self="showContent">相关疾病/基因</span>
        </div>
        <div class="content left-right" style="display: block">
          <div class="left">
            <div class="title">相关疾病</div>
            <table class="special-table">
              <thead>
              <tr class="t-bc">
                <th class="class-id">ID</th>
                <th id="id-name" class="right-td">名称
                  <div class="bc-ff" v-if="allData.omims && allData.omims.length>8"></div>
                </th>
              </tr>
              </thead>
            </table>
            <div class="table-content">
              <table class="special-table">
                <tbody>
                <tr v-for="omim in allData.omims">
                  <td class="class-id"><router-link target="_blank" :to="{path:'/omim',query:{id:omim.mimnumber}}">OMIM:{{omim.mimnumber}}</router-link></td>
                  <td class="class-name">{{omim.title.chinese?omim.title.chinese:omim.title.preferred}}</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="right">
            <div class="title">相关基因</div>
            <table class="special-table">
              <thead>
              <tr class="t-bc">
                <th class="class-geneId">ID</th>
                <th id="" class="right-td">别名
                  <div class="bc-ff" v-if="allData.genes && allData.genes.length>8"></div>
                </th>
              </tr>
              </thead>
            </table>
            <div class="table-content">
              <table class="special-table">
                <tbody>
                <tr v-for="gene in allData.genes">
                  <td class="class-geneId"><router-link target="_blank" :to="{path:'/geneD',query:{id:gene.geneid}}">{{gene.name.symbol}}({{gene.geneid}})</router-link></td>
                  <td>{{gene.name.synonyms.join(' |　')}}</td>
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
  import page from './global/Page.vue'
  import dataHeader from './global/databaseHeader.vue'

  export default {
    data: function () {
      return {
        ID: this.$route.query.id ? this.$route.query.id : '',
        loading: '',
        allData: ''
      }
    },
    mounted: function () {
      this.getD();
    },
    components: {
      'page': page,
      'dataHeader': dataHeader,
    },
    methods: {
      getD: function () {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url: 'biomeddb/hpo/' + this.ID
        }).then((resp) => {
          _vue.loading = false;
          let results = resp.data.data;

          _vue.allData = results;

          this.$nextTick(function () {
           $("#id-id").css("width",$(".class-id").width())
          })

        }).catch((error) => {
          _vue.catchFun(error)
        })
      }
    },
    filter: {}
  }
</script>

<style scoped lang="less">
  .ph-detail {
    .ontobee-img {
      height: 20px;
      cursor: pointer;
    }
  }
  .right-td{
    position: relative;
    .bc-ff{
      background-color: #e4ecea;
      width: 17px;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
      border-left: 1px solid #cfddd9;
    }
  }
  .class-id{
    width: 120px;
  }
  .class-geneId{
    width: 180px;
  }
  .class-gene{
    width: 300px;
    word-break: break-all;
  }
  .th-gene{
    width: 200px;
  }
  #id-gene{
    width: 317px;
  }
  .table-content{
    max-height: 290px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
