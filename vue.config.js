/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-11-17 21:35:52
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2020-11-17 22:26:26
 */
module.exports = {
  lintOnSave: false,
  devServer: {
　　　　open: true,
　　　　host: 'localhost',
　　　　port: 8080,
　　　　https: false,
　　　　//以上的ip和端口是我们本机的;下面为需要跨域的
　　　　proxy: {  //配置跨域
　　　　　　　　'/api': {
　　　　　　　　　　target: 'http://100.95.131.203:8080/',  //这里后台的地址模拟的;应该填写你们真实的后台接口
　　　　　　　　　　ws: true,
　　　　　　　　　　changOrigin: true,  //允许跨域
　　　　　　　　　　pathRewrite: {
　　　　　　　　　　　　'^/api': ''  //请求的时候使用这个api就可以
　　　　　　　　　　}
　　　　　　    }
　　　　}
　　}
}