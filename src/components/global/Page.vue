<!--页码-->
<template>
  <div class="text-right">
    页数
    <select class="black" name="" id="page-select" panelheight="auto" v-model="currentPage" @click="showSize" @blur="hideSize">
      <option v-for="page in allPage" :value="page" @click.stop="hideSize">{{page}}</option>
    </select>
    <span class="black c-a-page">{{currentPage}}/{{allPage}}</span>
    <span class="lr-content"> <!--左右按钮-->
      <span @click="currentPage !==1 && --currentPage"
            :class="{'left-no':currentPage === 1,'left-yes':currentPage !==1}"
      ></span>
      <span @click="currentPage !==allPage && ++currentPage"
            :class="{'right-no':currentPage === allPage,'right-yes':currentPage !==allPage}"
      ></span>
    </span>
    <span class="fl-content"><!--第一和最后-->
      <span @click="toFirst" :class="{'first-no':currentPage===1,'first-yes':currentPage!==1}"
      ></span>
      <span @click="toLast"
            :class="{'last-no':currentPage===allPage,'last-yes':currentPage!==allPage}"></span>
    </span>
    <input type="text" class="page-input" v-model="inputValue" @keyup.enter="jump">
    <span :class="{'jump-no':!usableInput,'jump-yes':usableInput}" @click="jump"></span>
  </div>
</template>

<script>
  export default {
    props: ['childCount', 'childReset'],
    data: function () {
      return {
        currentPage: 1,
        inputValue: 1,
        usableInput: false
      }
    },
    watch: {
      currentPage: function () {
        this.inputValue = this.currentPage;
        this.$emit('childCurrent', this.currentPage)
      },
      inputValue: function () {
        this.usableInput = !(!/^\+?[1-9][0-9]*$/.test(this.inputValue) || this.inputValue > this.allPage || this.inputValue == this.currentPage);
      },
      childReset:function () {
        if(this.childReset){
          this.currentPage = 1;
        }
      }
    },
    methods: {
      showSize:function () {
//        const length = this.allPage;
//        const _select = $("#page-select");
//        if(length>5){
//          _select.attr('size',5)
//        }else{
//          _select.attr('size',length)
//        }
      },
      hideSize:function () {
//        $("#page-select").attr("size",0)
      },
      jump: function () {
        if (!this.usableInput) {
//          alert('请输入正确的页码！');
        } else {
          this.currentPage = this.inputValue;
        }
      },
      toFirst: function () {
        this.currentPage = 1;
      },
      toLast: function () {
        this.currentPage = this.allPage;
      }
    },
    computed: {
      allPage: function () {
        return Math.ceil(this.childCount / 15) ? Math.ceil(this.childCount / 15): 1;
      }
    }
  }
</script>

<style scoped lang="less">
  .transform-deg (@deg: 180deg) {
    transform: rotate(@deg);
    -ms-transform: rotate(@deg); /* IE 9 */
    -moz-transform: rotate(@deg); /* Firefox */
    -webkit-transform: rotate(@deg); /* Safari 和 Chrome */
    -o-transform: rotate(@deg); /* Opera */
  }

  .text-right {
    margin-top: 20px;
    select {
      width: 57px;
      margin: 0 5px;
    }


    /*如果要设置高度*/
    /*.c-a-page{*/
      /*margin-left: 70px;*/
    /*}*/
    /*select{*/
      /*position: absolute;*/
      /*z-index: 10;*/
    /*}*/
    /*结束*/
    .black {
      color: black;
    }
    .lr-content {
      margin: 0 5px;
      span {
        display: inline-block;
        height: 13px;
        width: 13px;
      }
      span:first-child {
        /*margin-right: 10px;*/
      }


      .left-no { /*b5b6b6-NO  6d6e76-YES*/
        background: url(../../../static/img/pageAll-1.png) no-repeat 0 2px;
        cursor: not-allowed;
      }
      .left-yes {
        background: url(../../../static/img/pageAll-1.png) no-repeat 0 2px;
        cursor: pointer;
      }
      .left-yes:active{
        background: url(../../../static/img/pageAll-2.png) no-repeat 0 2px;
        cursor: pointer;
      }


      .right-no {
        cursor: not-allowed;
        background: url(../../../static/img/pageAll-1.png) no-repeat 0 1px;
        .transform-deg
      }
      .right-yes {
        cursor: pointer;
        background: url(../../../static/img/pageAll-1.png) no-repeat 0 1px;
        .transform-deg
      }
      .right-yes:active{
        background: url(../../../static/img/pageAll-2.png) no-repeat 0 1px;
      }
    }
    .fl-content {
      margin: 0 5px;
      span {
        display: inline-block;
        height: 13px;
        width: 13px;
      }
      span:first-child {
        margin-right: 10px;
      }
      .first-no {
        background: url(../../../static/img/pageAll-1.png) no-repeat -38px 2px;
        cursor: not-allowed;
      }
      .first-yes {
        background: url(../../../static/img/pageAll-1.png) no-repeat -38px 2px;
        cursor: pointer;
      }
      .first-yes:active{
        background: url(../../../static/img/pageAll-2.png) no-repeat -38px 2px;
      }
      .last-no {
        background: url(../../../static/img/pageAll-1.png) no-repeat -38px 1px;
        .transform-deg;
        cursor: not-allowed;
      }
      .last-yes {
        background: url(../../../static/img/pageAll-1.png) no-repeat -38px 1px;
        .transform-deg;
        cursor: pointer;
      }
      .last-yes:active{
        background: url(../../../static/img/pageAll-2.png) no-repeat -38px 1px;
      }
    }
    .page-input {
      width: 30px;
      height: 23px;
      margin-left: 5px;
      text-align: center;
    }
    .jump-no {
      display: inline-block;
      width: 17px;
      height: 13px;
      background: url(../../../static/img/page-jump-no.png);
      cursor: not-allowed;
    }
    .jump-yes {
      display: inline-block;
      width: 17px;
      height: 13px;
      background: url(../../../static/img/page-jump-yes.png);
      cursor: pointer;
    }
  }
</style>
