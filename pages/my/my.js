// merchant/pages/own/own.js
import {
  getXcxUserInfo,
  gxykxx,
  wdxxwdsl,
  getMobileByCode
} from '../../apis/index'
import {
  dbsx,
} from '../../apis/message.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIPhoneXSeries: getApp().globalData.isIPhoneXSeries,
    baifenbi: 80,
    myAppList: [],
    bottomList: [{
        icon: '/assets/images/own/icGrzx.png',
        name: '我的地址',
        url: '/message/pages/address/index/index'
      },
      {
        icon: '/assets/icons/wdzt.png',
        name: '我的主体',
        url: '/gylz/pages/ztDeatil/ztDeatil'
      },
      {
        icon: '/assets/images/home/tydt.png',
        name: '我的动态',
        url: '/message/pages/dynamic/dynamic'
      },
      {
        icon: '/assets/images/own/icYjfk.png',
        name: '意见反馈',
        url: '/message/pages/opinion/opinion'
      },
      {
        icon: '/assets/images/own/icGywm.png',
        name: '我的认证',
        value: '未认证'
      },
    ],
    showAuthentication: false,
    userInfo: wx.getStorageSync('userInfo') || null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getxldt() {
    let {
      myAppList
    } = this.data
    const params = {
      openid: wx.getStorageSync('thirdSession').openid || ''
    }
    wdxxwdsl(params).then(res => {
      if (res) {
        myAppList.map(item => {
          if (item.name == '我的消息') {
            item.message = res.data
          }
        })
        this.setData({
          myAppList
        })
      }
    })
  },
  getDbsx() {
    let {
      myAppList
    } = this.data
    dbsx().then(res => {
      if (res.code == 200) {
        myAppList.map(item => {
          if (item.name == '我的店铺') {
            item.message = res.data.length
          }
        })
        this.setData({
          myAppList
        })
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
  onReady: function () {},
  goNext(e) {
    const item = e.currentTarget.dataset.item
    if (item.value === '未认证') {
      this.setData({
        showAuthentication: true,
        authUrl: '/pages/studyPlant/attestation/index'
      })
      return
    }
    if (item.value === '已认证') {
      wx.navigateTo({
        url: '/pages/studyPlant/attestation/index?rz=1',
      })
      return
    }
    wx.navigateTo({
      url: item.url,
    })
  },
  authorize() {
    let _this = this
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
            success: () => {
              wx.getUserProfile({
                desc: '为了更好的体验',
                success: function (res) {
                  var userInfo = res.userInfo
                  console.log(userInfo);
                  const user = {
                    nc: userInfo.nickName,
                    yhtx: userInfo.avatarUrl
                  }
                  wx.setStorageSync('userInfo', user)
                  const params = {
                    fwdid: userInfo.avatarUrl,
                    nc: userInfo.nickName,
                    openid: wx.getStorageSync('thirdSession').openid
                  }
                  gxykxx(params).then(r => {
                    _this.getXcxUserInfo()
                  })
                }
              })
            }
          })
        } else {
          wx.getUserProfile({
            desc: '为了更好的体验',
            success: function (res) {
              var userInfo = res.userInfo
              console.log(userInfo);
              const user = {
                nc: userInfo.nickName,
                yhtx: userInfo.avatarUrl
              }
              wx.setStorageSync('userInfo', user)
              const params = {
                fwdid: userInfo.avatarUrl,
                nc: userInfo.nickName,
                openid: wx.getStorageSync('thirdSession').openid,
                yhdh: ''
              }
              gxykxx(params).then(r => {
                _this.getXcxUserInfo()
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getXcxUserInfo()
  },
  editPhone() {
    wx.navigateTo({
      url: '/pages/editPhone/editPhone',
    })
  },
  getPhoneNumber(e) {
    console.log(e.detail.code)
    if (!e.detail.code) return
    getMobileByCode({
      openid: wx.getStorageSync('thirdSession').openid,
      code: e.detail.code
    }).then(res => {
      if (res.code == 200) {
        let userInfo = wx.getStorageSync('userInfo')
        userInfo.lxdh = JSON.parse(JSON.stringify(res.msg))
        wx.setStorageSync('userInfo', userInfo)
        this.setData({
          'userInfo.lxdh': res.msg.replace(/^((?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189])))(\d{4})(\d{4})$/, '$1****$3')
        })
      }
    })
  },
  getXcxUserInfo() {
    const param = {
      openid: wx.getStorageSync('thirdSession').openid
    }
    getXcxUserInfo(param).then(res => {
      if (res) {
        res.data.hlz = Number(res.data.hlz)
        let userInfo = JSON.parse(JSON.stringify(res.data))
        userInfo.lxdh = userInfo.lxdh.replace(/^((?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189])))(\d{4})(\d{4})$/, '$1****$3')
        this.setData({
          userInfo
        })
        this.setData({
          myAppList: res.data.menuList
        })
        if (res.data.sf !== '游客' && res.data.sf !== '微信未授权游客') {
          this.setData({
            'bottomList[4].value': '已认证'
          })
        }
        this.getxldt()
        wx.setStorageSync('userInfo', res.data)
        if (res.data.shopState == "已通过") {
          this.getDbsx()
        }
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