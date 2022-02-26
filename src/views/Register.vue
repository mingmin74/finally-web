<template>
<div class="register">
    <a-form
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="onFinish"
    @validate="handleValidate"
    @finishFailed="onFinishFailed"
  >
    <a-form-item  label="用户名" name="username">
      <a-input v-model:value="formState.username"   />
    </a-form-item>
    <a-form-item  label="手机号" name="phonenum">
      <a-input v-model:value="formState.phonenum"   />
    </a-form-item>
    <a-form-item  label="密码" name="password">
      <a-input  v-model:value="formState.password" type="password"  />
    </a-form-item>
    <a-form-item  label="确认密码" name="checkpass">
      <a-input v-model:value="formState.checkpass" type="password"  />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" html-type="submit">注册</a-button>
    </a-form-item>
  </a-form>
</div>
  
</template>
<script>
import { message } from 'ant-design-vue';
import httpServe from '../api/request'
export default {
   
  data() {
    const onFinish = values => {
      console.log('Success:', values);
      this.submit(values)
    };
    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };
    let validatePass = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请输入密码');
      } else {

        return Promise.resolve();
      }
    };
     let validatePass2 = async (_rule, value) => {
      if (value === '') {
        return Promise.reject('请输入确认密码');
      } else if (value !== this.formState.password) {
        return Promise.reject("两次密码不一致");
      } else {
        return Promise.resolve();
      }
    };
     let checkphone = async (_rule, value) => {
       let reg=/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
      if (value === '') {
        return Promise.reject('请输入手机号');
      } else if (!reg.test(value)) {
        return Promise.reject("手机号格式不正确");
      } else {
        return Promise.resolve();
      }
    };
    const rules = {
      username:[{ required: true, message: '请输入你的用户名'},{min: 1,max: 20,message: '长度在1-20之间',trigger: 'blur'}],
      password: [{ required: true, validator: validatePass, trigger: 'blur' }],
      checkpass: [{ required: true,validator: validatePass2, trigger: 'blur' }],
      phonenum: [{ required: true,validator: checkphone, trigger: 'blur' }],
    };
     const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
    };
    return {
      layout,
      formState:{
        username:'',
        password:'',
        checkpass:'',
        phonenum:''
      },
      onFinish,
      onFinishFailed,
      rules

    }
  },
  methods: {
    submit(value){
    httpServe.post('http://localhost:8080/user/register',value)
    .then((res)=>{
    console.log(res)
    message.success(res.data)
    this.$router.push('/login')
  })
    }
   
  },
}
</script>

<style lang="less" scoped>
.register{
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