// pages/micro/bctk/bctk.js
import {
  sglx,
  bdtklb,
  img2
} from "../../../apis/micro"
import {
  convertHtmlToText
} from '../../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img: img2,
    option1: [{
        text: '杨梅',
        value: 0
      },
      {
        text: '杨梅',
        value: 1
      },
      {
        text: '杨梅',
        value: 2
      },
    ],
    value1: 0,
    value: '',
    list: [],
    pageNum: 1
  },
  selected({
    detail
  }) {
    this.setData({
      value1: detail,
      list: []
    })
    this.getBdtklb(detail)
  },
  serach({
    detail
  }) {
    this.setData({
      value: detail,
      list: []
    })
    this.getBdtklb(this.data.value1, detail)
  },
  getBdtklb(sglx, mc = '', pageNum = 1) {
    bdtklb({
      sglx,
      pageNum,
      mc
    }).then((res) => {
      if (res) {
        if (this.data.list.length >= (pageNum - 1) * 10) {
          let arr = []
          res.data.map((item) => {
            let {
              lxmc,
              mc,
              id,
              tp,
              whzz
            } = item
            whzz = convertHtmlToText(whzz)
            arr.push({
              whzz,
              lxmc,
              mc,
              id,
              tp: tp.split(',')[0]
            })
          })
          let oldList = this.data.list
          this.setData({
            list: [...oldList, ...arr]
          })
          console.log(res.data[0].tp.split(',')[0]);

        }
      }
    })
  },
  navTo(v) {
    console.log(v.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/micro/pages/bctkDetails/bctkDetails?id=' + v.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    sglx().then((res) => {
      if (res) {
        let list = res.data.reduce((acc, cur) => {
          return acc.concat({
            text: cur.lxmc,
            value: cur.id,
            // sj: cur.sj
          })
        }, [])
        this.setData({
          option1: list,
          value1: list[0].value
        })
        this.getBdtklb(list[0].value)
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
    this.getBdtklb(this.data.value1, this.data.value, this.data.pageNum)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})