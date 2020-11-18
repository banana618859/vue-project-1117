<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-11-17 21:34:10
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-11-18 15:06:10
-->
<template>
  <div class="wrapper">
    <div class="centerBox" style="padding:20px 50px 60px; width: 700px; overflow: hidden;">
      <p class="title">密码校验与生成</p>
      <el-form :model="ruleForm" :rules="rules" size="mini" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        
        <el-form-item label="强口令密码判断" prop="inputStr">
          <div style="text-align: left;">
            <el-input 
              style="width: 290px;" 
              v-model="ruleForm.inputStr" placeholder="这里输入判断密码，判断是否为强口令">
            </el-input>
            <span class="mg-l10 mg-r10">
              <el-button size="mini" type="primary" @click="submitForm('ruleForm')">生成</el-button>
            </span>
            <span>{{ resultOne }}</span>
          </div>
        </el-form-item>
      </el-form>

      <el-form :model="ruleForma" :rules="rulesa" size="mini" ref="ruleForma" label-width="120px" class="demo-ruleForm">
        <el-form-item label="生成安全口令" prop="pwdLen">
          <div style="text-align: left;">
            <el-select style="width:120px;" v-model="ruleForma.policyId" placeholder="选择策略ID">
              <el-option
                v-for="(item,index) in allSelect"
                :key="item.label+index" 
                :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-input 
              style="width: 170px;" 
              v-model.number="ruleForma.pwdLen" 
              @blur="checkLen(ruleForma.pwdLen)"
              placeholder="输入密码长度（最大长度200）">
            </el-input>
            <span class="mg-l10 mg-r10">
              <el-button size="mini" type="primary" @click="submitForma('ruleForma')">校验</el-button>
            </span>
            
          </div>
        </el-form-item>
        <div class="zhoz_br" v-if="resultTwo" style="text-align: left; padding-left: 125px;">{{ resultTwo }}</div>
        
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data(){
    var checkNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码长度不能为空'));
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value > 200) {
          callback(new Error('长度不能大于200'));
          this.ruleForm.pwdLen = 200;
        } else {
          callback();
        }
      }
    };
    return{
      ruleForm: {
        inputStr: ''
      },
      ruleForma: {
        policyId: 0,
        pwdLen: ''
      },
      allSelect:[
        {
          label: '策略0',
          value: 0
        },
        {
          label: '策略1',
          value: 1
        },
        {
          label: '策略2',
          value: 2
        },
        {
          label: '策略3',
          value: 3
        }
      ],
      resultOne:'是/否',
      resultTwo: '',
      rules: {
        inputStr: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      rulesa: {
        pwdLen: [
          { required: true, message: '请输入密码长度', trigger: 'blur' },
          { validator: checkNum, trigger: 'blur' }
        ]
      }
    }
  },
  created(){
    // this.getData()
    // setTimeout(()=>{
    //   this.getData2()
    // },2000)
  },
  methods: {
    checkLen(len){
      console.log('len:',len);
      let rel = this.isNumber(len);
      // if(!rel){
      //   this.$message({
      //     message: '请输入数字',
      //     type: 'warning'
      //   })
      // }
      // if(len>200){
      //   this.$message({
      //     message: '不能大于200',
      //     type: 'warning'
      //   })
      //   this.ruleForm.pwdLen = 200;
      // }
    },
    isNumber(obj) {  
      console.log(typeof obj)
      return obj === +obj  
    },
    getData(){
      let that = this;
      this.$axios({
        url: `${window.baseUrl}/pwd/isStrong`,
        method: "get",
        params:{
          inputStr: that.ruleForm.inputStr
        }
      }).then(res => {
        console.log("强度res:",res)
      })
      .catch(error=>{
        console.log("发生错误:",error)
        that.resultOne = '发生错误'
      })
    },
    getData2(){
      let that = this;
      this.$axios({
        url: `${window.baseUrl}/pwd/generateByPolicy`,
        method: "get",
        params:{
          policyId: that.ruleForm.policyId,
          pwdLen: that.ruleForm.pwdLen
        }
      }).then(res => {
        console.log("强度res-2:",res)
        that.resultTwo = '通过'
      })
      .catch(error=>{
        console.log("发生错误:",error)
        that.resultTwo = '发生错误2'
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
          this.getData()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    submitForma(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getData2()
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
  .zhoz_br {
    /* for FF,Opera ，固定宽度;隐藏多余的字符*/
    overflow:hidden;
    /* for IE,Safari ，支持自动换行*/
    word-wrap:break-word;word-break:normal;
  }
  
</style>
