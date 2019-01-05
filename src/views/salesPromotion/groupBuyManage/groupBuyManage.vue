<template>
  <div>
    <div class="crumbsT shadow">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>促销管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/sales-promotion/groupbuy-manage' }">团购管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <screen>
      <div slot="btnSlot" style="float:right">
        <el-button size="mini" @click="handleResetForm()">重置</el-button>
        <el-button size="mini" type="primary" @click="getList()">查询</el-button>
      </div>
      <div slot="titleSlot">
        <el-form class="clearfix" label-width="120px">
          <div class="screen-input">
            <el-form-item label="团购名称 ：" >
              <el-input v-model="condition.activityName"></el-input>
            </el-form-item>
          </div>
          <div class="screen-input">
            <el-form-item label="团购时间 ：">
              <el-date-picker
                @change="showDate()"
                type="datetimerange"
                v-model="date"
                range-separator="至" format="yyyy-MM-dd HH:mm:ss"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </screen>
    <el-row style="margin-top: 30px;">
      <el-col :span="22">
        <el-tabs value="7" type="card"  @tab-click="change">
          <el-tab-pane label="未提交" name="7"></el-tab-pane>
          <el-tab-pane label="待审核" name="1"></el-tab-pane>
          <el-tab-pane label="未开始" name="2"></el-tab-pane>
          <el-tab-pane label="进行中" name="3"></el-tab-pane>
          <el-tab-pane label="已结束" name="4"></el-tab-pane>
          <el-tab-pane label="已关闭" name="5"></el-tab-pane>
          <el-tab-pane label="审核拒绝" name="6"></el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="2">
        <el-button style="float: right;" @click="linkToDetial(0)">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table v-model="table" :border="true" :data="table">
          <el-table-column label="团购名称">
            <template slot-scope="scope">
              <span>{{scope.row.activityName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="团购说明">
            <template slot-scope="scope">
              <span>{{scope.row.activityExplain}}</span>
            </template>
          </el-table-column>
          <el-table-column label="团购时间">
            <template slot-scope="scope">
              <span>{{scope.row.activityStart}}--{{scope.row.activityEnd}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button style="display: none;" @click="copy(scope.row.id)" type='text'>复制</el-button>
              <el-button @click="linkToDetial(scope.row.id)" type='text'>查看详情</el-button>
              <el-button v-if="condition.auditType == '7' || condition.auditType == '6'" @click="edit(scope.row.id)" type='text'>编辑</el-button>
              <el-button v-if="condition.auditType == '7'" @click="audit(scope.row,scope.$index)" type='text'>提交审核</el-button>
              <el-button type='text' v-if="condition.auditType == '2' || condition.auditType == '3'" @click.native="showOverDialog(scope.row,scope.$index)">{{ condition.auditType == '2' ? '删除': '结束'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total='totalCount'
          @introduce="handleIntroducesef"
        />
      </el-col>
    </el-row>

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
      date: [],
      id: '',
      totalCount: 0,
      table: [],
      condition: {
        supplierType: 'agent',
        supplierId: localStorage.getItem("supplierId"),
        auditType: '7', // 1未审核，2审核未开始，3审核进行中，4审核已结束，5审核已关闭，6拒绝 7未提交审核
        activityName: '',
        activityStart: '',
        activityEnd: '',
        page: {
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
    showDate() {
      this.condition.activityStart = moment(this.date[0]).format('YYYY-MM-DD HH:mm:ss');
      this.condition.activityEnd = moment(this.date[1]).format('YYYY-MM-DD HH:mm:ss');
    },
    handleResetForm() {
      this.condition.activityName = '';
      this.condition.activityStart = '';
      this.condition.activityEnd = '';
      this.date = [];
      this.condition.page = '{"pageIndex":1,"pageSize":10}';
    },
    change(tab) {
      this.condition.auditType = parseInt(tab.name, 10);
      this.getList();
    },
    copy(id) {
      this.$router.push('./groupbuy-detail?id=' + id + '&copy=on');
    },
    linkToDetial(id) {
      if (id === 0) {
        this.$router.push({ path: './groupbuy-detail' });
      } else if (id !== 0) {
        this.$router.push('./groupbuy-detail?id=' + id + '&find=on');
      }
    },
    edit(v) {
      this.$router.push('./groupbuy-detail?id=' + v + '');
    },
    handleIntroducesef(opt) {
      this.getList(opt.page);
    },
    getList(page) {
      const params = {
        auditType: this.condition.auditType, // 1未审核，2审核未开始，3审核进行中，4审核已结束，5审核已关闭，6拒绝
        activityName: this.condition.activityName,
        activityStart: this.condition.activityStart,
        activityEnd: this.condition.activityEnd,
        supplierType: 'agent',
        supplierId: localStorage.getItem("supplierId"),
        page: {
          pageIndex: !page ? 1 : page,
          pageSize: 10,
        },
      };
      // params.page = JSON.stringify(params.page);
      this.$http.get('/admin/Activity/listGroupAudit', { params }).then((res) => {
        if (res.status !== 200) {
          this.$notify.error({
            title: '错误',
            message: res.msg,
          });
          return;
        }
        res.data.data.forEach((item) => {
          item.activityStart = moment(item.activityStart * 1000).format('YYYY-MM-DD HH:mm:ss');
          item.activityEnd = moment(item.activityEnd * 1000).format('YYYY-MM-DD HH:mm:ss');
        });
        this.table = res.data.data;
        this.totalCount = res.data.totalCount;
      });
    },
    audit(item, v) {
      this.$confirm(`您正在提交审核团购活动【${item.activityName}】，请您谨慎操作！`, '提交审核', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        const params = {
          activityId: item.id,
        };
        this.$http.post('/admin/Activity/subGroupAudit', params).then((res) => {
          if (res.status === 200) {
            this.$notify({
              title: '提交成功',
              message: '您已成功将所选团购管理活动提交审核。',
              type: 'success',
            });
            this.table.splice(v, 1);
          } else {
            this.$notify({
              title: '失败',
              message: res.msg,
              type: 'error',
            });
          }
        });
      }).catch(() => {
        this.$notify.error({
          title: '提交已取消',
          message: '您未成功提交所选团购管理活动。',
        });
      });
    },
    showOverDialog(item, v) {
      this.$confirm(`您正在结束团购管理活动【${item.activityName}】，请您谨慎操作！`, '结束优惠券', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        const params = {
          id: item.id,
        };
        this.$http.post('/admin/Activity/closeGroup', params).then((res) => {
          this.table.splice(v, 1);
        });
        this.$notify({
          title: '结束成功',
          message: '您已成功将所选团购管理活动结束。',
          type: 'success',
        });
      }).catch(() => {
        this.$notify.error({
          title: '结束失败',
          message: '您未成功结束所选团购管理活动。',
        });
      });
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
.serial{
  width: 34px;
  text-align: center;
  vertical-align: middle;
  color: #999;
  font-size: 16px;
}
</style>
