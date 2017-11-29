
<!--各种分析结果页面，疾病那一行-->
<template>
  <ul class="left-ul">
    <li class="active" id="li-0">
      <div class="father">
        <span class="img analyze-flow"></span>
        <span>分析流程</span>
        <i class="triangle"></i>
        <img src="../../../static/img/under-left-1.png" alt="">
      </div>
      <div class="children" @click.stop="">
        <router-link to="/dataA/foo/sgList" class="block" data-code="grandmgd">单基因遗传病检测</router-link>
        <router-link to="/dataA/foo/mtList" class="block" data-code="grandmito">线粒体检测</router-link>
      </div>
    </li>
    <li id="li-1">
      <div class="father">
        <span class="img analyze-soft"></span>
        <span>分析软件</span>
        <i class="triangle"></i>
        <img src="../../../static/img/under-left-1.png" alt="">
      </div>
      <div class="children" @click.stop=""  style="display: none">
        <router-link to="/dataA/foo/cnvList" class="block" data-code="grandwcnv">低深度全基因CNV检测</router-link>
        <router-link to="/dataA/foo/snvList" class="block" data-code="grandanno">SNV注释</router-link>
      </div>
    </li>
    <li id="li-2">
      <div class="father">
        <span class="img analyze-tool"></span>
        <span>实用工具</span>
        <i class="triangle"></i>
        <img src="../../../static/img/under-left-1.png" alt="">
      </div>
      <div class="children" @click.stop=""  style="display: none">
        <router-link to="/dataA/foo/trioList" class="block" data-code="grandtrio">核心家系分析</router-link>
        <router-link to="/dataA/foo/genotype" class="block" data-code="grandanno">表型</router-link>
      </div>
    </li>
  </ul>
</template>

<script>

  export default {
    data: function () {
      return {

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
      getActive: function () {  //通过子页面判断左边具体的active
        const currentPath = this.$router.currentRoute.name;
        let _li = '';
        if(currentPath == 'dataA-sgList'||currentPath=='dataA-mtList'){
          _li = $("#li-0");
        }else if(currentPath == 'dataA-cnvList'|| currentPath =='dataA-annoList'){
          _li = $("#li-1");
        }else if(currentPath == 'dataA-trioList'|| currentPath == 'dataA-genotype'){
          _li = $("#li-2")
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
  @tableSha: rgb(185, 184, 184);
  @in: rgb(14, 125, 195);
  @inBc: rgb(220, 238, 249);
  @color: rgb(49, 49, 49);
  @tdBorder: rgb(225, 226, 227);
  @trHover: rgb(255, 245, 231);
  @trIn: rgb(255, 236, 210);
  @interleave: rgb(246, 248, 250);



  .left-ul {
    position: absolute;
    z-index: 20;
    float: left;
    width: 250px;
    /*min-height: calc(~'100vh - 58px');*/
    /*height: 100%;*/
    margin: 0;
    padding: 0;
    color: @color;
    li {
      cursor: pointer;
    }
    li.active {
      background-color: #fff;
      .father {
        .triangle {
          opacity: 1;
        }
        border-right: 1px solid @triangle-color;
        color: @in;
      }
    }
    .father {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #d3d4d4;
      border-top: 1px solid #fbfbfb;
      font-weight: bold;
      .img {
        float: left;
        width: 16px;
        height: 25px;
        margin: 6px 12px 0 20px;
      }
      img {
        float: right;
        margin: 16px 20px 0 0;
      }
      .triangle {
        float: right;
        width: 0;
        height: 0;
        margin-top: 4px;
        border-top: 15px solid transparent;
        border-right: 18px solid @triangle-color;
        border-bottom: 15px solid transparent;
        opacity: 0;
      }
    }
    .children {
      /*display: none;*/
      border-top: 1px solid #fbfbfb;
      border-bottom: 1px solid #d3d4d4;
      font-size: 13px;
      a {
        height: 25px;
        line-height: 25px;
        color: inherit;
        padding-left: 23px;
      }
      a.active, a:hover, .router-link-active, .router-link-active:hover {
        color: @in;
        background-color: @inBc;
      }
    }
  }

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

