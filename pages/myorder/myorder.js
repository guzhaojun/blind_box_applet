// pages/myorder/myorder.js
import {
    requestUtil,
    requestUpdateUtil
} from '../../utils/requestUtil.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    name:null,
    totus:0,
    zto:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(wx.getStorageSync('isShow')) {
        this.setData({
            isShow:wx.getStorageSync('isShow')
        })
    }
    this.setData({
        name:wx.getStorageSync('loginData').nickname
    })
    this.qul('')
    this.qul(8)
  },

  async open(){
      console.log('wnwnw') //isShow:是否休息
    this.setData({
        isShow:!this.data.isShow
    })
    wx.setStorageSync('isShow',this.data.isShow)
    const res = await requestUtil({
        url: '/user/updateStatus',
        method:"post",
        data: {
            id:wx.getStorageSync('loginData').id,
            auditStatus:this.data.isShow?2:1
        }
    });
    if(res.code==200) {

    }
  },
  async qul(status){
      var ob;
      if(status == 8) {
          ob={
            orderStatus:8,
          }
      } else {
          ob={}
      }
    const res = await requestUtil({
        url: '/waimaiOrder/qishouList',
        method: "GET",
        data:ob
    });
    if(res.code == 200) {
        if(status == 8) {
            this.setData({
                totus:res.total
            })
        } else {
            this.setData({
                zto:res.total
            })
        }
        

    }
  },
  tui(){
      wx.redirectTo({
        url: '/pages/login/login',
      })
      wx.setStorageSync('loginData','')
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