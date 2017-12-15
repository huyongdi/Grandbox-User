<template>
  <div class="data-content">
    <myDataH></myDataH>
    <div id="my-data" class="right-content">
      <loading v-if="loading"></loading>
      <div class="top-content">
        <span class="my-btn refresh" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
        <!--<span class="my-btn" @click="addSample"><img src="../../static/img/red-submit.png" alt="">添加样本</span>-->
        <div class="search-div pull-right">
          <input placeholder="请输入关键字" class="search-input" v-model="inputValue" @keyup.enter="search">
          <span class="my-btn" @click="search">
            <img src="../../static/img/red-con.png" alt="">
          </span>
        </div>
      </div>
      <table id="sg-table" class="bc-fff my-table">
        <thead>
        <tr>
          <th style="width: 40px"></th>
          <th>样本编号</th>
          <th>受检者</th>

          <th>年龄</th>
          <th>名族</th>
          <th>籍贯</th>
          <th>病历</th>

          <!--<th>下载文件</th>-->

          <th>变异信息</th>
          <th>选项</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="results.length == 0 && doneHttp">
          <td colspan="10" class="center">暂无数据</td>
        </tr>
        <tr v-for="(list,index) in results" :class="{'tr-bc':index%2}">
          <td><i class="fa fa-folder-open" title="查看样本详情" @click="showDetail(list)"></i></td>
          <td>{{list.sn}}</td>
          <td><span v-if="list.patient">{{list.patient.name}} ({{list.patient.gender}})</span></td>
          <td><span v-if="list.patient">{{list.patient.age ? list.patient.age : '-'}}</span></td>
          <td><span v-if="list.patient">{{list.patient.national ? list.patient.national : '-'}}</span></td>
          <td><span v-if="list.patient">{{list.patient.nativePlace ? list.patient.nativePlace : '-'}}</span></td>
          <td><span v-if="list.patient">{{list.patient.medical_record ? list.patient.medical_record : '-'}}</span></td>

          <!--<td class="file-td">-->
          <!--<span v-if="list.data_files.length!=0">-->
            <!--&lt;!&ndash;<a v-for="file in list.data_files" href="javascript:void (0)"  @click="downloadFile(list._id,file._id)">{{file.filename}}</a>&lt;!&ndash;:href="apiUrl+''+file.downloadUrl"&ndash;&gt;&ndash;&gt;-->
            <!--<span>{{file.filename}}</span>-->
          <!--</span>-->
          <!--</td>-->
          <td>
            <!--<div v-if="list.data_files">-->
            <!--<div v-for="data in list.data_files">-->
            <!--<i v-if='data.status == 0' class="fa fa-hourglass-1 text-success">等待</i>-->
            <!--<span v-if="data.status == 1"> &lt;!&ndash;避免字跟着一起转&ndash;&gt;-->
            <!--<i class="fa fa-spinner fa-pulse text-success"></i>运行中-->
            <!--</span>-->
            <!--<router-link :to="{path:'/result',query:{id:list._id}}" title="查看结果">-->
            <!--<i v-if='data.status == 2' class="fa fa-check text-success po">已完成</i>-->
            <!--</router-link>-->
            <!--<i v-if='data.status == -1' class="fa fa-bug text-danger">出错</i>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div v-else="">待分析</div>-->
            <router-link :to="{path:'/result',query:{id:list._id}}" title="" target="_blank">
              查看结果
            </router-link>
          </td>
          <td>
            <!--<img class="edit" src="../../static/img/edit.png" @click="listEdit(list._id)" title="编辑">-->
            <!--<span class="fa fa-file-excel-o fa-lg" title="上传文件" @click="showUpModal(list._id)"></span>-->
            <i @click="deleteSample(list._id)" class="fa fa-trash fa-lg delete" title="删除"></i>
          </td>
        </tr>
        </tbody>
      </table>
      <page :childCount="count" :childReset="0" @childCurrent="getCurrent"></page>

      <!--&lt;!&ndash;添加样本&ndash;&gt;-->
      <!--<div class="modal fade" tabindex="-1" role="dialog" id="addModal">-->
        <!--<div class="modal-dialog modal-lg" role="document">-->
          <!--<div class="modal-content">-->
            <!--<div class="modal-header">-->
              <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>-->
              <!--</button>-->
              <!--<h4 class="modal-title">添加样本数据</h4>-->
            <!--</div>-->
            <!--<div class="modal-body">-->
              <!--<ul id="breadcrumb">-->
                <!--<li><a href="javascript:void(0)"><span class="fa fa-home"> </span></a></li>-->
                <!--<li @click="show(1)"><a :class="{'in':!hide1}" href="javascript:void(0)">1. 基本信息</a></li>-->
                <!--<li @click="show(2)"><a :class="{'in':!hide2}" href="javascript:void(0)">2. 表型信息</a></li>-->
                <!--<li @click="show(3)"><a :class="{'in':!hide3}" href="javascript:void(0)">3. 检测项目</a></li>-->
                <!--<li @click="show(4)"><a :class="{'in':!hide4}" href="javascript:void(0)">4. 预览/提交数据</a></li>-->
              <!--</ul>-->

              <!--<div class="info-content">-->
                <!--<el-form id="" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
                  <!--<div :class="{'hide':hide1}">-->

                    <!--<div class="row">-->
                      <!--<div class="col-xs-6">-->
                        <!--<el-form-item label="受检者姓名" prop="name">-->
                          <!--<el-input v-model="ruleForm.name"></el-input>-->
                        <!--</el-form-item>-->
                      <!--</div>-->
                      <!--<div class="col-xs-6">-->
                        <!--<el-form-item label="编号" prop="sn">-->
                          <!--<el-input v-model="ruleForm.sn"></el-input>-->
                        <!--</el-form-item>-->
                      <!--</div>-->
                      <!--<div class="col-xs-6">-->
                        <!--<el-form-item label="性别" prop="gender">-->
                          <!--<el-select v-model="gender" placeholder="请选择性别">-->
                            <!--<el-option label="未知" value="未知"></el-option>-->
                            <!--<el-option label="男" value="男"></el-option>-->
                            <!--<el-option label="女" value="女"></el-option>-->
                          <!--</el-select>-->
                        <!--</el-form-item>-->
                      <!--</div>-->
                      <!--<div class="col-xs-6">-->
                        <!--<el-form-item label="名族">-->
                          <!--<el-input v-model="ruleForm.national"></el-input>-->
                        <!--</el-form-item>-->
                      <!--</div>-->
                      <!--<div class="col-xs-6">-->
                        <!--<el-form-item label="籍贯" prop="nativePlace">-->
                          <!--<el-input v-model="ruleForm.nativePlace"></el-input>-->
                        <!--</el-form-item>-->
                      <!--</div>-->
                      <!--<div class="col-xs-6">-->
                        <!--<el-form-item label="年龄">-->
                          <!--<el-input v-model="ruleForm.age"></el-input>-->
                        <!--</el-form-item>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->

                  <!--<div :class="{'hide':hide2}" class="over-hide">-->

                    <!--<div class="col-xs-12">-->
                      <!--<fuzzyQuery placeholder='请输入表型' :leftData="leftData" :rightData="originalRightData" title="已选表型"-->
                                  <!--@sendInput="receiveFuzzy0"></fuzzyQuery>-->
                    <!--</div>-->
                    <!--<div class="col-xs-12 case-content">-->
                      <!--<span class="title bold">病历</span>-->
                      <!--<div class="col-xs-6">-->
                        <!--<el-input-->
                          <!--type="textarea"-->
                          <!--:autosize="{ minRows: 5, maxRows: 5}"-->
                          <!--placeholder="请输入内容"-->
                          <!--v-model="ruleForm.patientCase">-->
                        <!--</el-input>-->
                      <!--</div>-->

                    <!--</div>-->

                  <!--</div>-->

                  <!--<div :class="{'hide':hide3}" class="over-hide">-->
                    <!--<div class="col-xs-12 panel-content">-->
                      <!--<cascadeQuery :leftData="panelOptions" :rightData="panelRight"></cascadeQuery>-->
                    <!--</div>-->
                  <!--</div>-->

                  <!--<div :class="{'hide':hide4}" class="show-info">-->
                    <!--<div class="title bold">待提交信息：</div>-->
                    <!--<div class="row">-->
                      <!--<div class="col-xs-3" v-if="ruleForm.name">-->
                        <!--<div class="col-xs-5">姓名：</div>-->
                        <!--<div class="col-xs-7">{{ruleForm.name}}</div>-->
                      <!--</div>-->
                      <!--<div class="col-xs-3" v-if="ruleForm.sn">-->
                        <!--<div class="col-xs-5">编号：</div>-->
                        <!--<div class="col-xs-7">{{ruleForm.sn}}</div>-->
                      <!--</div>-->
                      <!--<div class="col-xs-3" v-if="gender">-->
                        <!--<div class="col-xs-5">性别：</div>-->
                        <!--<div class="col-xs-7">{{gender}}</div>-->
                      <!--</div>-->
                      <!--<div class="col-xs-3" v-if="ruleForm.national">-->
                        <!--<div class="col-xs-5">名族：</div>-->
                        <!--<div class="col-xs-7">{{ruleForm.national}}</div>-->
                      <!--</div>-->
                      <!--<div class="col-xs-3" v-if="ruleForm.nativePlace">-->
                        <!--<div class="col-xs-5">籍贯：</div>-->
                        <!--<div class="col-xs-7 warp">{{ruleForm.nativePlace}}</div>-->
                      <!--</div>-->
                      <!--<div class="col-xs-4" v-if="ruleForm.age">-->
                        <!--<div class="col-xs-5">年龄：</div>-->
                        <!--<div class="col-xs-7">{{ruleForm.age}}</div>-->
                      <!--</div>-->
                      <!--&lt;!&ndash;  <div class="col-xs-4" v-if="addInfo.birth">-->
                          <!--<div class="col-xs-5">出生日期：</div>-->
                          <!--<div class="col-xs-7">{{addInfo.birth}}</div>-->
                        <!--</div>&ndash;&gt;-->
                      <!--&lt;!&ndash;<div class="col-xs-4" :class="{'hide':fileHide}">-->
                        <!--<div class="col-xs-5">文件名：</div>-->
                        <!--<div class="col-xs-7" id="fileName-show"></div>-->
                      <!--</div>&ndash;&gt;-->
                    <!--</div>-->

                    <!--<div class="more row">-->
                      <!--<div class="col-xs-6" v-if="originalRightData.length!=0">-->
                        <!--<div class="col-xs-3">已选表型</div>-->
                        <!--<div class="col-xs-9">-->
                          <!--<span v-for="list in originalRightData" class="show-phenotype po" :title="list.value">{{list.value}}</span>-->
                        <!--</div>-->
                      <!--</div>-->
                      <!--<div class="col-xs-6" v-if="panelRight.length!=0">-->
                        <!--<div class="col-xs-3">已选项目</div>-->
                        <!--<div class="col-xs-9">-->
                          <!--<span v-for="list in panelRight" class="show-phenotype po" :title="list.vueShow">{{list.vueShow}}</span>-->
                        <!--</div>-->
                      <!--</div>-->
                      <!--<div class="col-xs-12 top5" v-if="ruleForm.patientCase">-->
                        <!--<div class="col-xs-1">病历</div>-->
                        <!--<div class="col-xs-11 break-word">{{ruleForm.patientCase}}</div>-->
                      <!--</div>-->
                    <!--</div>-->

                    <!--<div class="save-content">-->
                      <!--<span @click="saveAdd" class="my-btn"><img src="../../static/img/red-save.png" alt="">保存</span>-->
                    <!--</div>-->


                  <!--</div>-->
                <!--</el-form>-->
              <!--</div>-->

            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--&lt;!&ndash;点击单列的编辑&ndash;&gt;-->
      <!--<div class="modal fade" tabindex="-1" role="dialog" id="editModal">-->
        <!--<div class="modal-dialog modal-lg" role="document">-->
          <!--<div class="modal-content">-->
            <!--<div class="modal-header">-->
              <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>-->
              <!--</button>-->
              <!--<h4 class="modal-title">修改样本数据</h4>-->
            <!--</div>-->
            <!--<div class="modal-body">-->

              <!--<div class="modal-btn">-->
                <!--<span class="my-btn" @click="saveEdit"><img src="../../static/img/red-save.png" alt="">保存</span>-->
                <!--<span class="my-btn close-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>-->
              <!--</div>-->


              <!--<el-form id="editDataFormCap" :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">-->
                <!--<div class="row">-->
                  <!--<div class="col-xs-6">-->
                    <!--<el-form-item label="受检者姓名" prop="name">-->
                      <!--<el-input v-model="editForm.name"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</div>-->
                  <!--<div class="col-xs-6">-->
                    <!--<el-form-item label="编号" prop="sn">-->
                      <!--<el-input v-model="editForm.sn"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</div>-->
                  <!--<div class="col-xs-6">-->
                    <!--<el-form-item label="性别" prop="gender">-->
                      <!--<el-select v-model="editGender" placeholder="请选择性别">-->
                        <!--<el-option label="未知" value="未知"></el-option>-->
                        <!--<el-option label="男" value="男"></el-option>-->
                        <!--<el-option label="女" value="女"></el-option>-->
                      <!--</el-select>-->
                    <!--</el-form-item>-->
                  <!--</div>-->
                  <!--<div class="col-xs-6">-->
                    <!--<el-form-item label="名族">-->
                      <!--<el-input v-model="editForm.national"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</div>-->
                  <!--<div class="col-xs-6">-->
                    <!--<el-form-item label="籍贯" prop="nativePlace">-->
                      <!--<el-input v-model="editForm.nativePlace"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</div>-->
                  <!--<div class="col-xs-6">-->
                    <!--<el-form-item label="年龄">-->
                      <!--<el-input v-model="editForm.age"></el-input>-->
                    <!--</el-form-item>-->
                  <!--</div>-->
                  <!--<div class="col-xs-12">-->
                    <!--<fuzzyQuery placeholder='请输入表型' :leftData="leftData" :rightData="originalRightData" title="已选表型"-->
                                <!--@sendInput="receiveFuzzy0"></fuzzyQuery>-->
                  <!--</div>-->
                  <!--<div class="col-xs-12 panel-content">-->
                    <!--<cascadeQuery :leftData="panelOptions" :rightData="panelRight"></cascadeQuery>-->
                  <!--</div>-->
                  <!--<div class="col-xs-10 case-content-edit">-->
                    <!--<span class="title bold">病历</span>-->
                    <!--<div class="">-->
                      <!--<el-input-->
                        <!--type="textarea"-->
                        <!--:autosize="{ minRows: 5, maxRows: 5}"-->
                        <!--placeholder="请输入内容"-->
                        <!--v-model="editForm.patientCase">-->
                      <!--</el-input>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</el-form>-->

            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--&lt;!&ndash;上传文件&ndash;&gt;-->
      <!--<div class="modal fade" tabindex="-1" role="dialog" id="fileModal">-->
        <!--<div class="modal-dialog modal-lg" role="document">-->
          <!--<div class="modal-content">-->
            <!--<div class="modal-header">-->
              <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>-->
              <!--</button>-->
              <!--<h4 class="modal-title">上传excel文件</h4>-->
            <!--</div>-->
            <!--<div class="modal-body">-->

              <!--<div class="modal-btn">-->
                <!--<span class="my-btn" @click="saveFile"><img src="../../static/img/red-save.png" alt="">保存</span>-->
                <!--<span class="my-btn close-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>-->
              <!--</div>-->
              <!--<form action="" id="addDataFormCap">-->
                <!--<div class="one">-->
                  <!--<div class="one-content">-->
                    <!--<div class="row">-->

                      <!--<div class="col-sm-6">-->
                        <!--<span class="name">选择类型：</span>-->
                        <!--<template>-->
                          <!--<el-radio v-model="radioEdit" label="1">追加</el-radio>-->
                          <!--<el-radio v-model="radioEdit" label="2">覆盖</el-radio>-->
                        <!--</template>-->
                      <!--</div>-->

                      <!--<div class="col-sm-6">-->
                        <!--<span class="name">选择文件：</span>-->
                        <!--<div class="upload-content content" id="upload-edit">-->
                          <!--<input type="text" class="show-name" id="file-name-edit" @click.stop="">-->
                          <!--<span class="text">选择</span>-->
                          <!--<input type='file' name="data_file" class="hide-input" id="hide-edit" @change="changeFile">-->
                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</form>-->

            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--&lt;!&ndash;查看详情&ndash;&gt;-->
      <!--<div class="modal fade" tabindex="-1" role="dialog" id="detailModal">-->
        <!--<div class="modal-dialog modal-lg" role="document">-->
          <!--<div class="modal-content">-->
            <!--<div class="modal-header">-->
              <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>-->
              <!--</button>-->
              <!--<h4 class="modal-title">样本详情</h4>-->
            <!--</div>-->
            <!--<div class="modal-body detail-modal">-->

              <!--<div class="one">-->
                <!--<span class="title">基本信息</span>-->
                <!--<div class="row">-->
                  <!--<div class="col-xs-3">姓名：<span v-if="detailData.patient">{{detailData.patient.name}}</span></div>-->
                  <!--<div class="col-xs-3">编号：<span v-if="detailData">{{detailData.sn}}</span></div>-->
                  <!--<div class="col-xs-3">性别：<span v-if="detailData.patient">{{detailData.patient.gender}}</span></div>-->
                  <!--<div class="col-xs-3">名族：<span v-if="detailData.patient">{{detailData.patient.national ? detailData.patient.national : '-'}}</span>-->
                  <!--</div>-->
                  <!--<div class="col-xs-3">籍贯：<span v-if="detailData.patient">{{detailData.patient.nativePlace ? detailData.patient.nativePlace :-->
                    <!--'-'}}</span></div>-->
                  <!--<div class="col-xs-3">年龄：<span v-if="detailData.patient">{{detailData.patient.age ? detailData.patient.age : '-'}}</span></div>-->
                <!--</div>-->
              <!--</div>-->

              <!--<div class="one">-->
                <!--<span class="title">文件信息</span>-->
                <!--<div class="row">-->
                  <!--<div class="col-xs-12" v-for="file in detailData.data_files">-->
                    <!--<div class="col-xs-5">文件名：{{file.filename}}</div>-->
                    <!--<div class="col-xs-4">上传日期：{{file.created_at}}</div>-->
                    <!--<div class="col-xs-3">状态：{{file.status | getStatus}}</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->

              <!--<div class="one">-->
                <!--<span class="title">检测信息</span>-->
                <!--<div class="row info-content">-->
                  <!--<div class="col-xs-6">-->
                    <!--<span class="col-xs-3">已选表型</span>-->
                    <!--<ul class="col-xs-9">-->
                      <!--<li class="nowrap ellipsis po" title="我是已选表型1111111111111111111111111111111111111111111111111">-->
                        <!--我是已选表型1111111111111111111111111111111111111111111111111-->
                      <!--</li>-->
                      <!--<li class="nowrap ellipsis po" title="我是已选表型1111111111111111111111111111111111111111111111111">-->
                        <!--我是已选表型1111111111111111111111111111111111111111111111111-->
                      <!--</li>-->
                      <!--<li class="nowrap ellipsis po" title="我是已选表型1111111111111111111111111111111111111111111111111">-->
                        <!--我是已选表型1111111111111111111111111111111111111111111111111-->
                      <!--</li>-->
                    <!--</ul>-->
                  <!--</div>-->
                  <!--<div class="col-xs-6">-->
                    <!--<span class="col-xs-3">已选项目</span>-->
                    <!--<ul class="col-xs-9">-->
                      <!--<li class="nowrap ellipsis po" title="我是已选项目1111111111111111111111111111111111111111111111111">-->
                        <!--我是已选表型1111111111111111111111111111111111111111111111111-->
                      <!--</li>-->
                    <!--</ul>-->
                  <!--</div>-->
                  <!--<div class="col-xs-6">-->
                    <!--<span class="col-xs-3">病历</span>-->
                    <!--<div class="col-xs-9">-->
                      <!--11111111111111111111111111-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->


            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

    </div>
  </div>

