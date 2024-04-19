// pages/product_detail/index.js
// 导入request请求工具类
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
    data: {
        baseUrl: '',
        productObj: {},
        boxinfoDetails: [],
        activeIndex: 0,
        cart: [],
        lotteryList: []
    },
    productInfo: {},

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const baseUrl = getBaseUrl();
        this.setData({
                baseUrl
            }),
            this.getProductDetail(options.id),
            this.getRecordList()
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
            url: '/boxInfo/' + id,
            method: "GET"
        });
        this.productInfo = result.data;
        console.log(this.productInfo)
        this.setData({
            productObj: result.data,
            boxinfoDetails: result.data.productSwiperImageList
        })
    },

    // 获取商品详情
    async getRecordList() {
        const result = await requestUtil({
            url: '/mystery/record/list',
            method: "GET",
            data: {
                pageSize: 1000,
                pageNum: 1
            }
        });
        let lotteryList = result.data.list;
        this.setData({
            lotteryList: lotteryList
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
        wx.switchTab({
            url: '/pages/cart/index',
        })
    },
    //上一想
    async shangBox(e) {
        console.log(JSON.stringify(e))
        let id = e.currentTarget.dataset.id.id
        let boxType = e.currentTarget.dataset.id.boxType
        const result = await requestUtil({
            url: '/boxInfo/shangBox',
            method: "GET",
            data: {
                id: id,
                boxType: boxType
            }
        });
        let productObj = result.data;
        this.setData({
            productObj: productObj
        })
    },


    //下一想
    async xiaBox(e) {
        let id = e.currentTarget.dataset.id.id
        let boxType = e.currentTarget.dataset.id.boxType
        const result = await requestUtil({
            url: '/boxInfo/xiaBox',
            method: "GET",
            data: {
                id: id,
                boxType: boxType
            }
        });
        let productObj = result.data;
        this.setData({
            productObj: productObj
        })
    },

    async handleSize(e) {
        // 加入购物车
        //抽奖
        console.log("aaaaaa", e.currentTarget.dataset.id);
        let id = e.currentTarget.dataset.id.id;
        let type1 = e.currentTarget.dataset.id.boxType
        if (type1 == 2) {
            const result = await requestUtil({
                url: '/mystery/boxProduct/yfsAddOrder',
                method: "POST",
                data: {
                    boxId: id,
                    numberOfPrizes: 1
                }
            });
            console.log("抽奖返回", result);
            wx.setStorageSync('orderId',result.data)
        } else if (type1 == 3) {
            const result = await requestUtil({
                url: '/mystery/boxProduct/mlsAddOrder',
                method: "POST",
                data: {
                    boxId: id,
                    numberOfPrizes: 1
                }
            });
            console.log("抽奖返回", result);
            wx.setStorageSync('orderId',result.data)
        }
       console.log(this.data.productObj.boxPrice,'this.data.productObj.boxPrice')
        wx.navigateTo({
            url: '/pages/paymls/paysuccess?price='+this.data.productObj.boxPrice,
        })
    },

    //加入购物车
    setCartadd(type) {

        //购物车不存在当前商品
        this.productInfo.num = 1;
        const size = wx.getStorageSync('size');
        console.log(size);
        let data = {
            productId: this.productInfo.id,
            num: this.productInfo.num,
            cartType: type,
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