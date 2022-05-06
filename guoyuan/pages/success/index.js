// pages/guoyuan/success/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if(options.data){
            const obj = JSON.parse(decodeURIComponent(options.data))
            this.setData({
                obj:obj
            })
        }
    },
    goBack(){
        wx.navigateBack({
          delta: 1,
        })
    }
})