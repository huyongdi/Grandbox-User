<template>
  <div id="my-data" class="p-div">
    <loading v-if="loading"></loading>
    <div class="top-content">
      <!--<span class="my-btn refresh" @click=""><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>-->
      <span class="my-btn" @click="addUser"><img src="../../static/img/red-submit.png" alt="">添加用户</span>
      <!--<div class="search-div pull-right">-->
      <!--<input placeholder="请输入关键字" class="search-input" v-model="inputValue" @keyup.enter="search">-->
      <!--<span class="my-btn" @click="search">-->
      <!--<img src="../../static/img/red-con.png" alt="">-->
      <!--</span>-->
      <!--</div>-->
    </div>

    <table id="sg-table" class="bc-fff my-table">
      <thead>
      <tr>
        <th>姓名</th>
        <th>邮箱</th>
        <th>身份</th>
        <th>状态</th>
        <th>创建时间</th>
        <th>更新时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="list in lists">
        <td>{{list.name}}</td>
        <td>{{list.email}}</td>
        <td>
          <span v-if="list.is_admin">管理员</span>
          <span v-else="">{{list.group|getGroup}}</span>

        </td>
        <td>{{list.status ? '启用' : '禁用'}}</td>
        <td>{{list.created_at}}</td>
        <td>{{list.updated_at}}</td>
        <td>

          <i @click="deleteUser(list._id)" class="fa fa-trash fa-lg delete" title="删除"></i>
          <img class="edit" src="../../static/img/edit.png" @click='editUser(list)' title="编辑">
          <!--<i  @click="resetUser(list._id)" class="fa fa-refresh" title="重置密码"></i>-->

        </td>
      </tr>
      </tbody>
    </table>
    <page :childCount="count" :childReset="reset" @childCurrent="getCurrent"></page>


    <!--新增用户-->
    <div class="modal fade" tabindex="-1" role="dialog" id="addModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">新增用户</h4>
          </div>
          <div class="modal-body">

            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">

              <div class="modal-btn">
                <span class="my-btn" @click="submitForm('ruleForm2')"><img src="../../static/img/red-save.png" alt="">提交</span>
                <span class="my-btn close-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>
              </div>

              <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm2.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item
                prop="email"
                label="邮箱"
                :rules="[
                          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                        ]"
              >
                <el-input v-model="ruleForm2.email"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
              </el-form-item>

            </el-form>


          </div>
        </div>
      </div>
    </div>

    <!--编辑用户-->
    <div class="modal fade" tabindex="-1" role="dialog" id="editModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">编辑用户</h4>
          </div>
          <div class="modal-body">

            <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="100px" class="demo-ruleForm">

              <div class="modal-btn">
                <span class="my-btn" @click="submitForm1(ruleForm._id)"><img src="../../static/img/red-save.png" alt="">提交</span>
                <span class="my-btn close-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>
              </div>

              <el-form-item label="用户名" prop="name">
                <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
              </el-form-item>

              <el-form-item label="设为管理员">
                <el-switch @change="setGroup"
                  v-model="ruleForm.isAdmin"
                  active-color="#13ce66"
                  inactive-color="#999">
                </el-switch>
              </el-form-item>

              <el-form-item label="身份">
                <el-radio v-model="ruleForm.identity" label=guest >访客</el-radio>
                <el-radio v-model="ruleForm.identity" label=user >普通用户</el-radio><!--:disabled="ruleForm.isAdmin"-->
                <!--<el-radio v-model="ruleForm.identity" label=true>管理员</el-radio>-->
              </el-form-item>

              <el-form-item label="状态">
                <el-radio v-model="ruleForm.status" label=0>禁用</el-radio>
                <el-radio v-model="ruleForm.status" label=1>启用</el-radio>
              </el-form-item>

            </el-form>


          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
  import page from './global/Page.vue'

  export default {
    components: {
      'page': page,
    },
    data() {
      const checkUname = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      };
      const validateemail = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('邮箱不能为空'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: '',
          isAdmin:'',
          identity: '',
          status: 1,
          _id: "",
        },
        ruleForm2: {
          name: '',
          email: '',
          pass: '',
        },
        rules2: {
          name: [
            {validator: checkUname, trigger: 'blur', required: true}
          ],
          email: [
            {validator: validateemail, trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur', required: true}
          ],

        },
        lists: [],
        count: 1,
        page: 1,
        reset: 0,
        loading: '',
      };
    },
    mounted: function () {
      this.getList();
    },
    methods: {
      getList: function () {
        const _vue = this;
        this.myAxios({
          url: 'manage/user?page=' + this.page
        }).then(function (resp) {
          let data = resp.data;
          _vue.lists = data.data;
          _vue.count = data.total;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      getCurrent: function (data) {
        this.page = data;
        this.getList()
      },
      //添加用户
      submitForm(formName) {
        const _vue = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            _vue.myAxios({
              url: 'manage/user',
              method: 'post',
              data: {
                email: _vue.ruleForm2.email,
                name: _vue.ruleForm2.name,
                password: _vue.ruleForm2.pass,
              }
            }).then(function () {
              _vue.success('用户添加成功');
              $("#addModal").modal("hide");
              _vue.getList()
            }).catch(function (error) {
              _vue.catchFun(error)
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addUser: function () {
        this.$refs['ruleForm2'].resetFields();
        $("#addModal").modal("show");
      },
      //删除用户
      deleteUser: function (id) {
        const _vue = this;
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _vue.myAxios({
            url: 'manage/user/' + id,
            method: 'delete',
          }).then(function () {
            _vue.success('用户已删除');
            _vue.getList()
          }).catch(function (error) {
            _vue.catchFun(error)
          })
        }).catch(() => {

        });
      },
      //编辑用户
      editUser: function (list) {
        this.ruleForm = {
          _id: list._id,
          isAdmin:list.is_admin,
          identity:list.group,
          name: list.name,
          status: list.status ? list.status + '' : '0'
        },
          $("#editModal").modal("show")
      },
      submitForm1() {
        const _vue = this;
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            _vue.myAxios({
              url: 'manage/user/' + _vue.ruleForm._id,
              method: 'patch',
              data: {
                name: _vue.ruleForm.name,
                group: _vue.ruleForm.identity?_vue.ruleForm.identity:'user',
                is_admin: _vue.ruleForm.isAdmin,
                status: parseInt(_vue.ruleForm.status)
              }
            }).then(function () {
              _vue.success('用户修改成功');
              $("#editModal").modal("hide");
              _vue.getList()
            }).catch(function (error) {
              _vue.catchFun(error)
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置密码
      resetUser: function (id) {
        const _vue = this;
        this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _vue.myAxios({
            url: 'manage/user/' + id + '/reset-passwd',
            method: 'patch'
          }).then(() => {
            _vue.success('密码已重置')
          }).catch((error) => {
            _vue.catchFun(error)
          })
        }).catch(() => {

        });
      },
      setGroup:function (newD) {
        if(newD){
//          this.ruleForm.identity = ''
        }
      }
    },
    watch: {
      '$route'(to, from) {

      },
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip()
    },
    filters: {
      getGroup:function (status) {
        switch (status) {
          case 'user':
            return '普通用户';
            break;
          case 'guest':
            return '游客';
            break;
          case -1:
            return '未知';
            break;
        }
      },
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
        margin:0 10px;
      }
    }
  }

</style>
