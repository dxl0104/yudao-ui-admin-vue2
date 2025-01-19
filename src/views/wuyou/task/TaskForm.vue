<template>
  <div class="app-container">
    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%" v-dialogDrag append-to-body>
      <el-form ref="formRef" :model="formData" :rules="formRules" v-loading="formLoading" label-width="100px">
                    <el-form-item label="类型" prop="taskType">
                      <el-select v-model="formData.taskType" placeholder="请选择类型">
                            <el-option v-for="dict in this.getDictDatas(DICT_TYPE.TASK_TYPE)"
                                       :key="dict.value" :label="dict.label" :value="parseInt(dict.value)" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                      <el-radio-group v-model="formData.status">
                            <el-radio v-for="dict in this.getDictDatas(DICT_TYPE.TASK_STATUS)"
                                      :key="dict.value" :label="parseInt(dict.value)"
>{{dict.label}}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="超时时间" prop="timeoutAt">
                      <el-date-picker clearable v-model="formData.timeoutAt" type="date" value-format="timestamp" placeholder="选择超时时间" />
                    </el-form-item>
                    <el-form-item label="页数" prop="pages">
                      <el-input v-model="formData.pages" placeholder="请输入页数" />
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
  import * as TaskApi from '@/api/wuyou/task';
      export default {
    name: "TaskForm",
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
                            taskType: undefined,
                            status: undefined,
                            timeoutAt: undefined,
                            pages: undefined,
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
            const res = await TaskApi.getTask(id);
            this.formData = res.data;
            this.title = "修改采集任务";
          } finally {
            this.formLoading = false;
          }
        }
        this.title = "新增采集任务";
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
            await TaskApi.updateTask(data);
            this.$modal.msgSuccess("修改成功");
            this.dialogVisible = false;
            this.$emit('success');
            return;
          }
          // 添加的提交
          await TaskApi.createTask(data);
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
                            taskType: undefined,
                            status: undefined,
                            timeoutAt: undefined,
                            pages: undefined,
        };
        this.resetForm("formRef");
      }
    }
  };
</script>
