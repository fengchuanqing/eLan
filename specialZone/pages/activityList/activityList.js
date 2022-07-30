import {
  activityList,
  domain
} from '../../../utils/userApi.js'
import {
  Hdzq,
  img
} from '../../../apis/specialZone.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img,
    domain,
    pageNum: 1,
    pageSize: 10,
    isReachBottom: true,
    activityList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  goOrder(e){
    wx.navigateTo({
      url: '/specialZone/pages/activityOrder/activityOrder?id=' + e.currentTarget.dataset.item.store_id+'&hdid='+e.currentTarget.dataset.item.id+'&hdfm='+e.currentTarget.dataset.item.img_url.split(',')[0]+'&full_name='+ e.currentTarget.dataset.item.activity_name+'&introduction='+e.currentTarget.dataset.item.introduction
    })
  },
  getData() {
    Hdzq().then((res) => {
      if (res) {
        let arr = res.data
        // if (this.data.pageNum*this.data.pageSize >= res.data.total) {
        //   this.setData({
        //     isReachBottom: false
        //   })
        // }
        this.setData({
          activityList: [...this.data.activityList, ...arr]
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
    if (this.data.isReachBottom) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      this.geData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})