<!--suppress HtmlUnknownTag -->
<template>
  <div class="p-div" id="result-content">

    <div class="done-list">
      <div class="title">
        <span class="title-b">任务结果</span>
        <span class="title-s"><{{sampleSn}}：{{patient.name}}({{patient.gender}})</span>

        <div class="bold to-report">基因分析报告 :
          <router-link target="_blank" class="common-a" :to="{path:'/report',query:{sn:sn}}">点击查看</router-link>
        </div>

      </div>
      <div class="all-content">
        <div class="title-list">
          <div @click="changeContent" data-type="1" class="title-single active">核基因组检测</div>
          <div @click="changeContent" data-type="2" class="title-single">线粒体环基因组检测</div>
        </div>
        <div class="detail-content">
          <div class="content-1" :class="{hide:!in1}">
            <div class="top-content">
              <span class="con"><span class="title red">已选条件：</span>
                <span v-if="hasCondition.length">{{hasCondition.join('，')}}</span>
                <span v-else="">无</span>
              </span>

              <div class="detail-btn-content rea">
                <!--<span class="my-btn refresh" @click="resetFilterAndRe"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>-->
                <!--<span class="my-btn" :class="{'light-btn':lists1.length == 0 && doneHttp}" @click.stop="filtrateShowEditFun" @click=""><img-->
                  <!--src="../../static/img/red-edit.png" alt="">修改数据</span>-->
                <span class="my-btn pull-right condition" :class="{'light-search':lists1.length == 0 && doneHttp}"
                      @click.stop="filtrateShowFun"><img src="../../static/img/red-con.png" alt="">筛选条件</span>
                <!--筛选条件弹框-->
                <div class="filtrate-content hide" @click.stop="" id="filtrate-content">
                  <img src="../../static/img/th-1.png" alt="" class="up">
                  <div class="title">搜索选项</div>
                  <div class="content">
                    <div class="single">
                      <div class="left" data-name="report">数据库报道：</div>
                      <div class="right">
                        <span class="option" data-value="p" data-database="1">致病性</span>
                        <span class="option" data-value="o" data-database="1">其他</span>
                        <span class="option" data-value="f" data-database="1">未报道</span>
                        <span class="option in default">不筛选</span>
                        <i class="fa fa-question-circle-o po flag-q" data-toggle="tooltip" data-placement="top"
                           data-html="true" data-title="<div style='text-align:left'>致病性满足任一条件：</div>
                                             <div style='text-align:left;padding-left:5px'>1.CLINVAR包含Pathogenic</div>
                                             <div style='text-align:left;padding-left:5px'>2.CLINVAR包含Likely pathogenic</div>
                                             <div style='text-align:left;padding-left:5px'>3.HGMD为DM</div>">
                        </i>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="inheritance">遗传模式：</div>
                      <div class="right">
                        <span class="option in default" data-value="All">全部</span>
                        <span class="option" data-value="AR">AR</span>
                        <span class="option" data-value="AD">AD</span>
                        <span class="option" data-value="XR">XR</span>
                        <span class="option" data-value="XD">XD</span>
                        <span class="option" data-value="X-linked">X-LINKED</span>
                        <span class="option" data-value="Y-linked">Y-LINKED</span>
                        <span class="option" data-value="Other">其他</span>
                        <span class="option" data-value="irre">无关</span>
                        <span class="option">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="func">突变类型：</div>
                      <div class="right">
                        <span class="option" data-value="stopgain">stopgain</span>
                        <span class="option" data-value="stoploss">stoploss</span>
                        <span class="option" data-value="nonsyn">错义</span>
                        <span class="option" data-value="splic">剪接</span>
                        <span class="option" data-value="frameshift">插入缺失</span>
                        <span class="option in default">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="ratio">突变比例：</div>
                      <div class="right">
                        <span class="option" data-value="0.9-1">0.9-1</span>
                        <span class="option" data-value="0.2-0.9">0.2-0.9</span>
                        <span class="option" data-value="0-0.2">0-0.2</span>
                        <span class="option in default">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="gatkpass">gatkFilter：</div>
                      <div class="right">
                        <span class="option" data-value="true">PASS</span>
                        <span class="option" data-value="false">其他</span>
                        <span class="option in default">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="depth">测序深度：</div>
                      <div class="right">
                        <span class="option" data-value="10-20">10-20</span>
                        <span class="option" data-value=">20">>20</span>
                        <span class="option in default">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="dbfreq">普通人群携带率低于：</div>
                      <div class="right">
                        <span class="option" data-value="0">0</span>
                        <span class="option" data-value="0.0001">0.01%</span>
                        <span class="option" data-value="0.001">0.1%</span>
                        <span class="option" data-value="0.01">1%</span>
                        <span class="option in default">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="status">报告：</div>
                      <div class="right">
                        <span class="option" data-value="major" data-effect='flag'>主要</span>
                        <span class="option" data-value="minor" data-effect='flag'>次要</span>
                        <span class="option" data-value="all" data-effect='flag'>已标记</span>
                        <span class="option in default" data-effect='reset'>不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="genes">基因：</div>
                      <div class="right">
                        <textarea placeholder='请用逗号或换行隔开' v-model="geneTextArea"></textarea>

                      </div>
                    </div>
                  </div>
                  <span class="my-btn search-btn" @click="filter"><img src="../../static/img/red-con.png" alt="">搜索</span>
                  <span class="my-btn refresh" @click="resetFilter"><img src="../../static/img/red-refresh.png"
                                                                         alt="">重置</span>
                </div>
                <!--修改数据弹框-->
                <div class="filtrate-content hide" id="filtrate-content-edit">
                  <img src="../../static/img/th-1.png" alt="" class="up">
                  <ul>
                    <li @click="showPanelModal">修改基因信息</li>
                    <li @click="showGenoModal">修改表型信息</li>
                  </ul>
                </div>
              </div>
            </div>

            <table class="table my-table" id="table-1">
              <thead>
              <tr>
                <th>位点</th>
                <th style="width: 95px">携带病例
                  <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                     data-original-title="我的所有样本/所有用户的样本">
                  </i>
                </th>
                <th>基因</th>
                <th>区域</th>
                <th>功能</th>
                <th>疾病</th>

                <th>纯杂合</th>
                <th>gatkFilter</th>

                <th>深度</th>
                <th>变异比例(%)</th>
                <th>变异信息</th>
                <th style="width: 115px">报告状态</th>
              </tr>
              </thead>
              <tbody>

              <tr v-for="(data,index) in lists1" :class="{'tr-bc':index%2}">
                <td class="">
                  <router-link class="po common-a" v-if="data.snv && data.snv.variant" target="_blank" :to="{path:'/variationD',query:{id:sn}}"
                               title="查看变异详情">
                    {{data.snv.variant.chrom}}:{{data.snv.variant.start}}:{{data.snv.variant.end}}:{{data.snv.variant.ref}}:{{data.snv.variant.alt}}
                  </router-link>
                </td>
                <td>
                  <span v-if="data.record_count">{{data.record_count.private}} / {{data.record_count.public}}</span>
                </td>
                <td class="warp">
                  <div v-if="data.snv && data.snv.annotation" v-for="geneSingle in data.snv.annotation.gene.symbols">
                    <router-link class="po common-a" target="_blank" :to="{path:'/geneD',query:{id:geneSingle}}">
                      {{geneSingle}}
                    </router-link>
                  </div>
                </td>
                <td class="warp">
                  <span v-if="data.snv &&data.snv.annotation">{{data.snv.annotation.regions.join(',')}}</span>
                </td>
                <td>
                  <span v-if="data.snv &&data.snv.annotation">{{data.snv.annotation.funcs.join(',')}}</span><span v-else="">-</span>
                </td>
                <!--<diseaseTd style="max-width: 250px" class="warp" :diseases="data.diseases" @sendOmimId="getOmimId"></diseaseTd>-->
                <td></td>


                <td><span v-if="data.information">{{data.information.hom_het ? data.information.hom_het : '-'}}</span></td>
                <td><span v-if="data.information">{{data.information.gatk_filter ? data.information.gatk_filter : '-'}}</span></td>

                <td><span v-if="data.information">{{data.information.depth}}</span></td>
                <td><span v-if="data.information">{{data.information.ratio | getPercent}}</span></td>

                <td>
                  <div v-if="data.snv && data.snv.annotation">
                    <div v-for="single in data.snv.annotation.changes">{{single.gene}}:{{single.transcript}}:{{single.exon}}:{{single.na_change}}:{{single.aa_change}}</div>
                  </div>
                </td>

                <td>

                  <el-select v-model="data.edit.status" placeholder="" @change="changeStatus(data._id,data.edit.status)">
                    <el-option label="主要" value="主要"></el-option>
                    <el-option label="次要" value="次要"></el-option>
                    <el-option label="未报告" value="未报告"></el-option>
                  </el-select>

                   <!--<span v-if="data.edit"-->
                         <!--:class="{ active1: data.edit.status=='major',active2: data.edit.status=='minor',active3: data.edit.status=='benign',active4: data.edit.status=='invalid'}">-->
                    <!--{{data.edit.status | getStatus}}-->
                  <!--</span>-->
                </td>
              </tr>

              <tr v-if="lists1.length == 0 && doneHttp">
                <td colspan="11" class="center noResult-td">
                  <!--当前暂无筛选结果，请尝试在页面上方修改信息或筛选条件-->
                  <img src="../../static/img/no-result-1.png" alt="">
                </td>
                <!--<td colspan="11" class="center" v-else="">暂无数据</td>-->
              </tr>

              </tbody>
            </table>
            <page :childCount="count1" :childReset="reset1" @childCurrent="getCurrent"></page>
          </div>
          <div class="content-2" :class="{hide:!in2}">
            <!--<div class="top-content">-->
            <!--<span class="con"><span class="title red">已选条件：</span>-->
            <!--<span v-if="hasCondition4.length">{{hasCondition4.join('，')}}</span>-->
            <!--<span v-else="">无</span>-->
            <!--</span>-->

            <!--<div class="detail-btn-content rea">-->
            <!--<span class="my-btn refresh" @click="resetFilterAndRe4"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>-->
            <!--<span class="my-btn" @click.stop="filtrateShowEditFun4" @click=""><img src="../../static/img/red-edit.png" alt="">修改数据</span>-->
            <!--<span class="my-btn pull-right condition" @click.stop="filtrateShow4Fun"><img src="../../static/img/red-con.png" alt="">筛选条件</span>-->
            <!--&lt;!&ndash;筛选条件弹框&ndash;&gt;-->
            <!--<div class="filtrate-content hide" id="filtrate-content-4" @click.stop="">-->
            <!--<img src="../../static/img/th-1.png" alt="" class="up">-->
            <!--<div class="title">搜索选项</div>-->
            <!--<div class="content">-->
            <!--<div class="single">-->
            <!--<div class="left" data-name="flag">旗标：</div>-->
            <!--<div class="right" id="flag-div-4">-->
            <!--<span class="option in default" data-value="r" data-mt="true">红</span>-->
            <!--<span class="option" data-value="y" data-mt="true">黄</span>-->
            <!--<span class="option" data-value="b" data-mt="true">蓝</span>-->
            <!--<span id="flag-all-4" class="option" data-value="all" @click.stop="" data-flag='allflag' data-mt="true">全部</span>-->
            <!--<a class="fa fa-question-circle-o po flag-q common-a" style="color: inherit" :href="manHtml+'help/document?id=1'"-->
            <!--target="_blank"></a>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="single">-->
            <!--<div class="left" data-name="clinvar">CLINVAR：</div>-->
            <!--<div class="right">-->
            <!--<span class="option" data-value="true" data-mt="true">已报道</span>-->
            <!--<span class="option" data-value="false" data-mt="true">未报道</span>-->
            <!--<span class="option in default" data-mt="true">不筛选</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="single">-->
            <!--<div class="left" data-name="mitipact">MITIPACT：</div>-->
            <!--<div class="right">-->
            <!--<span class="option" data-value="true" data-mt="true">已报道</span>-->
            <!--<span class="option" data-value="false" data-mt="true">未报道</span>-->
            <!--<span class="option in default" data-mt="true">不筛选</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="single">-->
            <!--<div class="left" data-name="mitomap">MITOMAP：</div>-->
            <!--<div class="right">-->
            <!--<span class="option" data-value="true" data-mt="true">已报道</span>-->
            <!--<span class="option" data-value="false" data-mt="true">未报道</span>-->
            <!--<span class="option in default" data-mt="true">不筛选</span>-->
            <!--</div>-->
            <!--</div>-->

            <!--<div class="single">-->
            <!--<div class="left" data-name="gatkpass">gatkFilter：</div>-->
            <!--<div class="right">-->
            <!--<span class="option" data-value="true" data-mt="true">PASS</span>-->
            <!--<span class="option" data-value="false" data-mt="true">其他</span>-->
            <!--<span class="option in default" data-mt="true">不筛选</span>-->
            <!--</div>-->
            <!--</div>-->

            <!--<div class="single">-->
            <!--<div class="left" data-name="dbfreq">普通人群携带率低于：</div>-->
            <!--<div class="right">-->
            <!--<span class="option" data-value="0" data-mt="true">0</span>-->
            <!--<span class="option" data-value="0.0001" data-mt="true">0.01%</span>-->
            <!--<span class="option" data-value="0.001" data-mt="true">0.1%</span>-->
            <!--<span class="option" data-value="0.01" data-mt="true">1%</span>-->
            <!--<span class="option in default" data-mt="true">不筛选</span>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="single">-->
            <!--<div class="left" data-name="grandfreq">本地人群携带率低于：</div>-->
            <!--<div class="right">-->
            <!--<span class="option" data-value="0" data-mt="true">0</span>-->
            <!--<span class="option" data-value="0.0001" data-mt="true">0.01%</span>-->
            <!--<span class="option" data-value="0.001" data-mt="true">0.1%</span>-->
            <!--<span class="option" data-value="0.01" data-mt="true">1%</span>-->
            <!--<span class="option in default" data-mt="true">不筛选</span>-->
            <!--</div>-->
            <!--</div>-->

            <!--<div class="single">-->
            <!--<div class="left" data-name="status">报告：</div>-->
            <!--<div class="right">-->
            <!--<span class="option" data-value="major" data-effect='flag' data-mt="true">主要</span>-->
            <!--<span class="option" data-value="minor" data-effect='flag' data-mt="true">次要</span>-->
            <!--<span class="option" data-value="all" data-effect='flag' data-mt="true">已标记</span>-->
            <!--<span class="option in default" data-effect='reset' data-mt="true">不筛选</span>-->
            <!--</div>-->
            <!--</div>-->

            <!--</div>-->
            <!--<span class="my-btn search-btn" @click="filter4"><img src="../../static/img/red-con.png" alt="">搜索</span>-->
            <!--<span class="my-btn refresh" @click="resetFilter4"><img src="../../static/img/red-refresh.png"-->
            <!--alt="">重置</span>-->
            <!--</div>-->
            <!--&lt;!&ndash;修改数据弹框&ndash;&gt;-->
            <!--<div class="filtrate-content hide" id="filtrate-content-edit4">-->
            <!--<img src="../../static/img/th-1.png" alt="" class="up">-->
            <!--<ul>-->
            <!--<li @click="showPanelModal">修改基因信息</li>-->
            <!--<li @click="showGenoModal">修改表型信息</li>-->
            <!--</ul>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<table class="table my-table" id="table-mt">-->
            <!--<thead>-->
            <!--<tr>-->
            <!--<th>位点-->
            <!--<i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"-->
            <!--data-original-title="红色代表最高级，黄色代表第二级，蓝色代表第三级">-->
            <!--</i>-->
            <!--</th>-->
            <!--<th style="width: 103px">基因</th>-->
            <!--<th style="width: 70px">区域</th>-->
            <!--<th>功能</th>-->
            <!--<th>疾病</th>-->
            <!--<th class="warp" style="width: 103px">CLINVAR-->
            <!--<i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"-->
            <!--data-original-title="O代表other,B代表Benign,LB代表Likely benign,P代表Pathogenic,LP代表Likely Pathogenic，NP代表not provided">-->
            <!--</i>-->
            <!--</th>-->
            <!--<th style="width: 70px">MITIMPACT</th>-->
            <!--<th style="width: 70px">MITOMAP</th>-->
            <!--<th style="width: 70px">人群频率(%)</th>-->
            <!--<th style="width: 70px">变异比例(%)</th>-->
            <!--<th style="width: 77px">报告状态</th>-->
            <!--</tr>-->
            <!--</thead>-->
            <!--<tbody>-->
            <!--<tr v-for="(data,index) in lists4" :class="{'tr-bc':index%2}">-->
            <!--<td>-->
            <!--<i title="查看详情" class="fa fa-font-awesome po" @click="showDetail(data,4,data.id)"-->
            <!--:class="{'text-1':data.level == 0,'text-2':data.level==1,'text-3':data.level==2}"></i>-->
            <!--<a class="po common-a" v-if="data.variant"-->
            <!--@click="showLocus(data.id,0,data.variant.chrom+':'+data.variant.start+':'+data.variant.end+':'+data.variant.ref+':'+data.variant.alt)">-->
            <!--<span>{{data.showLocusStr}}</span>-->
            <!--</a>-->
            <!--</td>-->
            <!--<td class="warp">-->
            <!--<span v-if="data.anno">-->
            <!--<a class="common-a block" v-for="sGene in data.anno.genes.symbols"-->
            <!--:href="dbHtml+'#/gene?geneValue='+data.anno.genes.symbols.join(',')">{{sGene}}</a>-->
            <!--</span>-->
            <!--</td>-->
            <!--<td class="warp"><span v-if="data.anno">{{data.anno.regions.join(',')}}</span></td>-->
            <!--<td><span v-if="data.anno &&data.anno.funcs.length!=0">{{data.anno.funcs.join(',')}}</span><span v-else="">-</span></td>-->
            <!--<diseaseTd :diseases="data.diseases" @sendOmimId="getOmimId"></diseaseTd>-->
            <!--<td>-->
            <!--<div v-if="data.anno">-->
            <!--<div v-for="clinvarSingle in data.anno.dbinfo.clinvar">-->
            <!--<span class="po bold" data-toggle="tooltip" data-placement="top"-->
            <!--:data-original-title='clinvarSingle.substring(0,clinvarSingle.indexOf(":"))'>-->
            <!--[{{clinvarSingle | clinvarFilterFirst}}]-->
            <!--</span>-->
            <!--({{clinvarSingle | clinvarFilterLast}})-->
            <!--</div>-->
            <!--</div>-->
            <!--</td>-->
            <!--<td v-if="data.anno">{{data.anno.dbinfo.mitimpact ? data.anno.dbinfo.mitimpact : '-'}}</td>-->
            <!--<td v-if="data.anno">{{data.anno.dbinfo.mitomap ? data.anno.dbinfo.mitomap : '-'}}</td>-->
            <!--<td v-if="data.anno">{{data.anno.freqs.mtdb | getPercent}}</td>-->
            <!--<td><span v-if="data.info && data.info.info">{{data.info.info.ratio | getPercent}}</span></td>-->
            <!--<td>-->
            <!--<span v-if="data.info&&data.info.edit" :class="{ active1: data.info.edit.status=='major',active2: data.info.edit.status=='minor',active3: data.info.edit.status=='benign',-->
            <!--active4: data.info.edit.status=='invalid'}">-->
            <!--{{data.info.edit.status | getStatus}}-->
            <!--</span>-->
            <!--</td>-->
            <!--</tr>-->

            <!--<tr v-if="lists4.length == 0 && doneHttp4">-->
            <!--<td colspan="12" class="center noResult-td">-->
            <!--<img src="../../static/img/no-result-1.png" alt="">-->
            <!--</td>-->
            <!--</tr>-->

            <!--</tbody>-->
            <!--</table>-->

            <!--<page :childCount="count4" :childReset="reset4" @childCurrent="getCurrent4"></page>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import page from './global/Page.vue'

  export default {
    components: {
      page: page
    },
    data: function () {
      return {
        in1: true,
        in2: '',
        sn: this.$route.query.id ? this.$route.query.id : 0,
        patient:'',
        sampleSn:'',
        //SNV
        hasCondition: [],
        page1: 1,
        reset1: 1,
        count1: 1,
        lists1: [],
        doneHttp: false,
        geneTextArea: '',
        //mito
      }
    },
    mounted: function () {
      this.getList1();
      this.showHasCondition();
      this.bindConClick();
    },
    methods: {

      bindConClick: function () {
        $('.option').on('click', function (e) {
          /*报告点主要次要的时候，旗标自动勾选全部*/
          $(this).parent().find('.in').removeClass('in');
          $(this).addClass('in')
        })
      },

      //SNV-变异详情逻辑
      getList1: function () {
        const _vue = this;
        let conditionStr='';
        $('#filtrate-content').find('.option').each(function () {
          if ($(this).html() !== '不筛选' && $(this).hasClass('in')) {
            conditionStr += '&' + $(this).parent().prev().data('name') + '=' + $(this).data('value')
          }
        });
        if (this.geneTextArea) {
          conditionStr += '&genes=' + this.strToArr(this.geneTextArea)
        }
        this.myAxios({
          url: 'manage/sample/' + this.sn + '/record?page='+this.page1+conditionStr
        }).then(function (resp) {
          let data = resp.data;
          _vue.count1 = data.meta.total;
          _vue.patient = data.meta.patient;
          _vue.sampleSn = data.meta.sample_sn;
          _vue.lists1 = data.data;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      resetFilterAndRe: function () {
        this.resetFilter();
        this.filter();
        this.getList1();
      },
      resetFilter: function () {
        this.geneTextArea = '';
        $('.content-1').find('.default').each(function () {
          $(this).parent().find('.in').removeClass('in');
          $(this).addClass('in')
        })
      },
      filter: function () {
        this.page1 = 1;
        this.reset1 = 1;
        this.getList1();
        $('#filtrate-content').addClass('hide');
        this.showHasCondition()
      },
      showHasCondition: function () {
        const _vue = this;
        _vue.hasCondition = [];
        $('#filtrate-content').find('.content').find('.single').each(function () {
          const _in = $(this).find('.right').find('.in');
          let inData = _in.html();
          if (_in.length && inData != '不筛选') {
            if (_in.html().includes('&')) {
              inData = _in.data('value')
            }
            if (_in.data('database')) {
              _vue.hasCondition.push(_in.parent().prev().html() + '' + inData)
            } else {
              _vue.hasCondition.push(_in.parent().prev().html() + inData)
            }
          }
        });
        _vue.hasRed = _vue.hasCondition.join(',').includes('旗标：红');
        if (this.geneTextArea) {
          _vue.hasCondition.push('基因个数：' + this.strToArr(this.geneTextArea).length - 1)
        }
      },
      filtrateShowEditFun: function () {
        this.switchHide('filtrate-content-edit')
      },
      filtrateShowFun: function () {
        this.switchHide('filtrate-content')
      },
      getCurrent: function (data) {
        this.page1 = data;
        this.reset1 = 0;
        this.getList1()
      },

      changeStatus:function (id,status) {
        const _vue = this;
        this.myAxios({
          url:'manage/sample/' + this.sn + '/record/'+id,
          method:'patch',
          data:{
            status:status,
            comment:''
          }
        }).then(function (resp) {
          _vue.success('修改状态成功')
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },

      //修改表型信息和基因信息
      getList1Datafile: function () {
        const _vue = this
        this.loading = true
        this.myAxios({
          url: 'sample/datafile/' + _vue.datafile + '/'
        }).then(function (resp) {
          _vue.originalPanelData = []
          if (resp.data.geneinfo) {
            _vue.modalPanelData = resp.data.geneinfo.panels
            _vue.modalGeneData = resp.data.geneinfo.genes

            $.each(resp.data.geneinfo.panels, function (i, data) {
              _vue.originalPanelData.push({
                key: data.code,
                value: data.name
              })
            })
            _vue.geneInput = resp.data.geneinfo.genes.join(',')
          }

          _vue.loading = false
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      showPanelModal: function () {
        this.getList1Datafile()
        $('#panelModal').modal('show')
      },
      savePanel: function (data) {
        let panelArr = []
        const _vue = this
        _vue.loading0 = true
        $.each(data.panel, function (i, n) {
          panelArr.push({name: n.value, code: n.key})
        })
        this.myAxios({
          url: 'sample/datafile/' + this.datafile + '/',
          method: 'patch',
          data: {
            geneinfo: {
              panels: panelArr,
              genes: data.gene
            },
          }
        }).then(function () {
          alert('提交成功')
          $('#panelModal').modal('hide')
          _vue.loading0 = false
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      showGenoModal: function () {
        this.getList1Datafile()
        $('#genotype-modal').modal('show')
      },
      //切换导航
      changeContent: function (event) {
        const _current = $(event.target);
        const current = _current.data('type');
        _current.parent().find('.active').removeClass('active');
        _current.addClass('active');
        this.in1 = ''
        this.in2 = ''
        this.in3 = ''
        this.in4 = ''
        if (current === 1) {
          this.in1 = true
        } else if (current === 2) {
          this.in2 = true
        } else if (current === 3) {
          this.in3 = true
        } else if (current === 4) {
          this.in4 = true
        }
      },
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip()
    },
    watch: {

    },
    filters: {
      getPercent: function (data) {
        return Math.round(data * 10000) / 100
      },
      getStatus: function (status) {
        switch (status) {
          case 'major':
            return '主要的'
            break
          case 'minor':
            return '次要的'
            break
          case 'benign':
            return '良性的'
            break
          case 'invalid':
            return '无效的'
            break
          case '':
            return '未报告'
            break
        }
      }
    }

  }
</script>

<style scoped lang="less">
  @border: rgb(193, 192, 192);
  @tableSha: rgb(185, 184, 184);
  @in: rgb(44, 127, 210);
  @red: rgb(233, 73, 73);

  #result-content {
    .title {
      color: rgb(67, 67, 67);
      font-weight: bold;
      .title-b {
        font-weight: bold;
        font-size: 18px;
      }
    }
    .change-panel {
      margin-left: 50px;
    }
    .to-report {
      display: inline-block;
      margin-left: 50px;
    }
    .all-content {
      table {
        box-shadow: none;
        border-radius: 0;
        margin-top: 60px;
      }
      margin: 15px 0 0 0;
      .flag-q {
        margin: 8px;
      }
      .title-list {
        width: 486px;
        border-bottom: 1px solid @border;
        font-weight: bold;
        margin-bottom: -1px;
        position: relative;
        z-index: 10;
        .title-single {
          display: inline-block;
          width: 145px;
          height: 27px;
          padding-top: 3px;
          vertical-align: bottom;
          background-color: #fff;
          text-align: center;
          border-top: 1px solid @border;
          border-left: 1px solid @border;
          border-right: 1px solid @border;
          border-top-right-radius: 3px;
          border-top-left-radius: 3px;
          /*margin-left: 3px;*/
          cursor: pointer;
        }
        .title-single:first-child {
          margin: 0;
          box-shadow: -3px 0 5px -2px rgb(200, 200, 200);
        }
        .title-single.active {
          height: 35px;
          border-top: 4px solid rgb(0, 118, 192);
          padding-top: 7px;
          margin-bottom: -1px;
          color: @in;
        }
      }
      .detail-content {
        min-height: 300px;
        border: 1px solid @tableSha;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        box-shadow: 0 0 20px 3px rgb(200, 200, 200);
        background-color: #fff;
        position: relative;
        > div {
          padding: 20px 30px 35px 30px;
          .rea {
            > .my-btn {
              /*position: absolute;*/
              /*right: 0;*/
              /*top: 0;*/
            }
            .con {
              float: left;
              margin-top: 5px;
              /*padding-right: 110px;*/
              word-break: break-all;
              .title {
                display: inline-block;
                margin-right: 10px;
              }
            }
          }
        }
        table#table-1, table#table-2, table#table-mt {
          .text-1, .active1 {
            color: #f1456c;
          }
          .text-2, .active2 {
            color: #ffbb34;
          }
          .text-3, .active3 {
            color: #2c7fd2;
          }
          .active4 {
            color: #d3d3d3;
          }
        }
        #filtrate-content, #filtrate-content-2, #filtrate-content-4 {
          .content {
            font-size: 12px;
            .single {
              .left {
                font-weight: bold;
              }
            }
          }
          .option {
            float: left;
            padding: 3px 8px;
            border: 1px solid #fff;
            cursor: pointer;
            margin: 2px;
            &:hover {
              border: 1px solid #b9b8b8;
            }
          }
          .option.in {
            border: 1px solid #0076c0;
            color: #2c7fd2;
            font-weight: bold;
            padding: 3px 6px;
          }
        }
        #filtrate-content {
          width: 700px;
          .search-btn {
            margin-left: 140px;
          }
          .refresh {
            margin-left: 50px;
          }
          .content {
            textarea {
              min-height: 100px;
              width: 100%;
              float: left;
              margin-top: 10px;
            }
            .left {
              width: 140px;
              margin-top: 6px;
            }
            .right {
              width: 530px;
            }
          }
        }
        #filtrate-content-4 {
          width: 600px;
          .search-btn {
            margin-left: 145px;
          }
          .refresh {
            margin-left: 50px;
          }
          .content {
            textarea {
              min-height: 100px;
              width: 100%;
              float: left;
              margin-top: 10px;
            }
            .left {
              width: 140px;
              margin-top: 6px;
            }
            .right {
              width: 430px;
            }
          }
        }
        #filtrate-content-2 {
          width: 310px;
          .search-btn {
            margin-left: 40px;
          }
          .refresh {
            margin-left: 20px;
          }
          .content {
            textarea {
              min-height: 100px;
              width: 100%;
              float: left;
              margin-top: 10px;
            }
            .left {
              width: 80px;
              margin-top: 6px;
            }
            .right {
              width: 200px;
            }
          }
        }
        /*  .content-1 {
            .red {
              color: @red;
            }
            ul {
              padding-left: 0;
              margin: 23px 0;
              li {
                display: inline-block;
                width: 100%;
                .r1 {
                  margin-right: 10px;
                }
              }
            }
            table {
              width: 100%;
              max-width: 100%;
              border-spacing: 0;
              border-collapse: collapse;
              thead {
                tr {
                  th {
                    text-align: center;
                    !*color: #fff;*!
                    !*padding: 9px 0;*!
                  }
                  th:not(:last-child) {
                    border-left: 1px solid #d3d3d3
                  }
                  !*.th-1 {*!
                  !*background-color: rgb(255, 187, 52);*!
                  !*border-left: 1px solid rgb(255, 187, 52);*!
                  !*}*!
                  !*.th-2 {*!
                  !*background-color: rgb(241, 69, 108)*!
                  !*}*!
                  !*.th-3 {*!
                  !*background-color: rgb(0, 198, 148)*!
                  !*}*!
                  !*.th-4 {*!
                  !*background-color: rgb(44, 127, 210);*!
                  !*border-right: 1px solid rgb(44, 127, 210);*!
                  !*}*!
                }
              }
              tbody {
                cursor: pointer;
                border-left: 1px solid rgb(211, 211, 211);
                border-right: 1px solid rgb(211, 211, 211);
                border-bottom: 1px solid rgb(211, 211, 211);
                tr {
                  td {
                    padding: 9px 30px;
                    border-left: 1px solid rgb(211, 211, 211);
                    border-bottom: 1px dashed rgb(225, 226, 227);
                  }
                  .td-1 {
                    padding-left: 46px;
                  }
                }
              }
            }
          }*/
        .filter-content {
          font-size: 12px;
          ul {
            margin-top: 10px;
            padding-left: 0;
            li {
              .title {
                font-weight: bold;
                display: inline-block;
                margin: 12px 20px 12px 0;
              }

              .option {
                padding: 5px 10px;
                border: 1px solid #fff;
                cursor: pointer;
                &:hover {
                  border: 1px solid #b9b8b8;
                }
              }
              .option.in {
                border: 1px solid #0076c0;
                color: #2c7fd2;
                font-weight: bold;
                padding: 3px 6px;
              }
              .fa-chevron-right {
                color: #2c7fd2;
              }
              .left {
                width: 50%;
              }
            }
            .textarea-li {
              overflow: hidden;
              .click-content {
                float: left;
                cursor: pointer;
              }
              textarea {
                min-height: 100px;
                width: 80%;
                float: left;
                margin-left: 28px;
                margin-top: 10px;
              }
            }
          }
        }
        .btn-content, .detail-btn-content {
          clear: both;
          margin-top: 20px;
          .condition {
            margin-right: 30px;
          }
          .refresh {
            margin-right: 20px;
          }
        }

        #filtrate-content-edit {
          position: absolute;
          padding: 0;
          width: auto;
          width: 98px;
          left: 118px;
          .up {
            left: 40px;
          }
          ul {
            padding: 0;
            margin: 0;
            li {
              cursor: pointer;
              height: 28px;
              line-height: 28px;
              text-align: center;
              &:hover {
                background-color: rgb(255, 236, 210);
              }
            }
            li:first-child {
              border-top-left-radius: 5px;
              border-top-right-radius: 5px;
            }
            li:last-child {
              border-bottom-left-radius: 5px;
              border-bottom-right-radius: 5px;
            }
          }
        }
      }
    }
  }


</style>
