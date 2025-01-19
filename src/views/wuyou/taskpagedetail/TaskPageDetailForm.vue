<template>
  <div class="app-container">
    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%" v-dialogDrag append-to-body>
      <el-form ref="formRef" :model="formData" :rules="formRules" v-loading="formLoading" label-width="100px">
                    <el-form-item label="关联任务id" prop="taskId">
                      <el-input v-model="formData.taskId" placeholder="请输入关联任务id" />
                    </el-form-item>
                    <el-form-item label="当前页码" prop="pageNum">
                      <el-input v-model="formData.pageNum" placeholder="请输入当前页码" />
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                      <el-select v-model="formData.status" placeholder="请选择状态">
                            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.TASK_PAGE_STATUS)"
                                       :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="采集器id" prop="deviceId">
                      <el-input v-model="formData.deviceId" placeholder="请输入采集器id" />
                    </el-form-item>
                    <el-form-item label="分配时间" prop="assignedAt">
                      <el-date-picker clearable v-model="formData.assignedAt" type="date" value-format="timestamp" placeholder="选择分配时间" />
                    </el-form-item>
                    <el-form-item label="超时时间" prop="timeout">
                      <el-date-picker clearable v-model="formData.timeout" type="date" value-format="timestamp" placeholder="选择超时时间" />
                    </el-form-item>
      </el-form>
              <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" :disabled="formLoading">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as TaskPageDetailApi from '@/api/wuyou/taskpagedetail';
      export default {
    name: "TaskPageDetailForm",
    components: {
                    },
    data() {
      return {
        // 弹出层标题
        dialogTitle: "",
        // 是否显示弹出层
        dialogVisible: false,
        // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
        formLoading: false,
        // 表单参数
        formData: {
                            id: undefined,
                            taskId: undefined,
                            pageNum: undefined,
                            status: undefined,
                            deviceId: undefined,
                            assignedAt: undefined,
                            timeout: undefined,
        },
        // 表单校验
        formRules: {
        },
                        };
    },
    methods: {
      /** 打开弹窗 */
     async open(id) {
        this.dialogVisible = true;
        this.reset();
        // 修改时，设置数据
        if (id) {
          this.formLoading = true;
          try {
            const res = await TaskPageDetailApi.getTaskPageDetail(id);
            this.formData = res.data;
            this.title = "修改页数据采集状态";
          } finally {
            this.formLoading = false;
          }
        }
        this.title = "新增页数据采集状态";
              },
      /** 提交按钮 */
      async submitForm() {
        // 校验主表
        await this.$refs["formRef"].validate();
                  this.formLoading = true;
        try {
          const data = this.formData;
                  // 修改的提交
          if (data.id) {
            await TaskPageDetailApi.updateTaskPageDetail(data);
            this.$modal.msgSuccess("修改成功");
            this.dialogVisible = false;
            this.$emit('success');
            return;
          }
          // 添加的提交
          await TaskPageDetailApi.createTaskPageDetail(data);
          this.$modal.msgSuccess("新增成功");
          this.dialogVisible = false;
          this.$emit('success');
        } finally {
          this.formLoading = false;
        }
      },
                      /** 表单重置 */
      reset() {
        this.formData = {
                            id: undefined,
                            taskId: undefined,
                            pageNum: undefined,
                            status: undefined,
                            deviceId: undefined,
                            assignedAt: undefined,
                            timeout: undefined,
        };
        this.resetForm("formRef");
      }
    }
  };
</script>
