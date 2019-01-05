<template>
  <div>
    <div class="crumbsT shadow">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">促销管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">拼团管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary"><i class="el-icon-refresh"></i>刷新</el-button>
    </div>
    <screen>
      <div slot="btnSlot" style="float:right">
        <el-button size="mini" @click="handleResetForm()">重置</el-button>
        <el-button size="mini" type="primary" @click="getList()">查询</el-button>
      </div>
      <div slot="titleSlot">
        <el-form class="clearfix">
          <div class="screen-input">
            <el-form-item label="活动名称 ：" >
              <el-input v-model="condition.activityName"></el-input>
            </el-form-item>
          </div>
          <div class="screen-input">
            <el-form-item label="商品编码 ：" >
              <el-input v-model="condition.itemId"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </screen>
    <el-row style="margin-top: 30px;">
      <el-col :span="22">
        <el-tabs  type="card" value="undo">
          <el-tab-pane label="未开始" name="undo" @click="changeType(0)"></el-tab-pane>
          <el-tab-pane label="进行中" name="ongoing" @click="changeType(1)"></el-tab-pane>
          <el-tab-pane label="已结束" name="end" @click="changeType(2)"></el-tab-pane>
          </el-tabs>
      </el-col>
      <el-col :span="2">
        <el-button style="float: right;" @click="linkToDetial(0)">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table v-model="table" :border="true" :data="table">
            <el-table-column label="活动名称">
                <template slot-scope="scope">
                    <span>{{scope.row.activityName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="活动时间">
                <template slot-scope="scope">
                    <span>{{scope.row.startTime}}-{{scope.row.endTime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="参团人数">
                <template slot-scope="scope">
                    <span>{{scope.row.maxGroupNum}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品限购(件/人)">
                <template slot-scope="scope">
                    <span>{{scope.row.buyLimit}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品编码">
                <template slot-scope="scope">
                    <span >{{scope.row.itemId}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button type='text'
                    @click="linkToDetial(scope.row.id)">详情</el-button>
                    <el-button type='text'>编辑</el-button>
                    <el-button type='text'
                    @click.native="showOverDialog(scope.row.id)">结束</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="condition.pageVo.pageSize"
          layout="total, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="overDialog">
      <span>您正在结束拼团活动【代入活动名称】，请您慎重操作！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="overDialog = false">取 消</el-button>
        <el-button type="primary" @click="deleteGroup()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination';
import Screen from '@/components/screen';
import moment from 'moment';

export default {
  components: {
    Pagination,
    Screen,
  },
  data() {
    return {
      id: '',
      currentPage: 1,
      totalCount: 0,
      overDialog: false,
      table: [],
      condition: {
        statusType: 0, // 0 未开始 1进行中 2已结束
        activityName: '',
        itemId: '',
        pageVo: {
          pageSize: 10,
          pageIndex: 1,
        },
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    changeType(type) {
      console.log(type);
      this.condition.statusType = type;
      this.getList();
    },
    deleteGroup() {
      const data = {
        promotionId: parseInt(this.id, 10),
      };
      console.log(data);
      this.$http.post('/admin/Pintuan/deleteGroupItem', data).then((res) => {
        if (res.code === 200) {
          this.$notify({
            title: '删除成功',
            message: '您已成功删除拼团。',
            type: 'success',
          });
        }
      });
    },
    linkToDetial(id) {
      if (id === 0) {
        this.$router.push({ path: '/sales-promotion/group-detial' });
      } else if (id !== 0) {
        this.$router.push({ path: '/sales-promotion/group-detial?id=' + id });
      }
    },
    handleCurrentChange(val) {
      this.condition.pageVo.pageIndex = val;
      this.getList();
    },
    getList() {
      const params = this.condition;
      this.$http.get('/admin/Pintuan/queryGroupItemsByCondition', { params }).then((res) => {
        if (res.code === 200) {
          res.data.forEach((item) => {
            item.startTime = moment(item.startTime).format('YYYY-MM-DD HH:mm:ss');
            item.endTime = moment(item.endTime).format('YYYY-MM-DD HH:mm:ss');
          });
          this.table = res.data;
        }
      });
    },
    showOverDialog(id) {
      this.overDialog = true;
      this.id = id;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleResetForm() {
      document.getElementById('myform').reset();
    },
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
