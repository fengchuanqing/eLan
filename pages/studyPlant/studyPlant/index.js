// pages/studyPlant/studyPlant/index.js
import {
  XlycXlcs
} from '../../../apis/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curNavItem: 0,
    information: {},
    farmRz: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').hasFarm : false,
    hasFarm: wx.getStorageSync('userInfo').hasFarm
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
    this.setData({
      farmRz: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').hasFarm : false,
      hasFarm: wx.getStorageSync('userInfo').hasFarm || false
    })
    this.getXlycXlcs()
  },
  getXlycXlcs() {
    XlycXlcs({
      openid: wx.getStorageSync('thirdSession').openid,
      // lxdh:15666666666,
    }).then((res) => {
      if (res) {
        this.setData({
          information: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  changeNav(e) {
    const idx = e.currentTarget.dataset.idx
    if (idx === 2 && !this.data.hasFarm) {
      this.setData({ 
        showAuthentication: true,
        authUrl: '/pages/studyPlant/attestation/index'
      })
      return
    }
    if (idx === 0) {
      wx.setNavigationBarTitle({
        title: '跟着模型学'
      })
    } else if (idx === 1) {
      wx.setNavigationBarTitle({
        title: '跟着示范户学'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '小兰预测'
      })
    }
    this.setData({
      curNavItem: idx
    })
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