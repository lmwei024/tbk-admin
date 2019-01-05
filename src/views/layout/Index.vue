<template>
  <div>
    <head-nav />
    <div class="main">
      <div v-if="$route.name !== 'home'">
        <sidebar-nav />
      </div>
      <div class="content-main shadow">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import HeadNav from '@/views/layout/components/HeadNav';
import SidebarNav from '@/views/layout/components/SidebarNav';

export default {
  name: 'layout',
  components: {
    HeadNav,
    SidebarNav,
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  display: flex;
  padding-top: 60px;

  .content-main{
    overflow-x: auto;
    float:left;
    width:100%;
    padding: 20px;
    margin: 20px;
    padding-left: 30px;
    // padding-top:60px;
  }
}
</style>

