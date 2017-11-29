<template>
  <div class="data-content">
    <dataHeader></dataHeader>
    <div class="right-content">123</div>
  </div>
</template>

<script>
  import page from './global/Page.vue'
  import dataHeader from './global/databaseHeader.vue'

  export default {
    data: function () {
      return {
        'page': page,
      }
    },
    mounted: function () {
    },
    components: {
      'page': page,
      'dataHeader': dataHeader,

    },
    methods: {

    },
    filter: {


    }
  }
</script>

<style scoped lang="less">

</style>
