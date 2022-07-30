// pages/farm/dk/add1/index.js
import {
    searchMassif
} from '../../../../apis/farm'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: '',
        dw: {
            lon: '119.4650987323588',
            lat: "29.21075487441193"
        },
        polygon: [{
            points: [
                // {
                //     latitude: 37.53088612588587,
                //     longitude: 114.75629613050262
                // },
            ],
            strokeWidth: 1,
            strokeColor: '#FF0000DD',
            fillColor: '#7cb5ec88'
        }],
    },
    gogogo() {
        wx.navigateTo({
            url: "../add2/index",
        })
    },
    // 查询
    GoSearch() {
        let params = {
            mc: this.data.keyword
        }
        searchMassif(params).then(res => {
            if (res.code == 200) {
                if (res.data) {
                    this.setData({
                        dw: {
                            lon: res.data[0].jwdList[0].longitude,
                            lat: res.data[0].jwdList[0].latitude
                        }
                    })
                } else {
                    this.setData({
                        dw: {
                            lon: '119.4650987323588',
                            lat: "29.21075487441193"
                        }
                    })

                }
                if (res.data.length > 0) {} else {
                    wx.showToast({
                        title: '一条数据都没有',
                        icon: 'none'
                    })
                }
            }
        })
    },
    GetKeyWord(event) {
        const {
            detail
        } = event
        this.setData({
            keyword: detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        searchMassif().then(res => {
            if (res.code == 200) {
                if(res.data) {
                this.data.polygon.length = 0
                res.data.forEach(item => {
                    this.data.polygon.push({
                        points: item.jwdList,
                        strokeWidth: 1,
                        strokeColor: '#FF0000DD',
                        fillColor: '#7cb5ec88'
                    })
                })
                this.setData({
                    polygon: this.data.polygon,
                    List: res.data
                })
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