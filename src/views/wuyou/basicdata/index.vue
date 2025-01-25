<template>
  <div class="app-container">
    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input v-model="queryParams.url" placeholder="请输入url" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="快递费" prop="delivery">
        <el-input v-model="queryParams.delivery" placeholder="请输入快递费" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="productId" prop="productId">
        <el-input v-model="queryParams.productId" placeholder="请输入productId" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="一级分类" prop="mainCategory1">
        <el-input v-model="queryParams.mainCategory1" placeholder="请输入分类" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="二级分类" prop="mainCategory2">
        <el-input v-model="queryParams.mainCategory2" placeholder="请输入分类" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="三级分类" prop="mainCategory3">
        <el-input v-model="queryParams.mainCategory3" placeholder="请输入分类" clearable @keyup.enter.native="handleQuery"/>
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
                   v-hasPermi="['wuyou:basic-data:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading">导出</el-button>
<!--        <el-button type="primary" plain icon="el-icon-download" size="mini" @click="importErp" :loading="importLoading">导入无忧erp</el-button>-->
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true" style="table-layout: fixed;" @selection-change="handleSelectionChange">
      <!-- 添加选择框，使用自定义class -->
      <el-table-column type="selection" width="55"  />

      <!-- 其他表格列 -->
      <el-table-column label="id" align="center" prop="id" width="100px"/>
      <el-table-column label="商品主图" align="center">
        <template v-slot="scope">
          <el-image
            style="width: 100px; height: 60px"
            :src="scope.row.mainUrl"
            :preview-src-list="[scope.row.mainUrl]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="商品标题" align="center" prop="title" width="700px">
        <template v-slot="scope">
          <el-link :href="scope.row.url" target="_blank">{{ scope.row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="200px">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格" align="center" prop="price" />
      <el-table-column label="快递费" align="center" prop="delivery" />
      <el-table-column label="分类一" align="center" prop="mainCategory1" width="150px"/>
      <el-table-column label="分类二" align="center" prop="mainCategory2" width="150px"/>
      <el-table-column label="分类三" align="center" prop="mainCategory3" width="150px"/>
    </el-table>

    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>
    <!-- 对话框(添加 / 修改) -->
    <BasicDataForm ref="formRef" @success="getList" />
  </div>
</template>

<script>
import * as BasicDataApi from '@/api/wuyou/basicdata';
import BasicDataForm from './BasicDataForm.vue';
import {importId} from "@/api/wuyou/basicdata";

export default {
  name: "BasicData",
  components: {
    BasicDataForm,
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
      importLoading:false,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 无忧基础数据列表
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
        ids:[],
        mainCategory1:null,
        mainCategory2:null,
        mainCategory3:null,
        productId:null,
      },
      // 选中的行（多选）
      selectedRows: [],
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
        const res = await BasicDataApi.getBasicDataPage(this.queryParams);
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
    async importErp(){
      debugger
      if (this.selectedRows.length > 0) {
        await this.$modal.confirm('是否将选中的数据导入无忧erp?');
        try {
          this.importLoading = true;
          console.log(this.selectedRows);
          const ids = this.selectedRows.map(item => item.id);
          console.log(ids)
          importId({idList:ids}).then((res)=>{
            console.log(res)
          })
        } catch {
          console.log("取消")
        } finally {
          this.importLoading = false;
        }
      }
      else {
        this.$message.info("请选择需要导入的数据");
      }

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
      await this.$modal.confirm('是否确认删除无忧基础数据编号为"' + id + '"的数据项?');
      try {
        await BasicDataApi.deleteBasicData(id);
        await this.getList();
        this.$modal.msgSuccess("删除成功");
      } catch {}
    },
    /** 导出按钮操作 */
    async handleExport() {
      if (this.selectedRows.length>0){
        await this.$modal.confirm('是否确认导出所有无忧基础数据数据项?');
        try {
          this.exportLoading = true;
          this.queryParams.ids = this.selectedRows.map((item) => item.id);
          const data = await BasicDataApi.exportBasicDataExcel(this.queryParams);
          this.$download.excel(data, '无忧基础数据.xls');
        } catch {} finally {
          this.exportLoading = false;
        }
      }
      else {
        this.$message.info("请选择需要导出的数据");
      }

    },
    /** 处理选择的行 */
    handleSelectionChange(selectedRows) {
      this.selectedRows = selectedRows;
      console.log("选中的数据",selectedRows)
    },
  }
};
</script>

<style scoped>

</style>
