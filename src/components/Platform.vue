<template>
  <div class="row">
    <loading v-if="loading"></loading>
    <div class="sg-list col-sm-11">
      <div class="title">
        <span class="title-b">检测平台</span>
        <span class="title-s">< {{captureCode ? captureCode : '全部'}}</span>
      </div>
      <div class="btn-content rea">
        <!--<span class="all-check inline po" @click="clickAll">-->
          <!--<span class="all-check-yes hide"></span>-->
        <!--</span>-->

        <!--<span class="my-btn submit" @click="deleteAll"><img src="../../static/img/red-delete.png" alt="">批量删除</span>-->
        <span class="my-btn refresh" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
        <!--<span class="my-btn pull-right condition" @click.stop="filtrate"><img src="../../static/img/red-con.png" alt="">筛选条件</span>-->

        <div class="search-div">
          <input placeholder="请输入关键字" class="search-input" v-model="inputValue" @keyup.enter="search">
          <span class="my-btn" @click="search">
            <img src="../../static/img/red-con.png" alt="">
          </span>
        </div>

        <!--&lt;!&ndash;筛选条件弹框&ndash;&gt;-->
        <!--<div class="filtrate-content hide" id="filtrate-content" @click.stop="">-->
        <!--<img src="../../static/img/th-1.png" alt="" class="up">-->
        <!--<div class="title">搜索选项</div>-->
        <!--<div class="content">-->
        <!--<div class="single">-->
        <!--<div class="left">关键字：</div>-->
        <!--<div class="right">-->
        <!--<input type="text" v-model="inputValue" @keyup.enter="search">-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<span class="my-btn search-btn" @click="search"><img src="../../static/img/red-con.png" alt="">搜索</span>-->
        <!--</div>-->
      </div>
      <!--<div class="my-table-content">-->
        <table id="sg-table" class="bc-fff my-table">
          <thead>
          <tr>
            <!--<th></th>-->
            <th>文件编号</th>
            <th>样本编号</th>
            <th>受检者</th>
            <th>检测平台</th>
            <th>数据格式</th>
            <th>数据量(Mbp)</th>
            <th>Q30</th>
            <th>备注</th>
            <!--<th>文件</th>-->
            <th>分析结果</th>
            <th>选项</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="results.length == 0 && doneHttp">
            <td colspan="11" class="center">暂无数据</td>
          </tr>
          <tr v-for="(list,index) in results" :class="{'tr-bc':index%2}" @click="addIn" class="not-base">
            <!--<td class="check-td">-->
              <!--<span :data-datafile='list.code' :data-prefix='list.sampleCode' class="check-span check-no"></span>-->
            <!--</td>-->
            <td>{{list.code}}</td>
            <td><a class="common-a" target="_blank" v-if="list.sample" :href="manHtml+'patientDetail/'+list.sample.code">{{list.sample.code}}</a></td>
            <td>
              <span v-if="list.patient">
                <span data-toggle="tooltip" data-placement="top" :data-original-title='list.patient.name'>{{list.patientNameView}}</span>
                （{{list.patient.gender}}）
              </span>
            </td>
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
            <!--<td>-->
            <!--<a class="common-a" :href="'https://analyze.grandbox.site/media/'+list.urls[0]" v-if="list.urls[0]">文件1</a>-->
            <!--<a class="common-a" :href="'https://analyze.grandbox.site/media/'+list.urls[1]" v-if="list.urls[1]">文件2</a>-->
            <!--</td>-->
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
              <!--<img src="../../static/img/delete.png" class="list-delete" :data-id=list.id @click.stop='deleteFun' title="删除">-->
            </td>
          </tr>
          </tbody>
        </table>
      <!--</div>-->

      <page :childCount="count" :childReset="0" @childCurrent="getCurrent"></page>

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
                    <div class="col-sm-6">
                      <span class="name">
                        <router-link class="common-a toArea" to="/dataM/foo/capList">新增捕获区域</router-link>
                      </span>
                    </div>
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
                          <input @keyup="searchPanel" v-model="inputPanel">
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
            </div>
          </div>
        </div>
      </div>
      <!--点击单列的编辑里面的基因-->
      <!--<panelModal @saveData="savePanel" :originalGeneInput='geneInput' :originalPanelData="originalPanelData"></panelModal>-->
    </div>
  </div>
</template>

<script>
  import page from './global/Page.vue'
