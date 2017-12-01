<template>
  <div id="my-data" class="p-div">
    <loading v-if="loading"></loading>
    <div class="top-content">
      <!--<span class="my-btn refresh" @click=""><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>-->
      <span class="my-btn" @click=""><img src="../../static/img/red-submit.png" alt="">添加用户</span>
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
        <th>创建时间</th>
        <th>更新时间</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="list in lists">
          <td>{{list.name}}</td>
          <td>{{list.email}}</td>
          <td>{{list.is_admin?'管理员':'普通用户'}}</td>
          <td>{{list.created_at}}</td>
          <td>{{list.updated_at}}</td>
          <td>
            <button>删除</button>
            <button>修改信息</button>
            <button>重置密码</button>
            <button>重置密码</button>
          </td>
        </tr>
      </tbody>
    </table>
    <page :childCount="count" :childReset="reset" @childCurrent="getCurrent"></page>


  </div>
</template>


<script>
  import page from './global/Page.vue'

  export default {
    components: {
      'page': page,
    },
    data: function () {
      return {
        lists:[],
        count:1,
        reset:0,
        loading:''
      }

    },
    mounted: function () {
      this.getList();
    },
    methods: {
      getList:function () {
        const _vue = this;
        this.myAxios({
          url:'manage/user'
        }).then(function (resp) {
          let data = resp.data;
          _vue.lists = data.data;
          _vue.count = data.total;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      getCurrent:function () {

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
