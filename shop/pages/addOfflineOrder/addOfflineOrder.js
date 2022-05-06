// pages/MerchantCenter/addOfflineOrder/addOrder.js
import {
    addOfflineOrder
  } from '../../../utils/api.js'
  import {
    addOffOnline
  } from '../../../apis/message.js'
  Page({
  
    /**
     * 页面的初始数据
     */
    data: {
      name: '',
      money: '',
      commodityName: ''
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
  
    },
    submit() {
      this.setData({
        name: this.data.name.replace(/^\s*/, ''),
        money: this.data.money.replace(/^\s*/, ''),
        commodityName: this.data.commodityName.replace(/^\s*/, ''),
      })
      if (!this.data.name) {
        wx.showToast({
          icon: 'error',
          title: '姓名不可为空',
        })
        return
      }
      if (!this.data.money) {
        wx.showToast({
          icon: 'error',
          title: '金额不可为空',
        })
        return
      }
      if (!this.data.commodityName) {
        wx.showToast({
          icon: 'error',
          title: '商品名称为空',
        })
        return
      }
      let params = {
        name: this.data.name,
        money: this.data.money,
        commodityName: this.data.commodityName,
      }
      addOffOnline(params).then(res => {
        if (res.code == 200) {
          wx.showToast({
            icon: '',
            title: '添加成功',
          })
          setTimeout(() => {
            wx.navigateBack({
              delta: 1,
            })
          }, 1000)
        }
      })
      // wx.request({
      //   url: addOfflineOrder,
      //   method: 'POST',
      //   data: {
      //     storeId: wx.getStorageSync('userInfo').id || 1,
      //     name: this.data.name,
      //     money: this.data.money,
      //     commodityName: this.data.commodityName,
      //   },
      //   success: (res) => {
      //     if (res.data.code == 200) {
      //       wx.showToast({
      //         title: '添加成功！',
      //       })
      //       setTimeout(() => {
      //         wx.navigateBack({
      //           delta: 1
      //         })
      //       }, 1500)
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