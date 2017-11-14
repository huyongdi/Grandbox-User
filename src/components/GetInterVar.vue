<template>
  <div class="row">
    <loading v-if="loadingInter"></loading>
    <div class="col-sm-11">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">> 计算Interval</span>
      </div>
      <div class="title-content row">
        <div class="col-md-offset-4 col-md-3">
          <input class="form-control" id="countInput">
        </div>
        <div class="col-md-1">
          <!--<span class="my-btn" @click="calculate"><img src="../../static/img/red-submit.png" alt="">计算</span>-->
          <span class="my-btn submit" @click="submit"><img src="../../static/img/red-submit.png" alt="">提交</span>
        </div>
      </div>

      <!--<div class="my-table-content">-->
        <table class="table my-table bc-fff">
          <thead>
          <tr>
            <th></th>
            <!--<th>名称</th>-->
            <!--<th>中文定义</th>-->
            <!--<th>英文定义</th>-->
            <!--<th>级别</th>-->

            <th>编号</th>
            <th>名称</th>
            <th>定义</th>
          </tr>
          </thead>
          <tbody id="submit_table">
          <tr v-for="(data,index) in allData" :class="{'tr-bc':index%2}">
            <td><input type="checkbox" :class="data.code" class="valueBox" :data-value=data.value></td>
            <!--<td class="t-name">{{data.name}}</td>-->
            <!--<td>{{data.cn}}</td>-->
            <!--<td>{{data.en}}</td>-->
            <!--<td>{{data.level}}</td>-->
            <td class="t-name">{{data.code}}</td>
            <td>{{data.name}}</td>
            <td>{{data.definition}}</td>
          </tr>
          </tbody>
        </table>
      <!--</div>-->

    </div>
  </div>
</template>

