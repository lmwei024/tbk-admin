<template>
  <div class="promotion-groupbuydetail-view">
    <div class="crumbsT shadow">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>促销管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/sales-promotion/groupbuy-manage' }">
          团购管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>团购管理详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="$router.go(-1)"><i class="el-icon-arrow-left"></i>返回</el-button>
    </div>
    <el-row>
      <el-col :span="24" class="shadow" style="padding: 20px;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="团购名称：">
            <el-input v-model="ruleForm.activityName" style="width: 80%"></el-input>
            <label class="ui-msg-base">只在后台展示，便于区分</label>
          </el-form-item>
          <el-form-item label="团购时间：">
            <el-date-picker
              v-model="date"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :picker-options="pickerOptions1">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="顶部图片：">
            <ossupload @url="handleGetHeadUrl" :imageValue='false' :fileListUrls='headImage' @deleteUrl="DeleteHeadImage"/>
          </el-form-item>
          <el-tag type="warning" style="margin-left:120px;margin-bottom:10px">
            图标尺寸比例建议：750px*318px，大小不能超过 1000 KB，图片只能为 jpg、png、gif 格式
          </el-tag>
          <el-form-item label="背景颜色 ：" prop="activityColor">
            <el-input v-model="ruleForm.activityColor" style="width: 28%"></el-input>
            <label class="ui-msg-base">填入色值如：7B56F3，F78624</label>
          </el-form-item>
          <el-form-item label="分享图片：">
            <ossupload @url="handleGetUrl" :imageValue='false' :fileListUrls='imgGather' @deleteUrl="DeleteImgGather"/>
          </el-form-item>
          <el-tag type="warning" style="margin-left:120px;margin-bottom:10px">
            图标尺寸比例建议：500px*400px，大小不能超过 1000 KB，图片只能为 jpg、png、gif 格式
          </el-tag>
          <el-form-item label="团购说明：">
            <el-input type="textarea" v-model="ruleForm.activityExplain"></el-input>
          </el-form-item>
          <el-form-item label="关联商品：" class="setGift">
            <el-row>
              <el-col style="position: relative;">
                <el-tabs type="border-card" v-model="editableTabsValue">
                  <el-tab-pane
                    label="0"
                  >
                    <div slot="label">商品列表</div>
                    <el-table
                      :border="true"
                      ref="multipleTable"
                      :data="ruleForm.spuList"
                      align="center"
                      stripe
                      style="width: 100%">
                      <el-table-column type="expand">
                        <template slot-scope="props">
                          <div style="margin-right:-50px;margin-top:-20px; margin-bottom:-21px;">
                            <el-table :data="props.row.skuList" style="width: 100%" :show-header="false">
                              <el-table-column label="商品编码" width="180"  align="left">
                                <template slot-scope="props">
                                  -
                                </template>
                              </el-table-column>
                              <el-table-column label="商品名称" width="180" prop="title" align="left">
                                <template slot-scope="props">
                                  -
                                </template>
                              </el-table-column>
                              <el-table-column label="Sku编码" prop="id" align="center">
                              </el-table-column>
                              <el-table-column label="规格" prop="goodsSkuItemNames"  align="center">
                              </el-table-column>
                              <el-table-column label="市场价" prop="marketPrice"  align="center">
                              </el-table-column>
                              <el-table-column label="赚" prop="zhuan"  align="center">
                              </el-table-column>
                              <el-table-column label="pv" prop="pv" align="center">
                              </el-table-column>
                              <el-table-column label="仓库库存" prop="onSalesNo" align="center">
                              </el-table-column>
                              <el-table-column label="限购数量"  align="center">
                                <template slot-scope="scope">
                                  -
                                </template>
                              </el-table-column>
                              <el-table-column v-for="item in tableProperties"
                                               :key="item.label"
                                               :prop="item.props"
                                               :label="item.label">
                                <template slot-scope="scope">
                                  <el-input size="small" v-model="scope.row[item.props]"></el-input>
                                </template>
                              </el-table-column>
                              <el-table-column label="操作" align="center" width="79" class-name="rowClass1">
                                <template slot-scope="scope">
                                  <el-button type="text" style="color:#f56c6c" @click.native.prevent="handdeles(props.$index, scope.$index)">删除</el-button>
                                  <el-button type="text" v-if="false" style="color:#67C23A" @click.native.prevent="handleModifyStock(scope.row)">修改库存</el-button>
                                </template>
                              </el-table-column>
                            </el-table>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="商品编码" prop="id"  width="180" align="left">
                      </el-table-column>
                      <el-table-column label="商品名称" prop="mainTitle" width="180" align="left">
                      </el-table-column>
                      <el-table-column label="Sku编码"  align="center">
                        <template slot-scope="scope">
                          -
                        </template>
                      </el-table-column>
                      <el-table-column label="规格" align="center">
                        <template slot-scope="scope">
                          -
                        </template>
                      </el-table-column>
                      <el-table-column label="市场价" align="center">
                        <template slot-scope="scope">
                          -
                        </template>
                      </el-table-column>
                      <el-table-column label="赚" align="center">
                        <template slot-scope="scope">
                          -
                        </template>
                      </el-table-column>
                      <el-table-column label="pv" align="center">
                        <template slot-scope="scope">
                          -
                        </template>
                      </el-table-column>
                      <el-table-column label="仓库库存" align="center">
                        <template slot-scope="scope">
                          -
                        </template>
                      </el-table-column>
                      <el-table-column label="限购数量" align="center" prop="limitNum">
                        <template slot-scope="scope">
                          <el-input v-model="scope.row.limitNum" @blur="inputChange(scope.$index, scope.row)"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column v-for="item in tableProperties"
                                       :key="item.label" :label="item.label" align="center">
                        <template slot-scope="scope">
                          -
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="操作"
                        width="80"
                        align="center" class-name="rowClass">
                        <template slot-scope="scope">
                          <el-button type="text" style="color:#409eff" @click.native.prevent="handdele1(scope.$index,scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
                <el-button style="position: absolute; right: 10px; top: 4px;" size="small" v-if="find != 'on'" @click="handleAddGiftDialog()">添加商品</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item class="rowImgclass" v-for="(item,index) in ruleForm.spuList" :key="item.mainTitle" v-if="item.mainTitle" :label="item.mainTitle+ '：'">
            <ossupload
              :imageValue="false"
              :fileListUrls="propertyFileList.slice(index,index+1)"
              @imageIndex="GetImageIndex(index)"
              @url="GetPropertyImageUrl"
              @deleteUrl="DeletePropertyImageUrl">
            </ossupload>
          </el-form-item>
          <el-tag type="warning" v-for="(item,index) in ruleForm.spuList" :key="index" v-if="item.mainTitle && index == 0" style="margin-left:120px;margin-bottom:20px">
            图标尺寸比例建议：710px*320px，大小不能超过 1000 KB，图片只能为 jpg、png、gif 格式
          </el-tag>
          <el-header height="40px" v-if="(auditStatus == 'nosub' || auditStatus == 'fail' || auditStatus == 'wait') && find == 'on'">
            审核意见
          </el-header>
          <el-form-item label="审核状态 ：" v-if="(auditStatus == 'nosub' || auditStatus == 'fail' || auditStatus == 'wait') && find == 'on'">
            <!--<span v-bind:class="{ 'danger-color': scope.row.status == 1 }">已通过</span>-->
            <b class="danger-color">{{ruleForm.flowStatusName}}</b>
          </el-form-item>
          <el-form-item label="审核意见 ：" v-if="auditStatus == 'fail' && ruleForm.failRemark && find == 'on'">
            {{ruleForm.failRemark}}
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-if="(auditStatus == 'nosub' || !auditStatus) && find != 'on'" @click="submitForm('ruleForm', 1)">保存</el-button>
            <el-button type="success" v-if="(auditStatus == 'nosub' || !auditStatus) && find != 'on'" @click="submitForm('ruleForm', 2)">提交审核</el-button>
            <el-button type="primary" v-if="auditStatus == 'fail' && find != 'on'" @click="submitForm('ruleForm', 1)">保存</el-button>
            <el-button type="success" v-if="auditStatus == 'fail' && find != 'on'" @click="submitForm('ruleForm', 2)">提交审核</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <!-- 添加关联商品弹窗 -->
    <el-dialog title="添加关联商品" :visible.sync="setGiftsData.visible" width="70%">
      <screen>
        <div slot="btnSlot" style="float:right">
          <el-button size="mini" @click="handleDialogResetForm()">重置</el-button>
          <el-button size="mini" type="primary" @click.native.prevent="handleAddGiftDialog()">查询</el-button>
        </div>
        <div slot="titleSlot">
          <el-form
            :model="setGiftsData.addForm"
            label-width="120px"
            class="clearfix"
          >
            <div class="screen-input">
              <el-form-item label="商品编码 ：">
                <el-input v-model="setGiftsData.addForm.spuId"></el-input>
              </el-form-item>
            </div>
            <div class="screen-input">
              <el-form-item label="商品标题 ：">
                <el-input  v-model="setGiftsData.addForm.mainTitle"></el-input>
              </el-form-item>
            </div>
            <div class="screen-input">
              <el-form-item label="商品状态 ：">
                <el-select v-model="setGiftsData.addForm.isOnShelf" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in optionsCategory"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="screen-input">
              <el-form-item label="所属品牌 ：">
                <el-input v-model="setGiftsData.addForm.cnName"></el-input>
              </el-form-item>
            </div>
            <div class="screen-input">
              <el-form-item label="类目标题 ：">
                <el-input v-model="setGiftsData.addForm.categoryName"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </screen>
      <el-table
        :border="true"
        :default-sort = "{prop: 'date', order: 'descending'}"
        ref="multipleTable"
        :data="setGiftsData.gridData"
        align="center"
        @selection-change="handleSelectSetGifts"
        style="width: 100%;margin-top: 20px;">
        <el-table-column
          type="selection"
          align="center">
        </el-table-column>
        <el-table-column
          align="center"
          prop="id"
          label="商品编码">
        </el-table-column>
        <el-table-column
          align="center"
          prop="mainTitle"
          label="商品标题">
        </el-table-column>
        <el-table-column
          align="center"
          prop="cnName"
          label="品牌名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="supplierName"
          label="供应商">
        </el-table-column>
        <el-table-column
          align="center"
          prop="categoryName"
          label="所属类目"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="商品状态">
          <template slot-scope="scope">{{ scope.row.isOnShelf | shelf() }}</template>
        </el-table-column>
      </el-table>
      <pagination
        :total='setGiftsData.totalCount'
        @introduce="handleCurrentChanges"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseSetGiftDialog">取 消</el-button>
        <el-button type="primary" @click="handleSubmitSetGifts">关联选中商品</el-button>
      </div>
    </el-dialog>

    <!--修改活动库存弹窗-->
    <el-dialog
      title="修改活动库存"
      :visible.sync="ModifyStockData.visible"
      width="30%">
      <el-form label-width="120px">
        <el-form-item label="类型：">
          <template>
            <el-radio v-model="ModifyStockData.addForm.type" label="out">出库</el-radio>
            <el-radio v-model="ModifyStockData.addForm.type" label="in">入库</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="现仓库库存">
          <el-input v-model="ModifyStockData.addForm.onSaleNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="现活动库存">
          <el-input v-model="ModifyStockData.addForm.accSaleNum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item :label="ModifyStockData.addForm.type == 'in' ? '入库数量': '出库数量'">
          <el-input v-model="ModifyStockData.addForm.count" @blur="inputCountChange(ModifyStockData.addForm.count)"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCloseModifyStockDialog">取 消</el-button>
        <el-button type="primary" @click="handleModifyStockConfirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import Ossupload from '@/components/ossupload';
