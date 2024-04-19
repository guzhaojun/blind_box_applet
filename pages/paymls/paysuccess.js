// pages/paysuccess/paysuccess.js
import {getBaseUrl,getWxLogin,getUserProfile,requestUtil,requestUpdateUtil} from '../../utils/requestUtil.js';
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
      console.log(options,'optionsoptions')
          this.setData({
              price:options.price,
              telNumber:'localhost:9091/venueReservation/alipay/list?title=付款'+'&id='+new Date().getTime()+'&price='+options.price
          })
     
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    })
  },
   async paycomplet(){
    const res = await requestUpdateUtil({
        url: '/my/order/updateStatus',
        data: {
            status: 3,
            id:wx.getStorageSync('orderId')
        }
    });
    if(res.code==200){
        wx.navigateTo({
            url: '/pages/orderm/index',
          })
    }
   
  },
  async  shangBox(){
    const res = await requestUpdateUtil({
        url: '/my/order/updateStatus',
        data: {
            status: 2,
            id:wx.getStorageSync('orderId')
        }
    });
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
      totalPrice+=v.price*v.stock;
      totalNum+=v.stock;
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