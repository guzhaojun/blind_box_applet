// pages/my/index.js
// 导入request请求工具类
import {getBaseUrl,getWxLogin,getUserProfile,requestUtil} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    const userInfo=wx.getStorageSync('userInfo');
    if(!userInfo){
     wx.showModal({
       title:'友情提示',
       content:'微信授权登录后，才可进入个人中心',
       success:(res)=>{
          Promise.all([getUserProfile()]).then((res)=>{
            console.log(res[0].userInfo.nickName,res[0].userInfo.avatarUrl);
            wx.setStorageSync('userInfo', res[0].userInfo);
            //this.wxlogin(loginParam);
            this.setData({
              userInfo:res[0].userInfo
            })
          }).catch(err=>{
            console.log(err)
          })
        }
      })
    }else{
      const userInfo=wx.getStorageSync('userInfo')
      this.setData({
        userInfo
      })
    }
  },
  
  //点击编辑收货地址
  handleEditAddress(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  //退出登录
  handleLoginOut(){
    this.setData({
      userInfo:''
    })
    //wx.setStorageSync('userInfo','')
    // wx.switchTab({
    //   url: '../index/index',
    // })
    wx.redirectTo({
        url: '/pages/login/login',
      })
      wx.setStorageSync('loginData','')
  },

  handleCollect(){
    wx.navigateTo({
      url: '/pages/collect/index'
    })
  },
  yij(){
    wx.navigateTo({
        url: '/pages/feedback/feedback'
      }) 
  },
  ordre(){
    wx.navigateTo({
        url: '/pages/orderm/index'
      })
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