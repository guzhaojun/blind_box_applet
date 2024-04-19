// 导入request请求工具类
import {getBaseUrl,getWxLogin,getUserProfile,requestUtil} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'',
    cart:[],
    totalPrice:0,
    totalNum:0,
    bei:null,
    zhuo:null,
    ren:null,
    popupShow:false,
    address:null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    const address = wx.getStorageSync('address');
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl,
      address,
    })
  },
  dedf(){

    this.handleOrderPay()
  },
  
  changePopupView(){
    this.setData({
        popupShow:false
      })
  },
  //处理订单支付
  async handleOrderPay(){
      this.createOrder();
    // wx.login({
    //   timeout: 5000,
    //   success:(res)=>{
    //     console.log(res)
    //   }
    // })
    // let res = await getWxLogin();
    // console.log(res.code)
    // wx.getUserProfile({
    //   desc: '获取用户信息',
    //   success:(res)=>{
    //     console.log(res.userInfo.nickName,res.userInfo.avatarUrl)
    //   }
    // })

    // let res2 = await getUserProfile();
    // console.log(res2.userInfo.nickName,res2.userInfo.avatarUrl)

    //wx.login和wx.getUserProfile不能同时调用，要用Promise.all
    
  },
  
//请求后端获取用户token,获取openid通过调用code2Session接口
  async wxlogin(loginParam){
    const result = await requestUtil({url:"/user/wxlogin",data:loginParam,method:"post"});
    console.log(result);
    const token = result.data.token;
    if(result.code==200){
      //存储token到缓存
      wx.setStorageSync('token', token);
      //支付继续，创建订单
      console.log("支付继续走，创建订单");
      this.createOrder();
    }
  },
  //创建订单,把数据发送到后端并返回订单号
  async createOrder1(){
    
    try{
      const totalprice=this.data.totalPrice;
    //   const address=this.data.address[0].address
    //   const consignee=this.data.address[0].userName;
    //   const telNumber=this.data.address[0].telNumber;
      let goods=[];
      this.data.cart.forEach(v=>goods.push({
        goodsid:v.id,
        goodsnumber:v.stock,
        goodsprice:v.price,
        goodsname:v.name,
        goodspic:v.propic
      }))
      const orderParam={
        totalprice,
        // telNumber,
        goods,
        status:4,
        // eatNum:this.data.ren,
        message:this.data.bei,
        // tableNum:this.data.zhuo
      }
      console.log(orderParam,'orderParamorderParam')
      const res=await requestUtil({url:"/my/order/create",method:"POST",data:orderParam});
      console.log("orderNo="+res.orderNo);
      //删除缓存中已经支付的商品
      let newCart=wx.getStorageSync('cart');
      newCart=newCart.filter(v=>!v.checked);//filter处理，每次遍历得到v对象，得到未选中的商品
  
      //wx.setStorageSync('cart', newCart);
      wx.redirectTo({
        url: '/pages/order/index?type=4',
      })
    }catch(error){
      console.log(error);
      wx.showToast({
        title: '支付失败',
        icon:'none'
      })
    }

   
  },
  //创建订单,把数据发送到后端并返回订单号
  async createOrder(){
    try{
      const totalprice=this.data.totalPrice;
      const address=this.data.address[0].address
      const consignee=this.data.address[0].userName;
      const telnumber=this.data.address[0].telNumber;
      let goods=[];
      this.data.cart.forEach(v=>goods.push({
        goodsid:v.id,
        goodsnumber:v.stock,
        goodsprice:v.price,
        goodsname:v.name,
        goodspic:v.propic
      }))
      const orderParam={
        totalprice,
        // eatNum:this.data.ren,
        message:this.data.bei,
        // tableNum:this.data.zhuo,
        address,
        consignee,
        telnumber,
        goods
      }
      this.data.cart.forEach(item=>{
        requestUtil({url:"/cart/goods/" +item.id, method: "DELETE"})
      })
      const res=await requestUtil({url:"/my/order/create",method:"POST",data:orderParam});
      console.log("orderNo="+res.orderNo);
      //删除缓存中已经支付的商品
      let newCart=wx.getStorageSync('cart');
      newCart=newCart.filter(v=>!v.checked);//filter处理，每次遍历得到v对象，得到未选中的商品
      const result = await requestUtil({url:"/alipay/list",data:{
        id:res.data.orderNo,
        price:this.data.totalPrice,
        title:'结账'
      },method:"get"});

      console.log("支付结果：",result)
      //wx.setStorageSync('cart', newCart);
  
    //   wx.showToast({
    //     title: '支付成功',
    //     icon:'none'
    //   })
      wx.redirectTo({
        url: '/pages/paysuccess/paysuccess?id='+res.data.orderNo+'&price='+this.data.totalPrice,
      })
    }catch(error){
      console.log(error);
      wx.showToast({
        title: '支付失败',
        icon:'none'
      })
    }

   
  },
  bei_input : function(e){
    var text = e.detail.value;
    this.setData({ bei : text })
  },

  z_input: function (e) {
    var text = e.detail.value;
    console.log(text,'text')
    this.setData({ zhuo: text })
  },
  r_input:function(e) {
    var text = e.detail.value;
    this.setData({ ren: text })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function() {
    // const address = wx.getStorageSync('address');
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