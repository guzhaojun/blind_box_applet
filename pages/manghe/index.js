// pages/category/index.js
// 导入request请求工具类
import {getBaseUrl,requestUtil} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseUrl:'',
    //设置竖向滚动条位置
    scrollTop:0,
    //当前选中左侧菜单的索引
    currentIndex:0,
    //左侧菜单数据
    leftMenuList:[],
    //右侧商品数据
    rightContext:[]
  },
  //所有商品类别数据
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl
    })
    this.getCates();
  },
  // 获取商品分类数据
  async getCates(){
    const result = await requestUtil({url: '/product/list',method:"GET",data:{pageNum:1,pageSize:1000}});
    this.Cates=result.data.list;
    let leftMenuList=this.Cates.map(v=>v.name)
    let rightContext=this.Cates[0].productSwiperImageList;
    this.setData({
      leftMenuList,
      rightContext
    })
  },
   // 获取商品分类数据(从首页过来)
   async getCates2(index){
    const baseUrl = getBaseUrl();
    const result = await requestUtil({url: '/bigtype/findCategories',method:"GET"});
    this.Cates=result.data.list;
    let leftMenuList=this.Cates.map(v=>v.boxName)
    let rightContext=this.Cates[index].productSwiperImageList;
    this.setData({
      leftMenuList,
      rightContext,
      currentIndex:index,
      scrollTop:0,
      baseUrl
    })
  },
//左侧菜单点击切换事件
  handleMenuItemChange(e){
    const {index}=e.currentTarget.dataset;
    let rightContext=this.Cates[index].productSwiperImageList;
    this.setData({
      currentIndex:index,
      rightContext,
      scrollTop:0
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
  onShow:function() {
    const app =getApp();
    const {index}=app.globalData;
    if(index!=-1){
      this.getCates2(index);
      //从首页跳转过来
      app.globalData.index=-1;//重置index
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