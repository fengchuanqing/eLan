// pages/micro/mhjqDetails/mhjqDetails.js
import {
    getjqxq,
    img
} from "../../../apis/micro"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        obj: {},
        imgUrl: img,
        mz: '',
        jqyw: ''
    },
    navTo(e) {
        wx.navigateTo({
            url: '/micro/pages/video/video?dz=' + e.currentTarget.dataset.url+'&bt='+e.currentTarget.dataset.bt,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            mz: options.mz,
            jqyw: options.jqyw
        })
        getjqxq({
            id: options.id,
            openId:wx.getStorageSync('thirdSession').openid
        }).then((res) => {
            if (res) {
                this.setData({
                    obj: res.data
                })
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