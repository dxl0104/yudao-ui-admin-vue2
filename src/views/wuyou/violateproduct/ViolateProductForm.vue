<template>
  <div class="app-container">
    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="45%" v-dialogDrag append-to-body>
      <el-form ref="formRef" :model="formData" :rules="formRules" v-loading="formLoading" label-width="100px">
                    <el-form-item label="url商品链接" prop="url">
                      <el-input v-model="formData.url" placeholder="请输入url商品链接" />
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
                    <el-form-item label="offerId" prop="offerId">
                      <el-input v-model="formData.offerId" placeholder="请输入offerId" />
                    </el-form-item>
                    <el-form-item label="ean" prop="ean">
                      <el-input v-model="formData.ean" placeholder="请输入ean" />
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                      <el-input v-model="formData.title" placeholder="请输入标题" />
                    </el-form-item>
                    <el-form-item label="productId" prop="productId">
                      <el-input v-model="formData.productId" placeholder="请输入productId" />
                    </el-form-item>
                    <el-form-item label="quantity" prop="quantity">
                      <el-input v-model="formData.quantity" placeholder="请输入quantity" />
                    </el-form-item>
                    <el-form-item label="price" prop="price">
                      <el-input v-model="formData.price" placeholder="请输入price" />
                    </el-form-item>
                    <el-form-item label="currency" prop="currency">
                      <el-input v-model="formData.currency" placeholder="请输入currency" />
                    </el-form-item>
                    <el-form-item label="一级分类" prop="mainCategory1">
                      <el-input v-model="formData.mainCategory1" placeholder="请输入一级分类" />
                    </el-form-item>
                    <el-form-item label="二级分类" prop="mainCategory2">
                      <el-input v-model="formData.mainCategory2" placeholder="请输入二级分类" />
                    </el-form-item>
                    <el-form-item label="三级分类" prop="mainCategory3">
                      <el-input v-model="formData.mainCategory3" placeholder="请输入三级分类" />
                    </el-form-item>
                    <el-form-item label="imgUrl" prop="imgUrl">
                      <el-input v-model="formData.imgUrl" placeholder="请输入imgUrl" />
                    </el-form-item>
                    <el-form-item label="json">
                      <Editor v-model="formData.offerDescription" :min-height="192"/>
                    </el-form-item>
                    <el-form-item label="商品主图" prop="mainUrl">
                      <el-input v-model="formData.mainUrl" placeholder="请输入商品主图" />
                    </el-form-item>
                    <el-form-item label="侵权词" prop="violateWord">
                      <el-input v-model="formData.violateWord" placeholder="请输入侵权词" />
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
  import * as ViolateProductApi from '@/api/wuyou/violateproduct';
  import Editor from '@/components/Editor';
      export default {
    name: "ViolateProductForm",
    components: {
          Editor,
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
                            offerId: undefined,
                            ean: undefined,
                            title: undefined,
                            productId: undefined,
                            quantity: undefined,
                            price: undefined,
                            currency: undefined,
                            mainCategory1: undefined,
                            mainCategory2: undefined,
                            mainCategory3: undefined,
                            imgUrl: undefined,
                            offerDescription: undefined,
                            mainUrl: undefined,
                            violateWord: undefined,
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
            const res = await ViolateProductApi.getViolateProduct(id);
            this.formData = res.data;
            this.title = "修改侵权商品";
          } finally {
            this.formLoading = false;
          }
        }
        this.title = "新增侵权商品";
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
            await ViolateProductApi.updateViolateProduct(data);
            this.$modal.msgSuccess("修改成功");
            this.dialogVisible = false;
            this.$emit('success');
            return;
          }
          // 添加的提交
          await ViolateProductApi.createViolateProduct(data);
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
                            offerId: undefined,
                            ean: undefined,
                            title: undefined,
                            productId: undefined,
                            quantity: undefined,
                            price: undefined,
                            currency: undefined,
                            mainCategory1: undefined,
                            mainCategory2: undefined,
                            mainCategory3: undefined,
                            imgUrl: undefined,
                            offerDescription: undefined,
                            mainUrl: undefined,
                            violateWord: undefined,
        };
        this.resetForm("formRef");
      }
    }
  };
</script>