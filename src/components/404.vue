<template>
  <div class="p404">
    <div class="content">
      <div class="title">404</div>

      <div class="char">页面未找到</div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
      }
    },
    mounted: function () {
    },
    components: {
    },
    methods: {

    },
    filter: {
    }
  }
</script>

<style scoped lang="less">
.p404{
  height: 100vh;
  width: 100vw;
  background: url("../../static/img/404.png") no-repeat center;
  text-align: center;
  .content{
    color: #fff;
    padding-top: 20vh;
    .title{
      font-size: 80px;
    }
    .char{
      font-size: 50px;
    }
  }
}
</style>
