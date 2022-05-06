// pages/guoyuan/guoyuan/index.js
Page({
    clickCarWin() {
        var that = this;
        wx.navigateTo({
          url: '../home/index',
        })
        // wx.chooseImage({
        //     count: 1,
        //     success: function (res) {
        //         // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
        //         var filePath = res.tempFilePaths[0];
        //         //将刚才选的照片/拍的 放到下面view视图中
        //         wx.uploadFile({
        //           url: "http://172.16.2.50:89/bs/common/upload",
        //           filePath: filePath,
        //           name: 'file',
        //           success: function (res) {
        //               const data = JSON.parse(res.data)
        //             wx.navigateTo({
        //               url: '/guoyuan/pages/shibie/index?pic='+data.fileName,
        //             })
        //           }
        //         })
        //     },
        //     fail: function (error) {
        //         console.error("调用本地相册文件时出错")
        //         console.warn(error)
        //     },
        //     complete: function () {

        //     }
        // });
    },
    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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