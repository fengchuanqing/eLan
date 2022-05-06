// pages/farm/dk/detail.js

import {
    searchMassif
} from '../../../../apis/farm'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: "",
        active: 0,
        dw: {
            lon: '119.4650987323588',
            lat: "29.21075487441193"
        },
        item: {},
        // 地块
        polygon: [{
            points: [],
            strokeWidth: 1,
            strokeColor: '#FF0000DD',
            fillColor: '#7cb5ec88'
        }],
    },
    /**
     * 生命周期函数--监听页面加载
     */
    GetDetailData() {
        let params = {
            id: this.data.id,
            List: []
        }

        searchMassif(params).then(res => {
            if (res.code == 200) {
                console.log(res.data[0]);
                this.data.polygon[0].points = res.data[0].jwdList
                this.setData({
                    item: res.data[0],
                    polygon: this.data.polygon,
                    dw: {
                        lon: res.data[0].jwdList[0].longitude,
                        lat: res.data[0].jwdList[0].latitude
                    }
                })
                this.data.List.forEach((item, i) => {
                    if (item.id == this.data.item.id) {
                        this.setData({
                            active: i
                        })
                    }
                })
            }
        })
    },
    onClick(event) {
        console.log(event);
        let arr = this.data.List.filter(item => {
            return item.dkmc == event.detail.title
        })
        this.setData({
            id: arr[0].id
        })
        this.GetDetailData()
    },
    onLoad: function (options) {
        // tabs
        searchMassif().then(res => {
            if (res.code == 200) {
                this.setData({
                    List: res.data
                })
                if (options.id) {
                    this.setData({
                        id: options.id
                    })
                    this.GetDetailData()
                } else {
                    this.setData({
                        active: 0,
                        id: res.data[0].id
                    })
                    this.GetDetailData()
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})