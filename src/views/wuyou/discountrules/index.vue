<template>
  <div class="app-container">
    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="满足的最小总价" prop="minAmount">
        <el-input v-model="queryParams.minAmount" placeholder="请输入满足的最小总价" clearable
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="最大总价" prop="maxAmount">
        <el-input v-model="queryParams.maxAmount" placeholder="请输入最大金额" clearable
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="商品减免金额" prop="discountAmount">
        <el-input v-model="queryParams.discountAmount" placeholder="请输入商品减免金额" clearable
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="快递费用减免金额" prop="shippingDiscount">
        <el-input v-model="queryParams.shippingDiscount" placeholder="请输入快递费用减免金额" clearable
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss"
                        type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"/>
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
                   v-hasPermi="['wuyou:discount-rules:create']">新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
                   :loading="exportLoading"
                   v-hasPermi="['wuyou:discount-rules:export']">导出
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="id" align="center" prop="id"/>
      <el-table-column label="满足的最小总价" align="center" prop="minAmount"/>
      <el-table-column label="最大金额" align="center" prop="maxAmount"/>
      <el-table-column label="商品减免金额" align="center" prop="discountAmount"/>
      <el-table-column label="快递费用减免金额" align="center" prop="shippingDiscount"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="openForm(scope.row.id)"
                     v-hasPermi="['wuyou:discount-rules:update']">修改
          </el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['wuyou:discount-rules:delete']">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>
    <!-- 对话框(添加 / 修改) -->
    <DiscountRulesForm ref="formRef" @success="getList"/>
  </div>
</template>

<script>
import * as DiscountRulesApi from '@/api/wuyou/discountrules';
import DiscountRulesForm from './DiscountRulesForm.vue';

export default {
  name: "DiscountRules",
  components: {
    DiscountRulesForm,
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
      // 折扣规则列表
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
        minAmount: null,
        discountAmount: null,
        shippingDiscount: null,
        createTime: [],
        maxAmount: null,
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
        const res = await DiscountRulesApi.getDiscountRulesPage(this.queryParams);
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
      await this.$modal.confirm('是否确认删除折扣规则编号为"' + id + '"的数据项?')
      try {
        await DiscountRulesApi.deleteDiscountRules(id);
        await this.getList();
        this.$modal.msgSuccess("删除成功");
      } catch {
      }
    },
    /** 导出按钮操作 */
    async handleExport() {
      await this.$modal.confirm('是否确认导出所有折扣规则数据项?');
      try {
        this.exportLoading = true;
        const data = await DiscountRulesApi.exportDiscountRulesExcel(this.queryParams);
        this.$download.excel(data, '折扣规则.xls');
      } catch {
      } finally {
        this.exportLoading = false;
      }
    },
  }
};
</script>
