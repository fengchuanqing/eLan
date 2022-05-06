// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    //获取当前设备信息
    wx.getSystemInfo({
      success: res => {
        this.globalData.bottomLift = res.screenHeight - res.safeArea.bottom==0?5:res.screenHeight - res.safeArea.bottom;
        if (res.model.indexOf("iPhone") >= 0 && (res.statusBarHeight > 20)) {
          this.globalData.isIPhoneXSeries = true
          console.log(res)
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  globalData: {
    userInfo: null,
    bottomLift: 0,
    isIPhoneXSeries:false
  }
})