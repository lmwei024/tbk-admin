<template>
  <div class="pagination" v-if="total !== 0">
    <el-pagination
      @current-change="handleSizeChange"
      :current-page="currentPage"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pager',
  data() {
    return {
      currentPage: this.$route.query.page ? Number(this.$route.query.page) : 1,
    };
  },
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          page: val,
        },
      });
      this.$emit('introduce', {
        page: val,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  text-align: center;
  padding-top: 10px;
}
</style>

