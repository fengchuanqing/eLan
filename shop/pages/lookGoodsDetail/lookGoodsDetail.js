import {
  updateLookGoods,
  domain
} from '../../../utils/api.js'

import {
  khxq,
  img
} from '../../../apis/message.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    domain,
    name: '',
    message: '',
    type: '视频',
    typeColumns: ['视频', '图片'],
    typeShow: false,
    typeIndex: 0,
    order_id: '',
    shopCoverImg: '',
    videoUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        order_id: options.id
      })
      this.getData()
    }
  },
  getData() {
    khxq({
      id: this.data.order_id
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          name: res.data.name,
          message: res.data.message,
          typeIndex: res.data.type,
          type: this.data.typeColumns[Number(res.data.type)]
        })
        if (res.data.type === '0') {
          this.setData({
            videoUrl: res.data.url
          })
        } else {
          this.setData({
            shopCoverImg: res.data.url
          })
        }
      } else {
        wx.showToast({
          icon: 'error',
          title: res.msg,
        })
      }
    })
    // wx.request({
    //   url: updateLookGoods + this.data.order_id,
    //   method: 'get',
    //   success: (res) => {
    //     if (res.data.code == 200) {
    //       this.setData({
    //         name: res.data.data.name,
    //         message: res.data.data.message,
    //         typeIndex: res.data.data.type,
    //         type: this.data.typeColumns[Number(res.data.data.type)]
    //       })
    //       if (res.data.data.type === '0') {
    //         this.setData({
    //           videoUrl: res.data.data.url
    //         })
    //       } else {
    //         this.setData({
    //           shopCoverImg: res.data.data.url
    //         })
    //       }
    //     } else {
    //       wx.showToast({
    //         icon: 'error',
    //         title: res.data.msg,
    //       })
    //     }
    //   }
    // })
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