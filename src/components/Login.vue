<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-11-17 21:34:10
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-11-17 22:43:41
-->
<template>
  <div class="wrapper">
    <div class="centerBox">
      <p class="title">注册界面</p>
      <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <p>
          <el-button size="mini" type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data(){
    return{
      ruleForm: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    this.getData()
    setTimeout(()=>{
      this.getData2()
    },2000)
  },
  methods: {
    getData(){
      this.$axios({
        url: `${window.baseUrl}/pwd/isStrong`,
        method: "get",
        params:{
          inputStr: 123
        }
      }).then(res => {
        console.log("强度res:",res)
      })
      .catch(error=>{
        console.log("发生错误:",error)
      })
    },
    getData2(){
      this.$axios({
        url: `${window.baseUrl}/pwd/generateByPolicy`,
        method: "get",
        params:{
          policyId: 0,
          pwdLen: 20
        }
      }).then(res => {
        console.log("强度res:",res)
      })
      .catch(error=>{
        console.log("发生错误:",error)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper{
    position: absolute;
    top: 0;right: 0;bottom: 0;left: 0; margin: auto;
    background-color: #fafafa;
  }
  .centerBox{
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #ccc;
    background-color: #eee;
    padding: 20px  40px;
    border-radius: 5px;
  }
  .title{
    margin-top: 10px;
    margin-bottom: 20px;
    height: 40px;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
</style>
