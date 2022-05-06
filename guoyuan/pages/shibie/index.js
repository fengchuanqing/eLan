// pages/guoyuan/shibie/index.js
import {
    gygjsglx,
    domain,
    cqsb
} from '../../../apis/aqyy'
Page({
    clickCarWin() {
        var that = this;
        that.setData({
            isloaging: false
        })
        const params = {
            tpdz: this.data.pic,
            zwId: this.data.zwList[this.data.curZw].id
        }
        cqsb(params).then(res => {
            let url = ''
            if (res) {
                if (res.data) {
                    url = "/guoyuan/pages/success/index?data=" + encodeURIComponent(JSON.stringify(res.data))
                } else {
                    url = "/guoyuan/pages/fail/index?pic=" + this.data.pic
                }
            } else {
                url = "/guoyuan/pages/fail/index?pic=" + this.data.pic
            }
            wx.redirectTo({
                url: url,
            })
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        domain,
        isloaging: true,
        zwList: [],
        curZw: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (options.pic) {
            this.setData({
                pic: options.pic
            })
        }
        this.gygjsglx()
    },
    gygjsglx() {
        gygjsglx().then(res => {
            if (res) {
                this.setData({
                    zwList: res.data
                })
            }
        })
    },
    changeZw(e) {
        this.setData({
            // curZw: e.currentTarget.dataset.idx//暂时只选中杨梅
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