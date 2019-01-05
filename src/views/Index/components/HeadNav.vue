<template>
  <div class="head">
    <div class="logo">logo系统名称</div>
    <div class="nav">
      <ul>
        <li class="act">首页</li>
        <li>首页</li>
        <li>首页</li>
        <li>首页</li>
        <li>首页</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'head-nav',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.head {
  height: 60px;
  background-color: #407ce7;

  .logo {
    width: 200px;
    text-align: center;
    float: left;
    color: #fff;
    font-size: 24px;
    line-height: 60px;
  }

  .nav {
    float: left;

    ul {
      font-size: 16px;

      li {
        float: left;
        line-height: 60px;
        color: #dcdcdc;
        padding: 0 20px;
        cursor: pointer;
      }

      .act {
        background-color: #2d57a1;
        color: #fff;
      }
    }
  }
}
</style>

