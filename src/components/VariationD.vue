<template>

  <div class="data-content">
    <myDataH></myDataH>
    <div id="vaD-content" class="right-content drop-down">
      <loading v-show="loading"></loading>

      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span> <span @click.self="showContent">基本信息</span>
        </div>
        <div class="content disease-phenotype" style="display: block">
          <table class="special-table">
            <tbody>
            <tr>
              <td class="t-bc">位置</td>
              <td>{{allData.snv && allData.snv.variant && allData.snv.variant.position}}</td>
              <td class="t-bc">
                携带病例
                <i class="fa fa-question-circle-o po flag-th" data-toggle="tooltip" data-placement="top"
                   data-original-title="我的所有样本/所有用户的样本">
                </i>
              </td>
              <td>{{allData.record_count && allData.record_count.private}} / {{allData.record_count && allData.record_count.public}}</td>
              <!--<span v-if="basicResp.avsnp" class="rsid col-xs-2">-->
              <!--rsid: <a :href='"https://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs="+basicResp.avsnp' class="common-a"-->
              <!--target="_blank">{{basicResp.avsnp}}</a>-->
              <!--</span>-->
            </tr>
            <tr>
              <td class="t-bc">基因</td>
              <td>
                <div v-if="allData.snv">
                  <span v-if="allData.snv.genes.length == 0"> - </span>
                  <span v-for="geneSingle in allData.snv.genes">
                    <router-link class="po common-a" target="_blank" :to="{path:'/geneD',query:{id:geneSingle}}">
                      {{geneSingle}}
                    </router-link>
                  </span>
                </div>
              </td>
              <td class="t-bc">纯杂合</td>
              <td>{{allData.information && allData.information.hom_het}}</td>
            </tr>
            <tr>
              <td class="t-bc">gatkFilter</td>
              <td>{{allData.information && allData.information.gatk_filter}}</td>
              <td class="t-bc">变异比例(%)</td>
              <td>{{allData.information && allData.information.ratio | getPercent}}</td>
            </tr>
            <tr>
              <td class="t-bc">报告状态</td>
              <td>{{allData.edit && allData.edit.status}}</td>
              <td class="t-bc">变异详情</td>
              <td>

                <div v-if="allData.snv &&　allData.snv.variant && allData.snv.variant.change">
                  {{allData.snv.variant.change.gene}}:{{allData.snv.variant.change.transcript}}:{{allData.snv.variant.change.exon}}:
                  {{allData.snv.variant.change.na_change}}:{{allData.snv.variant.change.aa_change}}
                </div>

              </td>
            </tr>
            <tr>
              <td class="t-bc">人群频率(%)</td>
              <td>{{allData.snv && allData.snv.variant && allData.snv.variant.info.freq | getPercent}}</td>
              <td class="t-bc">intervar</td>
              <td>{{allData.snv && allData.snv.variant && allData.snv.variant.info.intervar}}</td>
            </tr>
            <tr>
              <td class="t-bc">备注(enter提交)</td>
              <td colspan="3">
                <textarea v-model="comment" placeholder="请输入内容" name="" id="" rows="3" class="w100" @keyup.enter.exact="doComment"></textarea>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span> <span @click.self="showContent">综述</span>
        </div>
        <div class="content disease-phenotype" style="display: block">
          该变异在gnomAD普通人数据库东亚人群中的频率为
          <!--0（PM2）-->
          {{allData.snv && allData.snv.variant && allData.snv.variant.info && allData.snv.variant.info.freq}}(PM2);
          生物信息学软件SIFT、Polyphen2和MCAP预测该变异分别为
          <span v-if="allData.snv && allData.snv.variant &&allData.snv.variant.info&&allData.snv.variant.info.dbnsfp">
            {{allData.snv.variant.info.dbnsfp.sift.pred | otherData}}、{{allData.snv.variant.info.dbnsfp.mcap.pred | otherData}}和
            <span v-if="allData.snv.variant.info.dbnsfp.polyphen2_hdiv.score>allData.snv.variant.info.dbnsfp.polyphen2_hvar.score">allData.snv.variant.info.dbnsfp.polyphen2_hdiv.pred | phData</span>
            <span v-else="">{{allData.snv.variant.info.dbnsfp.polyphen2_hvar.pred | phData}}</span>
          </span>
          <span v-else=""> - 、-和-</span>
          。基于以上证据，我们建议判定该变异为{{allData.snv && allData.snv.variant && allData.snv.variant.info.intervar}}变异。

          <div>
            omims待填
          </div>

        </div>


      </div>

      <div class="content-one">
        <div class="header">
          <span class="fa fa-chevron-down" @click.self="showContent"></span><span @click.self="showContent">人群频率</span>
        </div>
        <div class="content disease-phenotype" style="display: block">

          <div class="pie-content row">
            <div class="frequency-chart col-xs-3" id="frequency-pie"></div>
            <div class="frequency-chart col-xs-3" id="frequency-pie-1"></div>
            <div class="frequency-chart col-xs-3" id="frequency-pie-2"></div>
            <div class="frequency-chart col-xs-3" id="frequency-pie-3"></div>
          </div>

          <div class="frequency-chart" id="frequency-chart"></div>


        </div>
      </div>

      <div class="content-one">
        <div class="header" >
          <span class="fa fa-chevron-down" @click.self="showContent"></span> <span @click.self="showContent">生信预测/剪切</span>
        </div>
        <div class="content cut-content" style="display: block">
          <div class="one">
            <div class="title">DBnsfp</div>
            <table class="special-table">
              <tbody>
              <tr>
                <td rowspan="2" class="t-bc">M-Cap</td>
                <td>score</td>
                <td>{{dbnsfp.mcap ? dbnsfp.mcap.score : '-'}}</td>

                <td rowspan="2" class="t-bc">SIFT</td>
                <td>score</td>
                <td>{{dbnsfp.sift ? dbnsfp.sift.score : '-'}}</td>

                <td rowspan="2" class="t-bc">PolyPhen2</td>
                <td>score</td>
                <td>
                    <span v-if="dbnsfp.polyphen2_hdiv && dbnsfp.polyphen2_hvar">
                    {{dbnsfp.polyphen2_hdiv.score > dbnsfp.polyphen2_hvar.score?dbnsfp.polyphen2_hdiv.score:dbnsfp.polyphen2_hvar.score}}
                  </span>
                </td>

                <td rowspan="2" class="t-bc">LRT</td>
                <td>score</td>
                <td>{{dbnsfp.lrt ? dbnsfp.lrt.score : '-'}}</td>

                <td rowspan="2" class="t-bc">FATHMM</td>
                <td>score</td>
                <td>{{dbnsfp.fathmm ? dbnsfp.fathmm.score : '-'}}</td>
              </tr>
              <tr>

                <td>pred</td>
                <td>{{dbnsfp.mcap ? dbnsfp.mcap.pred : '-'}}</td>
                <td>pred</td>
                <td>{{dbnsfp.sift ? dbnsfp.sift.pred : '-'}}</td>
                <td>pred</td>
                <td>
                  <span v-if="dbnsfp.polyphen2_hdiv && dbnsfp.polyphen2_hvar">
                    {{dbnsfp.polyphen2_hdiv.score > dbnsfp.polyphen2_hvar.score?dbnsfp.polyphen2_hdiv.pred:dbnsfp.polyphen2_hvar.pred}}
                  </span>
                </td>
                <td>pred</td>
                <td>{{dbnsfp.lrt ? dbnsfp.lrt.pred : '-'}}</td>
                <td>pred</td>
                <td>{{dbnsfp.fathmm ? dbnsfp.fathmm.pred : '-'}}</td>

              </tr>

              <tr>
                <td rowspan="2" class="t-bc">PROVEAN</td>
                <td>score</td>
                <td>{{dbnsfp.provean ? dbnsfp.provean.score : '-'}}</td>

                <td rowspan="2" class="t-bc">MutationTaster</td>
                <td>score</td>
                <td>{{dbnsfp.mutationtaster ? dbnsfp.mutationtaster.score : '-'}}</td>

                <td rowspan="2" class="t-bc">MutationAssessor</td>
                <td>score</td>
                <td>{{dbnsfp.mutationassessor ? dbnsfp.mutationassessor.score : '-'}}</td>

                <td rowspan="2" class="t-bc">MetaSVM</td>
                <td>score</td>
                <td>{{dbnsfp.metasvm ? dbnsfp.metasvm.score : '-'}}</td>

                <td rowspan="2" class="t-bc">MetaLR</td>
                <td>score</td>
                <td>{{dbnsfp.metalr ? dbnsfp.metalr.score : '-'}}</td>
              </tr>
              <tr>
                <td>pred</td>
                <td>{{dbnsfp.provean ? dbnsfp.provean.pred : '-'}}</td>
                <td>pred</td>
                <td>{{dbnsfp.mutationtaster ? dbnsfp.mutationtaster.pred : '-'}}</td>
                <td>pred</td>
                <td>{{dbnsfp.mutationassessor ? dbnsfp.mutationassessor.pred : '-'}}</td>
                <td>pred</td>
                <td>{{dbnsfp.metasvm ? dbnsfp.metasvm.pred : '-'}}</td>
                <td>pred</td>
                <td>{{dbnsfp.metalr ? dbnsfp.metalr.pred : '-'}}</td>

              </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="content-one">
        <div class="header" >
          <span class="fa fa-chevron-down" @click.self="showContent"></span> <span @click.self="showContent">疾病报道</span>
        </div>
        <div class="content disease-phenotype" style="display: block">

        </div>
      </div>

      <div class="shadow-top bc-fff">
        <!--<div :class="{'hide':!in2}">-->
        <!--<div class="gene-information">-->
        <!--<span class="gene-information-title base-color">DBnsfp</span>-->
        <!--<div class="gene-content row">-->
        <!--<div class="col-md-12">-->
        <!--<table class="my-table no-thead">-->
        <!--<tbody>-->
        <!--<tr>-->
        <!--<td>数据库</td>-->
        <!--<td>M-Cap</td>-->
        <!--<td>SIFT</td>-->
        <!--<td>PolyPhen2</td>-->
        <!--<td>LRT</td>-->
        <!--<td>FATHMM</td>-->
        <!--<td>PROVEAN</td>-->
        <!--<td>MutationTaster</td>-->
        <!--<td>MutationAssessor</td>-->
        <!--<td>MetaSVM</td>-->
        <!--<td>MetaLR</td>-->
        <!--<td>REVEL</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>score</td>-->
        <!--<td v-for="(data,index) in dataBaseData" v-if="index>=0 &&index<=5">{{data.score ? data.score : ' - '}}</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>pred</td>-->
        <!--<td v-for="(data,index) in dataBaseData" v-if="index>=0 &&index<=5">{{data.pred ? data.pred : ' - '}}</td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="gene-information">-->
        <!--<span class="gene-information-title base-color">剪切区域</span>-->
        <!--<div class="gene-content">-->

        <!--<table class="my-table no-thead">-->
        <!--<tbody>-->
        <!--<tr>-->
        <!--<td>dbscSNV</td>-->
        <!--<td>-->
        <!--<span class="col-md-6">ada_score:<span v-if="dbData">{{dbData.adaScore ? dbData.adaScore : ' - '}}</span><span-->
        <!--v-else=""> - </span></span>-->
        <!--<span class="col-md-6">rf_score:<span v-if="dbData">{{dbData.rfScore ? dbData.rfScore : ' - '}}</span><span-->
        <!--v-else=""> - </span></span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>spidex</td>-->
        <!--<td>-->
        <!--<span class="col-md-6">max_tissue: <span v-if="spiData">{{spiData.maxTissue ? spiData.maxTissue : '-'}}</span><span-->
        <!--v-else=""> - </span></span>-->
        <!--<span class="col-md-6">zscore: <span v-if="spiData">{{spiData.zscore ? spiData.zscore : '-'}}</span><span-->
        <!--v-else=""> - </span></span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div :class="{'hide':!in3}">-->
        <!--<div class="gene-information">-->
        <!--<span class="gene-information-title base-color">HGMD（2014-2）</span>-->
        <!--<div class="gene-content">-->
        <!--<table class="my-table no-thead">-->
        <!--<tbody>-->
        <!--<tr>-->
        <!--<td>基本信息</td>-->
        <!--<td>疾病信息</td>-->
        <!--<td>数据库</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td colspan="3" v-if="!hgmdData" class="center">暂无数据</td>-->
        <!--</tr>-->
        <!--<tr v-if="hgmdData">-->
        <!--<td>hgmdNumber:&nbsp;{{hgmdData.hgmdNumber}}</td>-->
        <!--<td>disease:&nbsp;{{hgmdData.disease}}</td>-->
        <!--<td>uniprot:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.uniprot}}</span></td>-->
        <!--</tr>-->
        <!--<tr v-if="hgmdData">-->
        <!--<td>hgnc:&nbsp;{{hgmdData.hgnc}}</td>-->
        <!--<td>citation:&nbsp;{{hgmdData.citation}}</td>-->
        <!--<td>rsid:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.rsid}}</span></td>-->
        <!--</tr>-->
        <!--<tr v-if="hgmdData">-->
        <!--<td>hgvs:&nbsp;{{hgmdData.hgvs}}</td>-->
        <!--<td>comments:&nbsp;{{hgmdData.comments}}</td>-->
        <!--<td>ensembl:&nbsp;<span v-if="hgmdData">{{hgmdData.ensembl}}</span></td>-->
        <!--</tr>-->
        <!--<tr v-if="hgmdData">-->
        <!--<td>snv_raw:&nbsp;<span-->
        <!--v-if="hgmdData.snvRaw">{{hgmdData.snvRaw.chrom}}:{{hgmdData.snvRaw.start}}-{{hgmdData.snvRaw.end}}({{hgmdData.snvRaw.ref}}/{{hgmdData.snvRaw.alt}}){{hgmdData.snvRaw.strand}}</span>-->
        <!--</td>-->
        <!--<td>confidence:&nbsp;{{hgmdData.confidence}}</td>-->
        <!--<td>omim:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.omim}}</span></td>-->
        <!--</tr>-->
        <!--<tr v-if="hgmdData">-->
        <!--<td>密码子改变:&nbsp;<span v-if="hgmdData">{{hgmdData.codNum ? hgmdData.codNum : '-'}}</span></td>-->
        <!--<td>feature:&nbsp;{{hgmdData.feature}}</td>-->
        <!--<td>pmid:&nbsp;<span v-if="hgmdData.dbid">-->
        <!--<a class="common-a" v-for="list in hgmdData.dbid.pmid" :href="'https://www.ncbi.nlm.nih.gov/pubmed/'+list"-->
        <!--target="_blank">{{list}}</a>-->
        <!--</span></td>-->
        <!--</tr>-->
        <!--<tr v-if="hgmdData">-->
        <!--<td>核苷酸改变:&nbsp;<span v-if="hgmdData.change">{{hgmdData.change.nucleotide}}</span></td>-->
        <!--<td>mutType:&nbsp;<span v-if="hgmdData.type">{{hgmdData.type.mutation}}</span></td>-->
        <!--<td>hgmdAcc:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.hgmdAcc}}</span></td>-->
        <!--</tr>-->
        <!--<tr v-if="hgmdData">-->
        <!--<td>氨基酸改变:&nbsp;<span v-if="hgmdData.change">{{hgmdData.change.aminoacid}}</span></td>-->
        <!--<td>varType:&nbsp;<span v-if="hgmdData.type">{{hgmdData.type.mutation}}</span></td>-->
        <!--<td>entrez:&nbsp;<span v-if="hgmdData.dbid">{{hgmdData.dbid.entrez}}</span></td>-->
        <!--</tr>-->
        <!--<tr v-if="hgmdData">-->
        <!--<td colspan="3">genoSeq:&nbsp;{{hgmdData.genoSeq}}</td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="gene-information">-->
        <!--<span class="gene-information-title base-color">Clinvar（2017-01-30）</span>-->
        <!--<div class="gene-content">-->

        <!--<table class="no-thead my-table">-->
        <!--<tbody>-->
        <!--<tr>-->
        <!--<td>CLNACC</td>-->
        <!--<td>-->
        <!--<span v-if="clinvarData.clnacc">-->
        <!--<span v-for="list in clinvarData.clnacc">-->
        <!--<a class="common-a" target="_blank" :href="'https://www.ncbi.nlm.nih.gov/clinvar/'+list">{{list}}</a>&nbsp;&nbsp;&nbsp;-->
        <!--</span>-->
        <!--</span>-->
        <!--<span v-else=""> - </span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>CLINSIG</td>-->
        <!--<td>-->
        <!--<span v-if="clinvarData.clinsig">{{clinvarData.clinsig.join('|')}}</span>-->
        <!--<span v-else=""> - </span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>CLNDBN</td>-->
        <!--<td>-->
        <!--<span v-if="clinvarData.clndbn">{{clinvarData.clndbn.join('|')}}</span>-->
        <!--<span v-else=""> - </span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>CLNDSDBS</td>-->
        <!--<td>-->
        <!--<div class="clnd-conten pull-left">-->
        <!--<div v-if="clinvarData.clndsdbs" v-for="list in clinvarData.clndsdbs">-->
        <!--<div v-html="objToArr(list)"></div>-->
        <!--</div>-->
        <!--</div>-->
        <!--</td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--&lt;!&ndash;<div>CLNDSDB:<span v-if="clinvarData.clndsdbs">{{clinvarData.clndsdbs.join('|')}}</span><span v-else=""> - </span></div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div>CLNDSDBID:<span v-if="clinvarData.clndsdbid">{{clinvarData.clndsdbid.join('|')}}</span><span v-else=""> - </span></div>&ndash;&gt;-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="gene-information">-->
        <!--<span class="gene-information-title base-color">线粒体</span>-->
        <!--<div class="gene-content">-->
        <!--<table class="my-table no-thead">-->
        <!--<tbody>-->
        <!--<tr>-->
        <!--<td>Mitomap</td>-->
        <!--<td>Mitimpact</td>-->
        <!--<td>Mitimpact dbnsfp</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>allele:&nbsp;{{MitomapData.allele}}</td>-->
        <!--<td>mitimpactId:&nbsp;{{MitimpactData.mitimpactId}}</td>-->
        <!--<td>EFIN_SP:&nbsp;&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp">-->
        <!--<span v-if="MitimpactData.dbnsfp.efin_sp">{{MitimpactData.dbnsfp.efin_sp.score}}(score)</span>&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp.efin_sp">{{MitimpactData.dbnsfp.efin_sp.pred}}(pred)</span>-->
        <!--</span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>aa_change:&nbsp;{{MitomapData.aaChange}}</td>-->
        <!--<td>ensemblId:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.ensembl.gene}}</span>-->
        <!--</td>-->
        <!--<td>EFIN_HD:&nbsp;&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp">-->
        <!--<span v-if="MitimpactData.dbnsfp.efin_hd">{{MitimpactData.dbnsfp.efin_hd.score}}(score)</span>&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp.efin_hd">{{MitimpactData.dbnsfp.efin_hd.pred}}(pred)</span>-->
        <!--</span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>homo:&nbsp;{{MitomapData.homo}}</td>-->
        <!--<td>ncbiId:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.ncbi.gene}}</span></td>-->
        <!--<td>Polyphen2:&nbsp;&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp">-->
        <!--<span v-if="MitimpactData.dbnsfp.polyphen2">{{MitimpactData.dbnsfp.polyphen2.score}}(score)</span>&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp.polyphen2">{{MitimpactData.dbnsfp.polyphen2.pred}}(pred)</span>-->
        <!--</span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>hete:&nbsp;{{MitomapData.hete}}</td>-->
        <!--<td>symbol:&nbsp;<span v-if="MitimpactData.gene">{{MitimpactData.gene.symbol}}</span></td>-->
        <!--<td>SIFT:&nbsp;&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp">-->
        <!--<span v-if="MitimpactData.dbnsfp.sift">{{MitimpactData.dbnsfp.sift.score}}(score)</span>&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp.sift">{{MitimpactData.dbnsfp.sift.pred}}(pred)</span>-->
        <!--</span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>status:&nbsp;{{MitomapData.status}}</td>-->
        <!--<td>aa_change:&nbsp;-->
        <!--<span v-if="MitimpactData.aaChange">-->
        <!--{{MitimpactData.aaChange.change.ref.aa}}-{{MitimpactData.aaChange.change.alt.aa}}-->
        <!--</span>-->
        <!--</td>-->
        <!--<td>FATHMM:&nbsp;&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp">-->
        <!--<span v-if="MitimpactData.dbnsfp.fathmm">{{MitimpactData.dbnsfp.fathmm.score}}(score)</span>&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp.fathmm">{{MitimpactData.dbnsfp.fathmm.pred}}(pred)</span>-->
        <!--</span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>locus:&nbsp;{{MitomapData.locus}}</td>-->
        <!--<td>disease:&nbsp;{{MitimpactData.disease ? MitimpactData.disease : '-'}}</td>-->
        <!--<td>PROVEAN:&nbsp;&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp">-->
        <!--<span v-if="MitimpactData.dbnsfp.provean">{{MitimpactData.dbnsfp.provean.score}}(score)</span>&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp.provean">{{MitimpactData.dbnsfp.provean.pred}}(pred)</span>-->
        <!--</span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--<tr>-->
        <!--<td>disease:&nbsp;{{MitomapData.disease}}</td>-->
        <!--<td>status:&nbsp;{{MitimpactData.status ? MitimpactData.status : '-'}}</td>-->
        <!--<td>MutationAssessor:&nbsp;&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp">-->
        <!--<span v-if="MitimpactData.dbnsfp.mutationassessor">{{MitimpactData.dbnsfp.mutationassessor.score}}(score)</span>&nbsp;-->
        <!--<span v-if="MitimpactData.dbnsfp.mutationassessor">{{MitimpactData.dbnsfp.mutationassessor.pred}}(pred)</span>-->
        <!--</span>-->
        <!--</td>-->
        <!--</tr>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--</div>-->
        <!--</div>-->

        <!--</div>-->
        <!--</div>-->
      </div>
      <div class="modal fade bs-example-modal-lg" aria-labelledby="gridSystemModalLabe5" tabindex="-1" role="dialog" id="locusM">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content ">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
              </button>
              <h4 class="modal-title" id="gridSystemModalLabel5">位点信息</h4>
            </div>
            <div class="modal-body" id="modal-panel">

              <div class="modal-btn">
                <span class="my-btn" data-dismiss="modal"><img src="../../static/img/red-close.png" alt="">关闭</span>
              </div>

              <div class="table-content">
                <table class="table my-table no-shadow">
                  <thead>
                  <tr>
                    <th>Datafile</th>
                    <th>捕获区域</th>
                    <th>纯/杂合</th>
                    <th>深度</th>
                    <th>质量</th>
                    <th>变异比例</th>
                    <th>GatkFilter</th>
                    <th>状态</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="list in lists0">
                    <td>{{list.datafileData ? list.datafileData : '-'}}</td>
                    <td>{{list.capture ? list.capture : '-'}}</td>
                    <td>{{list.isHomo}}</td>
                    <td>{{list.depth}}</td>
                    <td>{{list.quality}}</td>
                    <td>{{list.ratio ? list.ratio.toFixed(4) : '-'}}</td>
                    <td>{{list.gatkFilter ? list.gatkFilter : '-'}}</td>
                    <td>
                    <span v-if="list.edit">
                      {{list.edit.status | getStatus}}
                    </span>
                      <span v-else="">无信息</span>
                    </td>
                  </tr>
                  <tr v-if="lists0.length === 0" class="center">
                    <td colspan="7">该位点在其它样本中没有信息</td>
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

