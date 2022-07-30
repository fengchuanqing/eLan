import {wyydlkdd,yywdlkdd,wdlkddztsl,lkwdddztsl} from '../../api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_tab: 0,
    cur_status: 0,
    freezerList:[],
    isReachBottom: true,
    pageNum: 1,
    searchVal: '',
    orderObj:{
      djd:0,
      dwc:0,
      ywc:0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  goNext(e){
    let url = e.currentTarget.dataset.url
    wx.navigateTo({
      url
    })
  },
  wdlkddztsl(){
    wdlkddztsl({openid:wx.getStorageSync('thirdSession').openid}).then(res=>{
      if(res.code==200){
        this.setData({
          orderObj:res.data
        })
      }
    })
  },
  lkwdddztsl(){
    lkwdddztsl({openid:wx.getStorageSync('thirdSession').openid}).then(res=>{
      if(res.code==200){
        this.setData({
          orderObj:res.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  changeTab(e) {
    let idx =e.currentTarget.dataset.idx
    this.setData({
      cur_tab: idx,
      isReachBottom: true,
      pageNum: 1,
      freezerList: [],
    })
    if(idx===0){
      this.wdlkddztsl()
      this.getWyydlkdd()
    }else{
      this.lkwdddztsl()
      this.getYywdlkdd()
    }
  },
  changeStatus(e) {
    this.setData({
      isReachBottom: true,
      pageNum: 1,
      freezerList: [],
      cur_status: e.currentTarget.dataset.idx
    })
    if(this.data.cur_tab==0){
      this.getWyydlkdd()
    }else{
      this.getYywdlkdd()
    }
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
    if(this.data.cur_tab==0){
      this.wdlkddztsl()
      this.getWyydlkdd()
    }else{
      this.lkwdddztsl()
      this.getYywdlkdd()
    }
  },
  onSearch(e) {
    this.setData({
      searchVal: e.detail,
      isReachBottom: true,
      pageNum: 1,
      freezerList: []
    })
    if(this.data.cur_tab==0){
      this.getWyydlkdd()
    }else{
      this.getYywdlkdd()
    }
  },
  onCancel() {
    this.setData({
      searchVal: '',
      isReachBottom: true,
      pageNum: 1,
      freezerList: []
    })
    if(this.data.cur_tab==0){
      this.getWyydlkdd()
    }else{
      this.getYywdlkdd()
    }
  },
  getYywdlkdd(){
    const params={
      lkmc:this.data.searchVal,
      openid:wx.getStorageSync('thirdSession').openid,
      pageNum:this.data.pageNum,
      zt:this.data.cur_status
    }
    yywdlkdd(params).then(res=>{
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
  getWyydlkdd(){
    const params={
      lkmc:this.data.searchVal,
      openid:wx.getStorageSync('thirdSession').openid,
      pageNum:this.data.pageNum,
      zt:this.data.cur_status
    }
    wyydlkdd(params).then(res=>{
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
    if(this.data.isReachBottom){
      this.setData({
        pageNum: this.data.pageNum+1,
      })
      if(this.data.cur_tab==0){
        this.getWyydlkdd()
      }else{
        this.getYywdlkdd()
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})