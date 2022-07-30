// pages/micro/lysm/lysm.js
import {
  getczlx,
  getyulslb,
  img,
  lysmczjl
} from "../../../apis/micro.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    tabList: [],
    active: '',
    pageNum: 1,
    videoSrc: img
  },
  selected(v) {
    this.setData({
      list: [],
      active: v.detail.name == 0 ? '' : v.detail.name

    })

    this.getYulslb(this.data.active)
  },
  navTo(e) {
    console.log(e.currentTarget.dataset);
    const {
      dz,
      lj,
      bt
    } = e.currentTarget.dataset
    if (dz) {
      const params = {
        czmx: bt,
        openId: wx.getStorageSync('thirdSession').openid
      }
      lysmczjl(params).then(res => {
        wx.navigateTo({
          url: '/micro/pages/video/video?dz=' + dz + "&bt=" + bt,
        })
      })

    } else {
      if (lj) {
        wx.navigateTo({
          url: '/micro/pages/zj/zj?url=' + lj,
        })
      }
    }
  },
  getYulslb(id = '', pageNum = 1) {
    if (this.data.list.length >= (pageNum - 1) * 10) {
      getyulslb({
        czlxid: this.data.active.toString(),
        pageNum
      }).then((res) => {
        console.log(res);
        let arr = [...res.data]
        let oldList = this.data.list
        this.setData({
          list: [...oldList, ...arr]
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.active) {
      this.setData({
        active: Number(options.active)
      })
      console.log(this.data.active);
    }
    getczlx().then((res) => {
      console.log(res);
      if (res) {
        this.setData({
          tabList: [{
            lxmc: '全部',
            id: ''
          }, ...res.data]
        })
        this.getYulslb()
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
    this.data.pageNum++
    this.getYulslb(this.data.active, this.data.pageNum)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})