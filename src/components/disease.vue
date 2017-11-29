<template>
  <div class="">

    <dataHeader></dataHeader>

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
