<template>
  <div class="app-container">
    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%" v-dialogDrag append-to-body>
      <el-form ref="formRef" :model="formData" :rules="formRules" v-loading="formLoading" label-width="100px">
                    <el-form-item label="url" prop="url">
                      <el-input v-model="formData.url" placeholder="请输入url" />
                    </el-form-item>
                    <el-form-item label="json数据" prop="dataJson">
                      <el-input v-model="formData.dataJson" placeholder="请输入json数据" />
                    </el-form-item>
                    <el-form-item label="快递费" prop="delivery">
                      <el-input v-model="formData.delivery" placeholder="请输入快递费" />
                    </el-form-item>
                    <el-form-item label="分类" prop="category">
                      <el-input v-model="formData.category" placeholder="请输入分类" />
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
  import * as BasicDataApi from '@/api/wuyou/basicdata';
      export default {
    name: "BasicDataForm",
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
                            url: undefined,
                            dataJson: undefined,
                            delivery: undefined,
                            category: undefined,
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
            const res = await BasicDataApi.getBasicData(id);
            this.formData = res.data;
            this.title = "修改无忧基础数据";
          } finally {
            this.formLoading = false;
          }
        }
        this.title = "新增无忧基础数据";
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
            await BasicDataApi.updateBasicData(data);
            this.$modal.msgSuccess("修改成功");
            this.dialogVisible = false;
            this.$emit('success');
            return;
          }
          // 添加的提交
          await BasicDataApi.createBasicData(data);
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
                            url: undefined,
                            dataJson: undefined,
                            delivery: undefined,
                            category: undefined,
        };
        this.resetForm("formRef");
      }
    }
  };
</script>