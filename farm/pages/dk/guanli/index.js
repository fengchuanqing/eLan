// pages/farm/dk/guanli/index.js

import {
    searchMassif
} from '../../../../apis/farm'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    gogogo() {
        wx.navigateTo({
            url: "../add1/index",
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        searchMassif().then(res => {
            if (res.code == 200) {
                console.log(res.data);
                //  console.log('求数组对象属性求和');
                const sum = res.data.reduce((c, R) => c * 1 + R.dkmj * 1, 0)
                this.setData({
                    List: res.data,
                    sum: sum.toFixed(2)
                })
            }
        })
    },
    GoDkList() {
        wx.navigateTo({
            url: "../detail/index"
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