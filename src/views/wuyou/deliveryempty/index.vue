<template>
  <div class="app-container">
    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>
      <el-form-item label="快递费" prop="delivery">
        <el-input v-model="queryParams.delivery" placeholder="请输入快递费" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-input v-model="queryParams.category" placeholder="请输入分类" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="price" prop="price">
        <el-input v-model="queryParams.price" placeholder="请输入price" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="一级分类" prop="mainCategory1">
        <el-input v-model="queryParams.mainCategory1" placeholder="请输入一级分类" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="二级分类" prop="mainCategory2">
        <el-input v-model="queryParams.mainCategory2" placeholder="请输入二级分类" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="三级分类" prop="mainCategory3">
        <el-input v-model="queryParams.mainCategory3" placeholder="请输入三级分类" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 操作工具栏 -->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="openForm(undefined)"
                   v-hasPermi="['wuyou:delivery-empty:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['wuyou:delivery-empty:export']">导出</el-button>
      </el-col>
              <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

            <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
            <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="快递费" align="center" prop="delivery" />
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="price" align="center" prop="price" />
      <el-table-column label="一级分类" align="center" prop="mainCategory1" />
      <el-table-column label="二级分类" align="center" prop="mainCategory2" />
      <el-table-column label="三级分类" align="center" prop="mainCategory3" />
      <el-table-column label="商品主图" align="center" prop="mainUrl" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="openForm(scope.row.id)"
                     v-hasPermi="['wuyou:delivery-empty:update']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['wuyou:delivery-empty:delete']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>
    <!-- 对话框(添加 / 修改) -->
    <DeliveryEmptyForm ref="formRef" @success="getList" />
    </div>
</template>

<script>
import * as DeliveryEmptyApi from '@/api/wuyou/deliveryempty';
import DeliveryEmptyForm from './DeliveryEmptyForm.vue';
export default {
  name: "DeliveryEmpty",
  components: {
          DeliveryEmptyForm,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      // 显示搜索条件
      showSearch: true,
              // 总条数
        total: 0,
      // 快递为零商品列表
      list: [],
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 选中行
      currentRow: {},
      // 查询参数
      queryParams: {
                    pageNo: 1,
            pageSize: 10,
        createTime: [],
        url: null,
        dataJson: null,
        delivery: null,
        category: null,
        offerId: null,
        ean: null,
        title: null,
        productId: null,
        quantity: null,
        price: null,
        currency: null,
        mainCategory1: null,
        mainCategory2: null,
        mainCategory3: null,
        imgUrl: null,
        mainUrl: null,
      },
            };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询列表 */
    async getList() {
      try {
      this.loading = true;
              const res = await DeliveryEmptyApi.getDeliveryEmptyPage(this.queryParams);
        this.list = res.data.list;
        this.total = res.data.total;
      } finally {
        this.loading = false;
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNo = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 添加/修改操作 */
    openForm(id) {
      this.$refs["formRef"].open(id);
    },
    /** 删除按钮操作 */
    async handleDelete(row) {
      const id = row.id;
      await this.$modal.confirm('是否确认删除快递为零商品编号为"' + id + '"的数据项?')
      try {
       await DeliveryEmptyApi.deleteDeliveryEmpty(id);
       await this.getList();
       this.$modal.msgSuccess("删除成功");
      } catch {}
    },
    /** 导出按钮操作 */
    async handleExport() {
      await this.$modal.confirm('是否确认导出所有快递为零商品数据项?');
      try {
        this.exportLoading = true;
        const data = await DeliveryEmptyApi.exportDeliveryEmptyExcel(this.queryParams);
        this.$download.excel(data, '快递为零商品.xls');
      } catch {
      } finally {
        this.exportLoading = false;
      }
    },
              }
};
</script>
