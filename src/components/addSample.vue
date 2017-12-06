<template>
  <div class="data-content">
    <myDataH></myDataH>
    <div id="add-sample" class="right-content">
      <loading v-if="loading"></loading>
      <ul id="breadcrumb">
        <li><a href="javascript:void(0)"><span class="fa fa-home"> </span></a></li>
        <li @click="show(1)"><a :class="{'in':!hide1}" href="javascript:void(0)">1. 基本信息</a></li>
        <li @click="show(2)"><a :class="{'in':!hide2}" href="javascript:void(0)">2. 表型信息</a></li>
        <li @click="show(3)"><a :class="{'in':!hide3}" href="javascript:void(0)">3. 检测项目</a></li>
        <li @click="show(4)"><a :class="{'in':!hide4}" href="javascript:void(0)">4. 预览/提交数据</a></li>
      </ul>
      <div class="info-content">
        <el-form id="" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <div :class="{'hide':hide1}">

            <div class="row">
              <div class="col-xs-6">
                <el-form-item label="受检者姓名" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
              </div>
              <div class="col-xs-6">
                <el-form-item label="编号" prop="sn">
                  <el-input v-model="ruleForm.sn"></el-input>
                </el-form-item>
              </div>
              <div class="col-xs-6">
                <el-form-item label="性别" prop="gender">
                  <el-select v-model="gender" placeholder="请选择性别">
                    <el-option label="未知" value="未知"></el-option>
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="col-xs-6">
                <el-form-item label="名族">
                  <el-input v-model="ruleForm.national"></el-input>
                </el-form-item>
              </div>
              <div class="col-xs-6">
                <el-form-item label="籍贯" prop="nativePlace">
                  <el-input v-model="ruleForm.nativePlace"></el-input>
                </el-form-item>
              </div>
              <div class="col-xs-6">
                <el-form-item label="年龄">
                  <el-input v-model="ruleForm.age"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>

          <div :class="{'hide':hide2}" class="over-hide">

            <div class="col-xs-12">
              <fuzzyQuery placeholder='请输入表型' :leftData="leftData" :rightData="originalRightData" title="已选表型"
                          @sendInput="receiveFuzzy0"></fuzzyQuery>
            </div>
            <div class="col-xs-12 case-content">
              <span class="col-xs-1 bold">病历</span>
              <div class="col-xs-5">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 5}"
                  placeholder="请输入内容"
                  v-model="ruleForm.patientCase">
                </el-input>
              </div>
            </div>
          </div>

          <div :class="{'hide':hide3}" class="over-hide">
            <div class="col-xs-12 panel-content">
              <cascadeQuery :leftData="panelOptions" :rightData="panelRight"></cascadeQuery>
            </div>
          </div>

          <div :class="{'hide':hide4}" class="show-info">
            <div class="title bold">待提交信息：</div>
            <div class="row">
              <div class="col-xs-3" v-if="ruleForm.name">
                <div class="col-xs-5">姓名：</div>
                <div class="col-xs-7">{{ruleForm.name}}</div>
              </div>
              <div class="col-xs-3" v-if="ruleForm.sn">
                <div class="col-xs-5">编号：</div>
                <div class="col-xs-7">{{ruleForm.sn}}</div>
              </div>
              <div class="col-xs-3" v-if="gender">
                <div class="col-xs-5">性别：</div>
                <div class="col-xs-7">{{gender}}</div>
              </div>
              <div class="col-xs-3" v-if="ruleForm.national">
                <div class="col-xs-5">名族：</div>
                <div class="col-xs-7">{{ruleForm.national}}</div>
              </div>
              <div class="col-xs-3" v-if="ruleForm.nativePlace">
                <div class="col-xs-5">籍贯：</div>
                <div class="col-xs-7 warp">{{ruleForm.nativePlace}}</div>
              </div>
              <div class="col-xs-4" v-if="ruleForm.age">
                <div class="col-xs-5">年龄：</div>
                <div class="col-xs-7">{{ruleForm.age}}</div>
              </div>
              <!--  <div class="col-xs-4" v-if="addInfo.birth">
                  <div class="col-xs-5">出生日期：</div>
                  <div class="col-xs-7">{{addInfo.birth}}</div>
                </div>-->
              <!--<div class="col-xs-4" :class="{'hide':fileHide}">
                <div class="col-xs-5">文件名：</div>
                <div class="col-xs-7" id="fileName-show"></div>
              </div>-->
            </div>

            <div class="more row">
              <div class="col-xs-6" v-if="originalRightData.length!=0">
                <div class="col-xs-3">已选表型</div>
                <div class="col-xs-9">
                  <span v-for="list in originalRightData" class="show-phenotype po" :title="list.value">{{list.value}}</span>
                </div>
              </div>
              <div class="col-xs-6" v-if="panelRight.length!=0">
                <div class="col-xs-3">已选项目</div>
                <div class="col-xs-9">
                  <span v-for="list in panelRight" class="show-phenotype po" :title="list.vueShow">{{list.vueShow}}</span>
                </div>
              </div>
              <div class="col-xs-12 top5" v-if="ruleForm.patientCase">
                <div class="col-xs-1">病历</div>
                <div class="col-xs-11 break-word">{{ruleForm.patientCase}}</div>
              </div>
            </div>

            <div class="save-content">
              <span @click="saveAdd" class="my-btn"><img src="../../static/img/red-save.png" alt="">保存</span>
            </div>


          </div>
        </el-form>
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
        loading:'',
        detailData: "",
        /*添加样本*/
        hide1: false,
        hide2: true,
        hide3: true,
        hide4: true,
        gender: '未知',
        editGender: '未知',
        editId: 0,
        ruleForm: {
          name: '',
          sn: '',
          national: '',
          nativePlace: '',
          age: '',
          patientCase: '',
        },
        editForm: {
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
        leftData: [],
        originalRightData: [],
        panelRight: [],
        panelOptions: [],
        fileHide: true,
        radioEdit: '1',


        /*搜索panel*/
        panelData: [],
        inputPanel: '',
        hasPanel: [],
        hasGene: '',
        showPanel: false,

      }
    },
    mounted: function () {
      this.getPanelO();
    },
    methods: {
      /*添加样本*/
      addSample: function () {
        this.hide1 = false;
        this.hide2 = true;
        this.hide3 = true;
        this.hide4 = true;

        this.ruleForm = {
          name: '',
          sn: '',
          gender: '',
          national: '',
          nativePlace: '',
          birth: '',
          patientCase: '',
        };

        $("#addModal").modal("show")
      },
      saveAdd: function () {
        const _vue = this;

        this.myAxios({
          url: 'manage/sample',
          method: 'post',
          data: {
            name: this.ruleForm.name,
            sn: this.ruleForm.sn,
            gender: this.gender,
            medical_record: this.ruleForm.patientCase,
            nation: this.ruleForm.national, /*名族*/
            native_place: this.ruleForm.nativePlace, /*籍贯*/
            age: this.ruleForm.age, /**/
//            sn: this.addInfo.birth, /*表型 检测项目*/
          }
        }).then(function () {
          _vue.success('添加成功');
          $("#addModal").modal("hide");
          _vue.getList();
          _vue.socket();
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },

      getPanelO:function () {
        const _vue = this;
        this.myAxios({
          url:'biomeddb/panel'
        }).then(function (resp) {
          _vue.panelOptions = resp.data.data;
        })
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

      show: function (type) {
        this.hide1 = true;
        this.hide2 = true;
        this.hide3 = true;
        this.hide4 = true;
        if (type == 1) {
          this.hide1 = false;
        } else if (type == 2) {
          this.hide2 = false;
        } else if (type == 3) {
          this.hide3 = false;
        } else if (type == 4) {
//          const value = $.trim($("#file-name").val());
//          if (value) {
//            this.fileHide = false;
//            $("#fileName-show").html(value)
//          }
          this.hide4 = false;
        }
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

  /*添加样本弹框样式*/
  #add-sample {
    .info-content {
      margin-top: 10px;
      padding: 40px 0;
      background-color: #fff;
      .star {
        color: red;
        font-weight: 700;
        font-size: 12px;
        margin-right: 5px;
      }
      .case-content {
        .title {
          float: left;
          width: 9%;
          margin-top: 10px;
        }
      }
      .show-phenotype {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        float: left;
      }
      .save-content {
        width: 100%;
        text-align: center;
        margin-top: 20px;
      }
      .show-info {
        .title {
          margin-bottom: 15px;
        }
      }
    }
    #breadcrumb {
      list-style: none;
      display: inline-block;
      padding: 0;
      margin: 15px 0 0;
      .icon {
        font-size: 14px;
      }

      li {
        float: left;
        a {
          color: #FFF;
          display: block;
          background: @blue;
          text-decoration: none;
          position: relative;
          height: 40px;
          line-height: 40px;
          padding: 0 10px 0 5px;
          text-align: center;
          margin-right: 23px;
        }
        /*&:nth-child(even){
          a{
            background-color: @blue-darken;

            &:before{
              border-color:@blue-darken;
              border-left-color:transparent;
            }
            &:after{
              border-left-color:@blue-darken;
            }
          }
        }*/
        &:first-child {
          a {
            padding-left: 15px;
          @include border-radius(4 px 0 0 4 px);
            &:before {
              border: none;
            }
          }
        }
        &:last-child {
          a {
            padding-right: 15px;
          @include border-radius(0 4 px 4 px 0);
            &:after {
              border: none;
            }
          }
        }

        a.in {
          background-color: @green;

          &:before {
            border-color: @green;
            border-left-color: transparent;
          }
          &:after {
            border-left-color: @green;
          }

        }
        a {
          &:before,
          &:after {
            content: "";
            position: absolute;
            top: 0;
            border: 0 solid @blue;
            border-width: 20px 10px;
            width: 0;
            height: 0;
          }
          &:before {
            left: -20px;
            border-left-color: transparent;
          }
          &:after {
            left: 100%;
            border-color: transparent;
            border-left-color: @blue;
          }
          &:hover {
            background-color: @green;

            &:before {
              border-color: @green;
              border-left-color: transparent;
            }
            &:after {
              border-left-color: @green;
            }
          }
          &:active {
            background-color: @green-darken;

            &:before {
              border-color: @green-darken;
              border-left-color: transparent;
            }
            &:after {
              border-left-color: @green-darken;
            }
          }
        }
      }
    }
  }


</style>
