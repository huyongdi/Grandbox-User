<template>
  <div class="transfer row">
    <loading v-if="loadingPA"></loading>


    <div class="col-xs-5 left">
      <div class="header">选择项目</div>
      <div class="main">

        <el-tree :data="leftData" show-checkbox node-key="_id"  ref="tree" :props="defaultProps" @getCheckedNodes="getCheckedNodes"></el-tree>

        <ul class="apiData-content leftData-content">
          <!--<li v-for="list in leftData" :data-key="list.key">-->
            <!--<span aria-checked="mixed" class="el-checkbox__input" @click="choose">-->
              <!--<span class="el-checkbox__inner"></span>-->
              <!--<input type="checkbox" class="el-checkbox__original" value="0">-->
            <!--</span>-->
            <!--<span class="span-data po" :data-key="list.key" :title="list.value">{{list.value}}</span>-->
          <!--</li>-->
          <!---->
          <!--<li class="f-li">-->
            <!--<span aria-checked="mixed" class="el-checkbox__input" @click="chooseP">-->
              <!--<span class="el-checkbox__inner"></span>-->
              <!--<input type="checkbox" class="el-checkbox__original" value="0">-->
            <!--</span>-->
            <!--<span class="span-data po">1</span>-->

            <!--<ul class="children">-->
              <!--<li>-->
                  <!--<span aria-checked="mixed" class="el-checkbox__input" @click="chooseC">-->
                    <!--<span class="el-checkbox__inner"></span>-->
                    <!--<input type="checkbox" class="el-checkbox__original" value="0">-->
                  <!--</span>-->
                <!--<span class="span-data po">1</span>-->
              <!--</li>-->
              <!--<li>-->
                  <!--<span aria-checked="mixed" class="el-checkbox__input" @click="chooseC">-->
                    <!--<span class="el-checkbox__inner"></span>-->
                    <!--<input type="checkbox" class="el-checkbox__original" value="0">-->
                  <!--</span>-->
                <!--<span class="span-data po">1</span>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</li>-->

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
      <div class="header">已选项目</div>
      <div class="main">
        <ul class="apiData-content">
          <li v-for="list in rightData">
            <span aria-checked="mixed" class="el-checkbox__input" @click="choose">
              <span class="el-checkbox__inner"></span>
              <input type="checkbox" class="el-checkbox__original" value="0">
            </span>

            <span class="span-data po" :data-key="list._id" :title="list.name">{{list.name}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    props:['hasHpo','flag'],
    data: function () {
      return {
        loadingPA: '',
        sInput: '',
        leftData:  [{
          id: 1,
          name: '暂无数据',
        }],
        rightData: [],

        leftCId: [],
        rightCId: [],

        /*TEST*/
        defaultProps: {
          children: 'children',
          label: 'name'
        }

      }
    },
    mounted: function () {

    },
    watch:{
      flag:function (newD) {
        if(newD){
          this.getD()
        }
      }
    },
    methods: {
      /*插件开始*/
      getCheckedNodes:function () {

      },

      toLeft: function () {

      },
      toRight: function () {
//        console.log(this.$refs.tree.getCheckedNodes());
//        console.log(this.$refs.tree.getCheckedKeys());

        let arr = this.$refs.tree.getCheckedNodes();
        const _vue = this;
        $.each(arr,function (i,data) {
          if(data.is_leaf){
            _vue.rightData.push(data)
          }
        });
        this.$refs.tree.setCheckedKeys([]);
//        $.each(this.leftCId, function (n1, n2) {
//          $.each(_vue.leftData, function (i, data) {
//            if (data.key == n2) {
//              _vue.rightData.push(data);  //右边的增数据
//              _vue.rightCId.push(n2);
//              //删除左边的LI
//              $('.leftData-content').find('li').each(function () {
//                if ($(this).data('key') == n2) {
//                  $(this).remove()
//                }
//              })
//            }
//          });
//        });
      },

      chooseP:function (e) {
        const _fLi = $(e.target).closest('li');
        const _fInput = _fLi.find('>.el-checkbox__input');
        const _cUl = _fLi.find('>ul.children');

        if(_fInput.hasClass('is-checked')){

        }

      },
      chooseC:function () {

      },
      choose: function (e) {
        const _self = $(e.target).closest('.el-checkbox__input');
        const _id = _self.next().data('key');
        const _vue = this;
        let flag = true;
        $.each(this.rightCId, function (i, data) {
          if (data == _id) {
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
        this.loadingPA = true;
        this.myAxios({
          url: 'biomeddb/panel/?hpoids=' + this.hasHpo.join(','),
          type: 'get'
        }).then(function (resp) {
          _vue.loadingPA = false;
          let results = resp.data.data;
          _vue.leftData = [];
          $.each(results, function (i, data) {
            $.each(data.children,function (key,value) {
              value.name = value.name+'('+value.code+")";
            })
          });
          _vue.leftData = results;
          console.log(_vue.leftData)

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
        padding-left: 10%;
        padding-right: 10%;
        ul.apiData-content {
          max-height: 300px;
          overflow-y: auto;
          > li {
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
            ul.children {
              padding-left: 10px;
              li {
                position: relative;
              }
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
