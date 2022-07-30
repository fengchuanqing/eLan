
import {
  lkxq
} from '../../api'
import {
  distance
} from '../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freezer: {},
    cur_tab: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取当前坐标
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          curLat: res.latitude,
          curLon: res.longitude
        })
        this.getData(options.id)
      }
    })
  },
  getData(id){
    lkxq({id}).then(res=>{
      if(res.code==200){
        let freezer = res.data
        freezer.distance = distance(this.data.curLat, this.data.curLon, freezer.wd, freezer.jd)
        this.setData({
          freezer
        })
      }
    })
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

  },
  changeTab(e) {
    this.setData({
      cur_tab: e.currentTarget.dataset.idx
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})