<template>
  <div class="app-container">
    <!-- 搜索工作栏 -->
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="queryParams.createTime" style="width: 240px" value-format="yyyy-MM-dd HH:mm:ss"
                        type="daterange"
                        range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']"/>
      </el-form-item>
      <el-form-item label="url" prop="url">
        <el-input v-model="queryParams.url" placeholder="请输入url" clearable @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="快递费" prop="delivery">
        <el-input v-model="queryParams.delivery" placeholder="请输入快递费" clearable
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <el-cascader
          :value="queryParams.treeCategory"
          :options="treeList"
          :props="treeProps"
          @change="categoryChange"
          filterable></el-cascader>
      </el-form-item>

      <el-form-item label="productId" prop="productId">
        <el-input v-model="queryParams.productId" placeholder="请输入productId" clearable
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="一级分类" prop="mainCategory1">
        <el-input v-model="queryParams.mainCategory1" placeholder="请输入分类" clearable
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="二级分类" prop="mainCategory2">
        <el-input v-model="queryParams.mainCategory2" placeholder="请输入分类" clearable
                  @keyup.enter.native="handleQuery"/>
      </el-form-item>
      <el-form-item label="三级分类" prop="mainCategory3">
        <el-input v-model="queryParams.mainCategory3" placeholder="请输入分类" clearable
                  @keyup.enter.native="handleQuery"/>
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
                   v-hasPermi="['wuyou:basic-data:create']">新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
                   :loading="exportLoading">导出选中数据
        </el-button>
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleAllExport"
                   :loading="exportAllLoading">导出查询数据
        </el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <!-- 表格 -->
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true" style="table-layout: fixed;"
              @selection-change="handleSelectionChange">
      <!-- 添加选择框，使用自定义class -->
      <el-table-column type="selection" width="55"/>

      <!-- 其他表格列 -->
      <el-table-column label="id" align="center" prop="id" width="100"/>
      <el-table-column label="商品主图" align="center">
        <template v-slot="scope">
          <el-popover placement="right" trigger="hover">
            <img :src="scope.row.mainUrl" style="width:350px;height:350px;"/>
            <img slot="reference" :src="scope.row.mainUrl" style="max-width: 50px;max-height: 100px">
          </el-popover>

        </template>
      </el-table-column>
      <el-table-column label="商品标题" align="left" prop="title" width="500">
        <template v-slot="scope">
          <el-link :href="scope.row.url" target="_blank">{{ scope.row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="跟卖" align="left" prop="offersTotalCount" min-width="60"/>
      <el-table-column label="已售" align="left" prop="buyersQuantity" min-width="60"/>
      <el-table-column label="评分" align="left" prop="score" min-width="60"/>
      <el-table-column label="分类一" align="left" prop="mainCategory1" min-width="120"/>
      <el-table-column label="分类二" align="left" prop="mainCategory2" min-width="120"/>
      <el-table-column label="分类三" align="left" prop="mainCategory3" min-width="120"/>
      <el-table-column label="价格" align="left" prop="price"/>
      <el-table-column label="快递费" align="left" prop="delivery"/>
      <el-table-column label="创建时间" align="left" prop="createTime">
        <template v-slot="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNo" :limit.sync="queryParams.pageSize"
                @pagination="getList"/>
    <!-- 对话框(添加 / 修改) -->
    <BasicDataForm ref="formRef" @success="getList"/>

    <el-dialog title="导出设置" :visible.sync="dialogVisible" width="45%" v-dialogDrag append-to-body>
      <el-form ref="formRef" v-loading="formLoading" label-width="100px">
        <el-form-item label="商品价格系数" prop="multiple">
          <el-input v-model="queryParams.multiple" placeholder="请输入系数"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="exportSelect" :disabled="formLoading" :loading="exportLoading">确 定
        </el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as BasicDataApi from '@/api/wuyou/basicdata';
import * as CategoryApi from '@/api/wuyou/category';
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
      treeLoding:true,
      // 导出遮罩层
      exportLoading: false,
      exportAllLoading: false,
      importLoading: false,
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
      treeList:[],
      treeProps:{
        label:"zhName",
        value:"categoryName"
      },
      // 查询参数
      queryParams: {
        pageNo: 1,
        pageSize: 20,
        createTime: [],
        url: null,
        dataJson: null,
        delivery: null,
        category: null,
        ids: [],
        mainCategory1: null,
        mainCategory2: null,
        mainCategory3: null,
        productId: null,
        type: 'all',
        multiple: "0.98",
        treeCategory:undefined,
      },
      // 选中的行（多选）
      selectedRows: [],
      previewSrc: null,  // 当前放大图的地址
      show: false,
      dialogVisible: false,
      formLoading: false,
      imagePosition: {top: 0, left: 0}  // 放大图的位置
    };
  },
  created() {
    this.getList();
    this.getTree();
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
    /** 查询列表 */
    async getTree() {
      try {
        this.treeLoding = true;
        const res = await CategoryApi.getCategoryList(this.queryParams);
        this.treeList = this.handleTree(res.data, 'id', 'parentId','children',0);
      } finally {
        this.treeLoding = false;
      }
    },
    categoryChange(node){
      console.log(node)
      this.queryParams.mainCategory1=node[0]
      this.queryParams.mainCategory2=node[1]
      this.queryParams.mainCategory3=node[2]
      console.log(this.queryParams)
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
      await this.$modal.confirm('是否确认删除无忧基础数据编号为"' + id + '"的数据项?');
      try {
        await BasicDataApi.deleteBasicData(id);
        await this.getList();
        this.$modal.msgSuccess("删除成功");
      } catch {
      }
    },
    /** 导出选中数据按钮操作 */
    async handleExport() {
      if (this.selectedRows.length > 0) {
        await this.$modal.confirm('是否确认导出选中allegro基础数据数据项?');
        this.dialogVisible = true
        //设置到导出选中数据
        this.queryParams.type = 'select';
      } else {
        this.$message.info("请选择需要导出的数据");
      }
    },
    async exportSelect() {
      try {
        this.exportLoading = true;
        this.queryParams.ids = this.selectedRows.map((item) => item.id);
        const data = await BasicDataApi.exportBasicDataExcel(this.queryParams);
        this.$download.excel(data, 'allergo基础数据.xls');
      } catch {
      } finally {
        this.exportLoading = false;
        this.dialogVisible = false
      }
    },


    /** 导出查询的全部数据按钮操作 */
    async handleAllExport() {
      await this.$modal.confirm('是否确认导出查询的全部allegro基础数据数据项?');
      this.dialogVisible = true
      this.queryParams.type = 'all'
    },

    /** 处理选择的行 */
    handleSelectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },
  }
};
</script>

<style scoped>
.product-image {
  width: 100px;
  height: 60px;
  transition: transform 0.3s ease;
}

.image-container {
  display: inline-block;
  position: relative;
}

.image-preview {
  position: absolute;
  width: 300px;
  height: 300px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  overflow: hidden;
  z-index: 9999; /* 确保放大图在最上层 */
  display: block; /* 显示图片 */
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-image:hover {
  transform: scale(1.2);
  z-index: 10;
}
</style>
