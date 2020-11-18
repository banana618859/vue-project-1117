<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-11-18 10:47:43
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-11-18 10:50:33
-->
<template>
  <div>
    <div>
      强口令密码判断：&nbsp;
      <input class="input" placeholder="请输入密码" type="password" v-model="inputStr"/>
      <button @click="checkPassword()">校验密码</button>
      <span style="margin: 20px;">{{ result1 }}</span>
    </div>
    <div>生成安全口令：&nbsp;
      <select default="0" v-model="policyId">
        <option value="0">选择策略ID</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <input @blur="maxNum(pwdLen)" class="input" placeholder="请输入密码长度" type="number" v-model="pwdLen"/>
      <button @click="createPassword()">生成密码</button>
      <span style="margin: 20px;">{{ result2 }}</span>
    </div>
  </div>
</template>

<script>
  // import { axios } from '@/utils/request'

  export default {
    name: 'password',
    data () {
      return {
        result1: '',
        result2: '',
        inputStr: '',
        policyId: 0,
        pwdLen: 20
      }
    },
    methods: {
      maxNum (value) {
        if (value > 200) {
          this.pwdLen = 200
        } else if (value < 0) {
          this.pwdLen = 0
        }
      },
      checkPassword () {
        this.$axios({
          url: 'http://100.95.131.203:8080/pwd/isStrong?inputStr=' + this.inputStr,
          method: 'get'
        }).then(res => {
          if (res) {
            this.result1 = '是'
          } else {
            this.result1 = '否'
          }
        })
      },
      createPassword () {
        this.$axios({
          url: 'http://100.95.131.203:8080/pwd/generateByPolicy?policyId=' + this.policyId + '&pwdLen=' + this.pwdLen,
          method: 'get'
        }).then(res => {
          this.result2 = res
        })
      }
    }
  }
</script>
<style>
  .input {
    margin: 10px;
  }
</style>