// pages/edta/edta.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    telNumber:'',
    address:'',
    id:null,
    addId:null,
    index:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options && options.id) { //证明是编辑 ID就是list的下标
      this.setData({
        id:options.id
      })
    }
    if(options && options.item) {
        var item = JSON.parse(options.item)
        this.setData({
            userName:item.userName,
            telNumber:item.telNumber,
            address:item.address 
        })
    }
  },
  subMit(){ //点击确定首先确认是新加还是修改
    if(!this.data.userName || !this.data.telNumber || !this.data.address) {
      return
    }
    if (!/^1(3|4|5|7|8)\d{9}$/.test(this.data.telNumber)) {
      wx.showToast({
        title: '电话输入格式错误',
        icon: 'none',
        duration: 2000,
      })
    }
    if(this.data.id) {//修改
      var obj = {
        id:this.data.id,
        userName:this.data.userName,
        telNumber:this.data.telNumber,
        address:this.data.address,
      }
      if(this.data.id == 0) {
        obj.disable=true
      } else {
        obj.disable=false
      }
      var addressList = wx.getStorageSync('addressList')
      addressList.map((item,i)=>{
        if(i == this.data.id) {
          this.setData({
            index:i
          })
        }
      })
      addressList[this.data.index] = obj
      wx.setStorageSync('addressList',addressList)
    } else { //新增
      if(wx.getStorageSync('addressList').length) {
        this.setData({
          addId:wx.getStorageSync('addressList').length
        })
        var obj = {
          id:this.data.addId,
          userName:this.data.userName,
          telNumber:this.data.telNumber,
          address:this.data.address,
          disable:false
        }
        var addressList = wx.getStorageSync('addressList')
        addressList.push(obj)
        wx.setStorageSync('addressList',addressList)
      } else {
        var obj = {
          id:0,
          userName:this.data.userName,
          telNumber:this.data.telNumber,
          address:this.data.address,
          disable:true
        }
        var addressList = []
        addressList.push(obj)
        wx.setStorageSync('addressList',addressList)
      }
    }
    wx.navigateBack()

  },
  uname_input : function(e){
    var text = e.detail.value;
    this.setData({ userName : text })
  },

  tel_input: function (e) {
    var text = e.detail.value;
    this.setData({ telNumber: text })
  },
  address_input:function(e) {
    var text = e.detail.value;
    this.setData({ address: text })
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