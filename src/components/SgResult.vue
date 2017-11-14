<!--suppress HtmlUnknownTag -->
<template>
  <div class="row" id="sgResult">
    <loading v-if="loading0"></loading>
    <loading v-if="loading1"></loading>
    <loading v-if="loading2"></loading>
    <loading v-if="loading3"></loading>
    <loading v-if="loading4"></loading>
    <div class="done-list col-sm-11 ">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">< {{sampleInfo}}</span>
        <!--<span class="span-a change-panel" @click="showPanelModal">修改基因信息</span>-->
        <!--<span class="span-a change-panel" @click="showGenoModal">修改表型信息</span>-->
      </div>
      <div class="all-content">
        <div class="title-list">
          <div @click="changeContent" data-type="0" class="title-single active">质控统计</div>
          <div @click="changeContent" data-type="1" class="title-single">变异详情</div>
          <div @click="changeContent" data-type="4" class="title-single">线粒体</div>
          <div @click="changeContent" data-type="2" class="title-single">XHMM CNV</div>
          <div @click="changeContent" data-type="3" class="title-single">基因覆盖度查询</div>
        </div>
        <div class="detail-content">
          <div class="content-0" :class="{hide:!in0}">
            <div class="bold">质控详情</div>
            <ul class="bold">
              <li>
                <span class="red">红字</span>：代表未达标
              </li>
              <li>
                FASTQC：<a :href='R1' target="_blank" class="common-a r1">R1:fastq</a>
                <a target="_blank" :href="R2" class="common-a">R2:fastq</a>
              </li>
              <li>
                INSERTSIZE图：<a class="common-a" :href="insert" target="_blank">点击下载</a>
              </li>
              <li>
                注释结果(CSV)：<a class="common-a" v-if="csv.cnv" :href="csv.cnv">点击下载(cnv)</a> <a v-if="csv.snv" class="common-a" :href="csv.snv">点击下载(snv)</a>
              </li>
              <li>
                基因分析报告 :
                <router-link target="_blank" class="common-a"
                             :to="{path:'report',query:{code:datafile,app:'snv'}}">点击查看
                </router-link>

              </li>
            </ul>
            <!--<div class="my-table-content">-->
            <table class="table my-table">
              <thead>
              <tr>
                <th class="th-1">类别</th>
                <th class="th-2">GrandOmics质控参数</th>
                <th class="th-3">真实值</th>
                <th class="th-4">分析详情</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(list,index) in lists0" :class="{'interleave':index%2!==0}">
                <td>{{list.type}}</td>
                <td>{{list.grandValue}}</td>
                <td :class="{'red':!list.standard}">{{list.realValue}}</td>
                <td>{{list.detail}}</td>
              </tr>
              </tbody>
            </table>
            <!--</div>-->

          </div>
          <div class="content-1" :class="{hide:!in1}">
            <!--<div class="cover" v-if="lists1.length == 0 && doneHttp1 && hasRed"></div>-->
            <div class="top-content">
              <span class="con"><span class="title red">已选条件：</span>
                <span v-if="hasCondition.length">{{hasCondition.join('，')}}</span>
                <span v-else="">无</span>
              </span>

              <div class="detail-btn-content rea">
                <span class="my-btn refresh" @click="resetFilterAndRe"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>

                <span class="my-btn" :class="{'light-btn':lists1.length == 0 && doneHttp1 && hasRed}" @click.stop="filtrateShowEditFun"><img
                  src="../../static/img/red-edit.png" alt="">修改数据</span>

                <span class="my-btn pull-right condition" :class="{'light-search':lists1.length == 0 && doneHttp1 && hasRed}"
                      @click.stop="filtrateShow1Fun"><img src="../../static/img/red-con.png" alt="">筛选条件</span>

                <!--筛选条件弹框-->
                <div class="filtrate-content hide" id="filtrate-content" @click.stop="">
                  <img src="../../static/img/th-1.png" alt="" class="up">
                  <div class="title">搜索选项</div>
                  <div class="content">
                    <div class="single">
                      <div class="left" data-name="flag">旗标：</div>
                      <div class="right" id="flag-div">
                        <span class="option default in" data-value="r">红</span>
                        <span class="option" data-value="y">黄</span>
                        <span class="option" data-value="b">蓝</span>
                        <span id="flag-all" class="option" data-value="all" @click.stop="" data-flag='allflag'>全部</span>
                        <a class="fa fa-question-circle-o po flag-q common-a" style="color: inherit" :href="manHtml+'help/document?id=1'"
                           target="_blank"></a>
                      </div>
                    </div>
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
                        <!--<span class="option" data-value="0.02">2%</span>-->
                        <!--<span class="option" data-value="0.05">5%</span>-->
                        <span class="option in default">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="grandfreq">本地人群携带率低于：</div>
                      <div class="right">
                        <span class="option" data-value="0">0</span>
                        <span class="option" data-value="0.0001">0.01%</span>
                        <span class="option" data-value="0.001">0.1%</span>
                        <span class="option" data-value="0.01">1%</span>
                        <!--<span class="option" data-value="0.02">2%</span>-->
                        <!--<span class="option" data-value="0.05">5%</span>-->
                        <span class="option in default">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="status">报告：</div>
                      <div class="right">
                        <span class="option" data-value="major" data-effect='flag'>主要</span>
                        <span class="option" data-value="minor" data-effect='flag'>次要</span>
                        <span class="option" data-value="all" data-effect="flag">已标记</span>
                        <span class="option in default" data-effect="reset">不筛选</span>
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

            <!--<div class="my-table-content">-->
            <table class="table my-table long" id="table-1">
              <thead>
              <tr>
                <th>位点
                  <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                     data-original-title="红色代表最高级，黄色代表第二级，蓝色代表第三级">
                  </i>
                </th>
                <th style="width: 103px">基因</th>
                <th style="width: 70px">区域</th>
                <th>功能</th>
                <th>疾病</th>
                <th class="warp" style="width: 103px">
                  CLINVAR
                  <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                     data-original-title="O代表other,B代表Benign,LB代表Likely benign,P代表Pathogenic,LP代表Likely Pathogenic，NP代表not provided">
                  </i>
                </th>
                <th style="width: 50px">HGMD</th>
                <th style="width: 102px">
                  东亚/本地
                  <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                     data-original-title="东亚来自于gnomAD数据库">
                  </i>
                  <div>人群频率(%)</div>

                </th>
                <th style="width: 63px">变异比例(%)</th>
                <th style="width: 77px">报告状态</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in lists1" :class="{'tr-bc':index%2}">
                <td class="">
                  <i title="查看详情" class="fa fa-font-awesome po" @click="showDetail(data,0,data.id)"
                     :class="{'text-1':data.level == 0,'text-2':data.level==1,'text-3':data.level==2}"></i>
                  <a class="po common-a" v-if="data.variant"
                     @click="showLocus(data.id,0,data.variant.chrom+':'+data.variant.start+':'+data.variant.end+':'+data.variant.ref+':'+data.variant.alt)">
                    <span>{{data.showLocusStr}}</span>
                    <!--<span-->
                    <!--v-if="data.variant.start == data.variant.end">{{data.variant.chrom}}:{{data.variant.start}}({{data.variant.ref}}/{{data.variant.alt}})</span>-->
                    <!--<span-->
                    <!--v-else="">{{data.variant.chrom}}:{{data.variant.start}}-{{data.variant.end}}({{data.variant.ref}}/{{data.variant.alt}})</span>-->
                  </a>
                </td>
                <td class="warp">
                  <span v-if="data.anno">
                    <!--<a class="common-a" :href="dbHtml+'#/gene?geneValue='+data.anno.genes.symbols.join(',')">{{data.anno.genes.symbols.join(',')}}</a>-->
                    <a class="common-a block" v-for="sGene in data.anno.genes.symbols"
                       :href="dbHtml+'#/gene?geneValue='+data.anno.genes.symbols.join(',')">{{sGene}}</a>

                  </span>
                </td>
                <td class="warp">
                  <span v-if="data.anno">{{data.anno.regions.join(',')}}</span>
                </td>
                <td>
                  <span v-if="data.anno &&data.anno.funcs.length!=0">{{data.anno.funcs.join(',')}}</span><span v-else="">-</span>
                </td>
                <diseaseTd style="max-width: 250px" class="warp" :diseases="data.diseases" @sendOmimId="getOmimId"></diseaseTd>
                <td>
                  <div v-if="data.anno">
                    <div v-for="clinvarSingle in data.anno.dbinfo.clinvar">

                      <span class="po bold" data-toggle="tooltip" data-placement="top"
                            :data-original-title='clinvarSingle.substring(0,clinvarSingle.indexOf(":"))'>
                      [{{clinvarSingle | clinvarFilterFirst}}]
                      </span>
                      ({{clinvarSingle | clinvarFilterLast}})
                    </div>
                  </div>
                </td>
                <td><span v-if="data.anno&&data.anno.dbinfo&&data.anno.dbinfo.hgmd">{{data.anno.dbinfo.hgmd}}</span><span v-else="">-</span></td>
                <td><span v-if="data.anno.freqs">{{data.anno.freqs.dbfreq.large | getPercent}}/<span
                  v-if="data.anno.freqs">{{data.anno.freqs.grandfreq | getPercent}}</span></span></td>
                <!--<td></td>-->
                <td><span v-if="data.info">{{data.info.info.ratio | getPercent}}</span></td>
                <td>
                  <span v-if="data.info&&data.info.edit" :class="{ active1: data.info.edit.status=='major',active2: data.info.edit.status=='minor',active3: data.info.edit.status=='benign',
                  active4: data.info.edit.status=='invalid'}">
                    {{data.info.edit.status | getStatus}}
                  </span>
                </td>
              </tr>
              <tr v-if="lists1.length == 0 && doneHttp1">
                <td colspan="11" class="center noResult-td">
                  <!--当前暂无筛选结果，请尝试在页面上方修改信息或筛选条件-->
                  <img src="../../static/img/no-result-1.png" alt="">
                </td>
                <!--<td colspan="11" class="center" v-else="">暂无数据</td>-->
              </tr>
              </tbody>
            </table>
            <!--</div>-->
            <page :childCount="count1" :childReset="reset1" @childCurrent="getCurrent"></page>
          </div>
          <div class="content-2" :class="{hide:!in2}">
            <!--<div class="cover" v-if="lists2.length == 0 && doneHttp2 && hasRed1"></div>-->
            <div class="top-content">
              <span class="con"><span class="title red">已选条件：</span>
                <span v-if="hasCondition1.length">{{hasCondition1.join('，')}}</span>
                <span v-else="">无</span>
              </span>

              <div class="detail-btn-content rea">
                <span class="my-btn refresh" @click="resetFilterAndRe2"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
                <span class="my-btn" :class="{'light-btn':lists2.length == 0 && doneHttp2 && hasRed1}" @click.stop="filtrateShowEditFun2"
                ><img src="../../static/img/red-edit.png" alt="">修改数据</span>
                <span class="my-btn pull-right condition" :class="{'light-search':lists2.length == 0 && doneHttp2 && hasRed1}"
                      @click.stop="filtrateShow2Fun"><img src="../../static/img/red-con.png" alt="">筛选条件</span>
                <!--筛选条件弹框-->
                <div class="filtrate-content hide" id="filtrate-content-2" @click.stop="">
                  <img src="../../static/img/th-1.png" alt="" class="up">
                  <div class="title">搜索选项</div>
                  <div class="content">
                    <div class="single">
                      <div class="left" data-name="flag">旗标：</div>
                      <div class="right" id="flag-div-cnv">
                        <span class="option default in" data-value="r">红</span>
                        <!--<span class="option" data-value="y">黄</span>-->
                        <span class="option" data-value="b">蓝</span>
                        <span id="flag-all-cnv" class="option" data-value="all" @click.stop="" data-flag='allflag'>全部</span>
                        <a class="fa fa-question-circle-o po flag-q common-a" style="color: inherit" :href="manHtml+'help/document?id=1'"
                           target="_blank"></a>
                        <!--<span class="option">不筛选</span>-->
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="alt">变异类型：</div>
                      <div class="right">
                        <span class="option" data-value="del">DEL</span>
                        <span class="option" data-value="dup">DUP</span>
                        <span class="option in default">不筛选</span>
                      </div>
                    </div>

                    <div class="single">
                      <div class="left" data-name="status">报告：</div>
                      <div class="right">
                        <span class="option" data-value="major" data-effect='flag' data-cnv="cnv">主要</span>
                        <span class="option" data-value="minor" data-effect='flag' data-cnv="cnv">次要</span>
                        <span class="option" data-value="all" data-effect='flag' data-cnv="cnv">已标记</span>
                        <span class="option in default" data-effect='reset' data-cnv="cnv">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="genes">基因：</div>
                      <div class="right">
                        <textarea placeholder='请用逗号或换行隔开' v-model="geneTextAreaContent2"></textarea>
                      </div>
                    </div>
                  </div>
                  <span class="my-btn search-btn" @click="filter2"><img src="../../static/img/red-con.png" alt="">搜索</span>
                  <span class="my-btn refresh" @click="resetFilter2"><img src="../../static/img/red-refresh.png" alt="">重置</span>
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

              <!--<div class="detail-btn-content rea">-->
              <!--<span class="my-btn refresh" @click="resetFilterAndRe2"><img src="../../static/img/red-refresh.png" alt="">刷新</span>-->
              <!--<span class="my-btn pull-right condition" @click.stop="filtrateShow2Fun"><img src="../../static/img/red-con.png" alt="">筛选条件</span>-->
              <!--</div>-->

            </div>
            <!--<div class="my-table-content">-->
            <table class="table my-table long" id="table-2">
              <thead>
              <tr>
                <th>
                  位点
                  <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                     data-original-title="红色代表最高优先级，黄色代表第二优先级，蓝色代表第三优先级">
                  </i>
                </th>
                <th style="width: 70px">长度</th>
                <th>基因</th>
                <th style="width: 70px">区域</th>
                <th>疾病</th>
                <th style="width: 50px">基因型</th>
                <th style="width: 60px">深度(原始)</th>
                <th style="width: 74px">
                  深度
                  <div>(标准化)</div>
                </th>
                <th style="width: 77px">报告状态</th>
              </tr>
              </thead>
              <tbody>
              <!--@click="showLocus(data.variant.chrom+':'+data.variant.start+':'+data.variant.end+':'+data.variant.ref+':'+data.variant.alt,1)">-->
              <tr v-for="(data,index) in lists2" :class="{'tr-bc':index%2}">
                <td class="" style="max-width: 130px">
                  <i title="查看详情" class="fa fa-font-awesome po" @click="showDetail(data,1,data.id)"
                     :class="{'text-1':data.level == 0,'text-2':data.level==1,'text-3':data.level==2}"></i>
                  <a class="po common-a" v-if="data.variant"
                     @click="showLocus(data.id,1,data.variant.chrom+':'+data.variant.start+':'+data.variant.end+':'+data.variant.ref+':'+data.variant.alt)">
                    <span
                      v-if="data.variant.start == data.variant.end">{{data.variant.chrom}}:{{data.variant.start}}({{data.variant.alt}})</span>
                    <span
                      v-else="">{{data.variant.chrom}}:{{data.variant.start}}-{{data.variant.end}}({{data.variant.alt}})</span>
                  </a>
                </td>
                <td>{{data.length ? data.length : '-'}}</td>
                <td class="warp">
                  <span v-if="data.anno">
                     <a class="common-a block" target="_blank" v-for="sGene in data.anno.genes.symbols"
                        :href="dbHtml+'#/gene?geneValue='+data.anno.genes.symbols.join(',')">{{sGene}}</a>
                  </span>
                </td>
                <td class="warp">
                  <span v-if="data.anno">{{data.anno.regions.join(',')}}</span>
                </td>
                <diseaseTd class="warp" style="max-width: 250px" :diseases="data.diseases" @sendOmimId="getOmimId"></diseaseTd>
                <td><span v-if="data.info&& data.info.info.wes">{{data.info.info.wes.geneType ? data.info.info.wes.geneType : '-'}}</span><span
                  v-else=""> - </span>
                </td>
                <td><span v-if="data.info&& data.info.info.wes">{{data.info.info.wes.originalReadDepth ? data.info.info.wes.originalReadDepth
                  : '-'}}</span><span
                  v-else=""> - </span></td>
                <td><span v-if="data.info&& data.info.info.wes">{{data.info.info.wes.readDepth ? data.info.info.wes.readDepth : '-'}}</span><span
                  v-else=""> - </span></td>
                <td>
                   <span v-if="data.info&&data.info.edit" :class="{ active1: data.info.edit.status=='major',active2: data.info.edit.status=='minor',active3: data.info.edit.status=='benign',
                  active4: data.info.edit.status=='invalid'}">
                    {{data.info.edit.status | getStatus}}
                  </span>
                </td>
              </tr>
              <tr v-if="lists2.length == 0 && doneHttp2">
                <td colspan="9" class="center noResult-td">
                  <!--当前暂无筛选结果，请尝试在页面上方修改信息或筛选条件-->
                  <img src="../../static/img/no-result-1.png" alt="">
                </td>
                <!--<td colspan="9" class="center" v-else="">暂无数据</td>-->
              </tr>

              </tbody>
            </table>
            <!--</div>-->

            <page :childCount="count2" :childReset="reset2" @childCurrent="getCurrent2"></page>
          </div>
          <div class="content-3" :class="{hide:!in3}">
            <geneCover :ID="ID" app="grandmgd"></geneCover>
          </div>

          <div class="content-4" :class="{hide:!in4}">
            <div class="top-content">
              <span class="con"><span class="title red">已选条件：</span>
                <span v-if="hasCondition4.length">{{hasCondition4.join('，')}}</span>
                <span v-else="">无</span>
              </span>

              <div class="detail-btn-content rea">
                <span class="my-btn refresh" @click="resetFilterAndRe4"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
                <span class="my-btn" @click.stop="filtrateShowEditFun4" @click=""><img src="../../static/img/red-edit.png" alt="">修改数据</span>
                <span class="my-btn pull-right condition" @click.stop="filtrateShow4Fun"><img src="../../static/img/red-con.png" alt="">筛选条件</span>
                <!--筛选条件弹框-->
                <div class="filtrate-content hide" id="filtrate-content-4" @click.stop="">
                  <img src="../../static/img/th-1.png" alt="" class="up">
                  <div class="title">搜索选项</div>
                  <div class="content">
                    <div class="single">
                      <div class="left" data-name="flag">旗标：</div>
                      <div class="right" id="flag-div-4">
                        <span class="option in default" data-value="r" data-mt="true">红</span>
                        <span class="option" data-value="y" data-mt="true">黄</span>
                        <span class="option" data-value="b" data-mt="true">蓝</span>
                        <span id="flag-all-4" class="option" data-value="all" @click.stop="" data-flag='allflag' data-mt="true">全部</span>
                        <a class="fa fa-question-circle-o po flag-q common-a" style="color: inherit" :href="manHtml+'help/document?id=1'" target="_blank"></a>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="clinvar">CLINVAR：</div>
                      <div class="right">
                        <span class="option" data-value="true" data-mt="true">已报道</span>
                        <span class="option" data-value="false" data-mt="true">未报道</span>
                        <span class="option in default" data-mt="true">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="mitipact">MITIPACT：</div>
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
                      <div class="left" data-name="grandfreq">本地人群携带率低于：</div>
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
                  <span class="my-btn search-btn" @click="filter4"><img src="../../static/img/red-con.png" alt="">搜索</span>
                  <span class="my-btn refresh" @click="resetFilter4"><img src="../../static/img/red-refresh.png"
                                                                         alt="">重置</span>
                </div>
                <!--修改数据弹框-->
                <div class="filtrate-content hide" id="filtrate-content-edit4">
                  <img src="../../static/img/th-1.png" alt="" class="up">
                  <ul>
                    <li @click="showPanelModal">修改基因信息</li>
                    <li @click="showGenoModal">修改表型信息</li>
                  </ul>
                </div>
              </div>
            </div>

            <table class="table my-table" id="table-mt">
              <thead>
              <tr>
                <th>位点
                  <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                     data-original-title="红色代表最高级，黄色代表第二级，蓝色代表第三级">
                  </i>
                </th>
                <th style="width: 103px">基因</th>
                <th style="width: 70px">区域</th>
                <th>功能</th>
                <th>疾病</th>
                <th class="warp" style="width: 103px">CLINVAR
                  <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                     data-original-title="O代表other,B代表Benign,LB代表Likely benign,P代表Pathogenic,LP代表Likely Pathogenic，NP代表not provided">
                  </i>
                </th>
                <th style="width: 70px">MITIMPACT</th>
                <th style="width: 70px">MITOMAP</th>
                <th style="width: 70px">人群频率(%)</th>
                <th style="width: 70px">变异比例(%)</th>
                <th style="width: 77px">报告状态</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in lists4" :class="{'tr-bc':index%2}">
                <td>
                  <i title="查看详情" class="fa fa-font-awesome po" @click="showDetail(data,4,data.id)"
                     :class="{'text-1':data.level == 0,'text-2':data.level==1,'text-3':data.level==2}"></i>
                  <a class="po common-a" v-if="data.variant"
                     @click="showLocus(data.id,0,data.variant.chrom+':'+data.variant.start+':'+data.variant.end+':'+data.variant.ref+':'+data.variant.alt)">
                     <span>{{data.showLocusStr}}</span>
                  </a>
                </td>
                <td class="warp">
                  <span v-if="data.anno">
                    <a class="common-a block" v-for="sGene in data.anno.genes.symbols"
                       :href="dbHtml+'#/gene?geneValue='+data.anno.genes.symbols.join(',')">{{sGene}}</a>
                  </span>
                </td>
                <td class="warp"><span v-if="data.anno">{{data.anno.regions.join(',')}}</span></td>
                <td><span v-if="data.anno &&data.anno.funcs.length!=0">{{data.anno.funcs.join(',')}}</span><span v-else="">-</span></td>
                <diseaseTd :diseases="data.diseases" @sendOmimId="getOmimId"></diseaseTd>
                <td>
                  <div v-if="data.anno">
                    <div v-for="clinvarSingle in data.anno.dbinfo.clinvar">
                    <span class="po bold" data-toggle="tooltip" data-placement="top"
                          :data-original-title='clinvarSingle.substring(0,clinvarSingle.indexOf(":"))'>
                      [{{clinvarSingle | clinvarFilterFirst}}]
                    </span>
                      ({{clinvarSingle | clinvarFilterLast}})
                    </div>
                  </div>
                </td>
                <td v-if="data.anno">{{data.anno.dbinfo.mitimpact ? data.anno.dbinfo.mitimpact : '-'}}</td>
                <td v-if="data.anno">{{data.anno.dbinfo.mitomap ? data.anno.dbinfo.mitomap : '-'}}</td>
                <td v-if="data.anno">{{data.anno.freqs.mtdb | getPercent}}</td>
                <td><span v-if="data.info && data.info.info">{{data.info.info.ratio | getPercent}}</span></td>
                <td>
                  <span v-if="data.info&&data.info.edit" :class="{ active1: data.info.edit.status=='major',active2: data.info.edit.status=='minor',active3: data.info.edit.status=='benign',
                  active4: data.info.edit.status=='invalid'}">
                  {{data.info.edit.status | getStatus}}
                  </span>
                </td>
              </tr>

              <tr v-if="lists4.length == 0 && doneHttp4">
                <td colspan="12" class="center noResult-td">
                  <img src="../../static/img/no-result-1.png" alt="">
                </td>
              </tr>

              </tbody>
            </table>

            <page :childCount="count4" :childReset="reset4" @childCurrent="getCurrent4"></page>
          </div>

        </div>
      </div>

      <locusModal :datafile="datafile" :locusId="locusId" :locus="locus" :type="type"></locusModal>
      <panelModal @saveData="savePanel" :originalGeneInput='geneInput' :originalPanelData="originalPanelData"></panelModal>
      <genoModal :datafile="datafile" :modalPanelData="modalPanelData" :modalGeneData="modalGeneData"></genoModal>
      <hpoModal :omimId="omimId"></hpoModal>
      <mutateModal :datafile="datafile" @changeStatus="getMutateModalStatus" :moduleDataFromFather="moduleData" :ID="ID" :app="grandApp"
                   :postId="snvId"></mutateModal>
      <mutateModalCNV :datafile="datafile" @changeStatusCNV="getMutateModalStatusCNV" :moduleDataFromFatherCNV="moduleDataCNV" :postId="cnvId"
                      :ID="ID"></mutateModalCNV>
    </div>
  </div>
