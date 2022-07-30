import {addressList,saveAddress} from '../../../../apis/message'
const areaCode = require('../../../../utils/area-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    pageNum:1,
    pageSize:10,
    isReachBottom:true
  },
  onChange(event) {
    const item = event.currentTarget.dataset.item
    let params = {
      id: item.id,
      name: item.name,
      mobile: item.mobile,
      regionCode: item.region_code,
      address: item.address,
      isdefault:'0',
      openid:wx.getStorageSync('thirdSession').openid
    }
    saveAddress(params).then(res=>{
      if(res){
        wx.showToast({
          title: '操作成功',
          success:()=>{
            this.setData({
              isReachBottom:true,
              pageNum:1,
              addressList:[]
            })
            this.getData()
          }
        })
      }
    })
  },
  copyThat(e){
    const item = e.currentTarget.dataset.item;
    wx.setClipboardData({
      data: item.name+' '+item.mobile+' '+item.province+item.city+item.county+item.address,
      success (res) {
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  GoAdd(){
    wx.navigateTo({
      url: '/message/pages/address/add/add'
    })
  },
  getData(){
    const params={
      pageNum:this.data.pageNum,
      pageSize:this.data.pageSize,
      openid:wx.getStorageSync('thirdSession').openid
    }
    addressList(params).then(res=>{
      if(res){
        let arr = res.data.length?res.data.filter(item=>item.is_del=='0'):[]
        arr.map(item=>{
          let regionCode=item.region_code?item.region_code.split(','):[];
          item.province=areaCode.areaList.province_list[regionCode[0]]
          item.city = areaCode.areaList.city_list[regionCode[1]]
          item.county = areaCode.areaList.county_list[regionCode[2]]
        })
        if (this.data.pageNum*this.data.pageSize >= res.data.total) {
          this.setData({
            isReachBottom: false
          })
        }
        this.setData({
          addressList: [...this.data.addressList, ...arr]
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
    this.setData({
      pageNum:1,
      addressList:[],
      isReachBottom:true
    })
    this.getData()
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
      this.getData()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})