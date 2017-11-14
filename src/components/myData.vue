<template>
  <div id="home" class="test">

  </div>
</template>

<script>
  export default {
    components: {
    },
    data: function () {
      return {

      }
    },
    updated: function () {
    },
    methods: {



    }
  }
</script>

<style scoped lang="less">
  #home {
    #under {
      .under-left {
        .analyze-flow {
          background: url(../../static/img/all-1.png) 0 400px;
        }
        .analyze-soft {
          background: url(../../static/img/all-1.png) 0 374px;
        }
        .analyze-tool {
          background: url(../../static/img/all-1.png) 0 346px;
        }
        .task-genotype {
          margin-top: 3px;
          background: url(../../static/img/all-1.png) 0 80px;
        }
        .active {
          .analyze-flow {
            background: url(../../static/img/all-1.png) 16px 400px;
          }
          .analyze-soft {
            background: url(../../static/img/all-1.png) 16px 374px;
          }
          .analyze-tool {
            background: url(../../static/img/all-1.png) 16px 346px;
          }
          .task-genotype {
            background: url(../../static/img/all-1.png) 16px 80px;
          }
          .father {
            img {
              transform: rotate(180deg);
              -ms-transform: rotate(180deg); /* IE 9 */
              -moz-transform: rotate(180deg); /* Firefox */
              -webkit-transform: rotate(180deg); /* Safari 和 Chrome */
              -o-transform: rotate(180deg); /* Opera */
            }
          }
        }
      }
      .shadow#home-content {
        background: #fff;
        margin-top: 20px;
        .title {
          height: 60px;
          line-height: 60px;
          color: rgb(67, 67, 67);
          font-size: 16px;
          padding-left: 40px;
          border-bottom: 1px solid rgb(221, 221, 221);
        }
        .content {
          padding: 0 90px;
          .row.search-content {
            text-align: center;
            margin-top: 140px;
            margin-bottom: 70px;
            input {
              width: 250px;
            }
            .remove-input {
              position: relative;
              display: inline-block;
              border-radius: 3px;
              margin-left: -7px;
              height: 28px;
              vertical-align: top;
              background: linear-gradient(to bottom, #f46554, #ea533f);
              > img {
                height: 27px;
              }
              .search {
                cursor: pointer;
                display: inline-block;
                width: 35px;
                &:active {
                  background: linear-gradient(to bottom, #ea533f, #f46544);
                  border-radius: 3px 0 0 3px;
                }
                img {
                  margin-left: 5px;
                  margin-top: 2px;
                }
              }
              .select {
                cursor: pointer;
                display: inline-block;
                width: 24px;
                height: 24px;
                &:active {
                  background: linear-gradient(to bottom, #ea533f, #f46544);
                  border-radius: 0 3px 3px 0;
                }
                img {
                  margin-right: 5px;
                }
              }
              .select-div {
                position: absolute;
                width: 100px;
                img {
                  position: absolute;
                  right: 37px;
                  z-index: 10;
                }
                ul {
                  position: absolute;
                  top: 8px;
                  width: 100px;
                  /*height: 77px;*/
                  height: 52px;
                  li {
                    height: 25px;
                  }
                }
              }
            }
          }
          .topRow {
            margin: 50px 0 40px 0;
            img {
              float: left;
              margin-right: 20px;
              cursor: pointer;
            }
            .right {
              float: left;
              cursor: pointer;
              .right-title {
                font-weight: bold;
                margin: 5px 0 8px 0;
              }
              .remark {
                max-width: 210px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }


</style>
