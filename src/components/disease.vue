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
    components: {
      'page': page,
      'dataHeader': dataHeader,
    },
    data: function () {
      return {

      }
    },
    mounted: function () {
    },

    methods: {

    },
    filter: {

    }
  }
</script>

<style scoped lang="less">

</style>
