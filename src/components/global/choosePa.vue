<template>
  <div class="transfer row">
    <loading v-if="loadingT"></loading>


    <div class="col-xs-5 left">
      <div class="header">选择表型</div>
      <div class="main">
        <div class="search-content">
          <input v-model="sInput" type="text" placeholder="请输入表型" @keyup.enter="getD">
          <i class="el-icon-search" @click="getD"></i>
        </div>
        <ul class="apiData-content leftData-content">
          <li v-for="list in leftData" :data-key="list.key">
            <span aria-checked="mixed" class="el-checkbox__input" @click="choose">
              <span class="el-checkbox__inner"></span>
              <input type="checkbox" class="el-checkbox__original" value="0">
            </span>
            <span class="span-data po" :data-key="list.key" :title="list.value">{{list.value}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-xs-2 middle btn-content">
      <button type="button" class="el-button el-button--primary el-transfer__button" @click="toLeft"><!--disabled="disabled" class---is-disabled -->
        <span><i class="el-icon-arrow-left"></i></span>
      </button>
      <button type="button" class="el-button el-button--primary el-transfer__button" @click="toRight">
        <span><i class="el-icon-arrow-right"></i></span>
      </button>
    </div>

    <div class="col-xs-5 right">
      <div class="header">已选表型</div>
      <div class="main">
        <ul class="apiData-content">
          <li v-for="list in rightData">
            <span aria-checked="mixed" class="el-checkbox__input" @click="choose">
              <span class="el-checkbox__inner"></span>
              <input type="checkbox" class="el-checkbox__original" value="0">
            </span>

            <span class="span-data po" :data-key="list.key" :title="list.value">{{list.value}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    data: function () {
      return {
        loadingT: '',
        sInput: '',
        leftData: [],
        rightData: [],

        leftCId: [],
        rightCId: [],
      }
    },
    mounted: function () {

    },
    methods: {
      toLeft: function () {

      },
      toRight: function () {
        const _vue = this;

        $.each(this.leftCId, function (n1, n2) {
          $.each(_vue.leftData, function (i, data) {
            if (data.key == n2) {
              _vue.rightData.push(data);  //右边的增数据
              _vue.rightCId.push(n2);
              //删除左边的LI
              $('.leftData-content').find('li').each(function () {
                if ($(this).data('key') == n2) {
                  $(this).remove()
                }
              })
            }
          });
        });
      },
      choose: function (e) {
        const _self = $(e.target).closest('.el-checkbox__input');
        const _id = _self.next().data('key');
        const _vue  = this;
        let flag = true;
        $.each(this.rightCId, function (i, data) {
          if(data == _id){
            flag = false;
            _vue.alert('请勿重新添加')
          }
        });
        if (flag) {
          this.leftCId.push(_id);
          if (_self.hasClass('is-checked')) {
            _self.removeClass('is-checked')
          } else {
            _self.addClass('is-checked')
          }
        }
      },
      getD: function () {
        const _vue = this;
        this.loadingT = true;
        this.myAxios({
          url: 'biomeddb/hpo/?query=' + this.sInput,
          type: 'get'
        }).then(function (resp) {
          _vue.loadingT = false;
          let results = resp.data.data;
          _vue.leftData = [];
          $.each(results, function (i, data) {
            data.vHtml = data.hpoid + ' ' + data.name.chinese + '(' + data.name.english + ')';
            _vue.leftData.push({
              key: data.hpoid,
              value: data.vHtml
            })
          });

        }).catch(function (error) {
          _vue.catchFun(error)
        })
      }
    },
  }
</script>


<style scoped lang="less">
  .transfer {
    .left, .right {
      border: 1px solid #e6ebf5;
      border-radius: 4px;
      background: #fff;
      padding: 0;
      min-height: 400px;
      .header {
        height: 40px;
        line-height: 40px;
        background: #f5f7fa;
        margin: 0;
        padding-left: 15px;
        border-bottom: 1px solid #e6ebf5;
        box-sizing: border-box;
        color: #000;
      }
      .main {
        .search-content {
          position: relative;
          text-align: center;
          margin: 15px 0;
          input {
            height: 32px;
            width: 100%;
            font-size: 12px;
            display: inline-block;
            box-sizing: border-box;
            border-radius: 16px;
            padding-right: 40px;
            padding-left: 30px;
          }
          i {
            position: absolute;
            width: 40px;
            top: 0;
            right: 0;
            text-align: center;
            height: 32px;
            line-height: 32px;
            cursor: pointer;
          }
        }
        padding-left: 10%;
        padding-right: 10%;
        ul.apiData-content {
          max-height: 300px;
          overflow-y: auto;
          li {
            position: relative;
            .el-checkbox__input {
              position: absolute;
              top: 8px;
            }
            .span-data {
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: block;
              box-sizing: border-box;
              padding-left: 24px;
              line-height: 30px;
            }
          }
        }
      }
    }
    .btn-content {
      vertical-align: middle;
      margin-top: 150px;
      .el-transfer__button {
        margin: 15px auto;
      }
    }

  }
</style>
