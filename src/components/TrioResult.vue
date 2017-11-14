<!--suppress HtmlUnknownTag -->
<template>
  <div class="row" id="trioResult">
    <loading v-if="loading0"></loading>
    <loading v-if="loading1"></loading>
    <loading v-if="loading2"></loading>
    <loading v-if="loading3"></loading>
    <div class="done-list col-sm-11 ">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">< {{sampleInfo}}
          <span>父：<span>{{fatherName}}</span></span>
          <span>母：<span>{{motherName}}</span></span>
        </span>
      </div>
      <div class="all-content">
        <div class="title-list">
          <div @click="changeContent" data-type="0" class="title-single active">全部</div>
          <div @click="changeContent" data-type="1" class="title-single">符合隐性模式</div>
          <div @click="changeContent" data-type="2" class="title-single">符合显性模式</div>
        </div>
        <div class="detail-content">
          <div class="content-0" :class="{hide:!in0}">
            基因分析报告 :
            <router-link target="_blank" class="common-a"
                         :to="{path:'report',query:{code:datafile,app:'snv'}}">点击查看
            </router-link>

            <div class="top-content">
                <span class="con">
                  <span class="title red">已选条件：</span>
                  <span v-if="hasCondition0.length">{{hasCondition0.join('，')}}</span>
                  <span v-else="">无</span>
                </span>
              <div class="detail-btn-content rea">
                <span class="my-btn refresh" @click="resetFilterAndRe0"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
                <span class="my-btn" @click.stop="filtrateShowEditFun0" @click=""><img src="../../static/img/red-edit.png" alt="">修改数据</span>
                <span class="my-btn pull-right condition" @click.stop="filtrateShow0Fun"><img src="../../static/img/red-con.png" alt="">筛选条件</span>
                <!--筛选条件弹框-->
                <div class="filtrate-content hide" @click.stop="" id="filtrate-content-0">
                  <img src="../../static/img/th-1.png" alt="" class="up">
                  <div class="title">搜索选项</div>
                  <div class="content">
                    <div class="single">
                      <div class="left" data-name="flag">旗标：</div>
                      <div class="right" id="flag-div-0">
                        <span class="option" data-value="r">红</span>
                        <span class="option in default" data-value="y">黄</span>
                        <span id="flag-all-0" class="option" data-value="all" @click.stop="" data-flag='allflag'>全部</span>
                        <a class="fa fa-question-circle-o po flag-q common-a" style="color: inherit" :href="manHtml+'help/document?id=1'" target="_blank"></a>

                        <!--<span class="option" data-value="b">蓝</span>-->
                        <!--<span class="option">不筛选</span>-->
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="report">
                        <a id="" class="po" data-toggle="tooltip" data-placement="top" data-original-title="报道：CLINVAR,HGMD数据库">数据库报道</a>
                      </div>
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
                      <div class="left" data-name="denovo">新发突变：</div>
                      <div class="right">
                        <span class="option" data-value="true">筛选</span>
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
                      <div class="left" data-name="grandfreq">本地人群携带率低于：</div>
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
                        <span class="option" data-value="major" data-effect='flag' data-snv="snv0">主要</span>
                        <span class="option" data-value="minor" data-effect='flag' data-snv="snv0">次要</span>
                        <span class="option" data-value="all" data-effect="flag" data-snv="snv0">已标记</span>
                        <span class="option in default" data-effect="reset" data-snv="snv0">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="genes">基因：</div>
                      <div class="right">
                        <textarea placeholder='请用逗号或换行隔开' v-model="geneTextArea0"></textarea>
                      </div>
                    </div>
                  </div>
                  <span class="my-btn search-btn" @click="filter0"><img src="../../static/img/red-con.png" alt="">搜索</span>
                  <span class="my-btn refresh" @click="resetFilter0"><img src="../../static/img/red-refresh.png"
                                                                          alt="">重置</span>
                </div>
                <!--修改数据弹框-->
                <div class="filtrate-content hide" id="filtrate-content-edit-0">
                  <img src="../../static/img/th-1.png" alt="" class="up">
                  <ul>
                    <li @click="showPanelModal">修改基因信息</li>
                    <li @click="showGenoModal">修改表型信息</li>
                  </ul>
                </div>
              </div>
            </div>

            <table class="table my-table long" id="table-0">
              <thead>
              <tr>
                <th>位点</th>
                <th style="width: 103px">基因</th>
                <th style="width: 77px">区域</th>
                <th>功能</th>
                <th>疾病</th>
                <th style="width: 120px">纯/杂合(受检者/父/母)</th>
                <th style="width: 77px">报告状态</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in lists0" :class="{'tr-bc':index%2}">
                <td>
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
                <!--<diseaseTd :geneResp="data.geneResp" @sendPhenotypeMapSingle="getPhenotypeMapSingle"></diseaseTd>-->
                <diseaseTd class="warp" style="max-width: 250px" :diseases="data.diseases" @sendOmimId="getOmimId"></diseaseTd>

                <td class="warp">
                  <span v-if="data.info && data.info.info">{{data.info.info.genotype}}</span>
                  <span v-else=""> - </span>/

                  <span v-if="data.info && data.info.familyInfo && data.info.familyInfo.father">{{data.info.familyInfo.father.info.genotype}}</span>
                  <span v-else=""> - </span>/

                  <span v-if="data.info && data.info.familyInfo && data.info.familyInfo.mother">{{data.info.familyInfo.mother.info.genotype}}</span>
                  <span v-else=""> - </span>

                </td>
                <td>
                  <span v-if="data.info && data.info&&data.info.edit" :class="{ active1: data.info.edit.status=='major',active2: data.info.edit.status=='minor',active3: data.info.edit.status=='benign',
                  active4: data.info.edit.status=='invalid'}">
                    {{data.info.edit.status | getStatus}}
                  </span>
                </td>
              </tr>
              <tr v-if="lists0.length == 0">
                <td colspan="7" class="center noResult-td">
                  <img src="../../static/img/no-result-1.png" alt="">
                </td>
              </tr>
              </tbody>
            </table>

            <page :childCount="count0" :childReset="reset0" @childCurrent="getCurrent0"></page>
          </div>
          <div class="content-1" :class="{hide:!in1}">
            基因分析报告 :
            <router-link target="_blank" class="common-a"
                         :to="{path:'report',query:{code:datafile,app:'snv'}}">点击查看
            </router-link>

            <div class="top-content">
                <span class="con">
                  <span class="title red">已选条件：</span>
                  <span v-if="hasCondition1.length">{{hasCondition1.join('，')}}</span>
                  <span v-else="">无</span>
                </span>

              <div class="detail-btn-content rea">
                <span class="my-btn refresh" @click="resetFilterAndRe1"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
                <span class="my-btn" @click.stop="filtrateShowEditFun1" @click=""><img src="../../static/img/red-edit.png" alt="">修改数据</span>
                <span class="my-btn pull-right condition" @click.stop="filtrateShow1Fun"><img src="../../static/img/red-con.png" alt="">筛选条件</span>
                <!--筛选条件弹框-->
                <div class="filtrate-content hide" @click.stop="" id="filtrate-content-1">
                  <img src="../../static/img/th-1.png" alt="" class="up">
                  <div class="title">搜索选项</div>
                  <div class="content">
                    <div class="single">
                      <div class="left" data-name="flag">旗标：</div>
                      <div class="right" id="flag-div-1">
                        <span class="option" data-value="r">红</span>
                        <span class="option in default" data-value="y">黄</span>
                        <span id="flag-all-1" class="option" data-value="all" @click.stop="" data-flag='allflag'>全部</span>
                        <a class="fa fa-question-circle-o po flag-q common-a" style="color: inherit" :href="manHtml+'help/document?id=1'" target="_blank"></a>

                        <!--<span class="option" data-value="b">蓝</span>-->
                        <!--<span class="option">不筛选</span>-->
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="report">
                        <a id="" class="po" data-toggle="tooltip" data-placement="top" data-original-title="报道：CLINVAR,HGMD数据库">数据库报道</a>
                      </div>
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
                      <div class="left" data-name="denovo">新发突变：</div>
                      <div class="right">
                        <span class="option" data-value="true">筛选</span>
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
                      <div class="left" data-name="grandfreq">本地人群携带率低于：</div>
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
                        <span class="option" data-value="major" data-effect='flag' data-snv="snv1">主要</span>
                        <span class="option" data-value="minor" data-effect='flag' data-snv="snv1">次要</span>
                        <span class="option" data-value="all" data-effect="flag" data-snv="snv1">已标记</span>
                        <span class="option in default" data-effect="reset" data-snv="snv1">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="genes">基因：</div>
                      <div class="right">
                        <textarea placeholder='请用逗号或换行隔开' v-model="geneTextArea1"></textarea>
                      </div>
                    </div>
                  </div>
                  <span class="my-btn search-btn" @click="filter1"><img src="../../static/img/red-con.png" alt="">搜索</span>
                  <span class="my-btn refresh" @click="resetFilter1"><img src="../../static/img/red-refresh.png"
                                                                          alt="">重置</span>
                </div>
                <!--修改数据弹框-->
                <div class="filtrate-content hide" id="filtrate-content-edit-1">
                  <img src="../../static/img/th-1.png" alt="" class="up">
                  <ul>
                    <li @click="showPanelModal">修改基因信息</li>
                    <li @click="showGenoModal">修改表型信息</li>
                  </ul>
                </div>
              </div>

            </div>

            <table class="table my-table long" id="table-1">
              <thead>
              <tr>
                <th>位点</th>
                <th style="width: 103px">基因</th>
                <th style="width: 77px">区域</th>
                <th>功能</th>
                <th>疾病</th>
                <th style="width: 120px">纯/杂合(受检者/父/母)</th>
                <th style="width: 77px">报告状态</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in lists1" :class="{'tr-bc':index%2}">
                <td>
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
                <diseaseTd class="warp" style="max-width: 250px" :diseases="data.diseases" @sendOmimId="getOmimId"></diseaseTd>

                <td class="warp">
                  <span v-if="data.info && data.info.info">{{data.info.info.genotype}}</span>
                  <span v-else=""> - </span>/

                  <span v-if="data.info && data.info.familyInfo && data.info.familyInfo.father">{{data.info.familyInfo.father.info.genotype}}</span>
                  <span v-else=""> - </span>/

                  <span v-if="data.info && data.info.familyInfo && data.info.familyInfo.mother">{{data.info.familyInfo.mother.info.genotype}}</span>
                  <span v-else=""> - </span>

                </td>
                <td>
                  <span v-if="data.info&&data.info.edit" :class="{ active1: data.info.edit.status=='major',active2: data.info.edit.status=='minor',active3: data.info.edit.status=='benign',
                  active4: data.info.edit.status=='invalid'}">
                    {{data.info.edit.status | getStatus}}
                  </span>
                </td>
              </tr>

              <tr v-if="lists1.length == 0">
                <td colspan="7" class="center noResult-td">
                  <img src="../../static/img/no-result-1.png" alt="">
                </td>
              </tr>
              </tbody>
            </table>

            <page :childCount="count1" :childReset="reset1" @childCurrent="getCurrent1"></page>
          </div>
          <div class="content-2" :class="{hide:!in2}">
            基因分析报告 :
            <router-link target="_blank" class="common-a"
                         :to="{path:'report',query:{code:datafile,app:'snv'}}">点击查看
            </router-link>

            <div class="top-content">

                <span class="con">
                  <span class="title red">已选条件：</span>
                  <span v-if="hasCondition2.length">{{hasCondition2.join('，')}}</span>
                  <span v-else="">无</span>
                </span>

              <div class="detail-btn-content rea">
                <span class="my-btn refresh" @click="resetFilterAndRe2"><img src="../../static/img/red-refresh.png" alt="">数据刷新</span>
                <span class="my-btn" @click.stop="filtrateShowEditFun2" @click=""><img src="../../static/img/red-edit.png" alt="">修改数据</span>
                <span class="my-btn pull-right condition" @click.stop="filtrateShow2Fun"><img src="../../static/img/red-con.png" alt="">筛选条件</span>
                <!--筛选条件弹框-->
                <div class="filtrate-content hide" @click.stop="" id="filtrate-content-2">
                  <img src="../../static/img/th-1.png" alt="" class="up">
                  <div class="title">搜索选项</div>
                  <div class="content">
                    <div class="single">
                      <div class="left" data-name="flag">旗标：</div>
                      <div class="right" id="flag-div-2">
                        <span class="option" data-value="r">红</span>
                        <span class="option in default" data-value="y">黄</span>
                        <span id="flag-all-2" class="option" data-value="all" @click.stop="" data-flag='allflag'>全部</span>

                        <a class="fa fa-question-circle-o po flag-q common-a" style="color: inherit" :href="manHtml+'help/document?id=1'" target="_blank"></a>

                        <!--<span class="option" data-value="b">蓝</span>-->
                        <!--<span class="option">不筛选</span>-->
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="report">
                        <a id="dataBase" class="po" data-toggle="tooltip" data-placement="top" data-original-title="报道：CLINVAR,HGMD数据库">数据库报道</a>
                      </div>
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
                      <div class="left" data-name="denovo">新发突变：</div>
                      <div class="right">
                        <span class="option" data-value="true">筛选</span>
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
                      <div class="left" data-name="grandfreq">本地人群携带率低于：</div>
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
                        <span class="option" data-value="major" data-effect='flag' data-snv="snv2">主要</span>
                        <span class="option" data-value="minor" data-effect='flag' data-snv="snv2">次要</span>
                        <span class="option" data-value="all" data-effect="flag" data-snv="snv2">已标记</span>
                        <span class="option in default" data-effect="reset" data-snv="snv2">不筛选</span>
                      </div>
                    </div>
                    <div class="single">
                      <div class="left" data-name="genes">基因：</div>
                      <div class="right">
                        <textarea placeholder='请用逗号或换行隔开' v-model="geneTextArea2"></textarea>
                      </div>
                    </div>
                  </div>
                  <span class="my-btn search-btn" @click="filter2"><img src="../../static/img/red-con.png" alt="">搜索</span>
                  <span class="my-btn refresh" @click="resetFilter2"><img src="../../static/img/red-refresh.png"
                                                                          alt="">重置</span>
                </div>
                <!--修改数据弹框-->
                <div class="filtrate-content hide" id="filtrate-content-edit-2">
                  <img src="../../static/img/th-1.png" alt="" class="up">
                  <ul>
                    <li @click="showPanelModal">修改基因信息</li>
                    <li @click="showGenoModal">修改表型信息</li>
                  </ul>
                </div>
              </div>

            </div>

            <table class="table my-table long" id="table-2">
              <thead>
              <tr>
                <th>位点</th>
                <th style="width: 103px">基因</th>
                <th style="width: 77px">区域</th>
                <th>功能</th>
                <th>疾病</th>
                <th style="width: 120px">纯/杂合(受检者/父/母)</th>
                <th style="width: 77px">报告状态</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(data,index) in lists2" :class="{'tr-bc':index%2}">
                <td>
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
                <diseaseTd class="warp" style="max-width: 250px" :diseases="data.diseases" @sendOmimId="getOmimId"></diseaseTd>

                <td class="warp">
                  <span v-if="data.info && data.info.info">{{data.info.info.genotype}}</span>
                  <span v-else=""> - </span>/

                  <span v-if="data.info && data.info.familyInfo && data.info.familyInfo.father">{{data.info.familyInfo.father.info.genotype}}</span>
                  <span v-else=""> - </span>/

                  <span v-if="data.info && data.info.familyInfo && data.info.familyInfo.mother">{{data.info.familyInfo.mother.info.genotype}}</span>
                  <span v-else=""> - </span>

                </td>
                <td>
                  <span v-if="data.info&&data.info.edit" :class="{ active1: data.info.edit.status=='major',active2: data.info.edit.status=='minor',active3: data.info.edit.status=='benign',
                  active4: data.info.edit.status=='invalid'}">
                    {{data.info.edit.status | getStatus}}
                  </span>
                </td>
              </tr>

              <tr v-if="lists2.length == 0 ">
                <td colspan="7" class="center noResult-td">
                  <img src="../../static/img/no-result-1.png" alt="">
                </td>
              </tr>
              </tbody>
            </table>

            <page :childCount="count2" :childReset="reset2" @childCurrent="getCurrent2"></page>
          </div>

        </div>
      </div>
    </div>

    <locusModal :datafile="datafile" :locusId="locusId" :locus="locus" :type="type"></locusModal>
    <panelModal @saveData="savePanel" :originalGeneInput='geneInput' :originalPanelData="originalPanelData"></panelModal>
    <genoModal :datafile="datafile" :modalPanelData="modalPanelData" :modalGeneData="modalGeneData"></genoModal>

    <hpoModal :omimId="omimId"></hpoModal>
    <mutateModal @changeStatus="getMutateModalStatus" :moduleDataFromFather="moduleData" :ID="ID" :postId="snvId"
                 app="grandtrio"></mutateModal>
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
        doneHttp: '',
        omimId: 0,
        hasCondition: [],
        hasCondition0: [],
        hasRed: '',
        modalPanelData: '',
        modalGeneData: '',
        fatherName: '',
        motherName: '',
        //公用
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
        geneInput: '',
        originalPanelData: [],
        loading3: false,
        //content-0
        loading0: false,
        lists0: [],
        geneTextArea0: '',
        geneTextAreaShow0: false,
        count0: 0,
        page0: 1,
        reset0: 0,
