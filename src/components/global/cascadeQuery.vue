<!--模糊搜索框-->
<template>
  <div class="fuzzy-content" id="cascade-content">
    <div class="left">
      <span class="title bold">检测项目：</span>
      <el-cascader
        placeholder="可搜索"
        :options="leftData"
        :show-all-levels=false
        :clearable=true
        expand-trigger="hover"
        :props="{value:'id',label:'name',children:'subpanels'}"
        @change="fillPanel"
        filterable
      ></el-cascader>
    </div>

    <div class="right">
      <span class="title bold">已选项目：</span>
      <div class="has-panel lage-w inline">
        <span class="hasPanel-one" :data-key="list.id" @click="rightRemove(list.id)" v-for="list in rightData" :title="list.vueShow">
          <span class='hasPanel-name'>{{list.vueShow}}</span>
          <span class="close">&times;</span>
        </span>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    props: ['leftData', 'placeholder', 'title', 'leftName','rightData'],
    data: function () {
      return {
        subPanelsArr: [],
//        rightData:[]
      }
    },
    watch: {
      leftData: function (newData) {
        const _vue = this;
        $.each(newData,function (i,data) {
          data.vueShow = data.name;
          $.each(data.subpanels,function (k1,k2) {
            k2.vueShow = k2.name+'('+k2.code+')';
            _vue.subPanelsArr.push(k2)
          })
        });
      }
    },
    methods: {
      fillPanel: function (arr) {
        const _vue = this;
        let subPanelsArr = this.subPanelsArr;
        const arrId = arr[1];

        let flag = true;
        $.each(_vue.rightData,function (i,data) {
          if(data.id == arrId){
            flag = false;
            _vue.$message({
//              showClose: true,
              message: '请勿重复添加',
              type: 'warning'
            });
          }
        });

        if(flag){
          $.each(subPanelsArr,function (i,data) {
            if(data.id == arrId){
              _vue.rightData.push(data)
            }
          })
        }
      },
      rightRemove: function (originalKey) {
        const _vue = this;
        let spliceIndex = 0;
        $.each(this.rightData, function (i, data) {
          if (originalKey == data.id) {
            spliceIndex = i;
          }
        });
        _vue.rightData.splice(spliceIndex, 1);
      },
    },
  }
</script>

<style scoped lang="less">
  @border: #d3d3d3;
  @bc: rgb(240, 244, 247);
  #cascade-content {
    height: 150px;
    overflow: hidden;
    .title {
      display: inline-block;
      width: 20%;
    }
    .content {
      width: 50%;
      position: relative;
      font-size: 12px;
    }
    .lage-w {
      width: 70%;
    }
    .left, .right {
      width: 49%;
      float: left;
    }
    .left {
        .el-cascader{
          width: 50%;
        }
    }
    .right {
      .title {
        float: left;
        width: 20%;
      }
      .has-panel {
        height: 120px;
        overflow-y: auto;
        border: 1px solid #d4d4d4;
        font-size: 12px;
        .hasPanel-one {
          position: relative;
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
            margin-top: 5px;
            position: absolute;
            right: 10px;
            font-size: 14px;
          }
        }
      }
    }
  }
</style>