</template>

<script>
  import page from './global/Page.vue'
  //  import panelModal from './global/PanelModal.vue'
  import panelModal from './global/PanelModalNew.vue'
  import genoModal from './global/genotypeModal.vue'
  import diseaseTd from './global/DiseaseTdNew.vue'
  import locusM from './global/LocusModal.vue'
  import mutateModal from './global/MutateModal.vue'
  //  import hpoModal from './global/HpoModal.vue'
  import hpoModal from './global/HpoModalNew.vue'
  import mutateModalCNV from './global/MutateModalCNV.vue'
  import geneCover from './global/GeneCover.vue'

  export default {
    components: {
      'page': page,
      'panelModal': panelModal,
      'genoModal': genoModal,
      'diseaseTd': diseaseTd,
      'locusModal': locusM,
      'mutateModal': mutateModal,
      'mutateModalCNV': mutateModalCNV,
      'hpoModal': hpoModal,
      'geneCover': geneCover,
    },
    data: function () {
      return {
        grandApp:'grandmgd',
        doneHttp1: '',
        doneHttp2: '',
        doneHttp4: '',
        omimId: 0,
        modalPanelData: '',
        modalGeneData: '',
        hasRed: '',
        hasRed1: '',
        hasRed4: '',
        hasCondition: [],
        hasCondition1: [],
        hasCondition4: [],
        //公用
        snvId: 0,
        cnvId: 0,
        locus: '',
        locusId: 0,
        type: 0,
        phenotypeMapSingle: '',
        ID: this.$route.query.id,
        datafile: '',
        sampleInfo: '',
        in0: true,
        in1: '',
        in2: '',
        in3: '',
        in4: '',
        geneInput: '',
        originalPanelData: [],
        loading3: false,
        //content-0
        loading0: false,
        R1: '',
        R2: '',
        insert: '',
        CSV: '',
        lists0: [],
        //content-1
        loading1: false,
        lists1: [],
        geneTextArea: '',
        geneTextAreaShow: false,
        count1: 0,
        page1: 1,
        reset1: 0,
        moduleData: '',
        filtrateShow1: false,
        //content-2
        loading2: false,
        lists2: [],
        geneTextAreaContent2: '',
        count2: 0,
        page2: 1,
        reset2: 0,
        moduleDataCNV: '',
        filtrateShow2: false,

        //content-3
        lists4:[],
        page4: 1,
        reset4: 0,
        count4: 0,
        geneTextAreaContent4: '',
        loading4: false,

        //请求链接cnv snv
        snvUrl: '',
        cnvUrl: '',
        csv: {},
      }
    },
    mounted: function () {
      this.bindCurrent()//绑定变异详情的过滤点击事件
      this.getSampleAndUrl()
      this.getStat()
      this.showHasCondition()
    },
    methods: {
      coverFun: function () {
        const _cover = $('.cover')
        _cover.addClass('hide')
        _cover.parent().find('.light-btn').removeClass('light-btn')
        _cover.parent().find('.light-search').removeClass('light-search')
      },
      filtrateShowEditFun: function () {
        this.coverFun()
        this.switchHide('filtrate-content-edit')
      },
      filtrateShowEditFun2: function () {
        this.coverFun()
        this.switchHide('filtrate-content-edit2')
      },
      filtrateShowEditFun4: function () {
        this.switchHide('filtrate-content-edit4')
      },
      toGene: function (index, geneids) {
        const _vue = this
        $.each(geneids, function (i, value) {
          if (i == index) {
            _vue.$router.push(_vue.dbHtml + 'geneD?geneId=' + value)
          }
        })
      },
      getOmimId: function (id) {
        this.omimId = id
      },
      //计算已选条件显示出来
      showHasCondition: function () {
        const _vue = this
        _vue.hasCondition = []
        _vue.hasCondition1 = []
        $('#filtrate-content').find('.content').find('.single').each(function () {
          const _in = $(this).find('.right').find('.in')
          let inData = _in.html()
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
        })
        if (this.geneTextArea) {
          _vue.hasCondition.push('基因个数：' + this.strToArr(this.geneTextArea).length)
        }
        _vue.hasRed = _vue.hasCondition.join(',').includes('旗标：红')

        $('#filtrate-content-2').find('.content').find('.single').each(function () {
          const _in = $(this).find('.right').find('.in')
          let inData = _in.html()
          if (_in.length && inData != '不筛选') {
            if (_in.html().includes('&')) {
              inData = _in.data('value')
            }
            _vue.hasCondition1.push(_in.parent().prev().html() + inData)
          }
        })
        if (this.geneTextAreaContent2) {
          _vue.hasCondition1.push('基因个数' + this.strToArr(this.geneTextAreaContent2).length)
        }
        _vue.hasRed1 = _vue.hasCondition1.join(',').includes('旗标：红')

        _vue.hasCondition4 = [];
        $('#filtrate-content-4').find('.content').find('.single').each(function () {
          const _in = $(this).find('.right').find('.in')
          let inData = _in.html()
          if (_in.length && inData != '不筛选') {
            if (_in.html().includes('&')) {
              inData = _in.data('value')
            }
            _vue.hasCondition4.push(_in.parent().prev().html() + inData)
          }
        })
        _vue.hasRed4 = _vue.hasCondition4.join(',').includes('旗标：红')
      },
      //查看位点信息
      showLocus: function (id, type, locus) {
        this.locus = locus
        this.locusId = id
        this.type = type
        $('#locusM').modal('show')
      },
      /*修改基因信息*/
      getSampleDatafile: function () {
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
        this.getSampleDatafile()
        $('#panelModal').modal('show')
      },
      savePanel: function (data) {
        this.loading1 = true
        let panelArr = []
        const _vue = this
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
          _vue.loading1 = false
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      /*修改表型信息*/
      showGenoModal: function () {
        this.getSampleDatafile()
        $('#genotype-modal').modal('show')
      },
      //获取样本信息
      getSampleAndUrl: function () {
        const _vue = this
        this.myAxios({
          url: 'application/job/' + this.ID + '/url/'
        }).then(function (resp) {
          const data = resp.data
          //QC和inse
          if (data.files) {
            if (data.files.fastqc) {
              _vue.R1 = data.files.fastqc[0]
              _vue.R2 = data.files.fastqc[1]
            }
            _vue.insert = data.files.insertsize
            _vue.csv = data.files.csv
          }

          //CNV.SNV
          if (data.cnv) {
            _vue.cnvUrl = resp.data.cnv.query_url + '?'
            $.each(data.cnv.query_params, function (i, data) {
              _vue.cnvUrl += '&' + i + '=' + data
            })
            _vue.getList2()
          }
          if (data.snv) {
            _vue.snvUrl = resp.data.snv.query_url + '?'
            $.each(data.snv.query_params, function (i, data) {
              _vue.snvUrl += '&' + i + '=' + data
            })
            _vue.getList1()
            _vue.getList4()
          }
        }).catch(function (error) {
          _vue.catchFun(error)
        })

        this.myAxios({
          url: 'application/job/' + this.ID + '/'
        }).then(function (resp) {
          _vue.sampleInfo = resp.data.name
          _vue.datafile = resp.data.parameter.datafile
        }).catch(function (error) {
          _vue.catchFun(error)
        })

      },
      getStat: function () {
        const _vue = this
        this.myAxios({
          url: 'application/job/' + this.ID + '/stat/'
        }).then(function (resp) {
          resp = resp.data
          const qObj = _vue.getValue(resp.final)//定义传到质控列表的对象
          qObj.q30 = resp.data.q30 === -1 ? '---' : resp.data.q30
          qObj.volume = resp.data.volume === -1 ? '---' : resp.data.volume
          qObj.baseGender = resp.data.gender
          qObj.gender = resp.data.gender
          if (qObj.Sample_gender.includes('Male')) {
            qObj.Sample_gender = '男'
          } else if (qObj.Sample_gender.includes('Female')) {
            qObj.Sample_gender = '女'
          } else {
            qObj.Sample_gender = '未知'
          }
          //如果性别和20X都不对
          if (qObj.Sample_gender !== qObj.gender && qObj.above_20 < 95) {
            alert('指数严重不合格！')
          }
          const arr = [
            {
              type: '20X覆盖度',
              grandValue: '≥≈95%',
              realValue: qObj.above_20,
              standard: qObj.above_20 >= 95
            }, {
              type: '性别',
              grandValue: qObj.baseGender,
              realValue: qObj.Sample_gender,
              standard: qObj.Sample_gender == qObj.gender
            }, {
              type: 'Q30',
              grandValue: '≥85%',
              realValue: qObj.q30,
              standard: qObj.q30 >= 85
            }, {
              type: '数据量(M)',
              grandValue: '≥10G',
              realValue: qObj.volume,
              standard: qObj.volume >= 10000
            }, {
              type: 'Duplication%',
              grandValue: '≤20%',
              realValue: _vue.getPercent1(qObj.duplication),
              standard: qObj.duplication <= 0.2
            }, {
              type: 'Total Reads%',
              grandValue: '---',
              realValue: qObj.total,
              standard: true
            }, {
              type: 'QC passed Reads%',
              grandValue: '---',
              realValue: qObj.qc,
              standard: true
            }, {
              type: 'Mapped Reads%',
              grandValue: '---',
              realValue: qObj.mapped,
              standard: true
            }, {
              type: '捕获效率',
              grandValue: '≥70%',
              realValue: _vue.getPercent1(qObj.target),
              standard: qObj.target >= 0.7
            }, {
              type: '平均深度',
              grandValue: '≥75X',
              realValue: qObj.depth,
              standard: qObj.depth >= 75
            }, {
              type: '1X覆盖度',
              grandValue: '---',
              realValue: qObj.above_1 / 100,
              standard: true
            }, {
              type: '5X覆盖度',
              grandValue: '---',
              realValue: qObj.above_5 / 100,
              standard: true
            }, {
              type: '10X覆盖度',
              grandValue: '---',
              realValue: qObj.above_10 / 100,
              standard: true
            }, {
              type: '30X覆盖度',
              grandValue: '---',
              realValue: qObj.above_30 / 100,
              standard: true
            }
          ]
          $.each(resp.aln, function (i, data) {
            $.each(arr, function (n, k) {
              if (i === n) {
                k.detail = data
              }
            })
          })
          _vue.lists0 = arr
          _vue.loading0 = false
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      //每个块域的逻辑
      /*疾病TD里面显示hpo的弹框*/
      getPhenotypeMapSingle: function (data) {
        this.phenotypeMapSingle = data
      },
      getValue: function (final) {
        const obj = {}
        $.each(final, function (i, data) {
          if (data.name === 'mapped reads') {
            obj.mapped = data.value.raw
          } else if (data.name === 'QC passed reads') {
            obj.qc = data.value
          } else if (data.name === 'total reads') {
            obj.total = data.value
          } else if (data.name === 'duplication rate') {
            obj.duplication = data.value
          } else if (data.name === 'target reads ratio') {
            obj.target = data.value
          } else if (data.name === 'depth') {
            obj.depth = data.value
          } else if (data.name === '%_bases_above_1') {
            obj.above_1 = data.value
          } else if (data.name === '%_bases_above_5') {
            obj.above_5 = data.value
          } else if (data.name === '%_bases_above_10') {
            obj.above_10 = data.value
          } else if (data.name === '%_bases_above_20') {
            obj.above_20 = data.value
          } else if (data.name === '%_bases_above_30') {
            obj.above_30 = data.value
          } else if (data.name === 'Sample_gender') {
            obj.Sample_gender = data.value
          }
        })
        return obj
      },
      current1: function () {
//        if (this.lists1.length === 0) {
//          this.getList1();
//        }
      },
      getList1: function () {
        this.loading1 = true
        this.doneHttp1 = false
        let urlParam = ''
        $('#filtrate-content').find('.option').each(function () {
          if ($(this).html() !== '不筛选' && $(this).hasClass('in')) {
            urlParam += '&' + $(this).parent().prev().data('name') + '=' + $(this).data('value')
          }
        })
        if (this.geneTextArea) {
          urlParam += '&genes=' + this.strToArr(this.geneTextArea)
        }
        //条件判断结束
        const _vue = this
        this.lists1 = []
        this.myAxios({
          url: _vue.snvUrl + '&page=' + _vue.page1 + urlParam+'&is_mt=false',
//          url:'https://dev-analyze.grandbox.site/report/snv/?&datafile=59965ae4ccaa6c5f03a30cdf&date=2017-08-26&page=1&inheritance=All'
        }).then(function (resp) {
          if (resp.data.count === 0) {
            _vue.loading1 = false
          }
          _vue.count1 = resp.data.count
//          let genePostData = [];
          $.each(resp.data.results, function (i, value) {
            //处理highlight和active得到级别(highlight为true的时候active必定为true)
            if (value.info.highlight) {
              value.level = 0
            } else if (!value.info.highlight && value.actived) {
              value.level = 1
            } else if (!value.info.highlight && !value.actived) {
              value.level = 2
            }
//            $.each(value.anno.genes.geneids, function (n, k) {
//              if (!genePostData.join(',').includes(k)) {
//                genePostData.push(k)
//              }
//            });
//            value.geneResp = [];
            const ref = value.variant.ref.length > 3 ? value.variant.ref.substring(0, 3) + '...' : value.variant.ref
            const alt = value.variant.alt.length > 3 ? value.variant.alt.substring(0, 3) + '...' : value.variant.alt

            if (value.variant.end == value.variant.start) {
              value.showLocusStr = value.variant.chrom + ':' + value.variant.start + '(' + ref + '/' + alt + ')'
            } else {
              value.showLocusStr = value.variant.chrom + ':' + value.variant.start + '-' + value.variant.end + '(' + ref + '/' + alt + ')'
            }

            value.anno.freqs.dbfreq.large =
              value.anno.freqs.dbfreq.exome - value.anno.freqs.dbfreq.genome > 0 ? value.anno.freqs.dbfreq.exome : value.anno.freqs.dbfreq.genome

          })
          _vue.lists1 = resp.data.results

          _vue.loading1 = false
          _vue.doneHttp1 = true
//          if (genePostData.length != 0) {
//            _vue.myAxios({
//              url: _vue.dbUrl + 'knowledge/gene/dictbygeneids/',
//              method: 'post',
//              data: {
//                geneids: genePostData
////                geneids: [5310]
//              }
//            }).then(function (respA) {
//              let count0 = 0;
//              let count1 = 0;
//              $.each(respA.data, function () {
//                count1 += 1;
//              });
//              $.each(respA.data, function (k1, k2) {
//                count0 += 1;
//                $.each(resp.data.results, function (n1, n2) {
//                  $.each(n2.anno.genes.geneids, function (n3, n4) {
//                    if (k1 == n4) {
//                      n2.geneResp.push({
//                        geneId: n4,
//                        geneData: k2
//                      });
//                    }
//                  })
//                });
//                if (count0 === count1) {
//                  _vue.loading1 = false
//                }
//              });
//            });
//          } else {
//            _vue.loading1 = false
//          }
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      filtrateShow1Fun: function () {
        this.switchHide('filtrate-content')
      },
      showDetail: function (data, type, ToPostId) {
        const _vue = this
        if (type === 0) {
          _vue.grandApp = 'grandmgd'
          _vue.moduleData = data
          _vue.snvId = ToPostId
          $('#mutateDetailModal').modal('show')
        } else if (type === 1) {
          _vue.moduleDataCNV = data
          _vue.cnvId = ToPostId
          $('#mutateDetailModalCNV').modal('show')
        }else if(type == 4){
          _vue.grandApp = 'grandmito'
          _vue.moduleData = data
          _vue.snvId = ToPostId
          $('#mutateDetailModal').modal('show')
        }
      },
      getMutateModalStatus: function (newStatus) {
        const _vue = this
        $.each(_vue.lists1, function (i, data) {
          if (data.id == _vue.snvId) {
            data.info.edit.status = newStatus.status
            data.info.edit.comment = newStatus.comment
//            data.info.edit.validation = newStatus.validation
          }
        });
        $.each(_vue.lists4, function (i, data) {
          if (data.id == _vue.snvId) {
            data.info.edit.status = newStatus.status
            data.info.edit.comment = newStatus.comment
//            data.info.edit.validation = newStatus.validation
          }
        })
      },
      getCurrent: function (data) {
        this.page1 = data
        this.reset1 = 0
        this.getList1()
      },
      filter: function () {
        this.page1 = 1
        this.reset1 = 1
        this.getList1()
        $('#filtrate-content').addClass('hide')
        this.showHasCondition()
      },

      getList2: function () {
        this.loading2 = true
        this.doneHttp2 = false
        let urlParam = ''
        $('#filtrate-content-2').find('.option').each(function () {
          if ($(this).html() !== '不筛选' && $(this).hasClass('in')) {
            urlParam += '&' + $(this).parent().prev().data('name') + '=' + $(this).data('value')
          }
        })
        if (this.geneTextAreaContent2) {
          urlParam += '&genes=' + $.trim(this.geneTextAreaContent2)
        }
        //条件判断结束
        const _vue = this
        this.lists2 = []
        this.myAxios({
          url: _vue.cnvUrl + '&page=' + _vue.page2 + urlParam,
//          url: 'https://dev-analyze.grandbox.site/report/cnv/?&datafile=59965ae4ccaa6c5f03a30cdf&date=2017-08-26&page=1',
        }).then(function (resp) {
          if (resp.data.count === 0) {
            _vue.loading2 = false
          }
          _vue.count2 = resp.data.count
          //填充列表
//          let genePostData = [];
          $.each(resp.data.results, function (i, value) {
            //处理highlight和active得到级别(highlight为true的时候active必定为true)
            if (value.info.highlight) {
              value.level = 0
            } else if (!value.info.highlight && value.actived) {
              value.level = 1
            } else if (!value.info.highlight && !value.actived) {
              value.level = 2
            }
          })
          _vue.lists2 = resp.data.results
          _vue.loading2 = false
          _vue.doneHttp2 = true

//          if (genePostData.length != 0) {
//            _vue.myAxios({
//              url: _vue.dbUrl + 'knowledge/gene/dictbygeneids/',
//              method: 'post',
//              data: {
//                geneids: genePostData
//              }
//            }).then(function (respA) {
//              let count0 = 0;
//              let count1 = 0;
//              $.each(respA.data, function () {
//                count1 += 1;
//              });
//              $.each(respA.data, function (k1, k2) {
//                count0 += 1;
//                $.each(resp.data.results, function (n1, n2) {
//                  $.each(n2.anno.genes.geneids, function (n3, n4) {
//                    if (k1 == n4) {
//                      n2.geneResp.push({
//                        geneId: n4,
//                        geneData: k2
//                      });
//                    }
//                  })
//                });
//                if (count0 === count1) {
//                  _vue.loading2 = false
//                }
//              });
//            });
//          } else {
//            _vue.loading2 = false
//          }

        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      filtrateShow2Fun: function () {
        this.switchHide('filtrate-content-2')
      },
      getMutateModalStatusCNV: function (newStatus) {
        const _vue = this
        $.each(_vue.lists2, function (i, data) {
          if (data.id == _vue.cnvId) {
            data.info.edit.status = newStatus.status
            data.info.edit.comment = newStatus.comment
//            data.info.edit.validation = newStatus.validation
          }
        })
      },
      filter2: function () {
        this.page2 = 1
        this.reset2 = 1
        this.getList2()
        $('#filtrate-content-2').addClass('hide')
        this.showHasCondition()
      },
      getCurrent2: function (data) {
        this.page2 = data
        this.reset2 = 0
        this.getList2()
      },

      getList4: function () {
        this.loading4 = true
        this.doneHttp4 = false
        let urlParam = ''
        $('#filtrate-content-4').find('.option').each(function () {
          if ($(this).html() !== '不筛选' && $(this).hasClass('in')) {
            urlParam += '&' + $(this).parent().prev().data('name') + '=' + $(this).data('value')
          }
        })
        //条件判断结束
        const _vue = this
        this.lists4 = []
        this.myAxios({
          url: _vue.snvUrl + '&page=' + _vue.page4 + urlParam+'&is_mt=true',
        }).then(function (resp) {
          if (resp.data.count === 0) {
            _vue.loading4 = false
          }
          _vue.count4 = resp.data.count

          $.each(resp.data.results, function (i, value) {
            //处理highlight和active得到级别(highlight为true的时候active必定为true)
            if (value.info.highlight) {
              value.level = 0
            } else if (!value.info.highlight && value.actived) {
              value.level = 1
            } else if (!value.info.highlight && !value.actived) {
              value.level = 2
            }

            const ref = value.variant.ref.length > 3 ? value.variant.ref.substring(0, 3) + '...' : value.variant.ref
            const alt = value.variant.alt.length > 3 ? value.variant.alt.substring(0, 3) + '...' : value.variant.alt

            if (value.variant.end == value.variant.start) {
              value.showLocusStr = value.variant.chrom + ':' + value.variant.start + '(' + ref + '/' + alt + ')'
            } else {
              value.showLocusStr = value.variant.chrom + ':' + value.variant.start + '-' + value.variant.end + '(' + ref + '/' + alt + ')'
            }

            value.anno.freqs.dbfreq.large =
              value.anno.freqs.dbfreq.exome - value.anno.freqs.dbfreq.genome > 0 ? value.anno.freqs.dbfreq.exome : value.anno.freqs.dbfreq.genome

          })
          _vue.lists4 = resp.data.results

          _vue.loading4 = false
          _vue.doneHttp4 = true
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },
      filtrateShow4Fun: function () {
        this.switchHide('filtrate-content-4')
      },
      getCurrent4: function (data) {
        this.page4 = data
        this.reset4 = 0
        this.getList4()
      },
      filter4: function () {
        this.page4 = 1
        this.reset4 = 1
        this.getList4()
        $('#filtrate-content-4').addClass('hide')
        this.showHasCondition()
      },
      //切换导航
      changeContent: function (event) {
        const _current = $(event.target)
        const current = _current.data('type')
        _current.parent().find('.active').removeClass('active')
        _current.addClass('active')
        this.in0 = ''
        this.in1 = ''
        this.in2 = ''
        this.in3 = ''
        this.in4 = ''
        if (current === 0) {
          this.in0 = true
        } else if (current === 1) {
          this.in1 = true
        } else if (current === 2) {
          this.in2 = true
        } else if (current === 3) {
          this.in3 = true
        } else if (current === 4) {
          this.in4 = true
        }
      },
      //绑定基础操作
      bindCurrent: function () {
        /*旗标里面的全部这个span*/
        const _flagSpan = $('#flag-all')
        const _flagSpan4 = $('#flag-all-4')
        const _flagSpanCNV = $('#flag-all-cnv')
        /*旗标 这个rightdiv*/
        const _flagDiv = $('#flag-div')
        const _flagDiv4 = $('#flag-div-4')
        const _flagDivCNV = $('#flag-div-cnv')
        let oldFlag = ''
        $('.option').on('click', function (e) {
          /*报告点主要次要的时候，旗标自动勾选全部*/
          if ($(e.target).data('flag') == 'allflag') {
          } else {
            const ef = $(e.target).data('effect')
            if (ef == 'flag') {
              if ($(e.target).data('cnv') == 'cnv') {
                oldFlag = _flagDivCNV.find('.in').data('value') == 'all' ? oldFlag : _flagDivCNV.find('.in').data('value')
                _flagDivCNV.find('.in').removeClass('in')
                _flagSpanCNV.addClass('in')
              } else {
                if ($(e.target).data('mt')) {
                  oldFlag = _flagDiv4.find('.in').data('value') == 'all' ? oldFlag : _flagDiv4.find('.in').data('value')
                  _flagDiv4.find('.in').removeClass('in')
                  _flagSpan4.addClass('in')
                } else {
                  oldFlag = _flagDiv.find('.in').data('value') == 'all' ? oldFlag : _flagDiv.find('.in').data('value')
                  _flagDiv.find('.in').removeClass('in')
                  _flagSpan.addClass('in')
                }
              }

            } else if (ef == 'reset') {
              if ($(e.target).data('cnv') == 'cnv') {
                if (_flagSpanCNV.hasClass('in')) {
                  _flagDivCNV.find('.option').each(function () {
                    const val = $(this).data('value')
                    if (val == oldFlag) {
                      _flagDivCNV.find('.in').removeClass('in')
                      $(this).addClass('in')
                    }
                  })
                }
              } else {
                if ($(e.target).data('mt')) {
                  if (_flagSpan4.hasClass('in')) {
                    _flagDiv4.find('.option').each(function () {
                      const val = $(this).data('value')
                      if (val == oldFlag) {
                        _flagDiv4.find('.in').removeClass('in')
                        $(this).addClass('in')
                      }
                    })
                  }
                } else {
                  if (_flagSpan.hasClass('in')) {
                    _flagDiv.find('.option').each(function () {
                      const val = $(this).data('value')
                      if (val == oldFlag) {
                        _flagDiv.find('.in').removeClass('in')
                        $(this).addClass('in')
                      }
                    })
                  }
                }
              }

            }
            $(this).parent().find('.in').removeClass('in')
            $(this).addClass('in')
          }
        })
      },
      resetFilter: function () {
        this.geneTextArea = ''
        $('.content-1').find('.default').each(function () {
          $(this).parent().find('.in').removeClass('in')
          $(this).addClass('in')
        })
      },
      resetFilter2: function () {
        this.geneTextAreaContent2 = ''
        $('.content-2').find('.default').each(function () {
          $(this).parent().find('.in').removeClass('in')
          $(this).addClass('in')
        })
      },
      resetFilter4: function () {
        this.geneTextAreaContent4 = ''
        $('.content-4').find('.default').each(function () {
          $(this).parent().find('.in').removeClass('in')
          $(this).addClass('in')
        })
      },
      resetFilterAndRe: function () {
        this.resetFilter()
        this.page1 = 1
        this.reset1 = 1
        this.getList1()
        this.showHasCondition()
      },
      resetFilterAndRe2: function () {
        this.resetFilter2()
        this.page2 = 1
        this.reset2 = 1
        this.getList2()
        this.showHasCondition()
      },
      resetFilterAndRe4: function () {
        this.resetFilter4()
        this.page4 = 1
        this.reset4 = 1
        this.getList4()
        this.showHasCondition()
      },
      getPercent1: function (data) {
//        if (data == 0) {
//          return 0;
//        }
//        data = data * 100;
//        data = data.toFixed(2);
//        return data

        return Math.round(data * 10000) / 100

      },
    },
    watch: {
      geneTextArea: function (newData) {
        let trimD = $.trim(newData)
        const _fAll = $('#flag-all')
        const _fAllF = _fAll.parent()
        if (trimD) {
          _fAllF.find('.in').removeClass('in')
          _fAll.addClass('in')
        } else {
          _fAllF.find('.in').removeClass('in')
          _fAllF.find('.default').addClass('in')
        }
      },
      geneTextAreaContent2: function (newData) {
        let trimD = $.trim(newData)
        const _fAll = $('#flag-all-cnv')
        const _fAllF = _fAll.parent()
        if (trimD) {
          _fAllF.find('.in').removeClass('in')
          _fAll.addClass('in')
        } else {
          _fAllF.find('.in').removeClass('in')
          _fAllF.find('.default').addClass('in')
        }
      }
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip()
    },
    filters: {
      clinvarFilterFirst: function (data) {
        const index = data.indexOf(':')
        let first = data.substring(0, index)
//        let last = data.substring(index + 1, data.length)
        if (first == 'other') {
          first = 'O'
        } else if (first == 'Benign') {
          first = 'B'
        } else if (first == 'Likely benign') {
          first = 'LB'
        } else if (first == 'Pathogenic') {
          first = 'P'
        } else if (first == 'Likely Pathogenic') {
          first = 'LP'
        } else if (first == 'not provided') {
          first = 'NP'
        }
//        return first + '(' + last + ')'
        return first
      },
      clinvarFilterLast: function (data) {
        const index = data.indexOf(':')
        return data.substring(index + 1, data.length)
      },
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
  #sgResult {

    #table-mt{
      margin-top: 40px;
    }

    .change-panel {
      margin-left: 50px;
    }
    .all-content {
      table {
        box-shadow: none;
        border-radius: 0;
      }
      margin: 15px 0 0 0;
      .flag-q {
        margin: 8px;
      }
      .title-list {
        width: 600px;
        border-bottom: 1px solid @border;
        font-weight: bold;
        margin-bottom: -1px;
        position: relative;
        z-index: 10;
        .title-single {
          display: inline-block;
          width: 116px;
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
        .title-single:not(.active) {
          color: rgb(67, 67, 67)
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
            > .condition {
              position: absolute;
              right: 0;
              top: 0;
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
        .el-table, table#table-1, table#table-2,table#table-mt {
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
        #filtrate-content, #filtrate-content-2 ,#filtrate-content-4{
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
        #filtrate-content-2{
          width: 400px;
          .search-btn {
            margin-left: 80px;
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
              width: 290px;
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
        .content-0 {
          .red {
            color: @red;
          }
          ul {
            padding-left: 0;
            margin: 23px 0;
            li {
              display: inline-block;
              margin-right: 20px;
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
                  /*color: #fff;*/
                  padding: 9px 0;
                }
                th:not(:last-child) {
                  border-left: 1px solid #d3d3d3
                }
                /*.th-1 {*/
                /*background-color: rgb(255, 187, 52);*/
                /*border-left: 1px solid rgb(255, 187, 52);*/
                /*}*/
                /*.th-2 {*/
                /*background-color: rgb(241, 69, 108)*/
                /*}*/
                /*.th-3 {*/
                /*background-color: rgb(0, 198, 148)*/
                /*}*/
                /*.th-4 {*/
                /*background-color: rgb(44, 127, 210);*/
                /*border-right: 1px solid rgb(44, 127, 210);*/
                /*}*/
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
        }
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
        .btn-content {
          clear: both;
          margin-top: 20px;
          .condition {
            margin-right: 30px;
          }
        }
      }
    }
  }

</style>
