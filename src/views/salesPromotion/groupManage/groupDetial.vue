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
           <el-form-item label="选择商品">
             <el-button v-if="table.length === 0"
             @click="openProduct()">添加商品</el-button>
             <el-row v-if="table.length>0">
               <el-col :span="12">
                 <el-col :span="6">
                   <img :src="this.multipleSelection.mainImage" alt=""
                  style="display: block;width: 100%">
                 </el-col>
                 <el-col :span="18">
                   <p>商品名称：{{this.multipleSelection.mainTitle}}</p>
                   <p>商品编码：{{this.multipleSelection.id}}</p>
                 </el-col>
               </el-col>
             </el-row>
           </el-form-item>
           <el-form-item label="活动名称">
             <el-input v-model="data.activityName"></el-input>
           </el-form-item>
           <el-form-item label="活动时间">
            <el-date-picker
              type="datetime"
              v-model="data.startTime"
              placeholder="选择日期时间">
            </el-date-picker>
            值
            <el-date-picker
              type="datetime"
              v-model="data.endTime"
              placeholder="选择日期时间">
            </el-date-picker>
           </el-form-item>
           <el-form-item label="参团人数">
             <el-input v-model="data.maxJoinNum"></el-input>
           </el-form-item>
           <el-form-item label="开团上限">
             <el-input v-model="data.maxGroupNum"></el-input>
           </el-form-item>
           <el-form-item label="商品限购">
             <el-input style="width: 20%"
             v-model="data.buyLimit" size="mini"></el-input>件/人
           </el-form-item>
           <el-form-item label="优惠设置">
             <el-table :data="table">
               <el-table-column label="SKU编码">
                 <template slot-scope="scope">
                   <span>{{scope.row.skuId}}</span>
                 </template>
               </el-table-column>
               <el-table-column label="成本价(元)">
                 <template slot-scope="scope">
                   <span>{{scope.row.cost}}</span>
                 </template>
               </el-table-column>
               <el-table-column label="市场价(元)">
                 <template slot-scope="scope">
                   <span>{{scope.row.marketPrice}}</span>
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
                   <span>{{scope.row.totalStock}}</span>
                 </template>
               </el-table-column>
               <el-table-column label="拼团价(元)">
                 <template slot-scope="scope">
                   <el-input v-model="scope.row.groupPrice"></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="有效业绩(元)">
                 <template slot-scope="scope">
                   <el-input v-model="scope.row.profit"></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="活动出厂价(元)">
                 <template slot-scope="scope">
                   <el-input v-model="scope.row.activitySupplyPrice"></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="活动PV值">
                 <template slot-scope="scope">
                   <el-input v-model="scope.row.promotionPV"></el-input>
                 </template>
               </el-table-column>
               <el-table-column label="活动库存">
                 <template slot-scope="scope">
                   <el-input v-model="scope.row.stock"></el-input>
                 </template>
               </el-table-column>
             </el-table>
           </el-form-item>
           <el-form-item label="活动说明">
             <el-input type="textarea" v-model="data.activityDesc"></el-input>
           </el-form-item>
        </el-form>
      </el-col>
      <el-col>
        <el-button type="primary" v-if="!this.id" @click="addGroup()">保存</el-button>
        <el-button size="mini" type="primary" v-if="this.id" @click="updateData()">修改</el-button>
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
            <el-form-item label="商品编码(spu)：" >
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
        <el-table :data="product" border ref="singleTable"
        highlight-current-row
        @current-change="handleSelectionChange">
          <el-table-column label="商品编码">
            <template slot-scope="scope">
              <span>{{scope.row.id}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品标题">
            <template slot-scope="scope">
              <span>{{scope.row.mainTitle}}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属类目">
            <template slot-scope="scope">
              <span>{{scope.row.categoryPath}}</span>
            </template>
          </el-table-column>
          <el-table-column label="商品状态">
            <template slot-scope="scope">
              <span>{{scope.row.statusName}}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="productData.page.pageSize"
          layout="total, prev, pager, next"
          :total="totalCount">
        </el-pagination>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
        <el-button @click="addProdctDialog = false" type="primary">取 消</el-button>
        <el-button  type="primary" @click="confirmProduct()" >确定</el-button>
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
      data: {
        itemId: '', // 商品id
        activityName: '', // 活动名称
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        maxJoinNum: 0, // 几人团
        maxGroupNum: 0, // 开团上限
        shopId: '234', // 店铺id
        buyLimit: 0, // 买家限购数量
        activityDesc: '', // 活动描述
        activityId: 1, // 活动i d  默认传1好了
        buyerLimitInGroupon: 1, // 可不传可以默认传1
        status: 1, // 状态
        skuPromotions: [
          {
            skuId: '', // skuid
            groupPrice: '', // 团购价
            promotionPV: '', // 活动pv
            stock: '', // 活动库存
            profit: '', // 活动收益
            activitySupplyPrice: '', // 活动供货价
          },
        ],
      },
      addProdctDialog: false,
      table: [],
      productData: {
        page: '',
        pageIndex: 1,
        pageSize: 10,
      },
      totalCount: 0,
      product: [],
      currentPage: 1,
      multipleSelection: [],
    };
  },
  created() {
    this.id = this.$route.query.id;
    if (this.id) {
      this.getDetial();
    }
    this.getProductList();
  },
  methods: {
    updateData() {
      this.data.startTime = moment(this.data.startTime).format('YYYY-MM-DD HH:mm:ss');
      this.data.endTime = moment(this.data.endTime).format('YYYY-MM-DD HH:mm:ss');
      this.data.skuPromotions = JSON.stringify(this.data.skuPromotions);
      console.log(this.data);
      this.$http.post('/admin/Pintuan/updateGroupItem', this.data).then((res) => {
        if (res.code === 200) {
          this.$notify({
            title: '编辑成功',
            message: '您已成功编辑拼团。',
            type: 'success',
          });
          this.$router.push({ path: '/sales-promotion/group-manage' });
        } else {
          console.log(res);
        }
      });
    },
    getDetial() {
      const params = {
        promotionId: this.id,
        pageVo: {
          pageSize: 1,
          pageIndex: 1,
        },
      };
      this.$http.get('/admin/Pintuan/queryGroupItemsByCondition', { params }).then((res) => {
        if (res.code === 200) {
          this.data.id = res.data[0].id;
          this.data.startTime = moment(res.data[0].startTime).format('YYYY-MM-DD HH:mm:ss');
          this.data.endTime = moment(res.data[0].endTime).format('YYYY-MM-DD HH:mm:ss');
          this.data.itemId = res.data[0].itemId;
          this.data.activityName = res.data[0].activityName;
          this.data.maxJoinNum = res.data[0].maxJoinNum;
          this.data.maxGroupNum = res.data[0].maxGroupNum;
          this.data.shopId = res.data[0].shopId;
          this.data.buyLimit = res.data[0].buyLimit;
          this.data.activityDesc = res.data[0].activityDesc;
          this.data.status = res.data[0].status;
          this.data.skuPromotions[0].skuId = res.data[0].skuPromotions[0].skuId;
          this.data.skuPromotions[0].groupPrice = res.data[0].skuPromotions[0].groupPrice;
          this.data.skuPromotions[0].promotionPV = res.data[0].skuPromotions[0].promotionPV;
          this.data.skuPromotions[0].stock = res.data[0].skuPromotions[0].stock;
          this.data.skuPromotions[0].profit = res.data[0].skuPromotions[0].profit;
          this.data.skuPromotions[0].activitySupplyPrice
          = res.data[0].skuPromotions[0].activitySupplyPrice;
          this.product.push(res.data[0].skuPromotions[0]);
        }
      });
    },
    openProduct() {
      this.addProdctDialog = true;
    },
    confirmProduct() {
      const data = {
        spuIds: this.multipleSelection.id,
      };
      this.$http.post('/admin/goods/listSkuId', data).then((res) => {
        if (res.code === 200) {
          this.table = res.data[0].skuIDVos;
          this.addProdctDialog = false;
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    openAdd() {
      this.addProdctDialog = true;
    },
    addGroup() {
      this.data.startTime = moment(this.data.startTime).format('YYYY-MM-DD HH:mm:ss');
      this.data.endTime = moment(this.data.endTime).format('YYYY-MM-DD HH:mm:ss');
      this.data.skuPromotions = this.table;
      this.data.itemId = this.multipleSelection.id;
      this.data.skuPromotions = JSON.stringify(this.data.skuPromotions);
      this.$http.post('/admin/Pintuan/addGroupItem', this.data).then((res) => {
        if (res.code === 200) {
          this.$notify({
            title: '添加成功',
            message: '您已成功添加拼团。',
            type: 'success',
          });
          this.$router.push({ path: '/sales-promotion/group-manage' });
        } else {
          console.log(res);
        }
      });
    },
    handleCurrentChange(val) {
      this.productData.pageIndex = val;
      this.getProductList();
    },
    getProductList() {
      this.productData.page = '{"pageIndex":' + this.productData.pageIndex + ',"pageSize":10}';
      this.$http.post('/admin/goods/queryList', this.productData).then((res) => {
        const data = res.data.data;
        data.forEach((item) => {
          if (item.shelfStatus === 'T') {
            item.statusName = '在售';
          } else {
            item.statusName = '停售';
          }
        });
        this.totalCount = res.data.totalCount;
        this.currentPage = res.data.pageIndex;
        this.product = data;
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
</style>
