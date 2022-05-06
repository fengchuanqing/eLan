import {
  merchantGetAllCount,
  merchantGetFhdd,
  merchantGetDbsx,
  domain
} from '../../../utils/api.js'
import {
  count1,
  sjDetail,
  dbsx,
  img
} from '../../../apis/message.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inFo: {},
    img,
    domain,
    rateNumber: 4,
    active: 0,
    date_active: '1',
    formData: {},
    fhddData: {},
    list: [],
    currentTime: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  goNext() {
    wx.navigateTo({
      url: '',
    })
  },
  getFhdd() {
    sjDetail().then(res => {
      console.log(res);
      if (res.code == 200) {
        this.setData({
          inFo: res.data
        })
      } else {
        wx.showToast({
          icon: 'error',
          title: res.msg,
        })
      }
    })
  },
  getDbsx() {
    dbsx().then(res => {
      console.log(res);
      if (res.code == 200) {
        // order_status 1未验证 3 
        // order_status 3 超过2天未发货 
        this.setData({
          list: res.data
        })
      } else {
        wx.showToast({
          icon: 'error',
          title: res.msg,
        })
      }
    })
    // const currentTime = new Date().getTime()
    // wx.request({
    //   url: merchantGetDbsx,
    //   method: 'post',
    //   data: {
    //     storeId: wx.getStorageSync('userInfo').id || 1
    //   },
    //   success: (res) => {
    //     if (res.data.code === 200) {
    //       res.data.rows.map(item => {
    //         const time = new Date(item.time).getTime()
    //         if (((currentTime - time) / 1000 / 3600 / 24) > 1) {
    //           item.is_two = true
    //         }
    //       })
    //       this.setData({
    //         list: res.data.rows
    //       })
    //     } else {
    //       thiswx.showToast({
    //         icon: "error",
    //         title: res.data.msg,
    //       })
    //     }
    //   }
    // })
  },
  getData() {
    count1({
      time: this.data.date_active //(1今天2三日3七日4一月)
    }).then(res => {
      console.log(res.data);
      if (res.code == 200) {
        let item = res.data
        item.kdj = ((item.xsxdje + item.xxxdje) / (item.xxxdl + item.xsxdl))
        if (item.kdj) {
          item.kdj = item.kdj.toFixed(2)
        } else {
          item.kdj = 0
        }
        // item.kdj.toFixed(2)
        // item.kdj = res.data.
        this.setData({
          formData: item
        })
      } else {
        wx.showToast({
          icon: 'error',
          title: res.msg,
        })
      }

    })
    // wx.request({
    //   url: merchantGetAllCount,
    //   method: 'post',
    //   data: {
    //     storeId: wx.getStorageSync('userInfo').id || 1,
    //     type: this.data.date_active
    //   },
    //   success: (res) => {
    //     if (res.data.code === 200) {
    //       this.setData({
    //         formData: res.data.data
    //       })
    //     } else {
    //       thiswx.showToast({
    //         icon: "error",
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
    this.getData() //下面数据
    this.getFhdd() //店铺信息
    
    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    this.getDbsx()
  },
  changeTab(tab) {
    if (tab.detail.index === 1) {
      this.getDbsx()
    }
    this.setData({
      active: tab.detail.index
    })
  },
  changeDate(val) {
    this.setData({
      date_active: val.target.dataset.date
    })
    this.getData()
    // this.getFhdd()
  },
  goSetting() {
    wx.navigateTo({
      url: '/shop/pages/setting/setting',
    })
  },
  // 扫码
  goSacn() {
    wx.scanCode({
      success(res) {
        console.log(res)
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})