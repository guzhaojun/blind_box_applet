// pages/porder/porder.js
import {
    requestUtil,
    requestUpdateUtil
} from '../../utils/requestUtil.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:['待抢单','待取餐','配送中','已送达'],
    tabIndex:0,
    orders:[],
    status: 2,
    page: 1, //第几页
    pageSize: 10, //每页记录数
    QueryParams: {
        
    },
    totalPage:1,
    qutotal:1,
    qupage: 1, //第几页
    isShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
      this.getOrders()
      //支付继续，创建订单
      // console.log("支付继续走，创建订单");
      // this.createOrder();
    }
  },
  //接口参数
  

  async getOrders() {
    const res = await requestUtil({
        url: '/my/order/list',
        data: {
            status: this.data.status,
            page: this.data.page, //第几页
            pageSize: 10 //每页记录数
        }
    });
    if(res.code == 200) {
        this.setData({
            totalPage:res.total,
            orders: [...this.data.orders, ...res.rows]
        })
        console.log(this.data.orders,'this.data.ordersthis.data.ordersthis.data.orders')
    }
   
},
    async qiang(e){
        console.log(this.QueryParams,'this.QueryParams')
        var index = e.target.dataset.index //点击列表选择的下标 请求用
        console.log(index)
        if(!this.data.isShow) {
            wx.showToast({
                title: '请先去个人中心开启接单',
                icon:'none'
            })
            return
        }
        const res = await requestUtil({
            url: '/waimaiOrder',
            data:{orderId:index},
            method: "POST"
        });
        if(res.code == 200) {
            this.setData({
                status: 2,
                page: 1, //第几页
                pageSize: 10, //每页记录数
                orders: []
            })
            this.getOrders();
            console.log(this.data.orders,'this.data.ordersthis.data.ordersthis.data.orders')
        }
    },
    async uporder(e){
        var index = e.target.dataset.index //点击列表选择的下标 请求用
        console.log(index)
        if(!this.data.isShow) {
            wx.showToast({
                title: '请先去个人中心开启接单',
                icon:'none'
            })
            return
        }
        if(this.data.tabIndex == 1) { //7 配送中
            const res = await requestUtil({
                url: '/waimaiOrder',
                data:{id:index,orderStatus:7},
                method: "PUT"
            });
            if(res.code == 200) {
                this.setData({
                    qupage: 1, //第几页
                    pageSize: 10, //每页记录数
                    orders: []
                })
                this.qil(5);
                console.log(this.data.orders,'this.data.ordersthis.data.ordersthis.data.orders')
            }
        } else if(this.data.tabIndex == 2) { //7 已送达
            const res = await requestUtil({
                url: '/waimaiOrder',
                data:{id:index,orderStatus:8},
                method: "PUT"
            });
            if(res.code == 200) {
                this.setData({
                    qupage: 1, //第几页
                    pageSize: 10, //每页记录数
                    orders: []
                })
                this.qil(7);
                console.log(this.data.orders,'this.data.ordersthis.data.ordersthis.data.orders')
            }
        }
    },
    //骑手订单
    async qil(status){
        this.setData({
            status: 2,
            page: 1, //第几页
            pageSize: 10, //每页记录数
            orders: [],
            totalPage:1
        })
        const res = await requestUtil({
            url: '/waimaiOrder/qishouList',
            method: "GET",
            data:{
                page:this.data.qupage,
                pageSize:10,
                orderStatus:status,
            }
        });
        if(res.code == 200) {
            res.rows.map(item=>{
                item.createdTimes = this.timed(item.createdTime,'YYYY-MM-DD')
            })
            this.setData({
                qutotal:res.total,
                orders: [...this.data.orders, ...res.rows]
            })
           
        }
    },
    handleItemTap(e){
        var index = e.currentTarget.dataset.index        //点击列表选择的下标 请求用
        this.setData({
            tabIndex:index
        })
        if(index == 0) {
            this.onPullDownRefresh()
        } else if(index == 1) {
            this.qil(5)
        }else if(index == 2) {
            this.qil(7)
        }else if(index == 3) {
            this.qil(8)
        }
    },
    timed(time,fmt){
        let date = new Date(time);
        if (/(Y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, date.getFullYear() + '').substr(4 - RegExp.$1.length)
        }
        let o = {
            'M+': date.getMonth() + 1,
            'D+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let key in o) {
            if (new RegExp(`(${key})`).test(fmt)) {
                let str = o[key] + ''
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
            }
        }
        return fmt
    },
    padLeftZero(str) {
        return ('00' + str).substr(str.length)
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
      this.getOrders()
      this.setData({
          isShow:wx.getStorageSync('isShow')
      })
    // wx.hideTabBar()
    //this.getL()
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
      if(this.data.tabIndex == 0) {
            this.setData({
                status: 2,
                page: 1, //第几页
                pageSize: 10, //每页记录数
                orders: []
            })
            this.getOrders();
      } else if(this.data.tabIndex == 1) {
        this.setData({
            qupage: 1, //第几页
        })
        this.qil(5);
      }else if(this.data.tabIndex == 2) {
        this.setData({
            qupage: 1, //第几页
        })
        this.qil(7);
      }else if(this.data.tabIndex == 3) {
        this.setData({
            qupage: 1, //第几页
        })
        this.qil(8);
      }
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("触底了")
    if(this.data.tabIndex == 0) {
        if (this.data.orders.length >= this.data.totalPage) {
            //没有下一页数据
            wx.showToast({
                title: '没有下一页数据了',
                icon:'none'
            })
        } else {
            var page = this.data.page
            var pages = page+1
            console.log(pages,'QueryParamsQueryParams')
            this.setData({
                status: 2,
                page: pages, //第几页
                pageSize: 10 //每页记录数
            })
            this.getOrders();
        }
    } else if(this.data.tabIndex == 1) {
        if (this.data.orders.length >= this.data.qutotal) {
            //没有下一页数据
            wx.showToast({
                title: '没有下一页数据了',
                icon:'none'
            })
        } else {
            var page = this.data.qupage
            var pages = page+1
            this.setData({
                qupage: pages, //第几页
            })
            this.qil(5);
        }
    }else if(this.data.tabIndex == 2) {
        if (this.data.orders.length >= this.data.qutotal) {
            //没有下一页数据
            wx.showToast({
                title: '没有下一页数据了',
                icon:'none'
            })
        } else {
            var page = this.data.qupage
            var pages = page+1
            this.setData({
                qupage: pages, //第几页
            })
            this.qil(7);
        }
    }else if(this.data.tabIndex == 3) {
        if (this.data.orders.length >= this.data.qutotal) {
            //没有下一页数据
            wx.showToast({
                title: '没有下一页数据了',
                icon:'none'
            })
        } else {
            var page = this.data.qupage
            var pages = page+1
            this.setData({
                qupage: pages, //第几页
            })
            this.qil(8);
        }
    }

        
  },
  jums(){
      wx.navigateTo({
        url: '/pages/myorder/myorder',
      })
  },
  /**
   * 用户点击右上角分享
   */
//   onShareAppMessage() {

//   }
})