<script>
//  import acmgJson from  '../../static/acmg_rank.json'
  import acmgJson from  '../../static/intervar.json'

  export default {
    data: function () {
      return {
        allData: acmgJson,
        rank: [],
        loading: '',
        loadingInter: '',
        weight: '',
      }
    },
    mounted: function () {
      const _vue = this;
      let param = this.$route.query.query;
//      if(param){
//        param = param.split(',');
//        $.each(param,function (i,value) {
//          $('.t-name').each(function () {
//            if(value === $(this).html()){
//              $(this).prev().find('input').attr('checked','checked');
//            }
//          })
//        })
//      }

      this.loading = true

      /*該勾選的勾選上*/
      this.myAxios({
        url: 'report/snv/' + param + '/'
      }).then(function (resp) {
        _vue.loading = false;
        let data = resp.data.intervar
        if (data.ba1) {
          $('.BA1').attr('checked', 'checked')
        }
        if (data.pvs1) {
          $('.PVS1').attr('checked', 'checked')
        }
        $.each(data.bp, function (i, data) {
          if (i == 0 && data) {
            $('.BP1').attr('checked', 'checked')
          } else if (i == 1 && data) {
            $('.BP2').attr('checked', 'checked')
          } else if (i == 2 && data) {
            $('.BP3').attr('checked', 'checked')
          } else if (i == 3 && data) {
            $('.BP4').attr('checked', 'checked')
          } else if (i == 4 && data) {
            $('.BP5').attr('checked', 'checked')
          } else if (i == 5 && data) {
            $('.BP6').attr('checked', 'checked')
          } else if (i == 6 && data) {
            $('.BP7').attr('checked', 'checked')
          }
        })
        $.each(data.bs, function (i, data) {
          if (i == 0 && data) {
            $('.BS1').attr('checked', 'checked')
          } else if (i == 1 && data) {
            $('.BS2').attr('checked', 'checked')
          } else if (i == 2 && data) {
            $('.BS3').attr('checked', 'checked')
          } else if (i == 3 && data) {
            $('.BS4').attr('checked', 'checked')
          }
        })
        $.each(data.pm, function (i, data) {
          if (i == 0 && data) {
            $('.PM1').attr('checked', 'checked')
          } else if (i == 1 && data) {
            $('.PM2').attr('checked', 'checked')
          } else if (i == 2 && data) {
            $('.PM3').attr('checked', 'checked')
          } else if (i == 3 && data) {
            $('.PM4').attr('checked', 'checked')
          } else if (i == 4 && data) {
            $('.PM5').attr('checked', 'checked')
          } else if (i == 5 && data) {
            $('.PM6').attr('checked', 'checked')
          }
        })
        $.each(data.pp, function (i, data) {
          if (i == 0 && data) {
            $('.PP1').attr('checked', 'checked')
          } else if (i == 1 && data) {
            $('.PP2').attr('checked', 'checked')
          } else if (i == 2 && data) {
            $('.PP3').attr('checked', 'checked')
          } else if (i == 3 && data) {
            $('.PP4').attr('checked', 'checked')
          } else if (i == 4 && data) {
            $('.PP5').attr('checked', 'checked')
          }
        })
        $.each(data.ps, function (i, data) {
          if (i == 0 && data) {
            $('.PS1').attr('checked', 'checked')
          } else if (i == 1 && data) {
            $('.PS2').attr('checked', 'checked')
          } else if (i == 2 && data) {
            $('.PS3').attr('checked', 'checked')
          } else if (i == 3 && data) {
            $('.PS4').attr('checked', 'checked')
          }
        })
      }).catch(function (error) {
        _vue.catchFun(error)
      })

    },
    methods: {
      submit: function () {
        let param = this.$route.query.query
        const _vue = this
        this.loadingInter = true;
        let ajaxObj = {
//          'localsnv': param,
          'intervar': _vue.calculate(),
//          'rank': _vue.rank,
          'weight':_vue.weight,
          'pvs1': 0,
          'ps': [0, 0, 0, 0, 0],
          'pm': [0, 0, 0, 0, 0, 0, 0],
          'pp': [0, 0, 0, 0, 0, 0],
          'ba1': 0,
          'bs': [0, 0, 0, 0, 0],
          'bp': [1, 0, 0, 0, 0, 0, 0, 0]
        }

        ajaxObj.pvs1 = $('.PVS1').prop('checked') ? 1 : 0

        ajaxObj.ps[0] = $('.PS1').prop('checked') ? 1 : 0
        ajaxObj.ps[1] = $('.PS2').prop('checked') ? 1 : 0
        ajaxObj.ps[2] = $('.PS3').prop('checked') ? 1 : 0
        ajaxObj.ps[3] = $('.PS4').prop('checked') ? 1 : 0

        ajaxObj.pm[0] = $('.PM1').prop('checked') ? 1 : 0
        ajaxObj.pm[1] = $('.PM2').prop('checked') ? 1 : 0
        ajaxObj.pm[2] = $('.PM3').prop('checked') ? 1 : 0
        ajaxObj.pm[3] = $('.PM4').prop('checked') ? 1 : 0
        ajaxObj.pm[4] = $('.PM5').prop('checked') ? 1 : 0
        ajaxObj.pm[5] = $('.PM6').prop('checked') ? 1 : 0

        ajaxObj.pp[0] = $('.PP1').prop('checked') ? 1 : 0
        ajaxObj.pp[1] = $('.PP2').prop('checked') ? 1 : 0
        ajaxObj.pp[2] = $('.PP3').prop('checked') ? 1 : 0
        ajaxObj.pp[3] = $('.PP4').prop('checked') ? 1 : 0
        ajaxObj.pp[4] = $('.PP5').prop('checked') ? 1 : 0

        ajaxObj.ba1 = $('.BA1').prop('checked') ? 1 : 0

        ajaxObj.bs[0] = $('.BS1').prop('checked') ? 1 : 0
        ajaxObj.bs[1] = $('.BS2').prop('checked') ? 1 : 0
        ajaxObj.bs[2] = $('.BS3').prop('checked') ? 1 : 0
        ajaxObj.bs[3] = $('.BS4').prop('checked') ? 1 : 0

        ajaxObj.bp[0] = $('.BP1').prop('checked') ? 1 : 0
        ajaxObj.bp[1] = $('.BP2').prop('checked') ? 1 : 0
        ajaxObj.bp[2] = $('.BP3').prop('checked') ? 1 : 0
        ajaxObj.bp[3] = $('.BP4').prop('checked') ? 1 : 0
        ajaxObj.bp[4] = $('.BP5').prop('checked') ? 1 : 0
        ajaxObj.bp[5] = $('.BP6').prop('checked') ? 1 : 0
        ajaxObj.bp[6] = $('.BP7').prop('checked') ? 1 : 0

        this.myAxios({
          url: 'report/snv/' + param + '/',
          method: 'patch',
          data: {
            intervar:ajaxObj
          }
        }).then(function (resp) {
          alert('提交成功');
          _vue.loadingInter = false;
        }).catch(function (error) {
          _vue.catchFun(error)
        })

      },
      calculate: function () {
        const _vue = this
        let allValue = 0
        let interVar = ''
        $('.valueBox').each(function () {
          if ($(this).prop('checked')) {
            allValue += $(this).data('value');
            _vue.weight= allValue;
            _vue.rank.push($(this).parent().next().html())
          }
        })
        if (allValue >= 20) {
          interVar = 'Pathogenic'
        } else if (allValue >= 12 && allValue < 20) {
          interVar = 'Likely pathogenic'
        } else if (allValue > 0 && allValue < 12) {
          interVar = 'Uncertain significance'
        } else if (allValue > -4 && allValue <= 0) {
          interVar = 'Uncertain significance'
        } else if (allValue > -8 && allValue <= -4) {
          interVar = 'Likely benign'
        } else if (-8 >= allValue) {
          interVar = 'Benign'
        }
        $('#countInput').val(interVar)
        return interVar
      },
      addBc: function (event) {
        const _tr = $(event.target).closest('tr')
        const _table = _tr.closest('table')
        _table.find('.tr-active').removeClass('tr-active')
        _tr.addClass('tr-active')
      }
    }
  }
</script>

<style scoped>

</style>
