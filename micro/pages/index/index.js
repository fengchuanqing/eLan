// pages/micro/index/index.js
import {
  getyulslb,
  bdtklb,
  zjzxlist,
  getjqlb,
  getJrjq,
  img,
  img2
} from "../../../apis/micro.js"
import {
  convertHtmlToText
} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList: [{
        img: "/micro/assets/iconlysm.png",
        name: "老余说梅",
        nav: "/micro/pages/lysm/lysm",
        y: false
      },
      {
        img: "/micro/assets/iconmhjq.png",
        name: "梅好24节气",
        nav: "/micro/pages/mhjq/mhjq",
        y: false
      },
      {
        img: "/micro/assets/iconzj.png",
        name: "专家",
        nav: "/micro/pages/zjxz/index",
        y: true
      },
      {
        img: "/micro/assets/iconbctk.png",
        name: "病虫图库",
        nav: "/micro/pages/bctk/bctk",
        y: false
      },
    ],
    img: img,
    img2: img2,
    jieqi: {},
    active: 1,
    lyList: [],
    bcList: [],
    zjList: [],
    mobile: wx.getStorageSync('userInfo').lxdh
  },
  navTo(e) {
    const y = e.currentTarget.dataset.y
    if (y && !wx.getStorageSync('userInfo').lxdh) {
      this.setData({
        showAuthentication: true,
        authUrl: '/pages/attestation/attestation'
      })
      return
    }
    wx.navigateTo({
      url: e.currentTarget.dataset.nav + `?mobile=${this.data.mobile}&isElmg=1`,
    })
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  navToDetails(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },
  navTolysm(e) {
    if (e.currentTarget.dataset.dz) {
      wx.navigateTo({
        url: '/micro/pages/video/video?dz=' + e.currentTarget.dataset.dz + "&bt=" + e.currentTarget.dataset.bt,
      })
    } else {
      if (e.currentTarget.dataset.lj) {
        wx.navigateTo({
          url: '/micro/pages/zj/zj?url=' + e.currentTarget.dataset.lj,
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getJrjq().then((res) => {
      if (res) {
        this.setData({
          jieqi: res.data
        })
      }
    })
    getyulslb({
      czlxid: '',
      pageNum: 1

    }).then((res) => {
      if (res) {

        let arr = []
        arr.push(res.data[0])
        arr.push(res.data[1])
        this.setData({
          lyList: arr
        })
      }
    })
    bdtklb({
      mc: '',
      pageNum: 1,
      sglx: ''
    }).then((res) => {
      if (res) {

        let arr = []
        res.data.map((item) => {
          let {
            lxmc,
            mc,
            whzz,
            id,
            tp
          } = item
          whzz = convertHtmlToText(whzz)
          arr.push({
            lxmc,
            mc,
            whzz,
            id,
            tp: tp.split(',')[0]
          })
        })
        if (arr.length > 2) {
          this.setData({
            bcList: [arr[0], arr[1]]
          })
        } else {

          this.setData({
            bcList: arr
          })
        }
      }
    })
    wx.request({
      url: img + zjzxlist,
      data: {},
      method: 'get',
      success: (res) => {
        this.setData({
          zjList: [res.data.data[0], res.data.data[1]]
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