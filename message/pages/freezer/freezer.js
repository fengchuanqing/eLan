import {
  wdlklb,
} from '../../api'
import {
  distance
} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal: '',
    freezerList: [],
    isReachBottom: true,
    pageNum: 1
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      isReachBottom: true,
      pageNum: 1,
      freezerList: []
    })
    // 获取当前坐标
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          curLat: res.latitude,
          curLon: res.longitude
        })
        this.getData()
      }
    })
  },
  goNext(e){
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url
    })
  },
  getData() {
    const params = {
      lkmc: this.data.searchVal,
      pageNum: this.data.pageNum,
      zt: 1
    }
    wdlklb(params).then(res => {
      if (res.code == 200) {
        if (res.data.length < 10) {
          this.setData({
            isReachBottom: false
          })
        }
        res.data.map(item => {
          item.jl = distance(this.data.curLat, this.data.curLon, item.wd, item.jd)
        })
        this.setData({
          freezerList: [...this.data.freezerList, ...res.data]
        })
      }
    })
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