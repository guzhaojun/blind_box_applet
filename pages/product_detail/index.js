// pages/product_detail/index.js
// 导入request请求工具类
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        baseUrl: '',
        productObj: {},
        activeIndex: 0,
        cart: []
    },

    QueryParams: {
        id: 1
    },
    productInfo: {

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        })
        this.getProductDetail(options.id)

        // requestUtil({url:"/cart", method: "GET"}).then(res => {
        //   if (res.code === 0) {
        //     // console.log(res.carts)
        //     this.cart = res.carts;
        //   }
        // });
        // console.log(this.cart)
    },
    //tab点击事件
    handleItemTap(e) {
        const {
            index
        } = e.currentTarget.dataset;
        this.setData({
            activeIndex: index
        })
    },


    // 获取商品详情
    async getProductDetail(id) {
        const result = await requestUtil({
            url: '/productSwiperImage/' + id,
            method: "GET"
        });
        this.productInfo = result.data;
        console.log(this.productInfo)
        this.setData({
            productObj: result.data
        })
    },
    //点击轮播图 放大预览
    handlePrevewImage(e) {
        console.log(e.currentTarget.dataset.url)
        const urls = this.productInfo.image;
        console.log(urls)
        const current = e.currentTarget.dataset.url;
        wx.previewImage({
            current: urls[0],
            urls: urls,
        })
    },
    //点击事件 商品加入购物车
    handleCartAdd() {
        this.setCartadd();
    },
    //点击立即购买
    handleBuy() {
        this.setCartadd();
        //区分这是普通商品
        wx.navigateTo({
            url: '/pages/cart/index?type=3',
        })
    },
    //加入购物车
    setCartadd() {
        //let cart = wx.getStorageSync('cart')||[];
        // requestUtil({url:"/cart", method: "GET"}).then(res => {
        //   if (res.code === 0) {
        //     // console.log(res.carts)
        //     this.cart = res.carts;
        //   } 
        // });
        // console.log(this.cart)
        // let index = this.cart.findIndex(v=>v.id===this.productInfo.id);
        // if(index===-1){

        // }

        // else{
        //   //购物车已经存在商品
        //   cart[index].num++;
        //   console.log(cart[index])
        //   let data = {id:cart[index].id,num:cart[index].num};
        //   // requestUtil({url:"/cart", method: "PUT",data:data}).then(res => {
        //   //   if (res.code === 0) {
        //   //     // console.log(res.carts)
        //   //     //this.cart = res.carts;
        //   //   } 
        //   // });
        // }

        //购物车不存在当前商品
        this.productInfo.num = 1;
        // this.productInfo.checked=true;
        //cart.push(this.productInfo);
        const size = wx.getStorageSync('size');
        console.log(size);
        let data = {
            productId: this.productInfo.id,
            num: this.productInfo.num,
        
        };

        requestUtil({
            url: "/cart",
            method: "POST",
            data: data
        }).then(res => {
            if (res.code === 200) {
                wx.showToast({
                    title: '加入成功',
                    icon: 'success',
                    mask: true
                })
                // console.log(res.carts)
                //this.cart = res.carts;
            }
        });


        // wx.setStorageSync('cart', cart);//把购物车添加到缓存中
    },
    async handleCollect() {

        const id = this.productInfo.id;
        console.log(this.productInfo.id)
        this.QueryParams.id = id;
        console.log(this.QueryParams);
        const res = await requestUtil({
            url: '/collect/create',
            data: this.QueryParams
        });
        console.log(res);
        wx.showToast({
            title: res.msg,
            icon: 'success',
            mask: true
        })
    },

    async handleSize() {
        wx.navigateTo({
            url: '/pages/size/index',
        })
    },

    //商品收藏
    // handleCollect(){
    //   let isCollect = false;
    //   let collect = wx.getStorageSync('collect')||[];
    //   let index = collect.findIndex(v=>v.id===this.productObj.id);
    //   if(index!==-1){
    //     collect.splice(index,1);
    //     isCollect=false;
    //     wx.showToast({
    //       title: '取消成功',
    //       icon:'success',
    //       mask:true
    //     });
    //   }else{
    //     collect.push(this.productObj)
    //     isCollect=true;
    //     wx.showToast({
    //       title: '收藏成功',
    //       icon:'success',
    //       mask:true
    //     });
    //   }
    //   wx.setStorageSync('collect', collect);
    //   this.setData({
    //     isCollect
    //   })
    // },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {


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