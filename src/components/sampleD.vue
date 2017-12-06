<template>
  <div class="data-content" id="data-content">
    <myDataH></myDataH>
    <div id="add-sample" class="right-content drop-down">
      <loading v-if="loading"></loading>
      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span><span @click.self="showContent">基本信息</span>
        </div>
        <div class="content mice-content" style="display: block">
          <table class="special-table">
            <tbody>
              <tr>
                <td class="t-bc">姓名</td>
                <td>{{detailData.patient && detailData.patient.name}}</td>
                <td class="t-bc">编号</td>
                <td>{{detailData.sn}}</td>
              </tr>
              <tr>
                <td class="t-bc">性别</td>
                <td>{{detailData.patient && detailData.patient.gender}}</td>
                <td class="t-bc">民族</td>
                <td>{{detailData.patient && detailData.patient.national}}</td>
              </tr>
              <tr>
                <td class="t-bc">籍贯</td>
                <td>{{detailData.patient && detailData.patient.nativePlace}}</td>
                <td class="t-bc">年龄</td>
                <td>{{detailData.patient && detailData.patient.age}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span><span @click.self="showContent">文件信息</span>
        </div>
        <div class="content mice-content" style="display: block">
          <table class="special-table">
            <tbody>
            <tr v-for="file in detailData.data_files">
              <td class="t-bc">文件名</td>
              <td>{{file.filename}}</td>
              <td class="t-bc">状态</td>
              <td>
                {{file.status | getStatus}}
                <i v-if="file.status == -1" class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                   :data-original-title="file.error">
                </i>
              </td>
              <td class="t-bc">上传日期</td>
              <td>{{file.created_at}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span><span @click.self="showContent">检测信息</span>
        </div>
        <div class="content mice-content left-right" style="display: block">
          <div class="left">
            <div class="title">已选表型</div>
            <ul>
              <li>1</li>
              <li>1</li>
              <li>1</li>
              <li>1</li>
            </ul>
          </div>
          <div class="right">
            <div class="title">已选项目</div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>


<script>
  import fuzzyQuery from './global/fuzzyQuery.vue'
  import cascadeQuery from './global/cascadeQuery.vue'
  import myDataH from './global/myDataHeader.vue'

  export default {
    components: {
      'fuzzyQuery': fuzzyQuery,
      'cascadeQuery': cascadeQuery,
      'myDataH': myDataH,
    },
    data: function () {
      return {
        id: this.$route.query.id,
        loading: '',
        detailData: "",
      }
    },
    mounted: function () {
      this.getDetail();
    },
    methods: {
      getDetail: function () {
        const _vue = this;
        this.myAxios({
          url: 'manage/sample/' + this.id
        }).then((resp) => {
          _vue.detailData = resp.data.data;
        }).catch((error) => {
          _vue.catchFun(error)
        })
      },

      /*修改panel--这里不是用的模块*/
      searchPanel: function () {
        const _vue = this;
        this.showPanel = true;
        _vue.loading = true;
        this.myAxios({
          url: 'product/panel/search/?query=' + _vue.inputPanel
        }).then(function (resp) {
          _vue.panelData = resp.data;
          _vue.loading = false
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      showPanelModal: function () {
        const _vue = this;
        _vue.loading = true;
        this.myAxios({
          url: 'sample/datafile/' + _vue.editModalData.id + '/'
        }).then(function (resp) {
          _vue.loading = false;
          _vue.hasPanel = resp.data.geneinfo ? resp.data.geneinfo.panels : [];
          _vue.hasGene = resp.data.geneinfo ? resp.data.geneinfo.genes.join(',') : ''
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      addPanel: function (list) {
        this.hasPanel.push(list)
      },
      removePanel: function (code) {
        const _vue = this;
        const arr = [];
        $.each(_vue.hasPanel, function (i, data) {
          if (data.code !== code) {
            arr.push(data)
          }
        });
        _vue.hasPanel = arr;
      },

      changeFile: function (e) {
        console.log($(e.target.files[0]))
      },

      socket: function () {
        const socket = new WebSocket('ws://localhost:8080');
//        socket.onopen = function(event) {
//
//          // 发送一个初始化消息
//          socket.send('I am the client');
//
//          // 监听消息
//          socket.onmessage = function(event) {
//            console.log('Client received a message',event);
//          };
//
//          // 监听Socket的关闭
//          socket.onclose = function(event) {
//            console.log('Client notified socket has closed',event);
//          };
//
//          // 关闭Socket....
//          //socket.close()
//        };

// Connection opened
        socket.addEventListener('open', function (event) {
          socket.send('Hello Server!');
        });

// Listen for messages
        socket.addEventListener('message', function (event) {
          console.log('Message from server', event.data);
        });

      },

      receiveFuzzy0: function (data) {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url: 'biomeddb/hpo/?query=' + data,
          type: 'get'
        }).then(function (resp) {
          _vue.loading = false;
          let results = resp.data.data;
          _vue.leftData = [];
          $.each(results, function (i, data) {
            data.vHtml = data.hpoid + ' ' + data.name.chinese + '(' + data.name.english + ')';
            _vue.leftData.push({
              key: data.hpoid,
              value: data.vHtml
            })
          })
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
    },
    watch: {
      '$route'(to, from) {

      }
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip()
    },
    filters: {
      getStatus: function (status) {
        switch (status) {
          case 0:
            return '等待';
            break;
          case 1:
            return '运行中';
            break;
          case 2:
            return '已完成';
            break;
          case -1:
            return '出错';
            break;
        }
      }
    }
  }
</script>


<style scoped lang="less">
  @border: rgb(185, 184, 184);
  @blue: #3498db;
  @blue-darken: #2980b9;
  @green: #1abc9c;
  @green-darken: #16a085;
  .el-input__inner {
    height: 24px;
    line-height: 24px;
  }

  /*添加样本弹框样式*/
  #data-content{
    #add-sample {
      padding-top: 0;
    }
  }


</style>
