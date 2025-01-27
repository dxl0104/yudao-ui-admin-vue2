<template>
  <div class="app-container">
    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%" v-dialogDrag append-to-body>
      <el-form ref="formRef" :model="formData" :rules="formRules" v-loading="formLoading" label-width="120px">
        <el-form-item label="满足的最小总价" prop="minAmount">
          <el-input v-model="formData.minAmount" placeholder="请输入满足的最小总价"/>
        </el-form-item>
        <el-form-item label="满足的最大总价" prop="maxAmount">
          <el-input v-model="formData.maxAmount" placeholder="请输入最大金额"/>
        </el-form-item>
        <el-form-item label="商品减免金额" prop="discountAmount">
          <el-input v-model="formData.discountAmount" placeholder="请输入商品减免金额"/>
        </el-form-item>
        <el-form-item label="快递减免金额" prop="shippingDiscount">
          <el-input v-model="formData.shippingDiscount" placeholder="请输入快递费用减免金额"/>
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
import * as DiscountRulesApi from '@/api/wuyou/discountrules';

export default {
  name: "DiscountRulesForm",
  components: {},
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
        minAmount: undefined,
        discountAmount: undefined,
        shippingDiscount: undefined,
        maxAmount: undefined,
      },
      // 表单校验
      formRules: {},
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
          const res = await DiscountRulesApi.getDiscountRules(id);
          this.formData = res.data;
          this.title = "修改折扣规则";
        } finally {
          this.formLoading = false;
        }
      }
      this.title = "新增折扣规则";
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
          await DiscountRulesApi.updateDiscountRules(data);
          this.$modal.msgSuccess("修改成功");
          this.dialogVisible = false;
          this.$emit('success');
          return;
        }
        // 添加的提交
        await DiscountRulesApi.createDiscountRules(data);
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
        minAmount: undefined,
        discountAmount: undefined,
        shippingDiscount: undefined,
        maxAmount: undefined,
      };
      this.resetForm("formRef");
    }
  }
};
</script>