</template>


<script>
  import page from './global/Page.vue'
  import fuzzyQuery from './global/fuzzyQuery.vue'
  import cascadeQuery from './global/cascadeQuery.vue'
  import myDataH from './global/myDataHeader.vue'

  export default {
    components: {
      'page': page,
      'fuzzyQuery': fuzzyQuery,
      'cascadeQuery': cascadeQuery,
      'myDataH': myDataH,
    },
    data: function () {
      return {
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

        capArr: [],
        doneHttp: '',
        geneInput: '',
        originalPanelData: [],
        results: [],
        inputValue: this.$route.query.sa ? this.$route.query.sa : '',
        editModalData: {},
        loading: false,
        count: 0,
        pageNum: 1,
        captureCode: this.$route.query.code ? this.$route.query.code : '',


        /*搜索panel*/
        panelData: [],
        inputPanel: '',
        hasPanel: [],
        hasGene: '',
        showPanel: false,

//        genderOptions: [{
//          value: '男',
//          label: '男'
//        }, {
//          value: '女',
//          label: '女'
//        }, {
//          value: '未知',
//          label: '未知'
//        }],
      }
    },
    mounted: function () {
      const _vue = this;
      this.getList();
//      this.getCap();
//      const _vue = this;
      const _editM = $('#editModal');
      _editM.on('show.bs.modal', function (e) {
//        _vue.hasGene = '';
//        _vue.inputPanel = '';
//        $("#editModal").on("click", function () {
//          _vue.showPanel = false;
//        });
        _editM.find(".fuzzy-content").find('.name').css("textAlign", 'right');
        _editM.find(".cascade-content").find('.title').css("textAlign", 'right')
      });
//      this.getPanelOp();
    },
    methods: {
      /*获取capture选择框*/
      getCap: function () {
        const _vue = this;
        this.myAxios({
          url: 'sample/capture/'
        }).then(function (resp) {
          _vue.capArr = resp.data.results;
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      getPanelOp: function () {
        const _vue = this;
        _vue.loading = true;
        this.myAxios({
          method: 'get',
          url: 'product/panel/'
        }).then(function (resp) {
          _vue.panelOptions = resp.data.results;
          _vue.loading = false;
        }).catch(function (error) {
          _vue.catchFun(error)
        });
      },
      /*获取列表*/
      getList: function () {
        const _vue = this;
//        this.results = [];
        this.loading = true;
        this.doneHttp = false;
        const axiosUrl = this.inputValue ? 'manage/sample' + '?page=' + this.pageNum + '&query=' + this.inputValue :
          'manage/sample' + '?page=' + this.pageNum;
        this.myAxios({
          url: axiosUrl,
          method: 'get'
        }).then(function (resp) {
          let data = resp.data;
          _vue.count = data.meta.total;
          _vue.results = data.data;
          _vue.loading = false;
          _vue.doneHttp = true;

//          _vue.getFileUrl(data.data);
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },

      downloadFile:function (lId,fId) {
        const _vue = this;
        this.loading = true;
        const postUrl = 'manage/sample/' + lId + '/data_file/' + fId;
        _vue.myAxios({
          url: postUrl,
          method: 'post'
        }).then(function (resp) {
          _vue.loading = false;
          window.location.href = _vue.apiUrl+postUrl + '?signature=' + resp.data.signature;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      getFileUrl: function (results) {
        const _vue = this;
        $.each(results, function (i, data) {
          $.each(data.data_files, function (key, value) {
            let postUrl = 'manage/sample/' + data._id + '/data_file/' + value._id;
            _vue.myAxios({
              url: postUrl,
              method: 'post'
            }).then(function (resp) {
              value.downloadUrl = postUrl + '?signature=' + resp.data.signature;

            }).catch(function (error) {
              _vue.catchFun(error)
            })
          })
        })
      },
      getCurrent: function (data) {
        this.pageNum = data;
        this.getList()
      },
      search: function () {
        this.pageNum = 1;
        this.getList();
      },
      refresh: function () {
        this.inputValue = '';
        this.getList()
      },

      /*删除样本*/
      deleteSample: function (id) {
        const _vue = this;
        this.$confirm('此操作将永久删除该样本, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.myAxios({
            url: 'manage/sample/' + id,
            method: 'delete'
          }).then(function () {
            _vue.success('删除成功!');
            _vue.getList();
          }).catch(function (error) {
            _vue.catchFun(error)
          })
        }).catch(() => {

        });
      },

      /*样本详情*/
      showDetail: function (data) {
        this.detailData = data;
//        $("#detailModal").modal("show");

        this.$router.push({path: '/sampleD', query: {'id': data._id}})

      },

      /*编辑每列*/
      saveEdit: function () {
        const _vue = this;
//        let axiosObj = {
//          captureInfo: {
//            code: $.trim($('#edit-capture').val())
//          },
//          patient: {
//            code: $.trim($('#edit-sampleCode').val()),
//            name: $.trim($('#edit-patientName').val()),
//            gender: $.trim($('#edit-gender').val()),
//          },
//          dateFormat: $.trim($('#edit-dateFormat').val()),
//          volume: $('#edit-volume').val() === ' - ' ? -1 : $.trim($('#edit-volume').val()),
//          q30: $('#edit-q30').val() === ' - ' ? -1 : $.trim($('#edit-q30').val()),
//          comment: $.trim($('#edit-comment').val()),
//          geneinfo: {
//            panels: _vue.hasPanel,
//            genes: _vue.strToArr(_vue.hasGene)
//          },
//        };

        this.editForm.gender = this.editGender;

        this.myAxios({
          url: 'manage/sample/' + this.editId,
          method: 'patch',
          data: this.editForm
        }).then(function () {
          _vue.success('编辑成功');
          $('#editModal').modal('hide');
          _vue.getList()
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      listEdit: function (_id) {
        const _vue = this;
        $.each(this.results, function (i, data) {
          if (data._id === _id) {  //如果直接赋予整个对象，会双向改变，改变列表
            _vue.editGender = data.patient.gender;
            _vue.editId = data._id;
            _vue.editForm.name = data.patient.name;
            _vue.editForm.sn = data.sn;
            _vue.editForm.national = data.patient.national;
            _vue.editForm.nativePlace = data.patient.nativePlace;
            _vue.editForm.age = data.patient.age;
            _vue.editForm.patientCase = data.patient.patientCase;
          }
        });
//        this.showPanelModal();
        $('#editModal').modal('show')
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

      /*上传EXCEL*/
      showUpModal: function (_id) {

        const _vue = this;
        $.each(this.results, function (i, data) {
          if (data._id === _id) {  //如果直接赋予整个对象，会双向改变，改变列表
            _vue.editId = data._id;
          }
        });

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
            url: 'manage/sample/' + this.editId + '/data_file',
            method: 'post',
            data: postData
          }).then(function () {
            _vue.success('上传成功');
            $('#fileModal').modal('hide');
            _vue.loading = false;
            _vue.getList()
          }).catch(function (error) {
            _vue.catchFun(error)
          })
        } else {
          this.alert('文件请上传excel格式')
        }
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

  #my-data {
    .detail-modal {
      padding-bottom: 40px;
      .one {
        padding: 0 10px;
        margin-bottom: 15px;
        > .title {
          font-size: 16px;
          display: block;
          padding: 8px 0;
          background-color: #f5f5f5;
          color: #434343;
          font-weight: 700;
        }
        > .row {

        }
        .info-content {
          ul {
            border: 1px solid @border;
            height: 100px;
            overflow-y: auto;
            li {
              margin: 3px 0;
            }
          }
        }
      }
    }
    .refresh {
      margin-right: 20px;
    }
    .file-td {
      > a {
        margin-right: 5px;
      }
    }
    /*添加样本弹框样式*/
    #addModal {
      .info-content {
        margin-top: 10px;
        padding-bottom: 50px;
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

    /*修改样本信息弹框样式*/
    #editModal, #fileModal {
      .modal-body {
        padding-bottom: 50px;
        input, select {
          display: inline-block;
          height: 25px;
          line-height: 25px;
        }
        select {
          padding: 0 12px;
        }
        textarea {
          display: inline-block;
          margin-left: 4px;
          height: 65px;
        }
        .one:not(:first-child) {
          margin: 15px 0;
        }
        .close-btn {
          margin-left: 20px;
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
              .top {
                margin-top: 10px;
              }
              .has-panel {
                height: 100px;
                overflow-y: auto;
                border: 1px solid #d4d4d4;
                .hasPanel-one {
                  display: block;
                  height: 25px;
                  line-height: 25px;
                  width: 100%;
                  cursor: pointer;
                  padding: 0 20px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  &:hover {
                    background-color: rgb(220, 238, 249);
                  }
                  .hasPanel-name {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 100%;
                    float: left;
                  }
                  .close {
                    position: absolute;
                    right: 10px;
                    margin-top: 5px;
                    font-size: 14px;
                  }
                }
              }
              .content {
                width: 60%;
                font-size: 12px;
                position: relative;

                .toArea {
                  display: inline-block;
                  margin-top: 5px;
                }
                /*基因信息*/
                input {
                  padding-right: 24px;
                  width: 100%;
                }
                .show-name {
                  width: 70%;
                }
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

        .case-content-edit {
          > span {
            float: left;
            width: 11.5%;
            margin-right: 1.8%;
            text-align: right;
          }
          > div {
            float: left;
            width: 60%;
          }
        }
        /*修改引入的fuzzyquery样式*/
        .fuzzy-content {
          .name {
            text-align: right;
          }
        }
      }
    }

    table {
      .edit {
        margin-right: 15px;
      }
      .delete {
        margin-left: 15px;
      }
    }
  }

</style>
