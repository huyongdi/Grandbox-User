<template>
  <div class="data-content pheno-content">
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
            <li v-for="hpo in hpoQueryList" :data-hpoId="hpo.hpoid" :data-id="hpo._id" :title="hpo.show" @click="toDetail(hpo.hpoid)">
              {{hpo.show}}
            </li>
          </ul>
        </div>

        <div class="table-content col-xs-8 col-xs-offset-2">
          <table class="special-table">
            <thead>
            <tr class="t-bc">
              <th>所属术语</th>
              <th>主分类(译名)</th>
              <th>词汇数目</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td rowspan="23">表型异常</td>
              <td> 结缔组织异常</td>
              <td>193</td>
            </tr>
            <tr>
              <td> 声音异常</td>
              <td>15</td>
            </tr>
            <tr>
              <td> 神经系统异常</td>
              <td>1572</td>
            </tr>
            <tr>
              <td> 乳房异常</td>
              <td>28</td>
            </tr>
            <tr>
              <td> 眼部异常</td>
              <td>841</td>
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
              <td> 内分泌系统异常</td>
              <td>337</td>
            </tr>
            <tr>
              <td> 头部和颈部的异常</td>
              <td>1219</td>
            </tr>
            <tr>
              <td> 免疫系统异常</td>
              <td>515</td>
            </tr>
            <tr>
              <td> 生长异常</td>
              <td>75</td>
            </tr>
            <tr>
              <td>肢体异常</td>
              <td>2698</td>
            </tr>
            <tr>
              <td>胸腔异常</td>
              <td>3</td>
            </tr>
            <tr>
              <td>血液和造血组织异常</td>
              <td>511</td>
            </tr>
            <tr>
              <td> 肌肉组织异常</td>
              <td>564</td>
            </tr>
            <tr>
              <td>心血管系统异常</td>
              <td>814</td>
            </tr>
            <tr>
              <td>骨骼系统异常</td>
              <td>3532</td>
            </tr>
            <tr>
              <td>呼吸系统异常</td>
              <td>319</td>
            </tr>

            <tr>
              <td> 耳部异常</td>
              <td>280</td>
            </tr>
            <tr>
              <td> 代谢紊乱/稳态失衡</td>
              <td>804</td>
            </tr>
            <tr>
              <td> 泌尿生殖系统异常</td>
              <td>752</td>
            </tr>
            <tr>
              <td> 体壁的异常</td>
              <td>754</td>
            </tr>
            <tr>
              <td> 消化系统异常</td>
              <td>504</td>
            </tr>
            <tr>
              <td>遗传模式</td>
              <td>遗传模式</td>
              <td>27</td>
            </tr>
            <tr>
              <td>死亡/衰老</td>
              <td>死亡/衰老</td>
              <td>9</td>
            </tr>
            <tr>
              <td>临床条件因素</td>
              <td>临床条件因素</td>
              <td>54</td>
            </tr>
            <tr>
              <td>总计</td>
              <td>17054</td>
              <td>不同子分类中词条有重叠，去除重复后，共计11896个</td>
            </tr>
            </tbody>
          </table>
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
        phValue: '',
        count: 1,
        reset: 0,
        results: [],
        doneHttp: '',
        page: 1,
        hpoQueryList: [],
        loading: '',
        hpoObj: {}
      }
    },
    mounted: function () {
      const _hide = $("#search-ul");
      $(".pheno-content :not('#search-ul')").off('click').on('click',function () {
        if(!_hide.hasClass('hide')){
          _hide.addClass('hide')
        }
      })
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
          $.each(results, function (i, data) {
            data.show = data.hpoid + '-' + data.name.chinese + '(' + data.name.english + ')'
          });

          _vue.hpoQueryList = results;
          _vue.loading = false;
          console.log(_vue.hpoQueryList);
          $("#search-ul").removeClass('hide')
        })
      },

      toDetail:function (id) {
        this.$router.push({path: '/phenotypeD',query:{id:id}})
      }
//
//      getList: function (event) {
//        this.hpoValue = $(event.target).data("hpoid");
//        this.getFun()
//      },
//
//      getFun: function () {
//        this.loading = true;
//        $("#search-ul").addClass('hide');
////        const id = $(event.target).data("id");
//        const _vue = this;
//        this.myAxios({
//          url: 'biomeddb/hpo/' + _vue.hpoValue
//        }).then(function (resp) {
//          _vue.hpoObj = resp.data.data;
//          _vue.loading = false
//        })
//      },

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
    filter: {}
  }
</script>

<style scoped lang="less">
  .title-below {
    text-align: center;
    margin: 20px 0;
    .search-div {
      z-index: 100;
      position: relative;
      > input {
        width: 350px;
      }
      ul {
        position: absolute;
        padding: 0;
        width: 344px;
        border: 1px solid #d4d4d4;
        border-top: none;
        top: 28px;
        background-color: #fff;
        max-height: 200px;
        overflow-y: auto;
        overflow-x: hidden;
        li {
          text-align: left;
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

  .table-content {
    margin-top: 30px;
    /*background-color: #fff;*/
  }


</style>
