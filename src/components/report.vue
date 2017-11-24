<template>
  <div id="report-content" class="p-div">
    <loading v-if="loading"></loading>
    <div class="row">
      <div class="col-sm-11 report bc-fff">
        <div class="no-url" v-if="!hasUrl">
          该样本还未生成报告，点击按钮可生成
          <span class="my-btn" @click="patchUrlFun"><img src="../../static/img/red-submit.png" alt="">生成报告</span>
        </div>


        <!--<a href="https://dev-analyze.grandbox.site/report/reportsnv/59b8dc8bccaa6c5b05312c03/word/">111</a>-->

        <div class="has-url" v-if="hasUrl">
          <div class="title-content">

            <span class="my-btn pull-left get-word" @click="showTemplate"><img src="../../static/img/red-submit.png" alt="">生成word文档</span>
            <span class="my-btn refresh pull-left" @click="refresh"><img src="../../static/img/red-refresh.png" alt="">重新生成报告</span>

            <div class="template-content" :class="{'hide':hideT}">
              <img src="../../static/img/th-1.png" alt="" class="up">
              <ul>
                <li @click="getWord(1)">模板1</li>
                <li @click="getWord(2)">模板2</li>
              </ul>

            </div>

            <div class="logo-content">
              <div class="logo-left">
                <img src="../../static/img/report-1.png" alt="">
                <span>北京中科医学检验所</span>
              </div>
              <div class="logo-right">
                <img src="../../static/img/report-2.png" alt="">
                <span>中国首家第三代测序精准医疗公司</span>
              </div>
            </div>
          </div>
          <div class="office-content">
            <div class="office-one">
              <div>北京中科医学检验实验室</div>
              <div class="office-one-content">
                <span>电话：400-110-1066</span>
                <span>邮箱：report@metabolicare.co</span>
                <span>网址：www.metabolicare.com</span>
                <span>地址：北京中关村昌平科技园区超前路37号6号楼4层1001室</span>
              </div>
            </div>
            <div class="office-one">
              <div>北京希望组生物科技有限公司</div>
              <div class="office-one-content">
                <span>遗传咨询/查询电话：400-651-6230</span>
                <span>邮箱：support@grandomics.com</span>
                <span>网址：http://www.grandomics.com</span>
                <span>地址：北京市昌平区中关村生命科学园创新大厦D301</span>
              </div>
            </div>
          </div>
          <div class="sample-content">
            <img class="first-img" src="../../static/img/report-3.png" alt="">
            <div class="sample-title">
              <span class="big">基因分析报告</span>
              <span class="small">GENE ANALYSIS REPORT</span>
            </div>
            <div class="basic-content">
              <div class="one">
                <span>姓名：<span v-if="allData.patient">{{allData.patient.name}}</span></span>
                <span>性别：<span v-if="allData.patient">{{allData.patient.gender}}</span></span>
                <span>民族：<span v-if="allData.patient">{{allData.patient.nation}}</span></span>
                <span>出生年月：<span v-if="allData.patient">{{allData.patient.birth}}</span></span>
                <span>样本编号：<span v-if="allData.patient">{{allData.patient.sample.code}}</span></span>
              </div>
              <div class="two">
                <span>样品类型：<span v-if="allData.patient">{{allData.patient.sample.type ? allData.patient.sample.type : '未知'}}</span></span>
                <span>检测项目：<span v-if="allData.patient">{{allData.patient.testItems}}</span></span>
                <span>检测方法：<span v-if="allData.patient">{{allData.patient.method}}</span></span>
                <span>送检医院：<span v-if="allData.patient">{{allData.patient.hospital}}</span></span>
              </div>
              <img src="../../static/img/report-4.png" class="bottom-img" alt="">
            </div>
            <div class="first-page">
              <div class="one">
                <!--<div class="title">临床信息</div>-->
                <!--<div class="content"><span v-if="allData.patient">{{allData.patient.clinical}}</span></div>-->
                <div class="content"><span class="title">临床信息：</span><span v-if="allData.patient"
                                                                           style="word-break: break-all"> {{allData.patient.clinical}}</span></div>
              </div>
              <div class="one">
                <div class="title">检测结果</div>
                <div class="content">
                  <span class="no-data" v-if="allData.majors && allData.majors.length == 0">未检测到与患者临床表型相关的具有可能临床意义的变异（包括SNV和Indel）。</span>
                  <table class="table" id="main-result" v-if="allData.majors && allData.majors.length !=0">
                    <thead>
                    <tr>
                      <th>序号</th>
                      <th>基因名</th>
                      <th>转录本</th>
                      <th>染色体位置</th>
                      <th>核苷酸改变</th>
                      <th>氨基酸改变</th>
                      <th>纯杂合</th>
                      <th>普通人群频率</th>
                      <th>来源</th>
                      <th>变异类型</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(list,index) in allData.majors">
                      <td>{{index + 1}}</td>
                      <td>{{list.gene}}</td>
                      <td>{{list.transcript}}</td>
                      <td>{{list.position}}</td>
                      <td>{{list.nachange ? list.nachange : '-'}}</td>
                      <td>{{list.aachange ? list.aachange : '-'}}</td>
                      <td>{{list.homhet}}</td>
                      <td>{{list.freq}}</td>
                      <td>{{list.validation}}</td>
                      <td>
                        <router-link class="common-a" target="_blank" title="点击可修改"
                                     :to="{path:'/taskM/foo/getIntervar',query:{query:list.id}}">
                          {{list.intervar}}
                        </router-link>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="one" v-if="allData.majors && allData.majors.length!=0">
                <div class="title">结果说明</div>
                <div class="content">
                  <!--<span v-for="(major,index) in allData.majorsVue"> &lt;!&ndash;不同基因&ndash;&gt;-->
                  <!--{{major.gene.symbol}}基因是<span v-if="major.diseases.length === 1" v-for="(disease,index) in major.diseases"><span-->
                  <!--v-for="(list,index) in disease.inheritance">{{list | getName}}<span-->
                  <!--v-if="disease.inheritance.length!==1 &&index!==disease.inheritance.length">、</span></span>-->
                  <!--&lt;!&ndash;{{disease.inheritance|getName.join(',')}}&ndash;&gt;的{{disease.title.chinese}}(OMIM：# {{disease.mimNumber}};{{disease.title.english}})</span><span-->
                  <!--v-if="major.diseases.length === 2" v-for="(disease,index) in major.diseases">{{disease.inheritance.join(-->
                  <!--',')}}的{{disease.title.chinese}}(OMIM：# {{disease.mimNumber}};{{disease.title.english}}) <span v-if="index === 0">和</span></span>-->
                  <!--<span v-if="major.diseases.length > 2" v-for="(disease,index) in major.diseases">{{disease.inheritance.join(-->
                  <!--',')}}的{{disease.title.chinese}}(OMIM：# {{disease.mimNumber}};{{disease.title.english}}) <span-->
                  <!--v-if="index != major.diseases.length-1"> , </span></span><span v-if="index !== allData.majorsVue.length-1">。</span>-->
                  <!--</span>。在本次检测中，我们检测到受检者{{funStr}}。-->
                  <!--对于常染色体隐性遗传的疾病来说，单个致病性变异的携带者并不会发展为患者，只有纯合致病性变异和复合杂合型致病性变异（反式）才会导致疾病的发生。若父母均为携带者，每次剩余的子女均有25%的可能为患者。-->
                  <!--<span class="bold">疾病的最终确诊还需结合进一步的临床检查和家系调查。</span>-->

                  <span v-for="(major,index) in resultsData">
                    {{major}} <span v-if="index ==resultsData.length-1">。</span>
                  </span>
                  <span>
                    在本次检测中，我们检测到受检者
                      <span v-for="(fuc,index) in resultsFuncsData">
                        {{fuc}}
                        <span v-if="index == resultsFuncsData.length-1">。</span>
                        <span v-else=""> , </span>
                      </span>
                  </span>
                  <span v-if="allData.presentation && allData.presentation.inheritances">{{allData.presentation.inheritances.join('  ')}}</span>
                  <span class="bold">疾病的最终确诊还需结合进一步的临床检查和家系调查。</span>

                  <div class="notice">
                    注：以上解读基于目前对单基因遗传病致病基因的研究。疾病简介、基因简介、一代验证及其他意义未明变异位点见附录。
                    变异的解释及证据定级是参照美国医学遗传学与基因组学学会（<span>ACMG</span>）发布的最新版基因变异解读标准和指南；
                    <span>Pathogenic</span>表示致病性变异，<span>Likely pathogenic</span>表示疑似致病性变异，
                    <span>VUS</span>表示临床性意义未明变异，<span>Likely benign</span>表示疑
                    似良性变异，<span>Benign</span>表示良性变异<sup>[1]</sup>.参考基因组为<span>hg19</span>，
                    变异命名参照<span>HGVS</span>建议的规则给出
                  </div>
                </div>
              </div>
            </div>
            <div class="appendix-page"> <!--附录-->
              <div class="title">附录</div>
              <div class="one" v-if="allData.majors && allData.majors.length!=0">
                <div class="title">1.疾病简介</div>
                <div class="content">
                  <div class="appendix-content">
                    <!--<div v-for="(majorD,index) in majorDiseases" class="diseases-content">-->
                    <!--<div class="diseases-content-title">{{index + 1}}) {{majorD.title.chinese ? majorD.title.chinese : majorD.title.english}}</div>-->
                    <!--<div class="diseases-content-remark" v-show="majorD.hpoLength !==0">-->
                    <!--疾病概述：<span v-for="(list,index) in majorD.inheritance">{{list | getName}}<span-->
                    <!--v-if="majorD.inheritance.length!==1 &&index!==majorD.inheritance.length">、</span></span>&lt;!&ndash;{{majorD.inheritance.join(',')}}&ndash;&gt;-->
                    <!--，典型的临床症状包括<span v-for="(hpo,index) in majorD.hpos">{{hpo.titles.chinese ? hpo.titles.chinese : hpo.titles.english}}<span-->
                    <!--v-if="index!=majorD.hpos.length-1">、</span></span>。-->
                    <!--</div>-->
                    <!--</div>-->

                    <div class="diseases-content" v-for="(majorD,index) in allData.diseases.major">
                      <div class="diseases-content-title">{{index + 1}}) {{majorD.name}}</div>
                      <div class="diseases-content-remark">
                        疾病概述：{{majorD.inheritance}}，典型的临床症状包括{{majorD.phenotypes}}。
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div class="one" v-if="allData.majors && allData.majors.length!=0">
                <div class="title">2.变异详情</div>
                <div class="content">
                  <div class="appendix-content">
                    <div class="diseases-content" v-for="(major,index) in allData.majors">
                      <div class="variation-title">{{index + 1}}) <span
                        class="variation-title-content">{{major.gene}}基因的{{major.position}}（{{major.aachange}}）变异</span></div>
                      <div class="variation-content">
                        <!--该变异在EXAC普通人数据库东亚人群中的频率为{{major.freq}}(暂无}),该变异未见文献报道。-->
                        <span v-for="list in allData.variants" v-if="major.aachange == list.aachange">{{list.evidences.join(';')}}</span>
                        。基于以上证据，我们建议判定该变异为{{major.intervar}}变异。
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="one" v-if="allData.majors && allData.majors.length!=0">
                <div class="title">3.一代验证结果</div>
                <div class="content"  id="showImg">
                  <span class="my-btn" @click="showVer" style="width: 160px"><img src="../../static/img/red-submit.png" alt="">添加一代验证结果</span>

                  <div class="img-one" v-for="(list,index) in imgArr">

                    <table class="table">
                      <thead>
                      <tr>
                        <th>序号</th>
                        <th>基因名</th>
                        <th>转录本</th>
                        <th>染色体位置</th>
                        <th>核苷酸改变</th>
                        <th>氨基酸改变</th>
                        <th>受检者</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>{{index+1}}</td>
                        <td>{{list.gene}}</td>
                        <td>{{list.transcript}}</td>
                        <td>{{list.position}}</td>
                        <td>{{list.nachange ? list.nachange : '-'}}</td>
                        <td>{{list.aachange ? list.aachange : '-'}}</td>
                        <td>{{list.homhet}}</td>
                      </tr>
                      </tbody>
                    </table>

                    <table class="table">
                      <thead>
                      <tr>
                        <th colspan="3" style="padding: 3px">相关峰图</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="one in list.infoArr">
                        <td>{{one.name}}</td>
                        <td> <img class="" :src="one.image" alt=""></td>
                        <td><a class="common-a" @click="changeImg" :data-id="list.snvid" :data-name="one.name" :data-genotype="one.genotype">修改图片</a></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>


                </div>
              </div>
              <div class="one">
                <div class="title"><span v-if="allData.majors && allData.majors.length!=0">4.</span>其他变异信息</div>
                <div class="content">
                  <table class="table">
                    <thead>
                    <tr>
                    <tr>
                      <th>序号</th>
                      <th>基因名</th>
                      <th>转录本</th>
                      <th>染色体位置</th>
                      <th>核苷酸改变</th>
                      <th>氨基酸改变</th>
                      <th>纯/杂合</th>
                      <th>普通人群频率</th>
                      <th>遗传方式</th>
                      <th>疾病表型及OMIM编号</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(list,index) in allData.minors">
                      <td>{{index + 1}}</td>
                      <td>{{list.gene}}</td>
                      <td>{{list.transcript}}</td>
                      <td>{{list.position}}</td>
                      <td>{{list.nachange ? list.nachange : '-'}}</td>
                      <td>{{list.aachange ? list.aachange : '-'}}</td>
                      <td>{{list.homhet}}</td>
                      <td>{{list.freq}}</td>
                      <td>
                        <div v-for="a in list.diseases">{{a.inheritance}}</div>
                      </td>
                      <td>
                        <div v-for="a in list.diseases">
                          <span>{{a.name}}</span>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                  <div class="notice">
                    (
                    注：以上次要变异均未经一代测序验证，AD表示常染色体遗传，AR表示常染色体隐性遗传，DR表示双基因隐性遗传，
                    DD表示双基因显性遗传，XLD表示X连锁显性遗传，XLR表示X连锁隐性遗传，IC表示散发病例
                    )
                  </div>
                </div>
              </div>

              <div class="one" v-if="allData.majors && allData.majors.length!=0">
                <div class="title">5.其它变异疾病简介</div>
                <div class="content">
                  <div class="appendix-content">
                    <div class="diseases-content" v-for="(majorD,index) in allData.diseases.minor">
                      <div class="diseases-content-title">{{index + 1}}) {{majorD.name}}</div>
                      <div class="diseases-content-remark">
                        疾病概述：{{majorD.inheritance}}，典型的临床症状包括{{majorD.phenotypes}}。
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div class="one" v-if="allData.majors && allData.majors.length!=0">
                <div class="title">6.CNV分析结果<span id="normal-font">(置信区间内检测到的外显子CNV)</span></div>
                <div class="content">
                  对外显子数据进行CNV分析，结果显示：

                  <span v-for="(cnv,index) in allData.cnvs">

                    {{cnv.position}}位置可能存在约{{cnv.length}}的{{cnv.func}},该区域包含
                    <span v-if="cnv.genes.length == 1">{{cnv.genes[0]}}</span>
                    <span v-if="cnv.genes.length == 2">{{cnv.genes[0]}}和{{cnv.genes[1]}}</span>
                    <span v-if="cnv.genes.length>2">
                      <span v-for="(cnvGene,index) in cnv.genes">
                        {{cnvGene}}
                        <span v-if="index !== cnv.genes.length -1 && index !== cnv.genes.length -2">、</span>
                        <span v-if="index == cnv.genes.length -2">和</span>
                      </span>
                    </span>
                    基因的部分序列，
                    <span v-for="dis in cnv.diseases">
                      {{dis.gene}}基因与
                      <span v-if="dis.info.length == 1">
                        [
                        <span v-if="dis.info[0].inheritances.length == 0">无</span>
                        <span v-for="(inheritance,index) in dis.info[0].inheritances">{{inheritance.ab}}<span v-if="index != dis.info[0].inheritances.length-1">,</span></span>
                        ]
                        {{dis.info[0].name}}({{dis.info[0].mimNumber}})相关。
                      </span>
                      <span v-if="dis.info.length == 2">
                        [
                        <span v-if="dis.info[0].inheritances.length == 0">无</span>
                        <span v-for="(inheritance,index) in dis.info[0].inheritances">{{inheritance.ab}}<span v-if="index != dis.info[0].inheritances.length-1">,</span></span>
                        ]
                        {{dis.info[0].name}}({{dis.info[0].mimNumber}})和
                        [
                        <span v-if="dis.info[1].inheritances.length == 0">无</span>
                        <span v-for="(inheritance,index) in dis.info[1].inheritances">{{inheritance.ab}}<span v-if="index != dis.info[1].inheritances.length-1">,</span></span>
                        ]
                        {{dis.info[1].name}}({{dis.info[1].mimNumber}})相关。
                      </span>
                      <span v-if="dis.info.length > 2">
                         <span v-for="(infoSingle,index) in dis.info">
                           [
                           <span v-if="infoSingle.inheritances.length == 0">无</span>
                           <span v-for="(inheritance,index) in infoSingle.inheritances">{{inheritance.ab}}<span v-if="index != infoSingle.inheritances.length-1">,</span></span>
                           ]
                           {{infoSingle.name}}({{infoSingle.mimNumber}})
                           <span v-if="index !=dis.info.length -1 &&index !=dis.info.length -2">、</span>
                           <span v-if="index ==dis.info.length -2">和</span>
                           <span v-if="index ==dis.info.length-1">相关。</span>
                         </span>
                      </span>
                    </span>
                    该CNV临床意义未明,
                    <span v-if="cnv.genes.length == 1">{{cnv.genes[0]}}</span>
                    <span v-if="cnv.genes.length == 2">{{cnv.genes[0]}}和{{cnv.genes[1]}}</span>
                    <span v-if="cnv.genes.length>2">
                      <span v-for="(cnvGene,index) in cnv.genes">
                        {{cnvGene}}
                        <span v-if="index !== cnv.genes.length -1 && index !== cnv.genes.length -2">、</span>
                        <span v-if="index == cnv.genes.length -2">和</span>
                      </span>
                    </span>基因相关疾病表型与受检单上记录的受检者表型不符，<span class="bold">其临床意义的判断还需结合进一步的临床检查和家系调查。</span>

                  </span>
                </div>
              </div>

              <div class="one">
                <div class="title">7.检测基因列表<span>(临床表型较不相符或遗传模式不相符的变异信息)</span></div>
                <div class="content">
                  <table class="table">
                    <thead>
                    <tr>
                      <th colspan="8">相关疾病panel，共<span v-if="allData.genes">{{allData.genes.length}}</span>个基因</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="list in geneArr">
                      <td v-for="listS in list">{{listS}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!--一代验证结果modal-->
    <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="verification-modal" role="dialog"
         aria-labelledby="gridSystemModalLabel3">
      <div class="modal-dialog modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="gridSystemModalLabel3">一代验证结果</h4>
          </div>
          <div class="modal-body">
            <div class="modal-btn">
              <span @click="saveVer" class="my-btn"><img src="../../static/img/red-save.png" alt="">保存</span>
              <span class="my-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>
            </div>


            <form id="addDataForm">
              <input type="text" name="datafile" class="hide" :value="datafile">
              <div class="one">
                <span class="title">验证位点：</span>
                <select name="snv" class="my-select" id="select-genotype">
                  <option value="" class="hide">请选择验证点</option>
                  <option :value="list.id" v-for="list in siteList">{{list.showName}}</option>
                </select>
              </div>

              <div class="one" id="patient">
                <span class="title">受检者：</span>
                <div class="geneAndImg">
                  <div>
                    genotype：
                    <select name="patientGenotype" class="my-select" >
                      <option value="">请选择genotype</option>
                      <option value="纯合">纯合</option>
                      <option value="杂合">杂合</option>
                      <option value="半合子">半合子</option>
                    </select>
                  </div>
                  <div>
                    验证图：
                    <div class="upload-content">
                      <input type="text" class="show-name">
                      <span class="text">选择</span>
                      <input type='file' name="patientImage" class="hide-input">
                    </div>
                  </div>
                </div>
              </div>

              <div class="one" id="father">
                <span class="title">父亲：</span>
                <div class="geneAndImg">
                  <div>
                    genotype：
                    <select name="fatherGenotype" class="my-select">
                      <option value="">请选择genotype</option>
                      <option value="纯合">纯合</option>
                      <option value="杂合">杂合</option>
                      <option value="半合子">半合子</option>
                    </select>
                  </div>
                  <div>
                    验证图：
                    <div class="upload-content">
                      <input type="text" class="show-name">
                      <span class="text">选择</span>
                      <input type='file' name="fatherImage" class="hide-input">
                    </div>
                  </div>
                </div>
              </div>

              <div class="one" id="mother">
                <span class="title">母亲：</span>
                <div class="geneAndImg">
                  <div>
                    genotype：
                    <select name="motherGenotype" class="my-select">
                      <option value="">请选择genotype</option>
                      <option value="纯合">纯合</option>
                      <option value="杂合">杂合</option>
                      <option value="半合子">半合子</option>
                    </select>
                  </div>
                  <div>
                    验证图：
                    <div class="upload-content">
                      <input type="text" class="show-name">
                      <span class="text">选择</span>
                      <input type='file' name="motherImage" class="hide-input">
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>


    <div class="modal fade  bs-example-modal-lg" tabindex="-1" id="changeImg-modal" role="dialog"
         aria-labelledby="gridSystemModalLabel3">
      <div class="modal-dialog modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="">修改图片</h4>
          </div>
          <div class="modal-body">
            <div class="modal-btn">
              <span @click="saveVerImg" class="my-btn"><img src="../../static/img/red-save.png" alt="">保存</span>
              <span class="my-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>
            </div>




            <form id="addDataForm1">
              <input type="text" name="datafile" class="hide" :value="datafile">
              <input type="text" name="snv" class="hide" :value="imgSnvId">
              <input type="text" :name="imgGenotypeName" class="hide" :value="imgGenotype">
              <div class="geneAndImg">
                  <div>
                    上传图片：
                    <div class="upload-content">
                      <input type="text" class="show-name">
                      <span class="text" style="height: 26px">选择</span>
                      <input type='file' :name="imgName" class="hide-input">
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
  export default {
    data: function () {
      return {
        hideT:true,

        judgeUrl: '',
        reportId: this.$route.query.reportId ? this.$route.query.reportId : 0,

        patientImg:'',
        fatherImg:'',
        motherImg:'',

        hasUrl: '',
        datafileUrl: '',
        patchUrl: '',
        refreshUrl: '',
        wordUrl: '',
        viewUrl: '',

        siteList: [],

        imgSnvId:'',
        imgName:'',
        imgGenotype:'',
        imgGenotypeName:'',

        id: this.$route.query.code,
        app: this.$route.query.app,

        datafile: '',

        allData: '',
        geneArr: [],
        minorDiseases: [],
        loading: true,
        token: '',
        funStr: '',
        majorDiseases: [],
        sampleData: '',
        resultsData: [], /*结果说明*/
        resultsFuncsData: [], /*结果说明变异位点*/
        diseaseDessData: [], /*疾病描述*/

        header: `
          <img class="left" src="../../static/img/report-1.png" alt="中科检验">
          <img class="right" src="../../static/img/report-2.png" alt="希望组">
        `,
        footerStr: `
          <div class="left">
            <div>北京中科医学检验所</div>
            <div>电话：<span class="bold">400-110-1066</span></div>
            <div>邮箱：<span class="bold">report@metabolicare.com</span></div>
            <div>网址: <a class="bold" href="www.metabolicare.com">www.metabolicare.com</a></div>
            <div>地址：北京市中关村昌平科技园区超前路37号6号楼4层1001室</div>
          </div>
          <div class="right text-right">
            <div>北京希望组生物科技有限公司</div>
            <div>遗传咨询/查询电话：<span class="bold">400-027-1221</span></div>
            <div>邮箱：<span class="bold">suport@grandomics.com</span></div>
            <div>网址: <a class="bold" href="http://www.grandomics.com">http://www.grandomics.com</a></div>
          <div>地址：北京市昌平区中关村生命科学院创新大厦D301</div>`
      }
    },
    created: function () {
//      if (this.app = 'snv') {
//        this.judgeUrl = 'report/reportsnv/?datafile=' + this.id
//        this.patchUrl = 'report/reportsnv/'
//
//      } else {
////        this.judgeUrl = 'report/reportcnv/?datafile='+this.id;
////        this.patchUrl = 'report/reportcnv/'
//        this.judgeUrl = 'report/reportsnv/?datafile=' + this.id
//        this.patchUrl = 'report/reportsnv/'
//      }
//
//      if (this.reportId) {
//        this.hasUrl = true
//        this.fillData()
//      } else {
//        this.judgment()
//      }
    },
    methods: {

      /*20170915更新全部重写*/
      changeImg:function (event) {
        const _name = $(event.target).data('name');
        this.imgSnvId = $(event.target).data('id');
        this.imgGenotype = $(event.target).data('genotype');
        if(_name == '受检者'){
          this.imgName = 'patientImage';
          this.imgGenotypeName = 'patientGenotype';
        }else if(_name == '父亲'){
          this.imgName = 'fatherImage';
          this.imgGenotypeName = 'fatherGenotype';
        }else if(_name == '母亲'){
          this.imgName = 'motherImage';
          this.imgGenotypeName = 'motherGenotype';
        }
        $("#changeImg-modal").modal('show')
      },

      saveVerImg:function () {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url:_vue.patchUrl+'sanger/',
          method:'post',
          data:new FormData(document.getElementById('addDataForm1'))
        }).then(function (resp) {
          alert('验证图保存成功');
          $("#changeImg-modal").modal('hide')
          _vue.loading = false
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },

      saveVer:function () {
        const _vue = this;
        this.loading = true;
        this.myAxios({
          url:_vue.patchUrl+'sanger/',
          method:'post',
          data:new FormData(document.getElementById('addDataForm'))
//          data:{
//            datafile: _vue.datafile,
//            snv: $("#select-genotype").find('option:selected').val(),
//            patient: { genotype:$("#patient").find('select option:selected').val() , image:$("#patient").find('input').val()},
//            father: { genotype:$("#father").find('select option:selected').val() , image:$("#father").find('.hide-input').val()},
//            mother: { genotype:$("#mother").find('select option:selected').val() , image:$("#mother").find('.hide-input').val()},
//          }
        }).then(function (resp) {
            alert('一代验证结果保存成功');
          $('#verification-modal').modal('hide')
          _vue.loading = false
        })
      },

      showVer: function () {
        $('#verification-modal').modal('show')
      },

      judgment: function () {
        const _vue = this;
        this.myAxios({
          url: _vue.judgeUrl
        }).then(function (resp) {
          const results = resp.data.results;
          if (results.length == 0) {
            _vue.hasUrl = false;
            _vue.loading = false
          } else {
            _vue.hasUrl = true;
            _vue.reportId = results[0].id;
            _vue.fillData()
          }
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },

      fillData: function () {
        const _vue = this
        _vue.siteList = []
        if (_vue.app = 'snv') {
          _vue.viewUrl = 'report/reportsnv/' + _vue.reportId + '/'
          _vue.refreshUrl = 'report/reportsnv/' + _vue.reportId + '/refresh/'
          _vue.wordUrl = 'report/reportsnv/' + _vue.reportId + '/word/'

        } else {

          _vue.viewUrl = 'report/reportsnv/' + _vue.reportId + '/'
          _vue.refreshUrl = 'report/reportsnv/' + _vue.reportId + '/refresh/'
          _vue.wordUrl = 'report/reportsnv/' + _vue.reportId + '/word/'

//              _vue.viewUrl = 'report/reportcnv/'+_vue.reportId+'/';
//              _vue.refreshUrl = 'report/reportcnv/'+_vue.reportId+'/refresh/';
//              _vue.wordUrl = 'report/reportcnv/'+_vue.reportId+'/word/';
        }

        this.myAxios({
          url: _vue.viewUrl
        }).then(function (resp) {
          let data = resp.data
          if (data.patient.birth != '未知') {
            let arr = data.patient.birth.split('-')
            data.patient.birth = arr[0] + '年' + arr[1] + '月'
          }

          _vue.allData = resp.data
          _vue.datafile = _vue.allData.datafile;
//          $("#hide123").val(_vue.datafile)
//          $("#hide123").attr('value','12345')
          $.each(_vue.allData.majors, function (i, data) {
            _vue.siteList.push({id: data.id, showName: data.gene + '：' + data.transcript + '：' + data.nachange + '：' + data.aachange})
          })
          $.each(_vue.allData.minors, function (i, data) {
            _vue.siteList.push({id: data.id, showName: data.gene + '：' + data.transcript + '：' + data.nachange + '：' + data.aachange})
          })

          $.each(_vue.allData.sangers.major,function (i,data) {
            data.infoArr = [];
            $.each(data.info,function (k1,k2) {
              if(k1=='patient'){
                k2.name='受检者';
                data.infoArr.push(k2)
              }else if(k1 == 'father'){
                k2.name='父亲';
                data.infoArr.push(k2)

              }else if(k1 == 'mother'){
                k2.name='母亲';
                data.infoArr.push(k2)

              }
            })
          })

          $.each(_vue.allData.sangers.minor,function (i,data) {
            data.infoArr = [];

            $.each(data.info,function (k1,k2) {
              if(k1=='patient'){
                k2.name='受检者';
                data.infoArr.push(k2)

              }else if(k1 == 'father'){
                k2.name='父亲';
                data.infoArr.push(k2)

              }else if(k1 == 'mother'){
                k2.name='母亲';
                data.infoArr.push(k2)

              }
            })
          })

          _vue.imgArr = _vue.allData.sangers.major.concat(_vue.allData.sangers.minor)

          _vue.loading = false;

        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },

      patchUrlFun: function () {
        const _vue = this
        _vue.loading = true
        this.myAxios({
          url: _vue.patchUrl,
          method: 'post',
          data: {
            datafile: _vue.id
          }
        }).then(function (resp) {
          _vue.loading = false
          _vue.judgment()
          alert('生成成功')
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },

      showTemplate:function () {
        this.hideT = !this.hideT;
      },
      getWord: function (type) {

        if(type == 1){
          window.location.href = this.anaUrl + this.wordUrl+'?template=1'
        }else if(type == 2){
          window.location.href = this.anaUrl + this.wordUrl+'?template=2'
        }
        this.hideT = true;

//        const _vue = this;
//        _vue.loading = true;
//        this.myAxios({
//          url:_vue.wordUrl,
//          method:'get',
//        }).then(function (resp) {
//          _vue.loading = false;
////          window.location.href=resp.data.url
//        });

      },

      /*20170915更新*/

      /*新版接口开始20170914*/
      getUrl: function () {
        const _vue = this
        this.myAxios({
          url: _vue.datafileUrl
        }).then(function (resp) {
          const data = resp.data
          _vue.hasUrl = Object.keys(data).length
          if (_vue.hasUrl) {
            _vue.refreshUrl = data.refresh
            _vue.wordUrl = data.word
            _vue.viewUrl = data.view
            _vue.fillData()
          } else {
            _vue.loading = false
          }
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },

      refresh: function () {
        const _vue = this
        _vue.loading = true
        _vue.myAxios({
          url: _vue.refreshUrl
        }).then(function (respRe) {
          alert('生成报告已完成')
          _vue.fillData()
          _vue.loading = false
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },

      /*新版接口结束*/
    },
    watch: {
      allData: function () {
        /*将数组里面的值8个8个输出*/
        if (!this.allData) {
          return
        }
        const _vue = this
        const genes = this.allData.genes
        let arrCount = Math.ceil(genes.length / 8)
        let pushArr = []
        while (arrCount) {
          pushArr.push([])
          arrCount -= 1
        }
        $.each(genes, function (i, data) {
          i += 1
          $.each(pushArr, function (k1, k2) {
            if (Math.ceil(i / 8) === k1 + 1) {
              k2.push(data)
            }
          })
        })
        $.each(pushArr, function (i, data) {
          if (data.length !== 8) {
            data.length = 8
          }
        })
        this.geneArr = pushArr

        //结果说明
        //基因
        if (_vue.allData.presentation) {
          $.each(_vue.allData.presentation.gene, function (i, data) {

            if (data.length == 2) {
              _vue.resultsData.push(i + '基因是' + data.join('和'))
            } else {
              _vue.resultsData.push(i + '基因是' + data.join('  ,  '))
            }

          })
        }
        //变异位点
        $.each(_vue.allData.presentation.func, function (i, data) {
          _vue.resultsFuncsData.push(data + '个' + i + '位点')
        })

//        //疾病简介
//        $.each(_vue.allData.diseases,function (i,data) {
//          data.omim = i;
//          _vue.diseaseDessData.push(data)
//        })

//        //结果说明
//        this.allData.majorsVue = [];
//        let majors = this.allData.majors;
//        let geneStr = '';
//        let funcStr = '';
//        let funcObj = {};
//        $.each(majors, function (i, data) {
//
//          //分类出不同的基因名
//          if (geneStr.includes(data.gene.symbol)) {
//          } else {
//            geneStr += data.gene.symbol;
//            _vue.allData.majorsVue.push(data)
//          }
//
//          //剪切变异位点统计
//          if (funcStr.includes(data.func)) {
//            funcObj[data.func] += 1;
//          } else {
//            funcStr += data.func;
//            funcObj[data.func] = 1;
//          }
//
//        });
//
//        //剪切变异位点变成文字
//        let funArr = [];
//        $.each(funcObj, function (n, value) {
//          funArr.push(value + '个' + n + '变异位点')
//        });
//        const funArrCount = funArr.length;
//        if (funArrCount === 1) {
//          _vue.funStr = funArr[0];
//        } else if (funArrCount === 2) {
//          _vue.funStr += funArr[0] + '和' + funArr[1]
//        } else {
//          $.each(funArr, function (k1, k2) {
//            if (k1 !== funArrCount - 1) {
//              _vue.funStr += k2 + ','
//            } else {
//              _vue.funStr += k2
//            }
//          })
//        }
//
//        //提取疾病信息
//        let majorDiseases = [];
//        _vue.majorDiseases = [];
//        $.each(_vue.allData.majorsVue, function (k3, k4) {
//          majorDiseases = majorDiseases.concat(k4.diseases);
//        });
//
//        $.each(majorDiseases, function (k5, k6) {
//          k6.hpos = [];
//          k6.hpoLength = 0;
//          _vue.$axios({
//            url: _vue.dbUrl + 'knowledge/omim/' + k6.mimNumber + "/",
//            method: 'get'
//          }).then(function (respRe) {
//            k6.hpos = respRe.data.hpos;
//            k6.hpoLength = respRe.data.hpos.length;
//            _vue.majorDiseases.push(k6);
//            console.log(_vue.majorDiseases)
//          }).catch(function (error) {
//            _vue.catchFun(error);
//          });
//        });

      }
    },
    filters: {
      getName: function (type) {
        switch (type) {
          case 'AR':
            return '常染色体隐性遗传'
            break
          case 'AD':
            return '常染色体显性遗传'
            break
          case 'XLR':
            return 'X连锁隐性遗传'
            break
          case 'XLD':
            return 'X连锁显性遗传'
            break
          case '':
            return '未知遗传'
            break
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @gray: rgb(125, 125, 125);
  @green: rgb(112, 178, 79);
  @lineH: 23px;
  @title: rgb(83, 83, 83);
  #report-content {
    color: @gray;
    #normal-font{
      font-weight: normal;
      font-size: 16px;
    }
    .template-content{
      position: absolute;
      width: 130px;
      border: 1px solid #b9b8b8;
      border-radius: 5px;
      box-shadow: 0 0 10px 1px #b9b8b8;
      top: 50px;
      background-color: #fff;
      z-index: 10;
      img{
        position: absolute;
        right: 55px;
        top: -9px;
        z-index: 11;
      }
      ul{
        margin: 0;
        padding: 0;
        li{
          margin: 0;
          padding: 0;
          height: 30px;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
          &:hover{
            background-color: rgb(255,236,210);
          }
        }
        li:first-child{
          &:hover{
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
          }
        }
        li:last-child{
          &:hover{
            border-bottom-right-radius: 5px;
            border-bottom-left-radius: 5px;
          }
        }
      }
    }
    .get-word{
      width: 130px;
    }
    .refresh{
      width: 130px;
    }
    #showImg{
      overflow: hidden;
      table{
        margin-top: 20px;
        text-align: center;
        td{
          vertical-align: middle;
        }
      }
    }
    #addDataForm { //一代验证弹框
      .one {
        margin: 15px 0;
        .geneAndImg {
          width: 75px;
          >div{
            width: 400px;
            margin: 0 0 10px 75px;
            .my-select{
              width: 200px;
            }
            .upload-content{
              display: inline-block;
              width: 250px;
              margin-left: 22px;
              >input{
                width: 200px;
              }
              >input{
                width: 200px;
              }
              >span{
                width: 50px;
                height: 26px;
              }
            }
          }

        }
      }
    }
    .no-url {
      margin-top: 20px;
      .my-btn {
        display: block;
        margin-top: 15px;
      }
    }
    > .row {
      margin: 0;
      padding-left: 50px;
    }
    .bold {
      font-weight: bold;
    }
    table {
      text-align: center;
      thead {
        /*background:linear-gradient(to right,rgb(35,129,27),rgb(143,185,84));*/
        background: url('../../static/img/report-4.png');
        background-size: 100% 100%;
        color: #fff;
        th {
          border-right: 1px solid #fff;
          text-align: center;
          border-bottom: none;
        }
      }
      tbody {
        td {
          background-color: rgb(239, 239, 239);
          border-right: 1px solid #fff;
          border-bottom: 1px solid #fff;
        }
      }
    }
    .report {
      min-height: 200px;
      padding: 0 50px;
    }
    .title-content {
      margin: 10px 0;
      > .my-btn {
        margin-right: 20px;
      }
    }
    .logo-content {
      text-align: right;
      .logo-left {
        display: inline-block;
        padding-right: 15px;
        border-right: 1px solid gray;
        text-align: left;
        img {
          width: 160px;
        }
      }
      .logo-right {
        display: inline-block;
        padding-left: 15px;
        text-align: left;
        img {
          width: 165px;
        }
      }
      span {
        display: block;
        font-size: 12px;
        transform: scale(0.9); /*2D缩放*/
        color: gray;
        margin-left: -7px;
        margin-top: 5px;
      }
    }
    .office-content {
      margin: 50px 0 60px 0;
      font-size: 12px;
      .office-one:last-child {
        margin-top: 15px;
      }
      .office-one {
        .office-one-content {
          margin-left: -15px;
        }
        > div {
          margin-top: 2px;
          span:not(:last-child) {
            border-right: 1px solid rgb(84, 84, 84);
          }
          span {
            display: inline-block;
            padding-right: 13px;
            padding-left: 13px;
          }
        }
      }
    }
    .sample-content {
      .first-img {
        width: 100%;
      }
      .sample-title {
        margin: 30px 0 80px 0;
        .big {
          font-size: 48px;
          color: @green;
        }
        .small {
          display: block;
          font-size: 18px;
          font-family: "SIL";
          color: rgb(137, 137, 137);
          padding-left: 73px;
        }
      }
      .basic-content {
        .one {
          > span {
            display: inline-block;
            width: 17%;
          }
          margin-bottom: 20px;
        }
        .two {
          > span {
            display: inline-block;
            width: 23%;
          }
          margin-bottom: 22px;
        }
        .bottom-img {
          width: 100%;
        }
      }
      .first-page {
        padding-top: 60px;
        .one {
          margin-bottom: 30px;
          .title {
            font-size: 16px;
            color: @green;
            margin-bottom: 5px;
          }
          .content {
            line-height: @lineH;
            .notice {
              margin-top: 40px;
              font-size: 12px;
              color: @gray
            }
          }
        }
      }
      .appendix-page {
        margin-top: 80px;
        > .title {
          font-size: 18px;
          color: @title;
          text-align: center;
        }
        .one {
          margin-bottom: 30px;
          .title {
            font-size: 16px;
            color: @title;
            margin-bottom: 5px;
            > span {
              font-size: 12px;
              color: @gray;
            }
          }
          .content {
            line-height: @lineH;
            .diseases-content {
              margin-top: 10px;
            }
            .notice {
              margin-top: 40px;
              font-size: 12px;
              color: @gray
            }
          }
        }
      }
    }
  }
</style>
