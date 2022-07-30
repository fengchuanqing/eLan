import {
  domain
} from '../../../utils/api.js'
import {
  count1,
  sjDetail,
  dbsx,
  img,
  getStoreOpenId
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
        if (!res.data) {
          wx.showModal({
            title: '提示',
            content: '暂无权限',
            showCancel: false,
            success: (res) => {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1,
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          return
        }
        let userInfo = wx.getStorageSync('userInfo')
        userInfo.storeId = res.data.storeId
        wx.setStorageSync('userInfo', userInfo)
        wx.setStorageSync('storeInfo', res.data)
        if (res.data.bq !== '店长') {
          getStoreOpenId({
            openid: wx.getStorageSync('thirdSession').openid
          }).then(res => {
            if (res.code == 1) {
              const thirdSession = wx.getStorageSync('thirdSession')
              thirdSession.dzopenid = res.data[0].openid
              wx.setStorageSync('thirdSession', thirdSession)
            }
          })
        }
        this.setData({
          inFo: res.data
        })
        this.getDbsx()
        this.getData() //下面数据
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
    this.getFhdd() //店铺信息

    this.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
  },
  changeTab(tab) {
    if (tab.detail.index === 1) {
      this.getDbsx()
      wx.getSetting({
        withSubscriptions: true,
        success(res) {
          console.log(res)
          if (res.subscriptionsSetting.mainSwitch) {
            wx.requestSubscribeMessage({
              tmplIds: ['5HD-XrMbh_0ynv0c1lgS0KBRvX51Or9LeEgcl5R6GH8'],
              success(resl) {
                console.log(resl)
              }
            })
          }
        }
      })


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