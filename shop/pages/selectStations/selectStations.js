import {
  ztdlb,
  img
} from '../../api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIPhoneXSeries:getApp().globalData.isIPhoneXSeries,
    img,
    searchValue: '',
    staffList: [],
    isReachBottom: true,
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  checkedCur(e){
    const idx = e.currentTarget.dataset.idx
    const staffList = this.data.staffList
    staffList[idx].isChecked=!staffList[idx].isChecked
    this.setData({
      staffList
    })
  },
  getyglb(){
    const params = {
      pageNum: this.data.pageNum,
      size: 10,
      zt: 1,
      mc: this.data.searchValue,
      storeId: wx.getStorageSync('userInfo').storeId,
    }
    ztdlb(params).then(res=>{
      if(res.code===200){
        const list =res.data
        if(list.length<10){
          this.setData({
            isReachBottom:false
          })
        }
        this.setData({
          staffList:[...this.data.staffList,...list]
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
    this.setData({
      isReachBottom: true,
      staffList: [],
      pageNum:1
    })
    this.getyglb()
  },
  goThere(e){
    const {
      latitude,
      longitude
    } = e.currentTarget.dataset.item
    wx.openLocation({
      latitude,
      longitude,
      name: '自提点名称',
      scale: 18
    })
  },
  searchShop(e) {
    this.setData({
      searchValue: e.detail,
      isReachBottom: true,
      staffList: [],
      pageNum:1
    })
    this.getyglb()
  },
  confirm() {
    const {staffList} = this.data
    const arr = staffList.filter(item=>{
      return item.isChecked
    })
    wx.setStorageSync('staffList', arr)
    wx.navigateBack({
      delta: 1,
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
      this.getyglb()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})