<template>
  <div class="app-container">
    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="关联任务id" prop="taskId">
        <el-input v-model="queryParams.taskId" placeholder="请输入关联任务id" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="当前页码" prop="pageNum">
        <el-input v-model="queryParams.pageNum" placeholder="请输入当前页码" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.TASK_PAGE_STATUS)"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="采集器id" prop="deviceId">
        <el-input v-model="queryParams.deviceId" placeholder="请输入采集器id" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="分配时间" prop="assignedAt">
        <el-date-picker clearable v-model="queryParams.assignedAt" type="date" value-format="yyyy-MM-dd" placeholder="选择分配时间" />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
      </el-form-item>
      <el-form-item label="超时时间" prop="timeout">
        <el-date-picker clearable v-model="queryParams.timeout" type="date" value-format="yyyy-MM-dd" placeholder="选择超时时间" />
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
                   v-hasPermi="['wuyou:task-page-detail:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['wuyou:task-page-detail:export']">导出</el-button>
      </el-col>
              <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

            <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
            <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="关联任务id" align="center" prop="taskId" />
      <el-table-column label="当前页码" align="center" prop="pageNum" />
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.TASK_PAGE_STATUS" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="采集器id" align="center" prop="deviceId" />
      <el-table-column label="分配时间" align="center" prop="assignedAt" width="180">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.assignedAt) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="超时时间" align="center" prop="timeout" width="180">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.timeout) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="openForm(scope.row.id)"
                     v-hasPermi="['wuyou:task-page-detail:update']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['wuyou:task-page-detail:delete']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>
    <!-- 对话框(添加 / 修改) -->
    <TaskPageDetailForm ref="formRef" @success="getList" />
    </div>
</template>

<script>
import * as TaskPageDetailApi from '@/api/wuyou/taskpagedetail';
import TaskPageDetailForm from './TaskPageDetailForm.vue';
export default {
  name: "TaskPageDetail",
  components: {
          TaskPageDetailForm,
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
      // 页数据采集状态列表
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
        taskId: null,
        pageNum: null,
        status: null,
        deviceId: null,
        assignedAt: null,
        createTime: [],
        timeout: null,
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
              const res = await TaskPageDetailApi.getTaskPageDetailPage(this.queryParams);
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
      await this.$modal.confirm('是否确认删除页数据采集状态编号为"' + id + '"的数据项?')
      try {
       await TaskPageDetailApi.deleteTaskPageDetail(id);
       await this.getList();
       this.$modal.msgSuccess("删除成功");
      } catch {}
    },
    /** 导出按钮操作 */
    async handleExport() {
      await this.$modal.confirm('是否确认导出所有页数据采集状态数据项?');
      try {
        this.exportLoading = true;
        const data = await TaskPageDetailApi.exportTaskPageDetailExcel(this.queryParams);
        this.$download.excel(data, '页数据采集状态.xls');
      } catch {
      } finally {
        this.exportLoading = false;
      }
    },
              }
};
</script>
