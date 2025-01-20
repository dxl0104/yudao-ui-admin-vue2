<template>
  <div class="app-container">
    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="任务id" prop="taskId">
        <el-input v-model="queryParams.taskId" placeholder="请输入任务id" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="设备id" prop="deviceId">
        <el-input v-model="queryParams.deviceId" placeholder="请输入设备id" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="进度" prop="process">
        <el-input v-model="queryParams.process" placeholder="请输入进度" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="已采集数量" prop="collectCount">
        <el-input v-model="queryParams.collectCount" placeholder="请输入已采集数量" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="总数量" prop="totalCount">
        <el-input v-model="queryParams.totalCount" placeholder="请输入总数量" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable size="small">
          <el-option v-for="dict in this.getDictDatas(DICT_TYPE.TASK_PROCESS_STATUS)"
                       :key="dict.value" :label="dict.label" :value="dict.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss" type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']" />
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
                   v-hasPermi="['wuyou:task-process:create']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" :loading="exportLoading"
                   v-hasPermi="['wuyou:task-process:export']">导出</el-button>
      </el-col>
              <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

            <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
            <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="任务id" align="center" prop="taskId" />
      <el-table-column label="设备id" align="center" prop="deviceId" />
      <el-table-column label="进度" align="center" prop="process" />
      <el-table-column label="已采集数量" align="center" prop="collectCount" />
      <el-table-column label="总数量" align="center" prop="totalCount" />
      <el-table-column label="状态" align="center" prop="status">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.TASK_PROCESS_STATUS" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template v-slot="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="openForm(scope.row.id)"
                     v-hasPermi="['wuyou:task-process:update']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
                     v-hasPermi="['wuyou:task-process:delete']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>
    <!-- 对话框(添加 / 修改) -->
    <TaskProcessForm ref="formRef" @success="getList" />
    </div>
</template>

<script>
import * as TaskProcessApi from '@/api/wuyou/taskprocess';
import TaskProcessForm from './TaskProcessForm.vue';
export default {
  name: "TaskProcess",
  components: {
          TaskProcessForm,
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
      // 任务进度列表
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
        deviceId: null,
        process: null,
        collectCount: null,
        totalCount: null,
        status: null,
        createTime: [],
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
              const res = await TaskProcessApi.getTaskProcessPage(this.queryParams);
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
      await this.$modal.confirm('是否确认删除任务进度编号为"' + id + '"的数据项?')
      try {
       await TaskProcessApi.deleteTaskProcess(id);
       await this.getList();
       this.$modal.msgSuccess("删除成功");
      } catch {}
    },
    /** 导出按钮操作 */
    async handleExport() {
      await this.$modal.confirm('是否确认导出所有任务进度数据项?');
      try {
        this.exportLoading = true;
        const data = await TaskProcessApi.exportTaskProcessExcel(this.queryParams);
        this.$download.excel(data, '任务进度.xls');
      } catch {
      } finally {
        this.exportLoading = false;
      }
    },
              }
};
</script>
