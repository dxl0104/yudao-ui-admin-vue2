<template>
<div>
  <!-- 对话框(添加 / 修改) -->
    <el-form ref="formRef" :model="formData"  label-width="100px">
      <el-form-item label="cookie" prop="cookie">
        <el-input v-model="formData.cookie"  placeholder="请输入cookie" />
      </el-form-item>
      <el-button type="primary" @click="submitForm">确 定</el-button>
      <el-button type="primary" @click="submitForm">授权</el-button>
    </el-form>
</div>
</template>
<script >
import {getCurrentCookie, setCurrentCookie} from "@/api/system/user";

 export default {
   name: "setCookie",
   components: {
   },
   data(){
     return {
       formData: {
         cookie:""
       },
     }
   },
   created(){
     this.getCookie();
   },
   methods:{
     /** 提交按钮 */
     async submitForm() {
       let data={
         cookie: this.formData.cookie
       }
       await setCurrentCookie(data).then(()=>{
         this.$message.success("修改成功");
         this.getCookie();
       })

     },
     getToken(){

     },
     getCookie(){
       getCurrentCookie().then((res)=>{
         this.formData.cookie=res.data
       })
     }
   }
 }
</script>

<style scoped lang="scss">

</style>
