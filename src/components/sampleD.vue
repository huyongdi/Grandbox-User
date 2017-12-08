<template>
  <div class="data-content" id="data-content">
    <myDataH></myDataH>
    <div id="sample-detail" class="right-content drop-down">
      <span class="my-btn up-file" @click="upFile"><img src="../../static/img/red-submit.png" alt="">上传文件</span>

      <span class="my-btn edit" @click="toEdit"><img src="../../static/img/red-submit.png" alt="">编辑样本</span>
      <span class="my-btn edit" v-if="inEdit" @click="toEdit"><img src="../../static/img/red-submit.png" alt="">保存编辑</span>
      <span class="my-btn edit" v-if="inEdit" @click="cancelEdit"><img src="../../static/img/red-submit.png" alt="">取消编辑</span>


      <loading v-if="loading"></loading>

      <el-form id="" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm drop-down">

        <div class="content-one">
          <div class="header">
            <span class="fa fa-chevron-down" @click.self="showContent"></span><span @click.self="showContent">基本信息</span>
          </div>
          <div class="content mice-content" style="display: block">
            <table class="special-table">
              <tbody>
              <tr>
                <td class="t-bc">姓名</td>
                <td>
                  <el-input v-if="inEdit" v-model="ruleForm.name"></el-input>
                  <span v-else="">{{detailData.patient && detailData.patient.name}}</span>
                </td>
                <td class="t-bc">编号</td>
                <td>
                  <el-input v-if="inEdit" v-model="ruleForm.sn"></el-input>
                  <span v-else="">{{detailData.sn}}</span>
                </td>
              </tr>
              <tr>
                <td class="t-bc">性别</td>
                <td>
                  <el-select v-if="inEdit" v-model="gender" placeholder="请选择性别">
                    <el-option label="未知" value="未知"></el-option>
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                  <span v-else="">{{detailData.patient && detailData.patient.gender}}</span>
                </td>
                <td class="t-bc">民族</td>
                <td>
                  <el-input v-if="inEdit" v-model="ruleForm.national"></el-input>
                  <span v-else="">{{detailData.patient && detailData.patient.nation}}</span>
                </td>
              </tr>
              <tr>
                <td class="t-bc">籍贯</td>
                <td>
                  <el-input v-if="inEdit" v-model="ruleForm.nativePlace"></el-input>
                  <span v-else="">{{detailData.patient && detailData.patient.native_place}}</span>
                </td>
                <td class="t-bc">年龄</td>
                <td>
                  <el-input v-if="inEdit" v-model="ruleForm.age"></el-input>
                  <span v-else="">{{detailData.patient && detailData.patient.age}}</span>
                </td>
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
                <td><a href="javascript:void (0)" @click="downloadFile(detailData._id,file._id)">{{file.filename}}</a></td>
                <td class="t-bc">状态</td>
                <td>
                  {{file.status | getStatus}}
                  <i v-if="file.status == -1" class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                     :data-original-title="file.error">
                  </i>
                  <a v-if="file.status == -1" href="javascript:void(0)" @click="fileRetry">重新运行</a>
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
            <div class="inPa-ph row" v-if="inEdit">
              <div class="col-xs-6">
                <choosePh @getHpo="getHpo" :rightData="phRightData"></choosePh>
              </div>
              <div class="col-xs-6">
                <choosePa :hasHpo="hasHpo" :flag='getPFlag' @getGenes="getGenes" :rightData="paRightData"></choosePa>
              </div>
            </div>
            <div class="left" v-if="!inEdit">
              <div class="title">已选表型</div>
              <ul>
                <li v-for="list in detailData.hpos">{{list.hpoid}}：{{list.name && list.name.chinese}}({{list.name && list.name.english}})</li>
              </ul>
            </div>
            <div class="right" v-if="!inEdit">
              <div class="title">已选项目</div>
              <ul>
                <li v-for="list in detailData.panels">{{list.name}}({{list.code}})</li>
              </ul>
            </div>
          </div>
        </div>
      </el-form>

    </div>


    <!--上传文件-->
    <div class="modal fade" tabindex="-1" role="dialog" id="fileModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">上传excel文件</h4>
          </div>
          <div class="modal-body">

            <div class="modal-btn">
              <span class="my-btn" @click="saveFile"><img src="../../static/img/red-save.png" alt="">保存</span>
              <span class="my-btn close-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>
            </div>
            <form action="" id="addDataFormCap">
              <div class="one">
                <div class="one-content">
                  <div class="row">

                    <div class="col-sm-6">
                      <span class="name">选择类型：</span>
                      <template>
                        <el-radio v-model="radioEdit" label="1">追加</el-radio>
                        <el-radio v-model="radioEdit" label="2">覆盖</el-radio>
                      </template>
                    </div>

                    <div class="col-sm-6">
                      <span class="name">选择文件：</span>
                      <div class="upload-content content" id="upload-edit">
                        <input type="text" class="show-name" id="file-name-edit" @click.stop="">
                        <span class="text">选择</span>
                        <input type='file' name="data_file" class="hide-input" id="hide-edit">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

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
  import choosePh from './global/choosePh.vue'
  import choosePa from './global/choosePa.vue'

  export default {
    components: {
      'fuzzyQuery': fuzzyQuery,
      'cascadeQuery': cascadeQuery,
      'myDataH': myDataH,
      'choosePa': choosePa,
      'choosePh': choosePh,
    },
    data: function () {
      return {
        id: this.$route.query.id,
        loading: '',
        detailData: "",
        radioEdit: '1',
        inEdit: '',
        gender: '',
        ruleForm: {
          name: '',
          sn: '',
          national: '',
          nativePlace: '',
          age: '',
          patientCase: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
          ],
          sn: [
            {required: true, message: '请输入编号', trigger: 'blur'},
          ],
          nativePlace: [
            {min: 0, max: 32, message: '籍贯长度在32个字符内', trigger: 'blur'}
          ]
        },

        phRightData: [],
        paRightData: [],
        hasHpo: [],
        genes: [],
        getPFlag: '',
      }
    },
    mounted: function () {
      this.getDetail();

      this.getAllPanel(); //获取编辑里面 检测项目的所有列表
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

      //编辑文件
      toEdit: function () {
        this.inEdit = true;
        this.resetForm();
      },
      cancelEdit: function () {
        this.inEdit = false;
        this.resetForm();
      },
      resetForm: function () {
        const _vue = this;
        this.ruleForm = {
          name: this.detailData.patient.name,
          sn: this.detailData.sn,
          national: this.detailData.patient.nation,
          nativePlace: this.detailData.patient.native_place,
          age: this.detailData.patient.age,
        };
        this.gender = this.detailData.patient.gender;

        _vue.phRightData = [];
        _vue.paRightData = [];
        $.each(this.detailData.hpos, function (i, data) {
          data.vHtml = data.hpoid + ' ' + data.name.chinese + '(' + data.name.english + ')';
          _vue.phRightData.push({
            key: data.hpoid,
            value: data.vHtml,
            _id:data._id
          })
        });

        _vue.paRightData = this.detailData.panels

      },

      getAllPanel:function () {
        const _vue = this;
        this.myAxios({
          url: 'biomeddb/panel/',
        }).then((resp)=>{
//          _vue.paRightData = resp.data.data
        }).catch((error)=>{
          _vue.catchFun(error)
        })
      },

      getHpo: function (data) {
        this.hasHpo = data
      },
      getGenes: function (data) {
        this.genes = data
      },
      //重跑任务
      fileRetry: function () {
        const _vue = this;
        this.myAxios({
          url: 'manage/sample/' + this.id + '/retry'
        }).then((resp) => {
          _vue.success('任务正在重新运行')
        }).catch((error) => {
          _vue.catchFun(error)
        })
      },
      //上传文件
      upFile: function () {
        $("#fileModal").modal("show")
      },
      saveFile: function () {
        const _vue = this;
        const fileNameArr = $("#hide-edit").val().split('.');
        const fileName = fileNameArr[fileNameArr.length - 1];
        if (fileName == 'xls' || fileName == 'xlsx' || fileName == 'vcf') {
          this.loading = true;
          let postData = new FormData(document.getElementById('addDataFormCap'));
//          postData.append("type", JSON.stringify({'a': 123, 'b': 456}));
          postData.append("append", this.radioEdit == 1 ? 1 : 0);
          this.myAxios({
            url: 'manage/sample/' + this.detailData._id + '/data_file',
            method: 'post',
            data: postData
          }).then(function () {
            _vue.success('上传成功');
            $('#fileModal').modal('hide');
            _vue.loading = false;
            _vue.getDetail()
          }).catch(function (error) {
            _vue.catchFun(error)
          })
        } else {
          this.alert('文件请上传excel格式')
        }
      },
      //下载文件
      downloadFile: function (lId, fId) {
        const _vue = this;
        this.loading = true;
        const postUrl = 'manage/sample/' + lId + '/data_file/' + fId;
        _vue.myAxios({
          url: postUrl,
          method: 'post'
        }).then(function (resp) {
          _vue.loading = false;
          window.location.href = _vue.apiUrl + postUrl + '?signature=' + resp.data.signature;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
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

  #sample-detail {
    .up-file {
      margin-right: 10px;
    }
    .edit {
      margin: 0 10px;
    }
  }

  #fileModal {
    .modal-body {
      padding-bottom: 50px;
      input, select {
        display: inline-block;
        height: 25px;
        line-height: 25px;
      }
      .one {
        .title {
          margin-bottom: 5px;
        }
        .one-content {
          .row {
            margin-top: 5px;
            .hide-input {
              display: none;
            }
            .text {
              height: 25px;
              line-height: 25px;
            }
            .name {
              display: inline-block;
              width: 28%;
            }
            .content {
              width: 60%;
              font-size: 12px;
              position: relative;
              img {
                position: absolute;
                top: 0;
                right: 0;
                height: 24px;
                margin-left: -1px;
                cursor: pointer;
              }
              .hide-ul {
                padding: 0;
                position: absolute;
                left: 0;
                width: 100%;
                background-color: #fff;
                z-index: 10;
                max-height: 100px;
                overflow-y: auto;
                border-right: 1px solid rgb(209, 209, 209);
                border-left: 1px solid rgb(209, 209, 209);
                border-bottom: 1px solid rgb(209, 209, 209);
                li {
                  height: 26px;
                  line-height: 26px;
                  font-size: 12px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  padding-left: 10px;
                  cursor: pointer;
                  &:hover {
                    background-color: rgb(220, 238, 249);
                  }
                }
              }
            }
          }
        }
      }

    }
  }


</style>
