<template>
  <div class="data-content">
    <dataHeader></dataHeader>
    <loading v-if="loading"></loading>
    <div class="right-content omim-content">
      <div class="search-content">
        <div class="search-div">
          <input type="text" placeholder="搜索疾病" v-model="omValue" class="search-input" @keyup.enter="searchOmim" @click.stop="">
          <span class="my-btn">
            <img src="../../static/img/red-con.png" alt="" @click="searchOmim">
          </span>

          <ul id="search-ul" class="hide" @click.stop="">
            <li v-for="om in omimQueryList" :title="om.show">
              <router-link :to="{path:'/omim',query:{id:om._id}}">{{om.show}}</router-link>
            </li>
          </ul>
        </div>
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
        loading:'',
        omValue:'',
        omimQueryList:[]
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

  .search-content{
    text-align: center;
    margin-top: 50px;
  }



</style>
