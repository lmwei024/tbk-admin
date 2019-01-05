<template>
   <div class="Tags" v-if="showTags">
       <ul>
           <li class="tags-li"
           v-for="(item,index) in tagsList" :key="index">
               <router-link :to="'/'" class="tags-li-title">
                    {{index}}:{{item}}
                </router-link>
                <span class="tags-li-icon" @click="closeTags(index)">
<i class="el-icon-close"></i></span>
           </li>
       </ul>
       <div class="tags-close-box">
            <el-dropdown>
                <el-button size="mini" type="primary">
                    标签选项<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu size="small" slot="dropdown">
                    <el-dropdown-item v-on:click.native="closeAll">关闭所有</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
   </div>
</template>
<script>
export default {
  data() {
    return {
      tagsList: ['首页', '首页2', '首页3'],
    };
  },
  methods: {
    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
    },
    // closeTags(index) {
    //   const delItem = this.tagsList.splice(index, 1)[0];
    //   const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
    //   if (item) {
    //     console.log(delItem);
    //   } else {
    //     this.$router.push('/');
    //   }
    // },
  },
  computed: {
    showTags() {
      return this.tagsList.length > 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.Tags{
    position:relative;
    height: 30px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    .tags-close-box {
        position: absolute;
        right: 0;
        top: 0;
        box-sizing: border-box;
        padding-top: 1px;
        text-align: center;
        width: 110px;
        height: 30px;
        background: #fff;
        box-shadow: -3px 0 15px 3px rgba(0, 0, 0, .1);
        z-index: 10;
    }
    .tags-li.active .tags-li-title {
        color: #fff;
    }
    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }
    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 23px;
        line-height: 23px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li:not(.active):hover {
        background: #f8f8f8;
    }

    .tags-li.active {
        color: #fff;
    }
    .tags ul {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
}
</style>

