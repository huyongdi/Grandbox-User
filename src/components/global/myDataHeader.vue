
<!--各种分析结果页面，疾病那一行-->
<template>
  <ul class="left-ul">
    <li class="active" id="li-0">
      <div class="father" @click.self="upDown">
        <span class="img analyze-flow"></span>
        <span>我的样本</span>
        <i class="triangle"></i>
      </div>
      <div class="children" @click.stop="" style="display: block">
        <router-link to="/myData" class="block no-d">样本列表</router-link>
        <router-link to="/addSample" class="block no-d">添加样本</router-link>
        <router-link v-if="inDetail" to="/sampleD" class="block no-d">样本详情</router-link>
        <router-link v-if="inResult" to="/result" class="block no-d">结果详情</router-link>
        <!--<a class="block no-d" id="sampleD-a">样本详情</a>-->
        <!--<a class="block no-d">结果详情</a>-->
      </div>
    </li>
    <!--<li id="li-1" @click="toPage('/addSample')">-->
      <!--<div class="father">-->
        <!--<span class="img analyze-soft"></span>-->
        <!--<span>添加样本</span>-->
        <!--<i class="triangle"></i>-->
      <!--</div>-->
    <!--</li>-->
    <!--<li id="li-2" @click="toPage('')">-->
      <!--<div class="father">-->
        <!--<span class="img analyze-tool"></span>-->
        <!--<span>样本详情</span>-->
        <!--<i class="triangle"></i>-->
      <!--</div>-->
    <!--</li>-->
    <li id="li-1" @click="toPage('')">
      <div class="father">
        <span class="img analyze-tool"></span>
        <span>统计</span>
        <i class="triangle"></i>
      </div>
    </li>
  </ul>
</template>

<script>

  export default {
    data: function () {
      return {
        inDetail:'',
        inResult:'',
      }
    },
    watch: {
      '$route' (to, from) {

      }
    },
    mounted:function () {
      this.getActive();
    },
    methods: {
      toPage:function (path) {
        if(path){
          this.$router.push(path)
        }
      },
      getActive: function () {  //通过子页面判断左边具体的active
        const currentPath = this.$router.currentRoute.name;
        this.inDetail = '';
        this.inResult = '';
//        $(".left-ul").find('>.active').removeClass('active');
        let _li = '';
        if(currentPath == 'myData' || currentPath == 'addSample' || currentPath =='sampleD'){
          _li = $("#li-0");
          if(currentPath == 'sampleD'){
            this.inDetail = true
          }else if(currentPath == 'result'){
            this.inResult = true;
          }
        }else if(currentPath == ''){
          _li = $("#li-1");
        }
        if(_li && !_li.hasClass('active')){
          _li.addClass('active');
          _li.find('.children').slideToggle()
        }
      },
    }
  }
</script>

<style scoped lang="less">

  @triangle-color: rgb(0, 118, 192);
  @border: rgb(168, 185, 209);
  @in: rgb(14, 125, 195);
  @inBc: rgb(220, 238, 249);
  @color: rgb(49, 49, 49);
      .left-ul {
        .analyze-flow {
          background: url(../../../static/img/all-1.png) 0 400px;
        }
        .analyze-soft{
          background: url(../../../static/img/all-1.png) 0 374px;
        }
        .analyze-tool{
          background: url(../../../static/img/all-1.png) 0 346px;
        }
        .task-genotype {
          margin-top: 3px;
          background: url(../../../static/img/all-1.png) 0 80px;
        }
        .active {
          .analyze-flow {
            background: url(../../../static/img/all-1.png) 16px 400px;
          }
          .analyze-soft{
            background: url(../../../static/img/all-1.png) 16px 374px;
          }
          .analyze-tool{
            background: url(../../../static/img/all-1.png) 16px 346px;
          }
          .task-genotype {
            background: url(../../../static/img/all-1.png) 16px 80px;
          }
          .father{
            img{
              transform:rotate(180deg);
              -ms-transform:rotate(180deg); 	/* IE 9 */
              -moz-transform:rotate(180deg); 	/* Firefox */
              -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
              -o-transform:rotate(180deg); 	/* Opera */
            }
          }
        }
      }
      .shadow#home-content {
        background: #fff;
        margin-top: 20px;
        .title {
          height: 60px;
          line-height: 60px;
          color: rgb(67, 67, 67);
          font-size: 16px;
          padding-left: 40px;
          border-bottom: 1px solid rgb(221, 221, 221);
        }
        .content {
          padding: 0 90px;
          .row.search-content {
            text-align: center;
            margin-top: 140px;
            margin-bottom: 70px;
            input {
              width: 250px;
            }
            .remove-input {
              position: relative;
              display: inline-block;
              border-radius: 3px;
              margin-left: -7px;
              height: 28px;
              vertical-align: top;
              background: linear-gradient(to bottom, #f46554, #ea533f);
              >img{
                height: 27px;
              }
              .search {
                cursor: pointer;
                display: inline-block;
                width: 35px;
                &:active {
                  background: linear-gradient(to bottom, #ea533f, #f46544);
                  border-radius: 3px 0 0 3px;
                }
                img {
                  margin-left: 5px;
                  margin-top: 2px;
                }
              }
              .select {
                cursor: pointer;
                display: inline-block;
                width: 24px;
                height: 24px;
                &:active {
                  background: linear-gradient(to bottom, #ea533f, #f46544);
                  border-radius: 0 3px 3px 0;
                }
                img {
                  margin-right: 5px;
                }
              }
              .select-div {
                position: absolute;
                width: 100px;
                img {
                  position: absolute;
                  right: 37px;
                  z-index: 10;
                }
                ul {
                  position: absolute;
                  top: 8px;
                  width: 100px;
                  /*height: 77px;*/
                  height: 52px;
                  li {
                    height: 25px;
                  }
                }
              }
            }
          }
          .topRow {
            margin: 50px 0 40px 0;
            img {
              float: left;
              margin-right: 20px;
            }
            .right {
              float: left;
              .right-title {
                font-weight: bold;
                margin: 5px 0 8px 0;
              }
              .remark {
                max-width: 210px;
                font-size: 12px;
              }
            }
          }
        }
      }



</style>

