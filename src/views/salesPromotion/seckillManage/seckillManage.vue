<template>
  <div>
    <div class="crumbsT shadow">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">促销管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">秒杀管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary"><i class="el-icon-refresh"></i>刷新</el-button>
    </div>
    <screen>
      <div slot="btnSlot" style="float:right">
        <el-button size="mini" @click="handleResetForm()">重置</el-button>
        <el-button size="mini" type="primary" >查询</el-button>
      </div>
      <div slot="titleSlot">
        <el-form class="clearfix">
          <div class="screen-input">
            <el-form-item label="活动名称 ：" >
              <el-input ></el-input>
            </el-form-item>
          </div>
          <div class="screen-input">
            <el-form-item label="商品编码：" >
              <el-input ></el-input>
            </el-form-item>
          </div>
          <div class="screen-input">
            <el-form-item label="商品名称 ：" >
              <el-input ></el-input>
            </el-form-item>
          </div>
          <div class="screen-input">
            <el-form-item label="活动时间 ：">
              <el-date-picker
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </screen>
    <el-row style="margin-top: 30px;">
      <el-col :span="24">
        <el-tabs  type="card" value="undo">
          <el-tab-pane label="未开始" name="undo"></el-tab-pane>
          <el-tab-pane label="进行中" name="ongoing"></el-tab-pane>
          <el-tab-pane label="已结束" name="end"></el-tab-pane>
          </el-tabs>
      </el-col>
    </el-row>
     <el-row>
      <el-col :span="24">
        <el-table v-model="table" :border="true" :data="table">
            <el-table-column label="活动名称">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="活动时间">
                <template slot-scope="scope">
                    <span>{{scope.row.time}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品限购(件/人)">
                <template slot-scope="scope">
                    <span>{{scope.row.productNumber}}</span>
                </template>
            </el-table-column>
            <el-table-column label="活动对象">
                <template slot-scope="scope">
                    <span>{{scope.row.object}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品编码">
                <template slot-scope="scope">
                    <span>{{scope.row.pruductCode}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品名称">
                <template slot-scope="scope">
                    <span>{{scope.row.count}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type='text'>详情</el-button>
                    <el-button type='text'>编辑</el-button>
                    <el-button type='text' @click.native="showOverDialog()">结束</el-button>
                </template>
            </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination';
import Screen from '@/components/screen';

export default {
  components: {
    Pagination,
    Screen,
  },
  data() {
    return {
      overDialog: false,
      table: [{
        name: '11',
        time: '11',
        count: '11',
        productNumber: '11',
        object: '11',
        pruductCode: '11',
        pruductName: '11',
      }],
    };
  },
};
</script>
<style lang="scss" scoped>
.crumbsT {
  padding: 20px;
  position: relative;
  margin-bottom: 20px;

  button {
    position: absolute;
    right: 10px;
    top: 8px;
    padding: 10px;

    i {
      padding-right: 5px;
    }
  }
}
.btn {
  width: 100%;
  padding: 16px 0;
  border-bottom: solid 1px #eee;

  .btn-list-txt {
    float: left;
    margin-top: 5px;
  }

  button {
    float: right;
    margin: 0 5px;
  }
}

.screen-input {
  // width: 300px;
  float: left;
  padding: 10px;

  .el-form-item {
    margin-bottom: 0;
  }

  .screen-mini {
    float: left;
    width: 42%;
  }
}
</style>
