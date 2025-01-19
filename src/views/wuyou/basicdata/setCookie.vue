<template>
<div>
  <!-- 对话框(添加 / 修改) -->
    <el-form ref="formRef" :model="formData"  label-width="100px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="formData.userName"  placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="密码" prop="pwd">
        <el-input v-model="formData.pwd"  placeholder="请输入密码" />
      </el-form-item>

      <el-form-item label="cookie" prop="cookie">
        <el-input disabled v-model="formData.cookie"  placeholder="请输入cookie" />
      </el-form-item>
      <el-button type="primary" @click="login">获取cookie</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
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
         cookie:"",
         userName:undefined,
         pwd:undefined
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
     login(){

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
