// message/pages/shopProve/shopProve.js
import {
  dpqylx,
  getCodeByMobile,
  uploadFile,
  img,
  checkCodeByMobileAndSubmit,
  kdzlsqxq
} from '../../../apis/message.js'
import {
  phoneVerify
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    yyzz: [],
    sfsmrz1: [],
    sfsmrz2: [],
    sfsmrz3: [],
    jyxk: [],
    authCode: '',
    phone: wx.getStorageSync('userInfo').lxdh || '',
    codename: '获取验证码',
    disabled: false
  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    let that = this;
    console.log(event);
    let keyname = event.currentTarget.dataset.keyname
    wx.showLoading({
      title: '加载中...',
    })
    wx.uploadFile({
      url: uploadFile,
      filePath: file.url,
      name: 'file',
      formData: {},
      success: (res) => {
        console.log(JSON.parse(res.data));
        that.setData({
          [keyname]: [{
            url: that.data.img + JSON.parse(res.data).fileName
          }]
        });
        console.log(that.data);
        wx.hideLoading()
      }
    })
  },
  getAuthCode(e) {
    let {
      yyzz,
      sfsmrz1,
      sfsmrz2,
      sfsmrz3,
      jyxk,
      phone,
      dplx
    } = this.data
    if (sfsmrz1.length !== 1 || sfsmrz2.length !== 1 || sfsmrz3.length !== 1) {
      wx.showToast({
        title: '身份信息不完整',
        icon: 'error'
      })
    } else if (dplx !== '规模大户' && yyzz.length !== 1) {
      wx.showToast({
        title: '营业执照不完整',
        icon: 'error'
      })
    } else if (phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'error'
      })
    } else {
      if (!phoneVerify(phone)) {
        return false
      }
      getCodeByMobile({
        mobile: phone
      }).then((res) => {
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
    }
  },
  delImg(event) {
    const idx = event.detail.index
    const keyname = event.currentTarget.dataset.keyname
    const yyzz = keyname
    this.setData({
      [yyzz]: []
    })
  },
  submit() {
    let {
      jyxk,
      authCode,
      sfsmrz3,
      sfsmrz2,
      sfsmrz1,
      yyzz
    } = this.data
    console.log(jyxk);
    let {
      dpmc,
      dplx,
      szcs,
      xxdz,
      dpdh,
      sjhm,
      fileList,
      listdNjz
    } = wx.getStorageSync('shopData')
    let jyxkSte = 0
    if (jyxk.length != 0) {
      jyxkSte = jyxk[0].url
    }
    if (authCode != '') {
      let shopdata = {
        code: authCode,
        dh: dpdh,
        dz: szcs,
        jyxkz: jyxkSte,
        lx: dplx,
        mtz: dplx !== '规模大户' ? fileList[0].url : 0,
        njz: dplx !== '规模大户' ? listdNjz.reduce((acc, cur) => acc.concat(cur.url), []).join() : 0,
        qymc: dpmc,
        scsfz: sfsmrz3[0].url,
        sfzgh: sfsmrz2[0].url,
        sfzzm: sfsmrz1[0].url,
        xxdz: xxdz,
        yyzzba: dplx !== '规模大户' ? yyzz[0].url : 0,
        mobile: sjhm,
        openid: wx.getStorageSync('thirdSession').openid
      }
      console.log(shopdata);
      checkCodeByMobileAndSubmit(shopdata).then((res) => {
        if (res) {
          console.log(res);
          if (res.code == 200) {
            wx.showToast({
              title: '开店申请已提交',
              icon: 'success',
              duration: 1000,
              success: () => {
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/home/home',
                  })
                }, 1000);

              }
            })
          } else {
            wx.showToast({
              title: '开店失败',
              icon: 'error',
              duration: 1000,
              success: () => {
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/home/home',
                  })
                }, 1000);

              }
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '请填写验证码',
        icon: 'error'
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.kdzlsqxq()
  },

  kdzlsqxq() {
    kdzlsqxq({
      openid: wx.getStorageSync('thirdSession').openid
    }).then(res => {
      if (res.code == 200) {
        let tpList = res.data.tpList
        let yyzz = [],
          sfsmrz1 = [],
          sfsmrz2 = [],
          sfsmrz3 = [],
          jyxk = []
        tpList.map(item => {
          if (item.lx == "营业执照备案") {
            yyzz = [{
              url: item.tplj
            }]
          }
          if (item.lx == "身份证正面") {
            sfsmrz1 = [{
              url: item.tplj
            }]
          }
          if (item.lx == "身份证国徽") {
            sfsmrz2 = [{
              url: item.tplj
            }]
          }
          if (item.lx == "手持身份证") {
            sfsmrz3 = [{
              url: item.tplj
            }]
          }
          if (item.lx == "经营许可证") {
            jyxk = item.tplj && item.tplj != '0' ? [{
              url: item.tplj
            }] : []
          }
        })
        this.setData({
          yyzz,
          sfsmrz1,
          sfsmrz2,
          sfsmrz3,
          jyxk
        })
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
  onShow: function () {
    let {
      dpmc,
      dplx,
      szcs,
      xxdz,
      dpdh,
      sjhm,
      fileList,
      listdNjz
    } = wx.getStorageSync('shopData')
    this.setData({
      phone: sjhm,
      dplx
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