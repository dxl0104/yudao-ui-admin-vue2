<template>
  <div class="app-container">
    <!-- 对话框(添加 / 修改) -->
    <el-dialog :title="dialogTitle"  custom-class="dialogS" :visible.sync="dialogVisible"  width="45%"  v-dialogDrag>
      <el-form ref="formRef" :model="formData" :rules="formRules" v-loading="formLoading" label-width="100px">
        <el-form-item label="类别名称" prop="categoryName">
          <el-input v-model="formData.categoryName" placeholder="请输入类别名称"/>
        </el-form-item>
        <el-form-item label="中文名称" prop="zhName">
          <el-input v-model="formData.zhName" placeholder="请输入中文名称"/>
        </el-form-item>
        <el-form-item label="父id" prop="parentId">
          <TreeSelect
            v-model="formData.parentId"
            :options="categoryTree"
            :normalizer="normalizer"
            :show-count="true"
            placeholder="请选择父id"
          />
        </el-form-item>

        <el-form-item label="级别" prop="level">
          <el-input v-model="formData.level" placeholder="请输入级别"/>
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
import * as CategoryApi from '@/api/wuyou/category';
import TreeSelect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "CategoryForm",
  components: {
    TreeSelect,
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
        categoryName: undefined,
        zhName: undefined,
        level: undefined,
        parentId: undefined,
      },
      // 表单校验
      formRules: {},
      categoryTree: [], // 树形结构
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
          const res = await CategoryApi.getCategory(id);
          this.formData = res.data;
          this.title = "修改数据类别";
        } finally {
          this.formLoading = false;
        }
      }
      this.title = "新增数据类别";
      await this.getCategoryTree();
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
          await CategoryApi.updateCategory(data);
          this.$modal.msgSuccess("修改成功");
          this.dialogVisible = false;
          this.$emit('success');
          return;
        }
        // 添加的提交
        await CategoryApi.createCategory(data);
        this.$modal.msgSuccess("新增成功");
        this.dialogVisible = false;
        this.$emit('success');
      } finally {
        this.formLoading = false;
      }
    },
    /** 获得数据类别树 */
    async getCategoryTree() {
      this.categoryTree = [];
      const res = await CategoryApi.getCategoryList();
       const root = {id: 0, zhName: 'allgro', children: []};
      root.children = this.handleTree(res.data, 'id', 'parentId')
      this.categoryTree.push(root)
    },
    /** 转换数据类别数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.id,
        label: node['zhName'],
        children: node.children
      };
    },
    /** 表单重置 */
    reset() {
      this.formData = {
        id: undefined,
        categoryName: undefined,
        zhName: undefined,
        level: undefined,
        parentId: undefined,
      };
      this.resetForm("formRef");
    }
  }
};
</script>
<style >
.dialogS .el-dialog__body {
  height: 700px !important;
  overflow: auto;
}
</style>


