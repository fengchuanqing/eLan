import {
  wdlklb,
  xzxglk
} from '../../api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal: '',
    cur_tab: 1,
    freezerList: [],
    pageNum: 1,
    isReachBottom: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  stopService(e) {
    const {
      item,
      idx,
      type
    } = e.currentTarget.dataset;
    let {
      freezerList
    } = this.data
    item.zt = type
    xzxglk({
      ...item
    }).then(res => {
      if (res.code == 200) {
        freezerList.splice(idx, 1)
        this.setData({
          freezerList
        })
        wx.showToast({
          title: res.msg,
        })
      }
    })
  },
  changeTab(e) {
    this.setData({
      cur_tab: e.currentTarget.dataset.idx,
      isReachBottom: true,
      pageNum: 1,
      freezerList: []
    })
    this.getData()
  },
  onSearch(e) {
    this.setData({
      searchVal: e.detail,
      isReachBottom: true,
      pageNum: 1,
      freezerList: []
    })
    this.getData()
  },
  onCancel() {
    this.setData({
      searchVal: '',
      isReachBottom: true,
      pageNum: 1,
      freezerList: []
    })
    this.getData()
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      isReachBottom: true,
      pageNum: 1,
      freezerList: []
    })
    this.getData()
  },
  getData() {
    const params = {
      lkmc: this.data.searchVal,
      openid: wx.getStorageSync('thirdSession').openid,
      pageNum: this.data.pageNum,
      zt: this.data.cur_tab
    }
    wdlklb(params).then(res => {
      if (res.code == 200) {
        if (res.data.length < 10) {
          this.setData({
            isReachBottom: false
          })
        }
        this.setData({
          freezerList: [...this.data.freezerList, ...res.data]
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.data.isReachBottom) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.getData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})