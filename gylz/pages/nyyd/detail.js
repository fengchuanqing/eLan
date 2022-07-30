import {
  domain,
} from "../../../apis/index.js"
import {
  lzxq,
  gyxq
} from "../../../apis/gylz.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIPhoneXSeries:getApp().globalData.isIPhoneXSeries,
    domain:domain+'/bsApi',
    currentSwiper: 0,
    swiperList: [{
        img: '1'
      },
      {
        src: '1'
      }
    ],
    curTag: 1,
    curTab: 0,
    show: false,
    wechartShow: false,
    scrollHeight:0,
    showFoot:true,
    obj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.isMy){
      this.setData({
        showFoot:false
      })
    }
    this.setData({
      _id:options.id
    })
    this.getlzxq()
    this.getgyxq()
  },
  getgyxq(){
    const params={
      id:this.data._id
    }
    gyxq(params).then(res=>{
      if(res){
        this.setData({
          jyObj:res.data[0]
        })
      }
    })
  },
  getlzxq(){
    const params={
      id:this.data._id
    }
    lzxq(params).then(res=>{
      if(res){
        const imgArr=res.data[0].tp?.split(',')
        this.setData({
          obj:res.data[0],
          swiperList:[...imgArr,res.data[0].sp]
        })
      }
    })
  },
  makeWechat() {
    wx.setClipboardData({
      data: this.data.obj.vx,
      success(res) {}
    })
  },
  onWechatClose() {
    this.setData({
      wechartShow: false
    })
  },
  bindWechat() {
    this.setData({
      wechartShow: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  showDia() {
    this.setData({
      show: true
    })
  },
  makePhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.obj.lxfs
    })
  },
  changeTab(e) {
    const idx = e.currentTarget.dataset.idx
    if (idx === 0) {
      wx.pageScrollTo({
        scrollTop: 500
        })
    }else{
      wx.pageScrollTo({
        scrollTop: this.data.scrollHeight+500+22
        })
    }
    this.setData({
      curTab: idx
    })
  },
  changeTag(e) {
    const idx = e.currentTarget.dataset.idx
    if (idx === 0) {
      this.setData({
        currentSwiper: this.data.swiperList.length - 1
      })
    } else {
      this.setData({
        currentSwiper: 0
      })
    }
    this.setData({
      curTag: idx
    })
  },
  changeSwiper(e) {
    const idx =e.detail.current
    if(idx===this.data.swiperList.length-1){
      this.setData({
        curTag:0
      })
    }else{
      this.setData({
        curTag:1
      })
    }
    this.setData({
      currentSwiper: idx
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _this=this
    const query = wx.createSelectorQuery()
      query.select('#jbnr').boundingClientRect()
      query.exec(function (res) {
        console.log(res);
        _this.setData({
          scrollHeight:res[0].height
        })
      })
  },
  onPageScroll:function(e){
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})