import Screen from '@/components/screen';
import moment from 'moment';

export default {
  components: {
    Pagination,
    Ossupload,
    Screen,
  },
  data() {
    return {
      activeId: this.$route.query.id || '',
      date: [],
      find: '',
      copy: '',
      auditStatus: '', // wait等待审核，pass-审核通过，fail-审核失败, nosub未提交审核
      activityStatus: '', // 0表示未开始，1表示进行中，2表示结束，3表示定时任务关闭
      pickerOptions1: {
        disabledDate(time) {
          let _now = Date.now(),
            one = 1 * 24 * 60 * 60 * 1000,
            yesterday = _now - one;
          return time.getTime() < yesterday; // 开始时间大于当前时间
        },
      },
      levelValuesIds: [],
      levelValues: [
        {
          id: 1,
          label: '普通用户',
          disabled: true,
        },
      ],
      optionsCategory: [
        {
          value: '',
          label: '平台全部商品',
        },
        {
          value: 'T',
          label: '平台在售商品',
        },
        {
          value: 'F',
          label: '平台待售商品',
        },
      ],
      // 添加代理弹窗数据
      agentData: {
        visible: false,
        gridData: [],
        totalCount: 0,
        optionsSupplier: [],
        addForm: {
          userId: '',
          mbName: '',
          callTel: '',
        },
        arraySOutIds: [],
      },
      headImage: [], // 顶图存值
      imgGather: [], // 分享图存值
      agentList: [], // 指定代理-过渡
      ruleForm: {
        activityName: '',
        activityStart: '',
        activityEnd: '',
        headImage: '',
        activityColor: '',
        activityImage: '',
        userLevelType: 'all',
        levelValues: '', // 用户等级
        agentUsers: '', // 指定代理存值
        activityExplain: '',
        spuList: [],
      },
      rules: {
        activityName: [
          { required: true, message: '请输入团购名称', trigger: 'blur' },
          { max: 30, message: '长度最多30个字符', trigger: 'blur' }
        ],
        activityColor: [
          {
            required: true,
            message: '请输入背景色',
            trigger: 'blur',
          },
        ],
      },
      tableProperties: [],
      // 添加关联商品弹窗数据
      setGiftsData: {
        visible: false,
        gridData: [],
        arraySOutIds: [],
        totalCount: 0,
        optionsSupplier: [],
        addForm: {
          spuId: '',
          mainTitle: '',
          isOnShelf: '',
          cnName: '',
          categoryName: '',
          supplierType: 'agent',
          supplierId: localStorage.getItem("supplierId"),
        },
      },
      editableTabsValue: '0',
      tabIndex: 0,
      propertyFileList: [],
      imageUrlStringArray: [],
      imageIndex: 0,
      ModifyStockData: {
        visible: false,
        skuList: [],
        addForm: {
          detailId: '',
          type: 'in',
          onSaleNo: '',
          accSaleNum: '',
          count: '',
          skuId: '',
        },
      },
    };
  },
  // 过滤平台待售及在售状态
  filters: {
    shelf: (value) => {
      if (value === 'T') {
        value = '在售';
      } else if (value === 'F') {
        value = '待售';
      }
      return value;
    },
  },
  mounted() {
    this.GetGoodsDetail();
    this.tableProperties.push(
      { props: 'activityPrice', label: '团购价' },
      { props: 'activityProfit', label: '团长收益' },
      { props: 'activityPv', label: '团购PV' },
      { props: 'activityStock', label: '团购库存' },
      // { props: 'limitNum', label: '限购数量' },
    );
  },
  created() {
    // 查看详情的情况下
    if (this.$route.query.find) {
      this.find = 'on';
    }
    if (this.$route.query.copy) {
      this.copy = 'on';
      this.ruleForm.activityName = '';
    }
  },
  methods: {
    // 上传顶部图片
    handleGetHeadUrl(url) {
      this.ruleForm.headImage = url.data.picUrl;
    },
    // 删除图片
    DeleteHeadImage() {
      this.ruleForm.headImage = '';
    },
    // 上传分享图片
    handleGetUrl(url) {
      this.ruleForm.activityImage = url.data.picUrl;
    },
    // 删除图片
    DeleteImgGather() {
      this.ruleForm.activityImage = '';
    },
    // 编辑详情
    GetGoodsDetail() {
      if (this.$route.query.id) {
        const loading = this.$loading({
          lock: true,
          text: '拼命加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        this.ruleForm.id = this.$route.query.id;
        this.$http.get('/admin/Activity/groupDetail?id=' + this.ruleForm.id + '').then((response) => {
          this.ruleForm = response.data;
          switch (this.ruleForm.auditStatus) {
            case 'wait':
              this.ruleForm.flowStatusName = '等待平台审核';
              break;
            case 'pass':
              this.ruleForm.flowStatusName = '已通过';
              break;
            case 'fail':
              this.ruleForm.flowStatusName = '已拒绝';
              break;
            case 'nosub':
              this.ruleForm.flowStatusName = '未提交审核';
              break;
            default:
              break;
          }
          this.auditStatus = this.ruleForm.auditStatus;
          this.activityStatus = this.ruleForm.activityStatus;
          if (this.ruleForm.activityStart != undefined && this.ruleForm.activityStart != '' && this.ruleForm.activityStart != null) {
            this.ruleForm.activityStart = moment(this.ruleForm.activityStart * 1000).format('YYYY-MM-DD HH:mm:ss');
            this.ruleForm.activityEnd = moment(this.ruleForm.activityEnd * 1000).format('YYYY-MM-DD HH:mm:ss');
            this.date = this.ruleForm.activityStart + '_ ' + this.ruleForm.activityEnd;
            this.date = this.date.split('_');
          }
          if (response.data.headImage) {
            let headimg = {
              id: response.data.id,
              url: response.data.headImage,
            };
            this.headImage.push(headimg);
          }
          let img = {
            id: response.data.id,
            url: response.data.activityImage,
          };
          this.imgGather.push(img);
          if (this.ruleForm.userLevelType === 'level_user') {
            this.levelValuesIds = [];
            let ids = this.ruleForm.levelValues.split(',');
            this.levelValues.forEach((item) => {
              ids.forEach((item1) => {
                if (item.id == item1) {
                  this.levelValuesIds.push(item.label);
                }
              });
            });
          }
          if (this.ruleForm.userLevelType === 'agent_user') {
            this.agentList = [];
            this.ruleForm.memberList.forEach((item, v) => {
              const obj = {
                id: item.mbMbNo,
                mbName: item.mbName,
                callTel: item.MBCellTel,
              };
              this.agentList.push(obj);
            });
          }
          this.imageUrlStringArray = [];
          this.propertyFileList = [];
          this.ruleForm.spuList.forEach((item, v) => {
            item.id = item.spuId;
            item.supplierId = item.supplierLinkId;
            /* if (item.limitNum || item.limitNum  == 0) {
              item.limitNum = item.limitNum.toString();
            } */
            this.imageUrlStringArray.push(item.spuMainImage);
            for (let i = 0; i < item.skuList.length; i++) {
              item.skuList[i].id = item.skuList[i].skuId;
              item.skuList[i].goodsSkuItemNames = item.skuList[i].skuProperty;
              item.skuList[i].onSalesNo = item.skuList[i].stock.toString();
              item.skuList[i].activityStock = item.skuList[i].activityStock.toString();
            }
          });
          // console.log('imageUrlStringArray', this.imageUrlStringArray);
          this.imageUrlStringArray.forEach((item) => {
            const o = {};
            o.url = item;
            this.propertyFileList.push(Object.assign({}, o));
          });
          this.propertyFileList = [...new Set(this.propertyFileList)];
          // console.log('propertyFileList', this.propertyFileList);
          // this.ruleForm.ruleList = [];
          // console.log('detail', this.ruleForm);
          if (this.$route.query.copy) {
            this.ruleForm.activityName = '';
            this.ruleForm.activityStart = '';
            this.ruleForm.activityEnd = '';
            this.date = '';
            this.ruleForm.skuList = [];
          }
          loading.close();
        });
      }
    },
    // 切换操作清空
    TabgoodUse() {
      this.ruleForm.levelValues = '';
      this.ruleForm.agentUsers = '';
    },
    inputChange(index, item) {
      // console.log('inputChange', index, item.limitNum);
      if (item.limitNum == 0) {
        item.limitNum = '';
      }
    },
    // 添加关联商品弹窗
    handleAddGiftDialog(pageX) {
      const loading = this.$loading({
        lock: true,
        text: '拼命加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      });
      this.setGiftsData.addForm.page = {
        pageIndex: !pageX ? 1 : pageX,
        pageSize: 10,
      };
      this.setGiftsData.addForm.page = JSON.stringify(this.setGiftsData.addForm.page);
      this.setGiftsData.visible = true;
      this.$http.post('/admin/Activity/selectSpuList', this.setGiftsData.addForm).then((response) => {
        if (response.code !== 200) {
          this.$notify.error({
            title: '错误',
            message: response.msg,
          });
          return;
        }
        this.setGiftsData.totalCount = response.data.totalCount;
        this.setGiftsData.gridData = response.data.rows;
        this.setGiftsData.gridData.forEach((item) => {
          this.setGiftsData.optionsSupplier.forEach((item1) => {
            if (item.supplierId == item1.MB_MbNo) {
              item.supplierName = item1.shop_name;
            }
          });
        });
        this.setGiftsData.visible = true;
      });
      loading.close();
    },
    handleDialogResetForm() {
      this.setGiftsData.addForm.spuId = '';
      this.setGiftsData.addForm.mainTitle = '';
      this.setGiftsData.addForm.isOnShelf = '';
      this.setGiftsData.addForm.cnName = '';
      this.setGiftsData.addForm.categoryName = '';
    },
    // 查询调用分页-关联商品弹窗
    handleCurrentChanges(opt) {
      this.handleAddGiftDialog(opt.page);
    },
    handleSelectSetGifts(val) {
      this.setGiftsData.arraySOutIds = val;
      this.ruleForm.spuList.forEach((items) => {
        this.setGiftsData.arraySOutIds.forEach((item1, v) => {
          if (items.id == item1.id) {
            this.setGiftsData.arraySOutIds.splice(v, 1);
          }
        });
      });
    },
    // 添加关联商品保存
    handleSubmitSetGifts() {
      let obj = this.ruleForm.spuList.concat(this.setGiftsData.arraySOutIds);
      this.ruleForm.spuList = obj;
      for (var i = 0; i < this.ruleForm.spuList.length - 1; i++) {
        for (var j = 1; j < this.ruleForm.spuList.length; j++) {
          if (i != j) {
            if (this.ruleForm.spuList[i].id == this.ruleForm.spuList[j].id) {
              this.ruleForm.spuList.splice(j, 1);
            }
          }
        }
      }
      // console.log('关联商品', this.ruleForm.spuList);
      this.setGiftsData.visible = false;
    },
    // 添加关联商品关闭
    handleCloseSetGiftDialog() {
      this.setGiftsData.visible = false;
    },
    // 删除spu商品
    handdele1(v, k) {
      this.ruleForm.spuList.splice(v, 1);
      // console.log(this.ruleForm.spuList);
      this.propertyFileList.splice(v, 1);
      // console.log('handdele1-propertyFileList', this.propertyFileList);
    },
    // 删除关联单个sku商品
    handdeles(b, c) {
      this.ruleForm.spuList[b].skuList.splice(c, 1);
      if (this.ruleForm.spuList[b].skuList.length == 0) {
        this.ruleForm.spuList.splice(b, 1);
        this.propertyFileList.splice(b, 1);
      }
    },
    GetPropertyImageUrl(result) {
      const url = result.data.picUrl;
      const o = {};
      o.url = url;
      this.propertyFileList.splice(this.imageIndex, 1, Object.assign({}, o));
      this.ruleForm.spuList[this.imageIndex].spuMainImage = url;
      // console.log('GetPropertyImageUrl', this.propertyFileList);
    },
    GetImageIndex(index) {
      this.imageIndex = index;
    },
    DeletePropertyImageUrl() {
      this.propertyFileList[this.imageIndex] = null;
      this.ruleForm.spuList[this.imageIndex].spuMainImage = null;
      this.$set(this.propertyFileList, this.propertyFileList);
      // this.imageUrlArray.splice(this.imageIndex, 1, {});
    },
    // 修改活动库存弹窗
    handleModifyStock(item) {
      this.ModifyStockData.addForm.detailId = item.detailId;
      this.ModifyStockData.addForm.onSaleNo = item.onSalesNo;
      this.ModifyStockData.addForm.accSaleNum = item.activityStock;
      this.ModifyStockData.addForm.skuId = item.skuId;
      this.ModifyStockData.addForm.count = '';
      this.ModifyStockData.skuList = item;
      this.ModifyStockData.visible = true;
    },
    // 修改活动库存弹窗关闭
    handleCloseModifyStockDialog() {
      this.ModifyStockData.visible = false;
    },
    // 修改活动库存弹窗保存
    handleModifyStockConfirm() {
      const params = {
        detailId: this.ModifyStockData.addForm.detailId,
        type: this.ModifyStockData.addForm.type,
        count: this.ModifyStockData.addForm.count * 1,
        skuId: this.ModifyStockData.addForm.skuId,
      };
      if (!this.ModifyStockData.addForm.count) {
        this.$message.error('数量不能为空');
        return;
      }
      this.$http.post('/admin/Activity/updateActivitySkuStock', params).then((response) => {
        if (response.code !== 200) {
          this.$notify.error({
            title: '错误',
            message: response.msg,
          });
          return;
        }
        this.$message({
          message: '修改活动库存成功',
          type: 'success',
        });
        this.headImage = [];
        this.imgGather = [];
        this.GetGoodsDetail();
        // this.ModifyStockData.skuList.activityStock = params.count;
        this.ModifyStockData.visible = false;
      });
    },
    //
    inputCountChange(item) {
      // console.log('inputCountChange', item);
      if (item == 0) {
        this.ModifyStockData.addForm.count = '';
      }
    },
    // 弹窗error
    tcshow(v) {
      this.$notify.error({
        title: '请填写团购活动' + v,
        message: '您未填写团购活动' + v,
      });
    },
    // 提交
    submitForm(formName, type) {
      // console.log('submit-Start', this.ruleForm, type);
      if (this.ruleForm.activityName == '' || this.ruleForm.activityName == null || this.ruleForm.activityName == undefined) {
        this.tcshow('名称');
        return;
      } else if (this.date == '' || this.date == null || this.date == undefined) {
        this.tcshow('时间');
        return;
      } else if (this.ruleForm.headImage == '' || this.ruleForm.headImage == null || this.ruleForm.headImage == undefined) {
        this.tcshow('顶部图片');
        return;
      } else if (this.ruleForm.activityImage == '' || this.ruleForm.activityImage == null || this.ruleForm.activityImage == undefined) {
        this.tcshow('分享图片');
        return;
      }
      if (this.ruleForm.activityExplain == '') {
        this.tcshow('说明');
        return;
      } else if (this.ruleForm.spuList.length == 0) {
        this.tcshow('关联商品信息');
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (this.copy) {
          delete this.ruleForm.id;
        }
        if (valid) {
          this.ruleForm.submitType = type;
          this.ruleForm.activityStart = this.date[0];
          this.ruleForm.activityEnd = this.date[1];
          this.ruleForm.supplierId = localStorage.getItem("supplierId");
          this.ruleForm.supplierType = 'agent';
          this.ruleForm.spuList.forEach((item, v) => {
            // obj.spuMainTitle = item.mainTitle;
            item.spuId = item.id;
            item.limitNum = item.limitNum * 1;
            if (!item.limitNum) {
              delete item.limitNum;
            }
            // obj.spuMainImage = item.spuMainImage;
            // obj.isOnShelf = item.isOnShelf;
            item.supplierLinkId = item.supplierId;
            for (let j = 0; j < item.skuList.length; j++) {
              item.skuList[j].skuId = item.skuList[j].id;
              item.skuList[j].skuProperty = item.skuList[j].goodsSkuItemNames;
              item.skuList[j].stock = item.skuList[j].onSalesNo;
              item.skuList[j].activityPrice = item.skuList[j].activityPrice || '';
              item.skuList[j].activityProfit = item.skuList[j].activityProfit || '';
              item.skuList[j].activityPv = item.skuList[j].activityPv || '';
              item.skuList[j].activityStock = item.skuList[j].activityStock || '';
            }
          });
          // console.log('submit-end', this.ruleForm);
          let isVaild = true;
          this.ruleForm.spuList.forEach((item, v) => {
            if (!item.spuMainImage) {
              this.$message.error('关联商品长图不能为空');
              return isVaild = false;
            }
            item.skuList.forEach(item2 => {
              if (item2.activityPrice == '') {
                this.$message.error('关联商品中团购价不能为空');
                return isVaild = false;
              } else if (item2.activityProfit == '') {
                this.$message.error('关联商品中团长收益不能为空');
                return isVaild = false;
              } else if (item2.activityPv == '') {
                this.$message.error('关联商品中团购PV不能为空');
                return isVaild = false;
              } else if (item2.activityStock == '') {
                this.$message.error('关联商品中团购库存不能为空');
                return isVaild = false;
              }
            });
          });
          if (isVaild && this.ruleForm.submitType == 2) {
            this.$confirm(`您正在提交审核团购活动，请您谨慎操作！`, '提交审核', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              this.$http.post('/admin/Activity/editGroup', this.ruleForm).then((res) => {
                if (res.code !== 200) {
                  this.$notify.error({
                    title: '错误',
                    message: res.msg,
                  });
                  return;
                }
                this.$router.push('./groupbuy-manage');
              });
            }).catch(() => {
              this.$notify.error({
                title: '取消提交',
                message: '您未成功提交团购管理活动。',
              });
            });
          } else if(isVaild) {
            this.$http.post('/admin/Activity/editGroup', this.ruleForm).then((res) => {
              if (res.code !== 200) {
                this.$notify.error({
                  title: '错误',
                  message: res.msg,
                });
                return;
              }
              this.$router.push('./groupbuy-manage');
            });
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  background-color: white;
  margin-bottom: 12px;
  background-color:rgba(243, 243, 243, 1);
  border: 1px solid rgba(228, 228, 228, 1);
}
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
  border-bottom: solid 1px #eee;

  .btn-list-txt {
    float: left;
    margin-top: 5px;
  }

  button {
    float: right;
    margin: 0 5px;
    &.el-button--medium{
      float: left;
    }
  }
}
.demo-ruleForm{
  .el-form-item{
    .ui-msg-base{
      padding-left: 10px;
      color: #999;
      word-break: break-all;
    }
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
<style lang="scss">
.promotion-groupbuydetail-view{
  .rowClass{
    .cell{
      padding: 0;
    }
  }
  .rowImgclass{
    .el-form-item__label{
      line-height: 26px;
    }
  }
  .el-table--enable-row-transition{
    .el-table__body{
      td.rowClass1{
        .cell{
          padding: 0;
        }
      }
    }
  }
}
</style>
