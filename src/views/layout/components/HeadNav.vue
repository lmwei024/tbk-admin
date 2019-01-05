<template>
  <div class="head">
    <div class="logo">淘宝客后台系统</div>
    <div class="nav">
      <ul>
        <li
        v-for="(item, index) in navList"
        :key="index"
        :class="{ 'act': act === item.id }"
        @click="handleNav(item, index)"
        >
        {{ item.privileges_name }}
      </li>
    </ul>
  </div>
  <div class="right">
    <el-dropdown>
      <span class="el-dropdown-link">
        欢迎您，{{ name }}
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native.prevent="handleQuit()">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  name: 'head-nav',
  data() {
    return {
      name: '',
      act: 0,
      navList: [{ privileges_name: '首页', leading_url: '/main/home', id: 0 }],
    };
  },
  mounted() {
    this.name = JSON.parse(localStorage.getItem('name'));
    const types = localStorage.getItem('types');
    const types2 = localStorage.getItem('types2');
    console.log(types, types2);
    if (types >= 1 && types <= 3 && types2 < 3) {
      this.navList = [
        {
          id: 0,
          privileges_name: '首页',
          is_menu: 1,
          rank_id: 1,
          parent_id: 0,
          leading_url: '/main/home',
        },
        {
          id: 143,
          privileges_name: '促销管理',
          is_menu: 1,
          rank_id: 1,
          parent_id: 0,
          leading_url: '/sales-promotion/groupbuy-manage',
        },
      ];
    }
    if (localStorage.getItem('navId')) {
      this.act = Number(localStorage.getItem('navId'));
    }
  },
  methods: {
    handleNav(item) {
      const itemv = item;
      if (!itemv.id) {
        itemv.id = 0;
      }
      this.act = item.id;
      if (this.act === 0) {
        localStorage.setItem('sidebarNav', '');
        this.$router.push({
          path: `${itemv.leading_url}`,
        });
      }
      if (this.act === 143) {
        const res = [
          {
            id: 249,
            privileges_name: '团购管理',
            is_menu: 1,
            rank_id: 2,
            parent_id: 143,
            leading_url: '/sales-promotion/groupbuy-manage',
            icon_name: 'icon-pintuanzhuanqu',
            children: [
              {
                id: 250,
                privileges_name: '团购列表',
                is_menu: 2,
                rank_id: 3,
                parent_id: 249,
                leading_url: '/sales-promotion/groupbuy-manage',
              },
            ],
          },
        ];
        localStorage.setItem('sidebarNav', JSON.stringify(res));
        this.$router.push({
          path: `${itemv.leading_url}`,
        });
      }
    },
    handleQuit() {
      localStorage.clear();
      Cookies.remove('Frontend-Token');
      Cookies.remove('PHPSESSID');
      this.$router.push('/login');
      this.$message({
        message: '退出成功~',
        type: 'success'
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  height: 60px;
  background-color: #407ce7;
  position: fixed;
  width: 100%;
  z-index: 1499;

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

        &:hover {
          color: #fff;
        }
      }

      .act {
        display: block;
        background-color: #2d57a1;
        color: #fff;
      }
    }
  }

  .right {
    float: right;

    .el-dropdown-link {
      padding: 20.5px;
      padding-right: 25px;
      color: #fff;
      display: block;
      cursor: pointer;
    }
  }
}
</style>

