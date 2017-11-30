<template>
  <div class="data-content">
    <dataHeader></dataHeader>
    <div class="gene-page right-content">
      <loading v-if="loading"></loading>
      <div class="title-below">
        <div class="search-div">
          <input type="text" placeholder="搜索基因" v-model="geneValue" class="search-input" @keyup.enter="searchGene">
          <span class="my-btn">
        <img src="../../static/img/red-con.png" alt="" @click="searchGene">
        </span>
        </div>
      </div>
      <div id="allGene" class='similar-table'>
        <div class="row similar-tbody">
        <span class="col-md-1" v-for="data in allGeneData">
          <div v-for="(list,index) in data">  <!--竖着的每列，总共12个竖着-->
             <div  class="similar-td" v-if="list"><!--:data-original-title-->
               <div v-if="!list.special" data-toggle="tooltip" data-placement="top" :data-original-title="'名称：'+list.name.symbol+'<br>别名：'+list.name.synonyms"
                    :class="{'special-bc':index%2!=0,'isLetter':list.special}"
                    @click="toGeneD(list)">
                 <span v-if="list.name">{{list.name.symbol}}</span>
               </div>
               <div class="v-else" :class="{'special-bc':index%2!=0,'isLetter':list.special}"
                    @click="toGeneD(list)">{{list.symbol}}</div>
             </div>
             <div class="similar-td" v-else="" :class="{'special-bc':index%2!=0}">  </div>
          </div>


        </span>
        </div>
      </div>

      <page :childCount="allGeneCount" :childReset="allGeneReset" @childCurrent="allGeneGetCurrent"></page>
    </div>
  </div>

</template>

<script>
  import page from './global/Page.vue'
  import dataHeader from './global/databaseHeader.vue'

  export default {
    data: function () {
      return {
        allGeneCount: 1,
        allGeneReset: 0,
        allGenePage: 1,
        allGeneData: [],
        currentExtraCount: 0,
        currentExtraData: [], //当前页面额外的数据
        firstLetter: '', //预存首字母，会被不断替换
        respGeneData: [],

        current: 1,
        count: 1,
        list_gene: [],
        loading: '',
        geneValue: this.$route.query.geneValue?this.$route.query.geneValue:'',
      }
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip({html : true });
      $('.a123').popover()
    },
    mounted: function () {
      this.fillAllGene();
    },
    components: {
      'page': page,
      'dataHeader': dataHeader,
    },
    methods: {

      searchGene:function () {
        this.allGenePage = 1;
        this.firstLetter = '';
        this.currentExtraCount = 0;
        this.currentExtraData = [];
        this.fillAllGene();
      },
      fillGeneNameList: function () {
        const _vue = this;
        let newArr = [];

        _vue.firstLetter = '';
//        _vue.currentExtraCount = 0;
        _vue.currentExtraData = [];

        console.log(_vue.respGeneData);

        $.each(_vue.respGeneData, function (i, data) {
          const currentFirstLetter = data.name.symbol.substring(0, 1);
          if (currentFirstLetter != _vue.firstLetter) {
            _vue.firstLetter = currentFirstLetter;
            newArr.push({symbol:currentFirstLetter,special:true,synonyms:'-'});
            newArr.push(data);
            _vue.currentExtraCount += 1;
          } else {
            if(data.synonyms instanceof Array){
              data.synonyms =data.synonyms.join('|');
            }
            newArr.push(data)
          }
        });


        $.each(newArr, function (key, value) {
          if (key >= newArr.length - _vue.currentExtraCount) {
            _vue.currentExtraData.push(value);
          }
        });

        if(newArr.length>240){
          newArr.length = newArr.length - _vue.currentExtraCount;
        }else{
          newArr.length = 240
        }
        _vue.allGeneData = [];
        _vue.allGeneData = _vue.outputs(newArr);

        console.log(_vue.respGeneData);

      },
      fillAllGene: function () {
        const _vue = this;
        _vue.respGeneData = [];
//        _vue.currentExtraData = [];
//        _vue.currentExtraCount = 0;
//        _vue.firstLetter = '';
        _vue.loading = true;
        this.myAxios({
          url:'biomeddb/gene/?page='+_vue.allGenePage+'&query='+_vue.geneValue
        }).then(function (resp) {
          let result = resp.data;
          _vue.respGeneData = result.data;
          _vue.allGeneCount =result.meta.total/120;

          if (_vue.currentExtraData.length !== 0) {
            _vue.currentExtraData = _vue.currentExtraData.reverse();
            $.each(_vue.currentExtraData, function (key, value) {
              _vue.respGeneData.unshift(value);
            });
          }

          _vue.fillGeneNameList();
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error)
        });

      },
      allGeneGetCurrent: function (data) {
        this.allGenePage = data;
        this.fillAllGene()
      },
      outputs: function (allData) {
        /*将数组里面的值几个几个的输出*/
        if (!allData) {
          return
        }
        let arrCount = Math.ceil(allData.length / 20);
        let pushArr = [];
        while (arrCount) {
          pushArr.push([]);
          arrCount -= 1
        }
        $.each(allData, function (i, data) {
          i += 1;
          $.each(pushArr, function (k1, k2) {
            if (Math.ceil(i / 20) === k1 + 1) {
              k2.push(data)
            }
          })
        });
        $.each(pushArr, function (i, data) {
          if (data.length !== 20) {
            data.length = 20
          }
        });
        return pushArr;
      },

      toGeneD: function (list) {
        this.$router.push({name: 'geneD', query: {id:list._id}})
      },

    },
    filter: {
      isLetter: function (data) {
        return /^[A-Z]+$/.test(data)
      }
    }
  }
</script>

<style scoped lang="less">
  .title-below{
    margin-bottom: 20px;
  }
  #app #allGene {

    .tooltip{
      white-space: nowrap;
    }
    font-size: 12px;
    .isLetter{
      text-align: center;
      padding-left: 0;
      font-size: 14px;
    }

  }
</style>
