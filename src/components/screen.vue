<template>
  <div class="query shadow">
    <div class="head clearfix">
      <span>筛选查询</span>
      <div class="screen">
        <div class="screenSx" @click="screen = !screen">
          <i :class="screen ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
          <label>收起筛选</label>
        </div>
        <slot name="btnSlot"></slot>
      </div>
    </div>
    <el-collapse-transition>
      <div class="screen-con clearfix" v-if="screen">
        <slot name="titleSlot">
        </slot>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      screen: true,
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.query {
  border-bottom: solid 1px #eee;

  .head {
    padding: 8px;
    border-bottom: solid 1px #eee;

    span {
      padding-left: 15px;
      line-height: 28px;
    }

    .screen {
      float: right;

      .screenSx {
        float: left;
        padding-right: 20px;
        padding-top: 4px;
        cursor: pointer;

        label {
          cursor: pointer;
        }
      }
    }
  }
}

.screen-con {
  padding: 10px;
}
</style>
