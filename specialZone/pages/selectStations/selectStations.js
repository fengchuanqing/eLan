import {
  xdztdlb,
  gwcxdztdlb,
  img,
} from '../../../apis/specialZone.js'
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
    pageNum: 1,
    cur_station:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(options.goodsId){
      this.setData({
        goodsId:options.goodsId
      })
    }
    console.log(options.stationId)
    if(options.stationId){
      this.setData({
        stationId:JSON.parse(options.stationId)
      })
    }
  },
  checkedCur(e){
    const idx = e.currentTarget.dataset.idx
    this.setData({
      cur_station:idx
    })
  },
  getyglb(){
    const params = {
      pageNum: this.data.pageNum,
      mc: this.data.searchValue,
    }
    if(this.data.goodsId){
      params.goodsId=this.data.goodsId
      xdztdlb(params).then(res=>{
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
    }
    if(this.data.stationId){
      params.selfPointIdList=this.data.stationId
      gwcxdztdlb(params).then(res=>{
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
    }
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
    const {staffList,cur_station} = this.data
    wx.setStorageSync('curStation', staffList[cur_station])
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