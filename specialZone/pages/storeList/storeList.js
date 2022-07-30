// specialZone/pages/storeList/storeList.js
import {
  Jxsjlb,
  img
} from '../../../apis/specialZone.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    storeList: [],
    page: 1,
    selectValue: 0,
    searchValue: '',
    selectKey: '',
    searchValue: '',
    option1: [{
        text: '价格起售',
        value: 0,
      },
      {
        text: '10元起',
        value: 1
      },
      {
        text: '20元起',
        value: 2
      },
      {
        text: '30元起',
        value: 3
      },
      {
        text: '40元起',
        value: 4
      },
      {
        text: '50元起',
        value: 5
      },
      {
        text: '60元起',
        value: 6
      },
    ]
  },
  selectShop(e) {
    this.setData({
      selectKey: parseInt(this.data.option1[e.detail].text) ? parseInt(this.data.option1[e.detail].text) : '',
      storeList: []
    })
    this.getJxsjlb(1, this.data.selectKey)
  },
  searchShop(e) {
    this.setData({
      storeList: [],
      searchValue: e.detail
    })
    this.getJxsjlb(1, this.data.selectKey, e.detail)
  },
  clearSearch() {
    this.getJxsjlb(1, this.data.selectKey, '')
  },
  changeSearch(e) {
    !e.detail && this.getJxsjlb(1, this.data.selectKey, '')
  },
  getJxsjlb(page = 1, qsj = '', temp = '') {
    if (this.data.storeList.length >= (page - 1) * 20) {
      Jxsjlb({
        page,
        qsj,
        temp
      }).then((res) => {
        if (res) {
          res.data.map((item) => {
            if (item.img) {
              item.img = item.img.split(',').reduce((acc, cur) => acc.concat(img + cur), [])
            }
          })
          this.setData({
            storeList: [...this.data.storeList, ...res.data]
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getJxsjlb()
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
    this.data.page++
    this.getJxsjlb(this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})