import {
  lkdqxq,
  xglkddzt
} from '../../api'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.type) {
      this.setData({
        yyType: options.type
      })
    }
    this.setData({
      _id: options.id
    })
    this.getData(options.id)
  },
  bindTextAreaBlur(e) {
    this.setData({
      reason: e.detail.value
    })
  },
  finish() {
    const params = {
      id: this.data._id,
      zt: 2,
      sfjd: 0,
    }
    wx.showModal({
      title: '提示',
      content: '确认完成吗？',
      success: (res) => {
        if (res.confirm) {
          xglkddzt(params).then(res => {
            if (res.code == 200) {
              wx.showToast({
                title: res.msg,
                success: () => {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: 1,
                    })
                  }, 1500)
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  refuse() {
    if (!this.data.reason) {
      wx.showToast({
        icon: 'none',
        title: '请输入拒绝原因',
      })
      return
    }
    const params = {
      id: this.data._id,
      zt: 2,
      sfjd: 1,
      jdly: this.data.reason
    }
    wx.showModal({
      title: '提示',
      content: '是否确认拒单？',
      success: (res) => {
        if (res.confirm) {
          xglkddzt(params).then(res => {
            if (res.code == 200) {
              wx.showToast({
                title: res.msg,
                success: () => {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: 1,
                    })
                  }, 1500)
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  confirm() {
    const params = {
      id: this.data._id,
      zt: 1,
      sfjd: 0
    }
    wx.showModal({
      title: '提示',
      content: '是否确认接单？',
      success: (res) => {
        if (res.confirm) {
          xglkddzt(params).then(res => {
            if (res.code == 200) {
              wx.showToast({
                title: res.msg,
                success: () => {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: 1,
                    })
                  }, 1500)
                }
              })
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getData(id) {
    lkdqxq({
      id
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          orderDeatil: res.data,
          reason: res.data.jdly
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})