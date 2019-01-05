<template>
  <div class="content">
    <div class="content-n">
      <div class="charts">
        <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
        <el-button type="success" @click="handleHq">获取数据</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    handleHq() {
      this.$http.get('/admin/goods/index').then((data) => {
        console.log(data);
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('myChart'));
      // 绘制图表
      myChart.setOption({
        title: { text: 'echarts' },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '衬衫', '衬衫'],
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36],
        }],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  margin: 20px;
  box-shadow: 0 0 10px #ccc;
  position: relative;
  width: auto;

  .content-n {
    width: 100%;
  }

  i {
    display: block;
    width: 33px;
    height: 33px;
    background-color: red;
    position: absolute;
    left: -33px;
    top: 0;
  }
}
</style>

