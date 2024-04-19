
// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    address:[], //选择的地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  edit(e){
    var index = e.currentTarget.id
    console.log(e,'index')
    var item = this.data.addressList[index]
    var id = this.data.addressList[index].id
    wx.navigateTo({
      url: '/pages/edta/edta?item='+JSON.stringify(item)+'&id='+id,
    })
  },
  dian(e){
    var index = e.currentTarget.id
    var addressList = this.data.addressList
    addressList.map(item=>{
        item.disable = false
    })
    this.setData({
        addressList:addressList
    })
    addressList[index].disable = true
    this.setData({
      addressList,addressList
    })
    var address = []
       this.data.addressList.map(item=>{
         if(item.disable) {
            address.push(item)
         }
       })
       console.log(address,'add')
       this.setData({
        address:address
      })
      console.log(this.data.address)
       wx.setStorageSync('address',this.data.address)
  },
  diz(){
   wx.navigateBack()
  },
  ddd(){
    wx.showToast({
      title: '请选择地址！',
      icon:'error'
    })
  },
  jump(){
    wx.navigateTo({
      url: '/pages/edta/edta',
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
    if(wx.getStorageSync('addressList')) { //点击选择以后的地址列表 可多选
      var addressList = wx.getStorageSync('addressList')
      this.setData({
        addressList:addressList
       })
       var address = []
       this.data.addressList.map(item=>{
         if(item.disable) {
            address.push(item)
            this.setData({
              address:address
            })
         }
       })
       wx.setStorageSync('address',this.data.address)
    }
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