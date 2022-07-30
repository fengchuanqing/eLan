// pages/MerchantCenter/offlineOrder/offlineOrder.js
import {
  offlineOrderList
} from "../../../utils/api.js"
import {
  OffOnlineList
} from '../../../apis/message.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 10,
    pageNum: 1,
    isReachBottom: true,
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  getData() {
    wx.request({
      url: offlineOrderList,
      method: 'GET',
      data: {
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize,
        storeId: wx.getStorageSync('userInfo').id || 1,
      },
      success: (res) => {
        if (res.data.code == 200) {
          let arr = res.data.rows
          if (this.data.pageNum * this.data.pageSize >= res.data.total) {
            this.setData({
              isReachBottom: false
            })
          }
          this.setData({
            orderList: [...this.data.orderList, ...arr]
          })
        } else {
          wx.showToast({
            icon: 'error',
            title: res.data.msg,
          })
        }
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
    this.setData({
      pageNum: 1,
      orderList: [],
      isReachBottom: true
    })
    OffOnlineList().then(res => {
      console.log(res);
      if (res.code == 200) {
        let arr = res.data
        // if (this.data.pageNum * this.data.pageSize >= res.data) {
        //   this.setData({
        //     isReachBottom: false
        //   })
        // }
        this.setData({
          // orderList: [...this.data.orderList, ...arr]
          isReachBottom: false,
          orderList: arr
        })
      } else {
        wx.showToast({
          icon: 'error',
          title: res.data.msg,
        })
      }
    })
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