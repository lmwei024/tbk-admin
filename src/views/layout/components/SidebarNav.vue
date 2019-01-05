<template>
  <div class="sidebar" :style="{ 'height': nav.height }">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :router="true"
      :collapse="nav.isCollapse"
      :unique-opened='true'
    >
      <div class="navDiv" v-for="(item, index) in navList" :key="index">
        <el-submenu :index="index+''" v-if="item.children">
          <template slot="title">
            <i class="icon iconfont" :class="[item.icon_name]" style="font-size: 22px"></i>
            <span  v-if="iconfontShow">{{ item.privileges_name }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(child, childIndex) in item.children"
              :key="childIndex"
              :index="child.leading_url"
            >
              {{ child.privileges_name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item v-if="!item.children" :index="item.leading_url">
          <i class="el-icon-setting"></i>
          <span slot="title">{{ item.privileges_name }}</span>
        </el-menu-item>
      </div>
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
      iconfontShow:true,
      nav: {
        isCollapse: false,
        classAct: false,
        height: '',
        ceshi: '',
      },
      navList: JSON.parse(localStorage.getItem('sidebarNav')),
    };
  },
  mounted() {
    this.handleHeight();
  },
  watch: {
    $route(to, from) {
      if (to.name !== from.name) {
        this.navList = JSON.parse(localStorage.getItem('sidebarNav'));
      }
    },
  },
  methods: {
    handleHeight() {
      const h = `${document.body.offsetHeight}px`;
      this.nav.height = h;
    },
    handleTab() {
      this.iconfontShow = !this.iconfontShow
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
  top: 0;
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