//        moduleData: '',
        filtrateShow0: false,
        //content-1
        loading1: false,
        lists1: [],
        hasCondition1: [],
        geneTextArea1: '',
        geneTextAreaShow: false,
        count1: 0,
        page1: 1,
        reset1: 0,
        moduleData: '',
        filtrateShow1: false,
        //content-2
        loading2: false,
        lists2: [],
        geneTextArea2: '',
        geneTextAreaContent2: '',
        count2: 0,
        page2: 1,
        reset2: 0,
        moduleDataCNV: '',
        filtrateShow2: false,
        hasCondition2: '',

        //请求链接cnv snv
        snvUrl: '',
        cnvUrl: '',
        csv: {},
        snvId: 0
      }
    },
    mounted: function () {
      this.bindCurrent()//绑定变异详情的过滤点击事件
      this.getSampleAndUrl()
      this.showHasCondition()
    },
    methods: {
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
        _vue.hasCondition0 = []
        _vue.hasCondition1 = []
        _vue.hasCondition2 = []

        $('#filtrate-content-0').find('.content').find('.single').each(function () {
          const _in = $(this).find('.right').find('.in')
          let inData = _in.html()

          if (_in.length && inData != '不筛选') {
            if (_in.html().includes('&')) {
              inData = _in.data('value')
            }
            if (_in.data('database')) {
              _vue.hasCondition0.push(_in.parent().prev().html() + '' + inData)
            } else {
              _vue.hasCondition0.push(_in.parent().prev().html() + inData)
            }
          }
        })
        if (this.geneTextArea0) {
          _vue.hasCondition0.push('基因个数：' + this.strToArr(this.geneTextArea0).length)
        }

        $('#filtrate-content-1').find('.content').find('.single').each(function () {
          const _in = $(this).find('.right').find('.in')
          let inData = _in.html()
          if (_in.length && inData != '不筛选') {
            if (_in.html().includes('&')) {
              inData = _in.data('value')
            }
            if (_in.data('database')) {
              _vue.hasCondition1.push(_in.parent().prev().html() + '' + inData)
            } else {
              _vue.hasCondition1.push(_in.parent().prev().html() + inData)
            }
          }
        })
        if (this.geneTextArea1) {
          _vue.hasCondition1.push('基因个数：' + this.strToArr(this.geneTextArea1).length)
        }

        $('#filtrate-content-2').find('.content').find('.single').each(function () {
          const _in = $(this).find('.right').find('.in')
          let inData = _in.html()
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
        })
        if (this.geneTextArea1) {
          _vue.hasCondition1.push('基因个数' + this.strToArr(this.geneTextArea1).length)
        }
      },
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
          if(resp.data.geneinfo){
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
        let panelArr = []
        const _vue = this
        this.loading0 = true
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

          if (data.snv) {
            _vue.snvUrl = resp.data.snv.query_url + '?'
            $.each(data.snv.query_params, function (i, data) {
              _vue.snvUrl += '&' + i + '=' + data
            })
            _vue.getList0()
            _vue.getList1()
            _vue.getList2()
          }
        }).catch(function (error) {
          _vue.catchFun(error);
        })

        this.myAxios({
          url: 'application/job/' + this.ID + '/'
        }).then(function (resp) {
          _vue.sampleInfo = resp.data.name
          _vue.datafile = resp.data.parameter.datafile
        }).catch(function (error) {
          _vue.catchFun(error);
        })

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
        if (current === 0) {
          this.in0 = true
        } else if (current === 1) {
          this.in1 = true
        } else if (current === 2) {
          this.in2 = true
        } else if (current === 3) {
          this.in3 = true
        }
      },
      //绑定基础操作
      bindCurrent: function () {
        /*旗标里面的全部这个span*/
        const _flagSpan0 = $('#flag-all-0')
        const _flagSpan1 = $('#flag-all-1')
        const _flagSpan2 = $('#flag-all-2')
        /*旗标 这个rightdiv*/
        const _flagDiv0 = $('#flag-div-0')
        const _flagDiv1 = $('#flag-div-1')
        const _flagDiv2 = $('#flag-div-2')

        let oldFlag = ''
        $('.option').on('click', function (e) {
          /*报告点主要次要的时候，旗标自动勾选全部*/
          if($(e.target).data('flag') == 'allflag'){
          }else{
            const ef = $(e.target).data('effect')
            if (ef == 'flag') {
              const snv = $(e.target).data('snv')
              if(snv == 'snv0'){
                oldFlag = _flagDiv0.find('.in').data('value') == 'all'?oldFlag:_flagDiv0.find('.in').data('value')
                _flagDiv0.find('.in').removeClass('in')
                _flagSpan0.addClass('in')
              }else if(snv == 'snv1'){
                oldFlag = _flagDiv1.find('.in').data('value') == 'all'?oldFlag:_flagDiv1.find('.in').data('value')
                _flagDiv1.find('.in').removeClass('in')
                _flagSpan1.addClass('in')
              } else if(snv == 'snv2'){
                oldFlag = _flagDiv2.find('.in').data('value') == 'all'?oldFlag:_flagDiv2.find('.in').data('value')
                _flagDiv2.find('.in').removeClass('in')
                _flagSpan2.addClass('in')
              }


            } else if (ef == 'reset') {
              const snv = $(e.target).data('snv')
              if(snv == 'snv0'){
                if (_flagSpan0.hasClass('in')) {
                  _flagDiv0.find('.option').each(function () {
                    const val = $(this).data('value')
                    if (val == oldFlag) {
                      _flagDiv0.find('.in').removeClass('in')
                      $(this).addClass('in')
                    }
                  })
                }
              }else if(snv == 'snv1'){
                if (_flagSpan1.hasClass('in')) {
                  _flagDiv1.find('.option').each(function () {
                    const val = $(this).data('value')
                    if (val == oldFlag) {
                      _flagDiv1.find('.in').removeClass('in')
                      $(this).addClass('in')
                    }
                  })
                }
              }else{
                if (_flagSpan2.hasClass('in')) {
                  _flagDiv2.find('.option').each(function () {
                    const val = $(this).data('value')
                    if (val == oldFlag) {
                      _flagDiv2.find('.in').removeClass('in')
                      $(this).addClass('in')
                    }
                  })
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
        this.geneTextAreaContent2 = ''
        $('.default').each(function () {
          $(this).parent().find('.in').removeClass('in')
          $(this).addClass('in')
        })
      },
      //每个块域的逻辑
      /*疾病TD里面显示hpo的弹框*/
      getPhenotypeMapSingle: function (data) {
        this.phenotypeMapSingle = data
      },

      /*LIST0*/
      getList0: function () {
        this.loading0 = true
        let urlParam = ''
        $('#filtrate-content-0').find('.option').each(function () {
          if ($(this).html() !== '不筛选' && $(this).hasClass('in')) {
            urlParam += '&' + $(this).parent().prev().data('name') + '=' + $(this).data('value')
          }
        })
        if (this.geneTextArea0) {
          urlParam += '&genes=' + this.strToArr(this.geneTextArea0)
        }
        //条件判断结束
        const _vue = this
        this.lists0 = []
        _vue.myAxios({
          url: _vue.snvUrl + '&page=' + _vue.page0 + urlParam,
        }).then(function (resp) {
          _vue.count0 = resp.data.count
          if (_vue.count0 === 0) {
            _vue.loading1 = false
          }
          let genePostData = []
          $.each(resp.data.results, function (i, value) {
//            处理highlight和active得到级别(highlight为true的时候active必定为true)
            if (value.info.highlight) {
              value.level = 0
            } else {
              value.level = 1
            }
            const ref = value.variant.ref.length>3?value.variant.ref.substring(0,3)+'...':value.variant.ref;
            const alt = value.variant.alt.length>3?value.variant.alt.substring(0,3)+'...':value.variant.alt;

            if(value.variant.end == value.variant.start){
              value.showLocusStr = value.variant.chrom+':'+value.variant.start+'('+ref+'/'+alt+')'
            }else{
              value.showLocusStr = value.variant.chrom+':'+value.variant.start+'-'+value.variant.end+'('+ref+'/'+alt+')'
            }
            $.each(value.anno.genes.geneids, function (n, k) {
              if (!genePostData.join(',').includes(k)) {
                genePostData.push(k)
              }
            })
            value.geneResp = []
          })
          _vue.lists0 = resp.data.results
          _vue.fatherName = _vue.lists0[0] && _vue.lists0[0].info && _vue.lists0[0].info.familyInfo && _vue.lists0[0].info.familyInfo.father
            ? _vue.lists0[0].info.familyInfo.father.datafile.patientName : '无结果'
          _vue.motherName = _vue.lists0[0] && _vue.lists0[0].info && _vue.lists0[0].info.familyInfo && _vue.lists0[0].info.familyInfo.mother
            ? _vue.lists0[0].info.familyInfo.mother.datafile.patientName : '无结果'
          _vue.loading0 = false
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      filtrateShowEditFun0: function () {
        this.switchHide('filtrate-content-edit-0')
      },
      filtrateShow0Fun: function () {
        this.switchHide('filtrate-content-0')
      },
      resetFilterAndRe0: function () {
        this.getList0()
      },
      getCurrent0: function (data) {
        this.page0 = data
        this.reset0 = 0
        this.getList0()
      },
      resetFilter0: function () {
        this.geneTextArea0 = ''
        $('.content-0').find('.default').each(function () {
          $(this).parent().find('.in').removeClass('in')
          $(this).addClass('in')
        })
      },
      filter0: function () {
        this.page0 = 1
        this.reset0 = 1
        this.getList0()
        $('#filtrate-content-0').addClass('hide')
        this.showHasCondition()
      },

      /*LIST1*/
      getList1: function () {
        this.loading1 = true
        let urlParam = ''
        $('#filtrate-content-1').find('.option').each(function () {
          if ($(this).html() !== '不筛选' && $(this).hasClass('in')) {
            urlParam += '&' + $(this).parent().prev().data('name') + '=' + $(this).data('value')
          }
        })
        if (this.geneTextArea1) {
          urlParam += '&genes=' + this.strToArr(this.geneTextArea1)
        }
        //条件判断结束
        const _vue = this
        this.lists1 = []
        _vue.myAxios({
          url: _vue.snvUrl + '&page=' + _vue.page1 + urlParam + '&pattern=R',
        }).then(function (resp) {
          _vue.count1 = resp.data.count
          if (_vue.count1 === 0) {
            _vue.loading1 = false
          }
          let genePostData = []
          $.each(resp.data.results, function (i, value) {
//            处理highlight和active得到级别(highlight为true的时候active必定为true)
            if (value.info.highlight) {
              value.level = 0
            } else {
              value.level = 1
            }
            const ref = value.variant.ref.length>3?value.variant.ref.substring(0,3)+'...':value.variant.ref;
            const alt = value.variant.alt.length>3?value.variant.alt.substring(0,3)+'...':value.variant.alt;

            if(value.variant.end == value.variant.start){
              value.showLocusStr = value.variant.chrom+':'+value.variant.start+'('+ref+'/'+alt+')'
            }else{
              value.showLocusStr = value.variant.chrom+':'+value.variant.start+'-'+value.variant.end+'('+ref+'/'+alt+')'
            }
            $.each(value.anno.genes.geneids, function (n, k) {
              if (!genePostData.join(',').includes(k)) {
                genePostData.push(k)
              }
            })
            value.geneResp = []
          })
          _vue.lists1 = resp.data.results
          _vue.loading1 = false
        })
      },
      filtrateShow1Fun: function () {
        this.switchHide('filtrate-content-1')
      },
      filtrateShowEditFun1: function () {
        this.switchHide('filtrate-content-edit-1')
      },
      resetFilterAndRe1: function () {
        this.getList1()
      },
      getCurrent1: function (data) {
        this.page1 = data
        this.reset1 = 0
        this.getList1()
      },
      resetFilter1: function () {
        this.geneTextArea1 = ''
        $('.content-1').find('.default').each(function () {
          $(this).parent().find('.in').removeClass('in')
          $(this).addClass('in')
        })
      },
      filter1: function () {
        this.page1 = 1
        this.reset1 = 1
        this.getList1()
        $('#filtrate-content-1').addClass('hide')
        this.showHasCondition()
      },

      /*LIST2*/
      getList2: function () {
        this.loading2 = true
        let urlParam = ''
        $('#filtrate-content-2').find('.option').each(function () {
          if ($(this).html() !== '不筛选' && $(this).hasClass('in')) {
            urlParam += '&' + $(this).parent().prev().data('name') + '=' + $(this).data('value')
          }
        })
        if (this.geneTextArea2) {
          urlParam += '&genes=' + this.strToArr(this.geneTextArea2)
        }
        //条件判断结束
        const _vue = this
        this.lists2 = []
        _vue.myAxios({
          url: _vue.snvUrl + '&page=' + _vue.page2 + urlParam + '&pattern=D',
        }).then(function (resp) {
          _vue.count2 = resp.data.count
          if (_vue.count2 === 0) {
            _vue.loading2 = false
          }
          let genePostData = []
          $.each(resp.data.results, function (i, value) {
//            处理highlight和active得到级别(highlight为true的时候active必定为true)
            if (value.info.highlight) {
              value.level = 0
            } else {
              value.level = 1
            }
            const ref = value.variant.ref.length>3?value.variant.ref.substring(0,3)+'...':value.variant.ref;
            const alt = value.variant.alt.length>3?value.variant.alt.substring(0,3)+'...':value.variant.alt;

            if(value.variant.end == value.variant.start){
              value.showLocusStr = value.variant.chrom+':'+value.variant.start+'('+ref+'/'+alt+')'
            }else{
              value.showLocusStr = value.variant.chrom+':'+value.variant.start+'-'+value.variant.end+'('+ref+'/'+alt+')'
            }
            $.each(value.anno.genes.geneids, function (n, k) {
              if (!genePostData.join(',').includes(k)) {
                genePostData.push(k)
              }
            })
            value.geneResp = []
          })
          _vue.lists2 = resp.data.results
          _vue.loading2 = false
        })
      },
      filtrateShow2Fun: function () {
        this.switchHide('filtrate-content-2')
      },
      filtrateShowEditFun2: function () {
        this.switchHide('filtrate-content-edit-2')
      },
      resetFilterAndRe2: function () {
        this.getList2()
      },
      getCurrent2: function (data) {
        this.page2 = data
        this.reset2 = 0
        this.getList2()
      },
      resetFilter2: function () {
        this.geneTextArea2 = ''
        $('.content-2').find('.default').each(function () {
          $(this).parent().find('.in').removeClass('in')
          $(this).addClass('in')
        })
      },
      filter2: function () {
        this.page2 = 1
        this.reset2 = 1
        this.getList2()
        $('#filtrate-content-2').addClass('hide')
        this.showHasCondition()
      },

      showDetail: function (data, type, postId) {
        const _vue = this
        _vue.moduleData = data
        _vue.snvId = postId
        $('#mutateDetailModal').modal('show')
      },
      getMutateModalStatus: function (newStatus) {

        const _vue = this
        $.each(_vue.lists0, function (i, data) {
          if (data.id == _vue.snvId) {
            data.info.edit.status = newStatus.status
            data.info.edit.comment = newStatus.comment
//            data.info.edit.validation = newStatus.validation
          }
        })
        $.each(_vue.lists1, function (i, data) {
          if (data.id == _vue.snvId) {
            data.info.edit.status = newStatus.status
            data.info.edit.comment = newStatus.comment
//            data.info.edit.validation = newStatus.validation
          }
        })
        $.each(_vue.lists2, function (i, data) {
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
      current1: function () {

      },

    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip()
    },
    watch:{
      geneTextArea0:function (newData) {
        let trimD = $.trim(newData);
        const _fAll = $("#flag-all-0");
        const _fAllF = _fAll.parent();
        if(trimD){
          _fAllF.find('.in').removeClass('in');
          _fAll.addClass('in')
        }else{
          _fAllF.find('.in').removeClass('in');
          _fAllF.find('.default').addClass('in')
        }
      },
      geneTextArea1:function (newData) {
        let trimD = $.trim(newData);
        const _fAll = $("#flag-all-1");
        const _fAllF = _fAll.parent();
        if(trimD){
          _fAllF.find('.in').removeClass('in');
          _fAll.addClass('in')
        }else{
          _fAllF.find('.in').removeClass('in');
          _fAllF.find('.default').addClass('in')
        }
      },
      geneTextArea2:function (newData) {
        let trimD = $.trim(newData);
        const _fAll = $("#flag-all-2");
        const _fAllF = _fAll.parent();
        if(trimD){
          _fAllF.find('.in').removeClass('in');
          _fAll.addClass('in')
        }else{
          _fAllF.find('.in').removeClass('in');
          _fAllF.find('.default').addClass('in')
        }
      },
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
  .title-s {
    > span {
      display: inline-block;
      margin-left: 20px;
    }
  }

  #trioResult {
    .all-content {
      #table-1, #table-0, #table-2 {
        margin-top: 50px;
      }
      table {
        box-shadow: none;
        border-radius: 0;
      }
      margin: 15px 0 0 0;
      .change-panel {
        margin-left: 50px;
      }
      /*.my-table-content{*/
      /*margin-top: 50px;*/
      /*}*/
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
        table#table-1, table#table-2, table#table-0 {
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
        #filtrate-content-1, #filtrate-content-0, #filtrate-content, #filtrate-content-2, #filtrate-content-1 {
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
        #filtrate-content-1, #filtrate-content-0, #filtrate-content, #filtrate-content-2 {
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
        /*#filtrate-content-2 {*/
        /*width: 310px;*/
        /*.search-btn {*/
        /*margin-left: 40px;*/
        /*}*/
        /*.refresh {*/
        /*margin-left: 20px;*/
        /*}*/
        /*.content {*/
        /*textarea {*/
        /*min-height: 100px;*/
        /*width: 100%;*/
        /*float: left;*/
        /*margin-top: 10px;*/
        /*}*/
        /*.left {*/
        /*width: 80px;*/
        /*margin-top: 6px;*/
        /*}*/
        /*.right {*/
        /*width: 200px;*/
        /*}*/
        /*}*/
        /*}*/
        .content-0 {

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
