// pages/paysuccess/paysuccess.js
import {getBaseUrl,getWxLogin,getUserProfile,requestUtil} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart:[],
    baseUrl:'',
    totalPrice:0,
    totalNum:0,
    id:null,
    title:null,
    price:null,
    telNumber:null,
    address:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const address = wx.getStorageSync('address');
      if(options.id) {
          this.setData({
            address:address,
              id:options.id,
              price:options.price,
              title:options.title,
              payUrl:'localhost:9091/venueReservation/alipay/list?title=付款'+'&id='+options.id+'&price='+options.price
          })
      }
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
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
    let cart=wx.getStorageSync('cart')||[];
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      totalPrice+=v.price*v.num;
      totalNum+=v.num;
    })
    this.setData({
      cart,
      totalNum,
    //   address,
      totalPrice
    })
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

  paycomplet(){
        wx.redirectTo({
          url: '/pages/order/index',
        })
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