<template>
  <div class="data-content">
    <loading v-if="loading"></loading>
    <dataHeader></dataHeader>
    <div class="right-content">
      <div class="title-below">
        <div class="search-div">
          <input type="text" placeholder="搜索HPO" v-model="phValue" class="search-input" @keyup.enter="searchHpo">
          <span class="my-btn">
            <img src="../../static/img/red-con.png" alt="" @click="searchHpo">
          </span>

          <ul id="search-ul" class="hide">
            <li v-for="hpo in hpoQueryList" :data-hpoId="hpo.hpoid" :data-id="hpo._id" :title="hpo.show" @click="getList">
              {{hpo.show}}
            </li>
          </ul>
        </div>

        <div class="table-content col-xs-8 col-xs-offset-2">
          <table class="special-table">
            <tbody>
            <tr class="t-bc">
              <td>主分类(译名)</td>
              <td>词汇数目</td>
            </tr>
            <tr>
              <td>骨骼系统异常</td>
              <td>3532</td>
            </tr>
            <tr>
              <td>遗传模式</td>
              <td>27</td>
            </tr>
            <tr>
              <td>血液和造血组织异常</td>
              <td>511</td>
            </tr>
            <tr>
              <td>胎儿产前发育或出生异常</td>
              <td>112</td>
            </tr>
            <tr>
              <td>肿瘤</td>
              <td>522</td>
            </tr>
            <tr>
              <td>肢体异常</td>
              <td>522</td>
            </tr>
            <tr>
              <td> 肌肉组织异常</td>
              <td>564</td>
            </tr>
            <tr>
              <td>  耳部异常</td>
              <td>280</td>
            </tr>
            <tr>
              <td> 结缔组织异常</td>
              <td>193</td>
            </tr>
            <tr>
              <td>  神经系统异常</td>
              <td>1572</td>
            </tr>
            </tbody>
          </table>
        </div>


      </div>

      <!--<table id="ph-table" class="bc-fff my-table">-->
        <!--<thead>-->
        <!--<tr>-->

          <!--<th>HPO号</th>-->
          <!--<th>中文名称</th>-->

          <!--<th>英文名称</th>-->
          <!--<th>中文定义</th>-->
          <!--<th>英文定义</th>-->
        <!--</tr>-->
        <!--</thead>-->
        <!--<tbody>-->
        <!--<tr>-->
          <!--<td>{{hpoObj.hpoid}}</td>-->
          <!--<td>{{hpoObj.name?hpoObj.name.chinese:""}}</td>-->
          <!--<td>{{hpoObj.name?hpoObj.name.english:""}}</td>-->
          <!--<td>{{hpoObj.definition?hpoObj.definition.chinese:""}}</td>-->
          <!--<td>{{hpoObj.definition?hpoObj.definition.english:""}}</td>-->
        <!--</tr>-->
        <!--</tbody>-->
      <!--</table>-->


    </div>
  </div>
</template>

<script>
  import page from './global/Page.vue'
  import dataHeader from './global/databaseHeader.vue'

  export default {
    data: function () {
      return {
        phValue:'',
        count:1,
        reset:0,
        results:[],
        doneHttp:'',
        page:1,
        hpoQueryList:[],
        loading :'',
        hpoObj:{}
      }
    },
    mounted: function () {

    },
    components: {
      'page': page,
      'dataHeader': dataHeader,
    },
    methods: {
      searchHpo: function () {
        const _vue = this;
        _vue.loading = true;
        this.myAxios({
          url: 'biomeddb/hpo/?query=' + this.phValue
        }).then(function (resp) {
          let results = resp.data.data;
          $.each(results,function (i,data) {
            data.show = data.hpoid+'-'+data.name.chinese+'('+data.name.english+')'
          });

          _vue.hpoQueryList = results;
          _vue.loading = false;
          console.log(_vue.hpoQueryList);
          $("#search-ul").removeClass('hide')
        })
      },

      getList:function (event) {
        this.hpoValue = $(event.target).data("hpoid");
        this.getFun()
      },

      getFun:function () {
        this.loading = true;
        $("#search-ul").addClass('hide');
//        const id = $(event.target).data("id");
        const _vue = this;
        this.myAxios({
          url: 'biomeddb/hpo/' + _vue.hpoValue
        }).then(function (resp) {
          _vue.hpoObj = resp.data.data;
          _vue.loading = false
        })
      },

//      getList:function () {
//        const _vue = this;
//        this.myAxios({
//          url:'biomeddb/hpo/?query='+this.phValue+"&page="+this.page
//        }).then(function (resp) {
//          let data = resp.data;
//          _vue.results = data.data;
//          _vue.count = data.meta.total;
//        }).catch(function (error) {
//          _vue.catchFun(error)
//        })
//      },
//      getCurrent:function (data) {
//        this.page = data;
//      },

    },
    filter: {


    }
  }
</script>

<style scoped lang="less">
  .title-below{
    text-align: center;
    margin: 20px 0;
    .search-div{
      position: relative;
      >input{
        width: 300px;
      }
      ul {
        position: absolute;
        padding: 0;
        width: 294px;
        border: 1px solid #d4d4d4;
        border-top: none;
        top: 28px;
        background-color: #fff;
        max-height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
        li {
          cursor: pointer;
          padding-left: 8px;
          height: 30px;
          line-height: 30px;
          white-space: nowrap;
          text-overflow: ellipsis;
          &:hover {
            background-color: rgb(255, 245, 231)
          }
        }
      }
    }
  }



</style>
