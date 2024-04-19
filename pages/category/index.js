// pages/category/index.js
// 导入request请求工具类
import {
    getBaseUrl,
    requestUtil
} from '../../utils/requestUtil.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/index/index.js
Page({
    data: {
        items: [],
        tab:['一番赏','魔力赏'],
        tabIndex:0,
    },
    // 获取商品分类数据
    hans(e) {
        const {index}=e.currentTarget.dataset;
        console.log(index,'dndnd')
        this.setData({
            tabIndex: index
        })
        if(index == 0) {
            this.handleClickyi()
        } else {
            this.handleClickmls()
        }
    },
    async handleClickyi() {
        
        const result = await requestUtil({
            url: '/boxInfo/list',
            method: "GET",
            data: {
                pageNum: 1,
                pageSize: 1000,
                boxType: 2
            }
        });
        let items = result.rows;
        this.setData({
            items
        })
    },
     // 获取商品分类数据
     async handleClickmls() {
        const result = await requestUtil({
            url: '/boxInfo/list',
            method: "GET",
            data: {
                pageNum: 1,
                pageSize: 1000,
                boxType: 3
            }
        });
        let items = result.rows;
        this.setData({
            items
        })
    },


    
    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        })
    },
    onLoad: function () {
        const baseUrl = getBaseUrl();
        this.setData({
            baseUrl
        })
        this.handleClickyi();
    }
});