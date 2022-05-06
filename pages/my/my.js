// merchant/pages/own/own.js
import {
  getXcxUserInfo,
  gxykxx,
} from '../../apis/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIPhoneXSeries:getApp().globalData.isIPhoneXSeries,
    baifenbi: 80,
    myAppList: [{
        icon: '/assets/images/own/dindan.png',
        name: '我的订单',
        // message: '10',
        url: '/message/pages/Order/myorder/myorder'
      }, {
        icon: '/assets/images/own/xiaoxi.png',
        name: '我的消息',
        // message: '10',
        url: '/message/pages/message/message'
      },
      //  {
      //   icon: '/assets/images/own/dianpu.png',
      //   name: '我的店铺',
      //   message: '',
      //   url: '/shop/pages/officer/index'
      // }, 
    ],
    bottomList: [{
        icon: '/assets/images/own/icGrzx.png',
        name: '我的地址',
        url: '/message/pages/address/index/index'
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  goNext(e) {
    const item = e.currentTarget.dataset.item
    if (item.value === '未认证') {
      this.setData({
        showAuthentication: true,
        authUrl: '/pages/studyPlant/attestation/index'
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
  init(){
    if (this.data.userInfo && (this.data.userInfo.sf !== '游客' && this.data.userInfo.sf !== '微信未授权游客')) {
      if (this.data.myAppList.find((item) => item.name === '我的农场')) return
      this.setData({
        myAppList: [...this.data.myAppList, {
          icon: '/assets/images/own/nonchang.png',
          name: '我的农场',
          url: '/farm/pages/index/index',
          message: '',
          isZhu: true
        }, {
          icon: '/assets/images/own/butie.png',
          name: '我的补贴',
          message: '',
          isZhu: true,
          url: '/message/pages/subsidy/subsidy'
        }],
        // bottomList: [
        //   {
        //     icon: '/assets/images/own/icLnm.png',
        //     name: '兰农码',
        //   },  ...this.data.bottomList
        // ]
      })
    }
    if (this.data.userInfo&&this.data.userInfo.lxdh) {
      if (this.data.myAppList.find((item) => item.name === '服务身份')) return
      this.setData({
        myAppList: [...this.data.myAppList, {
          icon: '/assets/images/own/fuwu.png',
          name: '服务身份',
          isZhu: true,
          // message: '未绑定',
          url: '/message/pages/identity/identity'
        }]
      })
    }
    if (this.data.userInfo && (this.data.userInfo.sf !== '游客' && this.data.userInfo.sf !== '微信未授权游客')) {
      this.setData({
        'bottomList[3].value': '已认证'
      })
    }
    // 我的店铺
    if (wx.getStorageSync('userInfo').shopState && wx.getStorageSync('userInfo').shopState == "已通过") {
      if (this.data.myAppList.find((item) => item.name === '我的店铺')) return
      // 申请状态
      this.setData({
        myAppList: [...this.data.myAppList, {
          icon: '/assets/images/own/dianpu.png',
          name: '我的店铺',
          message: '',
          url: '/shop/pages/officer/index'
        }],
      })
    }else{
      this.setData({
        myAppList:this.data.myAppList.filter(item=>item.name!=='我的店铺')
      })
    }
  },
  getXcxUserInfo() {
    const param = {
      openid: wx.getStorageSync('thirdSession').openid
    }
    getXcxUserInfo(param).then(res => {
      if (res) {
        res.data.hlz = Number(res.data.hlz)
        this.setData({
          userInfo: res.data
        })
        wx.setStorageSync('userInfo', res.data)
        this.init()
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