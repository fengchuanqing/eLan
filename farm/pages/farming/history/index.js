// pages/farm/farming/history/index.js
import {
    getFarmingRecords,
} from '../../../../apis/farm'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        jsShow: true, //主体显示基地
        userInfo: {
            sf: '主体'
        },
        List: [
        //     {
        //     jd: '基地',
        //     month: [
        //         {
        //             yue: '12',
        //             yueList: []
        //         },
        //         {
        //             yue: '11',
        //             yueList: []
        //         }
        //     ]
        // }
    ]
    },
    gogogo() {
        wx.redirectTo({
            url: "../tjns/index",
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userInfo: wx.getStorageSync('userInfo') || this.data.userInfo
        })
        if (this.data.userInfo.ztid == null || this.data.userInfo.ztid == "") {
            this.setData({
                jsShow: false
            })
        }
        getFarmingRecords().then(res => {
            console.log(res);
            if (res.code == 200) {
                console.log(res.data);
                if (res.data) {
                    let list = []
                    this.data.List.length = 0
                    if (this.data.jsShow) {
                        // 有基地
                        Object.keys(res.data).map(key => {
                            res.data[key].forEach(item => {
                                Object.keys(item).map(ke => {
                                    list.push({
                                        jd: key,
                                        month: [{
                                            yue: ke,
                                            yueList: item[ke]
                                        }]
                                    })
                                })

                            })
                        })
                    }else {

                    }
                    this.setData({
                        List: list
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