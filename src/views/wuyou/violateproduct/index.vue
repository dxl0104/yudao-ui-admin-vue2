<template>
  <div class="app-container">
    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>
      <el-form-item label="url商品链接" prop="url">
        <el-input v-model="queryParams.url" placeholder="请输入url商品链接" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="快递费" prop="delivery">
        <el-input v-model="queryParams.delivery" placeholder="请输入快递费" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="queryParams.title" placeholder="请输入标题" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="productId" prop="productId">
        <el-input v-model="queryParams.productId" placeholder="请输入productId" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="quantity" prop="quantity">
        <el-input v-model="queryParams.quantity" placeholder="请输入quantity" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="price" prop="price">
        <el-input v-model="queryParams.price" placeholder="请输入price" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="currency" prop="currency">
        <el-input v-model="queryParams.currency" placeholder="请输入currency" clearable @keyup.enter.native="handleQuery"/>
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
      <el-form-item label="商品主图" prop="mainUrl">
        <el-input v-model="queryParams.mainUrl" placeholder="请输入商品主图" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="侵权词" prop="violateWord">
        <el-input v-model="queryParams.violateWord" placeholder="请输入侵权词" clearable @keyup.enter.native="handleQuery"/>
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
                   v-hasPermi="['wuyou:violate-product:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['wuyou:violate-product:export']">导出</el-button>
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
      <el-table-column label="offerId" align="center" prop="offerId" />
      <el-table-column label="ean" align="center" prop="ean" />
      <el-table-column label="标题" align="center" prop="title" />
      <el-table-column label="productId" align="center" prop="productId" />
      <el-table-column label="quantity" align="center" prop="quantity" />
      <el-table-column label="price" align="center" prop="price" />
      <el-table-column label="currency" align="center" prop="currency" />
      <el-table-column label="一级分类" align="center" prop="mainCategory1" />
      <el-table-column label="二级分类" align="center" prop="mainCategory2" />
      <el-table-column label="三级分类" align="center" prop="mainCategory3" />
      <el-table-column label="imgUrl" align="center" prop="imgUrl" />
      <el-table-column label="json" align="center" prop="offerDescription" />
      <el-table-column label="商品主图" align="center" prop="mainUrl" />
      <el-table-column label="侵权词" align="center" prop="violateWord" />
      <el-table-column label="侵权词id" align="center" prop="violateId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="openForm(scope.row.id)"
                     v-hasPermi="['wuyou:violate-product:update']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['wuyou:violate-product:delete']">删除</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleRecover(scope.row)"
                     v-hasPermi="['wuyou:violate-product:recover']">恢复</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>
    <!-- 对话框(添加 / 修改) -->
    <ViolateProductForm ref="formRef" @success="getList" />
    </div>
</template>

<script>
import * as ViolateProductApi from '@/api/wuyou/violateproduct';
import ViolateProductForm from './ViolateProductForm.vue';
import {recoverViolateProduct} from "@/api/wuyou/violateproduct";
export default {
  name: "ViolateProduct",
  components: {
          ViolateProductForm,
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
      // 侵权商品列表
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
        offerDescription: null,
        mainUrl: null,
        violateWord: null,
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
              const res = await ViolateProductApi.getViolateProductPage(this.queryParams);
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
      await this.$modal.confirm('是否确认删除侵权商品编号为"' + id + '"的数据项?')
      try {
       await ViolateProductApi.deleteViolateProduct(id);
       await this.getList();
       this.$modal.msgSuccess("删除成功");
      } catch {}
    },
    /** 恢复按钮操作 */
    async handleRecover(row) {
      const id = row.id;
      await this.$modal.confirm('是否确认恢复侵权商品编号为"' + id + '"的数据项?')
      try {
        await ViolateProductApi.recoverViolateProduct(id);
        await this.getList();
        this.$modal.msgSuccess("恢复成功");
      } catch {}
    },

    /** 导出按钮操作 */
    async handleExport() {
      await this.$modal.confirm('是否确认导出所有侵权商品数据项?');
      try {
        this.exportLoading = true;
        const data = await ViolateProductApi.exportViolateProductExcel(this.queryParams);
        this.$download.excel(data, '侵权商品.xls');
      } catch {
      } finally {
        this.exportLoading = false;
      }
    },
              }
};
</script>
