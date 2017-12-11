<template>
  <div class="data-content">
    <dataHeader></dataHeader>
    <div class="right-content">
      <div class="search-div">
        <input type="text" placeholder="搜索疾病" v-model="phValue" class="search-input" @keyup.enter="">
        <span class="my-btn">
            <img src="../../static/img/red-con.png" alt="" @click="">
          </span>

        <!--<ul id="search-ul" class="hide">-->
          <!--<li v-for="hpo in hpoQueryList" :data-hpoId="hpo.hpoid" :data-id="hpo._id" :title="hpo.show" @click="toDetail(hpo.hpoid)">-->
            <!--{{hpo.show}}-->
          <!--</li>-->
        <!--</ul>-->
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
        phValue:''
      }
    },
    mounted: function () {
    },

    methods: {

    },
    filter: {

    }
  }
</script>

<style scoped lang="less">

</style>
