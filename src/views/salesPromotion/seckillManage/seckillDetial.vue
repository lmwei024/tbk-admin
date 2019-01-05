<template>
  <div>
    <div class="crumbsT shadow">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">促销管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">拼团管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">拼团详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary"><i class="el-icon-refresh"></i>刷新</el-button>
    </div>
    <el-row >
      <el-col :span="24" class="shadow" style="padding: 20px;">
        <el-form>
           <el-form-item label="选择商品"></el-form-item>
           <el-form-item label="活动名称">
             <el-input></el-input>
           </el-form-item>
           <el-form-item label="活动时间">
             <el-date-picker
               type="datetimerange"
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
               align="right">
              </el-date-picker>
           </el-form-item>
           <el-form-item label="参团人数">
             <el-input></el-input>
           </el-form-item>
           <el-form-item label="开团上限">
             <el-input></el-input>
           </el-form-item>
           <el-form-item label="活动对象">
             <el-radio>全部用户</el-radio>
             <el-radio>制定等级用户</el-radio>
           </el-form-item>
           <el-form-item label="商品限购">
             <el-radio>开启限购</el-radio>
             <el-input></el-input>件/人
           </el-form-item>
           <el-form-item label="优惠设置">
             <el-table :data="table">
               <el-table-column label="SKU编码">
                 <template slot-scope="scope">
                   <span>{{scope.row.sku}}</span>
                 </template>
               </el-table-column>
               <el-table-column label="成本价(元)">
                 <template slot-scope="scope">
                   <span>{{scope.row.cost}}</span>
                 </template>
               </el-table-column>
               <el-table-column label="市场价(元)">
                 <template slot-scope="scope">
                   <span>{{scope.row.market}}</span>
                 </template>
               </el-table-column>
               <el-table-column label="团队投入值">
                 <template slot-scope="scope">
                   <span>{{scope.row.group}}</span>
                 </template>
               </el-table-column>
               <el-table-column label="有效业绩(元)">
                 <template slot-scope="scope">
                   <span>{{scope.row.outstanding}}</span>
                 </template>
               </el-table-column>
               <el-table-column label="出厂价(元)">
                 <template slot-scope="scope">
                   <span>{{scope.row.exwPrice}}</span>
                 </template>
               </el-table-column>
               <el-table-column label="PV值">
                 <template slot-scope="scope">
                   <span>{{scope.row.pv}}</span>
                 </template>
               </el-table-column>
               <el-table-column label="仓库库存">
                 <template slot-scope="scope">
                   <span>{{scope.row.store}}</span>
                 </template>
               </el-table-column>
               <el-table-column label="拼团价(元)">
                 <template slot-scope="scope">
                   <el-input></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="有效业绩(元)">
                 <template slot-scope="scope">
                   <el-input></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="活动出厂价(元)">
                 <template slot-scope="scope">
                   <el-input></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="活动PV值">
                 <template slot-scope="scope">
                   <el-input></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="活动库存">
                 <template slot-scope="scope">
                   <el-input></el-input>
                 </template>
               </el-table-column>
             </el-table>
           </el-form-item>
           <el-form-item label="活动说明">
             <el-input type="textarea"></el-input>
           </el-form-item>
        </el-form>
      </el-col>
      <el-col>
        <el-button type="primary">保存</el-button>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="addProdctDialog" title="添加商品" width="80%">
      <screen>
      <div slot="btnSlot" style="float:right">
        <el-button size="mini" @click="handleResetForm()">重置</el-button>
        <el-button size="mini" type="primary" >查询</el-button>
      </div>
      <div slot="titleSlot">
        <el-form class="clearfix">
          <div class="screen-input">
            <el-form-item label="商品编码 ：" >
              <el-input ></el-input>
            </el-form-item>
          </div>
          <div class="screen-input">
            <el-form-item label="商品标题：" >
              <el-input ></el-input>
            </el-form-item>
          </div>
          <div class="screen-input">
            <el-form-item label="所属类目 ：" >
              <el-input ></el-input>
            </el-form-item>
          </div>
          <div class="screen-input">
            <el-form-item label="商品状态 ：">
            </el-form-item>
          </div>
        </el-form>
      </div>
    </screen>
    <el-row style="margin-top: 30px">
      <el-col :span='24'>
        <el-table>
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="商品编码"></el-table-column>
          <el-table-column label="商品标题"></el-table-column>
          <el-table-column label="所属类目"></el-table-column>
          <el-table-column label="商品状态"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    </el-dialog>
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
      addProdctDialog: false,
      table: [{
        sku: '1',
        cost: '1',
        market: '1',
        group: '1',
        outstanding: '1',
        exwPrice: '1',
        pv: '1',
        store: '1',
        groupPrice: '1',
        userOutstanding: '1',
        activeOutstanding: '1',
        activePv: '1',
        activeStore: '1',
      }],
    };
  },
  methods: {
    openAdd() {
      this.addProdctDialog = true;
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
