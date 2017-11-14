<template>
  <div class="row">
    <loading v-if="Loading"></loading>
    <div class="col-sm-11 bc-fff">
      <div class="title">
        <span class="title-b">任务详情</span>
        <span class="title-s">> 位点覆盖图</span>
      </div>

      <div class="detail-content">
        <div class="svg-title pull-left">
          <span>样本信息：</span>
          <span id="svg-title"></span>
          <!--<span class="svg-locus">位点：</span>-->
        </div>
        <div class="pull-left do-pos">
          <span class="pull-left font-span">染色体：</span><input type="text" class="form-control" v-model="pos0">
          <span class="pull-left font-span">起始位置：</span><input type="text" class="form-control" v-model="pos1">
          <span class="pull-left font-span">终止位置：</span><input type="text" class="form-control" v-model="pos2">
          <!--<input v-model="pos" class="form-control">-->
          <span class="my-btn" @click="changePos"><img src="../../static/img/red-submit.png" alt="">修改位点</span>
        </div>
        <div id="svg-detail"></div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    data: function () {
      return {
        Loading: '',
        pos: this.$route.query.pos ? this.$route.query.pos : '',
        id: this.$route.query.id ? this.$route.query.id : '',
        pos0:'',/*染色体*/
        pos1:'',/*起始位置*/
        pos2:'', /*终止位置*/
      }
    },
    created: function () {
      if (!this.id) {
        this.$router.push('/login')
      }
      this.getPos();
      this.getData();

    },
    watch:{

    },
    methods: {
      getPos:function () {
        let pos = this.pos
        this.pos0 = pos.substring(0,pos.indexOf(':'))
        pos = pos.substring(pos.indexOf(':') + 1, pos.length)
        this.pos1 = pos.substring(0, pos.indexOf('-'))
        this.pos2= pos.substring(pos.indexOf('-') + 1, pos.length)
      },
      getData: function () {
        const _vue = this
        this.Loading = true
        this.myAxios({
          url: 'application/job/' + this.id + '/svg/?pos=' + this.pos,
        }).then(function (resp) {
          $('#svg-title').html(resp.data.sample)
          $('#svg-detail').html(resp.data.svg)
          _vue.Loading = ''
        }).catch(function (error) {
          _vue.catchFun(error);
        })
      },
      changePos: function () {
        if (parseInt(this.pos2) - parseInt(this.pos1) > 1000000) {
          alert('所填位点太长')
        } else {
          this.pos = this.pos0+':'+this.pos1+'-'+this.pos2;
          this.getData();
        }

      }
    }
  }
</script>

<style scoped lang="less">
  .detail-content {
    overflow: auto;
    min-height: 200px;
    margin: 20px;
  }

  .svg-title {
    font-size: 20px;
  }

  .svg-locus {
    margin-left: 40px;
  }

  .do-pos {
    margin-left: 30px;
    input {
      width: 150px;
      float: left;
    }
    .my-btn {
      float: left;
      margin-left: 20px;
      margin-top: 3px;
    }
    .font-span{
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      margin-left: 8px;
    }
  }
</style>
