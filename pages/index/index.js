// index.js
// 导入request请求工具类
import {getBaseUrl,requestUtil} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList:[],
    baseUrl:'',
    //商品大类数组
    bigTypeList:[],
    bigTypeList_row1:[],
    hotProductList:[],
    topRecommendOfUserId:[],
    aboatM:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const baseUrl=getBaseUrl();
         this.setData({
           baseUrl
         })
    //this.getL()
    // this.getBigTypeList();
    this.getHotProductList();
    // this.abo();
    this.getSwiperList();
  },
  getL(){
    wx.login({
        timeout: 5000,
        success:(res)=>{
            console.log(res,'rnrnnndn')
          this.wxlogin(res.code)
        },
        fail:(err)=>{
          reject(err)
        }
      })
  },
  //请求后端获取用户token
  async wxlogin(code){
    const result = await requestUtil({url:"/appletuser/wxlogin",data:{code:code},method:"post"});
    console.log(result);
    const token = result.data.token;
    if(result.code==200){
      //存储token到缓存
      wx.setStorageSync('token', token);
      this.getSwiperList();
      //支付继续，创建订单
      // console.log("支付继续走，创建订单");
      // this.createOrder();
    }
  },
  //商品大类点击事件跳转商品分类
  handleTypeJump(e){
    const {index}=e.currentTarget.dataset;
    const app=getApp();
    app.globalData.index=index;
    wx.switchTab({
      url: '/pages/category/index'
    })
  },
  
  jump(e) {
    const {
        index
    } = e.currentTarget.dataset;
    console.log(index, 'dndnd')
    wx.setStorageSync('currentIndex', index)
    if(index==0){
        wx.switchTab({
            url: '/pages/manghe/index',
        })
    }
    if(index==1){
        wx.switchTab({
            url: '/pages/category/index',
        })
    }
    if(index==2){
        wx.redirectTo({
            url: '/pages/cart/index',
        })
    }

},


  async getSwiperList(){
    const result = await requestUtil({url: '/config/list',data:{},method:"POST"});
    console.log(result,'resultresultresult')
    this.setData({
      swiperList:result.data
    })
  },
  async abo(){
    const result = await requestUtil({url: '/AboutMe/list',method:"GET"});
   console.log(result,'resultresult')
   this.setData({
    aboatM:result.data[0]
   })
  },
  // 获取热卖商品
  async getHotProductList(){
    const result = await requestUtil({url: '/boxInfo/list',method:"GET"});
    this.setData({
      hotProductList:result.rows,
    })
  },

  oncd(){
      wx.switchTab({
        url: '/pages/category/index',
      })
  },

  async getBigTypeList(){
    const result = await requestUtil({url: '/bigtype/findAll',method:"GET"});
    const bigTypeList=result.data.message;
    const bigTypeList_row1=bigTypeList;

    this.setData({
      bigTypeList,
      bigTypeList_row1,
    })
  }
})