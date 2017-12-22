<template>
  <div class="data-content">
    <dataHeader></dataHeader>
    <loading v-if="loading"></loading>
    <div class="right-content omim-content">
      <div class="search-content">
        <div class="search-div big-search">
          <input type="text" placeholder="搜索疾病" v-model="omValue" class="search-input" @keyup.enter="searchOmim" @click.stop="">
          <span class="my-btn">
            <img src="../../static/img/red-con.png" alt="" @click="searchOmim">
          </span>
          <!--<ul id="search-ul" class="hide" @click.stop="">-->
          <!--<li v-for="om in omimQueryList" :title="om.show">-->
          <!--<span @click="showTable(om)">{{om.show}}</span>-->
          <!--&lt;!&ndash;<router-link :to="{path:'/omim',query:{id:om._id}}" target="_blank">{{om.show}}</router-link>&ndash;&gt;-->
          <!--</li>-->
          <!--</ul>-->
        </div>
      </div>

      <div class="default-content">
        <i class="glyphicon glyphicon-search"></i>
        <a href="javascript:void (0)" @click="changeValue('parkinsonism')">parkinsonism</a>

        <!--<div class="font-12">-->
          <!--本搜索引擎是由中文人类表型标准用语联盟 （CHPO）授权建立并使用 CHPO wiki 网站数据搭建。 旨在检索表型术语及其对于疾病的注释。-->
        <!--</div>-->

      </div>

      <div class="col-xs-8 col-xs-offset-2">
        <table class="my-table" v-if="omimQueryList.length!=0">
          <thead>
          <tr>
            <th>OMIM号</th>
            <th>名称</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="tableObj in omimQueryList">
            <td>{{tableObj.prefix}}
              <router-link :to="{path:'/omim',query:{id:tableObj.mimnumber}}" target="_blank" title="查看详情">{{tableObj.mimnumber}}</router-link>
            </td>
            <td>{{tableObj.title.chinese ? tableObj.title.chinese : tableObj.title.preferred}}</td>
          </tr>
          <tr v-if="omimQueryList.length == 0">
            <td colspan="3" class="center">暂无数据</td>
          </tr>
          </tbody>
        </table>
      </div>


    </div>
  </div>
</template>

<script>
  import page from './global/Page.vue'
  import dataHeader from './global/databaseHeader.vue'

  export default {
    components: {
      'page': page,
      'dataHeader': dataHeader,
    },
    data: function () {
      return {
        loading: '',
        omValue: '',
        omimQueryList: [],
        tableObj: ""
      }
    },
    mounted: function () {
      const _hide = $("#search-ul");
      $(".omim-content").on('click', function () {
        if (!_hide.hasClass('hide')) {
          _hide.addClass('hide')
        }
      })
    },

    methods: {
      changeValue: function (data) {
        this.omValue = data;
        this.searchOmim()
      },
      showTable: function (data) {
        this.tableObj = data;
        $("#search-ul").addClass('hide');

      },
      searchOmim: function () {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url: 'biomeddb/omim?query=' + this.omValue
        }).then((resp) => {
          _vue.loading = false;
          let results = resp.data.data;
//          let name = '';
//          $.each(results,function (i,data) {
//            name = data.title.chinese?data.title.chinese:data.title.preferred;
//            data.show = data.mimnumber+'：'+name
//          });

//          $("#search-ul").removeClass('hide');

          _vue.omimQueryList = results;
        }).catch((error) => {
          _vue.catchFun(error)
        })
      }
    },
    filter: {}
  }
</script>

<style scoped lang="less">

  .default-content {
    width: 594px;
    margin: 0 auto;
    > a {
      margin: 0 10px;
    }
  }

  .search-content {
    text-align: center;
    margin-top: 50px;
  }


</style>
