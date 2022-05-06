
import {
  lzxq,
  xqxq
} from "../../../apis/gylz.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    wechartShow: false,
    showFoot:true
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
    this.getxqxq()
  },
  getxqxq(){
    const params={
      id:this.data._id
    }
    xqxq(params).then(res=>{
      if(res){
        this.setData({
          jyObj:res.data,
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
        this.setData({
          obj:res.data[0],
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})