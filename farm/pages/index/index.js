// pages/farm/index/index.js
// 在js中设置css变量

import {
    searchMassif
} from '../../../apis/farm'

let myStyle = `
height: 300rpx;
`

let chageStyle = `
height: 95vh;
`
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dw: {
            lon: '119.4650987323588',
            lat: "29.21075487441193"
        },
        keyword: "",
        viewData: {
            style: myStyle
        },
        bigMapShow: true, //大地图
        listB3bob6Nq: [],
        // 地块
        polygon: [{
            points: [{
                    latitude: 37.53088612588587,
                    longitude: 114.75629613050262
                },
                {
                    latitude: 38.44889836728831,
                    longitude: 114.75629613050262
                },
                {
                    latitude: 38.86127026913671,
                    longitude: 114.4301404515661
                }
            ],
            strokeWidth: 1,
            strokeColor: 'rgb(244, 251, 138)',
            fillColor: 'rgb(244, 251, 138)'
        }],
    },
    // 查询
    GoSearch() {
        let params = {
            mc: this.data.keyword
        }
        console.log(params);
        searchMassif(params).then(res => {
            if (res.code == 200) {
                if (res.data.length > 0) {
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
                        listB3bob6Nq: res.data
                    })
                } else {
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
    gogogoAdd() {
        wx.navigateTo({
            url: "../dk/add2/index",
        })
    },
    // 去详情页
    GoDetail(params) {
        console.log(params);
        wx.navigateTo({
            url: "../dk/detail/index" + '?id=' + params.currentTarget.dataset.item.id,
        })
    },
    onShareAppMessage() {
        return {};
    },
    GoBigMap() {
        if (this.data.bigMapShow) {
            this.setData({
                viewData: {
                    style: chageStyle
                }
            })
        } else {
            this.setData({
                viewData: {
                    style: myStyle
                }
            })
        }
        this.setData({
            bigMapShow: !this.data.bigMapShow
        })
    },
    gogogo() {
        wx.navigateTo({
            url: "../dk/guanli/index",
        })
    },
    gogogo1() {
        wx.navigateTo({
            url: "../lot/shebei/index",
        })
    },
    gogogo2() {
        wx.navigateTo({
            url: "../farming/history/index",
        })
    },
    gogogo3() {
        wx.navigateTo({
            url: "../farming/zncj/index",
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.openLocation({
        //     longitude: 119.606636,
        //     latitude: 29.314877,
        //     scale: 28,
        //     name: "",
        //     address: "",
        //     success: res => {
        //         console.log(res)
        //     }
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.GoSearch()
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