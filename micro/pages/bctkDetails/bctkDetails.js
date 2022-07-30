// pages/micro/bctkDetails/bctkDetails.js
import {
  bdtkxq,
  img2
} from "../../../apis/micro"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIPhoneXSeries: getApp().globalData.isIPhoneXSeries,
    show: 0,
    img: img2,
    dataObj: {},
    imgList: []
  },
  navTo() {
    wx.navigateTo({
      url: '/pages/nanny/nanny/index',
    })
  },
  select(v) {
    this.setData({
      show: v.currentTarget.dataset.serial,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    bdtkxq({
      id: options.id
    }).then((res) => {
      if (res) {
        console.log(res);
        this.setData({
          dataObj: res.data,
          imgList: res.data.tp.split(',')
        })
        console.log(this.data.imgList);
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
    return {
      title: '病虫图库详情',
      path: '/pages/micro/bctkDetails/bctkDetails'
    }
  }
})