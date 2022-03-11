<template>
  <div class="login">
    <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    :rules="rules"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
   <a-form-item  label="用户名" name="username"  :rules="[{ required: true, message: '请输入你的用户名'},{min: 1,max: 20,message: '长度在1-20之间',trigger: 'blur'}]">
      <a-input v-model:value="formState.username" />
    </a-form-item>
    <a-form-item  label="密码" name="password"  :rules="[{ required: true, message: '请输入你的密码' },{min: 6,max: 20,message: '长度在6-20之间',trigger: 'blur'}]">
      <a-input v-model:value="formState.password" type="password" />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button html-type="submit" >登录</a-button>
       Or
      <router-link to="/register">注册</router-link>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
import { message } from 'ant-design-vue';
import httpServe from '../api/request'
export default {
data(){
   const onFinish = values => {
      console.log('Success:', values);
      this.submit(values)
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    return{
      formState:{
          username: '',
          password:''
      },
      onFinish,
      onFinishFailed,
    } 
},
methods:{
  submit(value){
    httpServe.post('http://localhost:8080/user/login',value)
    .then((res)=>{
      console.log(res);
      if(res.data.status>=200&&res.data.status<400){
        this.$store.commit("CHANGE_STATUS", true);
        this.$store.commit("CHANGE_UNAME", this.formState.username);
        localStorage.setItem("Flag", "isLogin");
        this.$store.commit("TOKEN",res.data.data)
        localStorage.setItem("ZL_Token",res.data.data)
        message.success(res.data.message)
        this.$router.push({
          name:"index",
          params:{
          username:''||undefined
          },
          query:{
            user:this.formState.username.toUpperCase()
          }
        })
      }else{
        message.info(res.data.message)
      }
    })
  }
},
}
</script>

<style lang="less" scoped>
.login{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 20px;
    width: 400px;
    height: 200px;
    background-color: rgb(235, 214, 214);
}
</style>

