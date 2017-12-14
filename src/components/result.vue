<!--suppress HtmlUnknownTag -->
<template>
  <div class="data-content">
    <myDataH></myDataH>
    <div class="right-content" id="result-content">
      <loading v-if="loading"></loading>
      <div class="done-list">
        <div class="title">
          <span class="title-b">任务结果</span>
          <span class="title-s"><{{sampleSn}}：{{patient.name}}({{patient.gender}})</span>

          <div class="bold to-report">基因分析报告 :
            <router-link target="_blank" class="common-a" :to="{path:'/report',query:{sn:sn}}">点击查看</router-link>
          </div>

          <div class="bold to-report">样本详情 :
            <router-link target="_blank" class="common-a" :to="{path:'/sampleD',query:{id:sn}}">点击查看</router-link>
          </div>

        </div>
        <div class="all-content">
          <div class="title-list">
            <div @click="changeContent" data-type="1" class="title-single active">核基因组检测</div>
            <div @click="changeContent" data-type="2" class="title-single">线粒体环基因组检测</div>
            <div @click="changeContent" data-type="3" class="title-single">文件状态</div>
          </div>
          <div class="detail-content">
            <div class="content-1" :class="{hide:!in1}">
              <div class="top-content">
              <span class="con"><span class="title red">已选条件：</span>
                <span v-if="hasCondition.length">{{hasCondition.join('，')}}</span>
                <span v-else="">无</span>
              </span>
                <div class="detail-btn-content rea">
                  <div class="flag-content">
                    <span class="tag tag-r" @click="changeFlag(1,1)">重要</span>
                    <span class="tag tag-y" @click="changeFlag(2,1)">潜在</span>
                    <span class="tag tag-b" @click="changeFlag(3,1)">其他</span>
                    <span class="tag tag-d active" @click="changeFlag(4,1)">全部</span>
                    <span class="active-bar"
                          :class="{'active-barR':queryBar1==1,'active-barY':queryBar1==2,'active-barB':queryBar1==3,'active-barD':queryBar1==4}"></span>
                  </div>

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
                <thead :class="{'bcR':queryBar1==1,'bcY':queryBar1==2,'bcB':queryBar1==3,'bcD':queryBar1==4}">
                <tr>
                  <th>位点</th>
                  <th style="width: 63px">携带病例
                    <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                       data-original-title="我的所有样本/所有用户的样本">
                    </i>
                  </th>
                  <th>基因</th>
                  <th>区域</th>
                  <th>功能</th>
                  <th>疾病</th>

                  <th style="width: 65px" class="warp">
                    CLINVAR
                    <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                       data-original-title="O代表other,B代表Benign,LB代表Likely benign,P代表Pathogenic,LP代表Likely Pathogenic，NP代表not provided">
                    </i>
                  </th>
                  <th>HGMD</th>

                  <th style="width: 49px">纯杂合</th>
                  <!--<th>gatkFilter</th>-->

                  <!--<th>深度</th>-->
                  <th>人群频率(%)</th>
                  <th style="width: 65px">变异比例(%)</th>
                  <!--<th style="width: 100px">变异信息</th>-->
                  <th style="width: 115px">报告状态</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(data,index) in lists1" :class="{'tr-bc':index%2}">
                  <td class="">
                    <router-link class="po common-a" v-if="data.snv && data.snv.variant" target="_blank"
                                 :to="{path:'/variationD',query:{sn:sn,id:data._id}}"
                                 title="查看变异详情">
                      {{data.snv.variant.chrom}}:{{data.snv.variant.start}}:{{data.snv.variant.end}}:{{data.snv.variant.ref}}:{{data.snv.variant.alt}}
                    </router-link>
                  </td>
                  <td>
                    <span v-if="data.record_count">{{data.record_count.private}} / {{data.record_count.public}}</span>
                  </td>
                  <td class="warp">
                    <div v-if="data.snv && data.snv.annotation">
                      <div  v-for="geneSingle in data.snv.annotation.gene.symbols">
                        <router-link class="po common-a" target="_blank" :to="{path:'/geneD',query:{id:geneSingle}}">
                          {{geneSingle}}
                        </router-link>
                      </div>
                    </div>
                  </td>
                  <td class="warp">
                    <span v-if="data.snv &&data.snv.annotation">{{data.snv.annotation.regions.join(',')}}</span>
                  </td>
                  <td>
                    <span v-if="data.snv &&data.snv.annotation">{{data.snv.annotation.funcs.join(',')}}</span><span v-else="">-</span>
                  </td>
                  <!--<diseaseTd style="max-width: 250px" class="warp" :diseases="data.diseases" @sendOmimId="getOmimId"></diseaseTd>-->

                  <td>
                    <div v-for="dis in data.disease">
                      <!--[AD]-->
                      <span v-if="dis.inheritances && dis.inheritances.length == 0" class="bold">[无]</span>
                      <span v-for="inheritance in dis.inheritances">
                        <span class="po bold" data-toggle="tooltip" data-placement="top" :data-original-title='inheritance.name+"("+inheritance.chinese+")"'>
                        [{{inheritance.ab}}]
                        </span>
                      </span>

                      <!--Pfeiffer综合征有中文名--><!---->
                      <a v-if="dis.title" class="po common-a"  data-toggle="tooltip" data-placement="top" :data-original-title='dis.title.preferred' @click="showHPO(dis._id)">
                        {{dis.title.chinese?dis.title.chinese:dis.title.preferred}}
                      </a>
                      (<router-link :to="{path:'/omim',query:{id:dis.mimnumber}}" target="_blank">{{dis.mimnumber}}</router-link>)

                    </div>

                  </td>

                  <td>
                    <div v-if="data.snv && data.snv.annotation">
                      <div v-for="clinvarSingle in clinvarsToArr(data.snv.annotation.dbinfo.clinvars)">
                          <span class="po bold" data-toggle="tooltip" data-placement="top"
                                :data-original-title='clinvarSingle[0]'>
                            [{{clinvarSingle[0] | clinvarFilterFirst}}]
                          </span>
                        ({{clinvarSingle[1]}})
                      </div>
                    </div>
                  </td>
                  <td>
                    {{data.snv && data.snv.annotation && data.snv.annotation.dbinfo && data.snv.annotation.dbinfo.hgmd && data.snv.annotation.dbinfo.hgmd}}
                  </td>

                  <td><span v-if="data.information">{{data.information.hom_het ? data.information.hom_het : '-'}}</span></td>
                  <!--<td><span v-if="data.information">{{data.information.gatk_filter ? data.information.gatk_filter : '-'}}</span></td>-->

                  <!--<td><span v-if="data.information">{{data.information.depth}}</span></td>-->
                  <td><span v-if="data.snv">{{data.snv.freq | getPercent}}</span></td>
                  <td><span v-if="data.information">{{data.information.ratio | getPercent}}</span></td>

                  <!--<td>-->
                    <!--<div v-if="data.snv && data.snv.annotation">-->
                      <!--<div v-for="single in data.snv.annotation.changes">-->
                        <!--{{single.gene}}:{{single.transcript}}:{{single.exon}}:{{single.na_change}}:{{single.aa_change}}-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</td>-->

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
                  <td colspan="12" class="center noResult-td">
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
              <div class="top-content">
                <span class="con">
                  <span class="title red">已选条件：</span>
                  <span v-if="hasCondition2.length">{{hasCondition2.join('，')}}</span>
                  <span v-else="">无</span>
                </span>

                <div class="detail-btn-content rea">

                  <div class="flag-content">
                    <span class="tag tag-r" @click="changeFlag(1,2)">重要</span>
                    <span class="tag tag-y" @click="changeFlag(2,2)">潜在</span>
                    <span class="tag tag-b" @click="changeFlag(3,2)">其他</span>
                    <span class="tag tag-d active" @click="changeFlag(4,2)">全部</span>
                    <span class="active-bar" :class="{'active-barR':queryBar2==1,'active-barY':queryBar2==2,'active-barB':queryBar2==3,'active-barD':queryBar2==4}"></span>
                  </div>

                  <!--<span class="my-btn refresh" @click="resetFilterAndRe2"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>-->
                  <!--<span class="my-btn" @click.stop="filtrateShowEditFun2" @click=""><img src="../../static/img/red-edit.png" alt="">修改数据</span>-->
                  <span class="my-btn pull-right condition" @click.stop="filtrateShowFun2"><img src="../../static/img/red-con.png" alt="">筛选条件</span>
                  <!--筛选条件弹框-->
                  <div class="filtrate-content hide" id="filtrate-content-2" @click.stop="">
                    <img src="../../static/img/th-1.png" alt="" class="up">
                    <div class="title">搜索选项</div>
                    <div class="content">
                      <!--<div class="single">-->
                      <!--<div class="left" data-name="flag">旗标：</div>-->
                      <!--<div class="right" id="flag-div-4">-->
                      <!--<span class="option in default" data-value="r" data-mt="true">红</span>-->
                      <!--<span class="option" data-value="y" data-mt="true">黄</span>-->
                      <!--<span class="option" data-value="b" data-mt="true">蓝</span>-->
                      <!--<span id="flag-all-4" class="option" data-value="all" @click.stop="" data-flag='allflag' data-mt="true">全部</span>-->
                      <!--&lt;!&ndash;<a class="fa fa-question-circle-o po flag-q common-a" style="color: inherit" :href="manHtml+'help/document?id=1'"&ndash;&gt;-->
                      <!--&lt;!&ndash;target="_blank"></a>&ndash;&gt;-->
                      <!--</div>-->
                      <!--</div>-->
                      <div class="single">
                        <div class="left" data-name="clinvar">CLINVAR：</div>
                        <div class="right">
                          <span class="option" data-value="true" data-mt="true">已报道</span>
                          <span class="option" data-value="false" data-mt="true">未报道</span>
                          <span class="option in default" data-mt="true">不筛选</span>
                        </div>
                      </div>
                      <div class="single">
                        <div class="left" data-name="mitimpact">MITIMPACT：</div>
                        <div class="right">
                          <span class="option" data-value="true" data-mt="true">已报道</span>
                          <span class="option" data-value="false" data-mt="true">未报道</span>
                          <span class="option in default" data-mt="true">不筛选</span>
                        </div>
                      </div>
                      <div class="single">
                        <div class="left" data-name="mitomap">MITOMAP：</div>
                        <div class="right">
                          <span class="option" data-value="true" data-mt="true">已报道</span>
                          <span class="option" data-value="false" data-mt="true">未报道</span>
                          <span class="option in default" data-mt="true">不筛选</span>
                        </div>
                      </div>

                      <div class="single">
                        <div class="left" data-name="gatkpass">gatkFilter：</div>
                        <div class="right">
                          <span class="option" data-value="true" data-mt="true">PASS</span>
                          <span class="option" data-value="false" data-mt="true">其他</span>
                          <span class="option in default" data-mt="true">不筛选</span>
                        </div>
                      </div>

                      <div class="single">
                        <div class="left" data-name="dbfreq">普通人群携带率低于：</div>
                        <div class="right">
                          <span class="option" data-value="0" data-mt="true">0</span>
                          <span class="option" data-value="0.0001" data-mt="true">0.01%</span>
                          <span class="option" data-value="0.001" data-mt="true">0.1%</span>
                          <span class="option" data-value="0.01" data-mt="true">1%</span>
                          <span class="option in default" data-mt="true">不筛选</span>
                        </div>
                      </div>


                      <div class="single">
                        <div class="left" data-name="status">报告：</div>
                        <div class="right">
                          <span class="option" data-value="major" data-effect='flag' data-mt="true">主要</span>
                          <span class="option" data-value="minor" data-effect='flag' data-mt="true">次要</span>
                          <span class="option" data-value="all" data-effect='flag' data-mt="true">已标记</span>
                          <span class="option in default" data-effect='reset' data-mt="true">不筛选</span>
                        </div>
                      </div>

                    </div>
                    <span class="my-btn search-btn" @click="filter2"><img src="../../static/img/red-con.png" alt="">搜索</span>
                    <span class="my-btn refresh" @click="resetFilter2"><img src="../../static/img/red-refresh.png"
                                                                            alt="">重置</span>
                  </div>
                  <!--修改数据弹框-->
                  <div class="filtrate-content hide" id="filtrate-content-edit2">
                    <img src="../../static/img/th-1.png" alt="" class="up">
                    <ul>
                      <li @click="showPanelModal">修改基因信息</li>
                      <li @click="showGenoModal">修改表型信息</li>
                    </ul>
                  </div>
                </div>
              </div>
              <table class="table my-table" id="table-mt">
                <thead :class="{'bcR':queryBar2==1,'bcY':queryBar2==2,'bcB':queryBar2==3,'bcD':queryBar2==4}">
                <tr>
                  <th>位点
                    <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                       data-original-title="红色代表最高级，黄色代表第二级，蓝色代表第三级">
                    </i>
                  </th>
                  <th>基因</th>
                  <th>区域</th>
                  <th>功能</th>
                  <th>疾病</th>
                  <th class="warp" style="width: 103px">CLINVAR
                    <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                       data-original-title="O代表other,B代表Benign,LB代表Likely benign,P代表Pathogenic,LP代表Likely Pathogenic，NP代表not provided">
                    </i>
                  </th>
                  <th>MITIMPACT</th>
                  <th>MITOMAP</th>
                  <th>人群频率(%)</th>
                  <th>变异比例(%)</th>
                  <th style="width: 115px">报告状态</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(data,index) in lists2" :class="{'tr-bc':index%2}">
                  <td class="">
                    <router-link class="po common-a" v-if="data.snv && data.snv.variant" target="_blank"
                                 :to="{path:'/variationD',query:{sn:sn,id:data._id}}"
                                 title="查看变异详情">
                      {{data.snv.variant.chrom}}:{{data.snv.variant.start}}:{{data.snv.variant.end}}:{{data.snv.variant.ref}}:{{data.snv.variant.alt}}
                    </router-link>
                  </td>
                  <td class="warp">
                    <div v-if="data.snv && data.snv.annotation" >
                      <div v-for="geneSingle in data.snv.annotation.gene.symbols">
                        <router-link class="po common-a" target="_blank" :to="{path:'/geneD',query:{id:geneSingle}}">
                          {{geneSingle}}
                        </router-link>
                      </div>
                    </div>
                  </td>
                  <td class="warp">
                    <span v-if="data.snv &&data.snv.annotation">{{data.snv.annotation.regions.join(',')}}</span>
                  </td>
                  <td>
                    <span v-if="data.snv &&data.snv.annotation">{{data.snv.annotation.funcs.join(',')}}</span><span v-else="">-</span>
                  </td>
                  <td>
                    <div v-for="dis in data.disease">
                      <!--[AD]-->
                      <span v-if="dis.inheritances.length == 0" class="bold">[无]</span>
                      <span v-for="inheritance in dis.inheritances">
                        <span class="po bold" data-toggle="tooltip" data-placement="top" ><!--:data-original-title='inheritance.title.preferred+"("+inheritance.title.chinese+")"'-->
                        [{{inheritance}}]
                      </span>
                        <!--Pfeiffer综合征有中文名--><!---->
                      <a class="po common-a"  data-toggle="tooltip" data-placement="top" :data-original-title='dis.title.preferred' @click="showHPO(dis._id)">
                        {{dis.title.chinese?dis.title.chinese:dis.title.preferred}}
                      </a>
                      (<router-link :to="{path:'/omim',query:{id:dis.mimnumber}}" target="_blank">{{dis.mimnumber}}</router-link>)
                    </span>
                    </div>
                  </td>
                  <td>
                    <div v-if="data.snv && data.snv.annotation">
                      <div v-for="clinvarSingle in clinvarsToArr(data.snv.annotation.dbinfo.clinvars)">
                          <span class="po bold" data-toggle="tooltip" data-placement="top"
                                :data-original-title='clinvarSingle[0]'>
                            [{{clinvarSingle[0] | clinvarFilterFirst}}]
                          </span>
                        ({{clinvarSingle[1]}})
                      </div>
                    </div>
                  </td>
                  <td>{{data.snv &&data.snv.mt_info ? data.snv.mt_info.mitimpact : '-'}}</td>
                  <td>{{data.snv &&data.snv.mt_info ? data.snv.mt_info.mitomap : '-'}}</td>
                  <td><span v-if="data.snv">{{data.snv.freq | getPercent}}</span></td>
                  <td><span v-if="data.information">{{data.information.ratio | getPercent}}</span></td>
                  <td>
                    <el-select v-model="data.edit.status" placeholder="" @change="changeStatus(data._id,data.edit.status)">
                      <el-option label="主要" value="主要"></el-option>
                      <el-option label="次要" value="次要"></el-option>
                      <el-option label="未报告" value="未报告"></el-option>
                    </el-select>
                  </td>
                </tr>

                <tr v-if="lists2.length == 0 && doneHttp2">
                  <td colspan="12" class="center noResult-td">
                    <img src="../../static/img/no-result-1.png" alt="">
                  </td>
                </tr>

                </tbody>
              </table>

              <page :childCount="count2" :childReset="reset2" @childCurrent="getCurrent2"></page>
            </div>

            <div class="content-3" :class="{hide:!in3}">

              <span class="my-btn up-file" @click="upFile"><img src="../../static/img/red-submit.png" alt="">上传文件</span>


              <table class="special-table">
                <tbody>
                <tr class="t-bc">
                  <td>文件名</td>
                  <td>状态</td>
                  <td>文件类型</td>
                  <td>上传日期</td>
                  <td>操作</td>
                </tr>
                <tr v-for="file in files">
                  <td><a href="javascript:void (0)" @click="downloadFile(sn,file._id)">{{file.filename}}</a></td>
                  <td>
                    {{file.status | getFileStatus}}
                    <i v-if="file.status == -1" class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                       :data-original-title="file.error">
                    </i>
                    <a v-if="file.status == -1" href="javascript:void(0)" @click="fileRetry">重新运行</a>
                  </td>
                  <td>{{file.append ? '追加' : '覆盖'}}</td>
                  <td>{{file.created_at}}</td>
                  <td><i @click="deleteFile(file._id)" class="fa fa-trash fa-lg delete po" title="删除"></i></td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <hpoModal :omimId="omimId"></hpoModal>

    <!--上传文件-->
    <div class="modal fade" tabindex="-1" role="dialog" id="fileModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">上传excel文件</h4>
          </div>
          <div class="modal-body">

            <div class="modal-btn">
              <span class="my-btn" @click="saveFile"><img src="../../static/img/red-save.png" alt="">保存</span>
              <span class="my-btn close-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>
            </div>
            <form action="" id="addDataFormCap">
              <div class="one">
                <div class="one-content">
                  <div class="row">

                    <div class="col-sm-6">
                      <span class="name">选择类型：</span>
                      <el-radio v-model="radioEdit" label="1">追加</el-radio>
                      <el-radio v-model="radioEdit" label="2">覆盖</el-radio>

                      <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                         data-original-title="覆盖会删除文件历史记录和变异位点">
                      </i>
                    </div>

                    <div class="col-sm-6">
                      <span class="name">选择文件：</span>
                      <div class="upload-content content" id="upload-edit">
                        <input type="text" class="show-name" id="file-name-edit" @click.stop="">
                        <span class="text">选择</span>
                        <input type='file' name="data_file" class="hide-input" id="hide-edit">

                      </div>
                    </div>

                    <div class="col-sm-6">
                      <span class="name">完成发送邮件：</span>
                      <el-radio v-model="doEmail" label="1">否</el-radio>
                      <el-radio v-model="doEmail" label="2">是</el-radio>

                      <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                         data-original-title="大文件建议勾选发送">
                      </i>
                    </div>

                  </div>
                </div>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import page from './global/Page.vue'
  import myDataH from './global/myDataHeader.vue'
  import hpoModal from './global/HpoModal.vue'

  export default {
    components: {
      page: page,
      myDataH: myDataH,
      hpoModal: hpoModal,
    },
    data: function () {
      return {
        loading: '',
        in1: true,
        in2: '',
        in3: '',
        sn: this.$route.query.id ? this.$route.query.id : 0,
        patient: '',
        sampleSn: '',
        //SNV
        hasCondition: [],
        page1: 1,
        reset1: 1,
        count1: 1,
        lists1: [],
        queryFlag1: '',
        queryBar1: 4,
        doneHttp: false,
        geneTextArea: '',
        disease1:[],
        //mito
        hasCondition2: [],
        page2: 1,
        reset2: 1,
        count2: 1,
        lists2: [],
        doneHttp2: false,
        geneTextArea2: '',
        queryFlag2: '',
        queryBar2: 4,
        disease2:[],

        omimId:0,

        //文件情况
        files: [],
        radioEdit:'1',
        doEmail:'1'
      }
    },
    mounted: function () {
      this.getList1(); //核基因组检测
      this.getList2(); //线粒体检测
      this.getFile();//文件
      this.showHasCondition();
      this.bindConClick();
    },
    methods: {

      changeFlag: function (type, content) {
        const _content1 = $('.content-1');
        const _content2 = $('.content-2');
        const _bar = content == 1 ? _content1.find(".active-bar") : _content2.find(".active-bar");
        const _flagC = content == 1 ? _content1.find(".flag-content") : _content2.find(".flag-content");
        _flagC.find(".active").removeClass('active');
        _flagC.find(">span").eq(type - 1).addClass('active');

        if (type == 1) {
          _bar.css("left", '0px');
        } else if (type == 2) {
          _bar.css("left", '50px');
        } else if (type == 3) {
          _bar.css("left", '100px');
        } else {
          _bar.css("left", '148px');
        }
        if (content == 1) {
          this.queryBar1 = type;
          if (type == 1) {
            this.queryFlag1 = '&flag=r';
          } else if (type == 2) {
            this.queryFlag1 = '&flag=y'
          } else if (type == 3) {
            this.queryFlag1 = '&flag=b'
          } else {
            this.queryFlag1 = ''
          }
          this.getList1()
        } else if (content == 2) {
          this.queryBar2 = type;
          if (type == 1) {
            this.queryFlag2 = '&flag=r'
          } else if (type == 2) {
            this.queryFlag2 = '&flag=y'
          } else if (type == 3) {
            this.queryFlag2 = '&flag=b'
          } else {
            this.queryFlag2 = ''
          }
          this.getList2()
        }
      },

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
        let conditionStr = '';
        this.loading = true;
        _vue.doneHttp = false;
        $('#filtrate-content').find('.option').each(function () {
          if ($(this).html() !== '不筛选' && $(this).hasClass('in')) {
            conditionStr += '&' + $(this).parent().prev().data('name') + '=' + $(this).data('value')
          }
        });
        if (this.geneTextArea) {
          conditionStr += '&genes=' + this.strToArr(this.geneTextArea)
        }
        this.myAxios({
          url: 'manage/sample/' + this.sn + '/record?mt=false&page=' + this.page1 + conditionStr + this.queryFlag1
        }).then(function (resp) {
          _vue.loading = false;
          let data = resp.data;
          _vue.doneHttp = true;
          _vue.count1 = data.meta.total;
          _vue.patient = data.meta.patient;
          _vue.sampleSn = data.meta.sample_sn;
          _vue.lists1 = data.data;
          _vue.doneHttp = true;
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
          _vue.hasCondition.push('基因个数：' + (this.strToArr(this.geneTextArea).length - 1).toString())
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

      changeStatus: function (id, status) {
        const _vue = this;
        this.myAxios({
          url: 'manage/sample/' + this.sn + '/record/' + id,
          method: 'patch',
          data: {
            status: status,
//            comment:''
          }
        }).then(function (resp) {
          _vue.success('修改状态成功')
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },

      //线粒体
      getList2: function () {
        const _vue = this;
        this.loading = true;
        let conditionStr = '';
        $('#filtrate-content-2').find('.option').each(function () {
          if ($(this).html() !== '不筛选' && $(this).hasClass('in')) {
            conditionStr += '&' + $(this).parent().prev().data('name') + '=' + $(this).data('value')
          }
        });
//        if (this.geneTextArea2) {
//          conditionStr += '&genes=' + this.strToArr(this.geneTextArea2)
//        }
        _vue.doneHttp2 = false;

        this.myAxios({
          url: 'manage/sample/' + this.sn + '/record?mt=true&page=' + this.page1 + conditionStr + this.queryFlag2
        }).then(function (resp) {
          _vue.loading = false;
          _vue.doneHttp2 = true;
          let data = resp.data;
          _vue.doneHttp2 = true;
          _vue.count2 = data.meta.total;
          _vue.patient = data.meta.patient;
          _vue.sampleSn = data.meta.sample_sn;
          _vue.lists2 = data.data;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      resetFilterAndRe2: function () {
        this.resetFilter2();
        this.filter2();
        this.getList2();
      },
      resetFilter2: function () {
//        this.geneTextArea = '';
        $('.content-2').find('.default').each(function () {
          $(this).parent().find('.in').removeClass('in');
          $(this).addClass('in')
        })
      },
      filter2: function () {
        this.page2 = 1;
        this.reset2 = 1;
        this.getList2();
        $('#filtrate-content-2').addClass('hide');
        this.showHasCondition2()
      },
      showHasCondition2: function () {
        const _vue = this;
        _vue.hasCondition2 = [];
        $('#filtrate-content-2').find('.content').find('.single').each(function () {
          const _in = $(this).find('.right').find('.in');
          let inData = _in.html();
          if (_in.length && inData != '不筛选') {
            if (_in.html().includes('&')) {
              inData = _in.data('value')
            }
            if (_in.data('database')) {
              _vue.hasCondition2.push(_in.parent().prev().html() + '' + inData)
            } else {
              _vue.hasCondition2.push(_in.parent().prev().html() + inData)
            }
          }
        });
//        _vue.hasRed = _vue.hasCondition2.join(',').includes('旗标：红');
//        if (this.geneTextArea) {
//          _vue.hasCondition.push('基因个数：' + this.strToArr(this.geneTextArea).length - 1)
//        }
      },
      filtrateShowEditFun2: function () {
        this.switchHide('filtrate-content-edit2')
      },
      filtrateShowFun2: function () {
        this.switchHide('filtrate-content-2')
      },
      getCurrent2: function (data) {
        this.page2 = data;
        this.reset2 = 0;
        this.getList2()
      },

      //文件
      getFile: function () {
        const _vue = this;
        this.myAxios({
          url: 'manage/sample/' + this.sn
        }).then((resp) => {
          _vue.files = resp.data.data.data_files;
        }).catch((error) => {
          _vue.catchFun(error)
        })
      },
      deleteFile: function (id) {
        const _vue = this;
        this.$confirm('此操作将永久删除该样本, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _vue.myAxios({
            url: 'manage/sample/' + _vue.sn + '/data_file/' + id,
            method: 'delete',
          }).then(function () {
            _vue.success('删除成功');
            _vue.getFile()
          }).catch(function (error) {
            _vue.catchFun(error)
          })
        }).catch(() => {
        });
      },
      downloadFile: function (lId, fId) {
        const _vue = this;
        this.loading = true;
        const postUrl = 'manage/sample/' + lId + '/data_file/' + fId;
        _vue.myAxios({
          url: postUrl,
          method: 'post'
        }).then(function (resp) {
          _vue.loading = false;
          window.location.href = _vue.apiUrl + postUrl + '?signature=' + resp.data.signature;
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      fileRetry: function () {
        const _vue = this;
        this.myAxios({
          url: 'manage/sample/' + this.sn + '/retry',
          method: 'post'
        }).then((resp) => {
          _vue.success('任务正在重新运行')
        }).catch((error) => {
          _vue.catchFun(error)
        })
      },
      upFile: function () {
        let flag = true;

        $.each(this.files, function (i, data) {
          if (data.status == 1) {
            flag = false
          }
        });

        if (flag) {
          $("#fileModal").modal("show")
        } else {
          this.alert('请等待文件处理完成或删除错误文件')
        }
      },
      saveFile: function () {
        const _vue = this;
        const fileNameArr = $("#hide-edit").val().split('.');
        const fileName = fileNameArr[fileNameArr.length - 1];
        if (fileName == 'xls' || fileName == 'xlsx' || fileName == 'vcf') {
          this.loading = true;
          let postData = new FormData(document.getElementById('addDataFormCap'));
//          postData.append("type", JSON.stringify({'a': 123, 'b': 456}));
          postData.append("append", this.radioEdit == 1 ? 1 : 0);
          this.myAxios({
            url: 'manage/sample/' + this.sn + '/data_file',
            method: 'post',
            data: postData
          }).then(function () {
            _vue.success('上传成功');
            $('#fileModal').modal('hide');
            _vue.loading = false;
            _vue.getFile()
          }).catch(function (error) {
            _vue.catchFun(error)
          })
        } else {
          this.alert('文件请上传excel或vcf格式')
        }
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
        let panelArr = [];
        const _vue = this;
        _vue.loading = true
        $.each(data.panel, function (i, n) {
          panelArr.push({name: n.value, code: n.key})
        });
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
          _vue.loading = false
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

      clinvarsToArr:function (obj) {
        let arr = [];
        $.each(obj,function (i,data) {
          arr.push([i,data])
        });
        return arr
      },

      showHPO:function (id) {
        this.omimId = id;
        $("#hop_modal").modal("show")
      }
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip()
    },
    watch: {},
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
      },
      getFileStatus: function (status) {
        switch (status) {
          case 0:
            return '等待';
            break;
          case 1:
            return '运行中';
            break;
          case 2:
            return '已完成';
            break;
          case -1:
            return '出错';
            break;
        }
      },
      clinvarFilterFirst: function (data) {
        if (data == 'other') {
          data = 'O'
        } else if (data == 'Benign') {
          data = 'B'
        } else if (data == 'Likely benign') {
          data = 'LB'
        } else if (data == 'Pathogenic') {
          data = 'P'
        } else if (data == 'Likely pathogenic') {
          data = 'LP'
        } else if (data == 'not provided') {
          data = 'NP'
        }
        return data
      },
    }

  }
</script>

<style scoped lang="less">
  @border: rgb(193, 192, 192);
  @tableSha: rgb(185, 184, 184);
  @in: rgb(44, 127, 210);
  @red: rgb(233, 73, 73);

  @r: #f1456c;
  @y: #ffbb34;
  @b: #2c7fd2;
  @d: #999;

  .bcR{
    background-color: @r;
    color: #fff;
  }
  .bcY{
    background-color: @y;
    color: #fff;
  }
  .bcB{
    background-color: @b;
    color: #fff;
  }
  .bcD{
    background-color: @d;
    color: #fff;
  }

  #result-content {
    .flag-content {
      position: relative;
      width: 200px;
      float: left;
      margin-top: -10px;
      .tag {
        display: inline-block;
        width: 45px;
        text-align: center;
        cursor: pointer;
        padding: 10px 0;
      }
      .tag-r {
        &:hover {
          color: @r;
        }
      }
      .tag-y {
        &:hover {
          color: @y;
        }
      }
      .tag-b {
        &:hover {
          color: @b;
        }
      }
      .tag-d {
        &:hover {
          color: @d;
        }
      }
      .tag-r.active {
        color: @r;
      }
      .tag-y.active {
        color: @y;
      }
      .tag-b.active {
        color: @b;
      }
      .tag-d.active {
        color: @d;
      }
      .active-bar {
        position: absolute;
        left: 148px;
        bottom: 0;
        width: 45px;
        height: 2px;
        z-index: 100;
        transition: all 1s ease 0s;
        -moz-transition: all 1s; /* Firefox 4 */
        -webkit-transition: all 1s; /* Safari 和 Chrome */
        -o-transition: all 1s; /* Opera */
      }
      .active-bar.active-barR {
        background-color: @r;
      }
      .active-bar.active-barY {
        background-color: @y;
      }
      .active-bar.active-barB {
        background-color: @b;
      }
      .active-bar.active-barD {
        background-color: @d;
      }

      &:after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background-color: #dfe4ed;
        z-index: 1;
      }
    }
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
      .content-3{
        table{
          margin-top: 20px;
        }
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
        #filtrate-content-2 {
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
            /*margin-right: 30px;*/
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

  #fileModal {
    .modal-body {
      padding-bottom: 50px;
      input, select {
        display: inline-block;
        height: 25px;
        line-height: 25px;
      }
      .one {
        .title {
          margin-bottom: 5px;
        }
        .one-content {
          .row {
            margin-top: 5px;
            .hide-input {
              display: none;
            }
            .text {
              height: 25px;
              line-height: 25px;
            }
            .name {
              display: inline-block;
              width: 28%;
            }
            .content {
              width: 60%;
              font-size: 12px;
              position: relative;
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
                z-index: 10;
                max-height: 100px;
                overflow-y: auto;
                border-right: 1px solid rgb(209, 209, 209);
                border-left: 1px solid rgb(209, 209, 209);
                border-bottom: 1px solid rgb(209, 209, 209);
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
        }
      }

    }
  }

</style>
