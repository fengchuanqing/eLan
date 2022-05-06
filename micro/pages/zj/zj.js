// pages/micro/zj/zj.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        let url;
        if (options.mobile) {
            url = options.url + '?mobile=' + options.mobile+ '?id=' + (options.id?options.id:'')
        }else if (options.articleId) {
            url = options.url + '?articleId=' + options.articleId
        }else if (options.TGC_XMZJ) {
            url = options.url + '?TGC_XMZJ=' + options.TGC_XMZJ
        }else{
            url=options.url
        } 
        this.setData({
            url: url
        })
        console.log(this.data.url);
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