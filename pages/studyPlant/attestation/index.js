import {
  uploadFile,
  domain,
  idUpload,
  saveXcxDiscernUser,
  getXcxUserInfo,
  getCodeByMobile,
  getInfoByOpenId
} from '../../../apis/index'
import {
  phoneVerify
} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    domain,
    mobile: wx.getStorageSync('userInfo').lxdh||'',
    yzCode:'',
    codename: '获取验证码',
    disabled: false,
    cuttype: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.cuttype) {
      console.log(this.data.idCardA)
    }
    if(options.rz){
      this.setData({
        isrz:true
      })
      getInfoByOpenId({
        openid:wx.getStorageSync('thirdSession').openid
      }).then(res=>{
        if(res.code==200){
          let {sfzzmtpdz:idCardA,sfzfmtpdz:idCardB,xm:username,lxdh:mobile,sfzhm:idCard} =res.data
          this.setData({
            idCardA,
            idCardB,
            username,
            idCard,
            mobile,
          })
        }
      })
    }
    this.setData({
      mobile: wx.getStorageSync('userInfo').lxdh||'',
    })
  },
  goCut(e){
    // console.log(e);
    wx.navigateTo({
      // url: '/micro/pages/cutFace/cutFace?cuttype=1&isZ='+e.currentTarget.dataset.isz,
      url: '/micro/pages/cropper/cropper?cuttype=1&isZ='+e.currentTarget.dataset.isz,
    }) 
  },
  phoneInput(e) {
    this.setData({
      mobile: Number(e.detail.value)
    })
  },
  getCode() {
    if (!phoneVerify(this.data.mobile)) {
      return false
    }
    getCodeByMobile({
      mobile:this.data.mobile
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},
  onCancel() {
    wx.navigateBack({
      delta: 1,
    })
  },
  onConfirm() {
    if (!this.data.idCardA || !this.data.idCardB) {
      wx.showToast({
        title: '请上传身份证',
      })
      return
    }
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
    const parmas = {
      sfzzmtpdz: this.data.idCardA,
      sfzfmtpdz: this.data.idCardB,
      sfzhm: this.data.idCard,
      xm: this.data.username,
      code:this.data.yzCode,
      lxdh:this.data.mobile,
      openid:wx.getStorageSync('thirdSession').openid
    }
    saveXcxDiscernUser(parmas).then(re => {
      if (re) {
        // wx.setStorageSync('farmRz', true)
        const param = {
          openid:wx.getStorageSync('thirdSession').openid
        }
        getXcxUserInfo(param).then(res => {
          if (res) {
            res.data.hlz = Number(res.data.hlz)
            wx.setStorageSync('userInfo', res.data)
            wx.showToast({
              title: re.msg,
              success() {
                wx.navigateBack({
                  delta: 1,
                })
              }
            })
          }
        })
      }
    })

  },
  uploadA(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '加载中...',
        })
        wx.uploadFile({
          url: idUpload,
          filePath: tempFilePaths[0],
          formData: {},
          name: 'file',
          success: (res) => {
            console.log(res);
            const data = JSON.parse(res.data)
            this.setData({
              idCardA: data.data.fileUrl,
              username: data.data.name || "",
              idCard: data.data.id || ''
            })
          },
          complete() {
            wx.hideLoading()
          }
        })
      }
    })
  },
  uploadB(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: uploadFile,
          filePath: tempFilePaths[0],
          formData: {},
          name: 'file',
          success: (res) => {
            console.log(res);
            const data = JSON.parse(res.data)
            this.setData({
              idCardB: '/bs' + data.fileName
            })
          }
        })
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