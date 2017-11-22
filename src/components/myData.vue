<template>
  <div id="my-data" class="p-div">
    <loading v-if="loading"></loading>
    <div class="top-content">
      <span class="my-btn refresh" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
      <span class="my-btn" @click="addSample"><img src="../../static/img/red-submit.png" alt="">添加样本</span>
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
        <th>文件编号</th>
        <th>样本编号</th>
        <th>受检者</th>
        <th>检测平台</th>
        <th>数据格式</th>
        <th>数据量(Mbp)</th>
        <th>Q30</th>
        <th>备注</th>
        <th>分析结果</th>
        <th>选项</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="results.length == 0 && doneHttp">
        <td colspan="11" class="center">暂无数据</td>
      </tr>
      <tr v-for="(list,index) in results" :class="{'tr-bc':index%2}">
        <td>{{list._id}}</td>
        <td>{{list.sn}}</td>
        <td>{{list.name}}</td>
        <td><span v-if="list.captureInfo">{{list.captureInfo.code}}</span></td>
        <td>{{list.dataFormat}}</td>
        <td>
          <span v-if="list.volume==-1"> - </span>
          <span v-else="">{{list.volume}}</span>
        </td>
        <td>
          <span v-if="list.q30==-1"> - </span>
          <span v-else="">{{list.q30}}</span>
        </td>
        <td>{{list.comment ? list.comment : ' 无 '}}</td>
        <td>
          <span v-if="list.jobs && list.jobs.length==0">待分析</span>
          <div v-else="" class="dropdown">

            <div v-for="listJob in list.jobs">
              <router-link v-if="listJob.app.code === 'grandmgd'"
                           :to="{path:'/taskM/foo/sgResult',query:{id:listJob.id}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="listJob.app.name+'('+listJob.id+')'"
                   v-if="listJob.status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>
              <router-link v-if="listJob.app.code === 'grandmito'"
                           :to="{path:'/taskM/foo/mtResult',query:{id:listJob.id}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="listJob.app.name+'('+listJob.id+')'"
                   v-if="listJob.status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>
              <router-link v-if="listJob.app.code === 'grandwcnv'"
                           :to="{path:'/taskM/foo/cnvResult',query:{id:listJob.id}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="listJob.app.name+'('+listJob.id+')'"
                   v-if="listJob.status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>
              <router-link v-if="listJob.app.code === 'grandanno'"
                           :to="{path:'/taskM/foo/snvResult',query:{id:listJob.id}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="listJob.app.name+'('+listJob.id+')'"
                   v-if="listJob.status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>
              <router-link v-if="listJob.app.code === 'grandtrio'"
                           :to="{path:'/taskM/foo/trioResult',query:{id:listJob.id}}">
                <i data-toggle="tooltip" data-placement="top"
                   :data-original-title="listJob.app.name+'('+listJob.id+')'"
                   v-if="listJob.status == 'completed'" class="fa fa-check text-success po">已完成</i>
              </router-link>
              <span v-if="listJob.status == 'running'"> <!--避免字跟着一起转-->
                  <i class="fa fa-spinner fa-pulse text-success"></i>运行中
                </span>
              <i v-if="listJob.status == 'error'" class="fa fa-bug text-danger">出错</i>
              <i v-if='listJob.status == "waiting"' class="fa fa-hourglass-1 text-success">等待</i>
            </div>

          </div>
        </td>
        <td>
          <img src="../../static/img/edit.png" @click="listEdit(list.code)" title="编辑">
        </td>
      </tr>
      </tbody>
    </table>

    <page :childCount="count" :childReset="0" @childCurrent="getCurrent"></page>


    <!--添加样本-->
    <div class="modal fade" tabindex="-1" role="dialog" id="addModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">添加样本数据</h4>
          </div>
          <div class="modal-body">
            <ul id="breadcrumb">
              <li><a href="javascript:void(0)"><span class="fa fa-home"> </span></a></li>
              <li @click="show(1)"><a :class="{'in':!hide1}" href="javascript:void(0)">1. 基本信息</a></li>
              <li @click="show(2)"><a :class="{'in':!hide2}" href="javascript:void(0)">2. 表型信息</a></li>
              <li @click="show(3)"><a :class="{'in':!hide3}" href="javascript:void(0)">3. 检测项目</a></li>
              <li @click="show(4)"><a :class="{'in':!hide4}" href="javascript:void(0)">4. 预览/提交信息</a></li>
            </ul>

            <div class="info-content">
              <form action="" id="addDataFormCap">
                <div :class="{'hide':hide1}">
                  <div class="row">
                    <div class="col-xs-6">
                      <div class="col-xs-4"><span class="star">*</span>受检者姓名</div>
                      <div class="col-xs-8">
                        <el-input placeholder="" name="name" v-model="addInfo.name"></el-input>
                      </div>
                    </div>
                    <div class="col-xs-6">
                      <div class="col-xs-4"><span class="star">*</span>编号</div>
                      <div class="col-xs-8">
                        <el-input placeholder="" name="obj1.code" v-model="addInfo.number"></el-input>
                      </div>
                    </div>
                    <div class="col-xs-6">
                      <div class="col-xs-4">性别</div>
                      <div class="col-xs-8">
                        <template>
                          <el-select v-model="addInfo.gender" placeholder="请选择">
                            <el-option
                              v-for="item in genderOptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </template>
                      </div>
                    </div>
                    <div class="col-xs-6">
                      <div class="col-xs-4">名族</div>
                      <div class="col-xs-8">
                        <el-input placeholder="" v-model="addInfo.national"></el-input>
                      </div>
                    </div>
                    <div class="col-xs-6">
                      <div class="col-xs-4">籍贯</div>
                      <div class="col-xs-8">
                        <el-input placeholder="" v-model="addInfo.nativePlace"></el-input>
                      </div>
                    </div>
                    <div class="col-xs-6">
                      <div class="col-xs-4">出生日期</div>
                      <div class="col-xs-8">
                        <el-date-picker v-model="addInfo.birth" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                      </div>
                    </div>
                    <div class="col-xs-6">
                      <div class="col-xs-4">上传文件</div>
                      <div class="col-xs-8">
                        <div class="upload-content" id="upload">
                          <input type="text" class="show-name" id="file-name" @click.stop="">
                          <span class="text">选择</span>
                          <input type='file' name="bed" class="hide-input" id="hide-add" @change="changeFile">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div :class="{'hide':hide2}">
                  <div class="row">
                    <div class="col-xs-12">
                      <fuzzyQuery placeholder='请输入表型' :leftData="leftData" :rightData="originalRightData" title="已选表型"
                                  @sendInput="receiveFuzzy0"></fuzzyQuery>
                    </div>
                    <div class="col-xs-12 case-content">
                      <span class="title">病历：</span>
                      <div class="col-xs-6">
                        <el-input
                          type="textarea"
                          :autosize="{ minRows: 5, maxRows: 5}"
                          placeholder="请输入内容"
                          v-model="addInfo.patientCase">
                        </el-input>
                      </div>

                    </div>
                  </div>
                </div>

                <div :class="{'hide':hide3}" class="over-hide">
                  <div class="col-xs-12 panel-content">
                    <cascadeQuery :leftData="panelOptions" :rightData="panelRight"></cascadeQuery>
                  </div>
                </div>

                <div :class="{'hide':hide4}">
                  <div class="title">待提交信息：</div>
                  <div class="row">
                    <div class="col-xs-3" v-if="addInfo.name">
                      <div class="col-xs-5">姓名：</div>
                      <div class="col-xs-7">{{addInfo.name}}</div>
                    </div>
                    <div class="col-xs-3" v-if="addInfo.number">
                      <div class="col-xs-5">编号：</div>
                      <div class="col-xs-7">{{addInfo.number}}</div>
                    </div>
                    <div class="col-xs-3" v-if="addInfo.gender">
                      <div class="col-xs-5">性别：</div>
                      <div class="col-xs-7">{{addInfo.gender}}</div>
                    </div>
                    <div class="col-xs-3" v-if="addInfo.national">
                      <div class="col-xs-5">名族：</div>
                      <div class="col-xs-7">{{addInfo.national}}</div>
                    </div>
                    <div class="col-xs-3" v-if="addInfo.nativePlace">
                      <div class="col-xs-5">籍贯：</div>
                      <div class="col-xs-7">{{addInfo.nativePlace}}</div>
                    </div>
                    <div class="col-xs-4" v-if="addInfo.birth">
                      <div class="col-xs-5">出生日期：</div>
                      <div class="col-xs-7">{{addInfo.birth}}</div>
                    </div>
                    <div class="col-xs-4" :class="{'hide':fileHide}">
                      <div class="col-xs-5">文件名：</div>
                      <div class="col-xs-7" id="fileName-show"></div>
                    </div>
                  </div>

                  <div class="more row">
                    <div class="col-xs-6" v-if="originalRightData.length!=0">
                      <div class="col-xs-3">已选表型：</div>
                      <div class="col-xs-9">
                        <span v-for="list in originalRightData" class="show-phenotype po" :title="list.value">{{list.value}}</span>
                      </div>
                    </div>
                    <div class="col-xs-6" v-if="panelRight.length!=0">
                      <div class="col-xs-3">已选项目：</div>
                      <div class="col-xs-9">
                        <span v-for="list in panelRight" class="show-phenotype po" :title="list.vueShow">{{list.vueShow}}</span>
                      </div>
                    </div>
                    <div class="col-xs-12 top5" v-if="addInfo.patientCase">
                      <div class="col-xs-1">病例：</div>
                      <div class="col-xs-11 break-word">{{addInfo.patientCase}}</div>
                    </div>
                  </div>

                  <div class="save-content">

                    <span @click="saveAdd" class="my-btn"><img src="../../static/img/red-save.png" alt="">保存</span>
                  </div>


                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>


    <!--点击单列的编辑-->
    <div class="modal fade" tabindex="-1" role="dialog" id="editModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">修改样本数据</h4>
          </div>
          <div class="modal-body">

            <div class="modal-btn">
              <span class="my-btn" @click="saveEdit"><img src="../../static/img/red-save.png" alt="">保存</span>
              <span class="my-btn close-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>
            </div>


            <div class="one">
              <div class="base-color title">文件信息</div>
              <div class="one-content">
                <div class="row">
                  <div class="col-sm-6">
                    <span class="name">文件编号：</span>
                    <span class="content" id="edit-code">{{editModalData.code}}</span>
                  </div>
                  <div class="col-sm-6">
                    <span class="name">样本编号：</span>
                    <input class="form-control content" id="edit-sampleCode" v-if="editModalData.patient" :value="editModalData.patient.code">
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <span class="name">Capture：</span>
                    <select v-if="editModalData.captureInfo" :value="editModalData.captureInfo.code" class="form-control content" id="edit-capture">
                      <option v-for="list in capArr" :value="list.code">{{list.code}}</option>
                    </select>
                  </div>
                  <!--<div class="col-sm-6">-->
                  <!--<span class="name">-->
                  <!--<router-link class="common-a toArea" to="/dataM/foo/capList">新增捕获区域</router-link>-->
                  <!--</span>-->
                  <!--</div>-->
                </div>
              </div>
            </div>

            <div class="one">
              <div class="base-color title">受检者信息</div>
              <div class="one-content">
                <div class="row">
                  <div class="col-sm-6">
                    <span class="name">受检者姓名：</span>
                    <input v-if="editModalData.patient" class="form-control content" id="edit-patientName" :value="editModalData.patient.name">
                  </div>
                  <div class="col-sm-6">
                    <span class="name">受检者性别：</span>
                    <input v-if="editModalData.patient" class="form-control content" id="edit-gender" :value="editModalData.patient.gender">
                  </div>
                </div>
              </div>
            </div>

            <div class="one">
              <div class="base-color title">数据信息</div>
              <div class="one-content">
                <div class="row">
                  <div class="col-sm-6">
                    <span class="name">数据格式：</span>
                    <select name="dataFormat" id="edit-dateFormat" class="form-control content" :value="editModalData.dataFormat">
                      <option value="fastq">fastq</option>
                      <option value="fastqSE">fastqSE</option>
                      <option value="vcf">vcf</option>
                    </select>
                  </div>
                  <div class="col-sm-6">
                    <span class="name">数据量：</span>
                    <input class="form-control content" id="edit-volume" :value="editModalData.volume == -1?' - ':editModalData.volume">
                  </div>
                </div>
                <div class="row">
                  <div class="col-sm-6">
                    <span class="name">Q30：</span>
                    <input class="form-control content" id="edit-q30" :value="editModalData.q30 == -1?' - ' :editModalData.q30">
                  </div>
                  <div class="col-sm-6">
                    <span class="name pull-left">备注：</span>
                    <textarea class="form-control content" id="edit-comment" :value="editModalData.comment"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div class="one">
              <div class="base-color title">基因信息</div>
              <div class="one-content">
                <div class="row">
                  <div class="col-sm-6">
                    <div>
                      <span class="name">Panel信息：</span>
                      <div class="content inline" id="panel-1" @click.stop="">
                        <input @keyup.enter="searchPanel" v-model="inputPanel">
                        <img src="../../static/img/trio-2.png" alt="" @click.stop="searchPanel">

                        <ul class="hide-ul" v-show="showPanel">
                          <li v-for="list in panelData" @click.stop="addPanel(list)" :title="list.name">
                            {{list.name}}
                          </li>
                          <li v-show="panelData.length == 0">暂无数据</li>
                        </ul>
                      </div>
                    </div>

                    <div class="top">
                      <span class="name pull-left">Gene信息：</span>
                      <div class="content inline">
                        <textarea class="form-control" v-model="hasGene"></textarea>
                      </div>
                    </div>

                  </div>
                  <div class="col-sm-6">
                    <span class="name pull-left">已选panel：</span>
                    <div class="content inline has-panel">
                        <span class="hasPanel-one" @click="removePanel(list.code)" v-for="list in hasPanel">
                          <span class='hasPanel-name'>{{list.name}}</span>
                          <span class="close">&times;</span>
                        </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="one">
              <div class="base-color title">上传文件</div>

              <div class="one-content">
                <div class="row">

                  <div class="col-sm-6">
                    <span class="name">选择类型：</span>
                    <template>
                      <el-radio v-model="radioEdit" label="1">追加</el-radio>
                      <el-radio v-model="radioEdit" label="2">覆盖</el-radio>
                    </template>
                  </div>
                  <div class="col-sm-6" :class="{'opacity0':radioEdit == '1'}">
                    <span class="name">覆盖目标：</span>
                    <el-select v-model="addInfo.gender" placeholder="请选择" class="content">
                      <el-option
                        v-for="item in fileOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="col-sm-6">
                    <span class="name">选择文件：</span>
                    <div class="upload-content content" id="upload-edit">
                      <input type="text" class="show-name" id="file-name-edit" @click.stop="">
                      <span class="text">选择</span>
                      <input type='file' name="bed" class="hide-input" id="hide-edit" @change="changeFile">
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
  import page from './global/Page.vue'
  import fuzzyQuery from './global/fuzzyQuery.vue'
  import cascadeQuery from './global/cascadeQuery.vue'

  export default {
    components: {
      'page': page,
      'fuzzyQuery': fuzzyQuery,
      'cascadeQuery': cascadeQuery,
    },
    data: function () {
      return {
        capArr: [],
        doneHttp: '',
        geneInput: '',
        originalPanelData: [],
        results: [],
        inputValue: this.$route.query.sa ? this.$route.query.sa : '',
        editModalData: '',
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

        /*添加样本*/
        hide1: false,
        hide2: true,
        hide3: true,
        hide4: true,
        genderOptions: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }, {
          value: '未知',
          label: '未知'
        }],
        fileOptions: [{
          value: 'add',
          label: '追加'
        }, {
          value: 'edit',
          label: '覆盖'
        }],
        leftData: [],
        originalRightData: [],
        panelRight: [],
        panelOptions: [],
        addInfo: {
          name: '',
          number: '',
          gender: '',
          national: '',
          nativePlace: '',
          birth: '',
          patientCase: '',
        },
        fileHide: true,
        radioEdit:'1'
      }
    },
    created: function () {
      const _vue = this;

      this.getList();
//      this.getCap();
//      const _vue = this;
//      $('#editModal').on('show.bs.modal', function (e) {
//        _vue.hasGene = '';
//        _vue.inputPanel = '';
//        $("#editModal").on("click", function () {
//          _vue.showPanel = false;
//        })
//      });
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
        this.results = [];
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
        }).catch(function (error) {
          _vue.catchFun(error)
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

      /*编辑每列*/
      saveEdit: function () {
        const _vue = this;
        let axiosObj = {
          captureInfo: {
            code: $.trim($('#edit-capture').val())
          },
          patient: {
            code: $.trim($('#edit-sampleCode').val()),
            name: $.trim($('#edit-patientName').val()),
            gender: $.trim($('#edit-gender').val()),
          },
          dateFormat: $.trim($('#edit-dateFormat').val()),
          volume: $('#edit-volume').val() === ' - ' ? -1 : $.trim($('#edit-volume').val()),
          q30: $('#edit-q30').val() === ' - ' ? -1 : $.trim($('#edit-q30').val()),
          comment: $.trim($('#edit-comment').val()),
          geneinfo: {
            panels: _vue.hasPanel,
            genes: _vue.strToArr(_vue.hasGene)
          },
        };

        this.myAxios({
          url: 'sample/datafile/' + _vue.editModalData.id + '/',
          method: 'patch',
          data: axiosObj
        }).then(function () {
          alert('编辑成功')
          $('#editModal').modal('hide')
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      listEdit: function (code) {
        const _vue = this;
        $.each(this.results, function (i, data) {
          if (data.code === code) {
            _vue.editModalData = data
          }
        });
        this.showPanelModal();
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

        this.addInfo = {
          name: '',
          number: '',
          gender: '',
          national: '',
          nativePlace: '',
          birth: '',
          patientCase: '',
        };

        $("#addModal").modal("show")
      },
      saveAdd: function () {
        const fileNameArr = $("#hide-add").val().split('.');
        const fileName = fileNameArr[fileNameArr.length - 1];
        const _vue = this;
        if (fileName == 'xls' || fileName == 'xlsx') {
          this.loading = true;
          let postData = new FormData(document.getElementById('addDataFormCap'));
          postData.append("obj", JSON.stringify({'a': 123, 'b': 456}));
          this.myAxios({
            url: 'https://analyze.grandbox.site/sample/capture/',
            method: 'post',
            data: postData
          }).then(function () {

          }).catch(function (error) {
            _vue.catchFun(error)
          })
        } else {
          this.alert('文件请上传excel格式')
        }
      },
      changeFile: function (e) {
        console.log($(e.target.files[0]))
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
        } else if(type == 3){
          this.hide3 = false;
        } else if (type == 4) {
          const value = $.trim($("#file-name").val());
          if (value) {
            this.fileHide = false;
            $("#fileName-show").html(value)
          }
          this.hide4 = false;
        }
      },
      receiveFuzzy0: function (data) {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url: 'knowledge/phenomini/?query=' + data,
          type: 'get'
        }).then(function (resp) {
          _vue.loading = false;
          const results = resp.data;
          _vue.leftData = [];
          $.each(results, function (i, data) {
            data.vHtml = data.hpoId + ' ' + data.titles.chinese + '(' + data.titles.english + ')'
            _vue.leftData.push({
              key: data.hpoId,
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
    .refresh {
      margin-right: 20px;
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
        .col-xs-6 {
          margin-top: 10px;
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
    #editModal {
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
            .hide-input{
              display: none;
            }
            .text{
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
              .show-name{
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
    }
  }

</style>
