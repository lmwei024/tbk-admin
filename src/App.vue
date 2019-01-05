<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
.el-input__suffix {
  right: 12px;
}

.el-date-editor .el-range-separator {
  width: 8%;
}

.el-menu--collapse {
  overflow: hidden;
  width: 55px;
}

.el-menu--collapse {
  height: 100%;
}

.pswp__caption__center {
  text-align: center !important;
}
</style>
