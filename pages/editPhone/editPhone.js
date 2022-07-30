import {
  phoneVerify
} from '../../utils/util'
import {
  getCodeByMobile,
  updateMobileByOpenid,
  getXcxUserInfo
} from '../../apis/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    yzCode: '',
    codename: '获取验证码',
    disabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getXcxUserInfo()
  },
  getXcxUserInfo() {
    const param = {
      openid: wx.getStorageSync('thirdSession').openid
    }
    getXcxUserInfo(param).then(res => {
      if (res) {
        this.setData({
          mobile: res.data.lxdh
        })
      }
    })
  },
  getCode() {
    if (!phoneVerify(this.data.mobile)) {
      return false
    }
    getCodeByMobile({
      mobile: this.data.mobile
    }).then(res => {
      if (res) {
        this.setData({
          disabled: true
        })
        let num = 61;
        const timer = setInterval(() => {
          num--;
          if (num <= 0) {
            clearInterval(timer);
            this.setData({
              codename: '重新发送',
              disabled: false
            })
          } else {
            this.setData({
              codename: num + "s"
            })
          }
        }, 1000)
      }
    })

  },
  login() {
    if (!phoneVerify(this.data.mobile)) {
      return false
    }
    if (!this.data.yzCode) {
      wx.showToast({
        title: '验证码不可为空',
        icon: 'error',
        duration: 2000
      })
      return
    }
    const params = {
      code: this.data.yzCode,
      mobile: this.data.mobile,
      openid: wx.getStorageSync('thirdSession').openid
    }
    updateMobileByOpenid(params).then(res => {
      if (res) {
        wx.showToast({
          title: '操作成功',
          success() {
            wx.navigateBack({
              delta: 1,
            })
          }
        })
      }
    })
  },
})