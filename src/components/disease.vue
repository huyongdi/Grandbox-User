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
          <ul id="search-ul" class="hide" @click.stop="">
            <li v-for="om in omimQueryList" :title="om.show">
              <span @click="showTable(om)">{{om.show}}</span>
              <!--<router-link :to="{path:'/omim',query:{id:om._id}}" target="_blank">{{om.show}}</router-link>-->
            </li>
          </ul>
        </div>
      </div>

      <div class="default-content">
        <i class="glyphicon glyphicon-search"></i>
        <a href="javascript:void (0)" @click="changeValue('parkinsonism')">parkinsonism</a>
      </div>

      <table class="my-table" v-if="tableObj">
        <thead>
        <tr>
          <th>OMIM号</th>
          <th>名称</th>
          <th>别名</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td><router-link :to="{path:'/omim',query:{id:tableObj.mimnumber}}" target="_blank" title="查看详情">{{tableObj.mimnumber}}</router-link></td>
            <td>{{tableObj.title.chinese?tableObj.title.chinese:tableObj.title.preferred}}</td>
            <td>{{tableObj.title.alternatives.join(' | ')}}</td>

            <!--<td>-->
                  <!--<span v-if="list.phenotype.inheritances" v-for="inh in list.phenotype.inheritances">-->

                    <!--{{inh.chinese?inh.chinese:inh.name}}-->

                    <!--&lt;!&ndash;<a class="po" data-toggle="tooltip" data-placement="top" :data-original-title="inh.name">{{inh.name}}</a>&ndash;&gt;-->
                  <!--</span>-->
            <!--</td>-->

          </tr>
        </tbody>
      </table>

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
        loading:'',
        omValue:'',
        omimQueryList:[],
        tableObj:""
      }
    },
    mounted: function () {
      const _hide = $("#search-ul");
      $(".omim-content").on('click',function () {
        if(!_hide.hasClass('hide')){
          _hide.addClass('hide')
        }
      })
    },

    methods: {
      changeValue:function (data) {
        this.omValue=data;
        this.searchOmim()
      },
      showTable:function (data) {
        this.tableObj = data;
        $("#search-ul").addClass('hide');

      },
      searchOmim:function () {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url:'biomeddb/omim/?query='+this.omValue
        }).then((resp)=>{
          _vue.loading = false;

          let results = resp.data.data;
          let name = '';
          $.each(results,function (i,data) {
            name = data.title.chinese?data.title.chinese:data.title.preferred;
            data.show = data.mimnumber+'：'+name
          });

          $("#search-ul").removeClass('hide');

          _vue.omimQueryList = results;
        }).catch((error)=>{
          _vue.catchFun(error)
        })
      }
    },
    filter: {

    }
  }
</script>

<style scoped lang="less">

  .default-content{
    width: 594px;
    margin:  0 auto;
    >a{
      margin: 0 10px;
    }
  }

  .search-content{
    text-align: center;
    margin-top: 50px;
  }



</style>
