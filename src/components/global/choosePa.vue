<template>
  <div class="transfer row">
    <loading v-if="loadingPA"></loading>


    <div class="col-xs-5 t-left">
      <div class="header">选择项目</div>
      <div class="main">

        <el-tree :data="leftData" show-checkbox node-key="_id" ref="tree" :props="defaultProps" @node-click="nodeClick"></el-tree>

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

    <div class="col-xs-5 t-right" id="choose-pa">
      <div class="header">已选项目</div>
      <div class="main">
        <ul class="apiData-content rightData-content">
          <li v-for="list in rightData" :data-key="list._id">
            <span aria-checked="mixed" class="el-checkbox__input" @click="chooseR">
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
    props: ['hasHpo', 'flag', 'rightData', 'parentLeftData', 'inEdit'],
    data: function () {
      return {
        loadingPA: '',
        sInput: '',
        leftData: this.parentLeftData ? this.parentLeftData : [{
          id: 1,
          name: '暂无数据',
        }],

        leftCId: [],
        rightCId: [],

        rightToLeftId: [],

        defaultProps: {
          children: 'children',
          label: 'name'
        },

        changeHasHpo: ''
      }
    },
    mounted: function () {

    },
    watch: {
      hasHpo: function (newD) {
        this.changeHasHpo = true;
        if (this.inEdit) { //兼容編輯頁面
          this.getD();
        }
      },
      flag: function (newD) {
        if (newD && (this.changeHasHpo)) {
          this.getD();
          this.changeHasHpo = false;
        } else if (this.hasHpo.length == 0) {
          this.getD();
        }
      },
      rightData: function (newD) {
        this.$emit('getPanelAll', newD) //函数名和父元素的@onEnter一致
      }
    },
    methods: {
      nodeClick: function (clickD) {
//       if(clickD.is_leaf){
        this.$emit('getGenes', clickD.genes); //函数名和父元素的@onEnter一致
//       }
      },

      toLeft: function () {
        const _vue = this;

        $.each(this.rightToLeftId, function (i, data) {
          let spliceIndex = 0;
          $.each(_vue.rightData, function (n1, n2) {
            if (n2._id == data) {
              spliceIndex = n1;
            }
          });
          _vue.rightData.splice(spliceIndex, 1)
        });

        $('.rightData-content').find("li").each(function () {
          $(this).find('.el-checkbox__input').removeClass('is-checked')
        })

      },
      toRight: function () {
        let arr = this.$refs.tree.getCheckedNodes();
        const _vue = this;
        $.each(arr, function (i, data) {
          if (data.is_leaf) {
            let flag = true;

            $.each(_vue.rightData, function (key, value) {
              if (value._id == data._id) {
                flag = false;
                _vue.alert('请勿重复添加')
              }
            });

            if (flag) {
              _vue.rightData.push(data)
            }

          }
        });
        this.$refs.tree.setCheckedKeys([]);
      },

      chooseR: function (e) {
//        const _self = $(e.target).closest('.el-checkbox__input');
//        const _id = _self.next().data('key');
//
//        this.rightToLeftId.push(_id);
//        if (_self.hasClass('is-checked')) {
//          _self.removeClass('is-checked')
//        } else {
//          _self.addClass('is-checked')
//        }


        const _vue = this;
        //勾选
        const _self = $(e.target).closest('.el-checkbox__input');
        if (_self.hasClass('is-checked')) {
          _self.removeClass('is-checked')
        } else {
          _self.addClass('is-checked')
        }

        //计算哪些被勾选
        const _right = $("#choose-pa").find('.rightData-content');
        this.rightToLeftId = [];
        _right.find('.el-checkbox__input').each(function () {
          if ($(this).hasClass('is-checked')) {
            _vue.rightToLeftId.push($(this).next().data('key'))
          }
        });


      },
      getD: function () {
        const _vue = this;
        this.loadingPA = true;
        this.myAxios({
          url: 'biomeddb/panel/suggest',
          method: 'post',
//          data:this.hasHpo
          data: {
            hpos: this.hasHpo
          }
        }).then(function (resp) {
          _vue.loadingPA = false;
          let results = resp.data.panels;
          _vue.$emit('getGenes', resp.data.genes); //函数名和父元素的@onEnter一致

          _vue.leftData = [];

          $.each(results, function (i, data) {
            data.name = data.name + '(' + data.genes.now.length + '/' + data.genes.total.length + ')';
            $.each(data.children, function (key, value) {
              value.name = value.name + '(' + value.genes.now.length + '/' + value.genes.total.length + ')';
            })
          });
          _vue.leftData = results;

        }).catch(function (error) {
          _vue.catchFun(error)
        })
      }
    },
  }
</script>


<style scoped lang="less">
  .transfer {
    .t-left, .t-right {
      border: 1px solid #e6ebf5;
      border-radius: 4px;
      background: #fff;
      padding: 0;
      height: 600px;
      /*min-height: 400px;*/
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
    .el-tree {
      max-height: 500px;
      margin: 10px 0;
      overflow-y: auto;
    }

  }
</style>