</template>

<script>
  const echarts = require('echarts');
  import myDataH from './global/myDataHeader.vue'

  export default {
    components: {
      'myDataH': myDataH,
    },
    data: function () {
      return {
        sn: this.$route.query.sn,
        id: this.$route.query.id,
        allData: '',
        dbnsfp: '',


        basicResp: '',

        deData: '',
        hgmdData: '',
        clinvarData: '',
        gwasData: '',
        MitomapData: '',
        MitimpactData: '',
        dbData: '',
        spiData: '',

        loading: false,

        dataBaseArr: [],
        dataBaseData: [],

        comment: '',

        /*位点弹框*/
        fullLocusStr: '',
        lists0: []
      }
    },
    mounted: function () {
      const _vue = this;
      this.getRecord();
      //请求成功被移出来的部分
      _vue.loading = false;

      _vue.basicResp = {
        "id": "5951df11522a8723fd6b7534",
        "chrom": "11",
        "start": 119052976,
        "end": 119052976,
        "ref": "C",
        "alt": "T",
        "avsnp": "rs199476052",
        "freq": {
          "mtdb": 0.0,
          "gnomad": {
            "exome": {
              "all": 0.0002,
              "afr": 6.563e-05,
              "amr": 0.0,
              "asj": 0.0,
              "eas": 0.0025,
              "fin": 0.0,
              "nfe": 1.802e-05,
              "oth": 0.0002,
              "sas": 0.0
            },
            "genome": {
              "all": 0.0002,
              "afr": 0.0,
              "amr": 0.0,
              "asj": 0.0,
              "eas": 0.0031,
              "fin": 0.0,
              "nfe": 0.0,
              "oth": 0.0
            }
          },
          "exac": {
            "all": 0.0002,
            "afr": 0.0,
            "amr": 0.0,
            "eas": 0.0026,
            "sas": 0.0,
            "fin": 0.0,
            "nfe": 0.0,
            "oth": 0.0
          },
          "onekg": {
            "all": 0.0,
            "afr": 0.0,
            "amr": 0.0,
            "eas": 0.0,
            "sas": 0.0,
            "eur": 0.0
          },
          "esp6500": {
            "all": 0.0,
            "aa": 0.0,
            "ea": 0.0
          },
          "grandfreq": {
            "freq": 0.005230125523012552,
            "sampleNum": 956,
            "count": {
              "gatkpass": {
                "het": 5,
                "hom": 0
              },
              "total": {
                "het": 5,
                "hom": 0
              }
            }
          }
        },
        "dbnsfp": {
          "mcap": {
            "score": 0.073,
            "pred": "D"
          },
          "sift": {
            "score": 0.149,
            "pred": "T"
          },
          "polyphen2": {
            "score": 1.0,
            "pred": "D"
          },
          "lrt": {
            "score": 0.017,
            "pred": "N"
          },
          "fathmm": {
            "score": 0.58,
            "pred": "T"
          },
          "provean": {
            "score": -1.82,
            "pred": "N"
          },
          "mutationtaster": {
            "score": 0.997,
            "pred": "D"
          },
          "mutationassessor": {
            "score": 1.79,
            "pred": "L"
          },
          "metasvm": {
            "score": -0.846,
            "pred": "T"
          },
          "meatlr": {
            "score": 0.217,
            "pred": "T"
          },
          "gerp": {
            "score": 3.58,
            "pred": null
          },
          "revel": {
            "score": 0.328,
            "pred": null
          }
        },
        "acmg": {
          "intervar": "Uncertain significance",
          "pvs1": 0,
          "ps": [
            0,
            0,
            0,
            0
          ],
          "pm": [
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "pp": [
            0,
            0,
            0,
            0,
            0
          ],
          "bp": [
            0,
            0,
            0,
            0,
            0,
            0,
            0
          ],
          "bs": [
            0,
            0,
            0,
            0
          ],
          "ba1": 0
        },
        "disease": {
          "clinvar": {
            "clnacc": [
              "RCV000089403.1"
            ],
            "clinsig": [
              "not provided"
            ],
            "clndbn": [
              "not_provided"
            ],
            "clndsdbs": [
              {
                "MedGen": "CN221809"
              }
            ]
          },
          "hgmd": null,
          "gwas": null,
          "deafness": null
        },
        "splicing": {
          "dbscsnv": null,
          "spidex": {
            "maxTissue": -0.4482,
            "zscore": -1.038
          }
        },
        "mito": null
      };


//      _vue.dbnfsp(); //绘制dbnfsp区域
//      _vue.fillHgmd();//填充hgmd
//      _vue.fillClinvar(); //填充clinvar
//      _vue.fillGwas();//填充gwas
//      _vue.fillMito();//填充线粒体
//      _vue.fillCut();//填充剪切区域


//      _vue.myAxios({
//        url: 'database/snv/?query=' + this.$route.query.id,
//      }).then(function (resp) {
//
//      }).catch(function (error) {
//        _vue.catchFun(error)
//      })
    },
    methods: {

      //请求位点所有数据
      getRecord: function () {
        const _vue = this;
        this.myAxios({
          url: 'manage/sample/' + this.sn + '/record/' + this.id,
        }).then((resp) => {
          let data = resp.data.data;
          _vue.allData = data;
          _vue.comment = data.edit.comment;
          _vue.dbnsfp = data.snv.variant.info.dbnsfp;
          _vue.dbfreq();//绘制人群频率
        }).catch((error) => {
          _vue.catchFun(error)
        })
      },
      dbfreq: function () {
        let all_freq = this.allData.snv.variant.info.all_freq;
        let gADe = all_freq.gnomad.exome;
        let gADg = all_freq.gnomad.genome;
        let exac = all_freq.exac;
        let onekg = all_freq.onekg;

        this.dataBaseCharts('frequency-chart', {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['gnomAD外显子', 'gnomAD基因组', 'EXAC', '千人']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '50',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            axisLabel: {rotate: -20},
            data: [{
              value: '东亚',
              textStyle: {color: 'red'}
            }, '所有', '非洲', '美洲', '阿什肯纳兹犹太人', '芬兰', '非芬兰欧洲', '欧洲', '南亚', '其他']
          },
          yAxis: {
            type: 'value',
            name: '频率(%)',
            boundaryGap: [0, 0.01]
          },
          series: [
            {
              name: 'gnomAD外显子',
              type: 'bar',
              data: gADe ? [gADe.eas, gADe.all, gADe.afr, gADe.amr, gADe.asj, gADe.fin, gADe.nfe, gADe.eur, gADe.sas, gADe.oth]
                : ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
            },
            {
              name: 'gnomAD基因组',
              type: 'bar',
              data: gADg ? [gADg.eas, gADg.all, gADg.afr, gADg.amr, gADg.asj, gADg.fin, gADg.nfe, gADg.eur, gADg.sas, gADg.oth]
                : ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
            },
            {
              name: 'EXAC',
              type: 'bar',
              data: exac ? [exac.eas, exac.all, exac.afr, exac.amr, exac.asj, exac.fin, exac.nfe, exac.eur, exac.sas, exac.oth]
                : ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
            },
            {
              name: '千人',
              type: 'bar',
              data: onekg ? [onekg.eas, onekg.all, onekg.afr, onekg.amr, onekg.asj, onekg.fin, onekg.nfe, onekg.eur, onekg.sas, onekg.oth]
                : ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-']

            }
          ],
        });
        //GNOMAD饼图和柱状图
        this.dataBaseCharts('frequency-pie', {
          title: {
            text: 'gnomAD外显子样本数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['东亚', '非洲', '美洲', '阿什肯纳兹犹太人', '芬兰', '非芬兰欧洲', '其他', '南亚']/*'所有',*/
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 8624, name: '东亚'},
//                {value: 123136, name: '所有'},
                {value: 7652, name: '非洲'},
                {value: 16791, name: '美洲'},
                {value: 4925, name: '阿什肯纳兹犹太人'},
                {value: 11150, name: '芬兰'},
                {value: 55860, name: '非芬兰欧洲'},
                {value: 2743, name: '其他'},
                {value: 15391, name: '南亚'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        this.dataBaseCharts('frequency-pie-1', {
          title: {
            text: 'gnomAD基因组样本数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['东亚', '非洲', '美洲', '阿什肯纳兹犹太人', '芬兰', '非芬兰欧洲', '其他', '南亚']/*'所有',*/
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 811, name: '东亚'},
//                {value: 15496, name: '所有'},
                {value: 4368, name: '非洲'},
                {value: 419, name: '美洲'},
                {value: 151, name: '阿什肯纳兹犹太人'},
                {value: 1747, name: '芬兰'},
                {value: 7509, name: '非芬兰欧洲'},
                {value: 491, name: '其他'},
                {value: 0, name: '南亚'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        this.dataBaseCharts('frequency-pie-2', {
          title: {
            text: 'EXAC样本数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['东亚', '非洲', '美洲', '芬兰', '非芬兰欧洲', '其他', '南亚']/*'所有',*/
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 4327, name: '东亚'},
//                {value: 60706, name: '所有'},
                {value: 5203, name: '非洲'},
                {value: 5789, name: '美洲'},
                {value: 3307, name: '芬兰'},
                {value: 33370, name: '非芬兰欧洲'},
                {value: 454, name: '其他'},
                {value: 8256, name: '南亚'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        this.dataBaseCharts('frequency-pie-3', {
          title: {
            text: '千人样本数',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['东亚', '非洲', '美洲', '南亚', '欧洲']/*'所有'*/
          },
          series: [
            {
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 617, name: '东亚'},
//                {value: 3900, name: '所有'},
                {value: 1418, name: '非洲'},
                {value: 535, name: '美洲'},
                {value: 661, name: '南亚'},
                {value: 669, name: '欧洲'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
      },
      dataBaseCharts: function (eleId, option) {
        const myChart = echarts.init(document.getElementById(eleId));
        myChart.setOption(option);
      },

      doComment: function () {
        const _vue = this;
        this.myAxios({
          url: 'manage/sample/' + this.sn + '/record/' + this.id,
          method: 'patch',
          data: {
//            status:status,
            comment: this.comment
          }
        }).then(function (resp) {
          _vue.success('修改状态成功')
        }).catch(function (error) {
          _vue.catchFun(error)
        })
      },


      dbnfsp: function () {
        const _vue = this;
//        _vue.basicResp.dbnsfp = null;
        if (!_vue.basicResp.dbnsfp) { //如果不存在的话，给个初始数据库的值
          _vue.dataBaseArr =
            ['mcap', 'sift', 'polyphen2', 'lrt', 'fathmm', 'provean', 'mutationtaster', 'mutationassessor', 'metasvm', 'meatlr', 'revel',]
          $.each(_vue.dataBaseArr, function () {
            _vue.dataBaseData.push({score: '-', pred: '-'})
          })
        }

        $.each(_vue.basicResp.dbnsfp, function (key, value) { //遍歷對象
          if (key !== 'gerp') { //剔除gerp
            _vue.dataBaseArr.push(key);
            if (value) {
              _vue.dataBaseData.push(value);
              _vue.doPie(value.pred);
            } else {
              _vue.dataBaseData.push({score: '-', pred: '-'})
            }
          }
        });
        this.dataBaseCharts('mit-chart', {
          title: {
            text: '有害性预测统计',
            subtext: '共十个数据库',
            x: 'right'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Damaging: D/A/H/M', 'Non-damaging:  B/T/N/P/L/U', 'Undefined: -'],
            right: 50
          },
          series: [
            {
              name: '预测统计',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: this.type_0, name: 'Damaging: D/A/H/M', itemStyle: {normal: {color: '#5c6f7b'}}},
                {value: this.type_1, name: 'Non-damaging:  B/T/N/P/L/U', itemStyle: {normal: {color: '#cfb2a9'}}},
                {
                  value: this.type_2, name: 'Undefined: -', itemStyle:

                  {normal: {color: '#666666'}}
                },
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        });
        this.in1 = false;
      },
      doPie: function (value) {
        if ('D/A/H/M'.indexOf(value) >= 0) {  //Damaging
          this.type_0 += 1;
        } else if ('B/T/N/P/L/U'.indexOf(value) >= 0) { //Non-damaging
          this.type_1 += 1;
        } else { //undefined
          this.type_2 += 1;
        }
      },
      fillHgmd: function () {
        if (this.basicResp.disease && !$.isEmptyObject(this.basicResp.disease.hgmd)) {
          let data = this.basicResp.disease.hgmd;
          data.hgvs = data.hgvs.join(' , ');
          data.citation = data.citation.join(' , ');
//          data.dbid.uniprot = data.dbid.uniprot.join(' , ');
          this.hgmdData = data;
          console.log(this.hgmdData)
        }
      },
      fillClinvar: function () {
        if (this.basicResp.disease && !$.isEmptyObject(this.basicResp.disease.clinvar)) {
          this.clinvarData = this.basicResp.disease.clinvar;
        }
      },
      fillGwas: function () {
        if (this.basicResp.gwas) {
          this.gwasData = this.basicResp.gwas;
        }
      },
      fillMito: function () {
        if (this.basicResp.mito && (this.basicResp.mito.mitomap || this.basicResp.mito.mitimpact)) {
          if (this.basicResp.mito.mitomap) {
            this.MitomapData = this.basicResp.mito.mitomap;
          }
          if (this.basicResp.mito.mitimpact) {
            this.MitimpactData = this.basicResp.mito.mitimpact;
          }
        }
      },
      fillCut: function () {
        if (this.basicResp.splicing && (this.basicResp.splicing.dbscsnv || this.basicResp.splicing.spidex)) {
          this.dbData = this.basicResp.splicing.dbscsnv;
          this.spiData = this.basicResp.splicing.spidex;
//          this.loading = false
        }
      },
      objToArr: function (obj) {
        let str = '';
        $.each(obj, function (key, value) {
          str += key + ': ' + value + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        });
        return str;
      },
      filterData: function (data) { //为0输出0，不存在输出-
        if (data === 0) {
          return 0;
        }
        if (!data) {
          return ' - '
        }
        return data * 100
      }
    },
    filters: {
      getPercent: function (data) {
        return Math.round(data * 10000) / 100
      },
      otherData: function (data) {
        if (data == 'T') {
          return '可容忍的（Tolerable）'
        } else {
          return '有害的（Damaging）'
        }
      },
      phData: function (data) {
        if (data == 'B') {
          return '良性的（benign）'
        } else if (data == 'P') {
          return '可能有害的（Possibly damaging）'
        } else {
          return '极有可能有害的（Porobably damaging）'
        }
      },

      objToArr: function (obj) {
        let str = '';
        $.each(obj, function (key, value) {
          str += key + ': ' + value + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        });
        return str;
      },
      getStatus: function (status) {
        switch (status) {
          case 'major':
            return '主要的';
            break;
          case 'minor':
            return '次要的';
            break;
          case 'benign':
            return '良性的';
            break;
          case 'invalid':
            return '无效的';
            break;
          case '':
            return '未标记';
            break;
        }
      },
      changeName: function (name) {
        if (name == 'fathmm') {
          return 'FATHMM'
        } else if (name == 'gerp') {
          return 'GERP++'
        } else if (name == 'lrt') {
          return 'LRT'
        } else if (name == 'mcap') {
          return 'M-Cap'
        } else if (name == 'meatlr') {
          return 'MetaLR'
        } else if (name == 'metasvm') {
          return 'MetaSVM'
        } else if (name == 'mutationassessor') {
          return 'MutationAssessor'
        } else if (name == 'mutationtaster') {
          return 'MutationTaster'
        } else if (name == 'polyphen2') {
          return 'PolyPhen2'
        } else if (name == 'provean') {
          return 'PROVEAN'
        } else if (name == 'revel') {
          return 'REVEL'
        } else if (name == 'sift') {
          return 'SIFT'
        }
      }
    },
    updated: function () {
      $('[data-toggle="tooltip"]').tooltip()
    },
  }
</script>

<style scoped lang="less">
  @border: rgb(193, 192, 192);
  @in: rgb(44, 127, 210);
  @tableSha: rgb(185, 184, 184);

  .right-content {
    padding-top: 0;
    .frequency-chart {
      height: 400px;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .cut-content {
      .one {
        .title {
          font-size: 14px;
          margin: 8px 0;

        }
      }
    }
  }

  #vaD-content {
    /*20171106新加标签样式*/
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
    .all-content {
      margin: 0;
      border: 1px solid @tableSha;
      padding-left: 20px;
      min-height: 150px;
      .basic-div {
        padding: 20px 0;
        > span, > div {
          margin: 3px 0;
        }
        .describe {
          margin-bottom: 15px;
        }
      }
      #mit-chart {
        width: 50%;
        min-width: 300px;
      }
    }

    /*20171106-end*/

    .shadow-top {
      min-height: 300px;
      margin-top: 15px;
      padding: 20px;
      .rsid {
        display: inline-block;
        margin-left: 50px;
      }
      .gene-information {
        clear: both;
        overflow: hidden;
        .locus-a {
          margin-left: 50px;
        }
        .frequency-chart {
          /*width: 100%;*/
          height: 400px;
          overflow-x: auto;
          overflow-y: hidden;
        }
        #mit-chart {
          height: 400px;
          overflow-x: auto;
          overflow-y: hidden;
        }
        margin: 20px 0;
        .gene-information-title {
          font-size: 16px;
        }
        .gene-content {
          background-color: #fafafa;
          padding: 20px 20px 0 20px;
        }
        .omIm-value {
          margin: 0 0 10px 0;
        }
        .explain {
          font-size: 12px;
          > span {
            display: block;
            margin: 5px 0;
            word-break: break-all;

          }
        }
        .one {
          margin-bottom: 15px;
        }
      }
    }
  }

</style>
