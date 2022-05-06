// pages/countryside/addFinish/addFinish.js
import {
    ztlxlb,
    fbtz,
} from '../../../apis/tycx.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tagList: [],
        selected: null,
    },
    navTo() {
        console.log(this.data.selected);
        if (this.data.selected) {
            if(this.data.jd){
            let data = {
                ...wx.getStorageSync('tyxcData'),
                ztlx: this.data.selected,
                jd:this.data.jd,
                wd:this.data.wd
            }
            fbtz(data).then((res) => {
                if (res) {
                    if (res.code == 200) {
                        wx.showToast({
                            title: '上传成功，待管理员审核',
                            icon: 'none',
                            success: () => {
                                setTimeout(() => {
                                    wx.switchTab({
                                        url: '/pages/countryside/index/index',
                                    })
                                }, 2000);
                            }
                        })
                    }else{
                        wx.showToast({
                            title: '发布失败',
                            icon: 'error',
                            success: () => {
                                setTimeout(() => {
                                    wx.switchTab({
                                        url: '/pages/countryside/index/index',
                                    })
                                }, 2000);
                            }
                        })
                    }
                }
            })}else{
                wx.showToast({
                    title: '请先授权',
                    icon: 'none'
                })
                setTimeout(() => {
                    wx.navigateBack({
                      delta: 0,
                    })
                }, 2000);
            }
        } else {
            wx.showToast({
                title: '请选择一个主题',
                icon: 'none'
            })
        }
        wx.navigateTo({
            url: 'url',
        })
    },
    selected(e) {
        console.log(e);
        this.setData({
            selected: e.currentTarget.dataset.id
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        if(options.lx){
            this.setData({
                selected:options.lx
            })
        }
        let that=this
        wx.getLocation({
            type: 'wgs84',
            success (res) {
                console.log(res);
                that.setData({
                     wd : res.latitude,
                    jd : res.longitude
                })
     
            }
           })
        ztlxlb().then((res) => {
            if (res) {
                this.setData({
                    tagList: res.data
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