<template>
  <div id="gene-d" class="p-div">
    <div class="title">
      【基因】AVP
    </div>

    <div class="content-one">
      <div class="header" @click.self="showContent">
        <span class="fa fa-chevron-down"></span>基本信息
      </div>
      <div class="content" style="display: block">
        <table class="special-table">
          <tbody>
            <tr>
              <td class="t-bc">基因大小</td>
              <td>2169</td>
              <td class="t-bc">基因位置</td>
              <td>2169</td>
            </tr>

            <tr>
              <td class="t-bc">基因全称</td>
              <td>2169</td>
              <td class="t-bc">别名</td>
              <td>2169</td>
            </tr>

            <tr>
              <td class="t-bc">外部编号</td>
              <td colspan="3">
                <a class="img-a" target="_blank" href="https://www.genenames.org/cgi-bin/gene_symbol_report?hgnc_id=894">
                  <img src="../../static/img/hgnc.jpg" alt="">
                </a>
                <a class="img-a mr-left15" target="_blank" href="https://www.genenames.org/cgi-bin/gene_symbol_report?hgnc_id=604831">
                  <img src="../../static/img/omim.jpg" alt="">
                </a>
              </td>
            </tr>

            <tr>
              <td class="t-bc">转录本->蛋白</td>
              <td colspan="3">NM_000490.4(大小:619)--> NP_000481.2(大小:164,蛋白质大小:NA) </td>
            </tr>

          <tr>
            <td class="t-bc">携带致病突变病例</td>
            <td>0</td>
            <td class="t-bc">收录变异</td>
            <td>0</td>
          </tr>

          <tr>
            <td class="t-bc">简介</td>
            <td colspan="3">xxxxxxxxxx</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="content-one">
      <div class="header" @click.self="showContent">
        <span class="fa fa-chevron-down"></span>疾病和表型
      </div>
      <div class="content disease-phenotype" style="display: block">
        <div class="left">
          <div class="title">疾病相关表型 （总病例数： 0 ）</div>
          <ul>
            <li>埃利伟氏综合症 （外显病例： 0 ）</li>
          </ul>
        </div>
        <div class="right">
          <div class="title">基因相关表型 （总病例数： 0 ）</div>
          <ul>
            <li>房间隔缺陷 （外显病例： 0 )</li>
            <li>房间隔缺陷 （外显病例： 0 )</li>
            <li>房间隔缺陷 （外显病例： 0 )</li>
            <li>房间隔缺陷 （外显病例： 0 )</li>
            <li>房间隔缺陷 （外显病例： 0 )</li>
          </ul>
        </div>
      </div>
    </div>


    <div class="content-one">
      <div class="header" @click.self="showContent">
        <span class="fa fa-chevron-down"></span>详情
      </div>
      <div class="content" style="display: block">
        该基因编码的蛋白含有亮氨酸拉链和一个跨膜结构域。已发现该基因与埃利伟氏综合症和Weyers颅面骨发育不全有关。
      </div>
    </div>

    <div class="content-one">
      <div class="header" @click.self="showContent">
        <span class="fa fa-chevron-down"></span>参考资料
      </div>
      <div class="content" style="display: block">
        该基因编码的蛋白含有亮氨酸拉链和一个跨膜结构域。已发现该基因与埃利伟氏综合症和Weyers颅面骨发育不全有关。
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {}
    },
    mounted: function () {

    },
    methods: {
      showContent:function (e) {
        const _header = $(e.target);
        const _span = _header.find('.fa');
        _header.next().slideToggle();
        if(_span.hasClass("fa-chevron-right")){
          _span.removeClass('fa-chevron-right').addClass("fa-chevron-down")
        }else{
          _span.removeClass('fa-chevron-down').addClass("fa-chevron-right").addClass('abc')
        }
      }
    },
    filter: {}
  }
</script>

<style scoped lang="less">
  @in: rgb(14, 125, 195);
  #gene-d {
    .bc {
      background: #fff;
      -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
      font-weight: bold;
    }
    > .title {
      .bc;
      font-size: 16px;
      padding: 10px 20px;
    }
    > .content-one {
      .bc;
      background-color: #fff;
      margin: 20px 0;
      padding: 10px 0;
      .header {
        .fa {
          color: @in;
          margin-right: 15px;
          width: 14px;
          height: 14px;
        }
        position: relative;
        height: 42px;
        line-height: 42px;
        padding: 0 15px 0 35px;
        color: #333;
        cursor: pointer;
      }
      .content{
        padding: 15px 35px 15px;
        font-size: 12px;
      }
      .disease-phenotype{
        overflow: hidden;
        .title{
          margin-bottom: 15px;
          padding: 0 10px;
          line-height: 40px;
          height: 40px;
          background: #e4ecea;
          border-left: 3px solid #27a482;
          color: #333;
          overflow: hidden;
          font-size: 14px;
        }
        ul{
          margin-left: 12px;
          li{
            height: 33px;
            line-height: 33px;
            border-bottom: 1px dashed #ddd;
          }
        }
        .left,.right{
         float: left;
          width: 48%;
        }
        .left{
          margin-right:2%
        }
      }
    }
  }
</style>
