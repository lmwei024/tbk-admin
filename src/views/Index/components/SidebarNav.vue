<template>
  <div class="sidebar" :style="{ 'height': nav.height }">
    <el-menu
      default-active="index"
      class="el-menu-vertical-demo"
      :collapse="nav.isCollapse"
      :unique-opened="true"
    >
      <el-submenu index="0">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/login">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四111</span>
      </el-menu-item>
    </el-menu>
    <div class="tab" @click="handleTab" :class="{ 'act': nav.classAct }">
      <i :class="{ 'el-icon-d-arrow-left': !nav.classAct, 'el-icon-d-arrow-right': nav.classAct }">
      </i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#8bff36',
      nav: {
        isCollapse: false,
        classAct: false,
        height: '',
      },
    };
  },
  mounted() {
    this.handleHeight();
  },
  methods: {
    handleHeight() {
      const h = `${document.body.offsetHeight}px`;
      this.nav.height = h;
    },
    handleTab() {
      this.nav.isCollapse = !this.nav.isCollapse;
      this.nav.classAct = !this.nav.classAct;
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  // flex: 0 0 200px;
  position: relative;
  border-right: 1px #333;

  .tab {
    width: 22px;
    height: 22px;
    position: absolute;
    top: 40%;
    right: -18px;
    cursor: pointer;
    transition: right .5s;

    i {
      font-size: 24px;
    }
  }

  .act {
    right: -18px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
</style>

