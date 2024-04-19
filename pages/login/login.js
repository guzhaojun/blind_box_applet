// pages/login/login.js
import {
    requestUtil,
} from '../../utils/requestUtil.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:null,
    password:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  name_input(e){
    var text = e.detail.value;
    this.setData({ name : text })
  },
  p_input: function (e) {
    var text = e.detail.value;
    this.setData({ password: text })
  },
  jump(){
      wx.navigateTo({
        url: '../register/register',
      })
  },
  async logins(){
      if(!this.data.name) {
          return wx.showToast({
            title:'请输入用户名',
            icon:'none',
            mask:true
          })
      }
      if(!this.data.password) {
        return wx.showToast({
          title:'请输入密码',
          icon:'none',
          mask:true
        })
    }
    const res = await requestUtil({
        url: '/user/login',
        method:"post",
        data: {
            username:this.data.name,
            password:this.data.password,
        }
    });
    console.log(res,'resultresultresult')
    if(res.code==200) {
        wx.setStorageSync('loginData',res.data)
        if(res.data.role == 'qishou') {
            wx.redirectTo({
                url: '/pages/porder/porder',
              })
        } else {
            wx.switchTab({
                url: '/pages/index/index',
              })
        }
        const token = res.data.token;
        wx.setStorageSync('token', token);
    } else {
        wx.showToast({
            title:'账号或密码错误',
            icon:'none',
            mask:true
          })
    }
    wx.setStorageSync('isShow',false)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})