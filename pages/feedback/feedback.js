// pages/feedback/feedback.js
import {getBaseUrl,getWxLogin,getUserProfile,requestUtil} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minAddr: 0,
    maxAddr: 100,
    contentAddr: '',
  },
  inputeditAddr(e) {
      var value = e.detail.value;
      console.log(value,'dndndnd')
    let dataset = e.currentTarget.dataset;
    this.data[dataset.obj] = value;
    var len = parseInt(value.length);
    if (len > this.data.maxAddr) return;
    this.setData({currentWordNumberAddr: len});
    if (this.data.currentWordNumberAddr == 100) 
    {wx.showModal({title: '提示',content: '您输入的次数已达上限',})}},
  /**
   * 生命周期函数--监听页面加载
   */
  async handledel(){
      console.log(this.data.contentAddr)
      if(!this.data.contentAddr) {
        wx.showToast({
            title:'请填写反馈',
            icon:'none',
            mask:true
          })
          return
      }
    const result = await requestUtil({url: '/suggestInfo',data:{
        content:this.data.contentAddr
    },method:"post"});
    wx.showToast({
        title: '反馈成功',
        icon:'none'
      })
      wx.navigateBack()
  },
  onLoad(options) {

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