// specialZone/pages/rxcp/rxcp.js
import {
    Rxtscplb,
    img
} from '../../../apis/specialZone.js'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        page: 1
    },
    getRxtscplb(page = 1) {
        if(this.data.list.length>=(page-1)*6){
        Rxtscplb({
            page,                                                                                                                             
            size: 6
        }).then((res) => {
            if (res) {
                console.log(res.data);
                res.data.map((item) => {
                    item.img = item.img.split(',').reduce((acc, cur) => acc.concat(img + cur), [])
                })
                console.log(res.data);
                this.setData({
                    list:[...this.data.list,...res.data]
                })
            }
        })}
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getRxtscplb()
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
        this.data.page++
        this.getRxtscplb(this.data.page)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})