import {
  domain,
  evaluateList
} from "../../../utils/api.js"
import {
  pjList
} from '../../../apis/message.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: domain,
    evaluateList: [],
    pageNum: 1,
    pageSize: 10,
    isReachBottom: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(domain);
    this.geData()
  },
  geData() {
    pjList({
      pageNum: this.data.pageNum,
    }).then(res => {
      if (res.code == 200) {
        let arr = res.data
        if (arr.length < 5 || arr.length == 0) {
          this.setData({
            isReachBottom: false
          })
        }
        arr.forEach(item => {
          item.star = Number(item.score) || 0
        })
        this.setData({
          evaluateList: [...this.data.evaluateList, ...arr]
        })
        console.log(this.data.evaluateList);
      } else {
        wx.showToast({
          icon: 'error',
          title: res.msg,
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
    if (this.data.isReachBottom) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.geData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})