<template>
  <div class="all">
    <div class="header">
      <div class="pull-left logo">
        <img class="logo-img" src="../../static/img/logo.png" alt="grandbox">
        <img class="pull-right" src="../../static/img/header-2.png"/>
      </div>
      <div class="pull-left">
        <div class="font-content">
          <img class="cloud" src="../../static/img/header-1.png" alt="">
          <span class="header-font">On-boarding</span>
          <img src="../../static/img/header-2.png"/>
        </div>
      </div>
      <div class="pull-right po" @click="toPage(0)">
        <img src="../../static/img/header-2.png"/>
        <img class="register-img" src="../../static/img/header-12.png"/>
        <span class="register-span">反馈</span>
      </div>
      <div class="pull-right po" @click="toPage(1)">
        <img src="../../static/img/header-2.png"/>
        <img class="register-img" src="../../static/img/header-11.png"/>
        <span class="register-span">帮助</span>
      </div>
      <div class="pull-right po" @click="toLogin">
        <img src="../../static/img/header-2.png"/>
        <img class="register-img" src="../../static/img/header-10.png"/>
        <span class="register-span">登录</span>
      </div>
    </div>

    <div class="content">
      <div class="content-left">
        <div class="substance">
          <div class="img-content">
            <img src="../../static/img/header-13.png" alt="">
            <div class="img-font">一站式数据分析解决方案</div>
          </div>
          <div class="project-content">
            <div class="row">
              <div class="row col-sm-8 col-sm-offset-2">
                <div class="project-one col-sm-4">
                  <img src="../../static/img/header-14.png" alt="">
                  <div class="title">分析解读平台</div>
                  <div class="main">同步分析流程，监控分析数据，提高检测验证、样本分析和报告的效率 </div>
                </div>
                <div class="project-one col-sm-4">
                  <img src="../../static/img/header-15.png" alt="">
                  <div class="title">项目管理系统</div>
                  <div class="main">方便且高效的数据管理方法，个性化的实时样本管理，简化日常工作流程 </div>
                </div>
                <div class="project-one col-sm-4">
                  <img src="../../static/img/header-16.png" alt="">
                  <div class="title">医学大数据库</div>
                  <div class="main">构建私有医学数据库，可以对不同数据源进行转化与合并  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <img src="../../static/img/aHome-r.png" alt="">
      </div>
      <div class="footer">
        <img @click="toLogin" src="../../static/img/header-18.png" alt="">
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data: function () {
      return {}
    },
    created: function () {
      if (localStorage.token) {
        this.$router.push({path: '/home'})
      }
    },
    methods: {
      toPage: function (type) {
        if (type) { //帮助
          window.location.href = this.manHtml + "help/announcement?prev=1";
        } else { //反馈
          window.open(this.feedBackHtml)
        }
      },
      toLogin: function () {
        this.$router.push({path: '/login'})
      }
    }
  }
</script>
<style lang="less" scoped>
  @border: rgb(168, 185, 209);
  @in: rgb(14, 125, 195);
  @triangle-color: rgb(0, 118, 192);
  @font-color: rgb(21, 65, 65);

  @keyframes f {
    0%, 20%, 53%, 80%, to {
      -webkit-transform: translate(0);
      transform: translate(0);
      -webkit-transition-timing-function: cubic-bezier(.215, .61, .355, 1);
      transition-timing-function: cubic-bezier(.215, .61, .355, 1)
    }
    40%, 43% {
      -webkit-transform: translateY(-10px);
      transform: translateY(-10px);
      -webkit-transition-timing-function: cubic-bezier(.755, .05, .855, .06);
      transition-timing-function: cubic-bezier(.755, .05, .855, .06)
    }
    70% {
      -webkit-transform: translateY(-5px);
      transform: translateY(-5px);
      -webkit-transition-timing-function: cubic-bezier(.755, .05, .855, .06);
      transition-timing-function: cubic-bezier(.755, .05, .855, .06)
    }
    90% {
      -webkit-transform: translateY(-4px);
      transform: translateY(-4px)
    }
  }

  .all {
    height: 100%;
    min-width: 1300px;
    .header {
      height: 50px;
      line-height: 48px;
      width: 100%;
      color: #fff;
      background: url('../../static/img/header-bc.png') no-repeat center;
      background-size: 100%;
      border-bottom: 1px solid rgb(0, 77, 144);
      .logo {
        width: 251px;
        text-align: center;
      }
      .font-content {
        .cloud {
          margin: 0 6px 0 32px;
        }
        .header-font {
          margin-right: 28px;
        }
      }
      .register-img {
        margin: 0 5px 2px 20px;
      }
      .register-span {
        margin-right: 20px;
      }
    }
    .content {
      border-top: 1px solid @border;
      height: calc(~'100vh - 52px');
      width: 100%;
      float: left;
      margin: -1px 0 0 0;
      /*background: url(../../static/img/header-17.png) no-repeat right;*/
      background: url(../../static/img/aHome-bc.png) no-repeat right;
      background-size: 100% 100%;
      .footer {
        position: fixed;
        bottom: 0;
        text-align: center;
        width: 100%;
        padding-bottom: 50px;
        img {
          animation: f 1s infinite;
          cursor: pointer;
        }
      }
      .content-right{
        float: left;
        width: 50%;
        height: 100%;
        margin-top: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        img{
          width: 100%;
          margin-left: -200px;
        }
      }
      .content-left {
        float: left;
        width: 50%;
        height: 100%;
        margin-top: 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        .substance {
          .img-content {
            margin-bottom: 120px;
            text-align: center;
            .img-font {
              font-size: 12px;
              font-family: "Microsoft YaHei","微软雅黑" !important;
              color: rgb(16, 163, 231);
              letter-spacing: 11px;
              margin-top: 10px;
            }
          }
          .project-one {
            text-align: center;
            .title {
              font-weight: bold;
              margin: 10px 0;
              color: rgb(67, 67, 67);
            }
            .main {
              text-align: left;
              font-size: 12px;
              color: rgb(125, 125, 125);
            }
          }
        }
      }
    }
  }
</style>
