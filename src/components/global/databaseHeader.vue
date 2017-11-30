
<!--各种分析结果页面，疾病那一行-->
<template>
  <ul class="left-ul">
    <li class="active" id="li-0" @click="toPage('/disease')">
      <div class="father">
        <span class="img analyze-flow"></span>
        <span>疾病档案库</span>
        <i class="triangle"></i>
      </div>
    </li>
    <li id="li-1" @click="toPage('/gene')">
      <div class="father">
        <span class="img analyze-soft"></span>
        <span>基因档案库</span>
        <i class="triangle"></i>
        <!--<img src="../../../static/img/under-left-1.png" alt="">-->
      </div>
      <!--<div class="children" @click.stop=""  style="display: none">-->
        <!--<router-link to="/dataA/foo/cnvList" class="block" data-code="grandwcnv">低深度全基因CNV检测</router-link>-->
        <!--<router-link to="/dataA/foo/snvList" class="block" data-code="grandanno">SNV注释</router-link>-->
      <!--</div>-->
    </li>
    <li id="li-2" @click="toPage('/phenotype')">
      <div class="father">
        <span class="img analyze-tool"></span>
        <span>表型档案库</span>
        <i class="triangle"></i>
        <!--<img src="../../../static/img/under-left-1.png" alt="">-->
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
      toPage:function (path) {
        this.$router.push(path)
      },
      getActive: function () {  //通过子页面判断左边具体的active
        const currentPath = this.$router.currentRoute.name;
        $(".left-ul").find('>.active').removeClass('active');
        let _li = '';
        if(currentPath == 'disease'){
          _li = $("#li-0");
        }else if(currentPath == 'gene' || currentPath == 'geneD'){
          _li = $("#li-1");
        }else if(currentPath == 'phenotype'  || currentPath=='omim'){
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

