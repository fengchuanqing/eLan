import {
  xldtxx,
  fhwIndex,
  domain,
  indexPageBanner,
  getXcxUserInfo,
  xmsb,
  gxykxx
} from '../../apis/index'
import {
  checkSession
} from '../../utils/login'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain: domain + '/bsApi',
    domain2: domain,
    swiperList: [],
    noticesList: [],
    curTemTab: 0,
    serviceList: [],
    funnyList: [],
    showAuthentication: false,
    shopShow: false
  },
  goXmsb() {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo.lxdh) {
      this.setData({
        showAuthentication: true,
        authUrl: '/pages/studyPlant/attestation/index'
      })
      return
    }
    const params = {
      openid: wx.getStorageSync('thirdSession').openid
    }
    xmsb(params).then(res => {
      if (res) {
        let url = res.msg.split('?')[0]
        let TGC_XMZJ = res.msg.split('?')[1]
        wx.navigateTo({
          url: `/micro/pages/zj/zj?url=${url}&${TGC_XMZJ}`,
        })
      }
    })
  },
  navToUrl(e) {
    let {
      url,
      y,
    } = e.currentTarget.dataset
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo.sf === '微信未授权游客') {
      wx.showModal({
        title: '提示',
        content: '请先微信授权',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    if ((!userInfo.sf || userInfo.sf === '游客') && y) {
      this.setData({
        showAuthentication: true,
        authUrl: '/pages/studyPlant/attestation/index'
      })
      return
    }
    wx.navigateTo({
      url: '/micro/pages/zj/zj?url=' + url,
    })
  },
  navTo(e) {
    console.log(e);
    const user = wx.getStorageSync('userInfo')
    if (user.sf === '微信未授权游客') {
      wx.showModal({
        title: '提示',
        content: '请先微信授权',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: '/micro/pages/mhjq/mhjq?id=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '/specialZone/pages/index/index',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    checkSession()
    // wx.setStorageSync('thirdSession', {openid:'o6JSs5NsplCSr6tB2bPHoXb5VZgI'})

  },

  getindexPageBanner() {
    indexPageBanner().then(res => {
      if (res) {
        this.setData({
          swiperList: res.data.syLbt,
          funnyList: res.data.bottom,
        })
      }
    })
  },
  getfhwIndex() {
    fhwIndex().then(res => {
      if (res) {
        this.setData({
          serviceList: res.data
        })
      }
    })
  },
  getxldt() {
    const params = {
      openid: wx.getStorageSync('thirdSession').openid
    }
    xldtxx(params).then(res => {
      if (res) {
        this.setData({
          noticesList: res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.photosAlbum()
  },
  photosAlbum() {
    wx.getSetting({
      success(res) {
        console.log(res);
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {},
            fail: () => {
              console.log(2);
              // wx.showModal({
              //   title: '提示',
              //   content: '为了更好的体验，请先授权相册',
              //   showCancel: false,
              //   success: (res) => {
              //     wx.openSetting({
              //       success(res) {
              //         console.log(res.authSetting)
              //         // res.authSetting = {
              //         //   "scope.userInfo": true,
              //         //   "scope.userLocation": true
              //         // }
              //       }
              //     })
              //   }
              // })
            }
          })
        }
      }
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
              console.log(res);
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
  getXcxUserInfo() {
    let that = this;
    const param = {
      openid: wx.getStorageSync('thirdSession').openid
    }
    getXcxUserInfo(param).then(res => {
      if (res) {
        res.data.hlz = Number(res.data.hlz)
        wx.setStorageSync('userInfo', res.data)
        this.setData({
          uopenid: wx.getStorageSync('thirdSession').openid,
          mobile: wx.getStorageSync('userInfo').lxdh || ''
        })
        if (wx.getStorageSync('userInfo').hasShop) {
          // 已申请
          if (wx.getStorageSync('userInfo').shopState == "已通过") {
            // 申请状态
            that.setData({
              shopShow: false,
              shopState: wx.getStorageSync('userInfo').shopState
            })
          } else {
            that.setData({
              shopShow: true,
              shopState: wx.getStorageSync('userInfo').shopState
            })
          }
        } else {
          // 未申请
          that.setData({
            shopShow: true
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getxldt()
    this.getfhwIndex()
    this.getindexPageBanner()
    this.getXcxUserInfo()
  },
  changTempTab(e) {
    const idx = e.currentTarget.dataset.idx
    this.setData({
      curTemTab: idx
    })
  },
  openShop() {
    if (wx.getStorageSync('userInfo').sf == "微信未授权游客") {
      wx.showToast({
        title: '请先授权',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/my/my'
            })
          }, 2000);
        }
      })
    } else {
      if (this.data.shopState == "未审核") {
        wx.showToast({
          icon: 'none',
          title: '店铺审核中',
        })
      } else {
        wx.navigateTo({
          url: '/message/pages/spShop/spShop',
        })
      }
    }
  },
  goNext(e) {
    const user = wx.getStorageSync('userInfo')
    if (user.sf === '微信未授权游客') {
      wx.showModal({
        title: '提示',
        content: '请先微信授权',
        success: (res) => {
          if (res.confirm) {
            wx.switchTab({
              url: '/pages/my/my',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
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