//  import panelModal from './global/PanelModal.vue'

  export default {
    props: ['capArr'],
    components: {
      'page': page,
//      'panelModal': panelModal,
    },
    data: function () {
      return {
        doneHttp:'',
        geneInput: '',
        originalPanelData: [],
        results: [],
        inputValue: this.$route.query.sa ? this.$route.query.sa : '',
        editModalData: '',
//        capList: [],
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
      }
    },
    mounted: function () {
      this.getList();
      const _vue = this;
      $('#editModal').on('show.bs.modal', function (e) {
        _vue.hasGene = '';
        _vue.inputPanel = '';
        $("#editModal").on("click",function(){
          _vue.showPanel = false;
        })
      })
    },
    methods: {

      changeUrl:function () {
         let hash = window.location.hash;
         if(hash.indexOf('sa')>0){
           let start = hash.substring(0,hash.indexOf('sa'));
           let end = hash.substring(hash.indexOf('sa'),hash.length);
           if(end.indexOf('&')>0){ //如果后面还有参数 code  sa=XXX&code=XXX
             let code = end.substring(end.indexOf('code'),end.length);
             window.location.hash = start+'sa='+this.inputValue+'&'+code
           }else{ //sa=结尾
             window.location.hash = start+'sa='+this.inputValue
           }
         }
      },

      getList: function () {
        const _vue = this
        this.results = []
        this.loading = true;
        this.doneHttp = false;
        const axiosUrl = this.inputValue ? 'sample/datafile/' + '?page=' + this.pageNum + '&query=' + this.inputValue + '&capture=GrandExome'
          : 'sample/datafile/' + '?page=' + this.pageNum + '&capture=' + this.captureCode;

        this.myAxios({
          url: axiosUrl,
          method: 'get'
        }).then(function (resp) {
          _vue.count = resp.data.count
//          if (_vue.count === 0) {
//            _vue.loading = false;
//          }
//          $.each(resp.data.results, function (i, data) {
//            data.jobs = []
//          });
          _vue.results = resp.data.results
          _vue.loading = false
          _vue.doneHttp = true;
//          _vue.getJob();
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      getCurrent: function (data) {
        this.pageNum = data
        this.getList()
      },
      getJob: function () {
        const _vue = this
        $.each(_vue.results, function (i, data) {
          _vue.myAxios({
            url: 'application/job/?datafile=' + data.id,
          }).then(function (resp) {
            resp = resp.data.results
            $.each(resp, function (k1, k2) {
              data.jobs.push({
                id: k2.id,
                app: k2.app,
                status: k2.status,
              })
            })
            _vue.loading = false
          }).catch(function (error) {
            _vue.catchFun(error)
          })
        })
      },
      saveEdit: function () {
        const _vue = this
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
        }

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
      search: function () {
        this.pageNum = 1;
        this.changeUrl(); /*修改地址栏通过watch自动更新*/
        this.getList();
        $('#filtrate-content').addClass('hide')
      },
      refresh: function () {
        this.inputValue = ''
        this.getList()
      },
      listEdit: function (code) {
        const _vue = this
        $.each(this.results, function (i, data) {
          if (data.code === code) {
            _vue.editModalData = data
          }
        })
        this.showPanelModal()
        $('#editModal').modal('show')
      },
      deleteFun: function (event) {
        const _vue = this
        if (confirm('是否删除该样本')) {
          const id = $(event.target).data('id')
          _vue.myAxios({
            url: 'sample/datafile/' + id + '/',
            method: 'delete'
          }).then(function () {
            alert('已成功删除该样品')
            $(event.target).closest('tr').remove()
          }).catch(function (error) {
            _vue.catchFun(error)
          })
        }
      },
      deleteAll: function () {
        let k1 = 0
        let k2 = 0
        const _vue = this
        $('.check-span').each(function () {
          if ($(this).hasClass('check-yes')) {
            k1 += 1
            _vue.myAxios({
              url: 'sample/datafile/' + $(this).data('datafile') + '/',
              method: 'delete'
            }).then(function () {
              $(this).closest('tr').remove()
              k2 += 1
              if (k2 === k1) {
                alert('批量删除成功')
              }
            }).catch(function (error) {
              _vue.catchFun(error)
            })
          }
        })
      },
      filtrate: function () {
        this.switchHide('filtrate-content')
      },
      addIn: function (event) {
        //给tr内容加上样式
        const _tr = $(event.target).closest('tr')
        const _allYes = $('.all-check-yes')
        if (_tr.hasClass('in')) {
          _tr.removeClass('in')
          _tr.find('.check-span').removeClass('check-yes').addClass('check-no')
        } else {
          _tr.addClass('in')
          _tr.find('.check-span').removeClass('check-no').addClass('check-yes')
        }
        //判断全选
        let hasCheck = 0
        $('.check-span').each(function () {
          if ($(this).hasClass('check-yes')) {
            hasCheck += 1
          }
        })
        if (hasCheck === this.results.length) {
          _allYes.removeClass('hide')
        } else {
          _allYes.addClass('hide')
        }
      },
      clickAll: function () {
        const _allYes = $('.all-check-yes')
        if (_allYes.hasClass('hide')) { //准备去全选
          _allYes.removeClass('hide')
          $('.check-span').each(function () {
            $(this).addClass('check-yes').removeClass('check-no')
//            $(this).closest('tr').addClass('in')
          })
        } else {
          _allYes.addClass('hide')
          $('.check-span').each(function () {
            $(this).removeClass('check-yes').addClass('check-no')
//            $(this).closest('tr').removeClass('in')
          })
        }
      },
      /*修改panel--这里不是用的模块*/
      searchPanel: function () {
        const _vue = this;
        this.showPanel = true;
        _vue.loading = true;
        this.myAxios({
          url: _vue.dbUrl + 'product/panel/search/?query=' + _vue.inputPanel
        }).then(function (resp) {
          _vue.panelData = resp.data
          _vue.loading = false
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      showPanelModal: function () {
        const _vue = this;
        _vue.loading=true;
        this.myAxios({
          url: 'sample/datafile/' + _vue.editModalData.id + '/'
        }).then(function (resp) {
          _vue.loading=false;
          _vue.hasPanel = resp.data.geneinfo ? resp.data.geneinfo.panels : [];
            _vue.hasGene = resp.data.geneinfo ? resp.data.geneinfo.genes.join(',') : ''
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      addPanel:function (list) {
        this.hasPanel.push(list)
      },
      removePanel:function (code) {
        const _vue = this;
        const arr = [];
        $.each(_vue.hasPanel,function (i,data) {
          if(data.code !== code){
            arr.push(data)
          }
        });
        _vue.hasPanel = arr;
      },

    },
    watch: {
      '$route' (to,from) {
        this.captureCode = this.$route.query.code ? this.$route.query.code : ''
        if(to.query.code != from.query.code){
          this.inputValue = ''
        }

        this.getList()
      }
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip()
    },
  }
</script>

<style scoped lang="less">
  @border: rgb(185, 184, 184);
  .sg-list {
    .refresh{
      /*margin-left: 15px;*/
    }
    .btn-content {
      margin: 15px 0 0 0;
      .all-check {
        width: 15px;
        height: 15px;
        margin-bottom: -4px;
        margin-left: 14px;
        background: url('../../static/img/all-2.png') 72px 15px;
        text-align: center;
        position: relative;
        .all-check-yes {
          position: absolute;
          top: 4px;
          left: 4px;
          width: 7px;
          height: 7px;
          background-color: #ea5442;
          border-radius: 50%;
        }
      }
      .submit {
        margin: 0 25px 0 11px;
      }
      .search-div {
        margin: 0 0 -7px 30px;
        float: right;
      }
    }
    table#sg-table {
      tbody {
        cursor: pointer;
        .check-td {
          width: 43px;
          text-align: center;
          padding: 8px 0;
          .check-no {
            float: left;
            margin-left: 14.5px;
            width: 15px;
            height: 15px;
            background: url(../../static/img/all-2.png) 43px 0;
          }
          .check-yes {
            float: left;
            margin-left: 14.5px;
            width: 15px;
            height: 15px;
            background: url(../../static/img/all-2.png) 15px 0;
          }
        }
        .list-delete {
          margin: -1px 0 0 10px;
        }
      }
    }

    /*修改样本信息弹框样式*/
    #editModal {
      input, select {
        display: inline-block;
        height: 24px;
        line-height: 24px;
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
      .close-btn{
        margin-left: 20px;
      }
      .one {
        .title {
          margin-bottom: 5px;
        }
        .one-content {
          .row {
            margin-top: 5px;
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
              .hasPanel-one{
                display: block;
                height: 25px;
                line-height: 25px;
                width: 100%;
                cursor: pointer;
                padding: 0 20px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                &:hover{
                  background-color: rgb(220, 238, 249);
                }
                .hasPanel-name{
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  width: 100%;
                  float: left;
                }
                .close{
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
