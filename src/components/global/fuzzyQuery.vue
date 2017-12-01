<!--模糊搜索框-->
<template>
  <div class="fuzzy-content row fuzzy-content">

    <div class="col-xs-6">
      <span class="name bold">{{leftName?leftName:'临床表型'}}</span>
      <div class="content inline" id="panel-1" @click.stop="">
        <input  v-model="fuzzyInput" :placeholder='placeholder' @keyup.enter="sendInput">
        <img src="../../../static/img/trio-2.png" alt="" @click.stop="sendInput">
        <ul class="hide-ul">
          <li v-for="list in leftData" :data-key="list.key"  @click="toRight(list)" :title="list.value">
            {{list.value}}
          </li>
          <!--<li v-show="leftData.length == 0">暂无数据</li>-->
        </ul>
      </div>
    </div>

    <div class="col-xs-6">
      <span class="name bold">已选表型</span>
      <div class="content inline lage-w" @click.stop="">
        <div class="has-panel">
          <span class="hasPanel-one" :data-key="list.key" @click="rightRemove(list.key)" v-for="list in rightData" :title="list.value">
            <span class='hasPanel-name'>{{list.value}}</span>
            <span class="close">&times;</span>
          </span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['leftData', 'placeholder', 'rightData','title','leftName'],
    data: function () {
      return {
        fuzzyInput: '',
        showPanel:''
      }
    },
    watch:{
      leftData:function (newData) {
        if(newData.length!==0){
          $(".hide-ul").css("border-bottom",'1px solid rgb(209, 209, 209)')
        }else{
          $(".hide-ul").css("border-bottom",'1px solid #fff')
        }
      }
    },
    methods: {
      toRight: function (list) {
        let flag = true;
        const _vue = this;

        $.each(_vue.rightData, function (i, data) {
          if (list.key === data.key) {
            _vue.$message({
              message: '请勿重复添加',
              type: 'warning'
            });
            flag = false;
          }
        });
        if (flag) {
          _vue.rightData.push(list)
        }
      },
      rightRemove: function (originalKey) {
        const _vue = this;
        let spliceIndex = 0;
        $.each(this.rightData, function (i, data) {
          if (originalKey == data.key) {
            spliceIndex = i;
          }
        });
        _vue.rightData.splice(spliceIndex, 1);
      },
      sendInput: function () {
        this.$emit('sendInput', this.fuzzyInput) //函数名和父元素的@onEnter一致
      }
    },
  }
</script>

<style scoped lang="less">
  @border: #d3d3d3;
  @bc:rgb(240,244,247);
  .fuzzy-content {
    height: 150px;
    overflow: hidden;
    .name{
      display: inline-block;
      width: 20%;
      /*text-align: right;*/
      margin-right: 3.8%;
    }
    .content{
      width: 50%;
      position: relative;
      font-size: 12px;
    }
    .lage-w{
      width: 70%;
    }
    .left,.right{
      width: 50%;
      float: left;
    }
    .col-xs-6{
      .content{
        input {
          height: 24px;
          line-height: 24px;
          padding-right: 24px;
          width: 100%;
          /*border-bottom: 1px solid #fff;*/
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
          z-index: 100;
          max-height: 100px;
          overflow-y: auto;
          border-right: 1px solid rgb(209, 209, 209);
          border-left: 1px solid rgb(209, 209, 209);
          /*border-bottom: 1px solid rgb(209, 209, 209);*/

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
    .col-xs-6{
      .name{
        float: left;
      }
      .content{
        float: left;
        .has-panel {
          height: 120px;
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
              background-color: rgb(220,238,249);

            }
            .hasPanel-name{
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 100%;
              float: left;
            }
            .close{
              margin-top: 5px;
              position: absolute;
              right: 10px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
</style>
