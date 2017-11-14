<!--分析流程待提交列表-->
<template>
  <div class="row">
    <loading v-if="loading"></loading>
    <div class="report-list col-sm-11">
      <div class="title">
        <span class="title-b">自动化报告</span>
        <span class="title-s">< 在线报告查询</span>
      </div>
      <div class="top-content">
        <span class="my-btn refresh pull-left" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
        <div class="search-div pull-right">
          <input placeholder="请输入关键字" class="search-input" v-model="inputValue" @keyup.enter="search">
          <span class="my-btn" @click="search">
            <img src="../../static/img/red-con.png" alt="">
          </span>
        </div>
      </div>

      <div class="no-data" v-if="results.length == 0">
        您的报告已收到并正在审查中
        <img src="../../static/img/report-no.png" alt="">
      </div>

      <table id="sg-table" class="bc-fff my-table" v-if="results.length != 0">
        <thead>
        <tr>
          <th>报告ID</th>
          <th>受检者</th>
          <th>样本编号</th>
          <th>样本类型</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="results.length == 0"><td colspan="4" class="center">暂无数据</td></tr>
        <tr v-for="list in results" title="点击查看报告" @click="toReport(list.id)">
         <td>{{list.id}}</td>
         <td><span v-if="list.patient">{{list.patient.name}}({{list.patient.gender}})</span></td>
         <td><span v-if="list.patient">{{list.patient.sample.code}}</span></td>
         <td><span v-if="list.patient">{{list.patient.sample.type}}</span></td>
        </tr>
        </tbody>
      </table>
      <!--<page :childCount="count" :childReset="0" @childCurrent="getCurrent"></page>-->
    </div>
  </div>
</template>

<script>
  import page from './global/Page'
  export default {
    components: {
      'page': page
    },
    data: function () {
      return {
        results: [],
        loading: false,
        inputValue:''
//        count: 0,
//        pageNum: 1,
      }
    },
    created: function () {
      this.getList();
    },
    methods: {
      getList:function () {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url:'report/reportsnv/?search='+_vue.inputValue
        }).then(function (resp) {
          _vue.results = resp.data.results;
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      getCurrent: function (data) {
        this.pageNum = data;
      },
      search:function () {
        this.getList()
      },
      toReport:function (id) {
        this.$router.push({path: '/taskM/foo/report',query:{'reportId':id}})
      },
      refresh:function () {
        this.getList()
      }
    }
  }
</script>

<style scoped lang="less">
.report-list{
  #sg-table{
    margin-top: 40px;
  }
  .no-data{
    background-color: #fff;
    text-align: center;
    padding: 15px 0;
    margin-top: 40px;
  }
  .top-content{
    margin: 15px 0;
    overflow: hidden;
  }
}
</style>
