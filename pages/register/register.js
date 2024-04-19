// pages/login/login.js
import {
    getBaseUrl,
    requestUtil,
    requestUpdateUtil
} from '../../utils/requestUtil.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
      name:null,
      password:null,
      phone:null,
      items: [
        {value: '1', name: '用户' ,checked: 'true'},
        {value: '2', name: '配送员' },
      ],
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    radioChange(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        const items = this.data.items
        for (let i = 0, len = items.length; i < len; ++i) {
          items[i].checked = items[i].value === e.detail.value
        }
        this.setData({
          items
        })
      },
    onLoad(options) {
  
    },
    async logins(){
        var value 
        console.log(this.data.items,'sdnn')
        this.data.items.map((item,i)=>{
            if(item.checked) {
                if(item.value == 1) {
                    value = 'yonghu'
                } else {
                    value = 'qishou'
                }
            }
        })
        console.log(value,'dndnd')
        const res = await requestUtil({
            url: '/user',
            method:"post",
            data: {
                username:this.data.name,
                role:value,
                password:this.data.password,
                phone:this.data.phone
            }
        });
        console.log(res,'resultresultresult')
        if(res.code==200) {
            wx.redirectTo({
              url: '/pages/login/login',
            })
        } else {
            wx.showToast({
                title:'请重新填写',
                icon:'none',
                mask:true
              })
        }
    },
    name_input(e){
      var text = e.detail.value;
      this.setData({ name : text })
    },
    p_input: function (e) {
      var text = e.detail.value;
      this.setData({ password: text })
    },
    phone_input(e){
        console.log(e,'dddndnnd')
        var text = e.detail.value;
        var regex = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if(text.length == 11) {
            const isPhone = regex.test(text);
            if(!isPhone) {
                return wx.showToast({
                    title:'手机号不正确',
                    icon:'none',
                    mask:true
                  })
            } else {
                this.setData({ phone: text })
            }
        }
      
    },
    ps_input: function (e) {
        var text = e.detail.value;
        this.setData({ passwords: text })
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