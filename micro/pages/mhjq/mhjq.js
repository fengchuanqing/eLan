// pages/micro/mhjq/mhjq.js
import {
  getjqlx,
  getjqlb,
  getjqxq,
  img
} from "../../../apis/micro"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    tabList: [],
    imageUrl: img,
    active: "",
    show: true,
    pageNum: 1
  },
  getJqlb(id = '', pageNum = 1) {
    if (this.data.list.length >= (pageNum - 1) * 10) {
      getjqlb({
        jqlxid: id.toString(),
        pageNum
      }).then((res) => {
        console.log(this.data.active);
        if (!this.data.active) {
          let arr = [...res.data]
          let oldList = this.data.list
          this.setData({
            list: [...oldList, ...arr]
          })
          return
        }
        if (res.data.length) {
          this.setData({
            jqyw: res.data[0].jqyw,
            mz: res.data[0].mz,
          })
          this.getjqlx(res.data[0].id)
        } else {
          this.setData({
            obj: {},
            jqyw: '',
            mz: ''
          })
        }
      })
    }

  },
  getjqlx(id) {
    getjqxq({
      id,
      openId: wx.getStorageSync('thirdSession').openid
    }).then((res) => {
      if (res) {
        this.setData({
          obj: res.data
        })
      }
    })
  },
  selected(v) {
    this.setData({
      list: [],
      active: v.detail.name == 0 ? '' : v.detail.name

    })
    this.getJqlb(this.data.active)
  },
  navToDetail(e) {
    let {
      id,
      mz,
      jqyw
    } = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '/micro/pages/mhjqDetails/mhjqDetails?id=' + id + '&mz=' + mz + '&jqyw=' + jqyw,
    })
  },
  navTo(e) {
    wx.navigateTo({
      url: '/micro/pages/video/video?dz=' + e.currentTarget.dataset.url + '&bt=' + e.currentTarget.dataset.bt,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = Number(options.id) || ''
    this.setData({
      active: id
    })
    getjqlx().then((res) => {
      if (res) {
        res.data.unshift({
          id: '',
          mz: "全部"
        })
        this.setData({
          tabList: res.data
        })
        this.getJqlb(id)
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
    this.getJqlb(this.data.active, this.data.pageNum)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})